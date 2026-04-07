/*
 * Landscape — Global PropTech competitor landscape.
 * Five categories mapped from the research mind map.
 */

import {
  Globe, Banknote, Layers, Heart, Landmark, Grid3x3,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Company {
  name: string;
  country: string;
  tag?: string;
  summary: string;
  stats: { label: string; value: string }[];
  takeaway: string;
}

interface Category {
  id: string;
  num: string;
  title: string;
  kicker: string;
  blurb: string;
  icon: React.ReactNode;
  intro: string;
  color: string;
  companies: Company[];
}

// ─── Data ───────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: "marketplaces",
    num: "01",
    title: "Marketplaces & Portals",
    kicker: "Search & listings",
    blurb: "Online property search engines where buyers and renters browse listings. Make money from agent subscriptions and lead fees.",
    icon: <Globe className="w-5 h-5" />,
    color: "#0C2340",
    intro: "The top-of-funnel giants. They own consumer eyeballs but stop at search — none of them touch the mortgage, legal or insurance layers.",
    companies: [
      {
        name: "Zillow", country: "US", tag: "Market leader",
        summary: "The default US consumer starting point. Revenue from Premier Agent leads, rentals and mortgages. Burned ~$900M on iBuying (Zillow Offers) and refocused as a marketplace. Owns Trulia, HotPads, StreetEasy.",
        stats: [
          { label: "2024 revenue", value: "$2.2B" },
          { label: "Monthly uniques", value: "243M" },
          { label: "Zestimates", value: "100M homes" },
        ],
        takeaway: "Dominates search and lead-gen but sends users elsewhere for the actual transaction.",
      },
      {
        name: "Trulia", country: "US", tag: "Zillow subsidiary",
        summary: "Acquired by Zillow in 2015 for $3.5B. Differentiated by neighbourhood data — crime, schools, noise, commute, 'what locals say'. Captures the exploratory 'should I live here?' phase earlier than Zillow.",
        stats: [
          { label: "Acquired", value: "2015" },
          { label: "Deal size", value: "$3.5B" },
          { label: "Monthly visitors", value: "9.8M" },
        ],
        takeaway: "Neighbourhood-level content is a distinct funnel stage from listings search.",
      },
      {
        name: "Rightmove", country: "UK", tag: "FTSE 100",
        summary: "The UK's dominant portal. 89% share of time on platform. B2B subscription model — agents pay ~£1,530/mo with >90% retention. The most profitable property portal in the world.",
        stats: [
          { label: "2025 revenue", value: "£425M" },
          { label: "Op. margin", value: "70%" },
          { label: "Share of time", value: "89%" },
        ],
        takeaway: "The clearest example of what happens when you stop at search — highly profitable, but capped.",
      },
      {
        name: "Zoopla", country: "UK", tag: "Silver Lake owned",
        summary: "Acquired by Silver Lake for £2.2B in 2018. Struggles to close the gap with Rightmove (10–15% share vs 89%). Has pivoted toward B2B data services and agent software.",
        stats: [
          { label: "Acquired", value: "2018" },
          { label: "Deal size", value: "£2.2B" },
          { label: "Share of time", value: "~12%" },
        ],
        takeaway: "Competing on consumer eyeballs alone against a dominant #1 is nearly impossible.",
      },
      {
        name: "SeLoger", country: "France", tag: "Aviv Group",
        summary: "France's leading property search portal (founded 1992). Listings, price estimation, neighbourhood guides and mortgage calculators. Competes with Leboncoin and PAP.",
        stats: [
          { label: "Founded", value: "1992" },
          { label: "Owner", value: "Aviv Group" },
          { label: "Market", value: "France" },
        ],
        takeaway: "Dominates search but doesn't own the transaction — same pattern as Rightmove.",
      },
      {
        name: "Idealista", country: "Spain / PT / IT", tag: "Cinven owned",
        summary: "Southern Europe's largest portal. Strong direct-to-owner listing model alongside agent partnerships, giving it a broader inventory base than most European peers.",
        stats: [
          { label: "Acquired", value: "2020" },
          { label: "Deal size", value: "€1.3B" },
          { label: "Monthly visitors", value: "30M+" },
        ],
        takeaway: "Direct-to-owner listings unlock inventory competitors don't have.",
      },
      {
        name: "Immoweb", country: "Belgium / LU", tag: "Aviv Group",
        summary: "Belgium's dominant portal. ~4M monthly visitors in an 11.5M population country. B2B agent subscription model in a much smaller market than Rightmove.",
        stats: [
          { label: "Country", value: "Belgium" },
          { label: "Monthly visitors", value: "4M" },
          { label: "Owner", value: "Aviv Group" },
        ],
        takeaway: "A small-market Rightmove. Category economics scale down proportionally.",
      },
      {
        name: "Immobiliare.it", country: "Italy", tag: "Aviv Group",
        summary: "Italy's most-visited property site. Part of Aviv's pan-European portfolio alongside SeLoger and Immoweb — but each operates independently, none extend into finance or post-purchase services.",
        stats: [
          { label: "Country", value: "Italy" },
          { label: "Owner", value: "Aviv Group" },
          { label: "Model", value: "Agent subs" },
        ],
        takeaway: "Even a pan-European portal owner hasn't bundled the transaction stack.",
      },
    ],
  },
  {
    id: "ibuying",
    num: "02",
    title: "iBuying",
    kicker: "Instant cash offers",
    blurb: "Companies that use algorithms to make instant cash offers on homes, buy them outright, do light renovations and resell within weeks.",
    icon: <Banknote className="w-5 h-5" />,
    color: "#ef4444",
    intro: "The 'own the transaction through physical inventory' bet. Fundamentally different from owning it through software and services — and much riskier.",
    companies: [
      {
        name: "Opendoor", country: "US", tag: "Category leader",
        summary: "The original iBuyer (founded 2014). Buys homes at 5–8% below market, makes minor repairs, resells in weeks. Dominant by volume but unprofitable — targeting breakeven by end of 2026.",
        stats: [
          { label: "2025 revenue", value: "$4.37B" },
          { label: "Net loss", value: "$1.3B" },
          { label: "iBuyer share", value: "67%" },
        ],
        takeaway: "Thin margins on physical assets mean small pricing errors compound into massive losses.",
      },
      {
        name: "Offerpad", country: "US", tag: "Asset-light pivot",
        summary: "Founded 2015. Differentiates by bundling moving services, free local moves and renovation. Lost 95%+ of market cap post-SPAC. Pivoted toward asset-light 'Renovate' and agent partnerships.",
        stats: [
          { label: "SPAC valuation", value: "~$3B" },
          { label: "Market cap loss", value: "95%+" },
          { label: "Markets", value: "~25" },
        ],
        takeaway: "Even bundled ancillary services couldn't rescue the core iBuying economics.",
      },
      {
        name: "Zillow Offers", country: "US", tag: "Shut down 2021",
        summary: "Zillow's iBuying arm, launched 2018. At peak, buying 3,000+ homes/quarter. Algorithmic pricing overestimated values — shut down in Nov 2021, wrote down $500–900M, laid off 25% of staff. One of proptech's most high-profile implosions.",
        stats: [
          { label: "Peak quarterly", value: "3,000 homes" },
          { label: "Writedown", value: "$500–900M" },
          { label: "Layoffs", value: "25%" },
        ],
        takeaway: "Owning the transaction through inventory is fundamentally different — and riskier — than owning it through software.",
      },
    ],
  },
  {
    id: "integrated",
    num: "03",
    title: "Integrated & Bundled Platforms",
    kicker: "End-to-end stacks",
    blurb: "Players that bundle multiple stages — search, mortgage, legal, insurance — into one consumer journey instead of forcing handoffs.",
    icon: <Layers className="w-5 h-5" />,
    color: "#3DBFAD",
    intro: "The closest analogues to what MyHome is building. Each one has stitched together search, finance, and sometimes legal or insurance — but none have the native BHG advantage we start with.",
    companies: [
      {
        name: "OneDome", country: "UK", tag: "Closest analogue",
        summary: "Combines property search, mortgage sourcing, legal conveyancing and insurance in one consumer interface. Acquired CMME, Nethouseprices, Contractor Wealth and Trussle to vertically integrate. £13.2M raised.",
        stats: [
          { label: "Annual lending", value: "£3.5B+" },
          { label: "Monthly txns", value: "1,100+" },
          { label: "Advisers", value: "105" },
        ],
        takeaway: "Proves the bundled model works — but took 5 years of acquisitions. BHG already owns the bond, insurance and data layers natively.",
      },
      {
        name: "Rocket Homes", country: "US", tag: "Vertically integrated",
        summary: "Part of Rocket Companies (America's largest mortgage lender, $100B+ annual origination). Funnels buyers from search → pre-approval → origination in one flow. Acquired Redfin in early 2025 for ~$1.75B, adding brokerage.",
        stats: [
          { label: "Parent origination", value: "$100B+/yr" },
          { label: "Redfin deal", value: "$1.75B" },
          { label: "Year", value: "2025" },
        ],
        takeaway: "The closest US player to an end-to-end housing platform — built around a mortgage engine, just like BHG could be.",
      },
      {
        name: "CommBank", country: "Australia", tag: "Bank-embedded",
        summary: "Embeds Cotality (ex-CoreLogic/PropTrack) property insights directly into its banking app. Gives mortgage customers valuations, suburb insights and home-buying tools. Partners with Home-in concierge service.",
        stats: [
          { label: "Data partner", value: "Cotality" },
          { label: "Concierge", value: "Home-in" },
          { label: "Channel", value: "Bank app" },
        ],
        takeaway: "Closest global model to MyHome's vision — but locked inside one bank. MyHome's edge is sitting above the banking layer, neutral across lenders.",
      },
    ],
  },
  {
    id: "engagement",
    num: "04",
    title: "Homeowner Engagement & Retention",
    kicker: "Post-transaction",
    blurb: "Tools that stay with the homeowner after the purchase — loyalty, maintenance, equity tracking — to capture the long tail of ownership.",
    icon: <Heart className="w-5 h-5" />,
    color: "#f59e0b",
    intro: "The bet that the real prize isn't the transaction — it's the 20+ years of ownership after it. Validates the 'Established Eleanor' end of the journey nobody currently owns at scale.",
    companies: [
      {
        name: "Bilt Rewards", country: "US", tag: "$10.75B valuation",
        summary: "The first loyalty programme for renters — points on rent transferable to airlines/hotels or saved toward a home deposit. Available in ~1 in 4 US apartment buildings. Leadership includes Ken Chenault (ex-Amex CEO) and Roger Goodell (NFL).",
        stats: [
          { label: "Valuation", value: "$10.75B" },
          { label: "Annualized rent", value: "$20B+" },
          { label: "Profitable", value: "2023" },
        ],
        takeaway: "Creates exactly the 'Transient Tom → Aspiring Amy' renter-to-buyer pipeline MyHome is targeting.",
      },
      {
        name: "Haven", country: "US", tag: "White-label",
        summary: "Homeowner loyalty platform for mortgage servicers. Borrower dashboard that sits on top of existing servicing tech — engagement, marketing, personalisation, retention via APIs. Partnered with 3 of the top US subservicers.",
        stats: [
          { label: "Homeowners", value: "1M+" },
          { label: "Model", value: "White-label" },
          { label: "Partners", value: "Top-3 subservicers" },
        ],
        takeaway: "Proves the post-transaction engagement opportunity: servicers lose 80%+ of customers at refinance.",
      },
      {
        name: "Honey Homes", country: "US", tag: "Subscription maintenance",
        summary: "Subscription service pairing each member with a dedicated handyman. Flat monthly fee covers repairs, small upgrades, preventive maintenance — all through an app. 3,000+ members in SF Bay Area and Dallas.",
        stats: [
          { label: "Founded", value: "2021" },
          { label: "Members", value: "3,000+" },
          { label: "Markets", value: "2" },
        ],
        takeaway: "Validates that homeowners will pay for subscription home care — and the monthly visits create retention a transaction platform never will.",
      },
      {
        name: "OneHomeowner", country: "US", tag: "Cotality",
        summary: "Purpose-built for MLS organisations. Monthly monitoring of home value and equity, custom home management plans, recommended projects. Extends CoreLogic's OneHome (20M+ monthly visits) into the post-transaction phase.",
        stats: [
          { label: "Parent traffic", value: "20M+/mo" },
          { label: "Retention gap", value: "<20%" },
          { label: "Focus", value: "Post-close" },
        ],
        takeaway: "Even in the US, <20% of homeowners use the same providers on their second home. The retention problem is massive and unsolved.",
      },
    ],
  },
  {
    id: "finance",
    num: "05",
    title: "Digital Finance & Mortgages",
    kicker: "Standalone financing",
    blurb: "Digital-first mortgage brokers and lenders that own the finance layer — but only the finance layer — sitting alongside (not inside) the search portals.",
    icon: <Landmark className="w-5 h-5" />,
    color: "#6366f1",
    intro: "Standalone digital brokers that own the finance layer — but only the finance layer. Where Rightmove ends at search, they pick up at mortgage. Neither side talks to the other.",
    companies: [
      {
        name: "Habito", country: "UK", tag: "£35M raised",
        summary: "Digital-first mortgage broker. Compares deals across 90+ lenders through a consumer-friendly interface. Launched 'Habito One' — a fixed-for-life mortgage underwritten by its own balance sheet.",
        stats: [
          { label: "Founded", value: "2016" },
          { label: "Lenders", value: "90+" },
          { label: "Raised", value: "£35M+" },
        ],
        takeaway: "A buyer still has to manually jump from Rightmove to Habito — exactly the gap a bundled platform closes.",
      },
    ],
  },
];

