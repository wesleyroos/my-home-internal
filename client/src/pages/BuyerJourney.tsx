/*
 * BuyerJourney — Every touchpoint in the SA property buying journey.
 * Anchored on OTP signing (Day 0). Negative days = shopping run-up,
 * positive days = transfer race and settling in.
 */

import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ─── Phase overview data ────────────────────────────────────────────────────

type Tone = "navy" | "teal" | "amber" | "rose" | "emerald";

interface PhaseItem {
  title: string;
  subtitle: string;
}

interface Phase {
  number: string;
  title: string;
  subtitle: string;
  tone: Tone;
  items: PhaseItem[];
}

const PHASES: Phase[] = [
  {
    number: "Phase 1",
    title: "Financial readiness",
    subtitle: "Weeks before any property search",
    tone: "navy",
    items: [
      { title: "Bond pre-qualification", subtitle: "Affordability check, credit score" },
      { title: "Deposit savings plan", subtitle: "Plus transfer cost reserve" },
      { title: "FICA document prep", subtitle: "ID, payslips, bank statements" },
      { title: "Credit health review", subtitle: "Resolve dings before applying" },
    ],
  },
  {
    number: "Phase 2",
    title: "Search & selection",
    subtitle: "Days to months",
    tone: "teal",
    items: [
      { title: "Online portal browsing", subtitle: "Property24, Private Property" },
      { title: "Estate agent engagement", subtitle: "Mandate, viewings, area intel" },
      { title: "Viewings & show days", subtitle: "In-person inspection" },
      { title: "Suburb & comp research", subtitle: "Price history, crime, schools" },
    ],
  },
  {
    number: "Phase 3",
    title: "Offer & acceptance",
    subtitle: "Days",
    tone: "amber",
    items: [
      { title: "Offer to Purchase signed", subtitle: "Price, conditions, deposit" },
      { title: "Counter-offer negotiation", subtitle: "Price, occupation date, fittings" },
      { title: "Building inspection", subtitle: "Voetstoots risk mitigation" },
      { title: "Deposit to trust account", subtitle: "Held by attorney, earns interest" },
    ],
  },
  {
    number: "Phase 4",
    title: "Bond & transfer process",
    subtitle: "8 to 12 weeks",
    tone: "rose",
    items: [
      { title: "Bond application", subtitle: "Multi-bank via originator" },
      { title: "Bank valuation", subtitle: "Determines final loan amount" },
      { title: "Conveyancing handoff", subtitle: "Transfer & bond attorneys" },
      { title: "Pay transfer costs", subtitle: "Duty, fees, disbursements" },
    ],
  },
  {
    number: "Phase 5",
    title: "Registration & move-in",
    subtitle: "Days after Deeds Office registration",
    tone: "emerald",
    items: [
      { title: "Deeds Office registration", subtitle: "Legal ownership transfers" },
      { title: "Keys, utilities, move-in", subtitle: "Municipal accounts, insurance" },
    ],
  },
];

const TONES: Record<Tone, { card: string; text: string; sub: string }> = {
  navy:    { card: "bg-[#0C2340]/[0.04] border-[#0C2340]/15", text: "text-[#0C2340]",   sub: "text-[#0C2340]/60" },
  teal:    { card: "bg-[#3DBFAD]/10 border-[#3DBFAD]/35",     text: "text-[#0a7064]",   sub: "text-[#0a7064]/70" },
  amber:   { card: "bg-amber-50 border-amber-200",            text: "text-amber-900",   sub: "text-amber-700/70" },
  rose:    { card: "bg-rose-50 border-rose-200",              text: "text-rose-900",    sub: "text-rose-700/70" },
  emerald: { card: "bg-emerald-50 border-emerald-200",        text: "text-emerald-900", sub: "text-emerald-700/70" },
};

// ─── Timeline data ──────────────────────────────────────────────────────────
//
// Day 0 = OTP signing. Negative days are the shopping run-up,
// positive days run through transfer to settling in.

interface Bar {
  label: string;
  start: number;
  end: number;
}

const BUYER_ACTIONS: Bar[] = [
  { label: "Bond pre-qualification",        start: -85,  end: -75 },
  { label: "Save for deposit + costs",      start: -90,  end: -5 },
  { label: "FICA document prep",            start: -75,  end: -60 },
  { label: "Online portal browsing",        start: -60,  end: -12 },
  { label: "Estate agent + viewings",       start: -50,  end: -10 },
  { label: "Suburb & comp research",        start: -55,  end: -15 },
  { label: "Offer negotiation",             start: -10,  end: -2 },
  { label: "OTP signed, deposit paid",      start: 0,    end: 5 },
  { label: "Bond application",              start: 2,    end: 18 },
  { label: "FICA pack to attorney",         start: 4,    end: 14 },
  { label: "Building inspection",           start: 6,    end: 14 },
  { label: "Bank valuation",                start: 14,   end: 22 },
  { label: "Bond docs signed at attorney",  start: 32,   end: 42 },
  { label: "Transfer costs paid",           start: 42,   end: 50 },
  { label: "Keys handover, move in",        start: 90,   end: 96 },
  { label: "Insurance active",              start: 90,   end: 100 },
  { label: "Municipal accounts opened",     start: 90,   end: 115 },
  { label: "Snag list to seller",           start: 92,   end: 120 },
];

