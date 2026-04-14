import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const GRANTED_BRACKETS: { label: string; volume: number; value: string; volPct: string; valPct: string }[] = [
  { label: "0 – R500 000",            volume: 155, value: "R54 350 716",  volPct: "16,4%", valPct: "4,3%" },
  { label: "R500 000 – R1 000 000",   volume: 327, value: "R246 757 880", volPct: "34,5%", valPct: "19,4%" },
  { label: "R1 000 000 – R1 500 000", volume: 177, value: "R223 694 034", volPct: "18,7%", valPct: "17,6%" },
  { label: "R1 500 000 – R2 000 000", volume: 121, value: "R210 290 504", volPct: "12,8%", valPct: "16,5%" },
  { label: "R2 000 000 – R2 500 000", volume: 58,  value: "R128 769 050", volPct: "6,1%",  valPct: "10,1%" },
  { label: "R2 500 000 – R3 000 000", volume: 45,  value: "R126 456 566", volPct: "4,7%",  valPct: "9,9%" },
  { label: "R3 000 000 – R4 000 000", volume: 38,  value: "R134 085 700", volPct: "4,0%",  valPct: "10,5%" },
  { label: "R4 000 000 – R5 000 000", volume: 17,  value: "R77 054 600",  volPct: "1,8%",  valPct: "6,1%" },
  { label: "> R5 000 000",            volume: 10,  value: "R71 594 857",  volPct: "1,1%",  valPct: "5,6%" },
];

const GRANTED_SUMMARY: typeof GRANTED_BRACKETS = [
  { label: "0 – R1 500 000",  volume: 659, value: "R524 802 630", volPct: "69,6%", valPct: "41,3%" },
  { label: "R1 500 000+",      volume: 289, value: "R748 251 277", volPct: "30,4%", valPct: "58,7%" },
];

