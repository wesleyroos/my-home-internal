/*
 * Owner Journey — Figma-style, but deliberately NOT a linear flow.
 * The Owner is the post-Month-0 steady state every buying journey converges
 * into — the "data push" hub. So it's drawn hub-and-spoke: a central home hub
 * with the always-on offerings fanning out, an entry from Month 0, a
 * re-valuation → equity trigger loop, and exits into Seller / Landlord.
 *
 * This is where the model flips: data PULL (the linear journeys) becomes data
 * PUSH (relevant offers surfaced off the owner's profile).
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
const TEAL = "#3DBFAD";
const AMBER = "#F59E0B";

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

type BoxData = {
  step?: string;
  title: string;
  lines: string[];
};

// Entry / terminal rectangular cards (same family as the other flows).
function makeBox(kind: "step" | "terminal") {
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

// The central hub — the always-on home dashboard (data-push engine).
const HUB_W = 250;
const HUB_H = 380;

function HubNode({ data }: NodeProps<Node<BoxData>>) {
  return (
    <div
      className="rounded-2xl border-2 border-[#3DBFAD] shadow-md ring-2 ring-[#3DBFAD]/30 px-5 py-5 flex flex-col"
      style={{
        width: HUB_W,
        height: HUB_H,
        background: "linear-gradient(180deg, #E9F8F4 0%, #FFFFFF 70%)",
      }}
    >
      <Handles />
      <div className="self-start text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#3DBFAD] text-white">
        Data-push hub
      </div>
      <div className="mt-4 text-[22px] font-extrabold leading-tight text-[#0C2340]">{data.title}</div>
      <ul className="mt-4 space-y-2.5 flex-1">
        {data.lines.map((l, i) => (
          <li key={i} className="text-[12px] leading-snug text-[#0C2340]/75 flex gap-1.5">
            <span className="flex-shrink-0 text-[#3DBFAD] font-bold">·</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A compact offering card — a capability the hub surfaces, not a journey step.
const OFFER_W = 210;
const OFFER_H = 140;

function OfferNode({ data }: NodeProps<Node<BoxData>>) {
  return (
    <div
      className="rounded-lg border-2 border-[#3DBFAD]/40 bg-[#EAF8F4] shadow-sm px-3.5 py-3 flex flex-col"
      style={{ width: OFFER_W, height: OFFER_H }}
    >
      <Handles />
      {data.step && (
        <div className="self-start text-[8px] font-bold uppercase tracking-wide text-[#0F6E56] mb-1">
          {data.step}
        </div>
      )}
      <div className="text-[14px] font-extrabold leading-tight text-[#0C2340]">{data.title}</div>
      <ul className="mt-1.5 space-y-0.5 flex-1">
        {data.lines.map((l, i) => (
          <li key={i} className="text-[10px] leading-snug text-slate-500">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

// A labelled container that groups the offerings, so the hub needs only ONE
// "pushes" arrow into the whole set rather than eight overlapping ones.
function FrameNode({ data }: NodeProps<Node<{ label: string }>>) {
  return (
    <div
      className="w-full h-full rounded-2xl border-2 border-dashed border-[#3DBFAD]/45 relative"
      style={{ background: "rgba(61,191,173,0.05)" }}
    >
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0, top: 60 }} />
      <div className="absolute -top-3 left-6 bg-[#f0f5fa] px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0F6E56]">
        {data.label}
      </div>
    </div>
  );
}

const nodeTypes = {
  step: makeBox("step"),
  terminal: makeBox("terminal"),
  hub: HubNode,
  offer: OfferNode,
  frame: FrameNode,
};

// Exported so the combined board can render the hub/offer/frame node types too.
export const ownerExtraNodeTypes = { hub: HubNode, offer: OfferNode, frame: FrameNode };

// ─── Layout ─────────────────────────────────────────────────────────────────
// Entry (left) → Hub. The offerings live inside ONE labelled frame to the
// right, so the hub needs a single "pushes" arrow instead of eight. Exits sit
// below the hub. The hub centres on y ≈ 300.

const ENTRY_X = 40;
const HUB_X = 360;

// Offerings frame + grid
const FRAME_X = 700;
const FRAME_Y = 110;
const FRAME_W = 960;
const FRAME_H = 430;
const offerCol = (n: number) => 740 + n * 230; // 4 columns inside the frame
const OFFER_ROW_0 = 160;
const OFFER_ROW_1 = 340;
const EXIT_Y = 600;

const nodes: Node[] = [
  // Entry — the Month 0 convergence point
  {
    id: "entry",
    type: "step",
    position: { x: ENTRY_X, y: 170 },
    data: {
      step: "Month 0",
      title: "Arrives as Owner",
      lines: ["Buyer & Cash Buyer converge here", "The data pull → data push pivot", "Profile already built"],
    },
    draggable: false,
  },

  // The hub
  {
    id: "hub",
    type: "hub",
    position: { x: HUB_X, y: 110 },
    data: {
      title: "Owner · the home hub",
      lines: [
        "Always-on — not a sequence",
        "Offers pushed off the owner's profile",
        "Powered by BetterID + Loom",
      ],
    },
    draggable: false,
  },

  // Offerings frame (rendered behind the cards)
  {
    id: "frame",
    type: "frame",
    position: { x: FRAME_X, y: FRAME_Y },
    data: { label: "Always-on offerings · pushed off profile" },
    style: { width: FRAME_W, height: FRAME_H },
    selectable: false,
    draggable: false,
    zIndex: -1,
  },

  // Offerings — the data-push menu (2 rows × 4 cols), inside the frame
  {
    id: "finance",
    type: "offer",
    position: { x: offerCol(0), y: OFFER_ROW_0 },
    data: { step: "BetterBond", title: "Finance", lines: ["Equity, 2nd bond, refinance"] },
    draggable: false,
  },
  {
    id: "insurance",
    type: "offer",
    position: { x: offerCol(1), y: OFFER_ROW_0 },
    data: { step: "BetterSure", title: "Insurance", lines: ["Review, compare & switch"] },
    draggable: false,
  },
  {
    id: "vault",
    type: "offer",
    position: { x: offerCol(2), y: OFFER_ROW_0 },
    data: { step: "MyHome", title: "Doc Vault", lines: ["Title deed, bond, CoCs, policies"] },
    draggable: false,
  },
  {
    id: "maintenance",
    type: "offer",
    position: { x: offerCol(3), y: OFFER_ROW_0 },
    data: { step: "MyHome", title: "Home maintenance", lines: ["Planning & reminders"] },
    draggable: false,
  },
  {
    id: "valuations",
    type: "offer",
    position: { x: offerCol(0), y: OFFER_ROW_1 },
    data: { step: "Loom", title: "Valuations", lines: ["Re-valuation & equity tracking"] },
    draggable: false,
  },
  {
    id: "suburb",
    type: "offer",
    position: { x: offerCol(1), y: OFFER_ROW_1 },
    data: { step: "Loom", title: "Suburb reports", lines: ["Area insights & trends"] },
    draggable: false,
  },
  {
    id: "utilities",
    type: "offer",
    position: { x: offerCol(2), y: OFFER_ROW_1 },
    data: { step: "MyHome", title: "Utilities", lines: ["Electricity, water, rates"] },
    draggable: false,
  },
  {
    id: "services",
    type: "offer",
    position: { x: offerCol(3), y: OFFER_ROW_1 },
    data: { step: "Marketplace", title: "Services", lines: ["Fibre · mobile · solar", "Security · cleaning"] },
    draggable: false,
  },

  // Exits — lifecycle transitions out of Owner
  {
    id: "to-seller",
    type: "terminal",
    position: { x: HUB_X, y: EXIT_Y },
    data: { title: "Becomes a Seller →", lines: ["Lists the property", "Re-enters the Seller flow"] },
    draggable: false,
  },
  {
    id: "to-landlord",
    type: "terminal",
    position: { x: HUB_X + 260, y: EXIT_Y },
    data: { title: "Becomes a Landlord →", lines: ["Lets the property out", "Owner + tenant KYC + management"] },
    draggable: false,
  },
];

// ─── Edges ──────────────────────────────────────────────────────────────────

const SOLID = {
  type: "smoothstep",
  style: { stroke: NAVY, strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: NAVY },
} as const;
// Data push — the hub surfaces an offer (teal, solid)
const PUSH = {
  type: "smoothstep",
  style: { stroke: TEAL, strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: TEAL },
} as const;
// Trigger — an event that surfaces another offer (amber, dashed)
const TRIGGER = {
  type: "smoothstep",
  style: { stroke: AMBER, strokeWidth: 2, strokeDasharray: "6 4" },
  markerEnd: { type: MarkerType.ArrowClosed, color: AMBER },
} as const;

const edges: Edge[] = [
  // Entry → hub
  { id: "e-entry", source: "entry", target: "hub", sourceHandle: "r", targetHandle: "l", ...SOLID, label: "Month 0" },

  // Hub pushes the whole offering set (one clean arrow into the frame)
  { id: "push-offers", source: "hub", target: "frame", sourceHandle: "r", targetHandle: "l", ...PUSH, label: "pushes" },

  // Trigger — a re-valuation surfaces a finance offer (equity unlock)
  { id: "trigger-equity", source: "valuations", target: "finance", sourceHandle: "t-s", targetHandle: "b-t", ...TRIGGER, label: "equity unlock" },

  // Exits — owner transitions into the next persona
  { id: "x-seller", source: "hub", target: "to-seller", sourceHandle: "b", targetHandle: "t", ...SOLID, label: "sells" },
  { id: "x-landlord", source: "hub", target: "to-landlord", sourceHandle: "b", targetHandle: "t", ...SOLID, label: "lets out" },
];

// Exported so the combined Persona Flows board can compose this flow alongside others.
export { nodes as ownerNodes, edges as ownerEdges };

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

export default function OwnerFlow() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Owner · The Home Hub · Data-push steady state" />

      <div className="relative flex-1">
        <ReactFlowProvider>
          <FlowCanvas />
        </ReactFlowProvider>

        {/* Legend (top-right) */}
        <div className="absolute top-4 right-4 z-10 bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 flex flex-col gap-1.5">
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#0C2340]/60">
            Reading the hub
          </div>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[#0C2340]" />
              <span className="text-[#0C2340]/70">lifecycle transition</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[#3DBFAD]" />
              <span className="text-[#0C2340]/70">offer pushed (data push)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t-2 border-dashed border-amber-500" />
              <span className="text-[#0C2340]/70">trigger</span>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-1 pt-1.5 flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border-2 border-[#3DBFAD] bg-[#EAF8F4]" />
              <span className="text-[#0C2340]/70">offering</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#0C2340]" />
              <span className="text-[#0C2340]/70">hand-off / next persona</span>
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
