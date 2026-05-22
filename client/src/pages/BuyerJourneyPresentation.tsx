/*
 * Buyer Journey Presentation — two slides, horizontal transition.
 * Slide 1: Pre-approval (Day -10) → Registration (Day 88)
 * Slide 2: Registration (Day 88) → 3 months in (Day 178)
 * Registration sits on both slides so the timeline appears continuous as
 * the user scrolls/swipes sideways.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize, Minimize, ChevronLeft, ChevronRight } from "lucide-react";

interface SingleFlow {
  from: string;
  to: string;
  what: string;
  amount: string;
}

interface MultiOutflow {
  to: string;
  what: string;
}

interface MultiFlow {
  from: string;
  outflows: MultiOutflow[];
}

interface ProductOfferItem {
  label: string;
  amount: string;
}

interface ProductOffer {
  pitch: string;
  bundles: ProductOfferItem[];
  total: string;
}

interface Milestone {
  day: number;
  title: string;
  emphasis?: boolean;
  flow?: SingleFlow;
  multi?: MultiFlow;
  note?: string;
  above?: boolean;
  displayLabel?: string; // optional override for the "DAY X" badge (e.g. "MONTH 1")
  emoji?: string; // buyer's emotional state at this milestone
  touchpoints?: string[]; // parties that contact the buyer at this milestone
  connectsToNext?: { label: string }; // dashed bridge to the next milestone with a label
  spendType?: "planned" | "unplanned"; // tags money-flow cards as expected vs surprise spending
  productOffer?: ProductOffer; // marks a milestone as a MyHome product introduction
}

interface PhaseLabel {
  label: string;
  endDay?: number; // where this phase ends · the last phase extends to maxDay when undefined
}

interface SpendSummaryColumn {
  kind: "planned" | "unplanned";
  label: string;
  total: string;
  items: { label: string; amount: string }[];
  caption?: string;
}

interface SpendSummary {
  title: string;
  subtitle?: string;
  columns: SpendSummaryColumn[];
  punchline?: string;
}

interface TimelineSlideConfig {
  kind?: "timeline";
  minDay: number;
  maxDay: number;
  milestones: Milestone[];
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  phaseLabels?: PhaseLabel[];
  summary?: SpendSummary;
}

interface HeroSubStat {
  value: string;
  label: string;
}

interface ActorBreakdown {
  who: string;
  count: number;
  note: string;
}

interface PhaseBar {
  label: string;
  contacts: number;
  weeks: string;
}

interface StatsSlideConfig {
  kind: "stats";
  eyebrow: string;
  estimateTag?: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  hero: {
    value: string;
    unit: string;
    caption: string;
  };
  heroSubStats: HeroSubStat[];
  byActor: ActorBreakdown[];
  phaseBars: PhaseBar[];
  footnote?: string;
}

type SlideConfig = TimelineSlideConfig | StatsSlideConfig;

// ─── Slide 1 data: The Dream Phase · Browsing → Bond approved ──────────────

const MILESTONES_DREAM: Milestone[] = [
  {
    day: -75,
    displayLabel: "MONTHS OUT",
    title: "Browsing the dream",
    emoji: "🤩",
    note: "Saved searches on Property24 / Private Property · affordability calculators · late-night 'what about this one?' messages to a partner.",
  },
  {
    day: -45,
    displayLabel: "WEEK -6",
    title: "Pre-approval",
    emoji: "🥺",
    note: "Bank confirms how much the buyer can borrow · valid 3 months. Bond consultant introduces the buyer to the process — first real-world step.",
  },
  {
    day: -30,
    displayLabel: "WEEK -4",
    title: "House hunting & show days",
    emoji: "😍",
    note: "Saturday show-day circuits · 6–15 viewings on average · WhatsApp groups with the agent · second-look visits with parents and partners.",
  },
  {
    day: -21,
    displayLabel: "WEEK -3",
    title: "Offer submitted",
    emoji: "🤞",
    note: "The decision moment. Offer goes in via the agent — price, deposit, occupational date, fittings to include. Now the wait: will the seller accept, counter, or take a higher bid?",
  },
  {
    day: -7,
    displayLabel: "WEEK -1",
    title: "Offer accepted",
    above: false,
    emoji: "🥹",
    note: "Often after one or two near-misses. Negotiation lands — counter-offers settled, occupational date agreed, fittings nailed down.",
  },
  {
    day: 0,
    title: "OTP signed",
    emphasis: true,
    above: true,
    emoji: "🥳",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Deposit on R 1.35m purchase",
      amount: "R 202,500 (15%)",
    },
  },
  {
    day: 7,
    title: "MyHome All-in Loan",
    emphasis: true,
    above: false,
    emoji: "✨",
    productOffer: {
      pitch:
        "One loan rolled into the bond — covers attorney costs and the first six months of move-in spend, so nothing lands as a surprise out-of-pocket later.",
      bundles: [
        { label: "Bond & transfer costs", amount: "~R 61k" },
        { label: "Move-in essentials", amount: "R 8k – 25k" },
        { label: "Snag list & repairs", amount: "R 8k – 35k" },
        { label: "Outdoor & lifestyle setup", amount: "R 5k – 30k+" },
        { label: "Furniture catch-up", amount: "R 20k – 100k+" },
      ],
      total: "Bundle range · R 102k – R 250k+",
    },
  },
  {
    day: 14,
    title: "Bond approved",
    emphasis: true,
    above: true,
    emoji: "😌",
    note: "Bank's decision — no money moves yet. The dream is real.",
  },
];

// ─── Slide 2 data: The Anxiety Phase · Bond approved → Registration ────────
// Bond Approved (day 14) sits on both slides as the bridge — same pattern
// as Registration (day 88) bridging the anxiety and reality slides.

const MILESTONES_ANXIETY: Milestone[] = [
  {
    day: 14,
    title: "Bond approved",
    emphasis: true,
    above: true,
    emoji: "😌",
    note: "Bank's decision — no money moves yet.",
  },
  {
    day: 27,
    title: "Insurance sold",
    emoji: "🙄",
    note: "Bank's broker signs buyer up for HOC + life cover · premiums kick in at registration",
  },
  {
    day: 38,
    title: "Buyer pays bond and transfer costs to attorney",
    emoji: "😣",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Bond & transfer costs on R 1.35m",
      amount: "~R 61,000 (≈4.5%)",
    },
  },
  {
    day: 45,
    title: "Attorney disbursements",
    emphasis: true,
    emoji: "😰",
    multi: {
      from: "Attorney trust pays · ~R 61k on R 1.35m purchase",
      outflows: [
        { to: "SARS", what: "Transfer duty · R 4,200" },
        { to: "Transfer attorney", what: "Conveyancing · R 28,000" },
        { to: "Bond attorney", what: "Bond reg · R 26,000" },
        { to: "Deeds Office", what: "Statutory · R 3,000" },
      ],
    },
  },
  {
    day: 58,
    title: "Lodged at Deeds",
    emoji: "😬",
    note: "Registry checks the docs",
    connectsToNext: { label: "2–6 weeks at the Deeds Office" },
  },
  {
    day: 88,
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😅",
    flow: {
      from: "Bank",
      to: "Seller (via attorney)",
      what: "Bond settles the balance on R 1.35m",
      amount: "R 1,147,500 (85%)",
    },
  },
];

// ─── Slide 2 data: Reality kicks in · Month 0 → Month 6 after registration ──

const MILESTONES_2: Milestone[] = [
  {
    day: 0,
    displayLabel: "MONTH 0",
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😅",
    flow: {
      from: "Bank",
      to: "Seller (via attorney)",
      what: "Bond settles the balance on R 1.35m",
      amount: "R 1,147,500 (85%)",
    },
  },
  {
    day: 7,
    displayLabel: "WEEK 1",
    title: "Move in",
    emoji: "😁",
    spendType: "unplanned",
    multi: {
      from: "Buyer pays · R 8k – R 25k",
      outflows: [
        { to: "Movers", what: "Removals · R 5k – R 15k" },
        { to: "Municipality", what: "Utility deposits · R 1.5k – R 3.5k" },
        { to: "Handyman", what: "Mount, hang, install · R 1.5k – R 4k" },
        { to: "Fibre / DSTV", what: "Install + router · R 1k – R 3.5k" },
      ],
    },
  },
  {
    day: 28,
    displayLabel: "WEEK 4",
    title: "Snag list & contractors",
    emoji: "😬",
    spendType: "unplanned",
    multi: {
      from: "Buyer pays · R 8k – R 35k",
      outflows: [
        { to: "Glazier", what: "Shower door, broken glass" },
        { to: "Blinds / curtains", what: "Repair or replace" },
        { to: "Plumber / handyman", what: "Geyser, taps, snags" },
        { to: "Alarm / armed response", what: "Reactivation + signup" },
      ],
    },
  },
  {
    day: 35,
    displayLabel: "MONTH 1",
    title: "First monthly debits",
    emphasis: true,
    emoji: "😱",
    spendType: "planned",
    multi: {
      from: "Buyer pays · ~R 14k – R 17k / month",
      outflows: [
        { to: "Bank", what: "Bond instalment · ~R 11,700 (R 6,038 init bundled)" },
        { to: "Insurer", what: "HOC + life cover · ~R 700" },
        { to: "Municipality", what: "Rates & taxes · ~R 1,800" },
        { to: "Body corp", what: "Levy · ~R 2,500 (if sectional)" },
      ],
    },
  },
  {
    day: 75,
    displayLabel: "MONTH 2½",
    title: "Outdoor & lifestyle setup",
    emoji: "😩",
    spendType: "unplanned",
    multi: {
      from: "Buyer pays · R 5k – R 30k+",
      outflows: [
        { to: "Pool service", what: "Startup + chemicals + equipment" },
        { to: "Garden", what: "Borer, pest, irrigation" },
        { to: "Pet-proofing", what: "Extra fencing, screens" },
        { to: "Gate / garage", what: "Motor service, remotes" },
      ],
    },
  },
  {
    day: 120,
    displayLabel: "MONTH 4",
    title: "Furniture catch-up",
    emoji: "🥹",
    spendType: "unplanned",
    multi: {
      from: "Buyer pays · R 20k – R 100k+",
      outflows: [
        { to: "Couch / lounge", what: "The old one looks wrong here" },
        { to: "Curtains & rails", what: "Seller took theirs" },
        { to: "Appliance gaps", what: "Washer, dryer, second fridge" },
        { to: "Outdoor / patio", what: "Furniture for the new braai area" },
      ],
    },
  },
  {
    day: 165,
    displayLabel: "MONTH 5–6",
    title: "Plans shelved, life pivots",
    emphasis: true,
    above: true,
    emoji: "👶",
    note: "Renovation budget reroutes to a life event — a baby on the way, a job change, a family shift. Six months in and still not fully settled. The wishlist quietly slides into the next phase…",
  },
];

// ─── Slide 3 data: Months 6 → 12 after registration ─────────────────────────

const MILESTONES_3: Milestone[] = [
  {
    day: 180,
    displayLabel: "MONTH 6",
    title: "Adaptation kicks in",
    emoji: "😊",
    note: "House starts feeling like home, not a decision · routine settles in · hedonic adaptation underway",
  },
  {
    day: 210,
    displayLabel: "MONTH 7",
    title: "Rates step up",
    emoji: "😒",
    flow: {
      from: "Buyer",
      to: "Municipality",
      what: "Annual property valuation increase kicks in",
      amount: "+ 5–10% / mo",
    },
  },
  {
    day: 270,
    displayLabel: "MONTH 9",
    title: "Justification mode",
    emoji: "🤔",
    note: "Cognitive dissonance resolves · 'we're building equity · the commute isn't that bad'",
  },
  {
    day: 300,
    displayLabel: "MONTH 10",
    title: "First major repair",
    emoji: "😩",
    flow: {
      from: "Buyer",
      to: "Trades / suppliers",
      what: "Typical first big-ticket item (geyser, plumbing, paint)",
      amount: "R 3k – R 30k",
    },
  },
  {
    day: 360,
    displayLabel: "MONTH 12",
    title: "Year 1: where did it go?",
    emphasis: true,
    above: true,
    emoji: "🤯",
    note: "12 monthly payments completed · R 150k – R 700k+ paid · bond balance reduced by only ~2%. Most of it went to interest.",
  },
];

// ─── Slide 4 data: Touchpoint stats across the journey ─────────────────────

// Bottom-up estimate, counted per actor per phase. Each "contact" = a separate
// outbound interaction to the buyer (call, email, SMS, WhatsApp, signing
// session, doc request). Totals: 17+11+10+9+7+5+2+2 = 63 across 8 active
// parties in the 13 weeks before they get the keys.

const SLIDE_4_STATS: StatsSlideConfig = {
  kind: "stats",
  eyebrow: "The touchpoints · Mortgage buyer · By the numbers",
  estimateTag: "Illustrative estimate · pending validation with BetterBond",
  titleStart: "A buyer fields ",
  titleAccent: "≈ 63 contacts",
  titleEnd: " before they get the keys.",
  subtitle:
    "Counted per actor per phase. Every call, email, SMS, signing session or doc request the buyer has to respond to over the 13 weeks from house-hunt to registration.",
  hero: {
    value: "63",
    unit: "contacts",
    caption: "from house-hunt to keys (≈ 13 weeks)",
  },
  heroSubStats: [
    { value: "8", label: "active parties" },
    { value: "13", label: "weeks" },
    { value: "≈ 5", label: "contacts / week" },
  ],
  byActor: [
    {
      who: "Estate agent",
      count: 17,
      note: "Viewings, offer logistics, FICA chase, status check-ins, key handover",
    },
    {
      who: "Bond originator",
      count: 11,
      note: "Pre-approval intake, doc requests, multi-bank app, status, negotiation",
    },
    {
      who: "Transfer attorney",
      count: 10,
      note: "FICA, signing apt, deposit & costs reminders, lodging, registration",
    },
    {
      who: "Bank",
      count: 9,
      note: "Credit verification, valuation, approval letter, insurance call, welcome",
    },
    {
      who: "Bond attorney",
      count: 7,
      note: "FICA, bond signing, status updates, registration confirmation",
    },
    {
      who: "Insurer / broker",
      count: 5,
      note: "HOC quote, life cover quote, signing, premium confirmation",
    },
    {
      who: "Seller's attorney",
      count: 2,
      note: "Cancellation figures, rates clearance coordination",
    },
    {
      who: "Other (seller, municipality)",
      count: 2,
      note: "Rates clearance figures, occupational date confirmation",
    },
  ],
  phaseBars: [
    { label: "Pre-approval & house hunt", contacts: 16, weeks: "weeks -6 to -1" },
    { label: "OTP → bond approved", contacts: 13, weeks: "weeks 0–2" },
    { label: "Attorney phase", contacts: 28, weeks: "weeks 2–12" },
    { label: "Registration week", contacts: 6, weeks: "week 13" },
    { label: "Month 1 — debits start", contacts: 7, weeks: "month 1" },
    { label: "Months 2–6 — quiet", contacts: 10, weeks: "months 2–6" },
  ],
  footnote:
    "Bottom-up estimate · 8 actors × per-phase contact assumptions, summed. Excludes automated statements after Month 1 and the buyer's own outbound calls. Needs validation against real CRM data from BetterBond / originator partners before use externally.",
};

// ─── Slide configurations ───────────────────────────────────────────────────

const SLIDES: SlideConfig[] = [
  {
    minDay: -75,
    maxDay: 14,
    milestones: MILESTONES_DREAM,
    eyebrow: "Follow the money · Mortgage buyer · Browsing → Bond approved",
    titleStart: "First, the buyer ",
    titleAccent: "chooses their dream",
    titleEnd: ".",
    subtitle:
      "Browsing, viewing, falling in love. Two to three months of momentum before any real money moves — saved searches, pre-approval, weekends on show days, the offer, and finally the bank's yes.",
    phaseLabels: [{ label: "The Dream Phase" }],
  },
  {
    minDay: 14,
    maxDay: 88,
    milestones: MILESTONES_ANXIETY,
    eyebrow: "Follow the money · Mortgage buyer · Bond approved → Registration",
    titleStart: "Then ",
    titleAccent: "we enable their journey",
    titleEnd: ".",
    subtitle:
      "Insurance, attorney funds, disbursements, deeds. Ten weeks where the buyer pays out, signs more documents than they ever expected, and waits for the Registrar to say yes. The transfer attorney's trust account is the hub everything flows through.",
    phaseLabels: [{ label: "The Anxiety Phase" }],
  },
  {
    minDay: 0,
    maxDay: 180,
    milestones: MILESTONES_2,
    eyebrow: "Follow the money · Mortgage buyer · Month 0 → Month 6 after registration",
    titleStart: "Then ",
    titleAccent: "reality kicks in",
    titleEnd: ".",
    subtitle:
      "Settling takes longer than anyone tells you. The first six months are a steady drip of unplanned costs — snag-list contractors, furniture you forgot you needed, outdoor and pet setup, and life events that quietly reroute your renovation budget.",
    phaseLabels: [{ label: "Month 1–6 · Reality kicks in" }],
    summary: {
      title: "Where the money actually goes in the first 6 months",
      subtitle:
        "Most buyers budget for the planned column. The unplanned column is where reality lives — and it often costs more.",
      columns: [
        {
          kind: "planned",
          label: "Planned spend",
          total: "R 84k – R 102k",
          caption:
            "What buyers expect — the bond debit. Many forget that insurance, rates, and levies ride alongside it.",
          items: [
            { label: "Bond instalment × 6", amount: "~R 70k" },
            { label: "HOC + life cover × 6", amount: "~R 4k" },
            { label: "Rates & taxes × 6", amount: "~R 11k" },
            { label: "Body corp levy × 6 (if sectional)", amount: "up to ~R 15k" },
          ],
        },
        {
          kind: "unplanned",
          label: "Unplanned spend",
          total: "R 41k – R 190k+",
          caption:
            "What nobody warned them about. Most buyers think 'movers' and stop there — but the snag list, the outdoor setup, the furniture catch-up, and the life events all land in the same six months.",
          items: [
            { label: "Move-in (deposits, handyman, fibre)", amount: "R 8k – R 25k" },
            { label: "Snag list & contractors", amount: "R 8k – R 35k" },
            { label: "Outdoor & lifestyle setup", amount: "R 5k – R 30k+" },
            { label: "Furniture catch-up", amount: "R 20k – R 100k+" },
          ],
        },
      ],
      punchline:
        "Six months in: R 125k – R 290k+ has left the buyer's pocket on top of the deposit. That's another 9–22% of the purchase price — most of it unbudgeted.",
    },
  },
  {
    minDay: 180,
    maxDay: 360,
    milestones: MILESTONES_3,
    eyebrow: "Follow the money · Mortgage buyer · Month 6 → Month 12 after registration",
    titleStart: "Then ",
    titleAccent: "year one",
    titleEnd: " sneaks up.",
    subtitle:
      "Adaptation completes and the house feels like home. The first annual increases arrive, the first big repair hits, and by month 12 the buyer has paid hundreds of thousands — but only ~2% has touched the principal.",
    phaseLabels: [{ label: "Month 7–12 · New Normal" }],
  },
  SLIDE_4_STATS,
];

// ─── Components ─────────────────────────────────────────────────────────────

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  if (milestone.productOffer) {
    const offer = milestone.productOffer;
    return (
      <div className="relative rounded-xl px-3.5 py-3 text-left bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#16395a] border border-[#3DBFAD]/40 shadow-xl text-white">
        <div className="absolute -inset-px rounded-xl pointer-events-none ring-1 ring-[#3DBFAD]/20" />
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] font-mono font-bold tracking-wider text-[#3DBFAD]">
            {milestone.displayLabel ?? `DAY ${milestone.day}`}
          </div>
          {milestone.emoji && (
            <span className="text-xl leading-none">{milestone.emoji}</span>
          )}
        </div>
        <div className="text-sm font-bold leading-tight mt-0.5 mb-2 text-white">
          {milestone.title}
        </div>
        <div className="text-[10px] italic text-white/75 leading-snug mb-2.5">
          {offer.pitch}
        </div>
        <div className="border-t border-white/15 pt-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#3DBFAD] mb-1.5">
            Bundled into one loan
          </div>
          <ul className="space-y-1 mb-2.5">
            {offer.bundles.map((b) => (
              <li
                key={b.label}
                className="flex items-start justify-between gap-2 text-[10px] leading-snug"
              >
                <span className="text-white/85 flex-1 min-w-0">{b.label}</span>
                <span className="text-[#3DBFAD] font-mono whitespace-nowrap">
                  {b.amount}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-white/15 font-mono text-[10px] text-[#3DBFAD] font-bold">
            {offer.total}
          </div>
        </div>
      </div>
    );
  }
  const isEmphasis = milestone.emphasis === true;
  return (
    <div
      className={`rounded-xl border px-3.5 py-3 text-left ${
        isEmphasis
          ? "bg-white border-[#0C2340]/30 shadow-md"
          : "bg-slate-50/80 border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-mono font-bold tracking-wider text-[#3DBFAD]">
          {milestone.displayLabel ?? `DAY ${milestone.day}`}
        </div>
        {milestone.emoji && (
          <span className="text-xl leading-none">{milestone.emoji}</span>
        )}
      </div>
      <div
        className={`text-sm font-bold leading-tight mt-0.5 mb-2.5 ${
          isEmphasis ? "text-[#0C2340]" : "text-slate-800"
        }`}
      >
        {milestone.title}
      </div>

      <div className="border-t border-slate-200/80 pt-2.5">
        {milestone.touchpoints && milestone.touchpoints.length > 0 && (
          <div className="text-[11px] leading-snug">
            <div className="font-semibold text-[#0C2340] mb-1.5">
              {milestone.touchpoints.length} contact
              {milestone.touchpoints.length === 1 ? "" : "s"}
            </div>
            <ul className="space-y-1">
              {milestone.touchpoints.map((t) => (
                <li key={t} className="flex items-start gap-1.5">
                  <span className="text-sm leading-none text-[#3DBFAD] mt-0.5 flex-shrink-0">
                    ·
                  </span>
                  <span className="flex-1 min-w-0 text-[#0C2340] font-medium">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!milestone.touchpoints && milestone.flow && (
          <div className="text-[11px] leading-snug">
            <div className="font-semibold text-[#0C2340]">{milestone.flow.from}</div>
            <div className="flex items-center gap-1.5 my-0.5 text-slate-500">
              <span className="text-base leading-none text-[#3DBFAD]">↓</span>
              <span className="text-[10px]">{milestone.flow.what}</span>
            </div>
            <div className="font-semibold text-[#0C2340]">{milestone.flow.to}</div>
            <div className="mt-2 pt-1.5 border-t border-slate-100 font-mono text-[10px] text-[#3DBFAD]">
              {milestone.flow.amount}
            </div>
          </div>
        )}

        {!milestone.touchpoints && milestone.multi && (
          <div className="text-[11px] leading-snug">
            <div className="font-semibold text-[#0C2340] mb-1.5">
              {milestone.multi.from}
            </div>
            <ul className="space-y-1">
              {milestone.multi.outflows.map((o) => (
                <li key={o.to} className="flex items-start gap-1.5">
                  <span className="text-sm leading-none text-[#3DBFAD] mt-0.5 flex-shrink-0">
                    ↓
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-[#0C2340]">{o.to}</span>
                    <span className="text-slate-500 text-[10px]"> · {o.what}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!milestone.touchpoints && milestone.note && (
          <div className="text-[11px] text-slate-500 italic leading-snug">
            {milestone.note}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineSlide({ config }: { config: TimelineSlideConfig }) {
  const {
    minDay,
    maxDay,
    milestones,
    eyebrow,
    titleStart,
    titleAccent,
    titleEnd,
    subtitle,
    phaseLabels,
    summary,
  } = config;

  const PAD_PCT = 6.5; // % padding for cards so they don't fall off the edge

  // Responsive scaling — the timeline body is laid out at a fixed 1900px width.
  // On smaller viewports we scale the whole block down with a transform so cards
  // shrink uniformly rather than overflowing horizontally.
  const BASE_WIDTH = 1900;
  const scaleWrapRef = useRef<HTMLDivElement>(null);
  const scaleInnerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const wrap = scaleWrapRef.current;
    const inner = scaleInnerRef.current;
    if (!wrap || !inner) return;
    const compute = () => {
      const wW = wrap.clientWidth;
      const newScale = Math.min(1, wW / BASE_WIDTH);
      setScale(newScale);
      setScaledHeight(inner.offsetHeight * newScale);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative min-h-full w-full py-16 bg-gradient-to-br from-white via-[#f6fbfa] to-[#eef5f4] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#3DBFAD]/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#0C2340]/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0C2340 1px, transparent 1px), linear-gradient(90deg, #0C2340 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header — constrained to readable width */}
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-[#3DBFAD]" />
          <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl leading-tight mb-3"
        >
          {titleStart}
          <span className="text-[#3DBFAD]">{titleAccent}</span>
          {titleEnd}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#0C2340]/65 text-base md:text-lg max-w-3xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Timeline area — laid out at 1900px, scaled down on smaller viewports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="relative w-full overflow-hidden"
      >
        <div
          ref={scaleWrapRef}
          className="w-full"
          style={{ height: scaledHeight }}
        >
        <div
          ref={scaleInnerRef}
          className="py-12"
          style={{
            width: BASE_WIDTH,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          {/* Phase label row — lives ABOVE the timeline so it never collides with cards */}
          {phaseLabels && (
            <div className="relative h-20 mb-8">
              {phaseLabels.map((phase, idx) => {
                const startDay =
                  idx === 0 ? minDay : phaseLabels[idx - 1].endDay ?? maxDay;
                const endDay = phase.endDay !== undefined ? phase.endDay : maxDay;
                const GAP_PCT = 0.6;
                const innerStart = (startDay - minDay) / (maxDay - minDay);
                const innerEnd = (endDay - minDay) / (maxDay - minDay);
                const leftPct =
                  PAD_PCT +
                  innerStart * (100 - 2 * PAD_PCT) +
                  (idx > 0 ? GAP_PCT : 0);
                const rightEdgeFromLeft =
                  PAD_PCT +
                  innerEnd * (100 - 2 * PAD_PCT) -
                  (idx < phaseLabels.length - 1 ? GAP_PCT : 0);
                const rightPct = 100 - rightEdgeFromLeft;
                return (
                  <div
                    key={idx}
                    className="absolute inset-y-0 flex items-center"
                    style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
                  >
                    <span className="w-3 h-3 rounded-full bg-black flex-shrink-0" />
                    <span className="flex-1 h-1 bg-black" />
                    <span className="px-6 py-2 text-xl md:text-3xl lg:text-4xl font-heading font-extrabold uppercase tracking-[0.15em] text-[#3DBFAD] whitespace-nowrap">
                      {phase.label}
                    </span>
                    <span className="flex-1 h-1 bg-black" />
                    <span className="w-3 h-3 rounded-full bg-black flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Timeline (line + cards) */}
          <div className="relative" style={{ height: "720px" }}>
            {/* Center line — touches both edges of the slide */}
            <div className="absolute top-1/2 inset-x-0 -translate-y-1/2 h-0.5 bg-slate-200" />

            {/* Dashed connectors — drawn ON the center line between specific milestone pairs, with a wait-time label above */}
            {milestones.map((event, i) => {
              if (!event.connectsToNext || i >= milestones.length - 1) return null;
              const next = milestones[i + 1];
              const startPct = PAD_PCT + ((event.day - minDay) / (maxDay - minDay)) * (100 - 2 * PAD_PCT);
              const endPct = PAD_PCT + ((next.day - minDay) / (maxDay - minDay)) * (100 - 2 * PAD_PCT);
              return (
                <div
                  key={`bridge-${event.day}`}
                  className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
                >
                  <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#0C2340] bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm whitespace-nowrap -mt-1 mb-1">
                    {event.connectsToNext.label}
                  </span>
                  <div className="w-full border-t-2 border-dashed border-[#0C2340]/70" />
                </div>
              );
            })}

            {milestones.map((event, i) => {
              const innerPct = (event.day - minDay) / (maxDay - minDay);
              const left = PAD_PCT + innerPct * (100 - 2 * PAD_PCT);
              const above = event.above !== undefined ? event.above : i % 2 === 0;
              const hasFunds = !!event.flow || !!event.multi;
              return (
                <div
                  key={event.day}
                  className="absolute top-0 bottom-0"
                  style={{ left: `${left}%`, width: 0 }}
                >
                  <div
                    className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full ring-4 ring-white ${
                      event.productOffer
                        ? "bg-[#3DBFAD]"
                        : event.emphasis
                        ? "bg-[#0C2340]"
                        : "bg-white border-2 border-slate-400"
                    }`}
                  />
                  <div
                    className={`absolute left-0 w-px ${
                      event.productOffer
                        ? "bg-[#3DBFAD]/60"
                        : event.emphasis
                        ? "bg-[#0C2340]/40"
                        : "bg-slate-300"
                    }`}
                    style={{
                      top: above ? "calc(50% - 78px)" : "calc(50% + 12px)",
                      height: "66px",
                    }}
                  />
                  <div
                    className="absolute left-0 -translate-x-1/2 w-56 flex flex-col items-start gap-1.5"
                    style={
                      above
                        ? { bottom: "calc(50% + 90px)" }
                        : { top: "calc(50% + 90px)" }
                    }
                  >
                    {event.productOffer && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center text-[10px] font-bold tracking-[0.15em] text-white bg-[#3DBFAD] px-2 py-0.5 rounded-md shadow-sm">
                          ✨ NEW
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3DBFAD]">
                          MyHome product
                        </span>
                      </div>
                    )}
                    {hasFunds && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center text-[10px] font-bold tracking-[0.15em] text-white bg-[#F97316] px-2 py-0.5 rounded-md shadow-sm">
                          ZAR
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F97316]">
                          Money flows
                        </span>
                        {event.spendType === "planned" && (
                          <span className="inline-flex items-center text-[10px] font-bold tracking-[0.15em] text-white bg-[#10B981] px-2 py-0.5 rounded-md shadow-sm">
                            PLANNED
                          </span>
                        )}
                        {event.spendType === "unplanned" && (
                          <span className="inline-flex items-center text-[10px] font-bold tracking-[0.15em] text-white bg-[#EF4444] px-2 py-0.5 rounded-md shadow-sm">
                            UNPLANNED
                          </span>
                        )}
                      </div>
                    )}
                    <MilestoneCard milestone={event} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        </div>
      </motion.div>

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-12 mt-4 mb-8"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0C2340] tracking-tight">
                {summary.title}
              </h3>
              {summary.subtitle && (
                <p className="text-[#0C2340]/65 text-sm md:text-base mt-1.5 max-w-3xl">
                  {summary.subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {summary.columns.map((col) => {
                const isPlanned = col.kind === "planned";
                return (
                  <div key={col.kind} className="p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center text-[10px] font-bold tracking-[0.18em] text-white px-2.5 py-0.5 rounded-md ${
                          isPlanned ? "bg-[#10B981]" : "bg-[#EF4444]"
                        }`}
                      >
                        {isPlanned ? "PLANNED" : "UNPLANNED"}
                      </span>
                      <span className="text-[#0C2340] text-sm font-semibold uppercase tracking-wider">
                        {col.label}
                      </span>
                    </div>
                    <div
                      className={`font-heading font-extrabold text-3xl md:text-4xl tracking-tight mb-3 ${
                        isPlanned ? "text-[#10B981]" : "text-[#EF4444]"
                      }`}
                    >
                      {col.total}
                    </div>
                    {col.caption && (
                      <p className="text-[#0C2340]/65 text-xs md:text-sm leading-snug mb-4">
                        {col.caption}
                      </p>
                    )}
                    <ul className="space-y-1.5 border-t border-slate-100 pt-3">
                      {col.items.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start justify-between gap-3 text-xs md:text-[13px]"
                        >
                          <span className="text-[#0C2340] flex-1 min-w-0">
                            {item.label}
                          </span>
                          <span className="text-[#0C2340] font-semibold whitespace-nowrap">
                            {item.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {summary.punchline && (
              <div className="px-6 sm:px-10 py-5 bg-gradient-to-r from-[#0C2340] to-[#1E3A5A] text-white">
                <p className="text-sm md:text-base font-medium leading-snug">
                  {summary.punchline}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StatsSlide({ config }: { config: StatsSlideConfig }) {
  const {
    eyebrow,
    estimateTag,
    titleStart,
    titleAccent,
    titleEnd,
    subtitle,
    hero,
    heroSubStats,
    byActor,
    phaseBars,
    footnote,
  } = config;

  const maxBar = Math.max(...phaseBars.map((p) => p.contacts));
  const maxActor = Math.max(...byActor.map((a) => a.count));

  return (
    <div className="relative min-h-full w-full py-16 bg-gradient-to-br from-white via-[#f6fbfa] to-[#eef5f4] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#3DBFAD]/8 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#0C2340]/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0C2340 1px, transparent 1px), linear-gradient(90deg, #0C2340 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <span className="w-10 h-px bg-[#3DBFAD]" />
          <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
            {eyebrow}
          </span>
          {estimateTag && (
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {estimateTag}
            </span>
          )}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl leading-tight mb-3"
        >
          {titleStart}
          <span className="text-[#3DBFAD]">{titleAccent}</span>
          {titleEnd}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#0C2340]/65 text-base md:text-lg max-w-3xl"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Stats body */}
      <div className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-12 gap-6">
          {/* Hero stat with sub-stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="col-span-12 lg:col-span-5 rounded-2xl bg-[#0C2340] text-white p-10 flex flex-col justify-between shadow-xl"
          >
            <div className="text-[#3DBFAD] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              The headline number
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-heading font-bold text-[120px] leading-none text-white tabular-nums">
                  {hero.value}
                </span>
                <span className="text-2xl font-semibold text-[#3DBFAD]">
                  {hero.unit}
                </span>
              </div>
              <div className="mt-3 text-base text-white/75">{hero.caption}</div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              {heroSubStats.map((s) => (
                <div key={s.label}>
                  <div className="font-heading font-bold text-3xl text-[#3DBFAD] tabular-nums leading-none">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[11px] text-white/60 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* By-actor breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="col-span-12 lg:col-span-7 rounded-2xl bg-white/80 border border-slate-200 p-7"
          >
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <div className="text-[#3DBFAD] text-xs font-semibold uppercase tracking-[0.3em]">
                  Where the 63 come from
                </div>
                <div className="font-heading font-bold text-[#0C2340] text-2xl mt-1">
                  Contacts by actor
                </div>
              </div>
              <div className="text-[11px] text-[#0C2340]/50 font-mono">
                pre-keys · 13 weeks
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {byActor.map((a) => {
                const widthPct = (a.count / maxActor) * 100;
                return (
                  <div
                    key={a.who}
                    className="grid grid-cols-12 items-center gap-3 py-2.5"
                  >
                    <div className="col-span-4">
                      <div className="text-sm font-semibold text-[#0C2340]">
                        {a.who}
                      </div>
                    </div>
                    <div className="col-span-7">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3DBFAD] rounded-full"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[#0C2340]/55 leading-snug max-w-[260px] truncate">
                          {a.note}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 text-right font-mono font-bold text-base text-[#0C2340] tabular-nums">
                      {a.count}
                    </div>
                  </div>
                );
              })}
              <div className="grid grid-cols-12 items-center gap-3 pt-3 mt-1">
                <div className="col-span-4 text-sm font-bold uppercase tracking-wider text-[#0C2340]">
                  Total
                </div>
                <div className="col-span-7" />
                <div className="col-span-1 text-right font-heading font-bold text-2xl text-[#3DBFAD] tabular-nums">
                  {byActor.reduce((sum, a) => sum + a.count, 0)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phase bars */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="col-span-12 rounded-2xl bg-white/70 border border-slate-200 p-7"
          >
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <div className="text-[#3DBFAD] text-xs font-semibold uppercase tracking-[0.3em]">
                  Where the noise is loudest
                </div>
                <div className="font-heading font-bold text-[#0C2340] text-2xl mt-1">
                  Contacts per phase
                </div>
              </div>
              <div className="text-[11px] text-[#0C2340]/50 font-mono">
                full year shown · bar = contact count
              </div>
            </div>
            <div className="space-y-2.5">
              {phaseBars.map((p) => {
                const widthPct = (p.contacts / maxBar) * 100;
                return (
                  <div key={p.label} className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-3 text-sm font-semibold text-[#0C2340] text-right">
                      {p.label}
                    </div>
                    <div className="col-span-7">
                      <div className="relative h-6 bg-slate-100 rounded-md overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3DBFAD] to-[#2da294] rounded-md"
                          style={{ width: `${widthPct}%` }}
                        />
                        <div className="absolute inset-0 flex items-center px-3">
                          <span className="font-mono font-bold text-[11px] text-white drop-shadow-sm">
                            {p.contacts}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-[11px] text-[#0C2340]/50 font-mono">
                      {p.weeks}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {footnote && (
            <div className="col-span-12 text-[11px] text-[#0C2340]/50 italic max-w-4xl leading-relaxed">
              {footnote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BuyerJourneyShell({ slides }: { slides: SlideConfig[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringControlsRef = useRef(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const goToSlide = (idx: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    const el = slideRefs.current[clamped];
    const container = containerRef.current;
    if (!el || !container) return;
    container.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      setControlsVisible(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      return;
    }

    const showAndScheduleHide = () => {
      setControlsVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (hoveringControlsRef.current) return;
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2000);
    };

    showAndScheduleHide();
    const events: Array<keyof WindowEventMap> = ["mousemove", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, showAndScheduleHide));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, showAndScheduleHide));
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    };
  }, [isFullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(slides.length - 1);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = slideRefs.current.findIndex((el) => el === entry.target);
            if (idx >= 0) setCurrentSlide(idx);
          }
        });
      },
      { root, threshold: [0.5] }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f0f5fa]">
      <div
        ref={containerRef}
        className="h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth flex"
      >
        {slides.map((slide, i) => (
          <section
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="snap-start w-screen h-screen flex-shrink-0 overflow-y-auto"
          >
            {slide.kind === "stats" ? (
              <StatsSlide config={slide} />
            ) : (
              <TimelineSlide config={slide} />
            )}
          </section>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onMouseEnter={() => {
          hoveringControlsRef.current = true;
          if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
          }
          setControlsVisible(true);
        }}
        onMouseLeave={() => {
          hoveringControlsRef.current = false;
          if (isFullscreen) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2000);
          }
        }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/90 backdrop-blur border border-[#0C2340]/10 rounded-full shadow-lg px-3 py-2 ${
          controlsVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            goToSlide(currentSlide - 1);
          }}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0C2340] hover:bg-[#0C2340]/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all rounded-full ${
                i === currentSlide
                  ? "w-8 h-2 bg-[#3DBFAD]"
                  : "w-2 h-2 bg-[#0C2340]/25 hover:bg-[#0C2340]/50"
              }`}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#0C2340]/60 px-1 tabular-nums">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            goToSlide(currentSlide + 1);
          }}
          disabled={currentSlide === slides.length - 1}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#0C2340] hover:bg-[#0C2340]/90 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <span className="w-px h-5 bg-[#0C2340]/10 mx-1" />

        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            toggleFullscreen();
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen (F)" : "Enter fullscreen (F)"}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0C2340] hover:bg-[#0C2340]/5 transition"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
}

export type { SlideConfig, TimelineSlideConfig, StatsSlideConfig, Milestone };

export default function BuyerJourneyPresentation() {
  return <BuyerJourneyShell slides={SLIDES} />;
}
