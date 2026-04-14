/*
 * Exco — Decision deck for the Better Home Group exco session.
 * Structure: Hero → Action Points → Feedback → Contenders → Head-to-Head → The Call
 */

import { Link } from "wouter";
import {
  Users, FileSearch, BarChart3, Briefcase,
  ClipboardList, MessageSquare, ArrowRight, Globe,
  Wrench,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Design tokens ──────────────────────────────────────────────────────────

const SECTION = "py-28 sm:py-36 px-8 sm:px-12";
const CARD = "bg-white rounded-2xl shadow-sm";
const INNER = "max-w-7xl mx-auto w-full";

// ─── Section header ─────────────────────────────────────────────────────────

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

// ─── Sub-section label ──────────────────────────────────────────────────────

function SubLabel({ icon, label, count }: { icon: React.ReactNode; label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[#3DBFAD]">{icon}</span>
      <span className="text-sm uppercase tracking-widest font-bold text-[#0C2340]">{label}</span>
      {count !== undefined && (
        <span className="w-7 h-7 rounded-full bg-[#0C2340] text-white text-xs font-bold flex items-center justify-center">{count}</span>
      )}
    </div>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#0C2340] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3DBFAD]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className={`${INNER} px-8 sm:px-12 py-24 sm:py-32 relative`}>
        <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-8">
          <span className="w-8 h-px bg-[#3DBFAD]" />
          Decision Deck
        </div>
        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight mb-6">
          MyHome<br />
          <span className="text-[#3DBFAD]">Exco Update · 17 April</span>
        </h1>
        <p className="text-white/60 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Action points from the previous session, what we found, the entry-point options on the table, and a recommendation.
        </p>
      </div>
    </section>
  );
}

// ─── Section 1: Action Points ───────────────────────────────────────────────

const MEETINGS = [
  "Jacques from Loom",
  "Di Williams from BetterBond",
  "Stephan Potgieter (BLOS) — bank inclusions in bonds + Avo contact",
  "Nathan from BetterID — demo for Tersia",
  "Mary Lindemann (TBC)",
  "Marc du Plessis (Head of LookSee — Standard Bank)",
  "Denise — F&I process at We Buy Cars",
  "Focus group with Di and her team from BetterBond Direct",
];

const RESEARCH_ITEMS = [
  "Global competitor research",
  "SA stats — renters vs owners, transaction volumes, costs",
  "SA personas",
];

const PROTOTYPE_ITEMS = [
  "Interactive Suburb Report",
  "F&I journey mapping into Choose Your Deal",
  "BetterBond Direct flow",
];

function ActionPointList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4 text-base text-slate-700 leading-relaxed">
          <span className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: color }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ActionPoints() {
  return (
    <section className={`${SECTION} bg-slate-50`}>
      <div className={INNER}>
        <SectionHeader
          num="01"
          kicker="Recap"
          title="Action points from previous meeting."
          subtitle="What we committed to last session — meetings to take, research to complete, and prototypes to build."
          icon={<ClipboardList className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${CARD} p-8 border-t-4 border-t-[#3DBFAD]`}>
            <SubLabel icon={<Users className="w-5 h-5" />} label="Meetings" count={MEETINGS.length} />
            <ActionPointList items={MEETINGS} color="#3DBFAD" />
          </div>

          <div className={`${CARD} p-8 border-t-4 border-t-[#0C2340]`}>
            <SubLabel icon={<BarChart3 className="w-5 h-5" />} label="Research" count={RESEARCH_ITEMS.length} />
            <ActionPointList items={RESEARCH_ITEMS} color="#0C2340" />
          </div>

          <div className={`${CARD} p-8 border-t-4 border-t-amber-500`}>
            <SubLabel icon={<Wrench className="w-5 h-5" />} label="Actions" count={PROTOTYPE_ITEMS.length} />
            <ActionPointList items={PROTOTYPE_ITEMS} color="#f59e0b" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Feedback ────────────────────────────────────────────────────

interface MeetingFeedback {
  who: string;
  feedback: string;
  linkTo?: string;
}

const MEETING_FEEDBACK: MeetingFeedback[] = [
  { who: "Jacques from Loom", feedback: "Intro meeting on Loom as property-data partner. BetterBond F&I integration agreed as first entry point, interactive suburb report as second hook. Loom brings AI condition scoring, valuation forecasting, and 24k+ users. MyHome to be a separate commercial business with Loom as key data partner. BetterID confirmed as authentication foundation.", linkTo: "/loom-meeting" },
  { who: "Di Williams from BetterBond", feedback: "" },
  { who: "Stephan Potgieter (BLOS)", feedback: "" },
  { who: "Nathan from BetterID", feedback: "" },
  { who: "Mary Lindemann", feedback: "" },
  { who: "Marc du Plessis (LookSee — Standard Bank)", feedback: "Standard Bank uses Whizzoh as their home services partner. Solar education has been a major part of their GTM. Key data gap identified: no one is tracking how solar installations affect property value in SA." },
  { who: "Denise — We Buy Cars", feedback: "" },
  { who: "Focus group — Di and team (BetterBond Direct)", feedback: "" },
];

interface FeedbackCardData {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  accent: string;
  linkTo?: string;
  linkLabel?: string;
}

const RESEARCH_FEEDBACK: FeedbackCardData[] = [
  {
    id: "landscape",
    title: "Global Competitor Landscape",
    icon: <Globe className="w-6 h-6" />,
    accent: "#3DBFAD",
    summary: "Mapped 19 companies across 5 categories — marketplaces & portals, iBuying, super-apps, insurance and home services. Key pattern: portals dominate search but stop short of the transaction. Super-apps (Loom, HomeLight) are the closest to what MyHome could become. iBuying has largely failed — thin margins on physical assets don't scale. The gap is clear: nobody owns the full journey from search through post-purchase services.",
    linkTo: "/landscape",
    linkLabel: "View full landscape",
  },
  {
    id: "sa-stats",
    title: "SA Market Stats",
    icon: <BarChart3 className="w-6 h-6" />,
    accent: "#0C2340",
    summary: "53% of South African households are owner-occupied vs 23% renting (Stats SA, 2022). ~250,000 bonds registered per year through the Deeds Office. ~35% of SA bond applications touch BetterBond. The average property transaction involves 6+ service providers with no single coordinating layer.",
    linkTo: "/",
    linkLabel: "View on BHG Journey",
  },
  {
    id: "personas",
    title: "SA Personas",
    icon: <Users className="w-6 h-6" />,
    accent: "#8b5cf6",
    summary: "Three core personas mapped: first-time buyers navigating complexity with limited knowledge, move-up buyers upgrading with equity and experience, and property investors optimising for yield. Each has distinct pain points, channels and product needs — but all share one gap: no single platform coordinates their journey.",
    linkTo: "/",
    linkLabel: "View personas",
  },
];

const PROTOTYPE_FEEDBACK: FeedbackCardData[] = [
  {
    id: "report",
    title: "Interactive Suburb Report",
    icon: <FileSearch className="w-6 h-6" />,
    accent: "#ef4444",
    summary: "Built a homeowner-facing property report prototype — value trend, suburb stats, surrounding sales, active listings and premium locked sections. Designed as a top-of-funnel lead capture tool that creates a reason for homeowners to engage before they're actively transacting.",
    linkTo: "/report",
    linkLabel: "View report prototype",
  },
  {
    id: "fi-deal",
    title: "F&I Journey → Choose My Deal",
    icon: <Briefcase className="w-6 h-6" />,
    accent: "#0C2340",
    summary: "Mapped the motor F&I process onto its residential property equivalent and built a buyer-facing deal configurator prototype. Bank offer comparison, loan term selection, and F&I add-ons (insurance, warranty, home services) with a live deal summary. Also mapped the We Buy Cars buyer flow into a 5-step MyHome handover.",
    linkTo: "/deal",
    linkLabel: "View deal prototype",
  },
  {
    id: "bb-direct-flow",
    title: "BetterBond Direct Flow",
    icon: <BarChart3 className="w-6 h-6" />,
    accent: "#3DBFAD",
    summary: "Mapped the BB Direct lead funnel end-to-end — from 8 000 monthly inbound leads down to 158 granted bonds (2.0% conversion). Credit decline is the biggest leak at 50%, and only 5% of credit-passed leads submit an application. Surfaces two distinct entry points for MyHome: a credit-repair play on the drop-offs, and an application-lift play on the warm leads.",
    linkTo: "/bb-direct-grants",
    linkLabel: "View BB Direct flow",
  },
];

function FeedbackCard({ card }: { card: FeedbackCardData }) {
  return (
    <div className={`${CARD} p-8 sm:p-10 flex items-start gap-6 border-l-4`} style={{ borderLeftColor: card.accent }}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
        style={{ backgroundColor: card.accent }}
      >
        {card.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-xl text-[#0C2340] mb-3">{card.title}</h4>
        <p className="text-base text-slate-600 leading-[1.8]">{card.summary}</p>
        {card.linkTo && (
          <Link href={card.linkTo}>
            <span className="inline-flex items-center gap-2 text-base font-bold text-[#3DBFAD] hover:text-[#0C2340] transition-colors cursor-pointer mt-5 group">
              {card.linkLabel} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

function Feedback() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <SectionHeader
          num="02"
          kicker="Feedback"
          title="What we found."
          subtitle="Outcomes from the meetings, research findings, and where the prototypes landed."
          icon={<MessageSquare className="w-5 h-5" />}
        />

        {/* Meetings table */}
        <div className="mb-20">
          <SubLabel icon={<Users className="w-5 h-5" />} label="Meetings" count={MEETING_FEEDBACK.length} />
          <div className={`${CARD} overflow-hidden border border-slate-200`}>
            <table className="w-full">
              <thead>
                <tr className="bg-[#0C2340]">
                  <th className="text-left px-8 py-5 text-sm uppercase tracking-widest text-white/70 font-semibold w-[300px]">Who</th>
                  <th className="text-left px-8 py-5 text-sm uppercase tracking-widest text-white/70 font-semibold">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {MEETING_FEEDBACK.map((m, i) => (
                  <tr key={m.who} className={`border-b border-slate-100 last:border-b-0 ${i % 2 === 1 ? "bg-slate-50/60" : ""}`}>
                    <td className="px-8 py-6 align-top">
                      <span className="font-heading font-bold text-base text-[#0C2340]">{m.who}</span>
                    </td>
                    <td className="px-8 py-6 align-top">
                      {m.feedback ? (
                        <div>
                          <span className="text-base text-slate-600 leading-[1.8]">{m.feedback}</span>
                          {m.linkTo && (
                            <Link href={m.linkTo}>
                              <span className="inline-flex items-center gap-2 text-base font-bold text-[#3DBFAD] hover:text-[#0C2340] transition-colors cursor-pointer mt-3 group">
                                View full notes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </Link>
                          )}
                        </div>
                      ) : (
                        <span className="text-base text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Research feedback */}
        <div className="mb-20">
          <SubLabel icon={<BarChart3 className="w-5 h-5" />} label="Research" count={RESEARCH_FEEDBACK.length} />
          <div className="space-y-5">
            {RESEARCH_FEEDBACK.map((card) => (
              <FeedbackCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Prototype feedback */}
        <div>
          <SubLabel icon={<Wrench className="w-5 h-5" />} label="Actions" count={PROTOTYPE_FEEDBACK.length} />
          <div className="space-y-5">
            {PROTOTYPE_FEEDBACK.map((card) => (
              <FeedbackCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Exco() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Exco · Decision Deck" />

      <Hero />
      <ActionPoints />
      <Feedback />

      <AppFooter label="Draft for exco review" />
    </div>
  );
}
