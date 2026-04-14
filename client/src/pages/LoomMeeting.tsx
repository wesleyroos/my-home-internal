/*
 * Loom Meeting Summary — MyHome // Loom Chat (01 April 2026)
 * Detailed notes from introductory meeting with Jacques (CEO, Loom).
 */

import {
  Users, Database, ShieldCheck, Lightbulb, AlertTriangle,
  Building2, Brain, Wallet, Home,
  BarChart3, Key, Camera,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Design tokens (matched to Exco page) ───────────────────────────────────

const SECTION = "py-28 sm:py-36 px-8 sm:px-12";
const CARD = "bg-white rounded-2xl shadow-sm";
const INNER = "max-w-7xl mx-auto w-full";

// ─── Types ──────────────────────────────────────────────────────────────────

interface KeyPoint {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const ATTENDEES = [
  { name: "Jacques", role: "CEO, Loom" },
  { name: "Wesley & Tersia", role: "MyHome Project Team" },
];

const STRATEGIC_DECISIONS: KeyPoint[] = [
  {
    icon: <Key className="w-6 h-6" />,
    title: "BetterBond as first entry point",
    detail: "Integration with BetterBond (mortgage origination / F&I-style journey) is the \"hottest\" initial opportunity. High-intent users, internal group business, and already uses BetterID for authentication.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Interactive suburb report as second hook",
    detail: "A consumer-facing interactive suburb/property report as the other primary hook. Authentication can be more relaxed for suburb-level data, but owner-specific reports require strict BetterID verification.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User-centric, not property-centric",
    detail: "MyHome should prioritise user-centric design — layer services on the user (digital wallet / single view of homeowner) rather than anchoring only on property data. Customer-first approach.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Separate commercial business",
    detail: "MyHome should be a separate commercial business (not merely an internal platform) with clear commercial models for partners. Partnerships must be commercial and reciprocal.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Loom as key data partner",
    detail: "Loom will be treated as a key partner for property data, analytics and integration points. Loom's property data is going to be critical for the MyHome proposition.",
  },
];

const LOOM_CAPABILITIES: KeyPoint[] = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Property data platform",
    detail: "Elastic search anchored to properties via the 21-digit surveyor code used by banks/Deeds. Correct owner contact and legal address data — Standard Bank saw ~35% of bond applications rejected due to incorrect legal addresses, which Loom corrects.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI property condition scoring",
    detail: "Partnership with a US explainable-AI company to score property condition (1–6) from images — detects damp, roof leaks, gutter damage, construction materials, finish quality. Can reduce need/cost of physical valuations. One bank estimates 35–40% reduction in non-physical valuation costs.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Valuation forecasting",
    detail: "Backtested pilot predicting future property values by factoring in developments, population, traffic and other area-level drivers — not simple linear extrapolation.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Wallet & credit architecture",
    detail: "Each agent and office has a wallet/credit model (LoomBox credits) to buy value-added services: trust checks, DUP searches, contact details, reports. Subscription model plus top-ups.",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Data ingestion pipeline",
    detail: "Native mobile app for agents (camera + metadata), listing images from portals, third-party inspectors/photography (Capture HD), and property engineers. APIs and webhook architecture to integrate with CRMs, portals, BetterBond and other partners.",
  },
];

const MYHOME_CONCEPTS: KeyPoint[] = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Digital wallet — single view of the home",
    detail: "Authenticated documents and artefacts: title deed, bond documents, insurance policies, valuations, inspection records, renovation history, permits, warranties, contractor/receipt history.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "BetterID-gated onboarding",
    detail: "Use BetterID to authenticate homeowner and link property to owner. Enforce authentication before providing owner-specific property reports and sensitive data.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Engagement & monetisation hooks",
    detail: "Insurance review and quote comparisons, renovation planning and contractor marketplace, re-valuation and equity management, maintenance planning and reminder flows.",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Full lifecycle support",
    detail: "Renting, buying, selling, refinancing — aim to be the \"home journey\" manager in the owner's hand. Re-valuation triggers application for a second/third bond via BetterBond.",
  },
];

const RISKS: string[] = [
  "Data sourcing at scale (photos, inspection-grade imagery) is the biggest challenge for remote AI valuation and condition scoring.",
  "Ownership and governance: Better Home / BetterBond / group shareholders (including competitors) require commercial clarity and transparency.",
  "Scope and complexity: MyHome is an \"elephant\" — must be approached as many small, testable bites with commercial incentives for partners.",
  "Privacy and consent: owner-specific property reports require strict authentication (BetterID) and consent management.",
];

