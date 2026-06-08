/*
 * Cash Buyer Journey — Figma-style user-flow.
 * Same treatment as the Renter and Mortgage Buyer flows. The cash cut is
 * shorter: no pre-approval, no bond, no bank valuation, no bond attorney.
 * Proof of funds (FICA / source-of-funds) replaces the whole bond leg.
 *
 * The OTP still enters the rails — but for a cash buyer there's no BetterBond
 * Salesforce to pull from, so it's the agent's push only.
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
  search: 0,
  otp: 1,
  otprails: 2,
  kycfunds: 3,
  funds: 4,
  attorney: 5,
  insurance: 6,
  signpay: 7,
  lodgement: 8,
  registration: 9,
  movein: 10,
  owner: 11,
};

const nodes: Node[] = [
  // ── Main spine ────────────────────────────────────────────────────────────
  {
    id: "search",
    type: "step",
    position: { x: x(C.search), y: SPINE_Y },
    data: {
      step: "Step 01",
      title: "Search & viewings",
      lines: ["Dream phase — data pull begins", "Often investment-driven", "Finds a home, makes an offer"],
    },
    draggable: false,
  },
  {
    id: "otp",
    type: "step",
    position: { x: x(C.otp), y: SPINE_Y },
    data: {
      step: "Step 02 · Agent",
      title: "OTP signed",
      lines: ["Offer to Purchase accepted", "No bond clause — cash purchase", "Deposit paid into trust"],
    },
    draggable: false,
  },
  {
    id: "otprails",
    type: "step",
    position: { x: x(C.otprails), y: SPINE_Y },
    data: {
      step: "MyHome · Doc Vault",
      title: "OTP enters the rails",
      lines: [
        "The anchor document — one source of truth",
        "Agent uploads it once (push only — no Salesforce to pull)",
        "Attorney pulls from here",
      ],
      accent: true,
    },
    draggable: false,
  },
  {
    id: "kycfunds",
    type: "step",
    position: { x: x(C.kycfunds), y: SPINE_Y },
    data: {
      step: "Step 03 · BetterID",
      title: "KYC + proof of funds",
      lines: ["Identity verified (BetterID)", "Source of funds documented", "FICA / AML obligations"],
    },
    draggable: false,
  },
  {
    id: "funds",
    type: "decision",
    position: { x: x(C.funds), y: DEC_Y },
    data: { title: "Funds verified?", by: "FICA / AML · source of funds" },
    draggable: false,
  },
  {
    id: "attorney",
    type: "step",
    position: { x: x(C.attorney), y: SPINE_Y },
    data: {
      step: "Step 04 · Attorney",
      title: "Transfer attorney instructed",
      lines: ["Seller's conveyancer", "Cancellation attorney if seller has a bond", "No bond attorney — cash deal"],
    },
    draggable: false,
  },
  {
    id: "insurance",
    type: "step",
    position: { x: x(C.insurance), y: SPINE_Y },
    data: {
      step: "Step 05 · BetterSure",
      title: "Insurance",
      lines: ["Freehold: optional — no bank requires it", "Sectional title: buildings cover via levies", "Contents cover: always the buyer's choice"],
    },
    draggable: false,
  },
  {
    id: "signpay",
    type: "step",
    position: { x: x(C.signpay), y: SPINE_Y },
    data: {
      step: "Step 06",
      title: "Sign docs & pay",
      lines: ["Buyer signs transfer docs", "Full purchase price into trust", "Transfer costs due"],
    },
    draggable: false,
  },
  {
    id: "lodgement",
    type: "step",
    position: { x: x(C.lodgement), y: SPINE_Y },
    data: {
      step: "Step 07 · Deeds Office",
      title: "Lodgement",
      lines: ["Transfer (+ cancellation if any)", "Lodged at the Deeds Office", "No bond to register"],
    },
    draggable: false,
  },
  {
    id: "registration",
    type: "step",
    position: { x: x(C.registration), y: SPINE_Y },
    data: {
      step: "Step 08 · Deeds Office",
      title: "Registration",
      lines: ["Transfer registers", "Owned outright — no bank holds the deed", "Title deed → Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "movein",
    type: "step",
    position: { x: x(C.movein), y: SPINE_Y },
    data: {
      step: "Step 09 · Month 0",
      title: "Move-in",
      lines: ["Removals & keys handed over", "Buyer takes occupation", "Data pull → data push pivot"],
    },
    draggable: false,
  },
  {
    id: "owner",
    type: "terminal",
    position: { x: x(C.owner), y: SPINE_Y },
    data: {
      title: "Becomes Owner →",
      lines: ["Converges with the mortgage Buyer", "MyHome takes over the journey", "Owner hub begins (data push)"],
    },
    draggable: false,
  },

  // ── Branch box ────────────────────────────────────────────────────────────
  {
    id: "funds-queried",
    type: "step",
    position: { x: x(C.funds), y: BRANCH_Y },
    data: {
      title: "Funds queried",
      lines: ["Enhanced due diligence (EDD)", "More source-of-funds docs", "Deal lapses if unresolved → back to search"],
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

const edges: Edge[] = [
  // Happy path spine
  { id: "e1", source: "search", target: "otp", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2", source: "otp", target: "otprails", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "agent uploads · push" },
  { id: "e3", source: "otprails", target: "kycfunds", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e4", source: "kycfunds", target: "funds", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e5", source: "funds", target: "attorney", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "verified" },
  { id: "e6", source: "attorney", target: "insurance", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e7", source: "insurance", target: "signpay", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e8", source: "signpay", target: "lodgement", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e9", source: "lodgement", target: "registration", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e10", source: "registration", target: "movein", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e11", source: "movein", target: "owner", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "registered ⭐" },

  // Branch — funds queried, loops back to search if it can't be cleared
  { id: "b1", source: "funds", target: "funds-queried", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "queried" },
  { id: "b1b", source: "funds-queried", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
export { nodes as cashNodes, edges as cashEdges };

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

export default function CashBuyerFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Cash Buyer · User Flow · Search → Funds → Register → Owner" />

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