// ─── Country flags ──────────────────────────────────────────────────────────
const COUNTRY_FLAGS: Record<string, string> = {
  "US": "🇺🇸",
  "UK": "🇬🇧",
  "France": "🇫🇷",
  "Spain / PT / IT": "🇪🇸 🇵🇹 🇮🇹",
  "Belgium / LU": "🇧🇪 🇱🇺",
  "Italy": "🇮🇹",
  "Australia": "🇦🇺",
};

// ─── Sub-components ─────────────────────────────────────────────────────────
function CompanyCard({ company, color }: { company: Company; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative">
      {/* Coloured top stripe */}
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

      <div className="p-7 border-b border-slate-100" style={{ backgroundColor: `${color}08` }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#0C2340] leading-tight">{company.name}</h3>
            <div className="text-[11px] uppercase tracking-widest font-semibold mt-1 flex items-center gap-1.5" style={{ color }}>
              {COUNTRY_FLAGS[company.country] && <span className="text-base leading-none">{COUNTRY_FLAGS[company.country]}</span>}
              <span>{company.country}</span>
            </div>
          </div>
          {company.tag && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex-shrink text-white text-right leading-tight max-w-[55%] break-words"
              style={{ backgroundColor: color }}>
              {company.tag}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{company.summary}</p>
      </div>

      <div className="grid grid-cols-3 border-b border-slate-100">
        {company.stats.map((s, i) => (
          <div key={s.label} className={`p-4 ${i < 2 ? "border-r border-slate-100" : ""}`}>
            <div className="font-heading font-bold text-lg leading-none mb-1.5" style={{ color }}>{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="p-5" style={{ backgroundColor: `${color}06` }}>
        <div className="text-[10px] uppercase tracking-widest font-bold mb-1.5" style={{ color }}>Takeaway</div>
        <p className="text-sm text-[#0C2340] leading-relaxed italic">{company.takeaway}</p>
      </div>
    </div>
  );
}

function CategorySection({ cat }: { cat: Category }) {
  return (
    <section
      className="py-24 px-8 border-b border-slate-200 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${cat.color}0c 0%, ${cat.color}03 40%, #ffffff 100%)`,
      }}
    >
      {/* Decorative blob */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: cat.color }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: cat.color, boxShadow: `0 10px 30px -10px ${cat.color}80` }}
            >
              {cat.icon}
            </div>
            <div>
              <div
                className="font-heading font-bold text-5xl leading-none"
                style={{ color: cat.color }}
              >
                {cat.num}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {cat.kicker}
              </span>
            </div>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-6">
            {cat.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">{cat.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cat.companies.map((c) => (
            <CompanyCard key={c.name} company={c} color={cat.color} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Matrix ─────────────────────────────────────────────────────────────────
type Coverage = "core" | "partial" | "none";

const STAGES = [
  { id: "search", label: "Search & Listings", sub: "Top of funnel" },
  { id: "data", label: "Valuation & Data", sub: "Market intelligence" },
  { id: "finance", label: "Mortgage & Finance", sub: "Origination" },
  { id: "txn", label: "Transaction", sub: "iBuy / legal / close" },
  { id: "insurance", label: "Insurance & Ancillary", sub: "Attach products" },
  { id: "retention", label: "Post-Purchase", sub: "Ownership / retention" },
] as const;

type StageId = typeof STAGES[number]["id"];

const MATRIX: { name: string; category: string; color: string; coverage: Record<StageId, Coverage> }[] = [
  // Marketplaces
  { name: "Zillow", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "core", finance: "partial", txn: "none", insurance: "none", retention: "none" } },
  { name: "Trulia", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "none", txn: "none", insurance: "none", retention: "none" } },
  { name: "Rightmove", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "partial", txn: "none", insurance: "none", retention: "none" } },
  { name: "Zoopla", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "core", finance: "none", txn: "none", insurance: "none", retention: "none" } },
  { name: "SeLoger", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "partial", txn: "none", insurance: "none", retention: "none" } },
  { name: "Idealista", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "partial", txn: "none", insurance: "none", retention: "none" } },
  { name: "Immoweb", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "none", txn: "none", insurance: "none", retention: "none" } },
  { name: "Immobiliare.it", category: "Marketplace", color: "#0C2340",
    coverage: { search: "core", data: "partial", finance: "none", txn: "none", insurance: "none", retention: "none" } },

  // iBuying
  { name: "Opendoor", category: "iBuying", color: "#ef4444",
    coverage: { search: "partial", data: "core", finance: "none", txn: "core", insurance: "none", retention: "none" } },
  { name: "Offerpad", category: "iBuying", color: "#ef4444",
    coverage: { search: "partial", data: "core", finance: "none", txn: "core", insurance: "none", retention: "partial" } },
  { name: "Zillow Offers", category: "iBuying", color: "#ef4444",
    coverage: { search: "core", data: "core", finance: "none", txn: "core", insurance: "none", retention: "none" } },

  // Integrated
  { name: "OneDome", category: "Integrated", color: "#3DBFAD",
    coverage: { search: "core", data: "partial", finance: "core", txn: "core", insurance: "core", retention: "none" } },
  { name: "Rocket Homes", category: "Integrated", color: "#3DBFAD",
    coverage: { search: "core", data: "partial", finance: "core", txn: "core", insurance: "partial", retention: "partial" } },
  { name: "CommBank", category: "Integrated", color: "#3DBFAD",
    coverage: { search: "partial", data: "core", finance: "core", txn: "partial", insurance: "core", retention: "core" } },

  // Engagement
  { name: "Bilt Rewards", category: "Retention", color: "#f59e0b",
    coverage: { search: "none", data: "none", finance: "partial", txn: "none", insurance: "none", retention: "core" } },
  { name: "Haven", category: "Retention", color: "#f59e0b",
    coverage: { search: "none", data: "partial", finance: "partial", txn: "none", insurance: "none", retention: "core" } },
  { name: "Honey Homes", category: "Retention", color: "#f59e0b",
    coverage: { search: "none", data: "none", finance: "none", txn: "none", insurance: "none", retention: "core" } },
  { name: "OneHomeowner", category: "Retention", color: "#f59e0b",
    coverage: { search: "none", data: "core", finance: "none", txn: "none", insurance: "none", retention: "core" } },

  // Finance
  { name: "Habito", category: "Finance", color: "#6366f1",
    coverage: { search: "none", data: "none", finance: "core", txn: "partial", insurance: "partial", retention: "none" } },
];

