/*
 * PremiumSections — Blurred/locked premium content to drive registration
 * Three premium sections that show tantalising data behind a blur
 * Each has a different hook and CTA
 */

import { SectionReveal } from "@/components/SectionReveal";
import { BlurredSection } from "@/components/report/BlurredSection";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Home,
  Users,
  Shield,
  Calculator,
  Bell,
} from "lucide-react";
import { useRegistration } from "@/contexts/RegistrationContext";

/* ─── 1. Property Comparison Radar ─── */
function FakeComparisonContent() {
  const metrics = [
    { label: "Price / m²", yours: "R8,541", area: "R8,540", better: true },
    { label: "Value Growth (YoY)", yours: "11.3%", area: "6.8%", better: true },
    { label: "Erf Size", yours: "680m²", area: "695m²", better: false },
    { label: "Building Size", yours: "185m²", area: "178m²", better: true },
    { label: "Days to Sell (est.)", yours: "38", area: "54", better: true },
    { label: "Renovation ROI", yours: "High", area: "Medium", better: true },
  ];

  return (
      <div className="p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <div className="text-center p-3 sm:p-4 bg-[#3DBFAD]/10 rounded-lg">
          <p className="text-lg sm:text-2xl font-heading font-bold text-[#3DBFAD]">5/6</p>
          <p className="text-[10px] sm:text-xs text-[#3DBFAD] mt-1">Above avg</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-[#0C2340]/5 rounded-lg">
          <p className="text-lg sm:text-2xl font-heading font-bold text-[#0C2340]">Top 18%</p>
          <p className="text-[10px] sm:text-xs text-[#0C2340] mt-1">In suburb</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-lg">
          <p className="text-lg sm:text-2xl font-heading font-bold text-amber-700">R12.4k</p>
          <p className="text-[10px] sm:text-xs text-amber-600 mt-1">Equity/mo</p>
        </div>
      </div>
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 text-muted-foreground font-medium text-xs">Metric</th>
            <th className="text-right py-2 text-muted-foreground font-medium text-xs">Your Property</th>
            <th className="text-right py-2 text-muted-foreground font-medium text-xs">Area Avg</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.label} className="border-b border-border/50">
              <td className="py-2.5 text-foreground">{m.label}</td>
              <td className={`py-2.5 text-right font-medium ${m.better ? "text-[#3DBFAD]" : "text-foreground"}`}>
                {m.yours}
              </td>
              <td className="py-2.5 text-right text-muted-foreground">{m.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── 2. Equity & Mortgage Calculator ─── */
function FakeEquityContent() {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="p-4 bg-[#f0f5fa] rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Current Equity</p>
          <p className="text-2xl font-heading font-bold text-foreground">R 892,000</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">56.5% of property value</p>
        </div>
        <div className="p-4 bg-[#f0f5fa] rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Outstanding Bond</p>
          <p className="text-2xl font-heading font-bold text-foreground">R 688,000</p>
          <p className="text-xs text-muted-foreground mt-1">Est. 14 years remaining</p>
        </div>
      </div>
      <div className="p-4 bg-[#f0f5fa] rounded-lg mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Monthly Repayment at Current Rate (11.5%)</p>
        <p className="text-2xl font-heading font-bold text-foreground">R 8,245 / month</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-[#3DBFAD] rounded-full" style={{ width: "65%" }} />
          </div>
          <span className="text-xs text-muted-foreground">65% to principal</span>
        </div>
      </div>
      <div className="p-4 border border-[#3DBFAD]/20 bg-[#3DBFAD]/5 rounded-lg">
        <p className="text-sm text-[#0C2340] font-medium">If rates drop to 10.5%:</p>
        <p className="text-xs text-[#3DBFAD] mt-1">You'd save <strong>R 680/month</strong> and pay off your bond <strong>2.3 years earlier</strong></p>
      </div>
    </div>
  );
}

/* ─── 3. Neighbourhood Buyer Profile ─── */
function FakeBuyerProfileContent() {
  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <div className="text-center p-3 sm:p-4 bg-[#f0f5fa] rounded-lg">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DBFAD] mx-auto mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-heading font-bold text-foreground">34</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Avg buyer age</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-[#f0f5fa] rounded-lg">
          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DBFAD] mx-auto mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-heading font-bold text-foreground">62%</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">First-time</p>
        </div>
        <div className="text-center p-3 sm:p-4 bg-[#f0f5fa] rounded-lg">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DBFAD] mx-auto mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-heading font-bold text-foreground">27%</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Other provinces</p>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-[#f0f5fa] rounded-lg">
          <span className="text-xs sm:text-sm text-foreground">Buyer income</span>
          <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">R45k–R65k/mo</span>
        </div>
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-[#f0f5fa] rounded-lg">
          <span className="text-xs sm:text-sm text-foreground">Bond approval</span>
          <span className="text-xs sm:text-sm font-medium text-[#3DBFAD]">78%</span>
        </div>
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-[#f0f5fa] rounded-lg">
          <span className="text-xs sm:text-sm text-foreground">Top searches</span>
          <span className="text-xs sm:text-sm font-medium text-foreground">"3 bed", "garden"</span>
        </div>
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-[#f0f5fa] rounded-lg">
          <span className="text-xs sm:text-sm text-foreground">Peak viewings</span>
          <span className="text-xs sm:text-sm font-medium text-foreground">Sat 10–12</span>
        </div>
      </div>
    </div>
  );
}

export function PremiumSections() {
  const { openModal } = useRegistration();

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <SectionReveal>
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3DBFAD]" />
          </div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground">
            Premium Insights
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-lg mb-6 sm:mb-8 ml-9 sm:ml-11">
          Register for a free MyHome account to unlock detailed analysis of your property, equity position, and neighbourhood buyer trends.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        <SectionReveal delay={0.05}>
          <div className="h-full">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-[#3DBFAD]" />
              <h3 className="font-semibold text-sm text-foreground">Property Scorecard</h3>
            </div>
            <BlurredSection
              title="How does your home stack up?"
              description="See how your property compares across 6 key metrics against every recent sale in Fourways."
              ctaText="Unlock scorecard"
            >
              <FakeComparisonContent />
            </BlurredSection>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="h-full">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-[#3DBFAD]" />
              <h3 className="font-semibold text-sm text-foreground">Equity & Bond Tracker</h3>
            </div>
            <BlurredSection
              title="Track your equity in real time"
              description="See your current equity position, bond balance estimate, and how rate changes affect your repayments."
              ctaText="Unlock equity tracker"
            >
              <FakeEquityContent />
            </BlurredSection>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="h-full">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#3DBFAD]" />
              <h3 className="font-semibold text-sm text-foreground">Buyer Profile</h3>
            </div>
            <BlurredSection
              title="Who's buying in your area?"
              description="Understand the demographics, income levels, and search behaviour of buyers looking in Fourways."
              ctaText="Unlock buyer insights"
            >
              <FakeBuyerProfileContent />
            </BlurredSection>
          </div>
        </SectionReveal>
      </div>

      {/* Notification hook */}
      <SectionReveal delay={0.25}>
        <div className="mt-6 sm:mt-8 bg-white rounded-xl border border-border p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 rounded-full bg-[#3DBFAD]/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-[#3DBFAD]" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-foreground mb-1">Never miss a sale near you</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get instant alerts when a property sells within 1km of your home, monthly value updates, and market trend reports — all free with a MyHome account.
            </p>
          </div>
          <button
            onClick={() => openModal("Sale alerts & monthly updates")}
            className="inline-flex items-center gap-2 bg-[#3DBFAD] text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-[#3DBFAD]/90 transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Bell className="w-4 h-4" />
            Set up alerts
          </button>
        </div>
      </SectionReveal>
    </section>
  );
}
