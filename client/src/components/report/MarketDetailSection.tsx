/*
 * MarketDetailSection — Lightstone-style market depth layer
 * Three blocks: suburb ranking, period of ownership, 10-year segment trend (Freehold vs Sectional)
 * Gives the report the data authority an agent expects without losing the homeowner tone
 */

import { useState, useEffect } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import {
  suburbSegmentHistory,
  suburbRanking,
  periodOfOwnership,
  formatRand,
} from "@/lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Clock3, LineChart as LineIcon, Home, Building2 } from "lucide-react";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

function SegmentTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-border px-3 py-2.5 text-xs">
      <p className="text-muted-foreground mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 mt-0.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-foreground capitalize">
            {p.dataKey === "freehold" ? "Freehold" : "Sectional Scheme"}
          </span>
          <span className="font-semibold text-foreground ml-2">
            {formatRand(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MarketDetailSection() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const xInterval = isMobile ? 4 : isTablet ? 2 : 1;
  const chartHeight = isMobile ? 260 : isTablet ? 300 : 340;

  // Freehold 10-year growth
  const firstFreehold = suburbSegmentHistory[0].freehold;
  const latestFreehold = suburbSegmentHistory[suburbSegmentHistory.length - 1].freehold;
  const freeholdGrowth = (
    (Math.pow(latestFreehold / firstFreehold, 1 / 10) - 1) * 100
  ).toFixed(1);

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <SectionReveal>
        <div className="mb-6 sm:mb-8">
          <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
            Market Detail
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Deeper market data for Fourways — how the suburb ranks nationally,
            how long owners typically hold, and how property segments have
            performed over the last decade.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
        {/* ─── Suburb Ranking ─── */}
        <SectionReveal delay={0.05}>
          <div className="bg-white rounded-xl border border-border p-4 sm:p-5 lg:p-6 h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD]">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-medium">
                Suburb Ranking
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] tracking-tight">
                Top {suburbRanking.nationalPercentile}%
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">
                nationally
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-5">
              Ranked <strong className="text-foreground">#{suburbRanking.nationalRank}</strong> of{" "}
              {suburbRanking.nationalTotal.toLocaleString()} suburbs by median valuation ·{" "}
              <strong className="text-foreground">#{suburbRanking.provincialRank}</strong> in Gauteng
            </p>

            <div className="pt-4 border-t border-border">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                Nearby Suburbs
              </p>
              <div className="space-y-2">
                {suburbRanking.nearestSuburbs.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-muted-foreground tabular-nums w-9 flex-shrink-0">
                        #{s.rank}
                      </span>
                      <span className="text-foreground truncate">{s.name}</span>
                    </div>
                    <span className="text-foreground font-medium text-xs sm:text-sm whitespace-nowrap">
                      {formatRand(s.medianValuation)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-2 mt-1 border-t border-border bg-[#3DBFAD]/[0.04] -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6 py-2 rounded-b-md">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold text-[#3DBFAD] tabular-nums w-9 flex-shrink-0">
                      #{suburbRanking.nationalRank}
                    </span>
                    <span className="text-foreground font-semibold truncate">
                      Fourways
                    </span>
                  </div>
                  <span className="text-[#3DBFAD] font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {formatRand(suburbRanking.medianValuation)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ─── Period of Ownership ─── */}
        <SectionReveal delay={0.1}>
          <div className="bg-white rounded-xl border border-border p-4 sm:p-5 lg:p-6 h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD]">
                <Clock3 className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-medium">
                Period of Ownership
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] tracking-tight">
                {periodOfOwnership[0].pct}%
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">
                owners 11+ years
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-5">
              Most Fourways homeowners hold for the long haul — a signal of a
              stable, settled suburb with low turnover.
            </p>

            {/* Stacked horizontal bar */}
            <div className="pt-4 border-t border-border">
              <div className="flex h-3 rounded-full overflow-hidden mb-3">
                {periodOfOwnership.map((p) => (
                  <div
                    key={p.band}
                    style={{ width: `${p.pct}%`, background: p.color }}
                    title={`${p.band}: ${p.pct}%`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                {periodOfOwnership.map((p) => (
                  <div key={p.band} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: p.color }}
                    />
                    <span className="text-muted-foreground flex-1 truncate">
                      {p.band}
                    </span>
                    <span className="text-foreground font-semibold tabular-nums">
                      {p.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* ─── Freehold vs Sectional 10-year trend ─── */}
      <SectionReveal delay={0.15}>
        <div className="bg-white rounded-xl border border-border p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 sm:mb-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD]">
                  <LineIcon className="w-4 h-4" />
                </div>
                <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-medium">
                  10 Years of Market Data
                </span>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg lg:text-xl text-foreground">
                Freehold vs Sectional Scheme
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
                Median sale price by property segment in Fourways since 2016.
                Freehold has compounded at{" "}
                <strong className="text-foreground">{freeholdGrowth}%</strong> per
                year over the past decade.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#0C2340]" />
                <span className="w-2.5 h-0.5 bg-[#0C2340]" />
                <span className="text-muted-foreground">Freehold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#3DBFAD]" />
                <span className="w-2.5 h-0.5 bg-[#3DBFAD]" />
                <span className="text-muted-foreground">Sectional Scheme</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={suburbSegmentHistory}
              margin={{
                top: 10,
                right: isMobile ? 8 : 20,
                bottom: 5,
                left: isMobile ? 0 : 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="period"
                tick={{ fontSize: isMobile ? 9 : 11, fill: "#5A7A9A" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e2dc" }}
                interval={xInterval}
                angle={isMobile ? -35 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 50 : 30}
              />
              <YAxis
                tick={{ fontSize: isMobile ? 10 : 11, fill: "#5A7A9A" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `R${(v / 1_000_000).toFixed(1)}m`}
                width={isMobile ? 50 : 65}
                domain={["dataMin - 50000", "dataMax + 50000"]}
              />
              <Tooltip content={<SegmentTooltip />} />
              <Line
                type="monotone"
                dataKey="freehold"
                stroke="#0C2340"
                strokeWidth={isMobile ? 2 : 2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#0C2340", stroke: "white", strokeWidth: 2 }}
                animationDuration={1800}
              />
              <Line
                type="monotone"
                dataKey="sectional"
                stroke="#3DBFAD"
                strokeWidth={isMobile ? 2 : 2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#3DBFAD", stroke: "white", strokeWidth: 2 }}
                animationDuration={1800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionReveal>
    </section>
  );
}