function CoverageCell({ level, color }: { level: Coverage; color: string }) {
  if (level === "none") {
    return <div className="w-full h-8 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-slate-200" /></div>;
  }
  if (level === "partial") {
    return (
      <div className="w-full h-8 flex items-center justify-center">
        <div className="w-6 h-2 rounded-full" style={{ backgroundColor: `${color}40` }} />
      </div>
    );
  }
  return (
    <div className="w-full h-8 flex items-center justify-center">
      <div className="w-6 h-2 rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function CoverageMatrix() {
  return (
    <section className="py-28 px-8 border-b border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#3DBFAD]/10 text-[#3DBFAD] flex items-center justify-center">
              <Grid3x3 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3DBFAD]">
              The Matrix
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[#0C2340] leading-[1.05] tracking-tight mb-6">
            Who plays where.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Every competitor mapped across the six stages of the homeowner journey.
            Nobody covers the full stack — except a platform sitting inside a single country's biggest bond originator.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-5 text-[11px] uppercase tracking-widest text-slate-500 font-semibold w-56">Company</th>
                {STAGES.map((s) => (
                  <th key={s.id} className="text-center p-5 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                    <div className="text-[#0C2340]">{s.label}</div>
                    <div className="font-normal text-[9px] text-slate-400 normal-case tracking-normal mt-0.5">{s.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.name} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                      <div>
                        <div className="font-heading font-bold text-sm text-[#0C2340]">{row.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{row.category}</div>
                      </div>
                    </div>
                  </td>
                  {STAGES.map((s) => (
                    <td key={s.id} className="p-2">
                      <CoverageCell level={row.coverage[s.id]} color={row.color} />
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-8 mt-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 rounded-full bg-[#0C2340]" />
            <span>Core offering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-2 rounded-full bg-[#0C2340]/25" />
            <span>Partial / indirect</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Not present</span>
          </div>
        </div>

        <div className="mt-10 bg-[#3DBFAD]/5 border border-[#3DBFAD]/20 rounded-2xl p-8 max-w-3xl">
          <div className="text-[11px] uppercase tracking-widest text-[#3DBFAD] font-bold mb-3">What the matrix shows</div>
          <p className="text-[#0C2340] leading-relaxed">
            The only full-row players are <span className="font-bold">CommBank</span> (locked inside one bank)
            and <span className="font-bold">Rocket Homes</span> (built around one mortgage engine).
            The bundled UK play, <span className="font-bold">OneDome</span>, still stops short of post-purchase retention.
            Everyone else owns one or two columns. BHG's unique advantage is that we already operate
            across every column natively — we just need the consumer surface to tie them together.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function Landscape() {
  const totalCompanies = CATEGORIES.reduce((n, c) => n + c.companies.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Global Landscape" />

      {/* Hero */}
      <section className="py-28 px-8 relative overflow-hidden bg-[#0C2340]">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl bg-[#3DBFAD] pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl bg-indigo-500 pointer-events-none" />
        <div className="absolute top-40 left-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl bg-amber-400 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#3DBFAD]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3DBFAD]">
              Global PropTech Landscape
            </span>
          </div>
          <h1 className="font-heading font-bold text-5xl sm:text-7xl text-white leading-[0.95] tracking-tight mb-8 max-w-5xl">
            Who else is trying<br />
            <span className="bg-gradient-to-r from-[#3DBFAD] via-[#5fd9c8] to-[#3DBFAD] bg-clip-text text-transparent">to own the home?</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-12">
            <span className="font-bold text-white">{totalCompanies} companies</span> across five categories.
            Each one has claimed a slice of the homeowner journey — search, finance, transaction, or retention.
            None have the full stack. <span className="text-[#3DBFAD] font-semibold">That gap is the opportunity.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 flex flex-col relative overflow-hidden"
              >
                {/* Coloured accent stripe at top */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: c.color }} />
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white mb-3 mt-1 shadow-lg"
                  style={{ backgroundColor: c.color, boxShadow: `0 8px 20px -8px ${c.color}` }}
                >
                  {c.icon}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: c.color }}>{c.num}</div>
                <div className="font-heading font-bold text-white text-sm leading-tight mb-2">{c.title}</div>
                <p className="text-[11px] text-white/60 leading-relaxed mb-3 flex-1">{c.blurb}</p>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold pt-3 border-t border-white/10">
                  {c.companies.length} companies
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat) => (
        <div key={cat.id} id={cat.id}>
          <CategorySection cat={cat} />
        </div>
      ))}

      <CoverageMatrix />

      <AppFooter label="Global landscape scan · Draft for internal review" />
    </div>
  );
}
