/*
 * Personas — SA customer personas and the service-provider ecosystem.
 * Two acts: the customers (journeys through the lifecycle) and the
 * providers (categories of supplier that plug into each step).
 */

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import {
  Users, Wrench, Truck, Shield, Hammer, Handshake,
  Paintbrush, Zap, Droplet, Leaf, Home, Sprout,
  ScrollText, Ruler, Search as SearchIcon, Signal,
  Building2, Wallet, BadgeCheck, ArrowRight,
} from "lucide-react";

// ─── Data: customer personas ────────────────────────────────────────────────

interface Persona {
  name: string;
  type: "Renter" | "Buyer" | "Owner";
  color: string;
  avatar: string;
  bio: string;
  timeline: { step: string; label: string; detail: string; services: string[] }[];
}

const PERSONAS: Persona[] = [
  {
    name: "Tom",
    type: "Renter",
    color: "#6366f1",
    avatar: "T",
    bio: "25, recently started his first job in Cape Town. Not ready to buy yet but needs a place close to the office.",
    timeline: [
      { step: "02", label: "Life event", detail: "Starts new job, relocates to Cape Town", services: [] },
      { step: "03", label: "Online", detail: "Browses listings online", services: [] },
      { step: "04", label: "Search", detail: "Finds rentals via Private Property & agents", services: ["Private Property", "RE/MAX"] },
      { step: "05", label: "Buy/Rent", detail: "Signs lease through JustProperty", services: ["JustProperty"] },
      { step: "01", label: "Staying", detail: "Rent managed via PayProp, deposits secured", services: ["PayProp"] },
      { step: "10", label: "Home service", detail: "Books home services for move-in & maintenance", services: ["Home services"] },
    ],
  },
  {
    name: "Amy",
    type: "Buyer",
    color: "#3DBFAD",
    avatar: "A",
    bio: "32, married, expecting first child. Ready to buy their first home in Johannesburg.",
    timeline: [
      { step: "02", label: "Life event", detail: "Baby on the way — needs more space", services: [] },
      { step: "03", label: "Online", detail: "Starts searching online, gets pre-qualified", services: [] },
      { step: "04", label: "Search", detail: "Browses listings on Private Property", services: ["Private Property"] },
      { step: "05", label: "Buy/Rent", detail: "Makes offer on 3-bed in Randburg", services: ["CHAS EVERITT"] },
      { step: "06", label: "Home loan", detail: "BetterBond secures best rate via Nedbank", services: ["BetterBond", "Nedbank", "BetterID"] },
      { step: "07", label: "Insurance", detail: "BetterSure bundles home & bond insurance", services: ["BetterSure"] },
      { step: "09", label: "Conveyancing", detail: "STBB handles transfer, rolled into bond", services: ["STBB"] },
      { step: "10", label: "Home service", detail: "Home services handle move-in day", services: ["Home services"] },
    ],
  },
  {
    name: "Eleanor",
    type: "Owner",
    color: "#f59e0b",
    avatar: "E",
    bio: "48, owns a townhouse in Durban. Looking to refinance for a better rate and add home services.",
    timeline: [
      { step: "06", label: "Home loan", detail: "Refinances through BetterBond for lower rate", services: ["BetterBond", "Standard Bank"] },
      { step: "07", label: "Insurance", detail: "Switches to BetterSure, saves R200/month", services: ["BetterSure", "HLPartnership"] },
      { step: "08", label: "Cross-sell", detail: "Adds credit life & estate planning", services: ["Credit Life", "Wills and Estate planning"] },
      { step: "10", label: "Home service", detail: "Signs up for an ongoing home services plan", services: ["Home services"] },
    ],
  },
];

// ─── Data: supplier ecosystem ───────────────────────────────────────────────

interface Supplier {
  name: string;
  icon: React.ReactNode;
  steps: string[];
  description: string;
  examples?: string[];
}

interface SupplierGroup {
  id: string;
  label: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  suppliers: Supplier[];
}

