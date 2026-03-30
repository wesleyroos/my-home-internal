/*
 * HeroSection — MyHome branded, mobile-optimised
 * Navy #0C2340, Teal #3DBFAD accent, white/light theme
 * Plus Jakarta Sans headings, Inter body
 * Prominent address display, side-by-side street view + erf satellite map
 */

import { useState, useEffect } from "react";
import { BackToDashboard } from "@/components/BackToDashboard";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ownerProperty, formatRand } from "@/lib/mockData";
import { MapPin, Bed, Bath, Car, Maximize } from "lucide-react";
import { ErfMapView } from "@/components/report/ErfMapView";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const AERIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/hero-aerial-kHz3HR4JoyhTDPjeV4oNYH.webp";
const PROPERTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/property-hero-3MRLeyu3Lsybd5cyftJY8F.webp";
const LOGO_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

export function HeroSection() {
  const isMobile = useIsMobile();
  const valueChange = ownerProperty.currentValue - ownerProperty.previousValue;
  const valueChangePercent = ((valueChange / ownerProperty.previousValue) * 100).toFixed(1);
  const totalGain = ownerProperty.currentValue - ownerProperty.purchasePrice;
  const totalGainPercent = ((totalGain / ownerProperty.purchasePrice) * 100).toFixed(1);
  const heroImg = isMobile ? PROPERTY_IMG : AERIAL_IMG;
  const heroAlt = isMobile ? "Your property at 14 Jacaranda Crescent" : "Aerial view of Fourways suburb";

  return (
    <section className="relative">
      {/* Aerial background */}
      <div className="relative h-[360px] sm:h-[440px] lg:h-[520px] overflow-hidden">
        <img
          src={heroImg}
          alt={heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2340]/60 via-[#0C2340]/30 to-[#0C2340]/70" />

        {/* Top bar */}
        <motion.div
          className="relative z-10 container pt-4 sm:pt-6 lg:pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <img src={LOGO_FULL} alt="MyHome" className="h-7 sm:h-8 lg:h-9 brightness-0 invert" />
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-[10px] sm:text-xs font-medium">Property Report — March 2026</span>
              <BackToDashboard light />
            </div>
          </div>
        </motion.div>

        {/* Hero content — address is the star */}
        <div className="relative z-10 container h-full flex flex-col justify-end pb-40 sm:pb-36 lg:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-white/60 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Property report for {ownerProperty.ownerName}
            </p>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[42px] text-white leading-tight tracking-tight mb-2 sm:mb-3">
              {ownerProperty.address}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3DBFAD]" />
              <span className="text-white/80 text-sm sm:text-base font-medium">
                {ownerProperty.suburb}, {ownerProperty.city}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Value card overlapping the hero */}
      <div className="container relative -mt-10 sm:-mt-18 lg:-mt-20 z-20">
        <motion.div
          className="bg-white rounded-xl shadow-xl shadow-[#0C2340]/8 border border-[#0C2340]/[0.06] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
            <div className="flex flex-col gap-5">
              {/* Value */}
              <div className="flex-1 min-w-0">
                <p className="text-[#5A7A9A] text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-1.5 sm:mb-2">
                  Estimated Property Value
                </p>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#0C2340] tracking-tight">
                    <AnimatedCounter
                      value={ownerProperty.currentValue}
                      formatter={(n) => formatRand(n)}
                    />
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#3DBFAD]/10 text-[#3DBFAD] text-xs sm:text-sm font-semibold">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {valueChangePercent}% this year
                  </span>
                  <span className="text-[#5A7A9A] text-xs sm:text-sm">
                    +{formatRand(valueChange)} in 12 months
                  </span>
                </div>

                <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#0C2340]/8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A7A9A]" />
                      <span className="text-xs sm:text-sm text-[#1E3A5A]"><strong>{ownerProperty.bedrooms}</strong> Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A7A9A]" />
                      <span className="text-xs sm:text-sm text-[#1E3A5A]"><strong>{ownerProperty.bathrooms}</strong> Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A7A9A]" />
                      <span className="text-xs sm:text-sm text-[#1E3A5A]"><strong>{ownerProperty.garages}</strong> Garages</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A7A9A]" />
                      <span className="text-xs sm:text-sm text-[#1E3A5A]"><strong>{ownerProperty.erfSize}</strong> m²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Street view + erf map — always below stats */}
              <div className="flex gap-2 rounded-lg overflow-hidden border border-[#0C2340]/10">
                {/* Street View */}
                <div className="relative flex-1 min-w-0">
                  <img
                    src={PROPERTY_IMG}
                    alt="Street view of 14 Jacaranda Crescent"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "260px", maxHeight: "320px" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0C2340]/80 to-transparent px-2 py-2">
                    <span className="text-white/90 text-[10px] font-semibold uppercase tracking-wide">Street View</span>
                  </div>
                </div>

                <div className="w-px bg-[#0C2340]/10 flex-shrink-0" />

                {/* Erf Boundary */}
                <div className="relative flex-1 min-w-0" style={{ minHeight: "260px", maxHeight: "320px" }}>
                  <ErfMapView compact />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0C2340]/80 to-transparent px-2 py-2 pointer-events-none z-10">
                    <span className="text-white/90 text-[10px] font-semibold uppercase tracking-wide">Erf Boundary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="bg-[#3DBFAD]/[0.05] border-t border-[#3DBFAD]/15 px-4 sm:px-6 lg:px-8 xl:px-10 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 lg:gap-x-8 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
              <div>
                <span className="text-[#5A7A9A]">Purchased</span>{" "}
                <strong className="text-[#0C2340]">{formatRand(ownerProperty.purchasePrice)}</strong>{" "}
                <span className="text-[#5A7A9A]">in Mar 2019</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#0C2340]/10" />
              <div>
                <span className="text-[#5A7A9A]">Total gain</span>{" "}
                <strong className="text-[#3DBFAD]">{formatRand(totalGain)}</strong>{" "}
                <span className="text-[#3DBFAD] text-xs font-medium">(+{totalGainPercent}%)</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#0C2340]/10" />
              <div>
                <span className="text-[#5A7A9A]">Type</span>{" "}
                <strong className="text-[#0C2340]">{ownerProperty.propertyType}</strong>{" "}
                <span className="text-[#5A7A9A]">· Built {ownerProperty.yearBuilt}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
