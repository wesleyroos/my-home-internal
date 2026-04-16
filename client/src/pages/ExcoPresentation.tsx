/*
 * Exco Presentation — 17 April
 * Full-screen slide deck for the Better Home Group Exco update.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Users, BarChart3, Wrench, Globe, Briefcase, FileSearch,
} from "lucide-react";

const LINER_PREFIX = "Capturing the full home lifecycle —";
const LINER_SUFFIXES = [
  "and every BHG moment in between.",
  "one always-on relationship across every BHG moment.",
  "turning BHG moments into a permanent relationship.",
  "so BHG stays in the relationship, not just the transaction.",
  "the always-on platform that keeps every South African close to BetterHome.",
];

const MEETINGS = [
  "Jacques Rossouw (Loom)",
  "Di Williams (BetterBond Direct)",
  "Stephan Potgieter (BLOS)",
  "Nathan Kettles (BetterID)",
  "Mary Lindemann (BetterBond)",
  "Marc du Plessis (LookSee — Standard Bank)",
  "Denise Stander (We Buy Cars)",
  "Focus group — BB Direct",
];

const RESEARCH_ITEMS = [
  "Global landscape research",
  "Competitor research",
  "SA market stats",
  "SA personas",
];

const PROTOTYPE_ITEMS = [
  "Interactive Suburb Report",
  "F&I journey mapping into Choose Your Deal",
  "BetterBond Direct flow",
];

interface MeetingFeedback {
  who: string;
  feedback: string;
  linkTo?: string;
}

const MEETING_FEEDBACK: MeetingFeedback[] = [
  { who: "Jacques Rossouw (Loom)", feedback: "Introduced the MyHome concept and scoped possible data access opportunities.", linkTo: "/loom-meeting" },
  { who: "Di Williams (BetterBond Direct)", feedback: "Unpacked BetterBond Direct's moving parts and started defining the sales funnel." },
  { who: "Stephan Potgieter (BLOS)", feedback: "Explored bank bundling into bonds and started unpacking NCA compliance." },
  { who: "Nathan Kettles (BetterID)", feedback: "BetterID demo — grasped its strategic role as the identity foundation." },
  { who: "Mary Lindemann (BetterBond)", feedback: "Target R1.5m+ bond grants, don't disrupt BetterBond's grant process, and treat the attorney as a key fund distributor." },
  { who: "Marc du Plessis (LookSee)", feedback: "Marketplace play failed on supplier challenges — narrowing to a single vertical (solar) is what's finally working.", linkTo: "/standard-bank" },
  { who: "Denise Stander (We Buy Cars)", feedback: "Walked us through We Buy Cars' F&I journey — mapped onto the home context." },
  { who: "Focus group — BB Direct", feedback: "Surfaced possible entry points and bottlenecks within BetterBond Direct's channel.", linkTo: "/bb-direct-grants" },
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
    summary: "Mapped 19 companies across 5 categories — marketplaces & portals, iBuying, super-apps, insurance and home services. Portals dominate search but stop short of the transaction. Super-apps (Loom, HomeLight) are the closest to what MyHome could become. The gap: nobody owns the full journey from search through post-purchase services.",
    linkTo: "/landscape",
    linkLabel: "View full landscape",
  },
  {
    id: "sa-stats",
    title: "SA Market Stats",
    icon: <BarChart3 className="w-6 h-6" />,
    accent: "#0C2340",
    summary: "53% of SA households are owner-occupied vs 23% renting (Stats SA, 2022). ~250,000 bonds registered per year through the Deeds Office. ~35% of SA bond applications touch BetterBond. The average property transaction involves 6+ service providers with no single coordinating layer.",
    linkTo: "/market-stats",
    linkLabel: "View all market stats",
  },
  {
    id: "personas",
    title: "SA Personas",
    icon: <Users className="w-6 h-6" />,
    accent: "#8b5cf6",
    summary: "Three core personas: first-time buyers navigating complexity with limited knowledge, move-up buyers upgrading with equity and experience, and property investors optimising for yield. All share one gap — no single platform coordinates their journey.",
    linkTo: "/personas",
    linkLabel: "View all personas",
  },
];

const PROTOTYPE_FEEDBACK: FeedbackCardData[] = [
  {
    id: "report",
    title: "Interactive Suburb Report",
    icon: <FileSearch className="w-6 h-6" />,
    accent: "#ef4444",
    summary: "A homeowner-facing property report — value trend, suburb stats, surrounding sales, active listings, and premium locked sections. Designed as a top-of-funnel lead capture tool that creates a reason for homeowners to engage before they're actively transacting.",
    linkTo: "/report",
    linkLabel: "View report prototype",
  },
  {
    id: "bb-direct-flow",
    title: "BetterBond Direct Flow",
    icon: <BarChart3 className="w-6 h-6" />,
    accent: "#3DBFAD",
    summary: "BB Direct lead funnel mapped end-to-end — from 8 000 monthly inbound leads down to 158 granted bonds. Credit decline is the biggest leak at 50%, and only 14% of leads end up with a PA issued. Surfaces two entry points for MyHome: a credit-repair play on the drop-offs, and an application-lift play on the warm leads.",
    linkTo: "/bb-direct-grants",
    linkLabel: "View BB Direct flow",
  },
  {
    id: "fi-deal",
    title: "F&I Journey → Choose My Deal",
    icon: <Briefcase className="w-6 h-6" />,
    accent: "#0C2340",
    summary: "Motor F&I process mapped onto its residential property equivalent — a buyer-facing deal configurator with bank offer comparison, loan term selection, and F&I add-ons (insurance, warranty, home services) with a live deal summary. Also maps the We Buy Cars buyer flow into a 5-step MyHome handover.",
    linkTo: "/deal",
    linkLabel: "View deal prototype",
  },
];

type NextStep = {
  label: string;
  pills?: string[];
};

const NEXT_STEPS: NextStep[] = [
  {
    label: "Confirmation of entry point — BetterBond Direct",
    pills: ["Confirmation of which value-adds to start with"],
  },
  {
    label: "Compliance and external stakeholder alignment",
    pills: ["Standard Bank", "Nedbank", "Investec", "Absa", "NCA compliance advice"],
  },
  {
    label: "Upcoming meetings",
    pills: ["Fritz (Head of AI, BHG)", "Nolene — NCA compliance", "Nedbank — Avo"],
  },
  {
    label: "Scoping the build",
    pills: ["Roadmap planning", "Team structure & delivery model"],
  },
];

const TOTAL_SLIDES = 8;

export default function ExcoPresentation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [linerIndex, setLinerIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLinerIndex((i) => (i + 1) % LINER_SUFFIXES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    const el = slideRefs.current[clamped];
    const container = containerRef.current;
    if (!el || !container) return;
    container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(current + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL_SLIDES - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = slideRefs.current.findIndex((el) => el === entry.target);
            if (idx >= 0) setCurrent(idx);
          }
        });
      },
      { root, threshold: [0.5, 0.75] }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setSlideRef = (i: number) => (el: HTMLElement | null) => {
    slideRefs.current[i] = el;
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory bg-[#f0f5fa] scroll-smooth"
    >
      {/* Slide 1 — Title */}
      <section
        ref={setSlideRef(0)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-[#0C2340] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-[#3DBFAD]/15 blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full bg-[#3DBFAD]/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative w-full max-w-[1600px] text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              Better Home Group Exco · 17 April 2026
            </span>
            <span className="w-10 h-px bg-[#3DBFAD]" />
          </div>

          <div className="flex items-center justify-center mb-10">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png"
              alt="MyHome"
              className="h-24 md:h-40 lg:h-52 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          <div className="max-w-5xl mx-auto mb-16 text-white/85 text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-center">
            <span>{LINER_PREFIX} </span>
            <span className="relative inline-block align-baseline min-h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={linerIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-block text-[#3DBFAD]"
                >
                  {LINER_SUFFIXES[linerIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-10 pt-10 border-t border-white/15">
            <div className="text-left">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#3DBFAD] mb-1.5">
                Project Team
              </div>
              <div className="text-white text-lg md:text-xl font-medium">
                Wesley Roos &nbsp;·&nbsp; Tersia Bester
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2 — Ecosystem image */}
      <section
        ref={setSlideRef(1)}
        className="snap-start min-h-screen w-full flex items-center justify-center bg-[#f0f5fa]"
      >
        <img
          src="/lc-vision.jpeg"
          alt="MyHome ecosystem"
          className="w-full h-auto block"
        />
      </section>

      {/* Slide 3 — Recap / Action Points */}
      <section
        ref={setSlideRef(2)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-gradient-to-br from-white via-[#f6fbfa] to-[#eef5f4] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#3DBFAD]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#0C2340]/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#0C2340 1px, transparent 1px), linear-gradient(90deg, #0C2340 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative w-full max-w-[1600px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              01 · Recap
            </span>
          </div>
          <h2 className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">
            Action points from previous meeting.
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-4xl mb-12">
            What we committed to last session — meetings to take, research to complete, and prototypes to build.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RecapCard label="Meetings" count={MEETINGS.length} color="#3DBFAD" icon={<Users className="w-5 h-5" />} items={MEETINGS} />
            <RecapCard label="Research" count={RESEARCH_ITEMS.length} color="#0C2340" icon={<BarChart3 className="w-5 h-5" />} items={RESEARCH_ITEMS} />
            <RecapCard label="Actions" count={PROTOTYPE_ITEMS.length} color="#f59e0b" icon={<Wrench className="w-5 h-5" />} items={PROTOTYPE_ITEMS} />
          </div>
        </div>
      </section>

      {/* Slide 4 — Meetings */}
      <section
        ref={setSlideRef(3)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-white overflow-hidden"
      >
        <div className="relative w-full max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              02 · Meetings
            </span>
          </div>
          <h2 className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
            Who we spoke to.
          </h2>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
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
                    <td className="px-8 py-5 align-top">
                      <span className="font-heading font-bold text-base text-[#0C2340]">{m.who}</span>
                    </td>
                    <td className="px-8 py-5 align-top">
                      {m.feedback ? (
                        <div>
                          <span className="text-[15px] text-slate-600 leading-[1.7]">{m.feedback}</span>
                          {m.linkTo && (
                            <a href={m.linkTo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#3DBFAD] hover:text-[#0C2340] transition-colors cursor-pointer mt-2 group">
                              View full notes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
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
      </section>

      {/* Slide 5 — Research */}
      <section
        ref={setSlideRef(4)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-slate-50 overflow-hidden"
      >
        <div className="relative w-full max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              03 · Research
            </span>
          </div>
          <h2 className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
            What the research says.
          </h2>
          <div className="space-y-5">
            {RESEARCH_FEEDBACK.map((card) => (
              <FeedbackCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Slide 6 — Prototypes */}
      <section
        ref={setSlideRef(5)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-white overflow-hidden"
      >
        <div className="relative w-full max-w-[1400px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              04 · Prototypes
            </span>
          </div>
          <h2 className="font-heading font-bold text-[#0C2340] text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
            What we built.
          </h2>
          <div className="space-y-5">
            {PROTOTYPE_FEEDBACK.map((card) => (
              <FeedbackCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Slide 7 — What's next */}
      <section
        ref={setSlideRef(6)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-[#3DBFAD]/12 blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full bg-[#3DBFAD]/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="relative w-full max-w-[1200px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              05 · What's next
            </span>
          </div>
          <h2 className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl mb-12 tracking-tight">
            Next up for the exco.
          </h2>
          <ul className="space-y-4">
            {NEXT_STEPS.map((item, i) => (
              <li
                key={item.label}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 hover:border-[#3DBFAD]/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#3DBFAD] font-bold tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white text-xl md:text-2xl font-medium flex-1">
                    {item.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#3DBFAD] group-hover:translate-x-1 transition-all" />
                </div>
                {item.pills && (
                  <div className="mt-4 ml-10 flex flex-wrap gap-2">
                    {item.pills.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Slide 8 — Thank you */}
      <section
        ref={setSlideRef(7)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-[#0C2340] overflow-hidden"
      >
        {/* Background image */}
        <img
          src="/myhome-scene.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-[#0C2340]/35" />

        <div className="relative w-full max-w-[1600px] text-center -translate-y-10 md:-translate-y-16">
          <div className="flex items-center justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.35em] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD]" />
              End of deck
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-heading font-bold text-white leading-[0.9] tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[160px]">
              Thank <span className="text-[#3DBFAD]">you.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Presentation controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/90 backdrop-blur border border-[#0C2340]/10 rounded-full shadow-lg px-3 py-2">
        <button
          type="button"
          onClick={(e) => { e.currentTarget.blur(); goTo(current - 1); }}
          disabled={current === 0}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0C2340] hover:bg-[#0C2340]/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-2">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all rounded-full ${
                i === current
                  ? "w-8 h-2 bg-[#3DBFAD]"
                  : "w-2 h-2 bg-[#0C2340]/25 hover:bg-[#0C2340]/50"
              }`}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-[#0C2340]/60 px-1 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={(e) => { e.currentTarget.blur(); goTo(current + 1); }}
          disabled={current === TOTAL_SLIDES - 1}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#0C2340] hover:bg-[#0C2340]/90 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function RecapCard({
  label, count, color, icon, items,
}: {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div
      className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col"
      style={{ borderTopWidth: "4px", borderTopColor: color }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span style={{ color }}>{icon}</span>
        <span className="text-sm uppercase tracking-widest font-bold text-[#0C2340]">{label}</span>
        <span className="w-7 h-7 rounded-full bg-[#0C2340] text-white text-xs font-bold flex items-center justify-center">
          {count}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] text-slate-700 leading-relaxed">
            <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedbackCard({ card }: { card: FeedbackCardData }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex items-start gap-6 border-l-4"
      style={{ borderLeftColor: card.accent }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg"
        style={{ backgroundColor: card.accent }}
      >
        {card.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-xl text-[#0C2340] mb-3">{card.title}</h4>
        <p className="text-[15px] text-slate-600 leading-[1.7]">{card.summary}</p>
        {card.linkTo && (
          <a href={card.linkTo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-base font-bold text-[#3DBFAD] hover:text-[#0C2340] transition-colors cursor-pointer mt-4 group">
            {card.linkLabel} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}