const SUPPLIER_GROUPS: SupplierGroup[] = [
  {
    id: "transaction",
    label: "Transaction services",
    description: "Partners who move the deal from offer to ownership.",
    accent: "#3DBFAD",
    icon: <Handshake className="w-5 h-5" />,
    suppliers: [
      { name: "Bond originator", icon: <Wallet className="w-5 h-5" />, steps: ["06"], description: "Submits the bond application to multiple banks and negotiates the rate on the buyer's behalf.", examples: ["BetterBond"] },
      { name: "Conveyancer", icon: <ScrollText className="w-5 h-5" />, steps: ["09"], description: "Attorney firm that handles transfer, bond registration, and the flow of funds between parties.", examples: ["STBB", "HLPartnership"] },
      { name: "Property inspector", icon: <SearchIcon className="w-5 h-5" />, steps: ["04", "05"], description: "Pre-purchase inspection for defects, compliance, and structural integrity — often skipped in SA today.", examples: [] },
      { name: "Valuer", icon: <Ruler className="w-5 h-5" />, steps: ["04", "06"], description: "Independent valuation for bank lending, resale, and refinancing decisions.", examples: ["Loom"] },
    ],
  },
  {
    id: "move-install",
    label: "Move & install",
    description: "One-off providers who get the buyer into the home.",
    accent: "#f59e0b",
    icon: <Truck className="w-5 h-5" />,
    suppliers: [
      { name: "Removals", icon: <Truck className="w-5 h-5" />, steps: ["10"], description: "Packing, transport, and unpacking on move-in day.", examples: ["Stuttaford Van Lines", "Biddulphs"] },
      { name: "Fibre & connectivity", icon: <Signal className="w-5 h-5" />, steps: ["10"], description: "ISP sign-up, fibre install, router setup — usually the first utility to get sorted.", examples: ["Vumatel", "Openserve", "MTN", "Rain"] },
      { name: "Alarm & security install", icon: <Shield className="w-5 h-5" />, steps: ["10"], description: "Armed response sign-up, alarm install, outdoor beams, camera setup.", examples: ["ADT", "Fidelity"] },
    ],
  },
  {
    id: "ongoing",
    label: "Ongoing home services",
    description: "Recurring trades and services that keep the home running.",
    accent: "#6366f1",
    icon: <Wrench className="w-5 h-5" />,
    suppliers: [
      { name: "Handyman", icon: <Wrench className="w-5 h-5" />, steps: ["10"], description: "General repairs, small fixes, odd jobs that don't need a specialist." },
      { name: "Electrician", icon: <Zap className="w-5 h-5" />, steps: ["10"], description: "Faults, upgrades, solar install, CoC certificates." },
      { name: "Plumber", icon: <Droplet className="w-5 h-5" />, steps: ["10"], description: "Leaks, geysers, drainage, emergency callouts." },
      { name: "Painter", icon: <Paintbrush className="w-5 h-5" />, steps: ["10"], description: "Interior and exterior painting, waterproofing prep." },
      { name: "Gardener", icon: <Leaf className="w-5 h-5" />, steps: ["10"], description: "Weekly garden service, lawn care, pruning." },
      { name: "Pool service", icon: <Droplet className="w-5 h-5" />, steps: ["10"], description: "Weekly pool maintenance, chemical top-ups, pump repairs." },
      { name: "Cleaning", icon: <Sprout className="w-5 h-5" />, steps: ["10"], description: "Weekly or deep cleaning, move-in/out cleans." },
    ],
  },
  {
    id: "major-works",
    label: "Major works",
    description: "Big-ticket projects — renovations, extensions, and new builds.",
    accent: "#ef4444",
    icon: <Hammer className="w-5 h-5" />,
    suppliers: [
      { name: "Architect", icon: <Building2 className="w-5 h-5" />, steps: ["10"], description: "Plans, council approval, and design for renovations or new builds." },
      { name: "Building contractor", icon: <Hammer className="w-5 h-5" />, steps: ["10"], description: "Runs the project on-site — structural work, extensions, full renovations." },
      { name: "Kitchen & bathroom fit-out", icon: <Home className="w-5 h-5" />, steps: ["10"], description: "Cabinetry, tiling, plumbing fixtures — the most common upgrade project." },
    ],
  },
  {
    id: "protection-admin",
    label: "Protection & admin",
    description: "Ongoing financial products and recurring administration.",
    accent: "#0C2340",
    icon: <Shield className="w-5 h-5" />,
    suppliers: [
      { name: "Home insurance", icon: <Shield className="w-5 h-5" />, steps: ["07"], description: "Building, contents, and liability cover — often bundled with the bond." },
      { name: "Bond protection", icon: <BadgeCheck className="w-5 h-5" />, steps: ["07"], description: "Credit life cover on the outstanding bond in case of death or disability." },
      { name: "Rates, levies & utilities", icon: <Wallet className="w-5 h-5" />, steps: ["10"], description: "Municipal rates, sectional title levies, electricity, water — the monthly running costs." },
    ],
  },
];

// ─── Shared bits ────────────────────────────────────────────────────────────

