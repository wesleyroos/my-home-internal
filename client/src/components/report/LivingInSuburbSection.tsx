/*
 * LivingInSuburbSection — Neighbourhood lifestyle layer
 * Lifestyle-first design: imagery, sentiment, safety, commute, schools
 */

import { SectionReveal } from "@/components/SectionReveal";
import { GraduationCap, Star, Car, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const LIFESTYLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/suburb-lifestyle-EwjbdYPnrbk9uAQ26tKLPJ.webp";
const AERIAL_IMG    = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/hero-aerial-kHz3HR4JoyhTDPjeV4oNYH.webp";

const SENTIMENT = [
  { pct: 92, label: "Neighbours are friendly" },
  { pct: 88, label: "Great for families" },
  { pct: 81, label: "Feels safe at night" },
  { pct: 76, label: "Active community events" },
];

const COMMUTE = [
  { label: "Sandton CBD",    time: "15 min" },
  { label: "Fourways Mall",  time: "4 min"  },
  { label: "OR Tambo",       time: "42 min" },
];

const SAFETY = { score: 7.4, label: "Good", color: "text-emerald-500" };

const SCHOOLS = [
  { name: "Crawford College Fourways", type: "Independent", distance: "1.2km", rating: 4.6 },
  { name: "Fourways High School",      type: "Public",      distance: "2.1km", rating: 4.1 },
  { name: "Lonehill Primary",          type: "Public",      distance: "1.8km", rating: 4.3 },
  { name: "Redhill School",            type: "Independent", distance: "3.4km", rating: 4.8 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
      ))}
    </div>
  );
}

export function LivingInSuburbSection() {
  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <SectionReveal>
        <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
          Living in Fourways
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mb-6 sm:mb-8">
          What it's actually like to live here — community, safety, schools and how far everything is.
        </p>
      </SectionReveal>

      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

        {/* Lifestyle image card with sentiment overlay — 2/3 width */}
        <SectionReveal delay={0.05} className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden h-[320px] sm:h-[380px]">
            <img
              src={LIFESTYLE_IMG}
              alt="Fourways neighbourhood"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

            {/* Top label */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20">
                What Locals Say
              </span>
            </div>

            {/* Sentiment stats */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-2">
                {SENTIMENT.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="bg-white/12 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-white/15"
                  >
                    <p className="font-heading font-bold text-white text-xl leading-none mb-1">{item.pct}%</p>
                    <p className="text-white/75 text-[11px] leading-snug">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Right column — safety + commute */}
        <SectionReveal delay={0.1} className="flex flex-col gap-4">

          {/* Safety card */}
          <div className="relative rounded-2xl overflow-hidden flex-1">
            <img
              src={AERIAL_IMG}
              alt="Fourways aerial"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340]/90 to-[#0C2340]/70" />
            <div className="relative p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-[#3DBFAD]" />
                <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Area Safety</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-heading font-bold text-5xl text-white leading-none">{SAFETY.score}</span>
                <span className="text-white/50 text-lg mb-1">/10</span>
              </div>
              <span className={`text-sm font-semibold ${SAFETY.color}`}>{SAFETY.label}</span>
              <p className="text-white/50 text-xs leading-relaxed mt-2">
                Active neighbourhood watch, good lighting, and strong private security coverage.
              </p>
            </div>
          </div>

          {/* Commute card */}
          <div className="bg-white rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-4 h-4 text-[#3DBFAD]" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Commute</span>
            </div>
            <div className="space-y-2">
              {COMMUTE.map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.label}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </SectionReveal>
      </div>

      {/* Schools row */}
      <SectionReveal delay={0.15}>
        <div className="bg-white rounded-2xl border border-border p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-[#3DBFAD]" />
            <span className="text-sm font-semibold text-foreground">Nearby Schools</span>
            <span className="text-xs text-muted-foreground ml-1">within 4km</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {SCHOOLS.map((school, i) => (
              <motion.div
                key={school.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="rounded-xl bg-[#f8fafc] border border-border p-3.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    school.type === "Independent"
                      ? "bg-[#3DBFAD]/10 text-[#1a9d8e]"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {school.type}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-[11px]">
                    <Car className="w-3 h-3" />
                    {school.distance}
                  </div>
                </div>
                <p className="font-semibold text-sm text-foreground leading-snug mb-2">{school.name}</p>
                <StarRating rating={school.rating} />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

    </section>
  );
}
