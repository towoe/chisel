"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[3543],{3231:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var t=i(4848),s=i(8453);const r={layout:"docs",title:"Intrinsics",section:"chisel3"},a="Intrinsics",c={id:"explanations/intrinsics",title:"Intrinsics",description:"Chisel Intrinsics are used to express implementation defined functionality.",source:"@site/docs/explanations/intrinsics.md",sourceDirName:"explanations",slug:"/explanations/intrinsics",permalink:"/docs/explanations/intrinsics",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/intrinsics.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Intrinsics",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Interfaces and Connections",permalink:"/docs/explanations/interfaces-and-connections"},next:{title:"Layers",permalink:"/docs/explanations/layers"}},o={},l=[{value:"Parameterization",id:"parameterization",level:3},{value:"Intrinsic Expression Example",id:"intrinsic-expression-example",level:3}];function d(n){const e={code:"code",em:"em",h1:"h1",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"intrinsics",children:"Intrinsics"}),"\n",(0,t.jsxs)(e.p,{children:["Chisel ",(0,t.jsx)(e.em,{children:"Intrinsics"})," are used to express implementation defined functionality.\nIntrinsics provide a way for specific compilers to extend the capabilities of\nthe language in ways which are not implementable with library code."]}),"\n",(0,t.jsx)(e.p,{children:"Intrinsics will be typechecked by the implementation.  What intrinsics are\navailable is documented by an implementation."}),"\n",(0,t.jsxs)(e.p,{children:["The ",(0,t.jsx)(e.code,{children:"Intrinsic"})," and ",(0,t.jsx)(e.code,{children:"IntrinsicExpr"})," can be used to create intrinsic statements\nand expressions."]}),"\n",(0,t.jsx)(e.h3,{id:"parameterization",children:"Parameterization"}),"\n",(0,t.jsx)(e.p,{children:"Parameters can be passed as an argument to the IntModule constructor."}),"\n",(0,t.jsx)(e.h3,{id:"intrinsic-expression-example",children:"Intrinsic Expression Example"}),"\n",(0,t.jsx)(e.p,{children:'This following creates an intrinsic for the intrinsic named "MyIntrinsic".\nIt takes a parameter named "STRING" and has several inputs.'}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-scala",children:'class Foo extends RawModule {\n  val myresult = IntrinsicExpr("MyIntrinsic", UInt(32.W), "STRING" -> "test")(3.U, 5.U)\n}\n'})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},8453:(n,e,i)=>{i.d(e,{R:()=>a,x:()=>c});var t=i(6540);const s={},r=t.createContext(s);function a(n){const e=t.useContext(r);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:a(n.components),t.createElement(r.Provider,{value:e},n.children)}}}]);