const BEHIND_THE_SCENES: Bar[] = [
  { label: "Rates & levy clearance",          start: 10,   end: 38 },
  { label: "Seller's bond cancellation prep", start: 8,    end: 48 },
  { label: "Transfer deed drafted",           start: 22,   end: 50 },
  { label: "SARS transfer duty receipt",      start: 50,   end: 58 },
  { label: "Deeds lodged at registry",        start: 58,   end: 68 },
  { label: "Examination period",              start: 65,   end: 85 },
  { label: "First bond payment debited",      start: 121,  end: 124 },
  { label: "Title deed received from bank",   start: 148,  end: 175 },
];

interface CostEvent {
  day: number;
  label: string;
  amount: string;
  direction?: "out" | "in";
  fee?: boolean;
}

const COSTS: CostEvent[] = [
  { day: 1,   label: "Property deposit",             amount: "5–20% of price" },
  { day: 8,   label: "Building inspection",          amount: "R 3k–8k" },
  { day: 20,  label: "Bond initiation fee",          amount: "R 6,038",        fee: true },
  { day: 38,  label: "Advance rates & levies",       amount: "3 months" },
  // Transfer day cluster — all paid via the transfer attorney
  { day: 45,  label: "Transfer duty (SARS)",         amount: "R 0 – R 1.4M+",  fee: true },
  { day: 45,  label: "Transfer attorney fees",       amount: "R 20k – R 140k", fee: true },
  { day: 45,  label: "Bond registration fees",       amount: "R 20k – R 140k", fee: true },
  { day: 45,  label: "Deeds Office fees",            amount: "R 1k – R 12k",   fee: true },
  { day: 45,  label: "FICA & admin disbursements",   amount: "R 500 – R 2k",   fee: true },
  { day: 90,  label: "Utility connection deposits",  amount: "R 1.5k–4k" },
  { day: 92,  label: "Removals",                     amount: "R 3k–20k" },
  { day: 95,  label: "Insurance starts",             amount: "R 200–600/mo" },
  { day: 122, label: "First bond instalment",        amount: "monthly" },
];

// ─── 24-month ownership timeline ────────────────────────────────────────────
//
// Same anchor (OTP = Day 0), zoomed out to two years. Surfaces what most
// buyer-journey docs hide: the monthly bills that run for the life of the bond.

const MIN_24M = 0;
const MAX_24M = 730;
const REG_DAY_24M = 88;

const ONETIME_24M: CostEvent[] = [
  { day: 0,   label: "Property deposit",        amount: "5–20% of price" },
  { day: 8,   label: "Building inspection",     amount: "R 3k–8k" },
  { day: 20,  label: "Bond initiation fee",     amount: "R 6,038",        fee: true },
  { day: 38,  label: "Advance rates & levies",  amount: "3 months" },
  { day: 45,  label: "Transfer duty (SARS)",    amount: "R 0 – R 1.4M+",  fee: true },
  { day: 45,  label: "Transfer attorney fees",  amount: "R 20k – R 140k", fee: true },
  { day: 45,  label: "Bond registration",       amount: "R 20k – R 140k", fee: true },
  { day: 45,  label: "Deeds Office fees",       amount: "R 1k – R 12k",   fee: true },
  { day: 45,  label: "FICA & admin",            amount: "R 500 – R 2k",   fee: true },
  { day: 90,  label: "Utility deposits",        amount: "R 1.5k–4k" },
  { day: 92,  label: "Removals",                amount: "R 3k–20k" },
];

type MonthlyTone = "fixed" | "variable" | "reserve";

interface MonthlyBarData {
  label: string;
  start: number;
  monthly: string;
  tone: MonthlyTone;
}

const MONTHLY_TONE: Record<MonthlyTone, string> = {
  fixed:    "bg-[#0C2340]/10 border-[#0C2340]/35 group-hover:bg-[#0C2340]/25 group-hover:border-[#0C2340]/60",
  variable: "bg-[#3DBFAD]/15 border-[#3DBFAD]/45 group-hover:bg-[#3DBFAD]/30 group-hover:border-[#3DBFAD]/70",
  reserve:  "bg-amber-100/70 border-amber-300 group-hover:bg-amber-200 group-hover:border-amber-400",
};

const MONTHLY_24M: MonthlyBarData[] = [
  { label: "Bond instalment",           start: 122, monthly: "R 10k – R 50k+", tone: "fixed" },
  { label: "Municipal rates",           start: 88,  monthly: "R 500 – R 3k",   tone: "fixed" },
  { label: "Levy (sectional title)",    start: 88,  monthly: "R 1k – R 5k",    tone: "fixed" },
  { label: "Homeowner's insurance",     start: 88,  monthly: "R 200 – R 600",  tone: "fixed" },
  { label: "Life / bond cover",         start: 88,  monthly: "R 150 – R 500",  tone: "fixed" },
  { label: "Electricity",               start: 90,  monthly: "R 1.5k – R 5k",  tone: "variable" },
  { label: "Water & refuse",            start: 90,  monthly: "R 500 – R 1.5k", tone: "variable" },
  { label: "Security / armed response", start: 90,  monthly: "R 300 – R 800",  tone: "variable" },
  { label: "Maintenance reserve",       start: 90,  monthly: "≈ 1% / yr",      tone: "reserve" },
];

