/*
 * Exco — Five-beat decision narrative for the Better Home Group exco session.
 * Beats: 1) The Prize  2) The Lens  3) The Contenders  4) Head-to-Head  5) The Call
 */

import { useEffect, useRef, useState } from "react";
import {
  Check, X, Target, Scale, Users, Swords, Flag,
  FileSearch, BarChart3, Briefcase, Vault,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Animated counter ────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Beat header ─────────────────────────────────────────────────────────────
function BeatHeader({ num, kicker, title, icon }: { num: string; kicker: string; title: string; icon: React.ReactNode }) {
  return (
    <div className="max-w-4xl mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#3DBFAD]/10 text-[#3DBFAD] flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3DBFAD]">
          Beat {num} · {kicker}
        </span>
      </div>
      <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[#0C2340] leading-[1.05] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

// ─── Beat 1: The Prize ───────────────────────────────────────────────────────
function ThePrize() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const trillions = useCountUp(1.3, 2000, inView);

  const supports = [
    { stat: "~250,000", label: "bonds registered per year in SA", source: "Deeds Office" },
    { stat: "~4.5M", label: "monthly visitors on Private Property", source: "Similarweb" },
    { stat: "~35%", label: "of SA bond applications touch BetterBond", source: "Internal" },
  ];

  return (
    <section ref={ref} className="min-h-screen flex flex-col justify-center py-28 px-8 border-b border-slate-200">
      <div className="max-w-6xl mx-auto w-full">
        <BeatHeader num="01" kicker="The Prize" title="Why we're in this room." icon={<Target className="w-5 h-5" />} />

        <div className="mb-16">
          <div className="font-heading font-bold text-[#0C2340] leading-none tracking-tighter">
            <span className="text-[9rem] sm:text-[13rem]">R{trillions.toFixed(1)}</span>
            <span className="text-5xl sm:text-6xl text-[#3DBFAD] ml-2">trillion</span>
          </div>
          <p className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl leading-relaxed">
            of South African residential property transacts every year.
            BHG touches roughly <span className="text-[#0C2340] font-semibold">8%</span> of it today.
            <span className="text-[#0C2340] font-semibold"> The other 92% is the prize.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {supports.map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="font-heading font-bold text-4xl text-[#0C2340] mb-2">{s.stat}</div>
              <p className="text-sm text-slate-600 leading-snug mb-3">{s.label}</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">{s.source}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-slate-400 italic max-w-2xl">
          Placeholder figures — sharpen before exco. The point is the frame: we're under-indexed on a huge, fragmented market.
        </p>
      </div>
    </section>
  );
}

// ─── Beat 2: The Lens ────────────────────────────────────────────────────────
function TheLens() {
  const criteria = [
    {
      letter: "A",
      title: "Revenue per user",
      question: "How much does one activated user actually earn us — upfront and recurring?",
    },
    {
      letter: "B",
      title: "Lead gen into BHG",
      question: "Does this create qualified hand-offs into BetterBond, BetterSure, MortgageMax and the rest of the group?",
    },
    {
      letter: "C",
      title: "Speed to launch",
      question: "Can we stand this up in one or two quarters using what BHG already owns?",
    },
    {
      letter: "D",
      title: "Strategic moat",
      question: "What can we defend that a standalone startup or bank cannot replicate quickly?",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center py-28 px-8 border-b border-slate-200 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto w-full">
        <BeatHeader num="02" kicker="The Lens" title="How we'll decide." icon={<Scale className="w-5 h-5" />} />

        <p className="text-lg text-slate-600 max-w-3xl mb-12 leading-relaxed">
          Before we look at any option, let's agree on the four questions every contender has to answer.
          If we're aligned on the lens, the conclusion writes itself.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {criteria.map((c) => (
            <div key={c.letter} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#3DBFAD]/40 transition-colors">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#0C2340] text-white font-heading font-bold text-xl flex items-center justify-center flex-shrink-0">
                  {c.letter}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#0C2340] mb-2">{c.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{c.question}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#3DBFAD]/5 border border-[#3DBFAD]/20 rounded-2xl p-6 max-w-3xl">
          <p className="text-sm text-[#0C2340] leading-relaxed">
            <span className="font-bold">Ask the room:</span> is this the right lens? Anything we're missing?
            Get explicit nods before moving on.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Beat 3: The Contenders ──────────────────────────────────────────────────
interface Contender {
  name: string;
  icon: React.ReactNode;
  color: string;
  stage: string;
  audience: string;
  revenue: string;
  bhgEdge: string;
  risk: string;
}

const CONTENDERS: Contender[] = [
  {
    name: "Property Pass",
    icon: <FileSearch className="w-6 h-6" />,
    color: "#f59e0b",
    stage: "Renters → Buyers → Owners",
    audience: "Anyone thinking about property — widest possible top of funnel.",
    revenue: "Freemium. Upsell into F&I products, Snappy Home, BetterID verification.",
    bhgEdge: "Stacks data from BetterID, PropertyEngine, BetterBond pre-qualification in one profile — nobody else has all three.",
    risk: "Broad scope makes it hard to launch. Needs a sharp v1 or it drifts.",
  },
  {
    name: "Suburb Report",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#ef4444",
    stage: "Owners (curious)",
    audience: "Existing homeowners checking on their property value — largest addressable pool in SA.",
    revenue: "Email capture → F&I re-engagement. Minimal direct revenue.",
    bhgEdge: "Lightstone + Private Property listing data. Cheap to run, high traffic potential.",
    risk: "Hard to monetise directly. Commodity — Lightstone and banks already do versions of this.",
  },
  {
    name: "F&I (Choose My Deal)",
    icon: <Briefcase className="w-6 h-6" />,
    color: "#0C2340",
    stage: "Buyers (pre-transfer)",
    audience: "Bond applicants — narrow but extremely high intent.",
    revenue: "R5–15k per bond origination + attached product commissions (insurance, warranty, services).",
    bhgEdge: "BetterBond already sees ~35% of SA bond volume. BetterSure + Snappy Home give us the attach stack nobody can match.",
    risk: "Regulated. Requires orchestration across 4+ BHG entities.",
  },
  {
    name: "Doc Vault",
    icon: <Vault className="w-6 h-6" />,
    color: "#10b981",
    stage: "Owners (passive)",
    audience: "Anyone who owns a home and hates paperwork.",
    revenue: "Free. Hook into the ecosystem — not a direct revenue play.",
    bhgEdge: "Re-uses documents already flowing through BetterBond, conveyancing and BetterSure.",
    risk: "Pure cost centre unless bundled. Hard to justify on its own.",
  },
];

function TheContenders() {
  return (
    <section className="py-28 px-8 border-b border-slate-200">
      <div className="max-w-6xl mx-auto w-full">
        <BeatHeader num="03" kicker="The Contenders" title="Four ways in." icon={<Users className="w-5 h-5" />} />

        <p className="text-lg text-slate-600 max-w-3xl mb-14 leading-relaxed">
          Same template for each one. Who it serves, where in the journey, how it makes money,
          what BHG already owns that makes it unfair, and where it could fall over.
        </p>

        <div className="space-y-6">
          {CONTENDERS.map((c, i) => (
            <div key={c.name} className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-5 p-8 border-b border-slate-100" style={{ backgroundColor: `${c.color}08` }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Contender {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-heading font-bold text-2xl text-[#0C2340]">{c.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 p-8">
                <Field label="Stage" value={c.stage} />
                <Field label="Audience" value={c.audience} />
                <Field label="Revenue" value={c.revenue} />
                <Field label="BHG edge" value={c.bhgEdge} />
                <Field label="Risk" value={c.risk} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">{label}</div>
      <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
    </div>
  );
}

// ─── Beat 4: Head-to-Head ────────────────────────────────────────────────────
const SCORES: Record<string, Record<string, number>> = {
  "Property Pass":       { "Revenue per user": 2, "Lead gen": 5, "Speed to launch": 2, "Strategic moat": 4 },
  "Suburb Report":       { "Revenue per user": 1, "Lead gen": 4, "Speed to launch": 5, "Strategic moat": 2 },
  "F&I (Choose My Deal)":{ "Revenue per user": 5, "Lead gen": 3, "Speed to launch": 3, "Strategic moat": 5 },
  "Doc Vault":           { "Revenue per user": 1, "Lead gen": 2, "Speed to launch": 4, "Strategic moat": 2 },
};

const CRITERIA = ["Revenue per user", "Lead gen", "Speed to launch", "Strategic moat"];

function HeadToHead() {
  const totals = Object.entries(SCORES).map(([name, scores]) => ({
    name,
    total: Object.values(scores).reduce((a, b) => a + b, 0),
    color: CONTENDERS.find((c) => c.name === name)?.color ?? "#64748b",
  })).sort((a, b) => b.total - a.total);

  return (
    <section className="py-28 px-8 border-b border-slate-200 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto w-full">
        <BeatHeader num="04" kicker="Head-to-Head" title="Side by side, against the lens." icon={<Swords className="w-5 h-5" />} />

        <p className="text-lg text-slate-600 max-w-3xl mb-14 leading-relaxed">
          Now we score each contender against the four criteria we agreed on.
          No surprises — just the same lens applied four times.
        </p>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden mb-10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-5 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">Contender</th>
                {CRITERIA.map((c) => (
                  <th key={c} className="text-center p-5 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">{c}</th>
                ))}
                <th className="text-center p-5 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {totals.map((row, idx) => (
                <tr key={row.name} className={`border-b border-slate-100 last:border-b-0 ${idx === 0 ? "bg-[#3DBFAD]/5" : ""}`}>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                      <span className="font-heading font-bold text-[#0C2340]">{row.name}</span>
                      {idx === 0 && <span className="text-[9px] uppercase tracking-widest text-[#3DBFAD] font-bold bg-[#3DBFAD]/10 px-2 py-0.5 rounded-full">Leader</span>}
                    </div>
                  </td>
                  {CRITERIA.map((c) => {
                    const score = SCORES[row.name][c];
                    return (
                      <td key={c} className="text-center p-5">
                        <div className="inline-flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={`w-2 h-6 rounded-sm ${n <= score ? "" : "bg-slate-100"}`}
                              style={n <= score ? { backgroundColor: row.color } : undefined}
                            />
                          ))}
                        </div>
                      </td>
                    );
                  })}
                  <td className="text-center p-5">
                    <span className="font-heading font-bold text-2xl text-[#0C2340]">{row.total}</span>
                    <span className="text-slate-400 text-sm">/20</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 italic">
          Scores are a working hypothesis. Expect to adjust in the room — that's the point.
        </p>
      </div>
    </section>
  );
}

// ─── Beat 5: The Call ────────────────────────────────────────────────────────
function TheCall() {
  const doThis = [
    "Launch F&I (Choose My Deal) as the primary entry point in Q1.",
    "Run Suburb Report as a low-cost top-of-funnel feeder into F&I from day one.",
    "Defer Property Pass and Doc Vault to Q3 — revisit after F&I is live.",
  ];
  const notThis = [
    "Building Property Pass first. Too broad, too slow, no revenue for 6+ months.",
    "Launching Doc Vault standalone. It's a hook, not a product.",
    "Chasing all four in parallel. We don't have the bandwidth and exco knows it.",
  ];
  const success = [
    "1,000 activated Choose My Deal sessions in first 90 days.",
    "15% conversion from Suburb Report email → Choose My Deal session.",
    "R3M+ attributable bond revenue through the funnel by end of Q1.",
  ];

  return (
    <section className="py-28 px-8">
      <div className="max-w-6xl mx-auto w-full">
        <BeatHeader num="05" kicker="The Call" title="What we're recommending." icon={<Flag className="w-5 h-5" />} />

        <div className="bg-[#0C2340] text-white rounded-3xl p-12 mb-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#3DBFAD] font-bold mb-4">Recommendation</div>
          <h3 className="font-heading font-bold text-4xl leading-tight mb-5">
            Start with F&I.<br />
            Feed it with Suburb Report.
          </h3>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Highest revenue per user, strongest moat, uses assets BHG already owns.
            Suburb Report becomes the cheap, high-volume funnel that keeps it fed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white border border-[#3DBFAD]/30 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-5 text-[#3DBFAD]">
              <Check className="w-5 h-5" />
              <span className="text-[11px] uppercase tracking-widest font-bold">We will</span>
            </div>
            <ul className="space-y-4">
              {doThis.map((d) => (
                <li key={d} className="text-slate-700 leading-relaxed flex gap-3">
                  <span className="text-[#3DBFAD] font-bold">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-5 text-slate-500">
              <X className="w-5 h-5" />
              <span className="text-[11px] uppercase tracking-widest font-bold">We will not</span>
            </div>
            <ul className="space-y-4">
              {notThis.map((d) => (
                <li key={d} className="text-slate-600 leading-relaxed flex gap-3">
                  <span className="text-slate-400">·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#3DBFAD]/5 border border-[#3DBFAD]/20 rounded-2xl p-8 mb-10">
          <div className="text-[11px] uppercase tracking-widest text-[#3DBFAD] font-bold mb-4">90-day success looks like</div>
          <ul className="space-y-3">
            {success.map((s) => (
              <li key={s} className="text-[#0C2340] leading-relaxed flex gap-3">
                <span className="text-[#3DBFAD]">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-10">
          <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">The ask</div>
          <p className="font-heading font-bold text-2xl text-[#0C2340] leading-tight max-w-3xl">
            Do we have exco approval to proceed with F&I as the primary entry point,
            with Suburb Report as its feeder, starting Q1?
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Exco() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Exco · Entry Point Decision" />

      <ThePrize />
      <TheLens />
      <TheContenders />
      <HeadToHead />
      <TheCall />

      <AppFooter label="Draft for exco review" />
    </div>
  );
}
