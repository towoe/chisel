"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[9282],{2308:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>r});var i=t(7624),d=t(2172);const a={layout:"docs",title:"Decoders",section:"chisel3"},s="Decoders",c={id:"explanations/decoder",title:"Decoders",description:"It is common in a complex design to recognize certain patterns from a big UInt coming from a data bus and dispatch",source:"@site/docs/explanations/decoder.md",sourceDirName:"explanations",slug:"/explanations/decoder",permalink:"/docs/explanations/decoder",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/decoder.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Decoders",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"DataView",permalink:"/docs/explanations/dataview"},next:{title:"Functional Abstraction",permalink:"/docs/explanations/functional-abstraction"}},o={},r=[{value:"Basic Decoders",id:"basic-decoders",level:2},{value:"DecoderTable",id:"decodertable",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,d.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"decoders",children:"Decoders"}),"\n",(0,i.jsxs)(n.p,{children:["It is common in a complex design to recognize certain patterns from a big ",(0,i.jsx)(n.code,{children:"UInt"})," coming from a data bus and dispatch\nactions to next pipeline stage based on such observation. The circuit doing so can be called as 'decoders' such as\naddress decoders in a bus crossbar or instruction decoders in a CPU frontend. Chisel provides some utility class to\ngenerate them in ",(0,i.jsx)(n.code,{children:"util.exprimental.decode"})," package."]}),"\n",(0,i.jsx)(n.h2,{id:"basic-decoders",children:"Basic Decoders"}),"\n",(0,i.jsxs)(n.p,{children:["The simplest API provided by ",(0,i.jsx)(n.code,{children:"decoder"})," is essentially just a ",(0,i.jsx)(n.code,{children:"TruthTable"})," encoding your desired input and output."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3._\nimport chisel3.util.BitPat\nimport chisel3.util.experimental.decode._\n\nclass SimpleDecoder extends Module {\n  val table = TruthTable(\n    Map(\n      BitPat("b001") -> BitPat("b?"),\n      BitPat("b010") -> BitPat("b?"),\n      BitPat("b100") -> BitPat("b1"),\n      BitPat("b101") -> BitPat("b1"),\n      BitPat("b111") -> BitPat("b1")\n    ),\n    BitPat("b0"))\n  val input = IO(Input(UInt(3.W)))\n  val output = IO(Output(UInt(1.W)))\n  output := decoder(input, table)\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"decodertable",children:"DecoderTable"}),"\n",(0,i.jsxs)(n.p,{children:["When the decoded result involves multiple fields, each with its own semantics, the ",(0,i.jsx)(n.code,{children:"TruthTable"})," can quickly be become\nhard to maintain. The ",(0,i.jsx)(n.code,{children:"DecoderTable"})," API is designed to generate decoder table from structured definitions."]}),"\n",(0,i.jsxs)(n.p,{children:["The bridge from structured information to its encoding is ",(0,i.jsx)(n.code,{children:"DecodePattern"})," trait. The ",(0,i.jsx)(n.code,{children:"bitPat"})," member defines the input\n",(0,i.jsx)(n.code,{children:"BitPat"})," in the decode truth table, and other members can be defined to contain structured information."]}),"\n",(0,i.jsxs)(n.p,{children:["To generate output side of the decode truth table, the trait to use is ",(0,i.jsx)(n.code,{children:"DecodeField"}),". Given an instance implementing the\n",(0,i.jsx)(n.code,{children:"DecodePattern"})," object, the ",(0,i.jsx)(n.code,{children:"genTable"})," method should return desired output."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3.util.BitPat\nimport chisel3.util.experimental.decode._\n\ncase class Pattern(val name: String, val code: BigInt) extends DecodePattern {\n  def bitPat: BitPat = BitPat("b" + code.toString(2))\n}\n\nobject NameContainsAdd extends BoolDecodeField[Pattern] {\n  def name = "name contains \'add\'"\n  def genTable(i: Pattern) = if (i.name.contains("add")) y else n\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Then all ",(0,i.jsx)(n.code,{children:"DecodePattern"})," cases can be generated or read from external sources. And with all ",(0,i.jsx)(n.code,{children:"DecodeField"})," objects, the\ndecoder can be easily generated and output can be read by corresponding ",(0,i.jsx)(n.code,{children:"DecodeField"}),"s."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'import chisel3._\nimport chisel3.util.experimental.decode._\n\nclass SimpleDecodeTable extends Module {\n  val allPossibleInputs = Seq(Pattern("addi", BigInt("0x2")) /* can be generated */)\n  val decodeTable = new DecodeTable(allPossibleInputs, Seq(NameContainsAdd))\n  \n  val input = IO(Input(UInt(4.W)))\n  val isAddType = IO(Output(Bool()))\n  val decodeResult = decodeTable.decode(input)\n  isAddType := decodeResult(NameContainsAdd)\n}\n'})})]})}function u(e={}){const{wrapper:n}={...(0,d.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>c,M:()=>s});var i=t(1504);const d={},a=i.createContext(d);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);