// ─── First 90 days — single milestone timeline ──────────────────────────────

interface DayMilestone {
  day: number;
  title: string;
  description: string;
  emphasis?: boolean;
}

const NINETY_DAY_MILESTONES: DayMilestone[] = [
  { day: 0,  title: "OTP signed",          description: "Deposit lands in attorney's trust", emphasis: true },
  { day: 8,  title: "Building inspection", description: "Voetstoots risk check" },
  { day: 14, title: "Bond approved",       description: "Valuation done, loan granted" },
  { day: 20, title: "Initiation fee",      description: "Bank opens the bond account" },
  { day: 38, title: "Rates clearance",     description: "Advance rates paid to municipality" },
  { day: 45, title: "Transfer fees paid",  description: "Duty, attorney, bond reg all settled", emphasis: true },
  { day: 58, title: "Lodged at Deeds",     description: "All docs in at the Registry" },
  { day: 88, title: "Registration",        description: "Legal ownership transfers", emphasis: true },
];

// ─── Fee table data ─────────────────────────────────────────────────────────

interface FeeTier {
  price: number;
  duty: number;
  transfer: number;
  threshold?: boolean;
}

const FEE_TIERS: FeeTier[] = [
  { price:   750000, duty:       0, transfer:  24461 },
  { price:  1000000, duty:       0, transfer:  29176 },
  { price:  1210000, duty:       0, transfer:  33891, threshold: true },
  { price:  1500000, duty:    8700, transfer:  36248 },
  { price:  2000000, duty:   33786, transfer:  40963 },
  { price:  2500000, duty:   67200, transfer:  48036 },
  { price:  3000000, duty:  107356, transfer:  52751 },
  { price:  5000000, duty:  327356, transfer:  76326 },
  { price: 10000000, duty:  877356, transfer: 105996 },
];

const INITIATION_FEE = 6038;

// LSSA recommended bond registration attorney fee scale (eff. 1 Aug 2025), incl 15% VAT.
function calculateBondRegFee(bondAmount: number): number {
  if (bondAmount <= 0) return 0;
  let fee: number;
  if (bondAmount <= 100_000) {
    fee = 6640;
  } else if (bondAmount <= 500_000) {
    fee = 6640 + 1060 * Math.ceil((bondAmount - 100_000) / 50_000);
  } else if (bondAmount <= 1_000_000) {
    fee = 15120 + 2050 * Math.ceil((bondAmount - 500_000) / 100_000);
  } else if (bondAmount <= 5_000_000) {
    fee = 25370 + 2050 * Math.ceil((bondAmount - 1_000_000) / 200_000);
  } else {
    fee = 66370 + 5160 * Math.ceil((bondAmount - 5_000_000) / 1_000_000);
  }
  return Math.round(fee * 1.15);
}

// Deeds Office statutory fee — applied separately to property value (transfer)
// and bond amount (bond registration). Schedule per gazette eff. 1 Apr 2026.
function deedsOfficeFee(amount: number): number {
  if (amount <= 0) return 0;
  if (amount <= 200_000) return 30;
  if (amount <= 300_000) return 660;
  if (amount <= 600_000) return 990;
  if (amount <= 800_000) return 1371;
  if (amount <= 1_000_000) return 1704;
  if (amount <= 2_000_000) return 2037;
  if (amount <= 4_000_000) return 2400;
  if (amount <= 6_000_000) return 2940;
  if (amount <= 8_000_000) return 3540;
  if (amount <= 10_000_000) return 4140;
  if (amount <= 15_000_000) return 4740;
  if (amount <= 20_000_000) return 5340;
  if (amount <= 25_000_000) return 6000;
  return 6600;
}

// Small disbursements — FICA, postage & petties, e-filing, deeds searches,
// rates clearance cert. Approximates a typical attorney bill, incl VAT.
interface DisbursementsBreakdown {
  transfer: {
    fica: number;
    postage: number;
    eFiling: number;
    deedsSearches: number;
    ratesCert: number;
  };
  bond: { fica: number; postage: number; deedsSearches: number };
  total: number;
}

function disbursementsBreakdown(price: number, bondAmount: number): DisbursementsBreakdown {
  const transferTier = price <= 1_000_000 ? "small" : price <= 3_000_000 ? "mid" : "large";
  const transfer = {
    fica: 460,
    postage: transferTier === "large" ? 1500 : transferTier === "mid" ? 1200 : 950,
    eFiling: 805,
    deedsSearches: 350,
    ratesCert: 750,
  };

  const bondTier = bondAmount <= 0 ? "none" : bondAmount <= 1_000_000 ? "small" : bondAmount <= 3_000_000 ? "mid" : "large";
  const bond =
    bondTier === "none"
      ? { fica: 0, postage: 0, deedsSearches: 0 }
      : {
          fica: 460,
          postage: bondTier === "large" ? 850 : bondTier === "mid" ? 700 : 550,
          deedsSearches: 280,
        };

  const total =
    transfer.fica + transfer.postage + transfer.eFiling + transfer.deedsSearches + transfer.ratesCert +
    bond.fica + bond.postage + bond.deedsSearches;

  return { transfer, bond, total };
}

function formatRand(n: number) {
  if (!Number.isFinite(n) || n === 0) return "—";
  return `R ${n.toLocaleString("en-ZA")}`;
}

