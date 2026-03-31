import { HeroSection } from "@/components/report/HeroSection";
import { ValueTrendSection } from "@/components/report/ValueTrendSection";
import { SuburbStatsSection } from "@/components/report/SuburbStatsSection";
import { LivingInSuburbSection } from "@/components/report/LivingInSuburbSection";
import { SurroundingSalesSection } from "@/components/report/SurroundingSalesSection";
import { ActiveListingsSection } from "@/components/report/ActiveListingsSection";
import { PremiumSections } from "@/components/report/PremiumSections";
import { InsightsSection } from "@/components/report/InsightsSection";
import { Footer } from "@/components/report/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <ValueTrendSection />
      <SuburbStatsSection />
      <LivingInSuburbSection />
      <SurroundingSalesSection />
      <ActiveListingsSection />
      <PremiumSections />
      <InsightsSection />
      <Footer />
    </div>
  );
}
