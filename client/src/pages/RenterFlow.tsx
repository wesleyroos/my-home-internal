/*
 * Renter Journey — Figma-style user-flow.
 * Pure steps + branches: every step in the renter persona drawn as a portrait
 * box, with the decision branches that fork off it. No rails, no phase frames,
 * no mockups — just the flow.
 *
 * Driven by the Persona Flows PRD (/persona-prd). React Flow canvas so it
 * pans / zooms Figma-style.
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
};

// Rectangular portrait box for steps and terminals.
//  step      — white card, teal step tag
//  terminal  — navy filled card (a hand-off / end state)
function makeBox(kind: Exclude<Kind, "decision">) {
  return function BoxNode({ data }: NodeProps<Node<BoxData>>) {
    const isTerminal = kind === "terminal";

    const shell = isTerminal ? "bg-[#0C2340] border-[#0C2340]" : "bg-white border-[#0C2340]/25";
    const titleColour = isTerminal ? "text-white" : "text-[#0C2340]";
    const lineColour = isTerminal ? "text-white/70" : "text-slate-500";
    const tagText = isTerminal ? "Hand-off" : data.step;
    const tagCls = isTerminal ? "bg-[#3DBFAD] text-white" : "bg-[#3DBFAD]/15 text-[#0F6E56]";

    return (
      <div
        className={`rounded-xl border-2 shadow-sm flex flex-col px-4 py-4 ${shell}`}
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

// Decision node — a small dashed hexagon, deliberately a different silhouette
// from the rectangular step cards so forks read at a glance. Just the question;
// the conditions live in the PRD.
const DEC_W = 210;
const DEC_H = 116;

function DecisionNode({ data }: NodeProps<Node<BoxData>>) {
  const p = 30; // horizontal point inset → elongated hexagon
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
// Main spine runs left→right on one row. Branch boxes drop to a row below the
// box they fork from. Columns are a fixed stride.

const COL = BOX_W + 90; // horizontal stride
const SPINE_Y = 80; // main flow row
const BRANCH_Y = SPINE_Y + BOX_H + 130; // branch row below
// Decisions are shorter than steps — offset down so their centre lines up with
// the step cards' centre, keeping the spine arrows straight.
const DEC_Y = SPINE_Y + (BOX_H - DEC_H) / 2;

const x = (c: number) => 60 + c * COL;

// Spine columns (one per step)
const C = {
  search: 0,
  enquire: 1,
  kyc: 2,
  apply: 3,
  afford: 4,
  approval: 5,
  lease: 6,
  deposit: 7,
  movein: 8,
  living: 9,
  leaseEnd: 10,
  exit: 11,
  convert: 12,
};

const nodes: Node[] = [
  // ── Main spine ────────────────────────────────────────────────────────────
  {
    id: "search",
    type: "step",
    position: { x: x(C.search), y: SPINE_Y },
    data: {
      step: "Step 01",
      title: "Search & shortlist",
      lines: ["Listing portal / rental agent", "Filters: area, budget, date", "Saved searches & alerts"],
    },
    draggable: false,
  },
  {
    id: "enquire",
    type: "step",
    position: { x: x(C.enquire), y: SPINE_Y },
    data: {
      step: "Step 02",
      title: "Enquire & view",
      lines: ["Contact agent / landlord", "Book & attend viewing", "Decide to apply"],
    },
    draggable: false,
  },
  {
    id: "kyc",
    type: "step",
    position: { x: x(C.kyc), y: SPINE_Y },
    data: {
      step: "Step 03",
      title: "KYC + credit check",
      lines: ["Verify identity once (BetterID)", "Credit & affordability pulled", "Reused across multiple rental applications"],
    },
    draggable: false,
  },
  {
    id: "apply",
    type: "step",
    position: { x: x(C.apply), y: SPINE_Y },
    data: {
      step: "Step 04",
      title: "Application form",
      lines: ["Pre-filled from profile", "Payslips / statements attached", "One-tap on later rentals"],
    },
    draggable: false,
  },
  {
    id: "afford",
    type: "decision",
    position: { x: x(C.afford), y: DEC_Y },
    data: {
      title: "Affordability check",
      lines: ["Rent ≤ ~30% of income?", "Credit record clean?"],
    },
    draggable: false,
  },
  {
    id: "approval",
    type: "decision",
    position: { x: x(C.approval), y: DEC_Y },
    data: {
      title: "Landlord / agent decision",
      lines: ["Verified applicant reviewed", "Same KYC the Landlord sees", "Approve or decline"],
    },
    draggable: false,
  },
  {
    id: "lease",
    type: "step",
    position: { x: x(C.lease), y: SPINE_Y },
    data: {
      step: "Step 05",
      title: "Lease signed",
      lines: ["Signed with BetterID", "Lands in the Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "deposit",
    type: "step",
    position: { x: x(C.deposit), y: SPINE_Y },
    data: {
      step: "Step 06",
      title: "Deposit + first month",
      lines: ["Deposit held & receipted", "Removals offered"],
    },
    draggable: false,
  },
  {
    id: "movein",
    type: "step",
    position: { x: x(C.movein), y: SPINE_Y },
    data: {
      step: "Step 07 · Month 0",
      title: "Move-in day",
      lines: ["Incoming inspection & snags", "Utilities & fibre connected", "Lease agreement added to Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "living",
    type: "step",
    position: { x: x(C.living), y: SPINE_Y },
    data: {
      step: "Step 08",
      title: "Living in the home",
      lines: [
        "Rent wallet — builds credit ⭐",
        "Maintenance requests",
        "Insurance — contents cover for belongings",
        "Mobile — SIM & fibre deals",
        "Security — alarm & armed response",
      ],
    },
    draggable: false,
  },
  {
    id: "leaseEnd",
    type: "decision",
    position: { x: x(C.leaseEnd), y: DEC_Y },
    data: {
      title: "Lease nears end",
      lines: ["Renew?", "Move to another rental?", "Ready to buy?"],
    },
    draggable: false,
  },
  {
    id: "exit",
    type: "step",
    position: { x: x(C.exit), y: SPINE_Y },
    data: {
      step: "Step 09",
      title: "Notice & exit",
      lines: ["Outgoing inspection vs snags", "Deposit refunded via wallet"],
    },
    draggable: false,
  },
  {
    id: "convert",
    type: "terminal",
    position: { x: x(C.convert), y: SPINE_Y },
    data: {
      title: "Convert to Buyer →",
      lines: ["Verified ID + rent history", "Known affordability", "Pre-approval head start"],
    },
    draggable: false,
  },

  // ── Branch boxes (row below) ──────────────────────────────────────────────
  {
    id: "afford-fail",
    type: "step",
    position: { x: x(C.afford), y: BRANCH_Y },
    data: {
      title: "Doesn't qualify",
      lines: ["Adjust budget / area", "Add co-applicant or guarantor", "Back to search"],
    },
    draggable: false,
  },
  {
    id: "declined",
    type: "step",
    position: { x: x(C.approval), y: BRANCH_Y },
    data: {
      title: "Application declined",
      lines: ["Profile stays live", "Alerts on new matches", "Back to search"],
    },
    draggable: false,
  },
  {
    id: "rent-again",
    type: "step",
    position: { x: x(C.exit), y: BRANCH_Y },
    data: {
      title: "Rents again",
      lines: ["Profile & docs reused", "Application is one tap", "Back to search"],
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
  { id: "e1", source: "search", target: "enquire", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2", source: "enquire", target: "kyc", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e3", source: "kyc", target: "apply", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e4", source: "apply", target: "afford", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e5", source: "afford", target: "approval", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "qualifies" },
  { id: "e6", source: "approval", target: "lease", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "approved" },
  { id: "e7", source: "lease", target: "deposit", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e8", source: "deposit", target: "movein", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e9", source: "movein", target: "living", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e10", source: "living", target: "leaseEnd", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e11", source: "leaseEnd", target: "exit", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "gives notice" },
  { id: "e12", source: "exit", target: "convert", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "ready to buy ⭐" },

  // Branches — fork down, loop back to search
  { id: "b1", source: "afford", target: "afford-fail", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "no" },
  { id: "b1b", source: "afford-fail", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },
  { id: "b2", source: "approval", target: "declined", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "declined" },
  { id: "b2b", source: "declined", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },

  // Lease-end three-way fork
  { id: "b3", source: "leaseEnd", target: "living", sourceHandle: "t-s", targetHandle: "t", ...BRANCH, label: "renews" },
  { id: "b4", source: "leaseEnd", target: "rent-again", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "rents again" },
  { id: "b4b", source: "rent-again", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
export { nodes as renterNodes, edges as renterEdges };

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

export default function RenterFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Renter · User Flow · Search → Lease → Live → Convert" />

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