const STATS = [
  { value: "24,470", label: "Platform users", sub: "from 215 at launch" },
  { value: "~30%", label: "Market share", sub: "captured over ~2.5 years" },
  { value: "Sept 2023", label: "Loom launched", sub: "~12 months to build" },
];

// ─── Components ─────────────────────────────────────────────────────────────

function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className={`${CARD} p-8 border-t-4 border-t-[#3DBFAD]`}>
      <div className="font-heading font-bold text-3xl sm:text-4xl text-[#0C2340] mb-2">{value}</div>
      <div className="text-base font-semibold text-[#0C2340] mb-1">{label}</div>
      <div className="text-sm text-slate-400">{sub}</div>
    </div>
  );
}

function KeyPointCard({ point, accent }: { point: KeyPoint; accent: string }) {
  return (
    <div className={`${CARD} p-8 sm:p-10 flex items-start gap-6 border-l-4`} style={{ borderLeftColor: accent }}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
        style={{ backgroundColor: accent }}
      >
        {point.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-xl text-[#0C2340] mb-3">{point.title}</h4>
        <p className="text-base text-slate-600 leading-[1.8]">{point.detail}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  num, kicker, title, subtitle, icon,
}: {
  num: string;
  kicker: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
          {icon}
        </div>
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
          {num} · {kicker}
        </span>
      </div>
      <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg sm:text-xl text-slate-500 max-w-4xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function LoomMeeting() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Loom · Meeting Summary" />

      {/* Hero */}
      <section className="bg-[#0C2340] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3DBFAD]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

        <div className={`${INNER} px-8 sm:px-12 py-24 sm:py-32 relative`}>
          <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-8 h-px bg-[#3DBFAD]" />
            Meeting Summary
          </div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight mb-6">
            MyHome // Loom
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            Introductory meeting to explore integration and collaboration with Loom (property-data platform) for the MyHome consumer proposition.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/40 text-base">
            <span>01 April 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            {ATTENDEES.map((a) => (
              <span key={a.name}><span className="text-white/70 font-medium">{a.name}</span> — {a.role}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Loom stats */}
      <section className={`${SECTION} bg-slate-50`}>
        <div className={INNER}>
          <SectionHeader
            num="01"
            kicker="Loom at a glance"
            title="Platform traction."
            subtitle="Key numbers from Jacques' presentation on Loom's current position."
            icon={<BarChart3 className="w-5 h-5" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Strategic decisions */}
      <section className={`${SECTION} bg-white`}>
        <div className={INNER}>
          <SectionHeader
            num="02"
            kicker="Strategic direction"
            title="Key positions agreed."
            subtitle="The strategic decisions and directions that emerged from the discussion."
            icon={<Lightbulb className="w-5 h-5" />}
          />
          <div className="space-y-5">
            {STRATEGIC_DECISIONS.map((p) => (
              <KeyPointCard key={p.title} point={p} accent="#0C2340" />
            ))}
          </div>
        </div>
      </section>

      {/* Loom capabilities */}
      <section className={`${SECTION} bg-slate-50`}>
        <div className={INNER}>
          <SectionHeader
            num="03"
            kicker="Loom capabilities"
            title="What Loom brings."
            subtitle="Product capabilities and technical features presented by Jacques."
            icon={<Database className="w-5 h-5" />}
          />
          <div className="space-y-5">
            {LOOM_CAPABILITIES.map((p) => (
              <KeyPointCard key={p.title} point={p} accent="#3DBFAD" />
            ))}
          </div>
        </div>
      </section>

      {/* MyHome concepts */}
      <section className={`${SECTION} bg-white`}>
        <div className={INNER}>
          <SectionHeader
            num="04"
            kicker="MyHome concepts"
            title="Ideas on the table."
            subtitle="Consumer features and value chain ideas discussed for the MyHome proposition."
            icon={<Home className="w-5 h-5" />}
          />
          <div className="space-y-5">
            {MYHOME_CONCEPTS.map((p) => (
              <KeyPointCard key={p.title} point={p} accent="#f59e0b" />
            ))}
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className={`${SECTION} bg-slate-50`}>
        <div className={INNER}>
          <SectionHeader
            num="05"
            kicker="Risks & open questions"
            title="What could go wrong."
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {RISKS.map((r, i) => (
              <div key={i} className={`${CARD} p-8 border-l-4 border-l-red-400`}>
                <p className="text-base text-slate-700 leading-[1.8]">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AppFooter label="Not for distribution — internal meeting notes" />
    </div>
  );
}
