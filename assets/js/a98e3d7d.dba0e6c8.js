"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[76],{2348:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=t(7624),r=t(2172);const i={layout:"docs",title:"Memories",section:"chisel3"},s="Memories",o={id:"explanations/memories",title:"Memories",description:"Chisel provides facilities for creating both read only and read/write memories.",source:"@site/docs/explanations/memories.md",sourceDirName:"explanations",slug:"/explanations/memories",permalink:"/docs/explanations/memories",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/memories.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Memories",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Layers",permalink:"/docs/explanations/layers"},next:{title:"Modules",permalink:"/docs/explanations/modules"}},d={},l=[{value:"ROM",id:"rom",level:2},{value:"Read-Write Memories",id:"read-write-memories",level:2},{value:"<code>SyncReadMem</code>: sequential/synchronous-read, sequential/synchronous-write",id:"syncreadmem-sequentialsynchronous-read-sequentialsynchronous-write",level:3},{value:"Read port/write port",id:"read-portwrite-port",level:4},{value:"Single-ported",id:"single-ported",level:4},{value:"<code>Mem</code>: combinational/asynchronous-read, sequential/synchronous-write",id:"mem-combinationalasynchronous-read-sequentialsynchronous-write",level:3},{value:"Masks",id:"masks",level:3},{value:"Memory Initialization",id:"memory-initialization",level:3},{value:"SRAM",id:"sram",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"memories",children:"Memories"}),"\n",(0,a.jsx)(n.p,{children:"Chisel provides facilities for creating both read only and read/write memories."}),"\n",(0,a.jsx)(n.h2,{id:"rom",children:"ROM"}),"\n",(0,a.jsxs)(n.p,{children:["Users can define read-only memories by constructing a ",(0,a.jsx)(n.code,{children:"Vec"})," with ",(0,a.jsx)(n.code,{children:"VecInit"}),".\n",(0,a.jsx)(n.code,{children:"VecInit"})," can accept either a variable-argument number of ",(0,a.jsx)(n.code,{children:"Data"})," literals or a ",(0,a.jsx)(n.code,{children:"Seq[Data]"})," literals that initialize the ROM."]}),"\n",(0,a.jsx)(n.p,{children:"For example, users can create a small ROM initialized to 1, 2, 4, 8 and loop through all values using a counter as an address generator as follows:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nimport chisel3.util.Counter\nval m = VecInit(1.U, 2.U, 4.U, 8.U)\nval c = Counter(m.length)\nc.inc()\nval r = m(c.value)\n"})}),"\n",(0,a.jsxs)(n.p,{children:["We can create an ",(0,a.jsx)(n.em,{children:"n"})," value sine lookup table generator using a ROM initialized as follows:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\n\nval Pi = math.Pi\ndef sinTable(amp: Double, n: Int) = {\n  val times =\n    (0 until n).map(i => (i*2*Pi)/(n.toDouble-1) - Pi)\n  val inits =\n    times.map(t => Math.round(amp * math.sin(t)).asSInt(32.W))\n  VecInit(inits)\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["where ",(0,a.jsx)(n.code,{children:"amp"})," is used to scale the fixpoint values stored in the ROM."]}),"\n",(0,a.jsx)(n.h2,{id:"read-write-memories",children:"Read-Write Memories"}),"\n",(0,a.jsx)(n.p,{children:"Memories are given special treatment in Chisel since hardware implementations of memory vary greatly. For example, FPGA memories are instantiated quite differently from ASIC memories. Chisel defines a memory abstraction that can map to either simple Verilog behavioural descriptions or to instances of memory modules that are available from external memory generators provided by foundry or IP vendors."}),"\n",(0,a.jsxs)(n.h3,{id:"syncreadmem-sequentialsynchronous-read-sequentialsynchronous-write",children:[(0,a.jsx)(n.code,{children:"SyncReadMem"}),": sequential/synchronous-read, sequential/synchronous-write"]}),"\n",(0,a.jsxs)(n.p,{children:["Chisel has a construct called ",(0,a.jsx)(n.code,{children:"SyncReadMem"})," for sequential/synchronous-read, sequential/synchronous-write memories. These ",(0,a.jsx)(n.code,{children:"SyncReadMem"}),"s will likely be synthesized to technology SRAMs (as opposed to register banks)."]}),"\n",(0,a.jsx)(n.p,{children:"If the same memory address is both written and sequentially read on the same clock edge, or if a sequential read enable is cleared, then the read data is undefined."}),"\n",(0,a.jsx)(n.p,{children:"Values on the read data port are not guaranteed to be held until the next read cycle. If that is the desired behavior, external logic to hold the last read value must be added."}),"\n",(0,a.jsx)(n.h4,{id:"read-portwrite-port",children:"Read port/write port"}),"\n",(0,a.jsxs)(n.p,{children:["Ports into ",(0,a.jsx)(n.code,{children:"SyncReadMem"}),"s are created by applying a ",(0,a.jsx)(n.code,{children:"UInt"})," index.  A 1024-entry SRAM with one write port and one read port might be expressed as follows:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass ReadWriteSmem extends Module {\n  val width: Int = 32\n  val io = IO(new Bundle {\n    val enable = Input(Bool())\n    val write = Input(Bool())\n    val addr = Input(UInt(10.W))\n    val dataIn = Input(UInt(width.W))\n    val dataOut = Output(UInt(width.W))\n  })\n\n  val mem = SyncReadMem(1024, UInt(width.W))\n  // Create one write port and one read port\n  mem.write(io.addr, io.dataIn)\n  io.dataOut := mem.read(io.addr, io.enable)\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Below is an example waveform of the one write port/one read port ",(0,a.jsx)(n.code,{children:"SyncReadMem"})," with ",(0,a.jsx)(n.a,{href:"#masks",children:"masks"}),". Note that the signal names will differ from the exact wire names generated for the ",(0,a.jsx)(n.code,{children:"SyncReadMem"}),". With masking, it is also possible that multiple RTL arrays will be generated with the behavior below."]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{src:"https://svg.wavedrom.com/github/freechipsproject/www.chisel-lang.org/master/docs/src/main/resources/json/smem_read_write.json",alt:"read/write ports example waveform"})}),"\n",(0,a.jsx)(n.h4,{id:"single-ported",children:"Single-ported"}),"\n",(0,a.jsxs)(n.p,{children:["Single-ported SRAMs can be inferred when the read and write conditions are mutually exclusive in the same ",(0,a.jsx)(n.code,{children:"when"})," chain:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass RWSmem extends Module {\n  val width: Int = 32\n  val io = IO(new Bundle {\n    val enable = Input(Bool())\n    val write = Input(Bool())\n    val addr = Input(UInt(10.W))\n    val dataIn = Input(UInt(width.W))\n    val dataOut = Output(UInt(width.W))\n  })\n\n  val mem = SyncReadMem(1024, UInt(width.W))\n  io.dataOut := DontCare\n  when(io.enable) {\n    val rdwrPort = mem(io.addr)\n    when (io.write) { rdwrPort := io.dataIn }\n      .otherwise    { io.dataOut := rdwrPort }\n  }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["(The ",(0,a.jsx)(n.code,{children:"DontCare"})," is there to make Chisel's ",(0,a.jsx)(n.a,{href:"unconnected-wires",children:"unconnected wire detection"})," aware that reading while writing is undefined.)"]}),"\n",(0,a.jsxs)(n.p,{children:["Here is an example single read/write port waveform, with ",(0,a.jsx)(n.a,{href:"#masks",children:"masks"})," (again, generated signal names and number of arrays may differ):"]}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{src:"https://svg.wavedrom.com/github/freechipsproject/www.chisel-lang.org/master/docs/src/main/resources/json/smem_rw.json",alt:"read/write ports example waveform"})}),"\n",(0,a.jsxs)(n.p,{children:["Single-ported SRAMs can also be explicitly generated by using the ",(0,a.jsx)(n.code,{children:"readWrite"})," call, which yields a single read/write accessor like so:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"class RDWR_Smem extends Module {\n  val width: Int = 32\n  val io = IO(new Bundle {\n    val enable = Input(Bool())\n    val write = Input(Bool())\n    val addr = Input(UInt(10.W))\n    val dataIn = Input(UInt(width.W))\n    val dataOut = Output(UInt(width.W))\n  })\n\n  val mem = SyncReadMem(1024, UInt(width.W))\n  io.dataOut := mem.readWrite(io.addr, io.dataIn, io.enable, io.write)\n}\n"})}),"\n",(0,a.jsxs)(n.h3,{id:"mem-combinationalasynchronous-read-sequentialsynchronous-write",children:[(0,a.jsx)(n.code,{children:"Mem"}),": combinational/asynchronous-read, sequential/synchronous-write"]}),"\n",(0,a.jsxs)(n.p,{children:["Chisel supports random-access memories via the ",(0,a.jsx)(n.code,{children:"Mem"})," construct. Writes to ",(0,a.jsx)(n.code,{children:"Mem"}),"s are combinational/asynchronous-read, sequential/synchronous-write. These ",(0,a.jsx)(n.code,{children:"Mem"}),"s will likely be synthesized to register banks, since most SRAMs in modern technologies (FPGA, ASIC) tend to no longer support combinational (asynchronous) reads."]}),"\n",(0,a.jsxs)(n.p,{children:["Creating asynchronous-read versions of the examples above simply involves replacing ",(0,a.jsx)(n.code,{children:"SyncReadMem"})," with ",(0,a.jsx)(n.code,{children:"Mem"}),"."]}),"\n",(0,a.jsx)(n.h3,{id:"masks",children:"Masks"}),"\n",(0,a.jsxs)(n.p,{children:["Chisel memories also support write masks for subword writes. Chisel will infer masks if the data type of the memory is a vector. To infer a mask, specify the ",(0,a.jsx)(n.code,{children:"mask"})," argument of the ",(0,a.jsx)(n.code,{children:"write"})," function which creates write ports. A given masked length is written if the corresponding mask bit is set. For example, in the example below, if the 0th bit of mask is true, it will write the lower byte of the data at corresponding address."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass MaskedReadWriteSmem extends Module {\n  val width: Int = 8\n  val io = IO(new Bundle {\n    val enable = Input(Bool())\n    val write = Input(Bool())\n    val addr = Input(UInt(10.W))\n    val mask = Input(Vec(4, Bool()))\n    val dataIn = Input(Vec(4, UInt(width.W)))\n    val dataOut = Output(Vec(4, UInt(width.W)))\n  })\n\n  // Create a 32-bit wide memory that is byte-masked\n  val mem = SyncReadMem(1024, Vec(4, UInt(width.W)))\n  // Write with mask\n  mem.write(io.addr, io.dataIn, io.mask)\n  io.dataOut := mem.read(io.addr, io.enable)\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Here is an example of masks with readwrite ports:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3._\nclass MaskedRWSmem extends Module {\n  val width: Int = 32\n  val io = IO(new Bundle {\n    val enable = Input(Bool())\n    val write = Input(Bool())\n    val mask = Input(Vec(2, Bool()))\n    val addr = Input(UInt(10.W))\n    val dataIn = Input(Vec(2, UInt(width.W)))\n    val dataOut = Output(Vec(2, UInt(width.W)))\n  })\n\n  val mem = SyncReadMem(1024, Vec(2, UInt(width.W)))\n  io.dataOut := DontCare\n  when(io.enable) {\n    val rdwrPort = mem(io.addr)\n    when (io.write) {\n      when(io.mask(0)) {\n        rdwrPort(0) := io.dataIn(0)\n      }\n      when(io.mask(1)) {\n        rdwrPort(1) := io.dataIn(1)\n      }\n    }.otherwise { io.dataOut := rdwrPort }\n  }\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"memory-initialization",children:"Memory Initialization"}),"\n",(0,a.jsxs)(n.p,{children:["Chisel memories can be initialized from an external ",(0,a.jsx)(n.code,{children:"binary"})," or ",(0,a.jsx)(n.code,{children:"hex"})," file emitting proper Verilog for synthesis or simulation. There are multiple modes of initialization."]}),"\n",(0,a.jsxs)(n.p,{children:["For more information, check the experimental docs on ",(0,a.jsx)(n.a,{href:"../appendix/experimental-features#loading-memories",children:"Loading Memories"})," feature."]}),"\n",(0,a.jsx)(n.h2,{id:"sram",children:"SRAM"}),"\n",(0,a.jsxs)(n.p,{children:["Chisel provides an API to generate ",(0,a.jsx)(n.code,{children:"SRAMs"}),", an alternative APIs for ",(0,a.jsx)(n.code,{children:"SyncReadMem"}),"."]}),"\n",(0,a.jsxs)(n.p,{children:["The key difference between the ",(0,a.jsx)(n.code,{children:"SRAM"})," and ",(0,a.jsx)(n.code,{children:"SyncReadMem"})," APIs is the former's capability to declare a specific number of read, write, and read-write memory ports, which are interacted with using explicit bundles."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"import chisel3.util._\n\nclass ModuleWithSRAM(numReadPorts: Int, numWritePorts: Int, numReadwritePorts: Int) extends Module {\n  val width: Int = 8\n\n  val io = IO(new SRAMInterface(1024, UInt(width.W), numReadPorts, numWritePorts, numReadwritePorts))\n\n  // Generate a SyncReadMem representing an SRAM with an explicit number of read, write, and read-write ports\n  io :<>= SRAM(1024, UInt(width.W), numReadPorts, numWritePorts, numReadwritePorts)\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["To interact with a desired port, use the ",(0,a.jsx)(n.code,{children:"readPorts"}),", ",(0,a.jsx)(n.code,{children:"writePorts"}),", and ",(0,a.jsx)(n.code,{children:"readwritePorts"})," fields:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"class TopModule extends Module {\n  // Declare a 2 read, 2 write, 2 read-write ported SRAM with 8-bit UInt data members\n  val mem = SRAM(1024, UInt(8.W), 2, 2, 2)\n\n  // Whenever we want to read from the first read port\n  mem.readPorts(0).address := 100.U\n  mem.readPorts(0).enable := true.B\n\n  // Read data is returned one cycle after enable is driven\n  val foo = WireInit(UInt(8.W), mem.readPorts(0).data)\n\n  // Whenever we want to write to the second write port\n  mem.writePorts(1).address := 5.U\n  mem.writePorts(1).enable := true.B\n  mem.writePorts(1).data := 12.U\n\n  // Whenever we want to read or write to the third read-write port\n  // Write:\n  mem.readwritePorts(2).address := 5.U\n  mem.readwritePorts(2).enable := true.B\n  mem.readwritePorts(2).isWrite := true.B\n  mem.readwritePorts(2).writeData := 100.U\n\n  // Read:\n  mem.readwritePorts(2).address := 5.U\n  mem.readwritePorts(2).enable := true.B\n  mem.readwritePorts(2).isWrite := false.B\n  val bar = WireInit(UInt(8.W), mem.readwritePorts(2).readData)\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,r.M)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>o,M:()=>s});var a=t(1504);const r={},i=a.createContext(r);function s(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);