interface BreakdownLine {
  label: string;
  amount: number;
  sub?: string;
}

function BreakdownCell({
  value, title, lines, align = "end",
}: {
  value: number;
  title: string;
  lines: BreakdownLine[];
  align?: "start" | "center" | "end";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="font-mono text-right text-slate-700 tabular-nums underline decoration-slate-300 decoration-dotted underline-offset-2 hover:decoration-slate-600 hover:text-[#0C2340] transition-colors cursor-pointer">
          {formatRand(value)}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align={align}>
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Breakdown</div>
          <div className="text-sm font-semibold text-[#0C2340] mt-0.5">{title}</div>
        </div>
        <div className="px-4 py-3 space-y-2">
          {lines.filter(l => l.amount !== 0).map((l) => (
            <div key={l.label} className="flex justify-between items-baseline text-xs gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-slate-700">{l.label}</div>
                {l.sub && <div className="text-[10px] text-slate-400 mt-0.5">{l.sub}</div>}
              </div>
              <div className="font-mono text-slate-700 tabular-nums flex-shrink-0">{formatRand(l.amount)}</div>
            </div>
          ))}
          <div className="flex justify-between items-baseline text-xs pt-2 border-t border-slate-100 gap-3">
            <div className="font-bold text-[#0C2340]">Total</div>
            <div className="font-mono font-bold text-[#0C2340] tabular-nums">{formatRand(value)}</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function pct(day: number, min: number, max: number) {
  return ((day - min) / (max - min)) * 100;
}

const LANE_W = "w-28"; // 112px for lane label
const MIN = -90;
const MAX = 180;
const OFFER_DAY = 0;
const REG_DAY = 88;

function MilestoneLines() {
  return (
    <>
      <div
        className="absolute inset-y-0 w-px border-l-2 border-dashed border-[#0C2340]/55 pointer-events-none"
        style={{ left: `${pct(OFFER_DAY, MIN, MAX)}%` }}
      />
      <div
        className="absolute inset-y-0 w-px border-l border-dashed border-[#3DBFAD]/45 pointer-events-none"
        style={{ left: `${pct(REG_DAY, MIN, MAX)}%` }}
      />
    </>
  );
}

function TimelineBar({ bar, tone }: { bar: Bar; tone: "navy" | "teal" }) {
  const left = pct(bar.start, MIN, MAX);
  const width = pct(bar.end, MIN, MAX) - left;
  const toneClass =
    tone === "navy"
      ? "bg-[#0C2340]/10 border-[#0C2340]/35 group-hover:bg-[#0C2340]/25 group-hover:border-[#0C2340]/60"
      : "bg-[#3DBFAD]/20 border-[#3DBFAD]/55 group-hover:bg-[#3DBFAD]/40 group-hover:border-[#3DBFAD]/80";

  return (
    <div className="group relative h-7 rounded hover:bg-slate-100/60 transition-colors cursor-default">
      <MilestoneLines />
      <div
        className={`absolute top-1 h-5 rounded border transition-colors ${toneClass}`}
        style={{ left: `${left}%`, width: `${Math.max(width, 0.5)}%` }}
      >
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap text-xs text-slate-700 group-hover:text-[#0C2340] group-hover:font-semibold transition-colors">
          {bar.label}
        </span>
      </div>
    </div>
  );
}

function CostRow({ event }: { event: CostEvent }) {
  const left = pct(event.day, MIN, MAX);
  const isIn = event.direction === "in";
  const isFee = event.fee === true;

  const rowBg = isFee
    ? "bg-amber-50/70 hover:bg-amber-100/80"
    : "hover:bg-slate-100/60";

  const amountClass = isFee
    ? "text-amber-700"
    : isIn
    ? "text-emerald-700"
    : "text-rose-700";

  const labelClass = isFee
    ? "text-amber-900"
    : "text-slate-700 group-hover:text-[#0C2340]";

  const markerCore = isFee
    ? "bg-amber-500 border-amber-700 group-hover:bg-amber-600"
    : isIn
    ? "bg-emerald-500 border-emerald-700 group-hover:bg-emerald-600"
    : "bg-rose-500 border-rose-700 group-hover:bg-rose-600";

  return (
    <div className={`group relative h-7 rounded transition-colors cursor-default ${rowBg}`}>
      <MilestoneLines />
      <div
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
        style={{ left: `${left}%`, marginLeft: "-5px" }}
      >
        <span
          className={`flex-shrink-0 w-2.5 h-2.5 ring-[3px] ring-white border transition-all ${markerCore} ${
            isFee ? "rotate-45 group-hover:w-3 group-hover:h-3" : "rounded-full group-hover:w-3.5 group-hover:h-3.5"
          }`}
        />
        <span className="whitespace-nowrap text-xs flex items-center gap-2">
          <span className={`group-hover:font-semibold transition-colors ${labelClass}`}>{event.label}</span>
          <span className={`font-mono font-semibold text-[10px] ${amountClass}`}>
            {isIn ? "+" : ""}{event.amount}
          </span>
        </span>
      </div>
    </div>
  );
}

function TimelineAxis() {
  const ticks = [-90, -60, -30, 0, 30, 60, 90, 120, 150, 180];
  return (
    <div className="relative h-14">
      <div className="absolute inset-x-0 top-3 h-px bg-slate-300" />
      {ticks.map((t) => {
        const isAnchor = t === OFFER_DAY;
        return (
          <div key={t} className="absolute top-0" style={{ left: `${pct(t, MIN, MAX)}%` }}>
            <div className={`w-px ${isAnchor ? "h-4 bg-[#0C2340]" : "h-3 bg-slate-300"}`} />
            {!isAnchor && (
              <span className="absolute top-4 -translate-x-1/2 text-[11px] whitespace-nowrap font-mono text-slate-500">
                {t < 0 ? `T${t}` : `+${t}`}
              </span>
            )}
          </div>
        );
      })}

      {/* Milestone labels - sit below the axis at their day position */}
      <div className="absolute -translate-x-1/2 top-6" style={{ left: `${pct(OFFER_DAY, MIN, MAX)}%` }}>
        <span className="px-2 py-0.5 rounded bg-[#0C2340] text-white text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
          OTP signed · Day 0
        </span>
      </div>
      <div className="absolute -translate-x-1/2 top-6" style={{ left: `${pct(REG_DAY, MIN, MAX)}%` }}>
        <span className="px-2 py-0.5 rounded bg-[#3DBFAD] text-white text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
          Registration · Day 88
        </span>
      </div>
    </div>
  );
}

function MilestoneLines24M() {
  return (
    <>
      <div
        className="absolute inset-y-0 w-px border-l-2 border-dashed border-[#0C2340]/55 pointer-events-none"
        style={{ left: `${pct(0, MIN_24M, MAX_24M)}%` }}
      />
      <div
        className="absolute inset-y-0 w-px border-l border-dashed border-[#3DBFAD]/45 pointer-events-none"
        style={{ left: `${pct(REG_DAY_24M, MIN_24M, MAX_24M)}%` }}
      />
      <div
        className="absolute inset-y-0 w-px border-l border-dashed border-slate-300 pointer-events-none"
        style={{ left: `${pct(365, MIN_24M, MAX_24M)}%` }}
      />
    </>
  );
}

function TimelineAxis24M() {
  const months = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  return (
    <div className="relative h-14">
      <div className="absolute inset-x-0 top-3 h-px bg-slate-300" />
      {months.map((m) => {
        const day = m * 30;
        const isAnchor = m === 0;
        const isYear = m === 12 || m === 24;
        return (
          <div key={m} className="absolute top-0" style={{ left: `${pct(day, MIN_24M, MAX_24M)}%` }}>
            <div className={`w-px ${isAnchor || isYear ? "h-4 bg-[#0C2340]" : "h-3 bg-slate-300"}`} />
            {!isAnchor && (
              <span
                className={`absolute top-4 -translate-x-1/2 text-[11px] whitespace-nowrap font-mono ${
                  isYear ? "font-semibold text-[#0C2340]" : "text-slate-500"
                }`}
              >
                {isYear ? `Y${m / 12}` : `M${m}`}
              </span>
            )}
          </div>
        );
      })}
      <div className="absolute -translate-x-1/2 top-6" style={{ left: `${pct(0, MIN_24M, MAX_24M)}%` }}>
        <span className="px-2 py-0.5 rounded bg-[#0C2340] text-white text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
          OTP · Day 0
        </span>
      </div>
      <div className="absolute -translate-x-1/2 top-6" style={{ left: `${pct(REG_DAY_24M, MIN_24M, MAX_24M)}%` }}>
        <span className="px-2 py-0.5 rounded bg-[#3DBFAD] text-white text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
          Registration
        </span>
      </div>
    </div>
  );
}

function CostRow24M({ event }: { event: CostEvent }) {
  const left = pct(event.day, MIN_24M, MAX_24M);
  const isFee = event.fee === true;
  const rowBg = isFee ? "bg-amber-50/70 hover:bg-amber-100/80" : "hover:bg-slate-100/60";
  const amountClass = isFee ? "text-amber-700" : "text-rose-700";
  const labelClass = isFee ? "text-amber-900" : "text-slate-700 group-hover:text-[#0C2340]";
  const markerCore = isFee
    ? "bg-amber-500 border-amber-700 group-hover:bg-amber-600"
    : "bg-rose-500 border-rose-700 group-hover:bg-rose-600";

  return (
    <div className={`group relative h-7 rounded transition-colors cursor-default ${rowBg}`}>
      <MilestoneLines24M />
      <div
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
        style={{ left: `${left}%`, marginLeft: "-5px" }}
      >
        <span
          className={`flex-shrink-0 w-2.5 h-2.5 ring-[3px] ring-white border transition-all ${markerCore} ${
            isFee ? "rotate-45 group-hover:w-3 group-hover:h-3" : "rounded-full group-hover:w-3.5 group-hover:h-3.5"
          }`}
        />
        <span className="whitespace-nowrap text-xs flex items-center gap-2">
          <span className={`group-hover:font-semibold transition-colors ${labelClass}`}>{event.label}</span>
          <span className={`font-mono font-semibold text-[10px] ${amountClass}`}>{event.amount}</span>
        </span>
      </div>
    </div>
  );
}

function MonthlyBar24M({ bar }: { bar: MonthlyBarData }) {
  const left = pct(bar.start, MIN_24M, MAX_24M);
  const width = 100 - left;
  const toneClass = MONTHLY_TONE[bar.tone];

  return (
    <div className="group relative h-7 rounded hover:bg-slate-100/60 transition-colors cursor-default">
      <MilestoneLines24M />
      <div
        className={`absolute top-1 h-5 rounded border transition-colors flex items-center justify-between gap-2 px-2 ${toneClass}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        <span className="text-xs text-slate-700 group-hover:text-[#0C2340] group-hover:font-semibold transition-colors truncate">
          {bar.label}
        </span>
        <span className="text-[10px] font-mono font-semibold text-slate-600 group-hover:text-[#0C2340] flex-shrink-0">
          {bar.monthly} / mo
        </span>
      </div>
    </div>
  );
}

function Lane({
  label, color, children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 mt-8 first:mt-0">
      <div className={`${LANE_W} flex-shrink-0 text-xs font-bold uppercase tracking-wider pt-1`} style={{ color }}>
        {label}
      </div>
      <div className="flex-1 relative space-y-1">{children}</div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BuyerJourney() {
  const [bondPct, setBondPct] = useState(100);
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <AppHeader label="Buyer Journey" />

      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
          <div className="flex items-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-[#3DBFAD]" />
            Buyer Journey
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#0C2340] mb-3">
            Every touchpoint, from dream to deeds
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Buying a property in South Africa is a nine-month process — three months shopping, three months in the transfer race, three months settling in. Half the work is done by people the buyer never meets. Here's everything that has to happen, when it happens, and what it costs — anchored on the day you sign the Offer to Purchase (Day 0).
          </p>
        </div>
      </div>

      {/* Phase overview */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-14">
        <div className="mb-8">
          <h2 className="font-heading font-bold text-[#0C2340] text-xl mb-1">The five phases</h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            From "we should buy a house" to handing the title deed over to the bank.
          </p>
        </div>

        <div className="space-y-2">
          {PHASES.map((phase, i) => (
            <div key={phase.number}>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="font-heading font-bold text-[#0C2340] text-base">
                    {phase.number} <span className="text-slate-300 font-normal">·</span> {phase.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">{phase.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.items.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-xl border px-4 py-3 text-center ${TONES[phase.tone].card}`}
                    >
                      <div className={`font-semibold text-sm ${TONES[phase.tone].text}`}>{item.title}</div>
                      <div className={`text-xs mt-0.5 ${TONES[phase.tone].sub}`}>{item.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
              {i < PHASES.length - 1 && (
                <div className="flex justify-center py-2">
                  <svg width="16" height="22" viewBox="0 0 16 22" className="text-slate-400">
                    <path d="M8 2v16M3 13l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Unified timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-14">
        <div className="mb-2 max-w-3xl">
          <h2 className="font-heading font-bold text-[#0C2340] text-xl">
            Full buyer journey <span className="text-slate-300 font-normal">·</span> nine months end-to-end
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            From shopping around to settling in. The amber rows are the regulated fees that hit on transfer day.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="flex gap-4">
              <div className={`${LANE_W} flex-shrink-0`} />
              <div className="flex-1">
                <TimelineAxis />
              </div>
            </div>

            <Lane label="Buyer actions" color="#0C2340">
              {BUYER_ACTIONS.map((bar) => (
                <TimelineBar key={bar.label} bar={bar} tone="navy" />
              ))}
            </Lane>

            <Lane label="Happening for you" color="#0a7064">
              {BEHIND_THE_SCENES.map((bar) => (
                <TimelineBar key={bar.label} bar={bar} tone="teal" />
              ))}
            </Lane>

            <Lane label="Cash flows" color="#9f1239">
              {COSTS.map((c, i) => (
                <CostRow key={`${c.label}-${i}`} event={c} />
              ))}
            </Lane>
          </div>
        </div>
      </section>

      {/* 24-month ownership timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-14">
        <div className="mb-2 max-w-3xl">
          <h2 className="font-heading font-bold text-[#0C2340] text-xl">
            First two years of ownership <span className="text-slate-300 font-normal">·</span> 24 months from OTP
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            One-time outlays cluster in the first 90 days. After that, the monthly bills run for the life of the bond. Ranges are typical for the mid-market — bond size and tariff bracket push the totals around.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="flex gap-4">
              <div className={`${LANE_W} flex-shrink-0`} />
              <div className="flex-1">
                <TimelineAxis24M />
              </div>
            </div>

            <Lane label="One-time costs" color="#9f1239">
              {ONETIME_24M.map((c, i) => (
                <CostRow24M key={`${c.label}-${i}`} event={c} />
              ))}
            </Lane>

            <Lane label="Monthly bills" color="#0C2340">
              {MONTHLY_24M.map((b) => (
                <MonthlyBar24M key={b.label} bar={b} />
              ))}
            </Lane>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#0C2340]/10 border border-[#0C2340]/35" />
            Fixed (bond, rates, levies, cover)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#3DBFAD]/15 border border-[#3DBFAD]/45" />
            Variable (consumption-based)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-amber-100/70 border border-amber-300" />
            Suggested reserve
          </div>
        </div>
      </section>

      {/* First 90 days — single milestone timeline */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-14">
        <div className="mb-2 max-w-3xl">
          <h2 className="font-heading font-bold text-[#0C2340] text-xl">
            The first 90 days, beat by beat
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            OTP signing to keys in hand — eight moments that matter, spaced to scale. Notice how nothing visible happens to the buyer between Day 20 and Day 38, then everything piles up around transfer day.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="min-w-[1300px] px-24 py-12">
            <div className="relative" style={{ height: "340px" }}>
              {/* Center line */}
              <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 h-0.5 bg-slate-200 rounded-full" />
              {/* Day-0 and Day-90 endpoint ticks */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-slate-300" />
              <div className="absolute top-[calc(50%+14px)] left-0 -translate-x-1/2 text-[10px] font-mono font-semibold text-slate-400">
                Day 0
              </div>
              <div className="absolute top-[calc(50%+14px)] right-0 translate-x-1/2 text-[10px] font-mono font-semibold text-slate-400">
                Day 90
              </div>

              {NINETY_DAY_MILESTONES.map((event, i) => {
                const left = (event.day / 90) * 100;
                const above = i % 2 === 0;
                return (
                  <div
                    key={event.day}
                    className="absolute top-0 bottom-0"
                    style={{ left: `${left}%`, width: 0 }}
                  >
                    {/* Marker dot */}
                    <div
                      className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 ring-white ${
                        event.emphasis
                          ? "bg-[#0C2340]"
                          : "bg-white border-2 border-slate-400"
                      }`}
                    />
                    {/* Vertical connector */}
                    <div
                      className={`absolute left-0 w-px ${
                        event.emphasis ? "bg-[#0C2340]/40" : "bg-slate-300"
                      }`}
                      style={{
                        top: above ? "calc(50% - 70px)" : "calc(50% + 10px)",
                        height: "60px",
                      }}
                    />
                    {/* Label card */}
                    <div
                      className="absolute left-0 -translate-x-1/2 w-44"
                      style={{
                        top: above ? "calc(50% - 150px)" : "calc(50% + 70px)",
                      }}
                    >
                      <div
                        className={`rounded-lg border px-3 py-2.5 text-center ${
                          event.emphasis
                            ? "bg-[#0C2340]/[0.04] border-[#0C2340]/30 shadow-sm"
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold tracking-wider text-[#3DBFAD]">
                          DAY {event.day}
                        </div>
                        <div
                          className={`text-sm font-bold mt-0.5 leading-tight ${
                            event.emphasis ? "text-[#0C2340]" : "text-slate-800"
                          }`}
                        >
                          {event.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Fee table */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        <div className="mb-6 max-w-3xl">
          <h2 className="font-heading font-bold text-[#0C2340] text-xl">
            Transfer & bond costs by property price
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            What lands inside the amber "Transfer day" cluster, scaled across typical SA property tiers. All attorney fees include 15% VAT. Move the slider to see how bond size changes the bond registration & initiation costs.
          </p>
        </div>

        {/* Bond size slider */}
        <div className="mb-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <div>
              <div className="text-sm font-semibold text-[#0C2340]">Bond size</div>
              <div className="text-xs text-slate-500 mt-0.5">
                How much of the property is bonded — the rest is your deposit.
              </div>
            </div>
            <div className="text-3xl font-bold text-[#3DBFAD] font-mono leading-none tabular-nums">
              {bondPct}<span className="text-xl text-[#3DBFAD]/70">%</span>
            </div>
          </div>

          <div className="mt-5 px-1">
            <Slider
              value={[bondPct]}
              onValueChange={([v]) => setBondPct(v)}
              min={0}
              max={100}
              step={5}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 mt-2 px-1 font-mono">
            <span>0% · cash buyer</span>
            <span>50%</span>
            <span>100% · full bond</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Property price</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Deposit</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Transfer duty</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Transfer attorney</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Bond registration</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Deeds Office</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Disbursements</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Initiation</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#0C2340] text-right">Total fees</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">% of price</th>
              </tr>
            </thead>
            <tbody>
              {FEE_TIERS.map((t) => {
                const bondAmount = Math.round(t.price * (bondPct / 100));
                const deposit = t.price - bondAmount;
                const bondReg = calculateBondRegFee(bondAmount);
                const init = bondPct > 0 ? INITIATION_FEE : 0;
                const deedsTransfer = deedsOfficeFee(t.price);
                const deedsBond = deedsOfficeFee(bondAmount);
                const deeds = deedsTransfer + deedsBond;
                const disb = disbursementsBreakdown(t.price, bondAmount);
                const total = t.duty + t.transfer + bondReg + deeds + disb.total + init;
                const pctPrice = ((total / t.price) * 100).toFixed(1);
                return (
                  <tr
                    key={t.price}
                    className={`border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors ${t.threshold ? "bg-amber-50/40" : ""}`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#0C2340] whitespace-nowrap">
                      {formatRand(t.price)}
                      {t.threshold && (
                        <span className="ml-2 text-[10px] font-semibold text-amber-700 uppercase tracking-wide">
                          duty threshold
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-right text-[#0C2340] font-semibold tabular-nums">{formatRand(deposit)}</td>
                    <td className="px-4 py-3 font-mono text-right text-slate-700">{formatRand(t.duty)}</td>
                    <td className="px-4 py-3 font-mono text-right text-slate-700">{formatRand(t.transfer)}</td>
                    <td className="px-4 py-3 font-mono text-right text-slate-700 tabular-nums">{formatRand(bondReg)}</td>
                    <td className="px-4 py-3 text-right">
                      <BreakdownCell
                        value={deeds}
                        title="Deeds Office statutory fees"
                        lines={[
                          { label: "Transfer registration", amount: deedsTransfer, sub: "Scales with property price" },
                          { label: "Bond registration",     amount: deedsBond,     sub: "Scales with bond amount" },
                        ]}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <BreakdownCell
                        value={disb.total}
                        title="Attorney disbursements"
                        lines={[
                          { label: "FICA verification (transfer)", amount: disb.transfer.fica },
                          { label: "Postage & petties (transfer)", amount: disb.transfer.postage, sub: "Couriers, e-mails, telefaxes" },
                          { label: "L@W / e-filing with SARS",    amount: disb.transfer.eFiling },
                          { label: "Deeds Office searches & print-outs", amount: disb.transfer.deedsSearches },
                          { label: "Rates clearance certificate", amount: disb.transfer.ratesCert,  sub: "Paid to the municipality" },
                          { label: "FICA verification (bond)",    amount: disb.bond.fica },
                          { label: "Postage & petties (bond)",    amount: disb.bond.postage },
                          { label: "Bond deeds searches",         amount: disb.bond.deedsSearches },
                        ]}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-right text-slate-700 tabular-nums">{formatRand(init)}</td>
                    <td className="px-4 py-3 text-right font-bold">
                      <BreakdownCell
                        value={total}
                        title="Total transfer-day fees"
                        align="end"
                        lines={[
                          { label: "Transfer duty (SARS)",     amount: t.duty },
                          { label: "Transfer attorney fees",   amount: t.transfer, sub: "Incl. 15% VAT" },
                          { label: "Bond registration fees",   amount: bondReg,    sub: "Incl. 15% VAT" },
                          { label: "Deeds Office",             amount: deeds },
                          { label: "Disbursements",            amount: disb.total },
                          { label: "Bond initiation fee",      amount: init,       sub: "Once-off, NCR-capped" },
                        ]}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-right text-slate-500 tabular-nums">{pctPrice}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-400 mt-3 max-w-4xl leading-relaxed">
          Click any underlined number to see its breakdown. Excludes sectional title levy clearance, advance rates/levies, building inspection, removals, and insurance.
        </p>

        {/* Glossary */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="font-heading font-bold text-[#0C2340] text-base mb-1">What each fee actually is</h3>
            <p className="text-slate-500 text-xs max-w-2xl">
              Plain-English definitions of every column above. Most buyers see these for the first time on the day they sign the offer.
            </p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Deposit</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                The portion of the price you pay in cash, not from the bank. Goes into the transfer attorney's trust account when the offer is accepted, earns interest until registration, then transfers to the seller. Smaller bond means bigger deposit.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Transfer duty</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                A government tax payable to SARS on property purchases above R&nbsp;1,210,000. Sliding scale from 3% up to 13%. No VAT on duty. The transfer attorney collects it from you and pays SARS before the property can be registered.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Transfer attorney fees</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                The conveyancing attorney's professional fee for transferring ownership. Drafts the deed of transfer, gets clearances, lodges at the Deeds Office, attends to registration. Scales with property price per the LSSA recommended tariff. 15% VAT applies.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Bond registration fees</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                Paid to a separate bond attorney appointed by your bank. They draft the mortgage bond, lodge it with the transfer documents, and register the bank's claim against the property. Same tariff scale as transfer fees, but charged on the bond amount. 15% VAT applies. Cash buyers don't pay this.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Deeds Office</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                Two statutory government fees paid to the Registrar of Deeds — one for registering the transfer (on property price), one for registering the bond (on bond amount). Set by gazette and updated annually. Paid via the attorneys at lodgement.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Disbursements</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                The pile of small admin charges on every attorney invoice: FICA verification, postage & petties (couriers, e-mails), L@W and SARS e-filing fees, deeds searches and print-outs, and the rates clearance certificate from the municipality. Add up to ~R&nbsp;3k–R&nbsp;6k combined.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Bond initiation fee</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                A once-off bank fee for opening the bond account. Capped at R&nbsp;6,037.50 (incl. VAT) by the National Credit Regulator. Charged once the bond is granted — even if the deal later falls through. Most buyers capitalise it into the loan rather than paying upfront.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">Total fees & % of price</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                Everything above (excluding the deposit). For most South African buyers this lands at <strong>5.5%–11% of the purchase price</strong> — lowest near the R&nbsp;1.21M duty threshold, rising steeply as transfer duty kicks in.
              </dd>
            </div>

            <div>
              <dt className="font-heading font-bold text-[#0C2340] text-sm mb-1">LSSA tariff</dt>
              <dd className="text-slate-600 text-xs leading-relaxed">
                The <strong>Law Society of South Africa</strong>'s recommended fee scale for conveyancing work — used by both transfer and bond attorneys to calculate professional fees. It's a guideline, not a law: attorneys can charge above or below it, and banks often negotiate 20–50% discounts via their panel attorneys. Current scale effective 1&nbsp;Aug 2025.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Legend */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 pb-20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#0C2340]/10 border border-[#0C2340]/30" />
            Buyer-driven actions
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#3DBFAD]/15 border border-[#3DBFAD]/45" />
            Happening for you (attorney, bank, state)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-700" />
            Cash out
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 border border-amber-700 rotate-45" />
            Regulated fee
          </div>
        </div>
      </section>

      <AppFooter label="Not for distribution" />
    </div>
  );
}
