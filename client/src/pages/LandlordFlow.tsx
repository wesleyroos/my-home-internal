/*
 * Landlord Journey — Figma-style user-flow.
 * The Landlord = Owner + the rental stack. It inherits the whole Owner hub and
 * adds: tenant screening, leasing, and property management. The pivotal point —
 * the landlord screens tenants on the SAME BetterID/KYC rail the Renter flows
 * through. One rail, two personas (shown as a cross-persona link).
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

const BOX_W = 210;
const BOX_H = 280;

// ─── Shared handle set ───────────────────────────────────────────────────────

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
  by?: string;
  accent?: boolean;
};

function makeBox(kind: Exclude<Kind, "decision">) {
  return function BoxNode({ data }: NodeProps<Node<BoxData>>) {
    const isTerminal = kind === "terminal";
    const isAccent = !isTerminal && !!data.accent;

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

const COL = BOX_W + 180;
const SPINE_Y = 80;
const BRANCH_Y = SPINE_Y + BOX_H + 130;
const ABOVE_Y = SPINE_Y - BOX_H - 40; // row above the spine (e.g. the self-managed path)
const DEC_Y = SPINE_Y + (BOX_H - DEC_H) / 2;

const x = (c: number) => 60 + c * COL;

const C = {
  entry: 0,
  list: 1,
  screening: 2,
  lease: 3,
  mgmt: 4,
  manage: 5,
  renewal: 6,
  exit: 7,
};

const nodes: Node[] = [
  // ── Main spine — the rental cycle ─────────────────────────────────────────
  {
    id: "entry",
    type: "step",
    position: { x: x(C.entry), y: SPINE_Y },
    data: {
      step: "From Owner",
      title: "Becomes a Landlord",
      lines: ["An Owner who lets out", "Inherits the full Owner hub", "Adds the rental stack →"],
    },
    draggable: false,
  },
  {
    id: "list",
    type: "step",
    position: { x: x(C.list), y: SPINE_Y },
    data: {
      step: "Rental agent",
      title: "List to let",
      lines: ["Listed for rent", "Rental agent or direct", "Viewings & enquiries"],
    },
    draggable: false,
  },
  {
    id: "screening",
    type: "step",
    position: { x: x(C.screening), y: SPINE_Y },
    data: {
      step: "BetterID",
      title: "Tenant screening",
      lines: ["Tenant applies & is verified", "Same KYC the Renter completes", "Credit + affordability check"],
      accent: true,
    },
    draggable: false,
  },
  {
    id: "lease",
    type: "step",
    position: { x: x(C.lease), y: SPINE_Y },
    data: {
      step: "Doc Vault",
      title: "Lease signed",
      lines: ["Signed with BetterID", "Deposit secured", "Lands in the Doc Vault"],
    },
    draggable: false,
  },
  {
    id: "mgmt",
    type: "decision",
    position: { x: x(C.mgmt), y: DEC_Y },
    data: { title: "Self or agent-managed?", by: "two ways to run it" },
    draggable: false,
  },
  {
    id: "self-managed",
    type: "step",
    position: { x: x(C.manage), y: ABOVE_Y },
    data: {
      step: "MyHome",
      title: "Self-managed",
      lines: ["Landlord collects rent directly", "Manages own maintenance", "Tools via MyHome"],
    },
    draggable: false,
  },
  {
    id: "agent-managed",
    type: "step",
    position: { x: x(C.manage), y: SPINE_Y },
    data: {
      step: "Rental agent",
      title: "Agent-managed",
      lines: ["Agent collects rent", "Handles inspections & maintenance", "Hands-off for the landlord"],
    },
    draggable: false,
  },
  {
    id: "renewal",
    type: "decision",
    position: { x: x(C.renewal), y: DEC_Y },
    data: { title: "Lease ends?", by: "renew · vacate · sell" },
    draggable: false,
  },
  {
    id: "exit",
    type: "terminal",
    position: { x: x(C.exit), y: SPINE_Y },
    data: {
      title: "Sells up → Seller",
      lines: ["Lists the property for sale", "Re-enters the Seller flow"],
    },
    draggable: false,
  },

  // ── Branch / cross-persona boxes ──────────────────────────────────────────
  {
    id: "owner-hub",
    type: "step",
    position: { x: x(C.entry), y: BRANCH_Y },
    data: {
      title: "Inherits the Owner hub",
      lines: ["All Owner offerings carry over", "Finance · insurance · vault · valuations", "Maintenance · utilities · services"],
      accent: true,
    },
    draggable: false,
  },
  {
    id: "renter-rail",
    type: "step",
    position: { x: x(C.screening), y: BRANCH_Y },
    data: {
      title: "Same rail as the Renter",
      lines: ["Tenant runs the Renter's KYC", "One BetterID rail, two personas", "Verified applicant pack"],
    },
    draggable: false,
  },
  {
    id: "relet",
    type: "step",
    position: { x: x(C.renewal), y: BRANCH_Y },
    data: {
      title: "Re-let (vacancy)",
      lines: ["Tenant vacates", "Property re-listed", "Back to listing"],
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
// Cross-persona link — same verified identity / rail in another persona (sky, dotted)
const LINK = {
  type: "smoothstep",
  style: { stroke: SKY, strokeWidth: 2, strokeDasharray: "2 4" },
  markerEnd: { type: MarkerType.ArrowClosed, color: SKY },
} as const;

const edges: Edge[] = [
  // Happy path — the rental cycle
  { id: "e1", source: "entry", target: "list", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2", source: "list", target: "screening", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "tenant applies" },
  { id: "e3", source: "screening", target: "lease", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "approved" },
  { id: "e4", source: "lease", target: "mgmt", sourceHandle: "r", targetHandle: "l", ...SOLID },

  // The management decision genuinely forks — two ways to run it, both rejoin at renewal
  { id: "fork-agent", source: "mgmt", target: "agent-managed", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "rental agent" },
  { id: "fork-self", source: "mgmt", target: "self-managed", sourceHandle: "t-s", targetHandle: "l", ...SOLID, label: "self-managed" },
  { id: "join-agent", source: "agent-managed", target: "renewal", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "join-self", source: "self-managed", target: "renewal", sourceHandle: "r", targetHandle: "l", ...SOLID },

  { id: "e7", source: "renewal", target: "exit", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "sells up" },

  // Renew — loops back to the management decision (stays let)
  { id: "renew", source: "renewal", target: "mgmt", sourceHandle: "t-s", targetHandle: "t", ...BRANCH, label: "renews" },

  // Vacate — re-let, loops back to listing
  { id: "vacate", source: "renewal", target: "relet", sourceHandle: "b", targetHandle: "t", ...BRANCH, label: "vacates" },
  { id: "relet-list", source: "relet", target: "list", sourceHandle: "l-s", targetHandle: "b-t", ...BRANCH, label: "re-let" },

  // Cross-persona links
  { id: "x-owner", source: "entry", target: "owner-hub", sourceHandle: "b", targetHandle: "t", ...LINK, label: "inherits" },
  { id: "x-renter", source: "screening", target: "renter-rail", sourceHandle: "b", targetHandle: "t", ...LINK, label: "same KYC" },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
export { nodes as landlordNodes, edges as landlordEdges };

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

export default function LandlordFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Landlord · User Flow · Owner + the rental stack" />

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
              <span className="text-[#0C2340]/70">cross-persona (same rail)</span>
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
