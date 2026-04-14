import { useEffect, useRef, useState } from "react";
import { ReactFlow, ReactFlowProvider, Background, Handle, Position, MarkerType, useReactFlow } from "@xyflow/react";
import type { Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Maximize2, Plus, Minus, Crosshair } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

/**
 * Buyer F&I flow — MyHome equivalent of the We Buy Cars F&I handover.
 * Rendered with React Flow so we can control arrow exit points explicitly.
 */

const ROA_NAME = "ROA";
const ROA_WORKING = "Home Ready Quote";
const ROA_TAG = "Your personal affordability & bond fit check";

const NAME_ALTERNATIVES = [
  { name: "Home Ready Quote", vibe: "working name · protective" },
  { name: "Home Match", vibe: "warm · matchmaker" },
  { name: "Ready Check", vibe: "confident · action" },
  { name: "Bond Fit", vibe: "crisp · product-y" },
  { name: "The Green Light", vibe: "reassuring · go-signal" },
];

/* ---------- Custom node ---------- */

type StepData = {
  title: string;
  subtitle?: string;
  variant: "person" | "step" | "handover" | "bank" | "done" | "roa" | "question";
  large?: boolean;
};

const VARIANTS: Record<StepData["variant"], string> = {
  person: "bg-[#0C2340] text-white border-[#0C2340]",
  step: "bg-white text-[#0C2340] border-slate-300",
  handover: "bg-[#3DBFAD] text-white border-[#0C9488]",
  bank: "bg-sky-50 text-[#0C2340] border-sky-400",
  done: "bg-emerald-50 text-emerald-900 border-emerald-500",
  roa: "bg-white text-[#0C2340] border-[#3DBFAD]",
  question: "bg-amber-50 text-amber-900 border-amber-500",
};

