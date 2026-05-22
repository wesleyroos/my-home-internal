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

// ─── Slide 1 data: The Decision Phase · Browsing → OTP ─────────────────────

const MILESTONES_DECISION: Milestone[] = [
  {
    day: -75,
    displayLabel: "MONTHS OUT",
    title: "Browsing the dream",
    emoji: "🤩",
    note: "Saved searches on Property24 / Private Property · price comparisons · late-night 'what about this one?' messages to a partner. No bond calculator anxiety — affordability is already settled.",
  },
  {
    day: -30,
    displayLabel: "WEEK -4",
    title: "House hunting & show days",
    emoji: "😍",
    note: "Saturday show-day circuits · 6–15 viewings on average · WhatsApp groups with the agent · second-look visits with partner.",
  },
  {
    day: -21,
    displayLabel: "WEEK -3",
    title: "Offer submitted",
    emoji: "🤞",
    note: "The decision moment. Offer goes in via the agent — price, occupational date, fittings to include. No bond clause needed · cash offers often win the bidding.",
  },
  {
    day: -7,
    displayLabel: "WEEK -1",
    title: "Offer accepted",
    emoji: "🥹",
    note: "Often quicker than mortgage buyers — sellers favour cash for the certainty and shorter timeline. Negotiation lands · occupational date agreed.",
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
      what: "Earnest deposit",
      amount: "5–10% of price",
    },
  },
];

// ─── Slide 2 data: The Logistics Phase · OTP → Registration ────────────────
// OTP (day 0) sits on both slides as the bridge — same pattern as the
// mortgage presentation's Bond Approved milestone.

const MILESTONES_LOGISTICS: Milestone[] = [
  {
    day: 0,
    title: "OTP signed",
    emphasis: true,
    above: true,
    emoji: "🥳",
    flow: {
      from: "Buyer",
      to: "Agent / attorney trust",
      what: "Earnest deposit on R 1.35m purchase",
      amount: "R 100,000 (~7%)",
    },
  },
  {
    day: 7,
    title: "FICA & proof of funds",
    emoji: "🙂",
    note: "Attorneys verify identity and source of capital · transfer file opened · the only paperwork-heavy moment in the journey.",
  },
  {
    day: 21,
    title: "Buyer pays transfer costs to attorney",
    emoji: "😣",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Transfer duty + conveyancing + deeds",
      amount: "~R 35,000 (~2.6%)",
    },
  },
  {
    day: 28,
    title: "Attorney disbursements",
    emphasis: true,
    emoji: "😰",
    multi: {
      from: "Attorney trust pays · ~R 35k",
      outflows: [
        { to: "SARS", what: "Transfer duty · R 4,200" },
        { to: "Transfer attorney", what: "Conveyancing · R 28,000" },
        { to: "Deeds Office", what: "Statutory · R 3,000" },
      ],
    },
  },
  {
    day: 42,
    title: "Rates & levy clearance",
    emoji: "😐",
    note: "Seller-side step · attorney coordinates with municipality and body corp / HOA · 2–3 week wait for certificates before lodging can happen.",
  },
  {
    day: 63,
    title: "Buyer pays balance to attorney",
    emoji: "🫣",
    flow: {
      from: "Buyer",
      to: "Attorney trust",
      what: "Balance of purchase price (days before registration)",
      amount: "R 1,250,000 (~93%)",
    },
  },
  {
    day: 70,
    title: "Lodged at Deeds",
    emoji: "😌",
    note: "Registry checks the docs · no bond to register, so faster than a mortgage buyer's lodging.",
    connectsToNext: { label: "1–2 weeks at the Deeds Office" },
  },
  {
    day: 84,
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😎",
    multi: {
      from: "Attorney trust settles · ~R 1.35m + adjustments",
      outflows: [
        { to: "Seller", what: "Full purchase price · R 1,350,000" },
        { to: "Municipality", what: "Pro-rata rates adjustment" },
        { to: "Body corp / HOA", what: "Pro-rata levy adjustment" },
      ],
    },
  },
];

// ─── Slide 3 data: Reality kicks in · Month 0 → Month 6 after registration ─

