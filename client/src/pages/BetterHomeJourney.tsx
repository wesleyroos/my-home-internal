/*
 * BetterHomeJourney — Better Home Group entity map
 * Horizontal 10-step customer journey showing all BHG entities and partners
 */

import { useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import {
  LayoutGrid, User, BadgeCheck, GripHorizontal,
  FileSearch, BarChart3, Briefcase, Vault,
  ArrowRight,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Legend, Tooltip,
} from "recharts";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type EntryVariant = "bhg" | "partner" | "bank" | "text" | "proposed";

interface Entry {
  label: string;
  variant: EntryVariant;
  sub?: string;
}

interface Step {
  num: string;
  label: string;
  entries: Entry[];
}

interface PlatformBrand {
  label: string;
  sub?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    num: "01",
    label: "Staying",
    entries: [
      { label: "PayProp", variant: "partner" },
    ],
  },
  {
    num: "02",
    label: "Life event",
    entries: [
      { label: "Graduate", variant: "text" },
      { label: "New job", variant: "text" },
      { label: "Married", variant: "text" },
      { label: "Baby on\nthe way", variant: "text" },
    ],
  },
  {
    num: "03",
    label: "Online",
    entries: [
      { label: "HomeBuyer", variant: "bhg" },
    ],
  },
  {
    num: "04",
    label: "Search",
    entries: [
      { label: "Private Property", variant: "partner" },
      { label: "amplifi", variant: "bhg" },
    ],
  },
  {
    num: "05",
    label: "Buy/Rent",
    entries: [
      { label: "RE/MAX", variant: "partner", sub: "Independents" },
      { label: "CHAS EVERITT", variant: "partner" },
      { label: "RealNet", variant: "partner" },
      { label: "Tyson Properties", variant: "partner" },
      { label: "F&C", variant: "partner" },
      { label: "JustProperty", variant: "partner" },
    ],
  },
  {
    num: "06",
    label: "Home loan",
    entries: [
      { label: "BetterBond", variant: "bhg" },
      { label: "MortgageMax", variant: "partner" },
      { label: "HLPartnership", variant: "partner" },
      { label: "Absa", variant: "bank" },
      { label: "Nedbank", variant: "bank" },
      { label: "Standard Bank", variant: "bank" },
      { label: "FNB", variant: "bank" },
      { label: "Investec", variant: "bank" },
      { label: "SwitchX", variant: "partner" },
      { label: "BetterID", variant: "bhg" },
    ],
  },
  {
    num: "07",
    label: "Insurance",
    entries: [
      { label: "BetterSure", variant: "bhg", sub: "Home & Bond Insurance" },
      { label: "HLPartnership", variant: "partner" },
    ],
  },
  {
    num: "08",
    label: "Cross-sell",
    entries: [
      { label: "Personal loans", variant: "text" },
      { label: "Wills and\nEstate planning", variant: "text" },
    ],
  },
  {
    num: "09",
    label: "Conveyancing",
    entries: [
      { label: "DH Attorneys", variant: "partner" },
      { label: "KK Inc", variant: "partner" },
      { label: "Greyvensteins", variant: "partner" },
      { label: "STBB", variant: "partner" },
      { label: "Shoreline Inc", variant: "partner" },
      { label: "Proxi", variant: "proposed" },
    ],
  },
  {
    num: "10",
    label: "Home service",
    entries: [
      { label: "Snappy Home", variant: "bhg" },
    ],
  },
];