function StepNode({ data }: NodeProps<Node<StepData>>) {
  return (
    <div
      className={`rounded-lg border-2 text-center shadow-sm ${
        data.large ? "px-5 py-4 min-w-[280px]" : "px-3 py-2 min-w-[160px]"
      } ${VARIANTS[data.variant]}`}
    >
      <div className={`font-bold leading-tight ${data.large ? "text-[16px]" : "text-[12px]"}`}>
        {data.title}
      </div>
      {data.subtitle && (
        <div className={`opacity-80 mt-1 leading-snug ${data.large ? "text-[13px]" : "text-[10px]"}`}>
          {data.subtitle}
        </div>
      )}
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
      {/* also allow reverse direction */}
      <Handle id="t-s" type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l-s" type="source" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b-t" type="target" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r-t" type="target" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

function FrameNode({ data }: NodeProps<Node<{ label: string; sub: string }>>) {
  return (
    <div className="w-full h-full rounded-2xl border-2 border-[#3DBFAD] bg-[#3DBFAD]/5 relative pointer-events-none">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-[#3DBFAD] whitespace-nowrap">
        ⭐ {data.label}
      </div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 italic whitespace-nowrap">
        {data.sub}
      </div>
    </div>
  );
}

const BANKS = [
  { name: "Nedbank",       logo: "🟢", rate: "9.50%",  note: "P − 0.75", best: true  },
  { name: "Absa",          logo: "🔴", rate: "10.00%", note: "P − 0.25", best: false },
  { name: "Standard Bank", logo: "🔵", rate: "10.25%", note: "Prime",     best: false },
  { name: "FNB",           logo: "🟠", rate: "10.00%", note: "P − 0.25", best: false },
];

function BankOffersNode() {
  return (
    <div className="rounded-lg border-2 border-sky-400 bg-sky-50 shadow-sm min-w-[240px]">
      <div className="px-3 py-1.5 border-b border-sky-200 text-center">
        <div className="text-[11px] font-bold text-[#0C2340]">📊 Bank offers</div>
        <div className="text-[9px] text-slate-500">4 offers received · prime = 10.25%</div>
      </div>
      <div className="divide-y divide-sky-100">
        {BANKS.map((b) => (
          <div
            key={b.name}
            className={`flex items-center gap-2 px-3 py-1.5 ${b.best ? "bg-emerald-50" : ""}`}
          >
            <span className="text-[12px]">{b.logo}</span>
            <span className="text-[10px] font-semibold text-[#0C2340] flex-1 truncate">
              {b.name}
            </span>
            <span className={`text-[10px] font-bold tabular-nums ${b.best ? "text-emerald-700" : "text-slate-700"}`}>
              {b.rate}
            </span>
            <span className="text-[9px] text-slate-400 tabular-nums w-[46px] text-right">
              {b.note}
            </span>
            {b.best && (
              <span className="text-[8px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-1 rounded">
                Best
              </span>
            )}
          </div>
        ))}
      </div>
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

function AnchorNode() {
  return (
    <div style={{ width: 1, height: 1 }}>
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
    </div>
  );
}

const DISBURSEMENTS = [
  { label: "Seller", sub: "net proceeds", icon: "💰" },
  { label: "Seller's existing bond", sub: "settled with their bank", icon: "🏦" },
  { label: "Estate agent", sub: "commission (seller's side)", icon: "🏷️" },
  { label: "SARS", sub: "transfer duty (buyer)", icon: "🏛️" },
  { label: "Municipality · HOA", sub: "rates clearance · levies", icon: "🏢" },
  { label: "Attorney fees", sub: "transferring + bond", icon: "📜" },
  { label: "MyHome F&I slice", sub: "per Record of Advice", icon: "🏠", highlight: true },
];

function AttorneyDisbursementsNode() {
  return (
    <div className="rounded-lg border-2 border-slate-300 bg-white shadow-sm min-w-[260px]">
      <div className="px-3 py-1.5 border-b border-slate-200 text-center bg-slate-50">
        <div className="text-[11px] font-bold text-[#0C2340]">⚖️ Attorney disbursements</div>
        <div className="text-[9px] text-slate-500">from trust · per bank & sale mandates</div>
      </div>
      <div className="divide-y divide-slate-100">
        {DISBURSEMENTS.map((d) => (
          <div
            key={d.label}
            className={`flex items-center gap-2 px-3 py-1.5 ${
              d.highlight ? "bg-[#3DBFAD]/10" : ""
            }`}
          >
            <span className="text-[12px]">{d.icon}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-[10px] font-semibold truncate ${d.highlight ? "text-[#0C2340]" : "text-[#0C2340]"}`}>
                {d.label}
              </div>
              <div className="text-[9px] text-slate-500 truncate">{d.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

function HouseNode({ data }: NodeProps<Node<StepData>>) {
  const W = 180;
  return (
    <div className="relative" style={{ width: W }}>
      {/* Roof + chimney */}
      <svg width={W} height="56" viewBox={`0 0 ${W} 56`} className="block">
        <rect x="130" y="8" width="18" height="28" fill="#0C2340" />
        <polygon points={`4,56 ${W / 2},4 ${W - 4},56`} fill="#3DBFAD" stroke="#0C2340" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      {/* Body */}
      <div className="relative bg-white border-2 border-t-0 border-[#0C2340] rounded-b-lg px-3 pt-3 pb-10 text-center shadow-md -mt-px">
        <div className="text-[13px] font-bold text-[#0C2340] leading-tight">{data.title}</div>
        {data.subtitle && (
          <div className="text-[10px] text-slate-500 mt-1 leading-snug">{data.subtitle}</div>
        )}
        {/* Door */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-7 h-8 bg-[#0C2340] rounded-t-md" />
        {/* Windows */}
        <div className="absolute left-3 bottom-2 w-4 h-4 bg-[#3DBFAD]/30 border border-[#0C2340]" />
        <div className="absolute right-3 bottom-2 w-4 h-4 bg-[#3DBFAD]/30 border border-[#0C2340]" />
      </div>
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0, top: "60%" }} />
      <Handle id="l-buyer" type="target" position={Position.Left} style={{ opacity: 0, top: "35%" }} />
      <Handle id="l-agent" type="target" position={Position.Left} style={{ opacity: 0, top: "85%" }} />
      <Handle id="r-otp" type="source" position={Position.Right} style={{ opacity: 0, top: "60%" }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0, top: "60%" }} />
    </div>
  );
}

const nodeTypes = {
  step: StepNode,
  frame: FrameNode,
  bankOffers: BankOffersNode,
  anchor: AnchorNode,
  attorneyDisbursements: AttorneyDisbursementsNode,
  house: HouseNode,
};

/* ---------- Layout ---------- */

// Layout constants
const ROA_X = 640;
const ROA_W = 220;
const STEP_DY = 78;
const STEP_X = ROA_X + 20;
const CALC_Y = 200;
const REC_Y = CALC_Y + STEP_DY * 2; // middle step
const ADDONS_Y = CALC_Y + STEP_DY * 4;
const ROA_FRAME_Y = CALC_Y - 30;
const ROA_FRAME_H = ADDONS_Y - CALC_Y + 90;
const RIGHT_X = 980;

const nodes: Node[] = [
  // ROA frame — rendered first so it sits behind the step nodes
  {
    id: "roa-frame",
    type: "frame",
    position: { x: ROA_X, y: ROA_FRAME_Y },
    style: { width: ROA_W, height: ROA_FRAME_H },
    data: { label: `ROA · ${ROA_WORKING}`, sub: "the buyer experience" },
    draggable: false,
    selectable: false,
  },

  // Top row
  { id: "buyer", type: "step", position: { x: 30, y: 40 }, data: { title: "🙋 Buyer", variant: "person" } },
  { id: "agent", type: "step", position: { x: 30, y: 110 }, data: { title: "🏷️ Estate Agent", variant: "person" } },
  { id: "house", type: "house", position: { x: 220, y: 20 }, data: { title: "The house", subtitle: "found together", variant: "step" } },
  { id: "otp", type: "step", position: { x: 440, y: 75 }, data: { title: "📝 OTP signed", subtitle: "Offer captured", variant: "step" } },
  { id: "handover", type: "step", position: { x: STEP_X, y: 75 }, data: { title: "💼 Bond Consultant", subtitle: "warm handover from agent", variant: "handover" } },

  // ROA vertical stack — Affordability → Add-ons (early) → Update OTP → Recording → E-sig
  { id: "calc",   type: "step", position: { x: STEP_X, y: CALC_Y + STEP_DY * 0 }, data: { title: "💰 Affordability", subtitle: "Live, mobile-first", variant: "roa" } },
  { id: "addons", type: "step", position: { x: STEP_X, y: CALC_Y + STEP_DY * 1 }, data: { title: "🎁 F&I Add-Ons", subtitle: "Insurance · Vault", variant: "roa" } },
  { id: "update", type: "step", position: { x: STEP_X, y: CALC_Y + STEP_DY * 2 }, data: { title: "✏️ Update OTP", subtitle: "Add-ons rolled in", variant: "roa" } },
  { id: "rec",    type: "step", position: { x: STEP_X, y: CALC_Y + STEP_DY * 3 }, data: { title: "🎙️ Recording", subtitle: "Invisible compliance", variant: "roa" } },
  { id: "sig",    type: "step", position: { x: STEP_X, y: ADDONS_Y },             data: { title: "✍️ E-signature", subtitle: "Own device", variant: "roa" } },

  // Invisible anchor sitting on the right edge of the ROA frame, aligned
  // vertically with Update OTP — so the arrow appears to start at the box edge.
  { id: "roa-exit", type: "anchor", position: { x: ROA_X + ROA_W, y: CALC_Y + STEP_DY * 2 + 27 }, data: {}, draggable: false, selectable: false },

  // Right-side continuation — Banks aligned with Update OTP (middle step)
  { id: "banks",  type: "step", position: { x: RIGHT_X, y: REC_Y - STEP_DY }, data: { title: "🏦 Multi-bank", subtitle: "submission", variant: "bank" } },
  { id: "offers", type: "bankOffers", position: { x: RIGHT_X - 40, y: REC_Y - 10 }, data: {} },
  { id: "grant",  type: "step", position: { x: RIGHT_X, y: REC_Y + STEP_DY * 2 + 40 },  data: { title: "✅ Bond granted", subtitle: "best rate accepted", variant: "done" } },
  { id: "attorney", type: "step", position: { x: RIGHT_X + 260, y: REC_Y + STEP_DY * 2 + 40 }, style: { width: 260 }, data: { title: "⚖️ Attorney", subtitle: "trust account · disburses per mandate", variant: "handover" } },

  // Inflow: buyer's cash (deposit + balance) into the attorney's trust
  { id: "cash-in", type: "step", position: { x: RIGHT_X + 260, y: REC_Y + STEP_DY * 2 - 130 }, style: { width: 260 }, data: { title: "💵 Buyer's own funds", subtitle: "Deposit paid on OTP + any balance of the purchase price not covered by the bond (full price on a cash deal).", variant: "step" } },

  // Outflows
  { id: "disbursements", type: "attorneyDisbursements", position: { x: RIGHT_X + 580, y: REC_Y + STEP_DY * 2 - 100 }, data: {} },
];

type Dir = "r" | "l" | "t" | "b";
const edge = (
  id: string,
  source: string,
  sDir: Dir,
  target: string,
  tDir: Dir,
  opts: Partial<Edge> = {}
): Edge => {
  const sourceHandle = sDir === "t" ? "t-s" : sDir === "l" ? "l-s" : sDir; // b, r
  const targetHandle = tDir === "b" ? "b-t" : tDir === "r" ? "r-t" : tDir; // t, l
  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    type: "straight",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    ...opts,
  };
};

const edges: Edge[] = [
  edge("e-buyer-house", "buyer", "r", "house", "l", { targetHandle: "l-buyer" }),
  edge("e-agent-house", "agent", "r", "house", "l", { targetHandle: "l-agent" }),
  edge("e-house-otp", "house", "r", "otp", "l", { sourceHandle: "r-otp" }),
  edge("e-otp-handover", "otp", "r", "handover", "l"),
  edge("e-handover-calc", "handover", "b", "calc", "t"),
  edge("e-calc-addons", "calc", "b", "addons", "t"),
  edge("e-addons-update", "addons", "b", "update", "t"),
  edge("e-update-rec", "update", "b", "rec", "t"),
  edge("e-rec-sig", "rec", "b", "sig", "t"),
  // Midpoint exit — arrow starts at the right edge of the ROA box (anchor)
  edge("e-roa-banks", "roa-exit", "r", "banks", "l", {
    type: "smoothstep",
    pathOptions: { borderRadius: 0 },
    style: { stroke: "#3DBFAD", strokeWidth: 2.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3DBFAD" },
  }),
  edge("e-banks-offers", "banks", "b", "offers", "t"),
  edge("e-offers-grant", "offers", "b", "grant", "t"),
  edge("e-grant-attorney", "grant", "r", "attorney", "l", {
    type: "straight",
    label: "bond funds",
    labelStyle: { fill: "#0C2340", fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: "#ffffff" },
    labelBgPadding: [4, 2],
  }),
  edge("e-cash-attorney", "cash-in", "b", "attorney", "t", {
    type: "straight",
    label: "cash deposit",
    labelStyle: { fill: "#0C2340", fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: "#ffffff" },
    labelBgPadding: [4, 2],
  }),
  edge("e-attorney-disbursements", "attorney", "r", "disbursements", "l", {
    type: "straight",
    style: { stroke: "#0C2340", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#0C2340" },
  }),
];

/* ---------- Commercial model flow ---------- */

const commercialNodes: Node[] = [
  { id: "sold", type: "step", position: { x: 200, y: 20 }, data: { title: "🏠 Property sold", variant: "person" } },
  { id: "cash", type: "step", position: { x: 40, y: 130 }, data: { title: "💵 Cash", subtitle: "~50%", variant: "step" } },
  { id: "fin", type: "step", position: { x: 360, y: 130 }, data: { title: "💳 Finance", subtitle: "~50%", variant: "roa" } },
  { id: "agentonly", type: "step", position: { x: 40, y: 240 }, data: { title: "🏷️ Agent only", subtitle: "No F&I revenue", variant: "step" } },
  { id: "bc", type: "step", position: { x: 360, y: 240 }, data: { title: "💼 Bond Consultant", subtitle: "F&I + add-ons", variant: "roa" } },
  { id: "q", type: "step", position: { x: 20, y: 360 }, data: { title: "❓ On a cash deal", subtitle: "how do we get the agent to push F&I?", variant: "question", large: true } },
];

const dashed = { style: { stroke: "#94a3b8", strokeDasharray: "4 4", strokeWidth: 1.5 } };

const commercialEdges: Edge[] = [
  edge("c1", "sold", "b", "cash", "t"),
  edge("c2", "sold", "b", "fin", "t"),
  edge("c3", "cash", "b", "agentonly", "t"),
  edge("c4", "fin", "b", "bc", "t"),
  edge("c5", "agentonly", "b", "q", "t", dashed),
];

/* ---------- Page ---------- */

function FlowControls({ onFullscreen }: { onFullscreen: () => void }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const btn =
    "flex items-center justify-center w-7 h-7 text-slate-500 hover:text-[#0C2340] border border-slate-200 hover:border-slate-300 rounded-md transition-colors";
  return (
    <div className="flex items-center gap-1.5">
      <button type="button" onClick={() => zoomIn()} aria-label="Zoom in" className={btn}>
        <Plus className="w-3.5 h-3.5" />
      </button>
      <button type="button" onClick={() => zoomOut()} aria-label="Zoom out" className={btn}>
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button type="button" onClick={() => fitView({ padding: 0.15 })} aria-label="Fit view" className={btn}>
        <Crosshair className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onFullscreen}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-[#0C2340] border border-slate-200 hover:border-slate-300 rounded-md px-2.5 h-7 transition-colors ml-1"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        Fullscreen
      </button>
    </div>
  );
}

export default function BuyerFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const goFullscreen = () => {
    const el = flowRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <AppHeader label="Buyer F&I Flow · MyHome ↔ We Buy Cars" />

      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Meeting mapping · Denise @ We Buy Cars · 08 Apr 2026
            </p>
            <h3 className="text-lg font-bold text-[#0C2340] mb-2">
              From OTP to bond grant — the MyHome F&I flow
            </h3>
            <p className="text-[13px] text-slate-600 leading-relaxed max-w-3xl">
              WBC's F&I desk takes over at the OTP stage and bundles add-ons before the
              bank. This page maps the equivalent for MyHome. The compliance step
              (ROA) gets a friendlier working name so it feels like a service, not paperwork.
            </p>
          </div>

          {/* Main flow — React Flow canvas */}
          <ReactFlowProvider>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  End-to-end flow
                </p>
                <FlowControls onFullscreen={goFullscreen} />
              </div>
              <div
                ref={flowRef}
                className="bg-white"
                style={{ width: "100%", height: isFullscreen ? "100vh" : 720 }}
              >
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.15 }}
                  proOptions={{ hideAttribution: true }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag
                  zoomOnScroll
                >
                  <Background color="#e2e8f0" gap={20} />
                </ReactFlow>
              </div>
            </div>
          </ReactFlowProvider>

          {/* Two-col detail: ROA deep-dive + Commercial model */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                The centrepiece
              </p>
              <h3 className="text-lg font-bold text-[#0C2340] mb-1">
                {ROA_NAME}{" "}
                <span className="text-[13px] font-normal text-slate-500 align-middle">
                  ({ROA_WORKING})
                </span>
              </h3>
              <p className="text-[13px] text-slate-600 mb-5">{ROA_TAG}</p>

              <div className="space-y-3">
                {[
                  { k: "Affordability calculator", v: "Live, buyer-led, mobile-first. Not a PDF." },
                  { k: "F&I Add-Ons", v: "Insurance, DocVault, conveyancing, moving, utilities — offered early so they roll into the OTP." },
                  { k: "Update OTP", v: "Any conditions, amendments, and chosen add-ons captured in one place." },
                  { k: "Recording", v: "Compliance happens in the background — buyer never sees the word 'ROA'." },
                  { k: "E-signature", v: "Buyer finishes on their phone, on their own time." },
                ].map((row) => (
                  <div key={row.k} className="flex gap-3 items-start border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#0C2340]">{row.k}</p>
                      <p className="text-[12px] text-slate-500 leading-relaxed">{row.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                The open question
              </p>
              <h3 className="text-lg font-bold text-[#0C2340] mb-1">
                How do we get agents to offer this?
              </h3>
              <p className="text-[13px] text-slate-600 mb-5">
                Roughly half of properties sell cash. The Bond Consultant only earns on
                the finance half — so the incentive design matters.
              </p>

              <div style={{ width: "100%", height: 460 }}>
                <ReactFlow
                  nodes={commercialNodes}
                  edges={commercialEdges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.15 }}
                  proOptions={{ hideAttribution: true }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                >
                  <Background color="#e2e8f0" gap={20} />
                </ReactFlow>
              </div>

            </div>
          </div>

        </div>
      </section>

      <AppFooter label="Internal view · Not for distribution" />
    </div>
  );
}
