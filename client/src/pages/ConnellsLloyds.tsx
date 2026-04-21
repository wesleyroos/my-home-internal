/*
 * Connells + Lloyds Digital Homebuying Service — Research Reference
 * UK's NPTN launch, April 2026.
 */

import {
  Globe, Building2, Shield, Search, FileText, Users,
  ArrowRight, ExternalLink, Landmark, AlertTriangle,
  Quote,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const SECTION = "py-20 sm:py-28 px-8 sm:px-12";
const CARD = "bg-white rounded-2xl shadow-sm";
const INNER = "max-w-7xl mx-auto w-full";

// ─── Data ───────────────────────────────────────────────────────────────────

const PROBLEMS = [
  { stat: "5 months", label: "Average time to complete a UK residential transaction", color: "#ef4444" },
  { stat: "1 in 4", label: "Transactions collapse before exchange", color: "#f59e0b" },
  { stat: "5+", label: "Parties involved — each requesting the same information", color: "#6366f1" },
  { stat: "Manual", label: "Paper-based processes across fragmented parties", color: "#0C2340" },
];

const TECH_STACK = [
  { name: "Moverly", role: "Captures all property and seller info upfront — one-time digital capture", icon: <FileText className="w-5 h-5" />, accent: "#3DBFAD" },
  { name: "Armalytix", role: "Early source-of-funds verification on the buyer", icon: <Shield className="w-5 h-5" />, accent: "#6366f1" },
  { name: "Credas", role: "Single identity verification shared across all parties", icon: <Users className="w-5 h-5" />, accent: "#f59e0b" },
  { name: "TM Group", role: "Property searches provided upfront with listings", icon: <Search className="w-5 h-5" />, accent: "#0C2340" },
  { name: "NPTN (LMS)", role: "Shared data-exchange platform — all parties pull from the same data", icon: <Globe className="w-5 h-5" />, accent: "#3DBFAD" },
];

const KEY_PLAYERS = [
  { name: "Lloyds Banking Group", role: "Lender", accent: "#0C2340" },
  { name: "Connells Group", role: "UK's largest estate agency network", accent: "#3DBFAD" },
  { name: "LMS", role: "Conveyancing infrastructure — built NPTN", accent: "#6366f1" },
  { name: "Novus Strategy", role: "Strategy & advisory", accent: "#f59e0b" },
];

const QUOTES = [
  { text: "The industry has spent years diagnosing the problem. NPTN is infrastructure that delivers the solution.", author: "Nick Chadbourne", role: "LMS", accent: "#3DBFAD" },
  { text: "Transforming the home buying journey is about making one of the most important transactions in a customer's life simpler, faster.", author: "Frances Cassidy", role: "LBG Head of Strategic Partnerships", accent: "#0C2340" },
  { text: "Too many people who have bought or sold a home will know this feeling all too well — months of waiting, chasing and worrying.", author: "Steve Reed", role: "Housing Secretary", accent: "#6366f1" },
];

const SOURCES = [
  { label: "Estate Agent Today", url: "https://www.estateagenttoday.co.uk/breaking-news/2026/04/connells-and-lloyds-launch-fully-digital-home-buying-service/" },
  { label: "Mortgage Solutions", url: "https://www.mortgagesolutions.co.uk/mortgage-news/2026/04/21/lbg-connells-and-lms-team-up-to-deliver-digitial-home-buying-service/" },
  { label: "MPA Magazine", url: "https://www.mpamag.com/uk/mortgage-types/residential/lloyds-connells-and-lms-launch-digital-homebuying-service/572452" },
  { label: "Money Age", url: "https://moneyage.co.uk/lloyds-connells-group-and-lms-launch-digital-homebuying-service.php" },
  { label: "The Independent", url: "https://www.independent.co.uk/money/lloyds-banking-group-lloyds-steve-reed-wales-england-b2961736.html" },
];

// ─── Components ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#0C2340] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3DBFAD]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className={`${INNER} px-8 sm:px-12 py-20 sm:py-28 relative`}>
        <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-6">
          <span className="w-8 h-px bg-[#3DBFAD]" />
          Research Reference
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight mb-4">
          Connells + Lloyds<br />
          <span className="text-[#3DBFAD]">Digital Homebuying Service</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">
          The UK's first fully digital end-to-end homebuying service — property, identity, and financial data captured once and shared across all parties. Built on the National Property Transaction Network (NPTN).
        </p>
        <div className="flex flex-wrap gap-2">
          {["UK · England & Wales", "April 2026", "Shared by Rudi"].map((t) => (
            <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className={`${SECTION} bg-slate-50`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ef4444] text-white flex items-center justify-center shadow-md shadow-[#ef4444]/25">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            01 · The Problem
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          Why they built it.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          The UK homebuying process is slow, fragmented, and full of duplicated effort.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROBLEMS.map((p) => (
            <div key={p.stat} className={`${CARD} p-5 border-t-4`} style={{ borderTopColor: p.color }}>
              <p className="font-heading font-bold text-3xl leading-none mb-2" style={{ color: p.color }}>{p.stat}</p>
              <p className="text-sm text-slate-600 leading-snug">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            02 · How It Works
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          The tech stack.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          Information captured once, shared across all parties through a single data-exchange platform.
        </p>
        <div className="space-y-4">
          {TECH_STACK.map((t) => (
            <div key={t.name} className={`${CARD} p-5 sm:p-6 border-l-4 flex items-start gap-5`} style={{ borderLeftColor: t.accent }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md" style={{ backgroundColor: t.accent }}>
                {t.icon}
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-[#0C2340] mb-1">{t.name}</h4>
                <p className="text-[15px] text-slate-600 leading-[1.6]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Players() {
  return (
    <section className={`${SECTION} bg-slate-50`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0C2340] text-white flex items-center justify-center shadow-md">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            03 · Key Players
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          Who's behind it.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          A lender, the largest estate agency, and a conveyancing infrastructure provider — backed by the Housing Secretary.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KEY_PLAYERS.map((p) => (
            <div key={p.name} className={`${CARD} p-6 border-t-4 text-center`} style={{ borderTopColor: p.accent }}>
              <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md mb-4" style={{ backgroundColor: p.accent }}>
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#0C2340] mb-1">{p.name}</h4>
              <p className="text-sm text-slate-500">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuotesSection() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center shadow-md shadow-[#6366f1]/25">
            <Quote className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            04 · Key Quotes
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-12">
          In their words.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {QUOTES.map((q) => (
            <div key={q.author} className={`${CARD} p-6 sm:p-8 border-l-4 flex flex-col`} style={{ borderLeftColor: q.accent }}>
              <Quote className="w-6 h-6 mb-4 flex-shrink-0" style={{ color: q.accent }} />
              <p className="text-[15px] text-[#0C2340] leading-[1.65] italic flex-1 mb-6">"{q.text}"</p>
              <div>
                <p className="font-heading font-bold text-sm text-[#0C2340]">{q.author}</p>
                <p className="text-xs text-slate-500">{q.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Relevance() {
  return (
    <section className={`${SECTION} bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
            <ArrowRight className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            05 · Relevance
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-6">
          What this means for MyHome.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6">
            <h4 className="font-heading font-bold text-lg text-[#3DBFAD] mb-2">They started with infrastructure</h4>
            <p className="text-white/70 text-[15px] leading-[1.65]">
              NPTN is a data-exchange platform — the plumbing between agents, conveyancers, and lenders. No consumer brand. No product name. The homebuyer doesn't know it exists.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6">
            <h4 className="font-heading font-bold text-lg text-[#3DBFAD] mb-2">We're starting with the consumer</h4>
            <p className="text-white/70 text-[15px] leading-[1.65]">
              MyHome is consumer-facing first — the coordinating layer the homebuyer actually sees and uses. The SA market doesn't have an NPTN equivalent, so we build both the surface and the rails.
            </p>
          </div>
        </div>
        <div className="bg-[#3DBFAD]/15 border border-[#3DBFAD]/25 rounded-xl p-6">
          <p className="text-white text-lg font-medium leading-[1.6]">
            Nobody's cracked this with a consumer-facing brand yet — they don't even have a product name. <span className="text-[#3DBFAD]">That's the gap.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function SourcesSection() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Sources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#3DBFAD]/40 hover:shadow-md transition-all"
            >
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#3DBFAD] flex-shrink-0 transition-colors" />
              <span className="text-sm font-semibold text-[#0C2340] group-hover:text-[#3DBFAD] transition-colors">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ConnellsLloyds() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Research · Connells + Lloyds" />
      <Hero />
      <Problem />
      <HowItWorks />
      <Players />
      <QuotesSection />
      <Relevance />
      <SourcesSection />
      <AppFooter label="Research reference" />
    </div>
  );
}
