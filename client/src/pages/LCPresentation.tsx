/*
 * LC Presentation — 16 April
 * Two full-screen slides for the weekly Leadership Committee.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const LINER_PREFIX = "Capturing the full home lifecycle —";
const LINER_SUFFIXES = [
  "and every BHG moment in between.",
  "one always-on relationship across every BHG moment.",
  "turning BHG moments into a permanent relationship.",
  "so BHG stays in the relationship, not just the transaction.",
  "the always-on platform that keeps every South African close to BetterHome.",
];

const DONE = [
  {
    label: "Stakeholder alignment and data gathering",
    children: ["BLOS", "BetterBond Direct", "BetterSure", "Real Estate Investments", "PropTech", "BetterID", "Loom", "and more"],
  },
  {
    label: "Market research",
    children: ["Global landscape", "Competitor research"],
  },
  {
    label: "Concept ideation and prototyping",
    children: ["Suburb Report", "Home F&I Mapping"],
  },
  {
    label: "Pressure-testing entry points",
    children: ["BB Direct Focus Groups", "Standard Bank — LookSee", "We Buy Cars (F&I)"],
  },
];

const NEXT = [
  "Concept definition",
  "Entry-point selection",
  "MVP scoping",
];

const TOTAL_SLIDES = 3;

export default function LCPresentation() {
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
        {/* Decorative background */}
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
          {/* Kicker */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              Leadership Committee · 16 April 2026
            </span>
            <span className="w-10 h-px bg-[#3DBFAD]" />
          </div>

          {/* Wordmark */}
          <div className="flex items-center justify-center mb-10">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png"
              alt="MyHome"
              className="h-24 md:h-40 lg:h-52 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* One-liner — static prefix, cycling suffix */}
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

          {/* Project team */}
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

      {/* Slide 2 — Vision image */}
      <section
        ref={setSlideRef(1)}
        className="snap-start min-h-screen w-full flex items-center justify-center bg-[#f0f5fa]"
      >
        <img
          src="/lc-vision.jpeg"
          alt="MyHome vision"
          className="w-full h-auto block"
        />
      </section>

      {/* Slide 3 — Status */}
      <section
        ref={setSlideRef(2)}
        className="relative snap-start min-h-screen w-full flex items-center justify-center px-6 sm:px-12 py-16 bg-gradient-to-br from-white via-[#f6fbfa] to-[#eef5f4] overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#3DBFAD]/8 blur-3xl" />
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
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs md:text-sm font-semibold uppercase tracking-[0.3em]">
              Project Status · 16 April 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 items-start">
            {/* Done column */}
            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading font-bold text-[#3DBFAD] text-6xl md:text-7xl leading-none">
                  01
                </span>
                <div>
                  <div className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-1">
                    Complete
                  </div>
                  <h2 className="font-heading font-bold text-[#0C2340] text-3xl md:text-4xl">
                    What's been done
                  </h2>
                </div>
              </div>

              <ul className="space-y-5">
                {DONE.map((item) => (
                  <li key={item.label}>
                    <div className="flex items-start gap-4">
                      <span className="mt-1 w-7 h-7 rounded-full bg-[#3DBFAD]/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#3DBFAD]" strokeWidth={3} />
                      </span>
                      <span className="text-[#0C2340] text-xl md:text-2xl leading-snug">
                        {item.label}
                      </span>
                    </div>
                    {item.children && (
                      <div className="mt-3 ml-11 flex flex-wrap gap-2">
                        {item.children.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-[#0C2340]/10 text-[#0C2340] text-sm font-medium shadow-sm"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center justify-center self-stretch">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#0C2340]/20 to-transparent" />
              <div className="my-4 w-10 h-10 rounded-full bg-white border border-[#0C2340]/10 shadow-sm flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#3DBFAD]" />
              </div>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#0C2340]/20 to-transparent" />
            </div>

            {/* Next column */}
            <div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-heading font-bold text-[#0C2340] text-6xl md:text-7xl leading-none">
                  02
                </span>
                <div>
                  <div className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-1">
                    Upcoming
                  </div>
                  <h2 className="font-heading font-bold text-[#0C2340] text-3xl md:text-4xl">
                    Next steps
                  </h2>
                </div>
              </div>

              <ul className="space-y-4">
                {NEXT.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#0C2340]/10 shadow-sm hover:shadow-md hover:border-[#3DBFAD]/40 transition-all"
                  >
                    <span className="font-mono text-xs text-[#3DBFAD] font-bold tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#0C2340] text-xl md:text-2xl font-medium flex-1">
                      {item}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#0C2340]/30 group-hover:text-[#3DBFAD] group-hover:translate-x-1 transition-all" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
