import { HeroSection } from "@/components/report/HeroSection";
import { ValueTrendSection } from "@/components/report/ValueTrendSection";
import { SuburbStatsSection } from "@/components/report/SuburbStatsSection";
import { LivingInSuburbSection } from "@/components/report/LivingInSuburbSection";
import { SurroundingSalesSection } from "@/components/report/SurroundingSalesSection";
import { ActiveListingsSection } from "@/components/report/ActiveListingsSection";
import { PremiumSections } from "@/components/report/PremiumSections";
import { InsightsSection } from "@/components/report/InsightsSection";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AppHeader label="Suburb Report · Homeowner Prototype" />
      <HeroSection />

      {/* Value Trend — subtle teal orb top-right */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#f9fcfb] to-white">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3DBFAD]/6 blur-3xl pointer-events-none" />
        <ValueTrendSection />
      </div>

      <SuburbStatsSection />

      {/* Living In — soft navy orb bottom-left */}
      <div className="relative overflow-hidden bg-gradient-to-bl from-white via-[#f7f9fc] to-white">
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#0C2340]/4 blur-3xl pointer-events-none" />
        <div className="absolute -top-60 -right-60 w-[400px] h-[400px] rounded-full bg-[#3DBFAD]/4 blur-3xl pointer-events-none" />
        <LivingInSuburbSection />
      </div>

      {/* Surrounding Sales — teal orb bottom-right */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#f6fbfa] to-white">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3DBFAD]/5 blur-3xl pointer-events-none" />
        <SurroundingSalesSection />
      </div>

      <ActiveListingsSection />

      {/* Premium Sections — dual orbs */}
      <div className="relative overflow-hidden bg-gradient-to-tl from-white via-[#f7f9fc] to-white">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#0C2340]/3 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-[#3DBFAD]/5 blur-3xl pointer-events-none" />
        <PremiumSections />
      </div>

      {/* Insights — teal glow top-left */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f6fbfa] via-white to-white">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#3DBFAD]/6 blur-3xl pointer-events-none" />
        <InsightsSection />
      </div>

      <AppFooter label="Homeowner-facing prototype" />
    </div>
  );
}
