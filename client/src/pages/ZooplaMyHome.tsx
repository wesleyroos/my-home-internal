/*
 * Zoopla My Home — Competitor Reference
 * Breakdown of Zoopla's homeowner dashboard product.
 */

import {
  Home, TrendingUp, Search, Users, BarChart3,
  Lock, ArrowRight, Pencil, Globe, FileText,
  Building2, Landmark,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const SECTION = "py-20 sm:py-28 px-8 sm:px-12";
const CARD = "bg-white rounded-2xl shadow-sm";
const INNER = "max-w-7xl mx-auto w-full";

// ─── Data ───────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "valuation",
    title: "Home Estimate Value",
    description: "Automated valuation with confidence rating (low/medium/high). Sticky sidebar shows the number at all times — it's the anchor of the entire product.",
    details: ["Algorithmic estimate (Zed-Index)", "Confidence indicator", "Total gain since purchase", "Percentage growth"],
    icon: <TrendingUp className="w-5 h-5" />,
    accent: "#3DBFAD",
  },
  {
    id: "market-potential",
    title: "Market Potential",
    description: "Shows how many Zoopla searches your home would appear in and how many similar homes you'd compete with. Interactive price-band selector to see how demand shifts at different price points.",
    details: ["Search appearances count", "Competitor count", "Price-band selector (lower / estimate / higher)", "\"View full report\" upsell"],
    icon: <Search className="w-5 h-5" />,
    accent: "#6366f1",
  },
  {
    id: "estimate-history",
    title: "Monthly Estimate History",
    description: "2-year value trend chart showing month-by-month estimated value. Time period selector. Similar to our suburb report value trend.",
    details: ["Interactive line chart", "Time period filter (last 2 years)", "Monthly data points", "Hover tooltips with exact values"],
    icon: <BarChart3 className="w-5 h-5" />,
    accent: "#0C2340",
  },
  {
    id: "personalise",
    title: "Personalise Your Estimate",
    description: "3-step flow that lets homeowners override the algorithm. Check property details, compare with similar properties, get a personalised estimate. Smart — increases engagement and trust in the number.",
    details: ["Step 1: Check property details", "Step 2: Compare similar properties", "Step 3: Review personalised estimate", "User can choose to use it or keep the default"],
    icon: <Pencil className="w-5 h-5" />,
    accent: "#f59e0b",
  },
  {
    id: "agent-recs",
    title: "Agent Recommendations",
    description: "\"Get an agent valuation\" with 3 recommended agents plus 31+ more. Uses agent preferences and data to match. Compare or request a valuation directly.",
    details: ["Top 3 agent recommendations", "\"Compare all agents\" view", "Request valuation CTA", "Agent branding / logos shown"],
    icon: <Users className="w-5 h-5" />,
    accent: "#3DBFAD",
  },
  {
    id: "listing-performance",
    title: "Post-listing Performance (Gated)",
    description: "Locked behind contacting an agent through Zoopla. Shows a listing performance dashboard with a score. Clever lead-gen lock — you only get the data if you convert.",
    details: ["Performance score (e.g. 854)", "Insights vs competition", "Only unlocked via Zoopla agent contact", "Lead-gen conversion gate"],
    icon: <Lock className="w-5 h-5" />,
    accent: "#ef4444",
  },
  {
    id: "sales-history",
    title: "Sales History",
    description: "Full transaction history for the property — every time it was listed or sold, with photos, specs, and prices. Goes back 20+ years. Shows gains in both absolute and percentage terms.",
    details: ["Listed / Sold timeline", "Photos from each listing", "Price at each transaction", "Gain/loss calculations (e.g. +£75,500 / 47%)"],
    icon: <FileText className="w-5 h-5" />,
    accent: "#6366f1",
  },
  {
    id: "mortgage-crosssell",
    title: "Mortgage Cross-sell",
    description: "Sidebar prompts: \"Are you paying more on a pricey follow-on rate?\" with CTAs to see mortgage options or flag a remortgage. Lead-gen for mortgage products baked into the homeowner dashboard.",
    details: ["See my mortgage options", "Already remortgaged?", "Persistent sidebar placement", "Contextual to current rate environment"],
    icon: <Landmark className="w-5 h-5" />,
    accent: "#0C2340",
  },
];

const TABS = [
  { name: "Sell", description: "Agent recommendations, market potential, valuation, listing performance" },
  { name: "Mortgage & Equity", description: "Remortgage options, equity tracking, rate comparisons" },
  { name: "Local Area", description: "Neighbourhood stats, schools, transport, demographics" },
];

