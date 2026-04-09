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
  // wrap anything between «» in a coloured stat pill
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
  span,
}: {
  title: string;
  headline?: { value: string; label: string };
  points: string[];
  accent?: boolean;
  span?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 flex flex-col ${
        span ? "lg:col-span-5" : ""
      } ${
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

export default function BetterBondDirectGrants() {
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
                { title: "% of total value", color: "#3DBFAD", values: GRANTED_BRACKETS.map((r) => ({ label: r.label, n: parseFloat(r.valPct.replace(",", ".")), display: r.valPct })) },
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

          {/* Lead funnel */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              BetterBond Direct
            </p>
            <h3 className="text-lg font-bold text-[#0C2340] mb-1">
              Monthly lead funnel — 8 000 to 158
            </h3>
            <p className="text-[13px] text-slate-600 mb-6 max-w-3xl">
              How BB Direct turns raw leads into granted bonds. The 50% credit drop-off
              is the single biggest leak, but the step from credit-passed to application
              is where MyHome has the most room to lift conversion.
            </p>

            {(() => {
              const STAGES = [
                { label: "Leads", value: 8000, color: "#0C2340", note: "Inbound monthly", drop: null as string | null },
                { label: "Credit passed", value: 4000, color: "#1E3A5F", note: "poor credit · 4 000 drop off", drop: "−50%" },
                { label: "Applications", value: 200, color: "#3DBFAD", note: "~5% of credit-passed apply · 3 800 drop off", drop: "−95%" },
                { label: "Granted", value: 158, color: "#10B981", note: "~79% grant rate · 42 drop off", drop: "−21%" },
              ];
              // Visual widths — not strictly proportional so the tiny stages stay readable.
              const WIDTHS = [100, 72, 42, 28];
              const H = 74;
              const GAP = 2;
              const VB_W = 560;
              const VB_H = STAGES.length * (H + GAP);
              const CX = VB_W / 2;

              return (
                <div className="flex items-start gap-6">
                  {/* Funnel SVG */}
                  <div className="flex-1 max-w-[560px]">
                    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto">
                      {STAGES.map((s, i) => {
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

                  {/* Side annotations */}
                  <div className="flex-shrink-0 w-64 space-y-1 pt-1">
                    {STAGES.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-start gap-2"
                        style={{ height: `calc((100% - ${(STAGES.length - 1) * GAP}px) / ${STAGES.length})`, minHeight: 70 }}
                      >
                        <div className="w-1 h-10 rounded-full mt-1" style={{ backgroundColor: s.color }} />
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
              );
            })()}

            {/* Funnel summary row */}
            <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
              {[
                { k: "End-to-end conversion", v: "2.0%", s: "158 ÷ 8 000 leads" },
                { k: "Credit drop-off", v: "50%", s: "Biggest single leak" },
                { k: "Apply rate (of credit-passed)", v: "5%", s: "200 ÷ 4 000" },
                { k: "Grant rate (of applications)", v: "79%", s: "158 ÷ 200" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">{m.k}</p>
                  <p className="text-xl font-bold text-[#0C2340] mt-0.5">{m.v}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{m.s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#0C2340] mb-4">Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <InsightBlock
              title="The ceiling"
              headline={{ value: "2.0%", label: "leads → grants end-to-end" }}
              points={[
                "«158» grants from «8 000» leads a month.",
                "Every insight below is a lever on this single number.",
              ]}
            />

            <InsightBlock
              title="Credit is half the funnel"
              headline={{ value: "4 000/mo", label: "lost to poor credit" }}
              points={[
                "«50%» of leads never get past credit — the biggest leak.",
                "Not a funnel fix — it's a separate TAM for credit repair / debt counselling.",
              ]}
            />

            <InsightBlock
              title="The real opportunity"
              accent
              headline={{ value: "3 800/mo", label: "credit-passed, never apply" }}
              points={[
                "Only «5%» of credit-passed leads submit an application.",
                "Lift that to «10%» → «+158 grants/month» — doubles the business with zero new leads.",
                "This is where MyHome's ROA experience + F&I bundling pays off.",
              ]}
            />

            <InsightBlock
              title="Grant rate isn't the problem"
              headline={{ value: "79%", label: "applications → grants" }}
              points={[
                "Underwriting is mostly saying yes once an application lands.",
                "Don't waste cycles downstream — focus upstream.",
              ]}
            />

            <InsightBlock
              title="Start where the value sits"
              headline={{ value: "R1.5m+", label: "58.7% of value · 30.4% of volume" }}
              points={[
                "«289/month» grants above R1.5m carry «R748m» in value.",
                "Higher-ticket buyers, richer F&I attach, better unit economics.",
                "If MyHome starts here, a small apply-rate lift compounds fast.",
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
