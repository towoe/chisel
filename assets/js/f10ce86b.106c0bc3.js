"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[2012],{8415:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var t=a(4848),o=a(8453),i=a(1871);const s={sidebar_position:3},r="DataView Cookbook",l={id:"cookbooks/dataview",title:"DataView Cookbook",description:"How do I view a Data as a UInt or vice versa?",source:"@site/docs/cookbooks/dataview.md",sourceDirName:"cookbooks",slug:"/cookbooks/dataview",permalink:"/docs/cookbooks/dataview",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/cookbooks/dataview.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"chiselSidebar",previous:{title:"Hierarchy Cookbook",permalink:"/docs/cookbooks/hierarchy"},next:{title:"Serialization Cookbook",permalink:"/docs/cookbooks/serialization"}},c={},d=[{value:"How do I view a Data as a UInt or vice versa?",id:"how-do-i-view-a-data-as-a-uint-or-vice-versa",level:2},{value:"How do I create a DataView for a Bundle has a type parameter?",id:"how-do-i-create-a-dataview-for-a-bundle-has-a-type-parameter",level:2},{value:"How do I create a DataView for a Bundle with optional fields?",id:"how-do-i-create-a-dataview-for-a-bundle-with-optional-fields",level:2},{value:"How do I connect a subset of Bundle fields?",id:"how-do-i-connect-a-subset-of-bundle-fields",level:2},{value:"How do I view a Bundle as a parent type (superclass)?",id:"how-do-i-view-a-bundle-as-a-parent-type-superclass",level:3},{value:"How do I view a Bundle as a parent type when the parent type is abstract (like a trait)?",id:"how-do-i-view-a-bundle-as-a-parent-type-when-the-parent-type-is-abstract-like-a-trait",level:3},{value:"How can I use <code>.viewAs</code> instead of <code>.viewAsSupertype(type)</code>?",id:"how-can-i-use-viewas-instead-of-viewassupertypetype",level:3}];function u(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"dataview-cookbook",children:"DataView Cookbook"})}),"\n","\n",(0,t.jsx)(i.A,{toc:d}),"\n",(0,t.jsx)(n.h2,{id:"how-do-i-view-a-data-as-a-uint-or-vice-versa",children:"How do I view a Data as a UInt or vice versa?"}),"\n",(0,t.jsxs)(n.p,{children:["Subword viewing (using concatenations or bit extractions in ",(0,t.jsx)(n.code,{children:"DataViews"}),") is not yet supported.\nWe intend to implement this in the future, but for the time being, use regular casts\n(",(0,t.jsx)(n.code,{children:".asUInt"})," and ",(0,t.jsx)(n.code,{children:".asTypeOf"}),")."]}),"\n",(0,t.jsx)(n.h2,{id:"how-do-i-create-a-dataview-for-a-bundle-has-a-type-parameter",children:"How do I create a DataView for a Bundle has a type parameter?"}),"\n",(0,t.jsxs)(n.p,{children:["Instead of using a ",(0,t.jsx)(n.code,{children:"val"}),", use a ",(0,t.jsx)(n.code,{children:"def"})," which can have type parameters:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.dataview._\n\nclass Foo[T <: Data](val foo: T) extends Bundle\nclass Bar[T <: Data](val bar: T) extends Bundle\n\nobject Foo {\n  implicit def view[T <: Data]: DataView[Foo[T], Bar[T]] = {\n    DataView(f => new Bar(f.foo.cloneType), _.foo -> _.bar)\n    // .cloneType is necessary because the f passed to this function will be bound hardware\n  }\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If you think about type parameterized classes as really being a family of different classes\n(one for each type parameter), you can think about the ",(0,t.jsx)(n.code,{children:"implicit def"})," as a generator of ",(0,t.jsx)(n.code,{children:"DataViews"}),"\nfor each type parameter."]}),"\n",(0,t.jsx)(n.h2,{id:"how-do-i-create-a-dataview-for-a-bundle-with-optional-fields",children:"How do I create a DataView for a Bundle with optional fields?"}),"\n",(0,t.jsxs)(n.p,{children:["Instead of using the default ",(0,t.jsx)(n.code,{children:"DataView"})," apply method, use ",(0,t.jsx)(n.code,{children:"DataView.mapping"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.dataview._\n\nclass Foo(val w: Option[Int]) extends Bundle {\n  val foo = UInt(8.W)\n  val opt = w.map(x => UInt(x.W))\n}\nclass Bar(val w: Option[Int]) extends Bundle {\n  val bar = UInt(8.W)\n  val opt = w.map(x => UInt(x.W))\n}\n\nobject Foo {\n  implicit val view: DataView[Foo, Bar] =\n    DataView.mapping(\n      // First argument is always the function to make the view from the target\n      f => new Bar(f.w),\n      // Now instead of a varargs of tuples of individual mappings, we have a single function that\n      // takes a target and a view and returns an Iterable of tuple\n      (f, b) =>  List(f.foo -> b.bar) ++ f.opt.map(_ -> b.opt.get)\n                                   // ^ Note that we can append options since they are Iterable!\n\n    )\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"how-do-i-connect-a-subset-of-bundle-fields",children:"How do I connect a subset of Bundle fields?"}),"\n",(0,t.jsxs)(n.p,{children:['Chisel 3 requires types to match exactly for connections.\nDataView provides a mechanism for "viewing" one ',(0,t.jsx)(n.code,{children:"Bundle"})," object as if it were the type of another,\nwhich allows them to be connected."]}),"\n",(0,t.jsx)(n.h3,{id:"how-do-i-view-a-bundle-as-a-parent-type-superclass",children:"How do I view a Bundle as a parent type (superclass)?"}),"\n",(0,t.jsxs)(n.p,{children:["For viewing ",(0,t.jsx)(n.code,{children:"Bundles"})," as the type of the parent, it is as simple as using ",(0,t.jsx)(n.code,{children:"viewAsSupertype"})," and providing a\ntemplate object of the parent type:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.dataview._\n\nclass Foo extends Bundle {\n  val foo = UInt(8.W)\n}\nclass Bar extends Foo {\n  val bar = UInt(8.W)\n}\nclass MyModule extends Module {\n  val foo = IO(Input(new Foo))\n  val bar = IO(Output(new Bar))\n  bar.viewAsSupertype(new Foo) := foo // bar.foo := foo.foo\n  bar.bar := 123.U           // all fields need to be connected\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.83.0\nmodule MyModule(\n  input        clock,\n               reset,\n  input  [7:0] foo_foo,\n  output [7:0] bar_foo,\n               bar_bar\n);\n\n  assign bar_foo = foo_foo;\n  assign bar_bar = 8'h7B;\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.h3,{id:"how-do-i-view-a-bundle-as-a-parent-type-when-the-parent-type-is-abstract-like-a-trait",children:"How do I view a Bundle as a parent type when the parent type is abstract (like a trait)?"}),"\n",(0,t.jsxs)(n.p,{children:["Given the following ",(0,t.jsx)(n.code,{children:"Bundles"})," that share a common ",(0,t.jsx)(n.code,{children:"trait"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.dataview._\n\ntrait Super extends Bundle {\n  def bitwidth: Int\n  val a = UInt(bitwidth.W)\n}\nclass Foo(val bitwidth: Int) extends Super {\n  val foo = UInt(8.W)\n}\nclass Bar(val bitwidth: Int) extends Super {\n  val bar = UInt(8.W)\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"Foo"})," and ",(0,t.jsx)(n.code,{children:"Bar"})," cannot be connected directly, but they could be connected by viewing them both as if\nthey were instances of their common supertype, ",(0,t.jsx)(n.code,{children:"Super"}),".\nA straightforward approach might run into an issue like the following:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class MyModule extends Module {\n  val foo = IO(Input(new Foo(8)))\n  val bar = IO(Output(new Bar(8)))\n  bar.viewAsSupertype(new Super) := foo.viewAsSupertype(new Super)\n}\n// error: trait Super is abstract; cannot be instantiated\n//   bar.viewAsSupertype(new Super) := foo.viewAsSupertype(new Super)\n//                       ^^^^^^^^^\n// error: trait Super is abstract; cannot be instantiated\n//   bar.viewAsSupertype(new Super) := foo.viewAsSupertype(new Super)\n//                                                         ^^^^^^^^^\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The problem is that ",(0,t.jsx)(n.code,{children:"viewAs"})," requires an object to use as a type template (so that it can be cloned),\nbut ",(0,t.jsx)(n.code,{children:"traits"})," are abstract and cannot be instantiated.\nThe solution is to create an instance of an ",(0,t.jsx)(n.em,{children:"anonymous class"})," and use that object as the argument to ",(0,t.jsx)(n.code,{children:"viewAs"}),".\nWe can do this like so:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class MyModule extends Module {\n  val foo = IO(Input(new Foo(8)))\n  val bar = IO(Output(new Bar(8)))\n  val tpe = new Super { // Adding curly braces creates an anonymous class\n    def bitwidth = 8 // We must implement any abstract methods\n  }\n  bar.viewAsSupertype(tpe) := foo.viewAsSupertype(tpe)\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["By adding curly braces after the name of the trait, we're telling Scala to create a new concrete\nsubclass of the trait, and create an instance of it.\nAs indicated in the comment, abstract methods must still be implemented.\nThis is the same that happens when one writes ",(0,t.jsx)(n.code,{children:"new Bundle {}"}),",\nthe curly braces create a new concrete subclass; however, because ",(0,t.jsx)(n.code,{children:"Bundle"})," has no abstract methods,\nthe contents of the body can be empty."]}),"\n",(0,t.jsxs)(n.h3,{id:"how-can-i-use-viewas-instead-of-viewassupertypetype",children:["How can I use ",(0,t.jsx)(n.code,{children:".viewAs"})," instead of ",(0,t.jsx)(n.code,{children:".viewAsSupertype(type)"}),"?"]}),"\n",(0,t.jsxs)(n.p,{children:["While ",(0,t.jsx)(n.code,{children:"viewAsSupertype"})," is helpful for one-off casts, the need to provide a type template object\neach time can be onerous.\nBecause of the subtyping relationship, you can use ",(0,t.jsx)(n.code,{children:"PartialDataView.supertype"})," to create a\n",(0,t.jsx)(n.code,{children:"DataView"})," from a Bundle type to a parent type by just providing the function to construct an\ninstance of the parent type from an instance of the child type.\nThe mapping of corresponding fields is automatically determined by Chisel to be the fields defined\nin the supertype."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.experimental.dataview._\n\nclass Foo(x: Int) extends Bundle {\n  val foo = UInt(x.W)\n}\nclass Bar(val x: Int) extends Foo(x) {\n  val bar = UInt(x.W)\n}\n// Define a DataView without having to specify the mapping!\nimplicit val view = PartialDataView.supertype[Bar, Foo](b => new Foo(b.x))\n\nclass MyModule extends Module {\n  val foo = IO(Input(new Foo(8)))\n  val bar = IO(Output(new Bar(8)))\n  bar.viewAs[Foo] := foo // bar.foo := foo.foo\n  bar.bar := 123.U       // all fields need to be connected\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.83.0\nmodule MyModule(\n  input        clock,\n               reset,\n  input  [7:0] foo_foo,\n  output [7:0] bar_foo,\n               bar_bar\n);\n\n  assign bar_foo = foo_foo;\n  assign bar_bar = 8'h7B;\nendmodule\n\n"})})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},1871:(e,n,a)=>{a.d(n,{A:()=>s});a(6540);var t=a(5195);const o={tableOfContentsInline:"tableOfContentsInline_prmo"};var i=a(4848);function s(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:s}=e;return(0,i.jsx)("div",{className:o.tableOfContentsInline,children:(0,i.jsx)(t.A,{toc:n,minHeadingLevel:a,maxHeadingLevel:s,className:"table-of-contents",linkClassName:null})})}},5195:(e,n,a)=>{a.d(n,{A:()=>m});var t=a(6540),o=a(6342);function i(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),a=Array(7).fill(-1);n.forEach(((e,n)=>{const t=a.slice(2,e.level);e.parentIndex=Math.max(...t),a[e.level]=n}));const t=[];return n.forEach((e=>{const{parentIndex:a,...o}=e;a>=0?n[a].children.push(o):t.push(o)})),t}function s(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:t}=e;return n.flatMap((e=>{const n=s({toc:e.children,minHeadingLevel:a,maxHeadingLevel:t});return function(e){return e.level>=a&&e.level<=t}(e)?[{...e,children:n}]:n}))}function r(e){const n=e.getBoundingClientRect();return n.top===n.bottom?r(e.parentNode):n}function l(e,n){let{anchorTopOffset:a}=n;const t=e.find((e=>r(e).top>=a));if(t){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(r(t))?t:e[e.indexOf(t)-1]??null}return e[e.length-1]??null}function c(){const e=(0,t.useRef)(0),{navbar:{hideOnScroll:n}}=(0,o.p)();return(0,t.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function d(e){const n=(0,t.useRef)(void 0),a=c();(0,t.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:t,linkActiveClassName:o,minHeadingLevel:i,maxHeadingLevel:s}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(t),r=function(e){let{minHeadingLevel:n,maxHeadingLevel:a}=e;const t=[];for(let o=n;o<=a;o+=1)t.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(t.join()))}({minHeadingLevel:i,maxHeadingLevel:s}),c=l(r,{anchorTopOffset:a.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,a){a?(n.current&&n.current!==e&&n.current.classList.remove(o),e.classList.add(o),n.current=e):e.classList.remove(o)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,a])}var u=a(8774),p=a(4848);function h(e){let{toc:n,className:a,linkClassName:t,isChild:o}=e;return n.length?(0,p.jsx)("ul",{className:o?void 0:a,children:n.map((e=>(0,p.jsxs)("li",{children:[(0,p.jsx)(u.A,{to:`#${e.id}`,className:t??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,p.jsx)(h,{isChild:!0,toc:e.children,className:a,linkClassName:t})]},e.id)))}):null}const f=t.memo(h);function m(e){let{toc:n,className:a="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:l,minHeadingLevel:c,maxHeadingLevel:u,...h}=e;const m=(0,o.p)(),v=c??m.tableOfContents.minHeadingLevel,w=u??m.tableOfContents.maxHeadingLevel,b=function(e){let{toc:n,minHeadingLevel:a,maxHeadingLevel:o}=e;return(0,t.useMemo)((()=>s({toc:i(n),minHeadingLevel:a,maxHeadingLevel:o})),[n,a,o])}({toc:n,minHeadingLevel:v,maxHeadingLevel:w});return d((0,t.useMemo)((()=>{if(r&&l)return{linkClassName:r,linkActiveClassName:l,minHeadingLevel:v,maxHeadingLevel:w}}),[r,l,v,w])),(0,p.jsx)(f,{toc:b,className:a,linkClassName:r,...h})}},8453:(e,n,a)=>{a.d(n,{R:()=>s,x:()=>r});var t=a(6540);const o={},i=t.createContext(o);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);