function renderWithStats(text: string) {
  const parts = text.split(/(«[^»]+»)/g);
  return parts.map((p, i) => {
    if (p.startsWith("«") && p.endsWith("»")) {
      return (
        <span
          key={i}
          className="font-bold text-[#0C2340] bg-[#3DBFAD]/20 px-1.5 py-0.5 rounded"
        >
          {p.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function InsightBlock({
  title,
  headline,
  points,
  accent,
}: {
  title: string;
  headline?: { value: string; label: string };
  points: string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 flex flex-col ${
        accent
          ? "bg-gradient-to-br from-[#3DBFAD]/10 to-[#0C2340]/5 border-[#3DBFAD]/40"
          : "bg-slate-50/50 border-slate-100"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
        {title}
      </p>
      {headline && (
        <div className="mb-3">
          <p className={`text-3xl font-bold leading-none ${accent ? "text-[#3DBFAD]" : "text-[#0C2340]"}`}>
            {headline.value}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">{headline.label}</p>
        </div>
      )}
      <ul className="space-y-2 mt-1">
        {points.map((p, i) => (
          <li key={i} className="text-[12px] text-slate-700 leading-relaxed flex gap-1.5">
            <span className="text-[#3DBFAD] font-bold flex-shrink-0">•</span>
            <span>{renderWithStats(p)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FunnelStage = {
  label: string;
  value: number;
  color: string;
  note: string;
  drop: string | null;
};

function LeadFunnel({
  kicker,
  title,
  description,
  stages,
  metrics,
}: {
  kicker: string;
  title: string;
  description: string;
  stages: FunnelStage[];
  metrics: { k: string; v: string; s: string }[];
}) {
  const WIDTHS = [100, 72, 42, 28];
  const H = 74;
  const GAP = 2;
  const VB_W = 560;
  const VB_H = stages.length * (H + GAP);
  const CX = VB_W / 2;

  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
        {kicker}
      </p>
      <h3 className="text-lg font-bold text-[#0C2340] mb-1">{title}</h3>
      <p className="text-[13px] text-slate-600 mb-6 max-w-3xl">{description}</p>

      <div className="flex items-start gap-6">
        <div className="flex-1 max-w-[560px]">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto">
            {stages.map((s, i) => {
              const topW = (WIDTHS[i] / 100) * VB_W;
              const botW = (WIDTHS[i + 1] !== undefined ? WIDTHS[i + 1] : WIDTHS[i] * 0.7) / 100 * VB_W;
              const y0 = i * (H + GAP);
              const y1 = y0 + H;
              const points = [
                `${CX - topW / 2},${y0}`,
                `${CX + topW / 2},${y0}`,
                `${CX + botW / 2},${y1}`,
                `${CX - botW / 2},${y1}`,
              ].join(" ");
              return (
                <g key={s.label}>
                  <polygon points={points} fill={s.color} />
                  <text
                    x={CX}
                    y={y0 + H / 2 - 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="22"
                    fontWeight="700"
                    fontFamily="Inter, system-ui"
                  >
                    {s.value.toLocaleString()}
                  </text>
                  <text
                    x={CX}
                    y={y0 + H / 2 + 16}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    opacity="0.8"
                    fontFamily="Inter, system-ui"
                  >
                    {s.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex-shrink-0 w-64 space-y-1 pt-1">
          {stages.map((s) => (
            <div
              key={s.label}
              className="flex items-start gap-2"
              style={{ minHeight: 70 }}
            >
              <div className="w-1 h-10 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: s.color }} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] font-bold text-[#0C2340]">{s.label}</p>
                  {s.drop && (
                    <span className="text-[10px] font-bold text-red-600 tabular-nums">
                      {s.drop}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
        {metrics.map((m) => (
          <div key={m.k} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{m.k}</p>
            <p className="text-xl font-bold text-[#0C2340] mt-0.5">{m.v}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{m.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FUNNELS = {
  preApproval: {
    tabLabel: "Pre-approval",
    kicker: "Pre-approval",
    title: "Monthly lead funnel — 8 000 to 158",
    description:
      "How BB Direct turns raw leads into granted bonds. The 50% credit drop-off is the single biggest leak, but the step from credit-passed to application is where MyHome has the most room to lift conversion.",
    stages: [
      { label: "Leads", value: 8000, color: "#0C2340", note: "Inbound monthly", drop: null as string | null },
      { label: "Credit passed", value: 4000, color: "#1E3A5F", note: "poor credit · 4 000 drop off", drop: "−50%" },
      { label: "Applications", value: 200, color: "#3DBFAD", note: "~5% of credit-passed apply · 3 800 drop off", drop: "−95%" },
      { label: "Granted", value: 158, color: "#10B981", note: "~79% grant rate · 42 drop off", drop: "−21%" },
    ],
    metrics: [
      { k: "End-to-end conversion", v: "2.0%", s: "158 ÷ 8 000 leads" },
      { k: "Credit drop-off", v: "50%", s: "Biggest single leak" },
      { k: "Apply rate (of credit-passed)", v: "5%", s: "200 ÷ 4 000" },
      { k: "Grant rate (of applications)", v: "79%", s: "158 ÷ 200" },
    ],
  },
  straight: {
    tabLabel: "Straight",
    kicker: "Straight · Placeholder",
    title: "Monthly straight funnel — TBD",
    description:
      "Buyers who apply directly without going through pre-approval. Placeholder numbers until we get real data from BB Direct.",
    stages: [
      { label: "Applications", value: 500, color: "#0C2340", note: "Direct monthly submissions", drop: null as string | null },
      { label: "Credit passed", value: 300, color: "#1E3A5F", note: "placeholder · 200 drop off", drop: "−40%" },
      { label: "Offers", value: 240, color: "#3DBFAD", note: "placeholder · 60 drop off", drop: "−20%" },
      { label: "Granted", value: 180, color: "#10B981", note: "placeholder · 60 drop off", drop: "−25%" },
    ],
    metrics: [
      { k: "End-to-end conversion", v: "36%", s: "placeholder" },
      { k: "Credit drop-off", v: "40%", s: "placeholder" },
      { k: "Offer rate", v: "80%", s: "placeholder" },
      { k: "Grant rate (of offers)", v: "75%", s: "placeholder" },
    ],
  },
} as const;

type FunnelKey = keyof typeof FUNNELS;

export default function BetterBondDirectGrants() {
  const [activeFunnel, setActiveFunnel] = useState<FunnelKey>("preApproval");
  const funnel = FUNNELS[activeFunnel];

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <AppHeader label="BetterBond Direct Grants" />

      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              01 Sept 25 – 28 Feb 26 · 6 months · Direct granted
            </p>
            <h3 className="text-lg font-bold text-[#0C2340] mb-4">BetterBond Direct</h3>

            <div className="mb-6 rounded-xl bg-gradient-to-br from-[#3DBFAD]/15 to-[#0C2340]/5 border-l-4 border-[#3DBFAD] p-5">
              <p className="text-[15px] sm:text-base font-bold text-[#0C2340] leading-snug">
                <span className="text-[#3DBFAD]">R1.5m+ bonds</span> are{" "}
                <span className="text-[#3DBFAD]">30% of volume</span> but{" "}
                <span className="text-[#3DBFAD]">59% of value</span>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Total granted business</p>
                <p className="text-2xl font-bold text-[#0C2340]">948</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Value</p>
                <p className="text-2xl font-bold text-[#0C2340]">R1 273 053 907</p>
              </div>
              <div className="rounded-xl bg-[#3DBFAD]/10 border border-[#3DBFAD]/30 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-[#0C2340]/70">Avg bond grants / month</p>
                <p className="text-2xl font-bold text-[#0C2340]">158</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-200">
                    <th className="py-2 pr-4 font-semibold">Value brackets</th>
                    <th className="py-2 px-2 font-semibold text-right">Volume</th>
                    <th className="py-2 px-2 font-semibold text-right">Avg / month</th>
                    <th className="py-2 px-2 font-semibold text-right">Total value</th>
                    <th className="py-2 px-2 font-semibold text-right">% of volume</th>
                    <th className="py-2 pl-2 font-semibold text-right">% of value</th>
                  </tr>
                </thead>
                <tbody>
                  {GRANTED_BRACKETS.map((r) => {
                    const maxVol = Math.max(...GRANTED_BRACKETS.map((x) => x.volume));
                    const intensity = r.volume / maxVol;
                    const volPctNum = parseFloat(r.volPct.replace(",", "."));
                    const valPctNum = parseFloat(r.valPct.replace(",", "."));
                    const maxVolPct = Math.max(...GRANTED_BRACKETS.map((x) => parseFloat(x.volPct.replace(",", "."))));
                    const maxValPct = Math.max(...GRANTED_BRACKETS.map((x) => parseFloat(x.valPct.replace(",", "."))));
                    return (
                    <tr key={r.label} className="border-b border-slate-100">
                      <td className="py-2 pr-4 text-[#0C2340]">{r.label}</td>
                      <td
                        className="py-2 px-2 text-right tabular-nums font-semibold"
                        style={{ backgroundColor: `rgba(61, 191, 173, ${intensity * 0.65})` }}
                      >
                        {r.volume}
                      </td>
                      <td
                        className="py-2 px-2 text-right tabular-nums font-semibold"
                        style={{ backgroundColor: `rgba(61, 191, 173, ${intensity * 0.65})` }}
                      >
                        {(r.volume / 6).toFixed(1)}
                      </td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.value}</td>
                      <td
                        className="py-2 px-2 text-right tabular-nums font-semibold"
                        style={{ backgroundColor: `rgba(61, 191, 173, ${(volPctNum / maxVolPct) * 0.65})` }}
                      >
                        {r.volPct}
                      </td>
                      <td
                        className="py-2 pl-2 text-right tabular-nums font-semibold"
                        style={{ backgroundColor: `rgba(99, 102, 241, ${(valPctNum / maxValPct) * 0.55})` }}
                      >
                        {r.valPct}
                      </td>
                    </tr>
                    );
                  })}
                  <tr><td colSpan={6} className="py-2" /></tr>
                  {GRANTED_SUMMARY.map((r) => {
                    const isTarget = r.label.includes("1 500 000+");
                    const bg = isTarget ? "bg-[#0C2340] text-white" : "bg-slate-50 text-[#0C2340]";
                    return (
                    <tr key={r.label} className={`font-semibold ${bg}`}>
                      <td className="py-2.5 pr-4 pl-3 first:rounded-l-md">{r.label}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{r.volume}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{(r.volume / 6).toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{r.value}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{r.volPct}</td>
                      <td className="py-2.5 pl-2 pr-3 text-right tabular-nums last:rounded-r-md">{r.valPct}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bar charts */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {([
                { title: "Volume (count)", color: "#0C2340", values: GRANTED_BRACKETS.map((r) => ({ label: r.label, n: r.volume, display: String(r.volume) })) },
                { title: "Avg volume / month", color: "#6366F1", values: GRANTED_BRACKETS.map((r) => ({ label: r.label, n: r.volume / 6, display: (r.volume / 6).toFixed(1) })) },
              ] as const).map((chart) => {
                const max = Math.max(...chart.values.map((v) => v.n));
                return (
                  <div key={chart.title} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">
                      {chart.title}
                    </p>
                    <div className="flex items-end gap-2 h-56 border-b border-slate-200 pb-1">
                      {chart.values.map((v) => (
                        <div key={v.label} className="flex-1 flex flex-col items-center justify-end h-full">
                          <span className="text-[10px] font-semibold mb-1" style={{ color: chart.color }}>
                            {v.display}
                          </span>
                          <div
                            className="w-full rounded-t"
                            style={{ height: `${(v.n / max) * 100}%`, backgroundColor: chart.color }}
                            title={`${v.label}: ${v.display}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2 h-24">
                      {chart.values.map((v) => (
                        <div key={v.label} className="flex-1 relative">
                          <span
                            className="absolute left-1/2 top-1 text-[10px] text-slate-500 whitespace-nowrap origin-top-left"
                            style={{ transform: "rotate(35deg)" }}
                          >
                            {v.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead funnel — tabbed */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex gap-1 mb-6 p-1 bg-slate-100 rounded-lg w-fit">
              {(Object.keys(FUNNELS) as FunnelKey[]).map((key) => {
                const isActive = key === activeFunnel;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFunnel(key)}
                    className={`px-4 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${
                      isActive
                        ? "bg-white text-[#0C2340] shadow-sm"
                        : "text-slate-500 hover:text-[#0C2340]"
                    }`}
                  >
                    {FUNNELS[key].tabLabel}
                  </button>
                );
              })}
            </div>

            <LeadFunnel
              kicker={funnel.kicker}
              title={funnel.title}
              description={funnel.description}
              stages={[...funnel.stages]}
              metrics={[...funnel.metrics]}
            />
          </div>

          {/* Affordability headroom analysis */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              BetterBond Direct · 01 Sept 25 – 31 March 26 · 7 months · OTP linked to Pre-Approval
            </p>
            <h3 className="text-lg font-bold text-[#0C2340] mb-5">
              Affordability margin — the F&I opportunity
            </h3>
            <div className="mb-6 rounded-xl bg-gradient-to-br from-[#3DBFAD]/15 to-[#0C2340]/5 border-l-4 border-[#3DBFAD] p-5">
              <p className="text-[15px] sm:text-base font-bold text-[#0C2340] leading-snug">
                The typical buyer uses only{" "}
                <span className="text-[#3DBFAD]">~70% of their Pre-Approval</span> — leaving{" "}
                <span className="text-[#3DBFAD]">R235k (~30%)</span> of already-approved wallet
                on the table.
              </p>
            </div>

            {/* Top stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                { k: "Deals analysed", v: "1 705", s: "Pre-Approval-linked OTPs" },
                { k: "With margin", v: "75.4%", s: "1 274 deals · Pre-Approval > OTP" },
                { k: "Median margin", v: "R235k", s: "of deals with margin" },
                { k: "Median % unused", v: "30.2%", s: "of Pre-Approval affordability" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl bg-[#3DBFAD]/10 border border-[#3DBFAD]/30 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">{m.k}</p>
                  <p className="text-2xl font-bold text-[#0C2340] mt-0.5">{m.v}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{m.s}</p>
                </div>
              ))}
            </div>

            {/* Stage conversion */}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Stage conversion · Pre-Approval → Registration
            </p>
            <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              {(() => {
                const STAGES = [
                  { label: "Pre-Approval issued", count: 1705, pct: 100.0, color: "#0C2340" },
                  { label: "OTP received", count: 1690, pct: 99.1, color: "#1E3A5F" },
                  { label: "Submitted to bank", count: 1574, pct: 92.3, color: "#3DBFAD" },
                  { label: "Granted", count: 1291, pct: 75.7, color: "#10B981" },
                  { label: "Registered", count: 667, pct: 39.1, color: "#6366F1" },
                ];
                return (
                  <div className="space-y-2">
                    {STAGES.map((s, i) => {
                      const prev = i === 0 ? null : STAGES[i - 1];
                      const stepPct = prev ? (s.count / prev.count) * 100 : null;
                      return (
                        <div key={s.label} className="flex items-center gap-4">
                          <div className="w-40 flex-shrink-0">
                            <p className="text-[12px] font-bold text-[#0C2340]">{s.label}</p>
                            {stepPct !== null && (
                              <p className="text-[10px] text-slate-500">
                                {stepPct.toFixed(1)}% of prev
                              </p>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="relative h-7 rounded-md bg-slate-100 overflow-hidden">
                              <div
                                className="absolute inset-y-0 left-0 flex items-center px-3 text-white text-[11px] font-bold"
                                style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                              >
                                {s.count.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="w-16 text-right tabular-nums text-[11px] font-semibold text-[#0C2340]">
                            {s.pct.toFixed(1)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
              <p className="text-[10px] text-slate-500 mt-4 italic">
                Registration lag — many grants post-March haven't registered yet. Grant → Registered doesn't mean "lost".
              </p>
            </div>

            {/* Headroom distribution */}
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Affordability margin distribution · Pre-Approval minus OTP
            </p>
            <div className="mb-8 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              {(() => {
                const BUCKETS = [
                  { label: "Stretched (Pre-Approval < OTP)", count: 416, pct: 24.6, color: "#ef4444", note: "co-applicants · extra income" },
                  { label: "R0 – 50k", count: 131, pct: 7.8, color: "#94a3b8", note: "too thin for F&I" },
                  { label: "R50k – 150k", count: 182, pct: 10.8, color: "#3DBFAD", note: "light bundle" },
                  { label: "R150k – 500k", count: 395, pct: 23.4, color: "#0C9488", note: "core F&I zone", highlight: true },
                  { label: "R500k – 1m", count: 265, pct: 15.7, color: "#0C2340", note: "rich F&I zone" },
                  { label: "R1m – 2m", count: 202, pct: 12.0, color: "#1E3A5F", note: "premium" },
                  { label: "R2m+", count: 99, pct: 5.9, color: "#6366F1", note: "luxury headroom" },
                ];
                const max = Math.max(...BUCKETS.map((b) => b.pct));
                return (
                  <div className="space-y-2">
                    {BUCKETS.map((b) => (
                      <div key={b.label} className="flex items-center gap-4">
                        <div className="w-44 flex-shrink-0">
                          <p className={`text-[12px] font-bold ${b.highlight ? "text-[#3DBFAD]" : "text-[#0C2340]"}`}>
                            {b.label}
                          </p>
                          <p className="text-[10px] text-slate-500">{b.note}</p>
                        </div>
                        <div className="flex-1">
                          <div className="relative h-6 rounded-md bg-slate-100 overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 flex items-center px-2 text-white text-[10px] font-bold"
                              style={{ width: `${(b.pct / max) * 100}%`, backgroundColor: b.color }}
                            >
                              {b.count.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="w-16 text-right tabular-nums text-[11px] font-semibold text-[#0C2340]">
                          {b.pct.toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100">
                <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">≥ R50k margin</p>
                  <p className="text-lg font-bold text-[#0C2340]">1 143 · 67.6%</p>
                  <p className="text-[10px] text-slate-500">"something fits"</p>
                </div>
                <div className="rounded-lg bg-[#3DBFAD]/10 border border-[#3DBFAD]/30 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-[#0C2340]/70">≥ R150k margin</p>
                  <p className="text-lg font-bold text-[#0C2340]">961 · 56.9%</p>
                  <p className="text-[10px] text-slate-500">meaningful F&I bundle capacity</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">≥ R500k margin</p>
                  <p className="text-lg font-bold text-[#0C2340]">566 · 33.5%</p>
                  <p className="text-[10px] text-slate-500">richer F&I attach</p>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InsightBlock
                title="The headline"
                accent
                headline={{ value: "57%", label: "of deals have ≥ R150k unused affordability" }}
                points={[
                  "«961» deals over 7 months — already qualified, already in the book.",
                  "Median «R235k» margin on the positive-margin cohort.",
                  "MyHome's F&I bundle doesn't need new demand — it sits on existing capacity.",
                ]}
              />
              <InsightBlock
                title="The Pre-Approval isn't a ceiling"
                headline={{ value: "24.6%", label: "bought above their Pre-Approval" }}
                points={[
                  "«416» deals where the OTP exceeded the Pre-Approval — deal restructured with co-applicants or additional income.",
                  "Separate cohort — not F&I target. They're solving for qualification, not extras.",
                ]}
              />
              <InsightBlock
                title="Banks sweeten"
                headline={{ value: "24.6%", label: "granted MORE than OTP" }}
                points={[
                  "«316» deals where the bank offered above the OTP amount.",
                  "Evidence that there's real underwriting appetite beyond the buyer's self-selected price.",
                  "Another pool of \"more money available\" to bundle against.",
                ]}
              />
              <InsightBlock
                title="Where to start"
                headline={{ value: "R150k – R1m", label: "margin · 39% of all OTPs" }}
                points={[
                  "«660» deals land in the sweet spot — big enough to matter, common enough to scale.",
                  "Median deal value in this band ≈ R1.1m — the bulk of BB Direct's grants sit here.",
                ]}
              />
              <InsightBlock
                title="The registration lag"
                headline={{ value: "39%", label: "of Pre-Approvals have registered (so far)" }}
                points={[
                  "«667» of «1 705» registered through 31 Mar 26.",
                  "Registration takes «60–90 days» — the grant → reg gap is timing, not failure.",
                  "True registration rate of granted deals is likely closer to «80%» once the tail matures.",
                ]}
              />
              <InsightBlock
                title="What to bring to Di"
                headline={{ value: "R235k × 961", label: "median margin × deals in zone" }}
                points={[
                  "The «R150k+» bucket × 7 months = «~137/month» deals with F&I-sized wallet.",
                  "Even a «10% attach» at R15k avg = «~R205k/month» in F&I revenue from a single BB Direct pilot.",
                  "Ask Di for segmentation by channel (Smart Service dominates — 76%).",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <AppFooter label="Internal view · Not for distribution" />
    </div>
  );
}
