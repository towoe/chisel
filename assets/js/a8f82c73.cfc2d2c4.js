"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[3313],{5e3:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>t,metadata:()=>d,toc:()=>o});var s=l(4848),a=l(8453);const t={layout:"docs",title:"Bundles and Vecs",section:"chisel3"},i="Bundles and Vecs",d={id:"explanations/bundles-and-vecs",title:"Bundles and Vecs",description:"Bundle and Vec are classes that allow the user to expand the set of Chisel datatypes with aggregates of other types.",source:"@site/docs/explanations/bundles-and-vecs.md",sourceDirName:"explanations",slug:"/explanations/bundles-and-vecs",permalink:"/docs/explanations/bundles-and-vecs",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/bundles-and-vecs.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Bundles and Vecs",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Blackboxes",permalink:"/docs/explanations/blackboxes"},next:{title:"Enumerations",permalink:"/docs/explanations/chisel-enum"}},c={},o=[{value:"Flipping Bundles",id:"flipping-bundles",level:3},{value:"MixedVec",id:"mixedvec",level:3},{value:"A note on <code>cloneType</code> (For Chisel &lt; 3.5)",id:"a-note-on-clonetype-for-chisel--35",level:3}];function r(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"bundles-and-vecs",children:"Bundles and Vecs"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Bundle"})," and ",(0,s.jsx)(n.code,{children:"Vec"})," are classes that allow the user to expand the set of Chisel datatypes with aggregates of other types."]}),"\n",(0,s.jsxs)(n.p,{children:["Bundles group together several named fields of potentially different types into a coherent unit, much like a ",(0,s.jsx)(n.code,{children:"struct"})," in\nC. Users define their own bundles by defining a class as a subclass of ",(0,s.jsx)(n.code,{children:"Bundle"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass MyFloat extends Bundle {\n  val sign        = Bool()\n  val exponent    = UInt(8.W)\n  val significand = UInt(23.W)\n}\n\nclass ModuleWithFloatWire extends RawModule {\n  val x  = Wire(new MyFloat)\n  val xs = x.sign\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["You can create literal Bundles using the experimental ",(0,s.jsx)(n.a,{href:"../appendix/experimental-features#bundle-literals",children:"Bundle Literals"})," feature."]}),"\n",(0,s.jsx)(n.p,{children:"Scala convention is to name classes using UpperCamelCase, and we suggest you follow that convention in your Chisel code."}),"\n",(0,s.jsx)(n.p,{children:"Vecs create an indexable vector of elements, and are constructed as follows:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class ModuleWithVec extends RawModule {\n  // Vector of 5 23-bit signed integers.\n  val myVec = Wire(Vec(5, SInt(23.W)))\n\n  // Connect to one element of vector.\n  val reg3 = myVec(3)\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["(Note that we specify the number followed by the type of the ",(0,s.jsx)(n.code,{children:"Vec"})," elements. We also specifiy the width of the ",(0,s.jsx)(n.code,{children:"SInt"}),")"]}),"\n",(0,s.jsxs)(n.p,{children:["The set of primitive classes\n(",(0,s.jsx)(n.code,{children:"SInt"}),", ",(0,s.jsx)(n.code,{children:"UInt"}),", and ",(0,s.jsx)(n.code,{children:"Bool"}),") plus the aggregate\nclasses (",(0,s.jsx)(n.code,{children:"Bundles"})," and ",(0,s.jsx)(n.code,{children:"Vec"}),"s) all inherit from a common\nsuperclass, ",(0,s.jsx)(n.code,{children:"Data"}),".  Every object that ultimately inherits from\n",(0,s.jsx)(n.code,{children:"Data"})," can be represented as a bit vector in a hardware design."]}),"\n",(0,s.jsx)(n.p,{children:"Bundles and Vecs can be arbitrarily nested to build complex data\nstructures:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class BigBundle extends Bundle {\n // Vector of 5 23-bit signed integers.\n val myVec = Vec(5, SInt(23.W))\n val flag  = Bool()\n // Previously defined bundle.\n val f     = new MyFloat\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that the builtin Chisel primitive and aggregate classes do not\nrequire the ",(0,s.jsx)(n.code,{children:"new"})," when creating an instance, whereas new user\ndatatypes will.  A Scala ",(0,s.jsx)(n.code,{children:"apply"})," constructor can be defined so\nthat a user datatype also does not require ",(0,s.jsx)(n.code,{children:"new"}),", as described in\n",(0,s.jsx)(n.a,{href:"../explanations/functional-module-creation",children:"Function Constructor"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"flipping-bundles",children:"Flipping Bundles"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Flipped()"})," function recursively flips all elements in a Bundle/Record. This is very useful for building bidirectional interfaces that connect to each other (e.g. ",(0,s.jsx)(n.code,{children:"Decoupled"}),"). See below for an example."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class ABBundle extends Bundle {\n  val a = Input(Bool())\n  val b = Output(Bool())\n}\nclass MyFlippedModule extends RawModule {\n  // Normal instantiation of the bundle\n  // 'a' is an Input and 'b' is an Output\n  val normalBundle = IO(new ABBundle)\n  normalBundle.b := normalBundle.a\n\n  // Flipped recursively flips the direction of all Bundle fields\n  // Now 'a' is an Output and 'b' is an Input\n  val flippedBundle = IO(Flipped(new ABBundle))\n  flippedBundle.a := flippedBundle.b\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"This generates the following Verilog:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.73.0\nmodule MyFlippedModule(\t// bundles-and-vecs.md:57:7\n  input  normalBundle_a,\t// bundles-and-vecs.md:60:24\n  output normalBundle_b,\t// bundles-and-vecs.md:60:24\n         flippedBundle_a,\t// bundles-and-vecs.md:65:25\n  input  flippedBundle_b\t// bundles-and-vecs.md:65:25\n);\n\n  assign normalBundle_b = normalBundle_a;\t// bundles-and-vecs.md:57:7\n  assign flippedBundle_a = flippedBundle_b;\t// bundles-and-vecs.md:57:7\nendmodule\n\n"})}),"\n",(0,s.jsx)(n.h3,{id:"mixedvec",children:"MixedVec"}),"\n",(0,s.jsx)(n.p,{children:"(Chisel 3.2+)"}),"\n",(0,s.jsxs)(n.p,{children:["All elements of a ",(0,s.jsx)(n.code,{children:"Vec"})," must have the same parameterization. If we want to create a Vec where the elements have the same type but different parameterizations, we can use a MixedVec:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"import chisel3.util.MixedVec\nclass ModuleMixedVec extends Module {\n  val io = IO(new Bundle {\n    val x = Input(UInt(3.W))\n    val y = Input(UInt(10.W))\n    val vec = Output(MixedVec(UInt(3.W), UInt(10.W)))\n  })\n  io.vec(0) := io.x\n  io.vec(1) := io.y\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"We can also programmatically create the types in a MixedVec:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class ModuleProgrammaticMixedVec(x: Int, y: Int) extends Module {\n  val io = IO(new Bundle {\n    val vec = Input(MixedVec((x to y) map { i => UInt(i.W) }))\n    // ...\n  })\n  // ...rest of the module goes here...\n}\n"})}),"\n",(0,s.jsxs)(n.h3,{id:"a-note-on-clonetype-for-chisel--35",children:["A note on ",(0,s.jsx)(n.code,{children:"cloneType"})," (For Chisel < 3.5)"]}),"\n",(0,s.jsxs)(n.p,{children:["NOTE: This section ",(0,s.jsx)(n.strong,{children:"only applies to Chisel before Chisel 3.5"}),".\nAs of Chisel 3.5, ",(0,s.jsx)(n.code,{children:"Bundle"}),"s should ",(0,s.jsx)(n.strong,{children:"not"})," ",(0,s.jsx)(n.code,{children:"override def cloneType"}),",\nas this is a compiler error when using the chisel3 compiler plugin for inferring ",(0,s.jsx)(n.code,{children:"cloneType"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Since Chisel is built on top of Scala and the JVM,\nit needs to know how to construct copies of ",(0,s.jsx)(n.code,{children:"Bundle"}),"s for various\npurposes (creating wires, IOs, etc).\nIf you have a parametrized ",(0,s.jsx)(n.code,{children:"Bundle"})," and Chisel can't automatically figure out how to\nclone it, you will need to create a custom ",(0,s.jsx)(n.code,{children:"cloneType"})," method in your bundle.\nIn the vast majority of cases, ",(0,s.jsx)(n.strong,{children:"this is not required"}),"\nas Chisel can figure out how to clone most ",(0,s.jsx)(n.code,{children:"Bundle"}),"s automatically:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class MyCloneTypeBundle(val bitwidth: Int) extends Bundle {\n   val field = UInt(bitwidth.W)\n   // ...\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The only caveat is if you are passing something of type ",(0,s.jsx)(n.code,{children:"Data"}),' as a "generator" parameter,\nin which case you should make it a ',(0,s.jsx)(n.code,{children:"private val"}),", and define a ",(0,s.jsx)(n.code,{children:"cloneType"})," method with\n",(0,s.jsx)(n.code,{children:"override def cloneType = (new YourBundleHere(...)).asInstanceOf[this.type]"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["For example, consider the following ",(0,s.jsx)(n.code,{children:"Bundle"}),". Because its ",(0,s.jsx)(n.code,{children:"gen"})," variable is not a ",(0,s.jsx)(n.code,{children:"private val"}),", the user has to\nexplicitly define the ",(0,s.jsx)(n.code,{children:"cloneType"})," method:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"import chisel3.util.{Decoupled, Irrevocable}\nclass RegisterWriteIOExplicitCloneType[T <: Data](gen: T) extends Bundle {\n  val request  = Flipped(Decoupled(gen))\n  val response = Irrevocable(Bool())\n  override def cloneType = new RegisterWriteIOExplicitCloneType(gen).asInstanceOf[this.type]\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["We can make this this infer cloneType by making ",(0,s.jsx)(n.code,{children:"gen"}),' private since it is a "type parameter":']}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"import chisel3.util.{Decoupled, Irrevocable}\nclass RegisterWriteIO[T <: Data](private val gen: T) extends Bundle {\n  val request  = Flipped(Decoupled(gen))\n  val response = Irrevocable(Bool())\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(r,{...e})}):r(e)}},8453:(e,n,l)=>{l.d(n,{R:()=>i,x:()=>d});var s=l(6540);const a={},t=s.createContext(a);function i(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);