/*
 * Persona Flows Board — both persona journeys on one pannable canvas, stacked
 * one above the other. Reuses the exact node/edge data from the standalone
 * Renter and Buyer flows (so they stay in sync); this page just namespaces the
 * ids, offsets each flow vertically, and drops a section title above each.
 *
 * Standalone pages still live at /renter-flow and /buyer-mortgage-flow.
 */

import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
} from "@xyflow/react";
import type { Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Maximize2 } from "lucide-react";
import { Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { renterNodes, renterEdges } from "./RenterFlow";
import { buyerNodes, buyerEdges, flowNodeTypes } from "./BuyerMortgageFlow";
import { cashNodes, cashEdges } from "./CashBuyerFlow";
import { sellerNodes, sellerEdges } from "./SellerFlow";
import { ownerNodes, ownerEdges, ownerExtraNodeTypes } from "./OwnerFlow";
import { landlordNodes, landlordEdges } from "./LandlordFlow";

const NAVY = "#0C2340";

// ─── Section title node ──────────────────────────────────────────────────────

type TitleData = { kicker: string; title: string; colour: string };

function TitleNode({ data }: NodeProps<Node<TitleData>>) {
  return (
    <div className="pointer-events-none">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
        style={{ color: data.colour }}
      >
        {data.kicker}
      </div>
      <div className="text-[34px] font-extrabold leading-none text-[#0C2340]">{data.title}</div>
    </div>
  );
}

const nodeTypes = { ...flowNodeTypes, ...ownerExtraNodeTypes, title: TitleNode };

// ─── Compose the board ───────────────────────────────────────────────────────
// Each flow is namespaced (prefixed ids) and shifted down so the two boards sit
// one above the other without colliding. Renter occupies roughly y 80–770;
// the buyer flow (which has a source row above its spine) is pushed below it.

// Order: Renter (0) · Buyer · Cash · Owner · Landlord · Seller (bottom).
const BUYER_DY = 1400;
const CASH_DY = 2390;
const OWNER_DY = 3350;
const LANDLORD_DY = 4770;
const SELLER_DY = 5760;

function shift(nodes: Node[], edges: Edge[], prefix: string, dy: number) {
  const ns = nodes.map((n) => ({
    ...n,
    id: prefix + n.id,
    position: { x: n.position.x, y: n.position.y + dy },
  }));
  const es = edges.map((e) => ({
    ...e,
    id: prefix + e.id,
    source: prefix + e.source,
    target: prefix + e.target,
  }));
  return { ns, es };
}

const renter = shift(renterNodes, renterEdges, "r-", 0);
const buyer = shift(buyerNodes, buyerEdges, "b-", BUYER_DY);
const cash = shift(cashNodes, cashEdges, "c-", CASH_DY);
const seller = shift(sellerNodes, sellerEdges, "s-", SELLER_DY);
const owner = shift(ownerNodes, ownerEdges, "o-", OWNER_DY);
const landlord = shift(landlordNodes, landlordEdges, "l-", LANDLORD_DY);

const titles: Node[] = [
  {
    id: "title-renter",
    type: "title",
    position: { x: 60, y: -70 },
    data: { kicker: "Persona 1", title: "Renter", colour: "#6366f1" },
    draggable: false,
    selectable: false,
  },
  {
    id: "title-buyer",
    type: "title",
    position: { x: 60, y: BUYER_DY - 420 },
    data: { kicker: "Persona 2", title: "Buyer · Mortgage", colour: "#3DBFAD" },
    draggable: false,
    selectable: false,
  },
  {
    id: "title-cash",
    type: "title",
    position: { x: 60, y: CASH_DY - 70 },
    data: { kicker: "Persona 3", title: "Cash Buyer", colour: "#0EA5E9" },
    draggable: false,
    selectable: false,
  },
  {
    id: "title-seller",
    type: "title",
    position: { x: 60, y: SELLER_DY - 70 },
    data: { kicker: "Persona 6", title: "Seller", colour: "#F59E0B" },
    draggable: false,
    selectable: false,
  },
  {
    id: "title-owner",
    type: "title",
    position: { x: 60, y: OWNER_DY - 50 },
    data: { kicker: "Persona 4", title: "Owner · The Home Hub", colour: "#0C2340" },
    draggable: false,
    selectable: false,
  },
  {
    id: "title-landlord",
    type: "title",
    position: { x: 60, y: LANDLORD_DY - 70 },
    data: { kicker: "Persona 5", title: "Landlord", colour: "#DC2626" },
    draggable: false,
    selectable: false,
  },
];

const nodes: Node[] = [...titles, ...renter.ns, ...buyer.ns, ...cash.ns, ...seller.ns, ...owner.ns, ...landlord.ns];
const edges: Edge[] = [...renter.es, ...buyer.es, ...cash.es, ...seller.es, ...owner.es, ...landlord.es];

// ─── Page ───────────────────────────────────────────────────────────────────

function BoardCanvas() {
  const { fitView } = useReactFlow();
  const handleFit = useCallback(() => fitView({ padding: 0.1, duration: 400 }), [fitView]);

  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.1, duration: 300 }), 50);
    return () => clearTimeout(t);
  }, [fitView]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.05}
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

export default function PersonaFlowsBoard() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Persona Flows · Board · Renter + Buyer + Cash Buyer + Seller + Owner + Landlord" />

      <div className="relative flex-1">
        <ReactFlowProvider>
          <BoardCanvas />
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
