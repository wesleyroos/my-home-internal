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
  annotation?: string;
  tooltip?: string;
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
  const MIN_W = 22;
  const MAX_W = 100;
  const steps = Math.max(stages.length - 1, 1);
  const WIDTHS = stages.map((_, i) => MAX_W - ((MAX_W - MIN_W) / steps) * i);
  const H = 74;
  const GAP = 2;
  const VB_W = 560;
  const VB_H = stages.length * (H + GAP);
  const CX = VB_W / 2;
  const TOP_OFFSET = 36;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [leadsValue, setLeadsValue] = useState<number>(stages[0].value);

  const baseValue = stages[0].value;
  const effectiveValues = stages.map((s, i) =>
    i === 0 ? leadsValue : Math.round((leadsValue * s.value) / baseValue)
  );
  const resolveAnnotation = (raw: string | undefined, i: number) => {
    if (!raw) return undefined;
    const diff = effectiveValues[0] - effectiveValues[i];
    return raw.replace(/\{diff\}/g, diff.toLocaleString());
  };

  return (
    <div className="flex flex-col">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
        {kicker}
      </p>
      <h3 className="text-lg font-bold text-[#0C2340] mb-1">{title}</h3>
      <p className="text-[13px] text-slate-600 mb-4 max-w-3xl">{description}</p>

      <div className="flex items-center gap-3 mb-5">
        <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Monthly {stages[0].label.toLowerCase()}:
        </label>
        <input
          type="number"
          value={leadsValue}
          onChange={(e) => setLeadsValue(Math.max(0, Number(e.target.value) || 0))}
          className="w-28 px-2 py-1 border border-slate-300 rounded text-[13px] font-bold tabular-nums text-[#0C2340] focus:outline-none focus:border-[#3DBFAD]"
        />
        <span className="text-[11px] text-slate-500 italic">
          Edit to scale the funnel — percentages stay fixed, counts recalculate.
        </span>
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-1 max-w-[560px] pt-[36px] relative">
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
              const effValue = effectiveValues[i];
              const resolvedAnno = resolveAnnotation(s.annotation, i);
              const valueLabel = resolvedAnno
                ? `${effValue.toLocaleString()} (${resolvedAnno})`
                : effValue.toLocaleString();
              return (
                <g
                  key={s.label}
                  onMouseEnter={() => s.tooltip && setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{ cursor: s.tooltip ? "help" : "default" }}
                >
                  <polygon points={points} fill={s.color} />
                  <text
                    x={CX}
                    y={y0 + H / 2 - 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={resolvedAnno ? "16" : "22"}
                    fontWeight="700"
                    fontFamily="Inter, system-ui"
                    pointerEvents="none"
                  >
                    {valueLabel}
                  </text>
                  <text
                    x={CX}
                    y={y0 + H / 2 + 16}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    opacity="0.8"
                    fontFamily="Inter, system-ui"
                    pointerEvents="none"
                  >
                    {s.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {hoveredIdx !== null && stages[hoveredIdx].tooltip && (
            <div
              className="absolute z-20 pointer-events-none bg-[#0C2340] text-white rounded-lg shadow-xl px-4 py-3 w-[300px]"
              style={{
                top: TOP_OFFSET + hoveredIdx * (H + GAP) + (H + GAP) / 2,
                right: "calc(100% + 12px)",
                transform: "translateY(-50%)",
              }}
            >
              <div
                className="absolute w-2 h-2 rotate-45 bg-[#0C2340]"
                style={{ right: -4, top: "calc(50% - 4px)" }}
              />
              <p className="text-[12px] font-bold uppercase tracking-wide text-white/60 mb-1">
                {stages[hoveredIdx].label}
              </p>
              <p className="text-[13px] leading-snug">
                {stages[hoveredIdx].tooltip}
              </p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 w-[360px]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#0C2340]" style={{ height: 36 }}>
                <th className="border border-[#0C2340] px-2 py-0 text-left font-bold text-white">Stage</th>
                <th className="border border-[#0C2340] px-2 py-0 text-right font-bold text-white w-[60px]">Count</th>
                <th className="border border-[#0C2340] px-2 py-0 text-right font-bold text-white w-[70px]">% of total</th>
                <th className="border border-[#0C2340] px-2 py-0 text-right font-bold text-white w-[70px]">% of prev</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((s, i) => {
                const effValue = effectiveValues[i];
                const prevEff = i === 0 ? null : effectiveValues[i - 1];
                const stepPct = prevEff ? (effValue / prevEff) * 100 : 100;
                const totalPct = (effValue / effectiveValues[0]) * 100;
                const prev = i === 0 ? null : stages[i - 1];
                return (
                  <tr key={s.label} className={i % 2 === 1 ? "bg-slate-50" : ""} style={{ height: H + GAP }}>
                    <td
                      className="border px-2 py-1.5 font-semibold text-white"
                      style={{ backgroundColor: s.color, borderColor: s.color }}
                    >
                      {s.label}
                    </td>
                    <td className="border border-slate-300 px-2 py-1.5 text-right tabular-nums font-semibold text-[#0C2340]">
                      {effValue.toLocaleString()}
                    </td>
                    <td className="border border-slate-300 px-2 py-1.5 text-right tabular-nums text-slate-700">
                      {totalPct.toFixed(1)}%
                    </td>
                    <td className={`border border-slate-300 px-2 py-1.5 text-right tabular-nums ${
                      prev ? (stepPct < 100 ? "text-rose-600 font-semibold" : "text-emerald-600 font-semibold") : "text-slate-400"
                    }`}>
                      {prev ? `${stepPct.toFixed(0)}%` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
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
    title: "Monthly lead funnel — 8 000 to 173",
    description:
      "How BB Direct turns raw leads into registered bonds via the pre-approval route. The 50% credit drop-off is the biggest single leak, and the gap from Pre-approval issued to OTPs is the next big fall-off.",
    stages: [
      { label: "Leads",                value: 8000, color: "#0C2340", note: "Inbound monthly leads",                          drop: null as string | null,
        tooltip: "Total inbound leads per month from BetterBond Direct's marketing channels — partner agents, web enquiries, and direct referrals." },
      { label: "Go to Pre-approval",   value: 7440, color: "#1E3A5F", note: "560 never start PA · 93% continue",              drop: "−7%", annotation: "{diff} go straight to bond lead →",
        tooltip: "Leads who enter the pre-approval process — consent to credit check, submit income docs. The 560 who don't go here skip straight to a bond application against a specific property." },
      { label: "Credit passed",        value: 3720, color: "#2F5F7D", note: "50% fail credit check · 3 720 drop off",         drop: "−50%",
        tooltip: "Leads who pass the credit bureau check. The other 50% fail on credit history, existing arrears, or insufficient affordability — this is the single biggest leak in the funnel." },
      { label: "Pre-approval issued",  value: 1120, color: "#3DBFAD", note: "70% of credit-passed don't complete PA",         drop: "−70%",
        tooltip: "Buyers issued a formal Pre-Approval certificate stating the bond amount banks would theoretically approve. 2 600 credit-passed leads drop off here — usually because they stall, lose interest, or fail a secondary affordability check." },
      { label: "Offers (OTPs)",        value:  257, color: "#0C9488", note: "23% of PA issued turn into offers",              drop: "−77%",
        tooltip: "Pre-approved buyers who sign an Offer to Purchase on an actual property. Most never find a suitable home in time, or the PA expires before they transact." },
      { label: "Submitted to bank",    value:  239, color: "#6366F1", note: "93% of offers go to bank",                       drop: "−7%",
        tooltip: "OTPs submitted to a bank for formal bond application. Nearly all PA-backed offers go to bank — the 7% drop is admin or customer withdrawal." },
      { label: "Accepted by customer", value:  193, color: "#10B981", note: "80% accept the bank's grant",                    drop: "−19%",
        tooltip: "Bank grants a bond and the customer formally accepts the quote. ~20% decline — usually due to cheaper finance elsewhere, a better competing offer, or the deal falling through." },
      { label: "Registered",           value:  173, color: "#059669", note: "90% of accepted complete registration",          drop: "−10%",
        tooltip: "Bond is registered at the Deeds Office and funds disbursed — the final outcome. The ~10% tail is timing lag (60–90 days post-grant) or late cancellations before registration." },
    ],
    metrics: [
      { k: "End-to-end conversion",         v: "2.2%", s: "173 ÷ 8 000 leads" },
      { k: "Credit pass rate",              v: "50%",  s: "3 720 ÷ 7 440 applicants" },
      { k: "PA issue rate (of credit-passed)", v: "30%", s: "1 120 ÷ 3 720" },
      { k: "Registration rate (of accepted)", v: "90%", s: "173 ÷ 193" },
    ],
  },
  straight: {
    tabLabel: "Straight to bond",
    kicker: "Straight to bond",
    title: "Monthly straight-to-bond funnel — 8 000 to 39",
    description:
      "Same 8 000 lead pool as the pre-approval route. Only 7% (560) skip pre-approval and go straight to a bond. Narrower top of funnel, but meaningfully higher conversion per bond lead (7%).",
    stages: [
      { label: "Leads",                value: 8000, color: "#0C2340", note: "Same inbound lead pool as the pre-approval route",          drop: null as string | null,
        tooltip: "The same 8 000 monthly inbound leads feeding the pre-approval route. Both funnels share this top-of-funnel pool." },
      { label: "Go straight to bond",  value:  560, color: "#1E3A5F", note: "7% of leads skip pre-approval · 7 440 go to PA route",       drop: "−93%",
        tooltip: "Leads who skip pre-approval entirely and submit a bond application tied to a specific property they've already decided on. Often agent-led or buyers with strong conviction." },
      { label: "Offers (OTPs)",        value:  108, color: "#3DBFAD", note: "19% of bond leads turn into offers",                         drop: "−81%",
        tooltip: "Straight-to-bond leads who sign an Offer to Purchase. Conversion is lower than the PA route because these buyers haven't been pre-vetted for affordability." },
      { label: "Submitted to bank",    value:   81, color: "#6366F1", note: "75% of offers submitted",                                    drop: "−25%",
        tooltip: "OTPs submitted to a bank for a formal bond decision. 25% of offers never make it to bank — usually because affordability gaps surface during document prep." },
      { label: "Accepted by customer", value:   49, color: "#10B981", note: "60% accept · 32 decline (40% decline rate)",                 drop: "−40%",
        tooltip: "Customer accepts the bank's grant. 40% decline — significantly higher than the PA route, because these buyers often discover their grant is less favourable than expected (lower LTV, higher rate)." },
      { label: "Registered",           value:   39, color: "#059669", note: "80% of accepted complete registration",                      drop: "−20%",
        tooltip: "Bond registered at the Deeds Office — the final outcome. 20% of accepted bonds don't complete, either due to timing lag or deal cancellation before registration." },
    ],
    metrics: [
      { k: "End-to-end conversion",         v: "0.5%", s: "39 ÷ 8 000 leads" },
      { k: "Conversion (of bond leads)",    v: "7.0%", s: "39 ÷ 560" },
      { k: "Customer accept rate",          v: "60%",  s: "49 ÷ 81 submits" },
      { k: "Registration rate (of accepted)", v: "80%", s: "39 ÷ 49" },
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
                <span className="text-[#3DBFAD]">Bond values of R1.5m and up</span>, are{" "}
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

          {/* Home Loan Funnel Dashboard — spreadsheet style */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-2xl font-bold text-[#0C2340] mb-1">
              Home Loan Funnel Dashboard
            </h3>
            <p className="text-[13px] text-slate-500 mb-8 italic">
              Pre-approval → OTP → Submission → Grant → Registration
            </p>

            {/* Section: Headline numbers */}
            <div className="mb-8">
              <p className="text-[14px] font-bold text-[#0C2340] mb-3">
                Headline numbers (registered cohort)
              </p>
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#0C2340]">
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Avg pre-approval</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Avg registered</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Avg headroom</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Registered deals</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Avg shrinkage PA→OTP</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Median headroom</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-[#0C2340]">1,788,332.64</td>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-[#0C2340]">1,351,930.02</td>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-[#0C2340]">436,402.62</td>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-[#0C2340]">667</td>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-rose-600">−440,323.03</td>
                    <td className="border border-slate-300 px-3 py-2 tabular-nums text-[#0C2340]">255,717.31</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section: Average amount at each stage */}
            <div className="mb-8">
              <p className="text-[14px] font-bold text-[#0C2340] mb-3">
                Average amount at each stage (registered cohort)
              </p>
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#0C2340]">
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white w-[140px]">Stage</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white">Mean</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white">Median</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white">Min</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white">Max</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white w-[80px]">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Pre-approval", mean: 1_788_332.64, median: 1_489_522.59, min:   147_357.99, max: 10_380_557.38, count: 667 },
                    { label: "OTP",          mean: 1_348_066.28, median: 1_107_500.00, min:         1.00, max:  6_400_000.00, count: 666 },
                    { label: "Submission",   mean: 1_332_006.38, median: 1_100_000.00, min:     1_310.00, max:  5_750_000.00, count: 667 },
                    { label: "Grant",        mean: 1_351_900.69, median: 1_130_000.00, min:   100_000.00, max:  5_290_000.00, count: 667 },
                    { label: "Registration", mean: 1_351_930.02, median: 1_130_000.00, min:   100_000.00, max:  5_290_000.00, count: 667 },
                  ].map((s, i) => (
                    <tr key={s.label} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                      <td className="border border-slate-300 px-3 py-2 font-bold text-[#0C2340]">{s.label}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">{s.mean.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">{s.median.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-slate-600">{s.min.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-slate-600">{s.max.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">{s.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section: Change at each step */}
            <div className="mb-8">
              <p className="text-[14px] font-bold text-[#0C2340] mb-3">
                Change at each step (registered cohort)
              </p>
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#0C2340]">
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white w-[200px]">Step</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white w-[160px]">Avg change (R)</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white w-[120px]">Direction</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">What it means</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { step: "PA → OTP",              change: -440_323.03, dir: "drop", meaning: "Customer picks property below ceiling" },
                    { step: "OTP → Submission",      change:  -15_313.64, dir: "drop", meaning: "Minor application tweak" },
                    { step: "Submission → Grant",    change:  +19_894.31, dir: "gain", meaning: "Bank decision (often grants more)" },
                    { step: "Grant → Registration",  change:      +29.33, dir: "gain", meaning: "Registered as granted" },
                  ].map((r, i) => {
                    const isDrop = r.dir === "drop";
                    const num = r.change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    return (
                      <tr key={r.step} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                        <td className="border border-slate-300 px-3 py-2 font-bold text-[#0C2340]">{r.step}</td>
                        <td className={`border border-slate-300 px-3 py-2 text-right tabular-nums font-semibold ${isDrop ? "text-rose-600" : "text-emerald-600"}`}>
                          {num}
                        </td>
                        <td className={`border border-slate-300 px-3 py-2 font-semibold ${isDrop ? "text-rose-600" : "text-emerald-600"}`}>
                          {isDrop ? "▼ Drop" : "▲ Gain"}
                        </td>
                        <td className="border border-slate-300 px-3 py-2 text-slate-700">{r.meaning}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Section: Headroom distribution */}
            <div className="mb-6">
              <p className="text-[14px] font-bold text-[#0C2340] mb-3">
                Headroom distribution: how much affordability is left over?
              </p>
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#0C2340]">
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Headroom bucket</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white w-[110px]">Deal count</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-right font-bold text-white w-[110px]">% of cohort</th>
                    <th className="border border-[#0C2340] px-3 py-2 text-left font-bold text-white">Product implication</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Overshot (registered > PA)", count: 160, pct: 0.23988,   implication: "Risk-reducing add-ons only" },
                    { label: "R0 – R250k",                  count: 168, pct: 0.251874,  implication: "Small-ticket bolt-ons" },
                    { label: "R250k – R500k",               count: 112, pct: 0.167916,  implication: "Core F&I market" },
                    { label: "R500k – R1M",                 count: 116, pct: 0.173913,  implication: "Core F&I market" },
                    { label: "R1M – R2M",                   count:  75, pct: 0.112444,  implication: "High-value bolt-ons" },
                    { label: "R2M+",                        count:  36, pct: 0.053973,  implication: "High-value, validate appetite" },
                  ].map((b, i) => (
                    <tr key={b.label} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                      <td className="border border-slate-300 px-3 py-2 font-bold text-[#0C2340]">{b.label}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">{b.count}</td>
                      <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">{(b.pct * 100).toFixed(1)}%</td>
                      <td className="border border-slate-300 px-3 py-2 text-slate-700">{b.implication}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#3DBFAD]/15 font-bold">
                    <td className="border border-slate-300 px-3 py-2 text-[#0C2340]">Total</td>
                    <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">667</td>
                    <td className="border border-slate-300 px-3 py-2 text-right tabular-nums text-[#0C2340]">100.0%</td>
                    <td className="border border-slate-300 px-3 py-2" />
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 italic pt-2">
              Source: BetterBond Direct opportunities export · n = 1,705 opportunities; 667 reached registration.
              All averages computed on the registered cohort.
            </p>
          </div>
        </div>
      </section>

      <AppFooter label="Internal view · Not for distribution" />
    </div>
  );
}
