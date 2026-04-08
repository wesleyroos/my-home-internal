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
  { label: "0 – R3 000 000", volume: 883, value: "R990 318 750", volPct: "93,1%", valPct: "77,8%" },
  { label: "> R3 000 000",   volume: 65,  value: "R282 735 157", volPct: "6,9%",  valPct: "22,2%" },
];

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

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Total granted business</p>
                <p className="text-2xl font-bold text-[#0C2340]">948</p>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Value</p>
                <p className="text-2xl font-bold text-[#0C2340]">R1 273 053 907</p>
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
                  {GRANTED_BRACKETS.map((r) => (
                    <tr key={r.label} className="border-b border-slate-100">
                      <td className="py-2 pr-4 text-[#0C2340]">{r.label}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.volume}</td>
                      <td className="py-2 px-2 text-right tabular-nums text-slate-500">{(r.volume / 6).toFixed(1)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.value}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.volPct}</td>
                      <td className="py-2 pl-2 text-right tabular-nums">{r.valPct}</td>
                    </tr>
                  ))}
                  <tr><td colSpan={6} className="py-2" /></tr>
                  {GRANTED_SUMMARY.map((r) => (
                    <tr key={r.label} className="bg-slate-50 font-semibold">
                      <td className="py-2 pr-4 text-[#0C2340]">{r.label}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.volume}</td>
                      <td className="py-2 px-2 text-right tabular-nums text-slate-500">{(r.volume / 6).toFixed(1)}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.value}</td>
                      <td className="py-2 px-2 text-right tabular-nums">{r.volPct}</td>
                      <td className="py-2 pl-2 text-right tabular-nums">{r.valPct}</td>
                    </tr>
                  ))}
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
        </div>
      </section>

      <AppFooter label="Internal view · Not for distribution" />
    </div>
  );
}