// ─── Components ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#0C2340] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6366f1]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className={`${INNER} px-8 sm:px-12 py-20 sm:py-28 relative`}>
        <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-6">
          <span className="w-8 h-px bg-[#3DBFAD]" />
          Competitor Reference
        </div>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.02] tracking-tight mb-4">
          Zoopla<br />
          <span className="text-[#3DBFAD]">My Home</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">
          Zoopla's homeowner dashboard — estimated value, market potential, agent recommendations, and sales history. The closest existing product to our suburb report. Flagged by Charl as a reference.
        </p>
        <div className="flex flex-wrap gap-2">
          {["UK", "zoopla.co.uk/myaccount/my-home", "Flagged by Charl"].map((t) => (
            <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductStructure() {
  return (
    <section className={`${SECTION} bg-slate-50`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center shadow-md shadow-[#6366f1]/25">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            01 · Product Structure
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          How it's laid out.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          Sticky left sidebar (property card, photo, specs, estimated value) with a scrollable right content area. Three tabs organise everything.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TABS.map((t, i) => (
            <div key={t.name} className={`${CARD} p-6 border-t-4`} style={{ borderTopColor: i === 0 ? "#3DBFAD" : i === 1 ? "#6366f1" : "#f59e0b" }}>
              <span className="font-mono text-xs font-bold tracking-widest text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="font-heading font-bold text-xl text-[#0C2340] mt-2 mb-2">{t.name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBreakdown() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            02 · Feature Breakdown
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          What's inside the Sell tab.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          Eight features that make up the core homeowner experience — from valuation to lead-gen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.id} className={`${CARD} p-6 border-l-4 flex items-start gap-5`} style={{ borderLeftColor: f.accent }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md" style={{ backgroundColor: f.accent }}>
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-bold text-lg text-[#0C2340] mb-1.5">{f.title}</h4>
                <p className="text-[14px] text-slate-600 leading-[1.6] mb-3">{f.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.details.map((d) => (
                    <span key={d} className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${f.accent}10`, color: f.accent, border: `1px solid ${f.accent}25` }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section className={`${SECTION} bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3DBFAD] text-white flex items-center justify-center shadow-md shadow-[#3DBFAD]/25">
            <ArrowRight className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            03 · Zoopla vs MyHome
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-6">
          Where they stop, we start.
        </h2>
        <p className="text-white/60 text-lg max-w-3xl mb-12">
          Zoopla's My Home is informational. It stops at the data layer. MyHome picks up where they leave off — coordinating the transaction, bundling services, and owning the relationship post-purchase.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Zoopla My Home</p>
            <ul className="space-y-2.5">
              {[
                "Estimated property value",
                "Value trend over time",
                "Market potential (search demand)",
                "Agent recommendations",
                "Listing performance (gated)",
                "Sales history",
                "Mortgage cross-sell",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2 text-white/70 text-[15px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#3DBFAD]/10 border border-[#3DBFAD]/25 backdrop-blur rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3DBFAD] mb-3">MyHome (our opportunity)</p>
            <ul className="space-y-2.5">
              {[
                "Everything Zoopla does, localised for SA",
                "F&I add-ons bundled into the bond",
                "Multi-bank submission & offer comparison",
                "Insurance aggregation (Hippo-style)",
                "Transaction coordination layer",
                "Post-purchase home services",
                "Renovation voucher & closing cost products",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2 text-white text-[15px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD] mt-2 flex-shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#3DBFAD]/15 border border-[#3DBFAD]/25 rounded-xl p-6">
          <p className="text-white text-lg font-medium leading-[1.6]">
            Zoopla's value prop stops at <span className="text-white/50">information + agent referral</span>. No transaction coordination, no F&I, no add-ons. <span className="text-[#3DBFAD]">That's the gap.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Ideas() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={INNER}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#f59e0b] text-white flex items-center justify-center shadow-md shadow-[#f59e0b]/25">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#3DBFAD]">
            04 · Ideas to Steal
          </span>
        </div>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-4">
          What we should take from this.
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mb-12">
          Features worth considering for the suburb report and broader MyHome product.
        </p>

        <div className="space-y-4">
          {[
            { title: "Market potential / search demand", detail: "Show homeowners how many searches their property would appear in and how many similar homes they compete with. Powerful seller hook we don't have yet.", accent: "#6366f1" },
            { title: "Personalised estimate flow", detail: "Let users override the algorithm by confirming property details and comparing with similar homes. Increases trust in the valuation and drives engagement.", accent: "#3DBFAD" },
            { title: "Gated content as lead-gen", detail: "Lock premium insights (listing performance, deep analytics) behind a conversion action — contact an agent, request a valuation, or sign up. Free data at the top, premium behind the gate.", accent: "#f59e0b" },
            { title: "Contextual mortgage cross-sell", detail: "\"Are you paying more on a pricey follow-on rate?\" — always visible in the sidebar, contextual to current rate environment. Not a banner ad — a genuine value prompt.", accent: "#0C2340" },
            { title: "Full sales history with gain/loss", detail: "Show every transaction the property has been through, with photos, prices, and gain calculations. Gives the owner a sense of their investment trajectory over time.", accent: "#ef4444" },
          ].map((idea) => (
            <div key={idea.title} className={`${CARD} p-5 sm:p-6 border-l-4 flex items-start gap-4`} style={{ borderLeftColor: idea.accent }}>
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: idea.accent }} />
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-[#0C2340] mb-1">{idea.title}</h4>
                <p className="text-[15px] text-slate-600 leading-[1.6]">{idea.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ZooplaMyHome() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Competitor · Zoopla My Home" />
      <Hero />
      <ProductStructure />
      <FeatureBreakdown />
      <Comparison />
      <Ideas />
      <AppFooter label="Competitor reference" />
    </div>
  );
}
