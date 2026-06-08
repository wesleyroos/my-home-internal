/*
 * Seller Journey — Figma-style user-flow.
 * Same treatment as the other persona flows. Seller-specific shape: opens with
 * a Loom valuation to set the price, the seller nominates the transfer attorney
 * (not the bank), CoCs + improvements are pre-sale prep, and the journey often
 * runs concurrently with a Buyer journey for the same person — one BetterID,
 * two flows.
 */

import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import type { Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Maximize2 } from "lucide-react";
import { Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";

// Brand
const NAVY = "#0C2340";
const AMBER = "#F59E0B";
const SKY = "#0EA5E9";

// Portrait box dimensions
const BOX_W = 210;
const BOX_H = 280;

// ─── Shared handle set (all four sides, source + target) ───────────────────

function Handles() {
  return (
    <>
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle id="t-s" type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="b-t" type="target" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r-t" type="target" position={Position.Right} style={{ opacity: 0 }} />
      <Handle id="l-s" type="source" position={Position.Left} style={{ opacity: 0 }} />
    </>
  );
}

// ─── Node kinds ─────────────────────────────────────────────────────────────

type Kind = "step" | "decision" | "terminal";

type BoxData = {
  step?: string;
  title: string;
  lines: string[];
  by?: string; // decision only — who owns the call
  highlight?: string; // step only — emphasised product tag
  accent?: boolean; // step only — a MyHome rails moment (teal border)
};

// Rectangular portrait box for steps and terminals.
function makeBox(kind: Exclude<Kind, "decision">) {
  return function BoxNode({ data }: NodeProps<Node<BoxData>>) {
    const isTerminal = kind === "terminal";
    const isHighlight = !isTerminal && !!data.highlight;
    const isAccent = !isTerminal && (isHighlight || !!data.accent);

    const shell = isTerminal
      ? "bg-[#0C2340] border-[#0C2340]"
      : isAccent
      ? "bg-white border-[#3DBFAD]"
      : "bg-white border-[#0C2340]/25";
    const titleColour = isTerminal ? "text-white" : "text-[#0C2340]";
    const lineColour = isTerminal ? "text-white/70" : "text-slate-500";
    const tagText = isTerminal ? "Hand-off" : data.step;
    const tagCls = isTerminal ? "bg-[#3DBFAD] text-white" : "bg-[#3DBFAD]/15 text-[#0F6E56]";

    return (
      <div
        className={`rounded-xl border-2 shadow-sm flex flex-col px-4 py-4 ${shell} ${
          isAccent ? "ring-2 ring-[#3DBFAD]/30" : ""
        }`}
        style={{ width: BOX_W, height: BOX_H }}
      >
        <Handles />
        {tagText && (
          <div
            className={`self-start text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${tagCls}`}
          >
            {tagText}
          </div>
        )}
        <div className={`mt-3 text-[16px] font-extrabold leading-tight ${titleColour}`}>
          {data.title}
        </div>
        <ul className="mt-3 space-y-1.5 flex-1">
          {data.lines.map((l, i) => (
            <li key={i} className={`text-[11.5px] leading-snug flex gap-1.5 ${lineColour}`}>
              <span className="flex-shrink-0">·</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
}

// Decision node — a small dashed hexagon.
const DEC_W = 210;
const DEC_H = 116;

function DecisionNode({ data }: NodeProps<Node<BoxData>>) {
  const p = 30;
  const pts = [
    `${p},2`,
    `${DEC_W - p},2`,
    `${DEC_W - 2},${DEC_H / 2}`,
    `${DEC_W - p},${DEC_H - 2}`,
    `${p},${DEC_H - 2}`,
    `2,${DEC_H / 2}`,
  ].join(" ");
  return (
    <div className="relative" style={{ width: DEC_W, height: DEC_H }}>
      <Handles />
      <svg width={DEC_W} height={DEC_H} className="absolute inset-0 overflow-visible">
        <polygon
          points={pts}
          fill="#FFFBEB"
          stroke={AMBER}
          strokeWidth={2}
          strokeDasharray="5 4"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-9">
        <div className="text-[8px] font-bold tracking-widest uppercase text-amber-500 mb-1">
          Decision
        </div>
        <div className="text-[13px] font-extrabold leading-tight text-[#0C2340]">{data.title}</div>
        {data.by && (
          <div className="mt-1 text-[9px] leading-snug text-amber-700/70">{data.by}</div>
        )}
      </div>
    </div>
  );
}

const nodeTypes = {
  step: makeBox("step"),
  decision: DecisionNode,
  terminal: makeBox("terminal"),
};

// ─── Layout ─────────────────────────────────────────────────────────────────

const COL = BOX_W + 180; // horizontal stride — room for edge labels
const SPINE_Y = 80;
const BRANCH_Y = SPINE_Y + BOX_H + 130;
const DEC_Y = SPINE_Y + (BOX_H - DEC_H) / 2;

const x = (c: number) => 60 + c * COL;

const C = {
  valuation: 0,
  mandate: 1,
  list: 2,
  offer: 3,
  otp: 4,
  improvements: 5,
  cocs: 6,
  attorney: 7,
  signdocs: 8,
  registration: 9,
  removals: 10,
  exit: 11,
};

const nodes: Node[] = [
  // ── Main spine ────────────────────────────────────────────────────────────
  {
    id: "valuation",
    type: "step",
    position: { x: x(C.valuation), y: SPINE_Y },
    data: {
      step: "Step 01 · Loom",
      title: "Property valuation",
      lines: ["Suburb & property valuation", "Sets a realistic asking price", "Powered by Loom data"],
    },
    draggable: false,
  },
  {
    id: "mandate",
    type: "step",
    position: { x: x(C.mandate), y: SPINE_Y },
    data: {
      step: "Step 02 · BetterID",
      title: "Mandate & KYC",
      lines: ["Appoint agent, sign mandate", "Seller verified once (BetterID)", "Same identity as their buyer journey"],
    },
    draggable: false,
  },
  {
    id: "list",
    type: "step",
    position: { x: x(C.list), y: SPINE_Y },
    data: {
      step: "Step 03 · Agent",
      title: "List & market",
      lines: ["Listed on Private Property", "Photos & viewings", "Offers come in"],
    },
    draggable: false,
  },
  {
    id: "offer",
    type: "decision",
    position: { x: x(C.offer), y: DEC_Y },
    data: { title: "Offer acceptable?", by: "accept · counter · reject" },
    draggable: false,
  },
  {
    id: "otp",
    type: "step",
    position: { x: x(C.otp), y: SPINE_Y },
    data: {
      step: "Step 04 · Agent",
      title: "OTP signed (accepted)",
      lines: ["Seller accepts & signs", "Same OTP as the buyer's flow", "Shared in the rails — Doc Vault"],
      accent: true,
    },
    draggable: false,
  },
  {
    id: "improvements",
    type: "step",
    position: { x: x(C.improvements), y: SPINE_Y },
    data: {
      step: "Step 05",
      title: "Improvements",
      lines: ["Optional pre-sale fix-ups", "Maximise the sale value", "Builders Warehouse run"],
    },
    draggable: false,
  },
  {
    id: "cocs",
    type: "step",
    position: { x: x(C.cocs), y: SPINE_Y },
    data: {
      step: "Step 06",
      title: "Compliance certs (CoCs)",
      lines: ["Electrical, gas, plumbing, beetle", "Fix if non-compliant", "→ Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "attorney",
    type: "step",
    position: { x: x(C.attorney), y: SPINE_Y },
    data: {
      step: "Step 07 · Attorney",
      title: "Transfer attorney appointed",
      lines: ["Seller nominates the conveyancer", "Referred via MyHome rails", "Transfer process begins"],
    },
    draggable: false,
  },
  {
    id: "signdocs",
    type: "step",
    position: { x: x(C.signdocs), y: SPINE_Y },
    data: {
      step: "Step 08",
      title: "Sign transfer docs",
      lines: ["Seller signs transfer docs", "FICA + rates clearance certificate", "Bond cancelled if seller has one"],
    },
    draggable: false,
  },
  {
    id: "registration",
    type: "step",
    position: { x: x(C.registration), y: SPINE_Y },
    data: {
      step: "Step 09 · Deeds Office",
      title: "Registration",
      lines: ["Transfer registers", "Proceeds paid (less bond, commission)", "Ownership passes to the buyer"],
    },
    draggable: false,
  },
  {
    id: "removals",
    type: "step",
    position: { x: x(C.removals), y: SPINE_Y },
    data: {
      step: "Step 10 · Month 0",
      title: "Cleaning & removals",
      lines: ["Property cleaned", "Removals booked", "Seller moves out"],
    },
    draggable: false,
  },
  {
    id: "exit",
    type: "terminal",
    position: { x: x(C.exit), y: SPINE_Y },
    data: {
      title: "Exits ownership →",
      lines: ["Leaves this property", "One BetterID carries over", "Re-enters as Buyer or Renter"],
    },
    draggable: false,
  },

  // ── Branch / side boxes ───────────────────────────────────────────────────
  {
    id: "offer-rejected",
    type: "step",
    position: { x: x(C.offer), y: BRANCH_Y },
    data: {
      title: "Offer rejected",
      lines: ["Counter-offer, or", "Wait for a better offer", "Back to listing"],
    },
    draggable: false,
  },
  // Cross-persona link — the seller is usually a buyer at the same time
  {
    id: "concurrent",
    type: "step",
    position: { x: x(C.mandate), y: BRANCH_Y },
    data: {
      title: "Often a Buyer too",
      lines: ["Selling here, buying next", "One BetterID, two flows", "Runs in parallel"],
    },
    draggable: false,
  },
];

// ─── Edges ──────────────────────────────────────────────────────────────────

const SOLID = {
  type: "smoothstep",
  style: { stroke: NAVY, strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: NAVY },
} as const;
const BRANCH = {
  type: "smoothstep",
  style: { stroke: AMBER, strokeWidth: 2, strokeDasharray: "6 4" },
  markerEnd: { type: MarkerType.ArrowClosed, color: AMBER },
} as const;
// Cross-persona link — the same verified identity running another flow (sky, dashed)
const LINK = {
  type: "smoothstep",
  style: { stroke: SKY, strokeWidth: 2, strokeDasharray: "2 4" },
  markerEnd: { type: MarkerType.ArrowClosed, color: SKY },
} as const;

const edges: Edge[] = [
  // Happy path spine
  { id: "e1", source: "valuation", target: "mandate", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2", source: "mandate", target: "list", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e3", source: "list", target: "offer", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e4", source: "offer", target: "otp", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "accepted" },
  { id: "e5", source: "otp", target: "improvements", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e6", source: "improvements", target: "cocs", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e7", source: "cocs", target: "attorney", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e8", source: "attorney", target: "signdocs", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e9", source: "signdocs", target: "registration", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e10", source: "registration", target: "removals", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e11", source: "removals", target: "exit", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "moved out" },

  // Branch — offer rejected, loops back to listing
  { id: "b1", source: "offer", target: "offer-rejected", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "rejected" },
  { id: "b1b", source: "offer-rejected", target: "list", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH, label: "re-list / counter" },

  // Cross-persona link — the seller's verified identity also drives a buyer flow
  { id: "x1", source: "mandate", target: "concurrent", sourceHandle: "b", targetHandle: "t", ...LINK, label: "same BetterID" },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
export { nodes as sellerNodes, edges as sellerEdges };

// ─── Page ───────────────────────────────────────────────────────────────────

function FlowCanvas() {
  const { fitView } = useReactFlow();
  const handleFit = useCallback(() => fitView({ padding: 0.12, duration: 400 }), [fitView]);

  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.12, duration: 300 }), 50);
    return () => clearTimeout(t);
  }, [fitView]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color={NAVY} gap={32} size={1} style={{ opacity: 0.06 }} />
        <Controls showInteractive={false} />
      </ReactFlow>
      <button
        type="button"
        onClick={handleFit}
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 bg-white border border-slate-300 rounded-full shadow-md px-3 py-1.5 text-xs font-semibold text-[#0C2340] hover:bg-slate-50"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        Fit to screen
      </button>
    </div>
  );
}

export default function SellerFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Seller · User Flow · Value → List → Sell → Transfer → Exit" />

      <div className="relative flex-1">
        <ReactFlowProvider>
          <FlowCanvas />
        </ReactFlowProvider>

        {/* Legend (top-right) */}
        <div className="absolute top-4 right-4 z-10 bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 flex flex-col gap-1.5">
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#0C2340]/60">
            Reading the flow
          </div>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[#0C2340]" />
              <span className="text-[#0C2340]/70">happy path</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t-2 border-dashed border-amber-500" />
              <span className="text-[#0C2340]/70">branch / loop back</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t-2 border-dotted border-[#0EA5E9]" />
              <span className="text-[#0C2340]/70">cross-persona (same BetterID)</span>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-1 pt-1.5 flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border-2 border-[#0C2340]/25 bg-white" />
              <span className="text-[#0C2340]/70">step</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border-2 border-[#3DBFAD] bg-white" />
              <span className="text-[#0C2340]/70">MyHome rails moment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border-2 border-amber-400 bg-amber-50" />
              <span className="text-[#0C2340]/70">decision</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#0C2340]" />
              <span className="text-[#0C2340]/70">hand-off / end</span>
            </div>
          </div>
        </div>

        {/* PRD link (bottom-left) */}
        <div className="absolute bottom-4 left-4 z-10">
          <Link
            href="/persona-prd"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 rounded-full shadow-md px-3 py-1.5 text-xs font-semibold text-[#0C2340] hover:bg-slate-50"
          >
            ← Persona Flows PRD
          </Link>
        </div>
      </div>
    </div>
  );
}