const MILESTONES_2: Milestone[] = [
  {
    day: 0,
    displayLabel: "MONTH 0",
    title: "Registration",
    emphasis: true,
    above: true,
    emoji: "😎",
    multi: {
      from: "Attorney trust settles · ~R 1.35m + adjustments",
      outflows: [
        { to: "Seller", what: "Full purchase price · R 1,350,000" },
        { to: "Municipality", what: "Pro-rata rates adjustment" },
        { to: "Body corp / HOA", what: "Pro-rata levy adjustment" },
      ],
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
    emoji: "🙂",
    spendType: "planned",
    multi: {
      from: "Buyer pays · ~R 4k – R 6k / month",
      outflows: [
        { to: "Municipality", what: "Rates & taxes · ~R 1,800" },
        { to: "Body corp", what: "Levy · ~R 2,500 (if sectional)" },
        { to: "Insurer", what: "HOC · ~R 350 (voluntary, no life cover)" },
        { to: "Utilities", what: "Electricity, water · ~R 1,500" },
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
    minDay: -75,
    maxDay: 0,
    milestones: MILESTONES_DECISION,
    eyebrow: "Follow the money · Cash buyer · Browsing → OTP",
    titleStart: "First, the cash buyer ",
    titleAccent: "chooses their dream",
    titleEnd: ".",
    subtitle:
      "Browsing, viewing, falling in love. Weeks of momentum before any money moves — saved searches, weekends on show days, the offer, and finally the OTP. No bond clause, no pre-approval waiting room.",
    phaseLabels: [{ label: "The Dream Phase" }],
  },
  {
    minDay: 0,
    maxDay: 84,
    milestones: MILESTONES_LOGISTICS,
    eyebrow: "Follow the money · Cash buyer · OTP → Registration",
    titleStart: "Then the attorney ",
    titleAccent: "closes the loop",
    titleEnd: ".",
    subtitle:
      "No bond, no bank, no originator — just the buyer, the seller and a transfer attorney. From signed OTP to keys in 6–12 weeks. The big swing factor is municipal rates clearance and Deeds Office timing.",
    phaseLabels: [{ label: "The Anxiety Phase" }],
  },
  {
    minDay: 0,
    maxDay: 180,
    milestones: MILESTONES_2,
    eyebrow: "Follow the money · Cash buyer · Month 0 → Month 6 after registration",
    titleStart: "Then ",
    titleAccent: "reality kicks in",
    titleEnd: " — just lighter.",
    subtitle:
      "No bond instalment, no life cover premium. The planned column shrinks dramatically — but the unplanned column doesn't. Snag lists, furniture, outdoor setup and life events all hit the same way, no matter how the purchase was funded.",
    phaseLabels: [{ label: "Month 1–6 · Reality kicks in" }],
    summary: {
      title: "Where the money actually goes in the first 6 months",
      subtitle:
        "The planned column is a fraction of a mortgage buyer's — but the unplanned column is identical. There's no bond underneath any of it.",
      columns: [
        {
          kind: "planned",
          label: "Planned spend",
          total: "R 25k – R 37k",
          caption:
            "Rates, levies, voluntary HOC and utilities. No bond instalment (no bond), no life cover premium (not required without a bond).",
          items: [
            { label: "Rates & taxes × 6", amount: "~R 11k" },
            { label: "Body corp levy × 6 (if sectional)", amount: "up to ~R 15k" },
            { label: "HOC × 6 (voluntary)", amount: "~R 2k" },
            { label: "Utilities × 6", amount: "~R 9k" },
          ],
        },
        {
          kind: "unplanned",
          label: "Unplanned spend",
          total: "R 41k – R 190k+",
          caption:
            "Identical to a mortgage buyer's column. The snag list, the outdoor setup, the furniture catch-up and the life events all land in the same six months — funding source doesn't change the moving cost.",
          items: [
            { label: "Move-in (deposits, handyman, fibre)", amount: "R 8k – R 25k" },
            { label: "Snag list & contractors", amount: "R 8k – R 35k" },
            { label: "Outdoor & lifestyle setup", amount: "R 5k – R 30k+" },
            { label: "Furniture catch-up", amount: "R 20k – R 100k+" },
          ],
        },
      ],
      punchline:
        "Six months in: R 66k – R 227k+ has left the buyer's pocket on top of the full R 1.35m already paid. No interest eating the principal — but the same unplanned reality as any other buyer.",
    },
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
    phaseLabels: [{ label: "Month 7–12 · New Normal" }],
  },
  SLIDE_4_STATS,
];

export default function CashBuyerJourneyPresentation() {
  return <BuyerJourneyShell slides={SLIDES} />;
}
