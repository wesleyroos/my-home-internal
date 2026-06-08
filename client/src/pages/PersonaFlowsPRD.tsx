/*
 * Persona Flows — High-Level PRD
 * Notion-style working document. Captures the rails model (data pull → Month 0
 * → data push, BetterID spine, white-label module toggles) and the seven
 * persona process flows from the whiteboard session (June 2026).
 *
 * This doc is the source for the boxes-and-arrows journey canvases
 * (first one: /renter-flow), which in turn feed the wireframe screens.
 */

import { Link } from "wouter";
import { ArrowRight, Workflow } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Doc primitives (Notion-style) ──────────────────────────────────────────

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-[#0C2340] mt-12 mb-3 pb-1.5 border-b border-slate-200">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold text-[#0C2340] mt-8 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-slate-700 mb-3">{children}</p>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-[#0C2340]">{children}</strong>;
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 mb-3 space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="text-[15px] leading-relaxed text-slate-700">
          {it}
        </li>
      ))}
    </ul>
  );
}

function Callout({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "amber" }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 my-4 text-[14px] leading-relaxed border ${
        tone === "amber"
          ? "bg-amber-50 border-amber-200 text-amber-900"
          : "bg-[#3DBFAD]/8 border-[#3DBFAD]/30 text-[#0C2340]"
      }`}
    >
      {children}
    </div>
  );
}

// Persona flow card — happy path as numbered steps, branches as bullets.
interface PersonaSpec {
  name: string;
  tagline: string;
  colour: string;
  entry: string;
  steps: { label: string; detail?: string; highlight?: string }[];
  branches: string[];
  modules: string[];
  exit: string;
  canvas?: { route: string; label: string };
}

function PersonaCard({ p }: { p: PersonaSpec }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white mt-6 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.colour }} />
        <div className="flex-1">
          <div className="text-[15px] font-bold text-[#0C2340]">{p.name}</div>
          <div className="text-[12px] text-slate-500">{p.tagline}</div>
        </div>
        {p.canvas && (
          <Link
            href={p.canvas.route}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#3DBFAD] hover:underline flex-shrink-0"
          >
            <Workflow className="w-3.5 h-3.5" />
            {p.canvas.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
      <div className="px-5 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Happy path
          </div>
          <ol className="space-y-1.5">
            {p.steps.map((s, i) => (
              <li
                key={i}
                className={`flex gap-2 text-[13px] leading-snug ${
                  s.highlight
                    ? "bg-[#3DBFAD]/10 border-l-2 border-[#3DBFAD] rounded-r px-2 py-1.5 -ml-2"
                    : "text-slate-700"
                }`}
              >
                <span className="font-bold text-[#3DBFAD] w-5 flex-shrink-0 text-right">
                  {i + 1}.
                </span>
                <span>
                  <span className="font-semibold text-[#0C2340]">{s.label}</span>
                  {s.detail && <span className="text-slate-500"> — {s.detail}</span>}
                  {s.highlight && (
                    <span className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-[#0F6E56]">
                      <span className="inline-block text-[9px] uppercase tracking-wide bg-[#3DBFAD] text-white px-1.5 py-0.5 rounded">
                        MyHome Bundle
                      </span>
                      {s.highlight}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Key branches
            </div>
            <ul className="space-y-1.5">
              {p.branches.map((b, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-snug text-slate-700">
                  <span className="text-amber-500 flex-shrink-0">⑂</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Rails modules used
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p.modules.map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-semibold bg-slate-100 text-slate-600 rounded px-1.5 py-0.5"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[12px] text-slate-500">
            <span className="font-bold uppercase tracking-widest text-[10px] text-slate-400">
              Ends as →{" "}
            </span>
            {p.exit}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Persona data ────────────────────────────────────────────────────────────

const PERSONAS: PersonaSpec[] = [
  {
    name: "1 · Renter",
    tagline: "First persona to be detailed — full canvas live",
    colour: "#6366f1",
    entry: "Listing portal, rental agent or affinity partner",
    steps: [
      { label: "Search & shortlist", detail: "portal / rental agent" },
      { label: "Enquire & view" },
      { label: "KYC + credit check", detail: "BetterID, once" },
      { label: "Application form", detail: "pre-filled from BetterID profile" },
      { label: "Affordability assessment" },
      { label: "Landlord / agent approval" },
      { label: "Lease signed digitally", detail: "lands in Doc Vault" },
      { label: "Deposit + first month paid" },
      { label: "Move-in", detail: "Month 0 — removals, utilities offers" },
      { label: "Living", detail: "rent wallet, maintenance, insurance, services" },
      { label: "Renew or exit", detail: "deposit refund on exit" },
    ],
    branches: [
      "Fails affordability → adjust budget / add co-applicant → back to search",
      "Application declined → profile stays live, alerts on new rentals",
      "Lease end: renew (stays in hub) · rent again (back to search) · convert to Buyer",
    ],
    modules: ["KYC", "Search", "Applications", "Doc Vault", "Payments", "Removals", "Maintenance", "Insurance", "Services"],
    exit: "Repeat Renter, or converts to Buyer (the strategic win — verified ID + rent history = pre-approval head start).",
    canvas: { route: "/renter-flow", label: "View flow canvas" },
  },
  {
    name: "2 · Buyer (mortgage)",
    tagline: "The BetterBond-shaped journey — rails stay out of origination",
    colour: "#3DBFAD",
    entry: "Affinity partner (BetterBond / bank / agency) or MyHome direct",
    steps: [
      { label: "Search & viewings", detail: "dream phase begins — data pull running" },
      { label: "Pre-approval", detail: "partner-owned (BetterBond) — KYC + credit via BetterID seeded here (or by the agent)" },
      { label: "OTP signed", detail: "suspensive conditions set · deposit paid into trust" },
      { label: "Bond application", detail: "BetterBond shops the banks", highlight: "Pitched here — it changes the loan amount, so the bank must apply for the bigger figure upfront." },
      { label: "Bank valuation", detail: "of the property" },
      { label: "Bond granted & accepted", detail: "buyer accepts the letter of grant" },
      { label: "Attorneys instructed", detail: "transfer (seller's), bond (bank's), cancellation (seller's old bond) — in parallel" },
      { label: "Sign docs & pay costs", detail: "transfer + bond registration costs — cash, unless bundled into the bond" },
      { label: "Insurance", detail: "BetterSure — bank requires cover in place before lodgement" },
      { label: "Lodgement", detail: "transfer + bond + cancellation lodged together at the Deeds Office" },
      { label: "Registration", detail: "transfer & bond register simultaneously · monies flow · title deed copy → Doc Vault (bank holds the original)" },
      { label: "Removals & move-in", detail: "Month 0" },
    ],
    branches: [
      "Pre-approval declined → affordability coaching → remain Renter for now",
      "Bond not granted within OTP deadline → suspensive condition fails, OTP lapses, deposit refunded → back to search",
      "Bundle declined / bank not agreed → buyer pays transfer + bond costs in cash",
      "Early occupation before registration → occupational rent branch",
    ],
    modules: ["KYC", "Search", "Doc Vault", "Bundle (F&I)", "Insurance", "Removals", "Payments"],
    exit: "Owner — the buyer's arrow terminates in the Owner steady state at Month 0.",
    canvas: { route: "/buyer-mortgage-flow", label: "View flow canvas" },
  },
  {
    name: "3 · Cash Buyer",
    tagline: "Shorter timeline — no bond, no bank, proof of funds instead",
    colour: "#0EA5E9",
    entry: "Agent or portal — often investment-driven",
    steps: [
      { label: "Search" },
      { label: "Agent & OTP" },
      { label: "KYC", detail: "BetterID" },
      { label: "Proof of funds" },
      { label: "Insurance" },
      { label: "Transfer + cash deposit" },
      { label: "Registration", detail: "title deed → Doc Vault" },
      { label: "Removals & move-in", detail: "Month 0" },
    ],
    branches: [
      "Proof of funds queried → enhanced due diligence loop",
      "May skip insurance via own arrangements — module off for this user",
    ],
    modules: ["KYC", "Search", "Doc Vault", "Insurance", "Removals", "Payments"],
    exit: "Owner — converges with the mortgage Buyer at Month 0.",
  },
  {
    name: "4 · Seller",
    tagline: "Usually a Buyer somewhere else at the same time",
    colour: "#F59E0B",
    entry: "Mandate with an agent (or private sale)",
    steps: [
      { label: "Agent appointed" },
      { label: "KYC (mandate)", detail: "BetterID" },
      { label: "Transfer attorney appointed" },
      { label: "CoCs", detail: "compliance certificates — electrical, gas, etc." },
      { label: "Improvements", detail: "pre-sale fix-ups to maximise value" },
      { label: "Cleaning" },
      { label: "Removals" },
    ],
    branches: [
      "Concurrent Buyer journey on the next property — one BetterID, two flows",
      "Valuation (Loom) before mandate → price expectation setting",
    ],
    modules: ["KYC", "Valuations (Loom)", "Doc Vault", "Maintenance", "Services", "Removals"],
    exit: "Exits ownership of this property — typically re-enters as Buyer or Renter.",
  },
  {
    name: "5 · Agent",
    tagline: "Not a linear journey — a referral hub that seeds the rails",
    colour: "#8B5CF6",
    entry: "Brings the customer in — seeds the BetterID enrolment",
    steps: [
      { label: "KYC", detail: "agent verified on BetterID themselves" },
      { label: "Enrols buyer / seller", detail: "the BetterID seeding moment" },
      { label: "Refer to bond", detail: "e.g. BetterBond" },
      { label: "Refer to transfer attorney" },
      { label: "Refer to insurance" },
      { label: "Refer to removals" },
      { label: "Refer to maintenance" },
    ],
    branches: [
      "Each referral is a module — partners with their own offering keep theirs",
      "Referral economics per module are an open commercial question",
    ],
    modules: ["KYC", "Referrals", "Valuations (Loom)", "Suburb Reports"],
    exit: "Stays in the ecosystem — repeat referrer across many customer journeys.",
  },
  {
    name: "6 · Owner",
    tagline: "The steady state every buying journey flows into — data push territory",
    colour: "#0C2340",
    entry: "Converted Buyer / Cash Buyer at Month 0, or onboarded directly",
    steps: [
      { label: "Access to finance", detail: "equity, further bonds, refinance" },
      { label: "Insurance" },
      { label: "Doc Vault", detail: "title deed, bond, insurance, CoCs" },
      { label: "Home maintenance" },
      { label: "Valuations", detail: "powered by Loom data" },
      { label: "Suburb reports" },
      { label: "Utilities" },
      { label: "Services", detail: "fibre · mobile · solar · security · cleaning" },
    ],
    branches: [
      "Not sequential — an always-on hub; offers pushed off profile relevance",
      "Re-valuation triggers → finance offers (second bond, refinance)",
      "Becomes a Seller, or a Landlord (next persona)",
    ],
    modules: ["All — this is the full data-push offering set"],
    exit: "Long-term resident persona — or branches into Seller / Landlord.",
  },
  {
    name: "7 · Landlord",
    tagline: "Everything from Owner, plus the rental stack",
    colour: "#DC2626",
    entry: "An Owner who lets a property out",
    steps: [
      { label: "All Owner capabilities", detail: "inherited wholesale" },
      { label: "KYC for tenant applications", detail: "the Renter's KYC, other side" },
      { label: "Rental agent" },
      { label: "Property management" },
    ],
    branches: [
      "Self-managed vs agent-managed — maintenance requests route differently",
      "Landlord's tenant-KYC is the same module the Renter flows through — two personas, one rail",
    ],
    modules: ["Everything in Owner", "Tenant KYC", "Property Management", "Payments"],
    exit: "Stays Landlord / Owner — the rails' highest-LTV persona.",
  },
];

// ─── Partner matrix ──────────────────────────────────────────────────────────

const PARTNER_ROWS = [
  {
    partner: "BetterBond",
    own: "Bond origination, pre-approval (Salesforce — we integrate, never interfere)",
    off: "Bond / pre-approval modules",
    note: "Owns the customer's full lifecycle — their arrow runs the whole timeline, not just to Month 0",
  },
  {
    partner: "Solidarity",
    own: "Own insurance offering",
    off: "Insurance module (incl. BetterSure)",
    note: "Post-Month-0 economics TBD",
  },
  {
    partner: "RE/MAX",
    own: "Own loan products",
    off: "Loans module",
    note: "Post-Month-0 economics TBD",
  },
  {
    partner: "Capitec",
    own: "Banking & lending (scope TBD)",
    off: "TBD",
    note: "Module configuration to be worked out",
  },
  {
    partner: "No partner — MyHome direct",
    own: "—",
    off: "Nothing — every module on",
    note: "MyHome runs the full journey; user acquisition channel still open",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PersonaFlowsPRD() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppHeader label="Persona Flows · High-Level PRD" />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-14">
        {/* Title block */}
        <div className="text-[12px] font-bold uppercase tracking-widest text-[#3DBFAD] mb-2">
          Product Requirements · Draft v0.1
        </div>
        <h1 className="text-3xl font-extrabold text-[#0C2340] leading-tight mb-3">
          MyHome Rails — Persona Process Flows
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-slate-500 pb-6 border-b border-slate-200">
          <span>
            <span className="font-semibold text-slate-600">Date:</span> 5 June 2026
          </span>
          <span>
            <span className="font-semibold text-slate-600">Owner:</span> Wesley
          </span>
          <span>
            <span className="font-semibold text-slate-600">Status:</span> Working draft — for flow-mapping, not sign-off
          </span>
        </div>

        <Callout>
          <B>Why this doc exists.</B> One page per persona is the next unit of work: a
          beginning-to-end journey with every branch, drawn as boxes and arrows (below
          wireframe fidelity). This PRD is the shared source those canvases are drawn
          from. First canvas: <Link href="/renter-flow" className="font-bold text-[#3DBFAD] hover:underline">Renter →</Link>
        </Callout>

        {/* ── The model ── */}
        <H2>1 · The model — rails, not a product</H2>
        <P>
          MyHome is the <B>shell and rails</B> the home journey runs on — not a competitor
          to the businesses already running parts of that journey. The model pivots on{" "}
          <B>Month 0: move-in day</B>.
        </P>
        <Ul
          items={[
            <>
              <B>Before Month 0 — the Dream Phase · DATA PULL.</B> The transaction is owned
              by partners (e.g. BetterBond's pre-approval and bond process in Salesforce).
              MyHome integrates read-only and pulls deal data as it happens — zero friction
              added to partner processes. The customer's profile and Doc Vault build
              themselves as a by-product: OTP, pre-approval certificate, bond doc, insurance
              doc, title deed.
            </>,
            <>
              <B>After Month 0 — DATA PUSH.</B> The direction reverses. The rich, verified
              profile powers relevant offerings: suburb reports, valuations (Loom), credit
              checks, home services, utilities, home improvements.
            </>,
            <>
              <B>BetterID spans the whole timeline.</B> One verified identity, seeded early
              (often by the agent), reused by every partner and module. It is the security
              and compliance spine that makes the data portable at all.
            </>,
          ]}
        />

        <H3>White-label module toggles</H3>
        <P>
          Affinity partners run the rails with <B>modules switched on or off</B> to fit
          their own offerings — we never compete with what a partner already owns. Partner
          arrows on the timeline differ: some hand over at Month 0; others (BetterBond)
          keep the customer's entire lifecycle. Which partners retain post-Month-0
          economics is an open question per partner.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-left">
                <th className="py-2 pr-4 font-bold text-[#0C2340]">Partner</th>
                <th className="py-2 pr-4 font-bold text-[#0C2340]">They already own</th>
                <th className="py-2 pr-4 font-bold text-[#0C2340]">Modules off</th>
                <th className="py-2 font-bold text-[#0C2340]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {PARTNER_ROWS.map((r) => (
                <tr key={r.partner} className="border-b border-slate-100 align-top">
                  <td className="py-2.5 pr-4 font-semibold text-[#0C2340] whitespace-nowrap">
                    {r.partner}
                  </td>
                  <td className="py-2.5 pr-4 text-slate-600">{r.own}</td>
                  <td className="py-2.5 pr-4 text-slate-600">{r.off}</td>
                  <td className="py-2.5 text-slate-500">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H3>The MyHome Bundle — the F&I product, pre-Month-0</H3>
        <P>
          One offering does sit inside the data-pull zone, just before Month 0: the{" "}
          <B>MyHome Bundle — our F&I product</B> (they are one and the same thing).
          Offered at the moment the buyer's costs peak, it rolls extras{" "}
          <B>into the bond</B>:
        </P>
        <Ul
          items={[
            <><B>Bond + transfer attorney costs</B></>,
            <><B>Some home renovations</B> — settling-in spend (curtains, a couch, the Builders Warehouse run)</>,
            <><B>Maybe removals</B></>,
          ]}
        />
        <P>
          Insurance is <B>not</B> part of the Bundle — it stands alone in the flow, where{" "}
          <B>BetterSure</B> sells the cover the bank requires in place before lodgement.
        </P>
        <Callout tone="amber">
          <B>Dependency:</B> the Bundle only works with bank agreement. Meeting the banks is
          the named next step before this silo goes anywhere.
        </Callout>

        {/* ── Shared modules ── */}
        <H2>2 · The shared module library</H2>
        <P>
          Every persona flow below is assembled from the same toggleable modules. KYC
          (BetterID) appears boxed in <B>all seven</B> personas on the whiteboard — it is
          the one non-optional module.
        </P>
        <div className="flex flex-wrap gap-2 my-4">
          {[
            "KYC / BetterID ★",
            "Search",
            "Applications",
            "Doc Vault",
            "Payments / Wallet",
            "Loans & Finance",
            "Bundle (F&I)",
            "Insurance",
            "Removals",
            "Maintenance",
            "Services marketplace",
            "Utilities",
            "Valuations (Loom)",
            "Suburb Reports",
            "Credit Checks",
            "Referrals",
            "Property Management",
          ].map((m) => (
            <span
              key={m}
              className={`text-[12px] font-semibold rounded-md px-2.5 py-1 ${
                m.includes("★")
                  ? "bg-[#3E84FA]/10 text-[#000069] border border-[#3E84FA]/40"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {m.replace(" ★", "")}
              {m.includes("★") && <span className="ml-1 text-[10px]">· always on</span>}
            </span>
          ))}
        </div>

        {/* ── Personas ── */}
        <H2>3 · The seven personas</H2>
        <P>
          From the persona-mapping session. Two structural facts shape everything:{" "}
          <B>Buyer and Cash Buyer both terminate as Owner</B> at Month 0, and{" "}
          <B>Landlord inherits all of Owner</B> plus the rental stack. Owner is the hub
          persona the rails ultimately serve.
        </P>
        {PERSONAS.map((p) => (
          <PersonaCard key={p.name} p={p} />
        ))}

        {/* ── Open questions ── */}
        <H2>4 · Open questions & next steps</H2>
        <Ul
          items={[
            <>
              <B>Meet the banks</B> — agreement needed before the MyHome Bundle can exist.
              The single named next step.
            </>,
            <>
              <B>Partner economics post-Month-0</B> — which affinity partners keep the
              customer relationship beyond move-in, and which hand over? Known: BetterBond
              keeps the full lifecycle. Unknown: the rest.
            </>,
            <>
              <B>Direct acquisition</B> — when there's no affinity partner, how do users
              find MyHome? Channel undecided.
            </>,
            <>
              <B>Per-persona canvases</B> — Renter is done (
              <Link href="/renter-flow" className="font-bold text-[#3DBFAD] hover:underline">
                /renter-flow
              </Link>
              ); Buyer, Cash Buyer, Seller, Agent, Owner, Landlord to follow, each
              beginning-to-end with all branches.
            </>,
            <>
              <B>Module-toggle depth</B> — what "off" means per module (hidden entirely vs
              white-labelled partner equivalent slotted in).
            </>,
          ]}
        />

        <div className="mt-12 pt-6 border-t border-slate-200 text-[12px] text-slate-400">
          Source: persona-mapping & rails-timeline whiteboard session, 5 June 2026. This
          document feeds the boxes-and-arrows journey canvases, which feed the wireframe
          screens.
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
