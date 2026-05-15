/*
 * Cash Buyer Journey Presentation — same shell as the mortgage buyer
 * presentation, but with cash-buyer-specific milestones and stats.
 * No pre-approval, no bond, no bank, no bond attorney.
 */

import {
  BuyerJourneyShell,
  type SlideConfig,
  type Milestone,
  type StatsSlideConfig,
} from "./BuyerJourneyPresentation";

// ─── Slide 1 data: OTP → Registration (≈ 6 weeks) ──────────────────────────

const MILESTONES_1: Milestone[] = [
  {
    day: 0,
    title: "OTP signed",
    emphasis: true,
    emoji: "🥳",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Property deposit",
      amount: "5–10% of price",
    },
  },
  {
    day: 14,
    title: "Buyer pays balance and transfer costs to attorney",
    emoji: "😣",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Balance of price + transfer costs",
      amount: "≈ 95% of price + 3–5%",
    },
  },
  {
    day: 21,
    title: "Attorney disbursements",
    emphasis: true,
    emoji: "😰",
    multi: {
      from: "Attorney trust pays",
      outflows: [
        { to: "SARS", what: "Transfer duty" },
        { to: "Transfer attorney", what: "Conveyancing" },
        { to: "Deeds Office", what: "Statutory" },
      ],
    },
  },
  {
    day: 35,
    title: "Lodged at Deeds",
    emoji: "😌",
    note: "Registry checks the docs · no bond to register",
  },
  {
    day: 42,
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😎",
    flow: {
      from: "Attorney trust",
      to: "Seller",
      what: "Full purchase price settles the sale",
      amount: "Full price",
    },
  },
];

// ─── Slide 2 data: Registration → 6 months in ──────────────────────────────

const MILESTONES_2: Milestone[] = [
  {
    day: 0,
    displayLabel: "MONTH 0",
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😎",
    flow: {
      from: "Attorney trust",
      to: "Seller",
      what: "Full purchase price settles the sale",
      amount: "Full price",
    },
  },
  {
    day: 7,
    displayLabel: "WEEK 1",
    title: "Move in",
    emoji: "😁",
    flow: {
      from: "Buyer",
      to: "Various",
      what: "Removals + utility deposits",
      amount: "R 5k – R 25k",
    },
  },
  {
    day: 30,
    displayLabel: "MONTH 1",
    title: "First monthly debits",
    emphasis: true,
    emoji: "🙂",
    multi: {
      from: "Buyer pays",
      outflows: [
        { to: "Municipality", what: "Rates & taxes" },
        { to: "Body corp", what: "Levy (if sectional title)" },
        { to: "Insurer", what: "HOC (if bought voluntarily)" },
        { to: "Utilities", what: "Electricity, water" },
      ],
    },
  },
];

// ─── Slide 3 data: Months 6 → 12 after registration ────────────────────────

const MILESTONES_3: Milestone[] = [
  {
    day: 180,
    displayLabel: "MONTH 6",
    title: "Adaptation kicks in",
    emoji: "😊",
    note: "House feels like home · routine settles in · hedonic adaptation underway",
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
    title: "Equity-free pride",
    emoji: "😌",
    note: "No bond statement to flinch at each month · the asset is fully theirs · liquidity question lingers",
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
    title: "Year 1: light footprint",
    emphasis: true,
    above: true,
    emoji: "🙂",
    note: "12 months of carrying costs (rates, levies, insurance, maintenance) ≈ R 30k – R 80k. No interest paid · no principal owed · the asset has been fully theirs from day one.",
  },
];

// ─── Slide 4 data: Touchpoint stats for cash buyer ─────────────────────────
// Roughly half the contact load of a mortgage buyer — no bond originator,
// no bank credit team, no bond attorney, no insurance push from the bank.