const PLATFORM: PlatformBrand[] = [
  { label: "PropertyEngine" },
  { label: "BetterID" },
  { label: "Proply" },
  { label: "REDi" },
  { label: "LOOM" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StepHeader({ num, label, emphasized }: { num: string; label: string; emphasized?: boolean }) {
  return (
    <div className={`rounded-xl px-3 py-4 text-center text-white ${
      emphasized ? "bg-[#3DBFAD]" : "bg-[#0C2340]"
    }`}>
      <span className="block font-heading font-bold text-2xl leading-none">{num}</span>
      <span className="block mt-1.5 text-[11px] font-medium text-white/80 leading-snug">{label}</span>
    </div>
  );
}

function EntryCard({ entry }: { entry: Entry }) {
  if (entry.variant === "text") {
    return (
      <div className="text-center py-1.5">
        {entry.label.split("\n").map((line, i) => (
          <p key={i} className="text-[13px] text-slate-500 leading-snug">{line}</p>
        ))}
      </div>
    );
  }

  const base = "rounded-lg px-3 py-3 text-center flex flex-col items-center justify-center gap-1";

  const styles: Record<EntryVariant, string> = {
    bhg:      `${base} bg-white border border-slate-100`,
    partner:  `${base} bg-white border border-slate-100`,
    bank:     `${base} bg-white border border-slate-100`,
    proposed: `${base} bg-white border border-dashed border-slate-300`,
    text:     "",
  };

  return (
    <div className={styles[entry.variant]}>
      {entry.sub && (
        <p className="text-[9px] text-slate-400 uppercase tracking-wide">{entry.sub}</p>
      )}
      <p className="text-[12px] font-bold leading-snug text-[#0C2340]">
        {entry.label}
      </p>
      {entry.variant === "proposed" && (
        <p className="text-[9px] italic text-slate-400">Proposed</p>
      )}
    </div>
  );
}

// ─── User Journey Slider ──────────────────────────────────────────────────────

const COL_W = 130;
const GAP = 4;
const TOTAL_W = STEPS.length * COL_W + (STEPS.length - 1) * GAP;

function UserJourneySlider() {
  const [activeStep, setActiveStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [userType, setUserType] = useState<"Buyer" | "Owner" | "Renter">("Buyer");
  const [typeOpen, setTypeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Centre of each column
  const dotX = (i: number) => i * (COL_W + GAP) + COL_W / 2;

  // Find nearest step from an x position relative to container
  const nearestStep = useCallback((clientX: number) => {
    if (!containerRef.current) return activeStep;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < STEPS.length; i++) {
      const dist = Math.abs(x - dotX(i));
      if (dist < minDist) { minDist = dist; closest = i; }
    }
    return closest;
  }, [activeStep]);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setActiveStep(nearestStep(e.clientX));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    setActiveStep(nearestStep(e.clientX));
  };

  return (
    <div className="flex justify-center pb-10 px-6">
      <div ref={containerRef} className="relative" style={{ width: TOTAL_W }}>
        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-4 text-center">
          User Journey Position
        </p>

        {/* Line with dots */}
        <div className="relative" style={{ height: 60 }}>
          {/* Horizontal line */}
          <div
            className="absolute bg-slate-300 rounded-full"
            style={{ left: dotX(0), right: TOTAL_W - dotX(STEPS.length - 1), height: 2, top: 24 }}
          />
          {/* Dots with step numbers and labels */}
          {STEPS.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(i)}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: dotX(i), top: 0 }}
            >
              {/* Step number above */}
              <span className={`text-[10px] font-bold leading-none transition-colors ${
                i === activeStep ? "text-[#3DBFAD]" : "text-[#0C2340]"
              }`}>
                {step.num}
              </span>
              {/* Dot */}
              <span className={`block rounded-full transition-all mt-2 ${
                i === activeStep
                  ? "w-4 h-4 bg-[#3DBFAD] shadow-md shadow-[#3DBFAD]/30"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`} />
              {/* Label below */}
              <span className={`mt-2 text-[9px] font-medium whitespace-nowrap transition-colors ${
                i === activeStep ? "text-[#3DBFAD]" : "text-slate-400"
              }`}>
                {step.label}
              </span>
            </button>
          ))}
        </div>

        {/* User profile card — draggable, slides to active dot */}
        <div
          className={`absolute select-none ${dragging ? "" : "transition-all duration-500 ease-out"}`}
          style={{
            left: dotX(activeStep),
            top: 84,
            transform: "translateX(-50%)",
            width: 180,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* Connector line from dot to card */}
          <div className="w-px h-4 bg-[#3DBFAD] mx-auto" />

          {/* Card */}
          <div className={`bg-white rounded-xl border-2 border-[#3DBFAD] shadow-lg shadow-[#3DBFAD]/10 px-4 py-3 cursor-grab ${dragging ? "cursor-grabbing scale-[1.03] shadow-xl" : ""}`}>
            {/* Drag handle */}
            <div className="flex justify-center mb-2">
              <GripHorizontal className="w-4 h-4 text-slate-300" />
            </div>

            {/* User info */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-[#3DBFAD]/10 flex items-center justify-center">
                <User className="w-4 h-4 text-[#3DBFAD]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0C2340]">Rudy Botha</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck className="w-3 h-3 text-[#3DBFAD]" />
                  <p className="text-[10px] text-[#3DBFAD] font-semibold">BetterID Verified</p>
                </div>
              </div>
            </div>

            {/* Home Owner Details — selectable dropdown */}
            <div className="bg-slate-50 rounded-lg px-2.5 py-2 mb-2 relative">
              <p className="text-[9px] text-slate-400 uppercase tracking-wide font-semibold mb-1">Home Owner Details</p>
              <button
                onClick={(e) => { e.stopPropagation(); setTypeOpen(!typeOpen); }}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#0C2340] text-white text-[10px] font-semibold hover:bg-[#0C2340]/90 transition-colors w-full justify-between"
              >
                {userType}
                <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${typeOpen ? "rotate-180" : ""}`}>
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>
              {typeOpen && (
                <div className="absolute left-2.5 right-2.5 top-full mt-1 bg-white rounded-lg border border-slate-200 shadow-lg z-30 overflow-hidden">
                  {(["Buyer", "Owner", "Renter"] as const).map((type) => (
                    <button
                      key={type}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => { e.stopPropagation(); setUserType(type); setTypeOpen(false); }}
                      className={`block w-full text-left px-3 py-1.5 text-[11px] transition-colors ${
                        type === userType
                          ? "bg-[#3DBFAD]/10 text-[#0C2340] font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current stage */}
            <div className="bg-[#3DBFAD]/8 rounded-lg px-2.5 py-1.5">
              <p className="text-[10px] text-[#0C2340] font-medium">
                Stage: <span className="font-bold">{STEPS[activeStep].num} — {STEPS[activeStep].label}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spacer for card height */}
        <div style={{ height: 240 }} />
      </div>
    </div>
  );
}

// ─── Journey Mapper (Orbital) ─────────────────────────────────────────────────

interface Journey {
  id: string;
  label: string;
  color: string;
  steps: number[]; // indices into STEPS
  description: string;
}

const JOURNEYS: Journey[] = [
  {
    id: "buyer",
    label: "First-time Buyer",
    color: "#3DBFAD",
    steps: [1, 2, 3, 4, 5, 6, 8, 9], // Life event → Online → Search → Buy → Home loan → Insurance → Conveyancing → Home service
    description: "Life event triggers search → finds property → secures bond → insures → transfers → home services",
  },
  {
    id: "renter",
    label: "Renter",
    color: "#6366f1",
    steps: [1, 2, 3, 4, 0, 9], // Life event → Online → Search → Buy/Rent → Staying → Home service
    description: "Life event triggers search → finds rental → moves in → managed by PayProp → home services",
  },
  {
    id: "owner",
    label: "Existing Owner",
    color: "#f59e0b",
    steps: [6, 7, 9], // Insurance → Cross-sell → Home service
    description: "Already owns → refinance or switch → cross-sell products → home services",
  },
  {
    id: "seller",
    label: "Seller → Buyer",
    color: "#ef4444",
    steps: [3, 4, 5, 6, 8, 9], // Search → Buy → Home loan → Insurance → Conveyancing → Home service
    description: "Sells current home → searches for next → full cycle back into ecosystem",
  },
];

const EMPHASIZED_SET = new Set(["04", "05", "06", "09"]);

function OrbitalEcosystem() {
  const [activeJourneys, setActiveJourneys] = useState<Set<string>>(new Set(["buyer"]));

  const SIZE = 960;
  const RING_R = 290;
  const NODE_R = 38;
  const ENTITY_R = RING_R + 120;
  const ctr = SIZE / 2;

  const ang = (i: number) => ((i / STEPS.length) * 360 - 90) * (Math.PI / 180);
  const px = (i: number, r: number) => ctr + r * Math.cos(ang(i));
  const py = (i: number, r: number) => ctr + r * Math.sin(ang(i));

  // Which step indices are lit up by active journeys
  const litSteps = new Set<number>();
  // Colour per step (last journey wins for the node colour)
  const stepColors = new Map<number, string>();
  JOURNEYS.forEach((j) => {
    if (!activeJourneys.has(j.id)) return;
    j.steps.forEach((s) => {
      litSteps.add(s);
      stepColors.set(s, j.color);
    });
  });

  const toggleJourney = (id: string) => {
    setActiveJourneys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Build SVG arc paths for each active journey
  function journeyArcPath(journey: Journey): string {
    const sorted = [...journey.steps].sort((a, b) => a - b);
    // Draw arcs along ring between consecutive journey steps
    const parts: string[] = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const from = sorted[i];
      const to = sorted[i + 1];
      const a1 = ang(from);
      const a2 = ang(to);
      const x1 = ctr + RING_R * Math.cos(a1);
      const y1 = ctr + RING_R * Math.sin(a1);
      const x2 = ctr + RING_R * Math.cos(a2);
      const y2 = ctr + RING_R * Math.sin(a2);
      // Determine if arc should go the long way
      let angleDiff = ((a2 - a1) * 180) / Math.PI;
      if (angleDiff < 0) angleDiff += 360;
      const largeArc = angleDiff > 180 ? 1 : 0;
      parts.push(`M ${x1} ${y1} A ${RING_R} ${RING_R} 0 ${largeArc} 1 ${x2} ${y2}`);
    }
    return parts.join(" ");
  }

  return (
    <div className="px-6 pb-10">
      {/* Section header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-2">
          <span className="w-4 h-px bg-[#3DBFAD]" />
          Ecosystem View
          <span className="w-4 h-px bg-[#3DBFAD]" />
        </div>
        <h2 className="font-heading font-bold text-xl text-[#0C2340]">
          The Continuous Home Ownership Ecosystem
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
          Toggle journeys to see how different users move through the ecosystem. MyHome facilitates every path.
        </p>
      </div>

      {/* Journey toggles */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex flex-wrap gap-2 justify-center">
          {JOURNEYS.map((j) => {
            const active = activeJourneys.has(j.id);
            return (
              <button
                key={j.id}
                onClick={() => toggleJourney(j.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border-2 ${
                  active
                    ? "bg-white shadow-md"
                    : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"
                }`}
                style={{
                  borderColor: active ? j.color : "transparent",
                }}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: active ? j.color : "#cbd5e1" }}
                />
                {j.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active journey descriptions */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {JOURNEYS.filter((j) => activeJourneys.has(j.id)).map((j) => (
          <div
            key={j.id}
            className="px-3 py-1.5 rounded-lg text-[11px] border"
            style={{ borderColor: j.color + "40", backgroundColor: j.color + "08", color: j.color }}
          >
            {j.description}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div
          className="relative w-full"
          style={{ maxWidth: SIZE, aspectRatio: "1 / 1" }}
        >
          {/* SVG layer */}
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Base ring */}
            <circle cx={ctr} cy={ctr} r={RING_R} fill="none" stroke="#e2e8f0" strokeWidth="2" />

            {/* Journey arc paths */}
            {JOURNEYS.map((j) => {
              if (!activeJourneys.has(j.id)) return null;
              return (
                <path
                  key={`path-${j.id}`}
                  d={journeyArcPath(j)}
                  fill="none"
                  stroke={j.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity={0.5}
                />
              );
            })}

            {/* Journey step dots on ring (small coloured dots at each journey step) */}
            {JOURNEYS.map((j) => {
              if (!activeJourneys.has(j.id)) return null;
              return j.steps.map((si) => (
                <circle
                  key={`jdot-${j.id}-${si}`}
                  cx={px(si, RING_R)}
                  cy={py(si, RING_R)}
                  r={6}
                  fill={j.color}
                  stroke="white"
                  strokeWidth="2"
                />
              ));
            })}

            {/* Connector lines to entity cards */}
            {STEPS.map((step, i) => {
              const isLit = litSteps.has(i);
              return (
                <line
                  key={`eline-${i}`}
                  x1={px(i, RING_R + NODE_R)}
                  y1={py(i, RING_R + NODE_R)}
                  x2={px(i, ENTITY_R - 50)}
                  y2={py(i, ENTITY_R - 50)}
                  stroke={isLit ? (stepColors.get(i) ?? "#e2e8f0") : "#e2e8f0"}
                  strokeWidth={isLit ? 1.5 : 1}
                  opacity={isLit ? 0.4 : 0.15}
                />
              );
            })}
          </svg>

          {/* Step nodes */}
          {STEPS.map((step, i) => {
            const x = px(i, RING_R);
            const y = py(i, RING_R);
            const isLit = litSteps.has(i);
            const isEmph = EMPHASIZED_SET.has(step.num);
            const r = isEmph ? NODE_R + 4 : NODE_R;
            const nodeColor = isLit
              ? (stepColors.get(i) ?? "#0C2340")
              : isEmph ? "#3DBFAD" : "#0C2340";

            return (
              <div
                key={step.num}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-white transition-all duration-300"
                style={{
                  left: `${(x / SIZE) * 100}%`,
                  top: `${(y / SIZE) * 100}%`,
                  width: r * 2,
                  height: r * 2,
                  backgroundColor: nodeColor,
                  opacity: isLit || activeJourneys.size === 0 ? 1 : 0.35,
                  boxShadow: isLit ? `0 0 0 4px ${nodeColor}25, 0 4px 12px ${nodeColor}20` : "none",
                  zIndex: 2,
                }}
              >
                <span className="font-bold text-sm leading-none">{step.num}</span>
                <span className="text-[8px] text-white/70 mt-0.5 leading-none">{step.label}</span>
              </div>
            );
          })}

          {/* Entity cards — always visible, always legible */}
          {STEPS.map((step, i) => {
            const x = px(i, ENTITY_R);
            const y = py(i, ENTITY_R);
            const isLit = litSteps.has(i);

            return (
              <div
                key={`ent-${step.num}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${(x / SIZE) * 100}%`,
                  top: `${(y / SIZE) * 100}%`,
                  width: 130,
                  zIndex: 1,
                  opacity: isLit || activeJourneys.size === 0 ? 1 : 0.4,
                }}
              >
                <div className={`rounded-xl p-2.5 text-center transition-all duration-300 ${
                  isLit
                    ? "bg-white border-2 shadow-md"
                    : "bg-white border border-slate-200"
                }`} style={{
                  borderColor: isLit ? (stepColors.get(i) ?? "#e2e8f0") : undefined,
                }}>
                  {step.entries.map((e, ei) => (
                    <p
                      key={ei}
                      className={`text-[10px] leading-relaxed ${
                        isLit ? "text-[#0C2340] font-semibold" : "text-slate-500"
                      }`}
                    >
                      {e.label.replace("\n", " ")}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Centre hub — MyHome */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "50%", top: "50%", zIndex: 10 }}
          >
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg px-6 py-5 text-center">
              <img src={LOGO} alt="MyHome" className="h-5 mx-auto mb-2" />
              <p className="text-[10px] font-semibold text-[#0C2340] uppercase tracking-widest mb-1">
                Facilitates Every Journey
              </p>
              <p className="text-[9px] text-slate-400 max-w-[160px]">
                One platform connecting users to every service across the home ownership lifecycle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Persona Journeys ─────────────────────────────────────────────────────────

interface Persona {
  name: string;
  type: "Renter" | "Buyer" | "Owner";
  color: string;
  avatar: string;
  bio: string;
  timeline: { step: string; label: string; detail: string; services: string[] }[];
}

const PERSONAS: Persona[] = [
  {
    name: "Tom",
    type: "Renter",
    color: "#6366f1",
    avatar: "T",
    bio: "25, recently started his first job in Cape Town. Not ready to buy yet but needs a place close to the office.",
    timeline: [
      { step: "02", label: "Life event", detail: "Starts new job, relocates to Cape Town", services: [] },
      { step: "03", label: "Online", detail: "Browses listings online", services: [] },
      { step: "04", label: "Search", detail: "Finds rentals via Private Property & agents", services: ["Private Property", "RE/MAX"] },
      { step: "05", label: "Buy/Rent", detail: "Signs lease through JustProperty", services: ["JustProperty"] },
      { step: "01", label: "Staying", detail: "Rent managed via PayProp, deposits secured", services: ["PayProp"] },
      { step: "10", label: "Home service", detail: "Uses Snappy Home for move-in & maintenance", services: ["Snappy Home"] },
    ],
  },
  {
    name: "Amy",
    type: "Buyer",
    color: "#3DBFAD",
    avatar: "A",
    bio: "32, married, expecting first child. Ready to buy their first home in Johannesburg.",
    timeline: [
      { step: "02", label: "Life event", detail: "Baby on the way — needs more space", services: [] },
      { step: "03", label: "Online", detail: "Starts searching online, gets pre-qualified", services: [] },
      { step: "04", label: "Search", detail: "Views properties through CHAS EVERITT", services: ["CHAS EVERITT", "amplifi"] },
      { step: "05", label: "Buy/Rent", detail: "Makes offer on 3-bed in Randburg", services: ["CHAS EVERITT"] },
      { step: "06", label: "Home loan", detail: "BetterBond secures best rate via Nedbank", services: ["BetterBond", "Nedbank", "BetterID"] },
      { step: "07", label: "Insurance", detail: "BetterSure bundles home & bond insurance", services: ["BetterSure"] },
      { step: "09", label: "Conveyancing", detail: "STBB handles transfer, rolled into bond", services: ["STBB"] },
      { step: "10", label: "Home service", detail: "Snappy Home handles move-in day", services: ["Snappy Home"] },
    ],
  },
  {
    name: "Eleanor",
    type: "Owner",
    color: "#f59e0b",
    avatar: "E",
    bio: "48, owns a townhouse in Durban. Looking to refinance for a better rate and add home services.",
    timeline: [
      { step: "06", label: "Home loan", detail: "Refinances through BetterBond for lower rate", services: ["BetterBond", "Standard Bank"] },
      { step: "07", label: "Insurance", detail: "Switches to BetterSure, saves R200/month", services: ["BetterSure", "HLPartnership"] },
      { step: "08", label: "Cross-sell", detail: "Adds credit life & estate planning", services: ["Credit Life", "Wills and Estate planning"] },
      { step: "10", label: "Home service", detail: "Signs up for Snappy Home services plan", services: ["Snappy Home"] },
    ],
  },
];

function PersonaJourneys() {
  return (
    <div className="px-6 pb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-2">
          <span className="w-4 h-px bg-[#3DBFAD]" />
          User Journeys
          <span className="w-4 h-px bg-[#3DBFAD]" />
        </div>
        <h2 className="font-heading font-bold text-xl text-[#0C2340]">
          Three Journeys, One Ecosystem
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
          Every user enters the ecosystem differently — MyHome meets them wherever they are.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {PERSONAS.map((persona) => (
          <div key={persona.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Persona header */}
            <div className="px-6 py-4 flex items-center gap-4" style={{ borderBottom: `3px solid ${persona.color}` }}>
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: persona.color }}
              >
                {persona.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[#0C2340]">{persona.name}</p>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: persona.color }}
                  >
                    {persona.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{persona.bio}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-6 py-5 overflow-x-auto">
              <div className="flex items-start gap-0 min-w-max">
                {persona.timeline.map((t, ti) => (
                  <div key={ti} className="flex items-start">
                    {/* Step card */}
                    <div className="w-[160px] flex flex-col items-center">
                      {/* Step badge */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2"
                        style={{ backgroundColor: persona.color }}
                      >
                        {t.step}
                      </div>
                      <p className="text-[11px] font-semibold text-[#0C2340] mb-1">{t.label}</p>
                      <p className="text-[10px] text-slate-500 text-center leading-relaxed mb-2 px-2">{t.detail}</p>
                      {/* Services engaged */}
                      {t.services.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {t.services.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded text-[9px] font-semibold text-center"
                              style={{
                                backgroundColor: persona.color + "12",
                                color: persona.color,
                                border: `1px solid ${persona.color}30`,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow connector */}
                    {ti < persona.timeline.length - 1 && (
                      <div className="flex items-center pt-4 px-1">
                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                          <path
                            d="M0 6H20M20 6L15 1M20 6L15 11"
                            stroke={persona.color}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity={0.4}
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Market Stats ─────────────────────────────────────────────────────────────

const MARKET_STAT_GROUPS = [
  {
    act: "01",
    label: "The Market",
    description: "Scale of the South African residential property landscape.",
    stats: [
      { stat: "R6.8T", color: "#0C2340", label: "total **residential property stock** in SA", source: "Lightstone, Feb 2024" },
      { stat: "252,709", color: "#3DBFAD", label: "**property transfers** registered in 2024", source: "Deeds Office, 2024" },
      { stat: "~40,000", color: "#f59e0b", label: "**registered estate agents** in South Africa", source: "PPRA, 2024" },
      { stat: "1.67M", color: "#6366f1", label: "**outstanding mortgages** in SA", source: "NCR, Q1 2024" },
      { stat: "R178B", color: "#3DBFAD", label: "in new **mortgage originations** in 2024", source: "NCR Consumer Credit Market Report, 2024" },
    ],
  },
  {
    act: "02",
    label: "The Renter",
    description: "Most South Africans spend over a decade renting before they buy.",
    stats: [
      { stat: "53% / 23%", color: "#3DBFAD", label: "**owners** vs **renters**", source: "Stats SA General Household Survey, 2022" },
      { stat: "~23", color: "#6366f1", label: "estimated age at **first rental**", source: "Working estimate — no single authoritative SA dataset exists" },
      { stat: "R9,000+", color: "#f59e0b", label: "average **monthly rent** — crossed R9k for the first time in Q4 2024", source: "PayProp Rental Index, Q4 2024" },
      { stat: "~14 yrs", color: "#0C2340", label: "spent **renting** before buying a first home", source: "Derived: first rental ~23, first purchase ~37" },
      { stat: "~R1.51M", color: "#ef4444", label: "total **rent paid** over 14 years — roughly equal to the average bond", source: "Derived from PayProp Q4 2024 & ooba Q2 2025" },
    ],
  },
  {
    act: "03",
    label: "The Buyer",
    description: "When renters finally buy, the transaction is complex, fast-moving, and high-value.",
    stats: [
      { stat: "37", color: "#0C2340", label: "average age of a **first-time buyer**", source: "ooba oobarometer, 2024" },
      { stat: "55%", color: "#3DBFAD", label: "of first-time buyers are **female**", source: "ooba oobarometer, 2024" },
      { stat: "R1.46M", color: "#f59e0b", label: "average **approved bond** value", source: "ooba oobarometer, Q2 2025" },
      { stat: "~60%", color: "#0C2340", label: "of bonds submitted via a **bond originator**", source: "ooba / BetterBond market commentary, 2024" },
      { stat: "4–5", color: "#6366f1", label: "banks an originator **submits to simultaneously**", source: "ooba oobarometer, 2024" },
      { stat: "~90 days", color: "#6366f1", label: "from **offer to registration**", source: "SA conveyancing commentary" },
    ],
  },
];

function highlightLabel(label: string, color: string) {
  const parts = label.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color, fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function MarketStatsSection() {
  return (
    <div className="px-6 pb-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {MARKET_STAT_GROUPS.map((group) => (
          <div key={group.act}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading font-bold text-xs text-white bg-[#0C2340] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                {group.act}
              </span>
              <div>
                <p className="font-heading font-bold text-base text-[#0C2340]">{group.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {group.stats.map((s) => (
                <div key={s.stat} className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-5">
                  <p className="font-heading font-bold text-3xl leading-none" style={{ color: s.color }}>{s.stat}</p>
                  <p className="text-xs text-slate-500 mt-3 leading-snug">{highlightLabel(s.label, s.color)}</p>
                  <p className="text-[9px] text-slate-300 mt-3 italic">Source: {s.source}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Entry Points & Opportunity ───────────────────────────────────────────────

interface EntryPoint {
  name: string;
  column: string;
  icon: React.ReactNode;
  description: string;
  link?: string;
}

const ENTRY_POINTS: EntryPoint[] = [
  {
    name: "Property Pass",
    column: "04 — Search",
    icon: <FileSearch className="w-5 h-5" />,
    description: "Digital property pack with title deed, valuation, compliance certs, and disclosures — ready before the first viewing.",
    link: undefined,
  },
  {
    name: "Suburb Report",
    column: "05 — Buy/Rent",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Neighbourhood intelligence — demographics, schools, crime stats, price trends, and comparable sales for any suburb.",
    link: "/report",
  },
  {
    name: "F&I (Finance & Insurance)",
    column: "06 — Home loan",
    icon: <Briefcase className="w-5 h-5" />,
    description: "The motor-industry F&I model applied to home buying — bundle bond, insurance, warranties, and value-adds into one process.",
    link: "/fi",
  },
  {
    name: "Doc Vault",
    column: "08 — Cross-sell",
    icon: <Vault className="w-5 h-5" />,
    description: "Secure digital vault for all property documents — title deed, bond agreement, insurance policies, compliance certs. Verified and shareable.",
    link: "/vault",
  },
];

function EntryPointsSection() {
  return (
    <div className="px-6 pb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-2">
          <span className="w-4 h-px bg-[#3DBFAD]" />
          Entry Points &amp; Opportunity
          <span className="w-4 h-px bg-[#3DBFAD]" />
        </div>
        <h2 className="font-heading font-bold text-xl text-[#0C2340]">
          Where We Start
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
          Each product is a possible entry point into the MyHome ecosystem — sized against verified South African property market data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {ENTRY_POINTS.map((ep) => (
          <div
            key={ep.name}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#3DBFAD]/40 transition-all overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3DBFAD]/10 flex items-center justify-center flex-shrink-0 text-[#3DBFAD]">
                  {ep.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0C2340]">{ep.name}</p>
                  <p className="text-[10px] text-[#3DBFAD] font-semibold uppercase tracking-wide mt-0.5">{ep.column}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-3">{ep.description}</p>
            </div>

            {ep.link && (
              <div className="px-5 pb-5 mt-auto">
                <Link href={ep.link}>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3DBFAD] hover:text-[#0C2340] transition-colors cursor-pointer">
                    View prototype
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Opportunity Scoring ──────────────────────────────────────────────────────

const DIMENSIONS = [
  { id: "revenue", label: "Revenue", description: "How much money can this make?" },
  { id: "lockin", label: "Lead Gen", description: "Does it create leads for other BHG businesses?" },
  { id: "infra", label: "Positioning", description: "How well positioned are we?" },
  { id: "speed", label: "Speed", description: "How fast can we ship this?" },
  { id: "moat", label: "Moat", description: "Is this hard for competitors to copy?" },
];

interface ScoredEntry {
  name: string;
  scores: Record<string, number>;
}

const DEFAULT_SCORES: ScoredEntry[] = [
  { name: "F&I", scores: { revenue: 5, lockin: 5, infra: 4, speed: 3, moat: 5 } },
  { name: "Property Pass", scores: { revenue: 3, lockin: 4, infra: 3, speed: 4, moat: 3 } },
  { name: "Suburb Report", scores: { revenue: 2, lockin: 3, infra: 3, speed: 5, moat: 2 } },
  { name: "Doc Vault", scores: { revenue: 2, lockin: 4, infra: 2, speed: 3, moat: 3 } },
];

const ENTRY_COLORS: Record<string, string> = {
  "F&I":           "#0C2340",
  "Property Pass": "#f59e0b",
  "Suburb Report": "#ef4444",
  "Doc Vault":     "#10b981",
};


function OpportunityScoring() {
  const [entries, setEntries] = useState<ScoredEntry[]>(DEFAULT_SCORES);

  const clearAll = () => {
    setEntries((prev) =>
      prev.map((e) => ({
        ...e,
        scores: Object.fromEntries(DIMENSIONS.map((d) => [d.id, 0])),
      }))
    );
  };

  const resetToDefaults = () => setEntries(DEFAULT_SCORES);

  const updateScore = (entryIdx: number, dimId: string, value: number) => {
    setEntries((prev) => {
      const next = [...prev];
      next[entryIdx] = { ...next[entryIdx], scores: { ...next[entryIdx].scores, [dimId]: value } };
      return next;
    });
  };

  // Calculate totals and sort
  const maxPossible = DIMENSIONS.length * 5;
  const scored = entries
    .map((entry) => {
      const total = DIMENSIONS.reduce((sum, dim) => sum + (entry.scores[dim.id] ?? 0), 0);
      return { ...entry, total, pct: Math.round((total / maxPossible) * 100) };
    })
    .sort((a, b) => b.total - a.total);

  const topScore = scored[0]?.total ?? 1;

  return (
    <div className="px-6 pb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-2">
          <span className="w-4 h-px bg-[#3DBFAD]" />
          Opportunity Scoring
          <span className="w-4 h-px bg-[#3DBFAD]" />
        </div>
        <h2 className="font-heading font-bold text-xl text-[#0C2340]">
          Where Should We Start?
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
          Rate each entry point from 1–5 on five dimensions. Click any score to change it — the ranking updates automatically.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end gap-2 mb-3">
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={resetToDefaults}
            className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Scoring table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid gap-0" style={{ gridTemplateColumns: "180px repeat(5, 1fr) 100px 60px" }}>
            <div className="px-5 py-4 bg-[#0C2340] border-b border-slate-200">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Entry Point</p>
            </div>
            {DIMENSIONS.map((dim) => (
              <div key={dim.id} className="px-3 py-4 bg-[#0C2340] border-b border-slate-200 text-center">
                <p className="text-sm font-bold text-white">{dim.label}</p>
                <p className="text-xs text-white/80 mt-1 leading-snug font-medium">{dim.description}</p>
              </div>
            ))}
            <div className="px-3 py-4 bg-[#0C2340] border-b border-slate-200 text-center">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Score</p>
            </div>
            <div className="px-3 py-4 bg-[#0C2340] border-b border-slate-200 text-center">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Rank</p>
            </div>
          </div>

          {/* Rows */}
          {scored.map((entry, rank) => {
            const origIdx = entries.findIndex((e) => e.name === entry.name);
            return (
              <div
                key={entry.name}
                className="grid gap-0 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                style={{ gridTemplateColumns: "180px repeat(5, 1fr) 100px 60px" }}
              >
                {/* Name + bar */}
                <div className="px-5 py-3 flex flex-col justify-center">
                  <p className="text-sm font-bold text-[#0C2340]">{entry.name}</p>
                  <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(entry.total / topScore) * 100}%`,
                        backgroundColor: rank === 0 ? "#3DBFAD" : rank === 1 ? "#0C2340" : "#94a3b8",
                      }}
                    />
                  </div>
                </div>

                {/* Score cells */}
                {DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="px-2 py-3 flex items-center justify-center">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          onClick={() => updateScore(origIdx, dim.id, v)}
                          className={`w-7 h-7 rounded-lg transition-all text-xs font-bold ${
                            v <= (entry.scores[dim.id] ?? 0)
                              ? "bg-slate-600 text-white"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Weighted total */}
                <div className="px-3 py-3 flex items-center justify-center">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${rank === 0 ? "text-[#3DBFAD]" : "text-[#0C2340]"}`}>
                      {entry.pct}%
                    </p>
                    <p className="text-[9px] text-slate-400">{entry.total}/{maxPossible}</p>
                  </div>
                </div>

                {/* Rank */}
                <div className="px-3 py-3 flex items-center justify-center">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    rank === 0
                      ? "bg-[#3DBFAD] text-white"
                      : rank === 1
                      ? "bg-[#0C2340] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}>
                    #{rank + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation callout */}
        <div className="mt-6 bg-[#3DBFAD]/5 border border-[#3DBFAD]/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#3DBFAD] font-bold text-sm">#1</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#0C2340]">
                Top-ranked entry point: <span className="text-[#3DBFAD]">{scored[0]?.name}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Based on current scoring, {scored[0]?.name} ranks highest at {scored[0]?.pct}%.
                Adjust the scores and weights above to reflect your team's priorities —
                the ranking updates in real time.
              </p>
            </div>
          </div>
        </div>

        {/* Radar chart */}
        {(() => {
          const radarData = DIMENSIONS.map((dim) => ({
            dimension: dim.label,
            ...Object.fromEntries(entries.map((e) => [e.name, e.scores[dim.id] ?? 0])),
          }));
          return (
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold text-[#0C2340] uppercase tracking-widest mb-4">Radar View</p>
              <ResponsiveContainer width="100%" height={480}>
                <RadarChart data={radarData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fill: "#0C2340", fontSize: 13, fontWeight: 600 }}
                  />
                  {entries.map((entry) => (
                    <Radar
                      key={entry.name}
                      name={entry.name}
                      dataKey={entry.name}
                      stroke={ENTRY_COLORS[entry.name] ?? "#94a3b8"}
                      fill={ENTRY_COLORS[entry.name] ?? "#94a3b8"}
                      fillOpacity={0.12}
                      strokeWidth={2}
                      dot={{ r: 3, fill: ENTRY_COLORS[entry.name] ?? "#94a3b8" }}
                    />
                  ))}
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 16 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#0C2340",
                    }}
                    formatter={(value: number, name: string) => [`${value} / 5`, name]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── Entry Point Comparison ───────────────────────────────────────────────────

interface ComparisonEntry {
  name: string;
  color: string;
  stage: string;
  audience: { value: string; note: string };
  revenue: { value: string; note: string };
  timeToLaunch: { value: string; note: string };
  bhgReuse: { value: string; note: string };
  edge: string;
}

const COMPARISON_ENTRIES: ComparisonEntry[] = [
  {
    name: "Property Pass",
    color: "#f59e0b",
    stage: "Spans renters → buyers → owners",
    audience: { value: "Every household", note: "Stacks with more data as user progresses through journey" },
    revenue: { value: "Low / transactional", note: "Per-pull or bundled into a sale" },
    timeToLaunch: { value: "4–6 months", note: "Document standardisation + verification layer" },
    bhgReuse: { value: "High", note: "BetterID, BetterBond doc pipeline, PropertyEngine" },
    edge: "Earliest possible touchpoint and the only entry point that compounds over the entire ownership lifecycle.",
  },
  {
    name: "Suburb Report",
    color: "#ef4444",
    stage: "04–05 — Search / Buy",
    audience: { value: "4.5M monthly uniques", note: "Private Property monthly unique visitors — the demand pool actively searching SA property online" },
    revenue: { value: "R0–50 per pull", note: "Or free with upsell to other BHG products" },
    timeToLaunch: { value: "2–4 months", note: "Fastest to ship — data already exists via PropertyEngine / Lightstone-style sources" },
    bhgReuse: { value: "Medium", note: "PropertyEngine + amplifi" },
    edge: "Lowest time-to-value for the user (instant), proven demand signal from Private Property traffic, fastest to launch.",
  },
  {
    name: "F&I",
    color: "#0C2340",
    stage: "06 — Home loan",
    audience: { value: "165k bonds / yr", note: "New mortgage originations (NCR, 2024)" },
    revenue: { value: "R5–15k per bond", note: "Origination + attached F&I product commissions" },
    timeToLaunch: { value: "6–12 months", note: "FAIS Cat I licence, bank integrations, compliance buildout" },
    bhgReuse: { value: "Very high", note: "BetterBond pipeline, BetterSure attach, BetterID verification" },
    edge: "Highest revenue per user. 48.6% of one-bank rejections are approved by another — F&I is the only entry point that captures that delta.",
  },
  {
    name: "Doc Vault",
    color: "#10b981",
    stage: "07–08 — Insurance / Cross-sell",
    audience: { value: "1.67M bondholders", note: "Existing outstanding mortgages in SA (NCR Q1 2024)" },
    revenue: { value: "Free", note: "Hook into the BHG ecosystem — value comes from the cross-sell, not the vault itself" },
    timeToLaunch: { value: "4–8 months", note: "Encryption, KYC, document verification flows" },
    bhgReuse: { value: "Medium", note: "BetterBond customer base, BetterID identity layer" },
    edge: "Free trust-builder. Sticky, recurring engagement that surfaces every life event the rest of BHG can monetise (refinance, insurance review, sale).",
  },
];

const COMPARISON_DIMENSIONS = [
  { id: "stage", label: "Journey stage" },
  { id: "audience", label: "Addressable audience" },
  { id: "revenue", label: "Revenue per user" },
  { id: "timeToLaunch", label: "Time to launch" },
  { id: "bhgReuse", label: "BHG asset reuse" },
  { id: "edge", label: "Strategic edge" },
];

function EntryPointComparison() {
  return (
    <div className="px-6 pb-16">
      {/* Section header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-2">
          <span className="w-4 h-px bg-[#3DBFAD]" />
          Comparative View
          <span className="w-4 h-px bg-[#3DBFAD]" />
        </div>
        <h2 className="font-heading font-bold text-xl text-[#0C2340]">
          Entry Points Side-by-Side
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto">
          Stats describe the market — they don't pick the winner. This is the comparative view: same questions asked of every option, so the trade-offs are visible at a glance.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header row — entry point names */}
          <div className="grid" style={{ gridTemplateColumns: "180px repeat(4, 1fr)" }}>
            <div className="px-5 py-5 bg-slate-50 border-b border-slate-200" />
            {COMPARISON_ENTRIES.map((e) => (
              <div
                key={e.name}
                className="px-4 py-5 bg-slate-50 border-b border-slate-200 border-l border-slate-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                  <p className="font-heading font-bold text-sm" style={{ color: e.color }}>{e.name}</p>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">{e.stage}</p>
              </div>
            ))}
          </div>

          {/* Dimension rows */}
          {COMPARISON_DIMENSIONS.filter((d) => d.id !== "stage").map((dim) => (
            <div
              key={dim.id}
              className="grid border-b border-slate-100 last:border-0"
              style={{ gridTemplateColumns: "180px repeat(4, 1fr)" }}
            >
              <div className="px-5 py-4 flex items-center bg-slate-50/50">
                <p className="text-[11px] font-bold text-[#0C2340] uppercase tracking-wide leading-snug">{dim.label}</p>
              </div>
              {COMPARISON_ENTRIES.map((e) => {
                if (dim.id === "edge") {
                  return (
                    <div key={e.name} className="px-4 py-4 border-l border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed">{e.edge}</p>
                    </div>
                  );
                }
                const cell = (e as any)[dim.id] as { value: string; note: string };
                return (
                  <div key={e.name} className="px-4 py-4 border-l border-slate-100">
                    <p className="text-sm font-bold text-[#0C2340] leading-snug">{cell.value}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">{cell.note}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Methodology note */}
        <p className="text-[10px] text-slate-400 italic mt-4 leading-relaxed">
          Audience figures are sourced where published (Similarweb, NCR, Deeds Office); revenue, time-to-launch and asset reuse are working estimates based on industry norms and BHG's existing capabilities. This is a judgment exercise, not a forecast.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BetterHomeJourney() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">

      <AppHeader label="Scratchpad · BHG Journey" />

      {/* Journey map */}
      <div className="py-10 px-6">
        <div className="overflow-x-auto flex justify-center">
          <div className="inline-flex gap-1 min-w-max">
            {STEPS.map((step) => {
              const emphasized = ["04", "05", "06", "09"].includes(step.num);
              return (
                <div key={step.num} className="flex flex-col" style={{ width: 130 }}>
                  {/* Step header badge */}
                  <StepHeader num={step.num} label={step.label} emphasized={emphasized} />

                  {/* White card column */}
                  <div className={`mt-2 rounded-xl p-3 flex-1 ${
                    emphasized
                      ? "bg-white border-2 border-[#3DBFAD] shadow-md shadow-[#3DBFAD]/10"
                      : "bg-white border border-slate-100 shadow-sm"
                  }`}>
                    <div className="flex flex-col gap-2">
                      {step.entries.map((entry, ei) => (
                        <EntryCard key={ei} entry={entry} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform infrastructure bar — spans columns 03–06 */}
        <div className="flex justify-center mt-4">
          <div style={{ width: STEPS.length * 130 + (STEPS.length - 1) * 4 }}>
            <div
              style={{
                marginLeft: 2 * 130 + 2 * 4,
                width: 4 * 130 + 3 * 4,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2 text-center">
                PropTech
              </p>
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4">
                <div className="flex items-center justify-between">
                  {PLATFORM.map((p) => (
                    <div key={p.label} className="text-center">
                      <p className="text-sm font-bold text-[#0C2340]">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products layer — Property Pass, F&I, Conveyancing Bundle */}
        <div className="flex justify-center mt-4">
          <div className="relative" style={{ width: STEPS.length * 130 + (STEPS.length - 1) * 4 }}>
            {/* Property Pass — column 4 (index 3) */}
            <div
              className="absolute"
              style={{
                left: 3 * 130 + 3 * 4,
                width: 130,
              }}
            >
              <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center">
                <p className="text-xs font-bold text-[#0C2340]">Property Pass</p>
              </div>
            </div>

            {/* Suburb Report — column 5 (index 4) */}
            <Link href="/report">
              <div
                className="absolute cursor-pointer"
                style={{
                  left: 4 * 130 + 4 * 4,
                  width: 130,
                }}
              >
                <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center hover:bg-[#3DBFAD]/20 transition-colors">
                  <p className="text-xs font-bold text-[#0C2340]">Suburb Report</p>
                </div>
              </div>
            </Link>

            {/* F&I — column 6 (index 5) */}
            <Link href="/fi">
              <div
                className="absolute cursor-pointer"
                style={{
                  left: 5 * 130 + 5 * 4,
                  width: 130,
                }}
              >
                <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center hover:bg-[#3DBFAD]/20 transition-colors">
                  <p className="text-xs font-bold text-[#0C2340]">F&I</p>
                </div>
              </div>
            </Link>

            {/* Conveyancing Bundle — column 9 (index 8), linked to column 6 */}
            <div
              className="absolute"
              style={{
                left: 8 * 130 + 8 * 4,
                width: 130,
              }}
            >
              <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center">
                <p className="text-xs font-bold text-[#0C2340]">Conveyancing Bundle</p>
              </div>
            </div>

            {/* Connecting line from F&I (col 6) to Conveyancing Bundle (col 9) */}
            <svg
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: 5 * 130 + 5 * 4 + 130,
                width: 2 * 130 + 3 * 4,
              }}
              height="2"
              preserveAspectRatio="none"
            >
              <line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#3DBFAD"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Choose My Deal — column 6 (index 5), below F&I */}
            <Link href="/deal">
              <div
                className="absolute cursor-pointer"
                style={{
                  left: 5 * 130 + 5 * 4,
                  top: 52,
                  width: 130,
                }}
              >
                <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center hover:bg-[#3DBFAD]/20 transition-colors">
                  <p className="text-xs font-bold text-[#0C2340]">Choose My Deal</p>
                </div>
              </div>
            </Link>

            {/* Doc Vault — column 8 (index 7), same row as Choose My Deal */}
            <Link href="/vault">
              <div
                className="absolute cursor-pointer"
                style={{
                  left: 7 * 130 + 7 * 4,
                  top: 52,
                  width: 130,
                }}
              >
                <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center hover:bg-[#3DBFAD]/20 transition-colors">
                  <p className="text-xs font-bold text-[#0C2340]">Doc Vault</p>
                </div>
              </div>
            </Link>

            {/* Spacer to give the absolute items height */}
            <div style={{ height: 100 }} />
          </div>
        </div>
      </div>

      {/* User profile slider */}
      <UserJourneySlider />

      {/* Orbital ecosystem view */}
      <OrbitalEcosystem />

      {/* Persona journeys */}
      <PersonaJourneys />

      {/* Market stats */}
      <MarketStatsSection />

      {/* Entry points & opportunity */}
      <EntryPointsSection />

      {/* Opportunity scoring */}
      <OpportunityScoring />

      {/* Comparative entry point view */}
      <EntryPointComparison />

      <AppFooter label="Internal view · Not for distribution" />

    </div>
  );
}
