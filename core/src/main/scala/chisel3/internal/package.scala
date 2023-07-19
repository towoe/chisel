// SPDX-License-Identifier: Apache-2.0

package chisel3

import firrtl.annotations.{IsModule, ModuleTarget}
import chisel3.experimental.{BaseModule, UnlocatableSourceInfo}
import chisel3.internal.firrtl.{Component, DefModule}
import chisel3.internal.Builder.Prefix

import scala.util.Try
import scala.annotation.{implicitNotFound, nowarn}

package object internal {

  @deprecated("This function has moved to chisel3.experimental", "Chisel 3.6")
  val prefix = chisel3.experimental.prefix
  @deprecated("This function has moved to chisel3.experimental", "Chisel 3.6")
  val noPrefix = chisel3.experimental.noPrefix

  @deprecated("This type has moved to chisel3", "Chisel 3.6")
  type ChiselException = chisel3.ChiselException

  @deprecated("This type has moved to chisel3", "Chisel 3.6")
  type InstanceId = chisel3.InstanceId

  @implicitNotFound("You are trying to access a macro-only API. Please use the @public annotation instead.")
  trait MacroGenerated

  /** Marker trait for modules that are not true modules */
  private[chisel3] trait PseudoModule extends BaseModule

  /* Check if a String name is a temporary name */
  def isTemp(name: String): Boolean = name.nonEmpty && name.head == '_'

  /** Creates a name String from a prefix and a seed
    * @param prefix The prefix associated with the seed (must be in correct order, *not* reversed)
    * @param seed The seed for computing the name (if available)
    */
  def buildName(seed: String, prefix: Prefix): String = {
    // Don't bother copying the String if there's no prefix
    if (prefix.isEmpty) {
      seed
    } else {
      // Using Java's String builder to micro-optimize appending a String excluding 1st character
      // for temporaries
      val builder = new java.lang.StringBuilder()
      // Starting with _ is the indicator of a temporary
      val temp = isTemp(seed)
      // Make sure the final result is also a temporary if this is a temporary
      if (temp) {
        builder.append('_')
      }
      prefix.foreach { p =>
        builder.append(p)
        builder.append('_')
      }
      if (temp) {
        // We've moved the leading _ to the front, drop it here
        builder.append(seed, 1, seed.length)
      } else {
        builder.append(seed)
      }
      builder.toString
    }
  }

  // Sanitizes a name, e.g. from a `HasId`, by stripping all non ANSI-C characters
  private[chisel3] def sanitize(s: String, leadingDigitOk: Boolean = false): String = {
    // TODO what character set does FIRRTL truly support? using ANSI C for now
    def legalStart(c: Char) = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_'
    def legal(c:      Char) = legalStart(c) || (c >= '0' && c <= '9')
    val res = if (s.forall(legal)) s else s.filter(legal)
    val headOk = (!res.isEmpty) && (leadingDigitOk || legalStart(res.head))
    if (headOk) res else s"_$res"
  }

  // Private reflective version of "val io" to maintain Chisel.Module semantics without having
  // io as a virtual method. See https://github.com/freechipsproject/chisel3/pull/1550 for more
  // information about the removal of "val io"
  private def reflectivelyFindValIO(self: BaseModule): Option[Record] = {
    // Java reflection is faster and works for the common case
    def tryJavaReflect: Option[Record] = Try {
      self.getClass.getMethod("io").invoke(self).asInstanceOf[Record]
    }.toOption
      .filter(_ != null)
    // Anonymous subclasses don't work with Java reflection, so try slower, Scala reflection
    def tryScalaReflect: Option[Record] = {
      val ru = scala.reflect.runtime.universe
      import ru.{Try => _, _}
      val m = ru.runtimeMirror(self.getClass.getClassLoader)
      val im = m.reflect(self)
      val tpe = im.symbol.toType
      // For some reason, in anonymous subclasses, looking up the Term by name (TermName("io"))
      // hits an internal exception. Searching for the term seems to work though so we use that.
      val ioTerm: Option[TermSymbol] = tpe.decls.collectFirst {
        case d if d.name.toString == "io" && d.isTerm => d.asTerm
      }
      ioTerm.flatMap { term =>
        Try {
          im.reflectField(term).get.asInstanceOf[Record]
        }.toOption
          .filter(_ != null)
      }
    }

    tryJavaReflect
      .orElse(tryScalaReflect)
      .map(_.forceFinalName("io"))
      .orElse {
        // Fallback if reflection fails, user can wrap in IO(...)
        self.findPort("io").collect { case r: Record => r }
      }
  }

  /** Legacy Module class that restricts IOs to just io, clock, and reset, and provides a constructor
    * for threading through explicit clock and reset.
    *
    * '''Do not use this class in user code'''. Use whichever `Module` is imported by your wildcard
    * import (preferably `import chisel3._`).
    */

  @nowarn("msg=in class Module is deprecated")
  @deprecated(deprecatedPublicAPIMsg, "Chisel 3.6")
  abstract class LegacyModule(implicit moduleCompileOptions: CompileOptions) extends Module {
    // Provide a non-deprecated constructor
    def this(
      override_clock: Option[Clock] = None,
      override_reset: Option[Bool] = None
    )(
      implicit moduleCompileOptions: CompileOptions
    ) = {
      this()
      this.override_clock = override_clock //TODO: Replace with a better override strategy
      this.override_reset = override_reset //TODO: Replace with a better override strategy
    }
    def this(_clock: Clock)(implicit moduleCompileOptions: CompileOptions) =
      this(Option(_clock), None)(moduleCompileOptions)
    def this(_reset: Bool)(implicit moduleCompileOptions: CompileOptions) =
      this(None, Option(_reset))(moduleCompileOptions)
    def this(_clock: Clock, _reset: Bool)(implicit moduleCompileOptions: CompileOptions) =
      this(Option(_clock), Option(_reset))(moduleCompileOptions)

    // Sort of a DIY lazy val because if the user tries to construct hardware before val io is
    // constructed, _compatAutoWrapPorts will try to access it but it will be null
    // In that case, we basically need to delay setting this var until later
    private var _ioValue: Option[Record] = None
    private def _io: Option[Record] = _ioValue.orElse {
      _ioValue = reflectivelyFindValIO(this)
      _ioValue
    }

    // Allow access to bindings from the compatibility package
    protected def _compatIoPortBound() = _io.exists(portsContains(_))

    private[chisel3] override def generateComponent(): Option[Component] = {
      _compatAutoWrapPorts() // pre-IO(...) compatibility hack

      // Restrict IO to just io, clock, and reset
      if (_io.isEmpty || !_compatIoPortBound()) {
        throwException(
          s"Compatibility mode Module '$this' must have a 'val io' Bundle. " +
            "If there is such a field and you still see this error, autowrapping has failed (sorry!). " +
            "Please wrap the Bundle declaration in IO(...)."
        )
      }
      require(
        (portsContains(clock)) && (portsContains(reset)),
        "Internal error, module did not have clock or reset as IO"
      )
      require(portsSize == 3, "Module must only have io, clock, and reset as IO")

      super.generateComponent()
    }

    override def _compatAutoWrapPorts(): Unit = {
      if (!_compatIoPortBound()) {
        _io.foreach(_bindIoInPlace(_)(UnlocatableSourceInfo, moduleCompileOptions))
      }
    }
  }

  import chisel3.experimental.Param

  /** Legacy BlackBox class will reflectively autowrap val io
    *
    * '''Do not use this class in user code'''. Use whichever `BlackBox` is imported by your wildcard
    * import (preferably `import chisel3._`).
    */
  @deprecated(deprecatedPublicAPIMsg, "Chisel 3.6")
  abstract class LegacyBlackBox(
    params: Map[String, Param] = Map.empty[String, Param]
  )(
    implicit moduleCompileOptions: CompileOptions)
      extends chisel3.BlackBox(params) {

    override private[chisel3] lazy val _io: Option[Record] = reflectivelyFindValIO(this)

    // This class auto-wraps the BlackBox with IO(...), allowing legacy code (where IO(...) wasn't
    // required) to build.
    override def _compatAutoWrapPorts(): Unit = {
      if (!_compatIoPortBound()) {
        _io.foreach(_bindIoInPlace(_)(UnlocatableSourceInfo, moduleCompileOptions))
      }
    }
  }

  /** Internal API for [[ViewParent]] */
  sealed private[chisel3] class ViewParentAPI extends RawModule()(ExplicitCompileOptions.Strict) with PseudoModule {
    // We must provide `absoluteTarget` but not `toTarget` because otherwise they would be exactly
    // the same and we'd have no way to distinguish the kind of target when renaming view targets in
    // the Converter
    // Note that this is not overriding .toAbsoluteTarget, that is a final def in BaseModule that delegates
    // to this method
    private[chisel3] val absoluteTarget: IsModule = ModuleTarget(this.circuitName, "_$$AbsoluteView$$_")

    // This module is not instantiable
    override private[chisel3] def generateComponent(): Option[Component] = None
    override private[chisel3] def initializeInParent(parentCompileOptions: CompileOptions): Unit = ()
    // This module is not really part of the circuit
    _parent = None

    // Sigil to mark views, starts with '_' to make it a legal FIRRTL target
    override def desiredName = "_$$View$$_"

    private[chisel3] val fakeComponent: Component = DefModule(this, desiredName, Nil, Nil)
  }

  /** Special internal object representing the parent of all views
    *
    * @note this is a val instead of an object because of the need to wrap in Module(...)
    * @note this is a lazy val so that calling functions in this package object doesn't create it
    */
<<<<<<< HEAD
  private[chisel3] val ViewParent =
    Module.do_apply(new ViewParentAPI)(UnlocatableSourceInfo, ExplicitCompileOptions.Strict)
=======
  private[chisel3] lazy val ViewParent =
    Module.do_apply(new ViewParentAPI)(UnlocatableSourceInfo)

  private[chisel3] def requireHasProbeTypeModifier(
    probe:        Data,
    errorMessage: String = ""
  )(
    implicit sourceInfo: SourceInfo
  ): Unit = {
    val msg = if (errorMessage.isEmpty) s"Expected a probe." else errorMessage
    if (!hasProbeTypeModifier(probe)) Builder.error(msg)
  }

  private[chisel3] def requireNoProbeTypeModifier(
    probe:        Data,
    errorMessage: String = ""
  )(
    implicit sourceInfo: SourceInfo
  ): Unit = {
    val msg = if (errorMessage.isEmpty) s"Did not expect a probe." else errorMessage
    if (hasProbeTypeModifier(probe)) Builder.error(msg)
  }

  private[chisel3] def requireHasWritableProbeTypeModifier(
    probe:        Data,
    errorMessage: String = ""
  )(
    implicit sourceInfo: SourceInfo
  ): Unit = {
    val msg = if (errorMessage.isEmpty) s"Expected a writable probe." else errorMessage
    requireHasProbeTypeModifier(probe, msg)
    if (!probe.probeInfo.get.writable) Builder.error(msg)
  }

  private[chisel3] def containsProbe(data: Data): Boolean = data match {
    case a: Aggregate =>
      a.elementsIterator.foldLeft(false)((res: Boolean, d: Data) => res || containsProbe(d))
    case leaf => leaf.probeInfo.nonEmpty
  }

  // TODO this exists in cats.Traverse, should we just use that?
  private[chisel3] implicit class ListSyntax[A](xs: List[A]) {
    def mapAccumulate[B, C](z: B)(f: (B, A) => (B, C)): (B, List[C]) = {
      val (zz, result) = xs.foldLeft((z, List.empty[C])) {
        case ((acc, res), a) =>
          val (accx, c) = f(acc, a)
          (accx, c :: res)
      }
      (zz, result.reverse)
    }
  }
>>>>>>> 8e33a68b6 (Add support for configurable warnings (#3414))
}
