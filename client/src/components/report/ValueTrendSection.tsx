/*
 * ValueTrendSection — Property value over time
 * MyHome branded: Navy #0C2340, Teal #3DBFAD, white bg
 * Plus Jakarta Sans headings, Inter body
 * Responsive chart: fewer X-axis labels on mobile, reduced height
 */

import { useState, useEffect } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { valueHistory, formatRand, ownerProperty } from "@/lib/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

const chartData = valueHistory.map((d) => ({
  ...d,
  date: `${d.month} ${d.year}`,
  shortDate: `${d.month.slice(0, 3)} '${d.year.slice(2)}`,
}));

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

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-border px-4 py-3 text-sm">
      <p className="text-muted-foreground text-xs mb-1">
        {d.month} {d.year}
      </p>
      <p className="font-heading font-bold text-lg text-foreground">{formatRand(d.value)}</p>
      {d.label && (
        <p className="text-[#3DBFAD] text-xs font-medium mt-1">{d.label}</p>
      )}
    </div>
  );
}

export function ValueTrendSection() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 1024;

  const purchaseValue = ownerProperty.purchasePrice;
  const currentValue = ownerProperty.currentValue;
  const annualReturn = (
    (Math.pow(currentValue / purchaseValue, 1 / 7) - 1) *
    100
  ).toFixed(1);

  const labelledPoints = chartData.filter((d) => d.label);

  // On mobile show every 6th label, tablet every 4th, desktop every 3rd
  const xInterval = isMobile ? 6 : isTablet ? 4 : 3;
  const chartHeight = isMobile ? 260 : isTablet ? 320 : 360;
  const yAxisWidth = isMobile ? 50 : 65;

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <SectionReveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
              Your Property's Journey
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              How your home's estimated value has changed since you purchased it in March 2019.
              Your property has delivered a compound annual return of{" "}
              <strong className="text-foreground">{annualReturn}%</strong>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>7 years of data</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#3DBFAD]">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-medium">+{formatRand(currentValue - purchaseValue)}</span>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="bg-white rounded-xl border border-border p-3 sm:p-4 lg:p-6">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart
              data={chartData}
              margin={{
                top: 15,
                right: isMobile ? 8 : 20,
                bottom: 5,
                left: isMobile ? 0 : 10,
              }}
            >
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3DBFAD" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#3DBFAD" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={isMobile ? "shortDate" : "date"}
                tick={{ fontSize: isMobile ? 10 : 11, fill: "#5A7A9A" }}
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
                tickFormatter={(v: number) =>
                  isMobile
                    ? `R${(v / 1_000_000).toFixed(1)}m`
                    : `R${(v / 1_000_000).toFixed(1)}m`
                }
                domain={["dataMin - 50000", "dataMax + 50000"]}
                width={yAxisWidth}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0C2340"
                strokeWidth={isMobile ? 2 : 2.5}
                fill="url(#valueGradient)"
                animationDuration={2000}
                animationEasing="ease-out"
              />
              {labelledPoints.map((pt) => (
                <ReferenceDot
                  key={pt.date}
                  x={isMobile ? pt.shortDate : pt.date}
                  y={pt.value}
                  r={isMobile ? 4 : 5}
                  fill="#3DBFAD"
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend / annotations */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
            {labelledPoints.map((pt) => (
              <div key={pt.date} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0C2340]" />
                <span className="text-muted-foreground">
                  {pt.label} — {pt.month} {pt.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
