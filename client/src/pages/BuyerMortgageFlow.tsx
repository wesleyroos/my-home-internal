/*
 * Buyer (Mortgage) Journey — Figma-style user-flow.
 * Same treatment as the Renter flow: portrait step cards, dashed-hexagon
 * decisions, navy hand-off. Follows the 12-step chronology from the Persona
 * Flows PRD (/persona-prd). The MyHome Bundle is highlighted at bond
 * application — the one step where our F&I product is pitched.
 *
 * Rails, not origination: the pre-registration steps are partner-owned
 * (BetterBond / bank / attorneys) and MyHome reads the data; at Month 0 the
 * buyer becomes an Owner and MyHome takes over.
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
  highlight?: string; // step only — the MyHome Bundle tag
  accent?: boolean; // step only — a MyHome rails moment (teal border, no bundle box)
};

// Rectangular portrait box for steps and terminals.
//  step      — white card, teal step tag (teal ring + bundle tag when highlighted)
//  terminal  — navy filled card (a hand-off / end state)
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
        {isHighlight && (
          <div className="mt-2 rounded-md bg-[#3DBFAD]/12 border border-[#3DBFAD]/40 px-2 py-1.5">
            <div className="text-[9px] font-bold uppercase tracking-wide text-[#0F6E56] mb-0.5">
              💰 MyHome Bundle
            </div>
            <div className="text-[10px] leading-snug text-[#0F6E56]/90">{data.highlight}</div>
          </div>
        )}
      </div>
    );
  };
}

// Decision node — a small dashed hexagon, deliberately a different silhouette
// from the rectangular step cards so forks read at a glance. Just the question
// (+ who owns it); the conditions live in the PRD.
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
// Main spine runs left→right on one row. Branch boxes drop to a row below the
// box they fork from. Columns are a fixed stride.

const COL = BOX_W + 180; // horizontal stride — wide enough for edge labels to sit between cards
const SPINE_Y = 80; // main flow row
const BRANCH_Y = SPINE_Y + BOX_H + 130; // branch row below
const ABOVE_Y = SPINE_Y - BOX_H - 130; // source row above (e.g. partner pull sources)
// Decisions are shorter than steps — offset down so their centre lines up with
// the step cards' centre, keeping the spine arrows straight.
const DEC_Y = SPINE_Y + (BOX_H - DEC_H) / 2;

const x = (c: number) => 60 + c * COL;

// Spine columns (one per node)
const C = {
  search: 0,
  preapp: 1,
  otp: 2,
  otprails: 3,
  bondapp: 4,
  valuation: 5,
  granted: 6,
  attorneys: 7,
  signpay: 8,
  insurance: 9,
  lodgement: 10,
  registration: 11,
  movein: 12,
  owner: 13,
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
      lines: ["Dream phase — data pull begins", "Listings via Private Property / agent", "Finds a home, makes an offer"],
    },
    draggable: false,
  },
  {
    id: "preapp",
    type: "decision",
    position: { x: x(C.preapp), y: DEC_Y },
    data: { title: "Pre-approved?", by: "BetterBond · BetterID seeded" },
    draggable: false,
  },
  {
    id: "otp",
    type: "step",
    position: { x: x(C.otp), y: SPINE_Y },
    data: {
      step: "Step 02 · Agent",
      title: "OTP signed",
      lines: ["Offer to Purchase accepted", "Suspensive conditions set (bond by date)", "Deposit paid into trust"],
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
        "Bond consultant & attorney pull from here",
        "One record — whichever lane arrives first wins",
      ],
      accent: true,
    },
    draggable: false,
  },
  {
    id: "bondapp",
    type: "step",
    position: { x: x(C.bondapp), y: SPINE_Y },
    data: {
      step: "Step 03 · BetterBond",
      title: "Bond application",
      lines: ["BetterBond shops the banks", "Best rate across major banks"],
      highlight: "Pitched here — rolls bond + transfer costs (+ renos, maybe removals) into the loan. Changes the loan amount, so it must go in upfront.",
    },
    draggable: false,
  },
  {
    id: "valuation",
    type: "step",
    position: { x: x(C.valuation), y: SPINE_Y },
    data: {
      step: "Step 04 · Bank",
      title: "Bank valuation",
      lines: ["Bank values the property", "May use Loom condition data", "Confirms the lending amount"],
    },
    draggable: false,
  },
  {
    id: "granted",
    type: "decision",
    position: { x: x(C.granted), y: DEC_Y },
    data: { title: "Bond granted?", by: "Bank · within OTP deadline" },
    draggable: false,
  },
  {
    id: "attorneys",
    type: "step",
    position: { x: x(C.attorneys), y: SPINE_Y },
    data: {
      step: "Step 05 · Attorneys",
      title: "Attorneys instructed",
      lines: ["Transfer (seller's)", "Bond (bank's)", "Cancellation (seller's old bond)"],
    },
    draggable: false,
  },
  {
    id: "signpay",
    type: "step",
    position: { x: x(C.signpay), y: SPINE_Y },
    data: {
      step: "Step 06",
      title: "Sign docs & pay costs",
      lines: ["Buyer signs transfer + bond docs", "Transfer + bond costs due", "Cash — unless rolled into the bond"],
    },
    draggable: false,
  },
  {
    id: "insurance",
    type: "step",
    position: { x: x(C.insurance), y: SPINE_Y },
    data: {
      step: "Step 07 · BetterSure",
      title: "Insurance",
      lines: ["Homeowners cover (HOC)", "Bank requires it before lodgement", "Life cover often assigned too"],
    },
    draggable: false,
  },
  {
    id: "lodgement",
    type: "step",
    position: { x: x(C.lodgement), y: SPINE_Y },
    data: {
      step: "Step 08 · Deeds Office",
      title: "Lodgement",
      lines: ["Transfer + bond + cancellation", "Lodged together at the Deeds Office", "Prep period before registration"],
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
      lines: ["Transfer & bond register together", "Monies flow to all parties", "Title deed copy → Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "movein",
    type: "step",
    position: { x: x(C.movein), y: SPINE_Y },
    data: {
      step: "Step 10 · Month 0",
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
      lines: ["Buyer's arrow ends at Month 0", "MyHome takes over the journey", "Owner hub begins (data push)"],
    },
    draggable: false,
  },

  // ── Branch boxes (row below) ──────────────────────────────────────────────
  {
    id: "not-approved",
    type: "step",
    position: { x: x(C.preapp), y: BRANCH_Y },
    data: {
      title: "Not pre-approved",
      lines: ["Affordability coaching", "Remain a Renter or Owner for now", "Re-enter when ready"],
    },
    draggable: false,
  },
  {
    id: "bond-fail",
    type: "step",
    position: { x: x(C.granted), y: BRANCH_Y },
    data: {
      title: "Bond not granted",
      lines: ["Suspensive condition fails", "OTP lapses, deposit refunded", "Back to search"],
    },
    draggable: false,
  },
  {
    id: "early-occ",
    type: "step",
    position: { x: x(C.lodgement), y: BRANCH_Y },
    data: {
      title: "Early occupation",
      lines: ["Moves in before registration", "Pays occupational rent to seller", "Until transfer registers"],
    },
    draggable: false,
  },
  // Pull source — feeds the OTP into the rails without the consultant lifting a finger
  {
    id: "salesforce",
    type: "step",
    position: { x: x(C.otprails), y: ABOVE_Y },
    data: {
      step: "BetterBond · Salesforce",
      title: "Partner system of record",
      lines: ["OTP captured in the consultant's normal flow", "MyHome pulls it — no extra work for them"],
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
// Data pull — MyHome reads from a partner's system of record (teal, dashed)
const PULL = {
  type: "smoothstep",
  style: { stroke: "#3DBFAD", strokeWidth: 2, strokeDasharray: "6 4" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#3DBFAD" },
} as const;

const edges: Edge[] = [
  // Happy path spine
  { id: "e1", source: "search", target: "preapp", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2", source: "preapp", target: "otp", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "approved" },
  { id: "e3", source: "otp", target: "otprails", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "agent uploads · push" },
  { id: "e3b", source: "otprails", target: "bondapp", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "required to apply" },
  { id: "e4", source: "bondapp", target: "valuation", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e5", source: "valuation", target: "granted", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e6", source: "granted", target: "attorneys", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "granted" },
  { id: "e7", source: "attorneys", target: "signpay", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e8", source: "signpay", target: "insurance", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e9", source: "insurance", target: "lodgement", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e10", source: "lodgement", target: "registration", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e11", source: "registration", target: "movein", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e12", source: "movein", target: "owner", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "registered ⭐" },

  // Branches — forks fail down and loop back to search
  { id: "b1", source: "preapp", target: "not-approved", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "declined" },
  { id: "b1b", source: "not-approved", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },
  { id: "b2", source: "granted", target: "bond-fail", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "no" },
  { id: "b2b", source: "bond-fail", target: "search", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH },

  // OTP into the rails — two literal lanes converge on one record:
  //   agent uploads (the push, on the spine above) · or pulled from Salesforce (below)
  { id: "pull-otp", source: "salesforce", target: "otprails", sourceHandle: "b", targetHandle: "t", ...PULL, label: "pulled · no extra work" },

  // Optional side path — buyer occupies before registration completes
  { id: "b3", source: "signpay", target: "early-occ", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "moves in early" },
  { id: "b3b", source: "early-occ", target: "movein", sourceHandle: "r", targetHandle: "b-t", ...BRANCH, label: "occupational rent" },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
// nodeTypes here is the richer superset (supports accent / highlight / by) and is
// reused for every flow on the board.
export { nodes as buyerNodes, edges as buyerEdges, nodeTypes as flowNodeTypes };

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

export default function BuyerMortgageFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Buyer (Mortgage) · User Flow · Search → Bond → Register → Owner" />

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
              <span className="w-3 border-t-2 border-dashed border-[#3DBFAD]" />
              <span className="text-[#0C2340]/70">data pull (from partner)</span>
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
