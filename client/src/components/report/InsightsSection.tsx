/*
 * InsightsSection — Key area insights + CTA to MyHome platform
 * Editorial style insight cards with icons
 */

import { SectionReveal } from "@/components/SectionReveal";
import { areaInsights } from "@/lib/mockData";
import { TrendingUp, Home, MapPin, Percent, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRegistration } from "@/contexts/RegistrationContext";

const SUBURB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/suburb-lifestyle-EwjbdYPnrbk9uAQ26tKLPJ.webp";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <TrendingUp className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  "map-pin": <MapPin className="w-5 h-5" />,
  percent: <Percent className="w-5 h-5" />,
};

export function InsightsSection() {
  const { openModal } = useRegistration();

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Insights */}
        <div className="lg:col-span-3">
          <SectionReveal>
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
              What This Means For You
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mb-6 sm:mb-8">
              Key insights about your property and the Fourways market, curated from the latest data.
            </p>
          </SectionReveal>

          <div className="space-y-3 sm:space-y-4">
            {areaInsights.map((insight, i) => (
              <SectionReveal key={i} delay={0.08 * i}>
                <div className="flex gap-3 sm:gap-4 p-3.5 sm:p-5 bg-white rounded-xl border border-border hover:shadow-md hover:shadow-black/[0.03] transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD] flex-shrink-0">
                    {iconMap[insight.icon]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">{insight.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* CTA + Lifestyle image */}
        <div className="lg:col-span-2 flex flex-col">
          <SectionReveal delay={0.2} className="flex-1 flex flex-col">
            <div className="relative rounded-xl overflow-hidden flex-1 min-h-[320px] sm:min-h-[400px]">
              <img
                src={SUBURB_IMG}
                alt="Fourways suburb lifestyle"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
              <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-2xl text-white mb-3 drop-shadow-lg">
                    Get the Full Picture
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    This report is just the beginning. MyHome gives you real-time alerts when
                    properties sell near you, monthly value updates, and tools to track your
                    home's performance like a portfolio.
                  </p>
                </div>
                <motion.button
                  className="inline-flex items-center justify-center gap-2 bg-[#3DBFAD] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#3DBFAD]/90 transition-colors w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal("Full MyHome dashboard")}
                >
                  Explore MyHome
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
