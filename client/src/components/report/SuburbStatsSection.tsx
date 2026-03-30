/*
 * SuburbStatsSection — Key suburb metrics in editorial stat cards
 * Warm neutrals, teal accent, big numbers with context
 */

import { SectionReveal } from "@/components/SectionReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { suburbStats, formatRand } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Clock, BarChart3, Home, Activity, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  change: string;
  changePositive: boolean;
  context: string;
  delay: number;
}

function StatCard({ icon, label, value, change, changePositive, context, delay }: StatCardProps) {
  return (
    <SectionReveal delay={delay}>
      <div className="bg-white rounded-xl border border-border p-3.5 sm:p-5 lg:p-6 hover:shadow-md hover:shadow-black/[0.03] transition-shadow duration-300 overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD]">
            {icon}
          </div>
          <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-medium">{label}</span>
        </div>
        <div className="font-heading font-bold text-lg sm:text-2xl lg:text-3xl text-foreground mb-1 break-words">
          {value}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              changePositive
                ? "bg-[#3DBFAD]/10 text-[#3DBFAD]"
                : "bg-red-50 text-red-600"
            }`}
          >
            {changePositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </span>
          <span className="text-muted-foreground text-xs">{context}</span>
        </div>
      </div>
    </SectionReveal>
  );
}

export function SuburbStatsSection() {
  return (
    <section className="bg-[#f0f5fa] py-10 sm:py-12 lg:py-16">
      <div className="container">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
                Fourways at a Glance
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg">
                Key market indicators for your suburb over the last 12 months. These numbers help you understand how the local market is performing.
              </p>
            </div>

            {/* Suburb sentiment badge */}
            <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-1">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Suburb Sentiment</span>
              <div className="flex items-center gap-2 bg-white border border-[#3DBFAD]/30 rounded-xl px-4 py-2.5 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-[#3DBFAD]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-[#0C2340] leading-none mb-0.5">Trending Up</p>
                  <p className="text-[11px] text-muted-foreground leading-none">Seller's market · Strong demand</p>
                </div>
                <div className="ml-1 flex gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${i <= 4 ? "bg-[#3DBFAD]" : "bg-[#3DBFAD]/20"}`}
                      style={{ height: `${8 + i * 4}px`, alignSelf: "flex-end" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          <StatCard
            icon={<Home className="w-4 h-4" />}
            label="Median Sale Price"
            value={
              <AnimatedCounter
                value={suburbStats.medianPrice}
                formatter={(n) => formatRand(n)}
              />
            }
            change={`+${suburbStats.medianPriceChange}%`}
            changePositive={true}
            context="vs last year"
            delay={0.05}
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="Avg Days on Market"
            value={
              <AnimatedCounter
                value={suburbStats.avgDaysOnMarket}
                suffix=" days"
              />
            }
            change={`${suburbStats.avgDaysOnMarketChange} days`}
            changePositive={true}
            context="selling faster"
            delay={0.1}
          />
          <StatCard
            icon={<BarChart3 className="w-4 h-4" />}
            label="Sales (12 months)"
            value={
              <AnimatedCounter value={suburbStats.totalSalesLast12Months} />
            }
            change={`+${suburbStats.totalSalesChange}%`}
            changePositive={true}
            context="more transactions"
            delay={0.15}
          />
          <StatCard
            icon={<Activity className="w-4 h-4" />}
            label="Price per m²"
            value={
              <AnimatedCounter
                value={suburbStats.avgPricePerSqm}
                prefix="R"
              />
            }
            change={`+${suburbStats.pricePerSqmChange}%`}
            changePositive={true}
            context="year-on-year"
            delay={0.2}
          />
          <StatCard
            icon={<TrendingUp className="w-4 h-4" />}
            label="Buyer Demand"
            value={
              <>
                <AnimatedCounter value={78} />
                <span className="text-base text-muted-foreground font-sans">/100</span>
              </>
            }
            change="High"
            changePositive={true}
            context="demand index"
            delay={0.25}
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="Months of Stock"
            value={
              <AnimatedCounter
                value={21}
                formatter={(n) => (n / 10).toFixed(1)}
              />
            }
            change="Seller's market"
            changePositive={true}
            context="< 3 months = strong"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