const SLIDE_4_STATS: StatsSlideConfig = {
  kind: "stats",
  eyebrow: "The touchpoints · Cash buyer · By the numbers",
  estimateTag: "Illustrative estimate · pending validation",
  titleStart: "A cash buyer fields ",
  titleAccent: "≈ 31 contacts",
  titleEnd: " before they get the keys.",
  subtitle:
    "Counted per actor per phase. About half the contact load of a mortgage buyer — no bond originator, no bank credit team, no bond attorney, no insurance push.",
  hero: {
    value: "31",
    unit: "contacts",
    caption: "from house-hunt to keys (≈ 6 weeks post-OTP)",
  },
  heroSubStats: [
    { value: "5", label: "active parties" },
    { value: "6", label: "weeks post-OTP" },
    { value: "≈ 5", label: "contacts / week" },
  ],
  byActor: [
    {
      who: "Estate agent",
      count: 14,
      note: "Viewings, offer logistics, FICA chase, status check-ins, key handover",
    },
    {
      who: "Transfer attorney",
      count: 10,
      note: "FICA, signing apt, balance & costs reminders, lodging, registration",
    },
    {
      who: "Insurer (voluntary HOC)",
      count: 3,
      note: "Quote, signing, premium confirmation — buyer-driven, not bank-required",
    },
    {
      who: "Seller's attorney",
      count: 2,
      note: "No bond cancellation needed · rates clearance coordination",
    },
    {
      who: "Other (seller, municipality)",
      count: 2,
      note: "Rates clearance figures, occupational date confirmation",
    },
  ],
  phaseBars: [
    { label: "House hunt & decision", contacts: 12, weeks: "weeks -4 to -1" },
    { label: "OTP → balance paid", contacts: 6, weeks: "weeks 0–2" },
    { label: "Attorney phase", contacts: 12, weeks: "weeks 2–6" },
    { label: "Registration week", contacts: 3, weeks: "week 6" },
    { label: "Month 1 — debits start", contacts: 3, weeks: "month 1" },
    { label: "Months 2–6 — quiet", contacts: 5, weeks: "months 2–6" },
  ],
  footnote:
    "Bottom-up estimate · 5 actors × per-phase contact assumptions, summed. Excludes bank involvement (none required), bond originator (none used) and automated statements after Month 1. Compare with mortgage buyer at ≈ 63 — roughly double the load. Needs validation against real CRM data before external use.",
};

// ─── Slide configurations ───────────────────────────────────────────────────

const SLIDES: SlideConfig[] = [
  {
    minDay: 0,
    maxDay: 42,
    milestones: MILESTONES_1,
    eyebrow: "Follow the money · Cash buyer · OTP → Registration",
    titleStart: "A cash buyer chooses their dream, ",
    titleAccent: "and the path is shorter",
    titleEnd: ".",
    subtitle:
      "No bond, no bank, no originator — just the buyer, the seller and a transfer attorney. From OTP to keys in about 6 weeks.",
    phaseLabels: [
      { label: "The Commitment Phase", endDay: 14 },
      { label: "The Logistics Phase" },
    ],
  },
  {
    minDay: 0,
    maxDay: 180,
    milestones: MILESTONES_2,
    eyebrow: "Follow the money · Cash buyer · Month 0 → Month 6 after registration",
    titleStart: "Then the ",
    titleAccent: "new normal",
    titleEnd: " is much quieter.",
    subtitle:
      "No bond instalment. No life cover premium. Monthly outflows are a fraction of a mortgage buyer's — just rates, levies, voluntary insurance and utilities.",
    phaseLabels: [{ label: "Month 1–6 · No bank, no bond" }],
  },
  {
    minDay: 180,
    maxDay: 360,
    milestones: MILESTONES_3,
    eyebrow: "Follow the money · Cash buyer · Month 6 → Month 12 after registration",
    titleStart: "And year one carries a ",
    titleAccent: "much lighter cost",
    titleEnd: ".",
    subtitle:
      "Adaptation completes and the house feels like home. The first annual rates increase arrives, the first big repair hits — but with no interest and no principal, year one costs a fraction of a mortgage buyer's first year.",
    phaseLabels: [{ label: "Month 7–12 · Light footprint" }],
  },
  SLIDE_4_STATS,
];

export default function CashBuyerJourneyPresentation() {
  return <BuyerJourneyShell slides={SLIDES} />;
}
