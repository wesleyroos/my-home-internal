/*
 * BetterHomeJourney — Better Home Group entity map
 * Horizontal 10-step customer journey showing all BHG entities and partners
 */

import { Link } from "wouter";
import { LayoutGrid } from "lucide-react";

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BetterHomeJourney() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">

      {/* Nav */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <img src={LOGO} alt="MyHome" className="h-6" />
          <Link href="/dashboard">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-[#0C2340] cursor-pointer transition-colors">
              <LayoutGrid className="w-3 h-3" />
              Dashboard
            </span>
          </Link>
        </div>
      </div>

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
            <div
              className="absolute"
              style={{
                left: 4 * 130 + 4 * 4,
                width: 130,
              }}
            >
              <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center">
                <p className="text-xs font-bold text-[#0C2340]">Suburb Report</p>
              </div>
            </div>

            {/* F&I — column 6 (index 5) */}
            <div
              className="absolute"
              style={{
                left: 5 * 130 + 5 * 4,
                width: 130,
              }}
            >
              <div className="bg-[#3DBFAD]/10 border-2 border-[#3DBFAD] rounded-xl px-3 py-3 text-center">
                <p className="text-xs font-bold text-[#0C2340]">F&I</p>
              </div>
            </div>

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

            {/* Spacer to give the absolute items height */}
            <div style={{ height: 52 }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-white">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <p className="text-muted-foreground text-xs">Better Home Group · Internal view · Not for distribution</p>
        </div>
      </div>

    </div>
  );
}
