"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[9128],{6715:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=t(4848),i=t(8453);const r={layout:"docs",title:"Ports",section:"chisel3"},o="Ports",a={id:"explanations/ports",title:"Ports",description:"Ports are used as interfaces to hardware components.  A port is simply",source:"@site/docs/explanations/ports.md",sourceDirName:"explanations",slug:"/explanations/ports",permalink:"/docs/explanations/ports",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/ports.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Ports",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Polymorphism and Parameterization",permalink:"/docs/explanations/polymorphism-and-parameterization"},next:{title:"Printing",permalink:"/docs/explanations/printing"}},c={},d=[{value:"Inspecting Module ports",id:"inspecting-module-ports",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"ports",children:"Ports"}),"\n",(0,s.jsxs)(n.p,{children:["Ports are used as interfaces to hardware components.  A port is simply\nany ",(0,s.jsx)(n.code,{children:"Data"})," object that has directions assigned to its members."]}),"\n",(0,s.jsxs)(n.p,{children:["Chisel provides port constructors to allow a direction to be added\n(input or output) to an object at construction time. Primitive port\nconstructors wrap the type of the port in ",(0,s.jsx)(n.code,{children:"Input"})," or ",(0,s.jsx)(n.code,{children:"Output"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"An example port declaration is as follows:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"class Decoupled extends Bundle {\n  val ready = Output(Bool())\n  val data  = Input(UInt(32.W))\n  val valid = Input(Bool())\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["After defining ",(0,s.jsx)(n.code,{children:"Decoupled"}),", it becomes a new type that can be\nused as needed for module interfaces or for named collections of\nwires."]}),"\n",(0,s.jsx)(n.p,{children:"By folding directions into the object declarations, Chisel is able to\nprovide powerful wiring constructs described later."}),"\n",(0,s.jsx)(n.h2,{id:"inspecting-module-ports",children:"Inspecting Module ports"}),"\n",(0,s.jsx)(n.p,{children:"(Chisel 3.2+)"}),"\n",(0,s.jsxs)(n.p,{children:["Chisel 3.2 introduced ",(0,s.jsx)(n.code,{children:"DataMirror.modulePorts"})," which can be used to inspect the IOs of any Chisel module (this includes modules in both ",(0,s.jsx)(n.code,{children:"import chisel3._"})," and ",(0,s.jsx)(n.code,{children:"import Chisel._"}),", as well as BlackBoxes from each package).\nHere is an example of how to use this API:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:'import chisel3.reflect.DataMirror\nimport chisel3.stage.ChiselGeneratorAnnotation\nimport circt.stage.ChiselStage\n\nclass Adder extends Module {\n  val a = IO(Input(UInt(8.W)))\n  val b = IO(Input(UInt(8.W)))\n  val c = IO(Output(UInt(8.W)))\n  c := a +& b\n}\n\nclass Test extends Module {\n  val adder = Module(new Adder)\n  // for debug only\n  adder.a := DontCare\n  adder.b := DontCare\n\n  // Inspect ports of adder\n  // See the result below.\n   DataMirror.modulePorts(adder).foreach { case (name, port) => {\n    println(s"Found port $name: $port")\n  }}\n}\n\nChiselStage.emitSystemVerilog(new Test)\n// Found port clock: Adder.clock: IO[Clock]\n// Found port reset: Adder.reset: IO[Reset]\n// Found port a: Adder.a: IO[UInt<8>]\n// Found port b: Adder.b: IO[UInt<8>]\n// Found port c: Adder.c: IO[UInt<8>]\n// res0: String = """// Generated by CIRCT firtool-1.81.1\n// module Test(\t// ports.md:41:7\n//   input clock,\t// ports.md:41:7\n//         reset\t// ports.md:41:7\n// );\n// \n// endmodule\n// \n// \n// // ----- 8< ----- FILE "Verification/Cover/layers_Test_Verification_Cover.sv" ----- 8< -----\n// \n// // Generated by CIRCT firtool-1.81.1\n// `include "Verification/layers_Test_Verification.sv"\n// `ifndef layers_Test_Verification_Cover\n// `define layers_Test_Verification_Cover\t// <stdin>:6:5\n// `endif // layers_Test_Verification_Cover\t// <stdin>:6:5\n// \n// // ----- 8< ----- FILE "Verification/Assume/layers_Test_Verification_Assume.sv" ----- 8< -----\n// \n// // Generated by CIRCT firtool-1.81.1\n// `include "Verification/layers_Test_Verification.sv"\n// `ifndef layers_Test_Verification_Assume\n// `define layers_Test_Verification_Assume\t// <stdin>:5:5\n// `endif // layers_Test_Verification_Assume\t// <stdin>:5:5\n// \n// // ----- 8< ----- FILE "Verification/Assert/layers_Test_Verification_Assert.sv" ----- 8< -----\n// \n// // Generated by CIRCT firtool-1.81.1\n// `include "Verification/layers_Test_Verification.sv"\n// `ifndef layers_Test_Verification_Assert\n// `define layers_Test_Verification_Assert\t// <stdin>:4:5\n// `endif // layers_Test_Verification_Assert\t// <stdin>:4:5\n// \n// // ----- 8< ----- FILE "Verification/layers_Test_Verification.sv" ----- 8< -----\n// \n// // Generated by CIRCT firtool-1.81.1\n// `ifndef layers_Test_Verification\n// `define layers_Test_Verification\t// <stdin>:3:3\n// `endif // layers_Test_Verification\t// <stdin>:3:3\n// """\n'})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(6540);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);