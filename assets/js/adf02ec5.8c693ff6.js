"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[440],{7644:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var o=t(7624),s=t(2172);const a={},i="Instance Choices",c={id:"explanations/instchoice",title:"Instance Choices",description:"Instance Choices are instances of modules whose targets are configurable post-elaboration.",source:"@site/docs/explanations/instchoice.md",sourceDirName:"explanations",slug:"/explanations/instchoice",permalink:"/docs/explanations/instchoice",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/instchoice.md",tags:[],version:"current",frontMatter:{},sidebar:"chiselSidebar",previous:{title:"Functional Module Creation",permalink:"/docs/explanations/functional-module-creation"},next:{title:"Interfaces and Connections",permalink:"/docs/explanations/interfaces-and-connections"}},r={},l=[];function d(e){const n={code:"code",h1:"h1",p:"p",pre:"pre",...(0,s.M)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"instance-choices",children:"Instance Choices"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"Instance Choice"}),"s are instances of modules whose targets are configurable post-elaboration.\nThey allow the target of an instance to be chosen from a pre-defined set after elaboration by\nenabling an option through the ABI or through specialization in the compiler."]}),"\n",(0,o.jsx)(n.p,{children:"Instance choices rely on option groups to specify the available targets attached to each option:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-scala",children:"import chisel3.choice.{Case, Group}\n\nobject Platform extends Group {\n  object FPGA extends Case\n  object ASIC extends Case\n}\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"Platform"})," option groups enumerates the list of platforms for which the design\ncan be specialised, such as ",(0,o.jsx)(n.code,{children:"ASIC"})," or ",(0,o.jsx)(n.code,{children:"FPGA"}),". Specialization is not mandatory: if an\noption is left unspecified, a default variant is chosen."]}),"\n",(0,o.jsxs)(n.p,{children:["The modules referenced by an instance choice must all specify the same IO interface by\nderiving from ",(0,o.jsx)(n.code,{children:"FixedIOBaseModule"}),". The ",(0,o.jsx)(n.code,{children:"ModuleChoice"})," operator takes the default option\nand a list of case-module mappings and returns a binding to the IO of the modules."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.choice.ModuleChoice\n\nclass TargetIO extends Bundle {\n  val in = Flipped(UInt(8.W))\n  val out = UInt(8.W)\n}\n\nclass FPGATarget extends FixedIOExtModule[TargetIO](new TargetIO)\n\nclass ASICTarget extends FixedIOExtModule[TargetIO](new TargetIO)\n\nclass VerifTarget extends FixedIORawModule[TargetIO](new TargetIO)\n\nclass SomeModule extends RawModule {\n  val inst = ModuleChoice(new VerifTarget)(Seq(\n    Platform.FPGA -> new FPGATarget,\n    Platform.ASIC -> new ASICTarget\n  ))\n}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>c,M:()=>i});var o=t(1504);const s={},a=o.createContext(s);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);