function SectionHeader({
  num, kicker, title, subtitle, icon,
}: {
  num: string;
  kicker: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
          {icon}
        </div>
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
          {num} · {kicker}
        </span>
      </div>
      <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base sm:text-lg text-slate-500 max-w-3xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function StepBadge({ step, color }: { step: string; color: string }) {
  return (
    <span
      className="inline-flex items-center justify-center text-[10px] font-bold font-mono tracking-wider rounded-md px-1.5 py-0.5"
      style={{ backgroundColor: `${color}14`, color, border: `1px solid ${color}30` }}
    >
      {step}
    </span>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#0C2340] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3DBFAD]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="max-w-[1600px] mx-auto w-full px-8 sm:px-12 py-20 sm:py-28 relative">
        <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-8">
          <span className="w-8 h-px bg-[#3DBFAD]" />
          Research · Personas
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight mb-6">
          The people<br />
          <span className="text-[#3DBFAD]">and the providers.</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
          Three customer journeys through the home lifecycle, and the ecosystem of service providers that plug into each step.
        </p>
      </div>
    </section>
  );
}

// ─── Section: customer personas ─────────────────────────────────────────────

function CustomerPersonas() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 bg-slate-50">
      <div className="max-w-[1600px] mx-auto">
        <SectionHeader
          num="01"
          kicker="Customers"
          title="Three journeys, one ecosystem."
          subtitle="Every user enters the ecosystem differently — renting, buying, or already owning. MyHome meets them wherever they are on the lifecycle."
          icon={<Users className="w-5 h-5" />}
        />

        <div className="flex flex-col gap-8">
          {PERSONAS.map((persona) => (
            <article
              key={persona.name}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border-l-4"
              style={{ borderLeftColor: persona.color }}
            >
              {/* Header */}
              <div className="px-6 sm:px-8 py-6 flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-2xl flex-shrink-0 shadow-lg"
                  style={{ backgroundColor: persona.color }}
                >
                  {persona.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-2xl text-[#0C2340]">{persona.name}</h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: persona.color }}
                    >
                      {persona.type}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{persona.bio}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t border-slate-100 bg-slate-50/40 px-4 sm:px-6 py-6">
                <div
                  className="grid items-start gap-0 w-full"
                  style={{ gridTemplateColumns: `repeat(${persona.timeline.length}, minmax(0, 1fr))` }}
                >
                  {persona.timeline.map((t, ti) => (
                    <div key={ti} className="relative flex flex-col items-center px-2">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm mb-3 shadow-md"
                        style={{ backgroundColor: persona.color }}
                      >
                        {t.step}
                      </div>
                      <p className="text-[12px] font-bold text-[#0C2340] mb-1.5 uppercase tracking-wider text-center">{t.label}</p>
                      <p className="text-[12px] text-slate-500 text-center leading-snug mb-3">{t.detail}</p>
                      {t.services.length > 0 && (
                        <div className="flex flex-col items-stretch gap-1.5 w-full">
                          {t.services.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-1 rounded-md text-[10px] font-semibold text-center break-words"
                              style={{
                                backgroundColor: persona.color + "12",
                                color: persona.color,
                                border: `1px solid ${persona.color}30`,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {ti < persona.timeline.length - 1 && (
                        <ArrowRight
                          className="w-4 h-4 absolute top-4 pointer-events-none"
                          style={{ color: `${persona.color}80`, right: "-0.5rem" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: supplier ecosystem ────────────────────────────────────────────

function SupplierEcosystem() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 bg-white">
      <div className="max-w-[1600px] mx-auto">
        <SectionHeader
          num="02"
          kicker="Service providers"
          title="The supplier ecosystem."
          subtitle="Everyone who plugs into the home — from bond originators and conveyancers on the transaction side, to the electrician who sorts out the geyser five years later."
          icon={<Wrench className="w-5 h-5" />}
        />

        <div className="flex flex-col gap-12">
          {SUPPLIER_GROUPS.map((group) => (
            <div key={group.id}>
              {/* Group header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md"
                  style={{ backgroundColor: group.accent, boxShadow: `0 4px 14px ${group.accent}35` }}
                >
                  {group.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0C2340] leading-tight">{group.label}</h3>
                  <p className="text-sm text-slate-500 mt-1">{group.description}</p>
                </div>
              </div>

              {/* Supplier grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.suppliers.map((s) => (
                  <div
                    key={s.name}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${group.accent}14`, color: group.accent }}
                      >
                        {s.icon}
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {s.steps.map((step) => (
                          <StepBadge key={step} step={step} color={group.accent} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#0C2340] mb-1.5">{s.name}</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{s.description}</p>
                    </div>
                    {s.examples && s.examples.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {s.examples.map((ex) => (
                          <span
                            key={ex}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Personas() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="SA Personas" />
      <Hero />
      <CustomerPersonas />
      <SupplierEcosystem />
      <AppFooter label="SA Personas reference" />
    </div>
  );
}
