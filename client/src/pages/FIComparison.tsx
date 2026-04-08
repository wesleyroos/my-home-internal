/*
 * FIComparison — Vehicle F&I process vs. proposed Home F&I equivalent
 * Canvas / Figma-style layout: dotted grid, framed flows, connected nodes
 */

import { motion, useInView } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  Car,
  Home,
  Shield,
  Wrench,
  MapPin,
  HeartPulse,
  TrendingDown,
  Paintbrush,
  CircleDollarSign,
  FileText,
  BadgeCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Truck,
  Sparkle,
  Sun,
  Droplets,
} from "lucide-react";

// ─── Reveal ──────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

type Status = "exists" | "proposed" | "partial";

interface Product {
  icon: React.ReactNode;
  name: string;
  description: string;
  status: Status;
}

const vehicleSteps = [
  {
    role: "Sales Executive",
    description: "Agrees price, closes the vehicle deal.",
    dim: false,
  },
  {
    role: "F&I Manager",
    description: "Takes over post-sale. Presents finance & insurance products in a structured sit-down.",
    highlight: true,
    label: "Key handover",
  },
  {
    role: "Finance Application",
    description: "Submitted to WesBank, Absa, FNB, MFC. Best rate selected.",
    dim: false,
  },
];

const homeSteps = [
  {
    role: "Estate Agent",
    description: "Markets and sells the property.",
    dim: false,
  },
  {
    role: "OTP Accepted",
    description: "Offer to Purchase signed. Deposit paid.",
    dim: false,
  },
  {
    role: "Bond Consultant",
    description: "Betterbond / ooba submits to multiple banks simultaneously. This same consultant should present the full product suite at bond approval — just like F&I in motor. This moment barely exists today.",
    highlight: true,
    label: "Proposed F&I moment",
    parallel: true,
  },
  {
    role: "Conveyancer",
    description: "Transfer attorney registers the property into the buyer's name. Fees cover attorney costs, deeds office and transfer duty — typically R40,000–R120,000+ depending on purchase price.",
    highlight: false,
    label: "Significant cost",
    parallel: true,
  },
];

const vehicleProducts: Product[] = [
  { icon: <Shield className="w-3.5 h-3.5" />, name: "Extended Warranty", description: "Mechanical breakdown cover post-manufacturer warranty.", status: "exists" },
  { icon: <Wrench className="w-3.5 h-3.5" />, name: "Service Plan", description: "Prepaid scheduled maintenance over a set km / year term.", status: "exists" },
  { icon: <MapPin className="w-3.5 h-3.5" />, name: "Netstar Tracking", description: "GPS theft tracking & stolen vehicle recovery.", status: "exists" },
  { icon: <HeartPulse className="w-3.5 h-3.5" />, name: "Credit Life", description: "Settles loan on death, disability or retrenchment.", status: "exists" },
  { icon: <TrendingDown className="w-3.5 h-3.5" />, name: "Credit Shortfall", description: "Covers gap between insurer payout and outstanding finance.", status: "exists" },
  { icon: <Paintbrush className="w-3.5 h-3.5" />, name: "Scratch & Dent", description: "Cosmetic paintwork and panel damage cover.", status: "exists" },
  { icon: <Wrench className="w-3.5 h-3.5" />, name: "Tyre & Rim", description: "Tyre and alloy rim replacement cover.", status: "exists" },
  { icon: <CircleDollarSign className="w-3.5 h-3.5" />, name: "Admin Fee", description: "Dealership deal preparation fee.", status: "exists" },
  { icon: <FileText className="w-3.5 h-3.5" />, name: "Registration Fee", description: "NATIS vehicle licensing and registration.", status: "exists" },
];

const homeProducts: Product[] = [
  { icon: <BadgeCheck className="w-3.5 h-3.5" />, name: "Home Warranty", description: "Structural & latent defect cover post-transfer.", status: "partial" },
  { icon: <Wrench className="w-3.5 h-3.5" />, name: "Home Services Plan", description: "Prepaid cover — plumbing, electrical, appliances.", status: "proposed" },
  { icon: <Zap className="w-3.5 h-3.5" />, name: "Smart Geyser Controller", description: "Hardware at pre-transfer + monitoring sub. Easy bolt-on, brilliant margins.", status: "proposed" },
  { icon: <HeartPulse className="w-3.5 h-3.5" />, name: "Credit Life", description: "Covers bond on death, disability or retrenchment.", status: "exists" },
  { icon: <TrendingDown className="w-3.5 h-3.5" />, name: "Credit Shortfall", description: "Covers gap if property sells below outstanding bond.", status: "exists" },
  { icon: <Shield className="w-3.5 h-3.5" />, name: "Building Insurance", description: "Required by all lenders. Rarely packaged as a value-add.", status: "exists" },
  { icon: <Zap className="w-3.5 h-3.5" />, name: "Electrical & Compliance", description: "COC certs, solar/EV readiness — new bundleable product.", status: "proposed" },
  { icon: <CircleDollarSign className="w-3.5 h-3.5" />, name: "Admin Fee", description: "Bond originator and attorney administration fees.", status: "exists" },
  { icon: <Truck className="w-3.5 h-3.5" />, name: "Move-in Service", description: "Professional moving service scaled to property size and location. Rolled into bond.", status: "proposed" },
  { icon: <FileText className="w-3.5 h-3.5" />, name: "Conveyancing Bundle", description: "Transfer attorney fees negotiated and bundled. Opportunity to roll into bond for cash-flow relief.", status: "proposed" },
  { icon: <Sparkle className="w-3.5 h-3.5" />, name: "Cleaning Service", description: "Fortnightly professional clean from a vetted team. Pure recurring revenue, high stickiness.", status: "proposed" },
  { icon: <Sun className="w-3.5 h-3.5" />, name: "Solar Installation", description: "5kW rooftop solar + battery backup capitalised into the bond. Capex bundle with strong attach economics.", status: "proposed" },
  { icon: <Droplets className="w-3.5 h-3.5" />, name: "Water Tank & Pump", description: "JoJo tank, filtration and pressure pump installed at handover. Rolled into bond like solar.", status: "proposed" },
];

const equivalencies = [
  { vehicle: "Sales Executive",     home: "Estate Agent",                      match: "direct"   },
  { vehicle: "F&I Manager",         home: "Bond Consultant",                   match: "proposed" },
  { vehicle: "Finance Application", home: "Bond Application (Betterbond/ooba)",match: "direct"   },
  { vehicle: "Extended Warranty",   home: "Home Warranty",                     match: "partial"  },
  { vehicle: "Service Plan",        home: "Home Services Plan",                match: "proposed" },
  { vehicle: "Netstar Tracking",    home: "Smart Geyser Controller",           match: "proposed" },
  { vehicle: "Credit Life",         home: "Credit Life",                       match: "direct"   },
  { vehicle: "Credit Shortfall",    home: "Credit Shortfall",                  match: "direct"   },
  { vehicle: "Scratch & Dent",      home: "Building Insurance",                match: "partial"  },
  { vehicle: "Tyre & Rim",          home: "Electrical & Compliance",           match: "proposed" },
  { vehicle: "Admin Fee",           home: "Admin Fee",                         match: "direct"   },
  { vehicle: "Registration Fee",    home: "Transfer Duty / Conveyancing",      match: "partial"  },
];

// ─── Canvas sub-components ───────────────────────────────────────────────────

function FlowNode({
  role,
  description,
  highlight,
  label,
}: {
  role: string;
  description: string;
  highlight?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 relative transition-shadow ${
        highlight
          ? "border-[#3DBFAD] bg-[#3DBFAD]/5 shadow-md shadow-[#3DBFAD]/15"
          : "border-slate-200 bg-white shadow-sm shadow-black/[0.04]"
      }`}
    >
      {label && (
        <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-widest bg-[#3DBFAD] text-white px-2 py-0.5 rounded-full">
          {label}
        </span>
      )}
      <p className="font-heading font-bold text-[#0C2340] text-[13px] leading-snug mb-1">
        {role}
      </p>
      <p className="text-slate-500 text-[11px] leading-relaxed">{description}</p>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex flex-col items-center py-0.5 my-0.5">
      <div className="w-px h-4 bg-slate-300" />
      <svg width="8" height="5" viewBox="0 0 8 5">
        <path d="M4 5L0 0H8L4 5Z" fill="#94a3b8" />
      </svg>
    </div>
  );
}

const statusConfig = {
  exists:   { icon: <CheckCircle2 className="w-3 h-3" />, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  partial:  { icon: <AlertCircle  className="w-3 h-3" />, color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100"   },
  proposed: { icon: <PlusCircle   className="w-3 h-3" />, color: "text-[#1a9d8e]",   bg: "bg-[#3DBFAD]/8",border: "border-[#3DBFAD]/20" },
};

function ProductRow({ product }: { product: Product }) {
  const s = statusConfig[product.status];
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${s.border}`}>
      <div className={`flex-shrink-0 mt-0.5 ${s.color}`}>{product.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-[#0C2340]">{product.name}</span>
          <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${s.bg} ${s.color}`}>
            {s.icon}
            {product.status === "exists" ? "Exists" : product.status === "partial" ? "Partial" : "Proposed"}
          </span>
        </div>
        <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">{product.description}</p>
      </div>
    </div>
  );
}

function CanvasFrame({
  side,
  accentColor,
  borderColor,
  icon,
  title,
  subtitle,
  steps,
  products,
  productsLabel,
  delay,
}: {
  side: "motor" | "home";
  accentColor: string;
  borderColor: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  steps: { role: string; description: string; highlight?: boolean; label?: string; parallel?: boolean }[];
  products: Product[];
  productsLabel: string;
  delay: number;
}) {
  // Group consecutive parallel steps into rows
  const rows: (typeof steps[0] | typeof steps)[] = [];
  let i = 0;
  while (i < steps.length) {
    if (steps[i].parallel && steps[i + 1]?.parallel) {
      rows.push([steps[i], steps[i + 1]] as typeof steps);
      i += 2;
    } else {
      rows.push(steps[i]);
      i++;
    }
  }

  return (
    <Reveal delay={delay} className="relative">
      {/* Figma-style frame label tab */}
      <div
        className="absolute -top-3.5 left-4 z-10 flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-sm"
        style={{ backgroundColor: accentColor }}
      >
        {icon}
        <span>{title}</span>
        <span className="opacity-60 font-normal">—</span>
        <span className="opacity-70 font-normal">{subtitle}</span>
      </div>

      {/* Frame body */}
      <div
        className="rounded-2xl bg-white/55 backdrop-blur-sm p-4 pt-5"
        style={{ border: `2px solid ${borderColor}` }}
      >
        {/* Flow steps */}
        <div className="flex flex-col">
          {rows.map((row, ri) => (
            <div key={Array.isArray(row) ? row[0].role : row.role}>
              {Array.isArray(row) ? (
                <div className="grid grid-cols-2 gap-2">
                  {row.map((step) => <FlowNode key={step.role} {...step} />)}
                </div>
              ) : (
                <FlowNode {...row} />
              )}
              {ri < rows.length - 1 && <FlowConnector />}
            </div>
          ))}
        </div>

        {/* Connector to products */}
        <FlowConnector />

        {/* Products box */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2.5 px-0.5">
            {productsLabel}
          </p>
          <div className="space-y-1.5">
            {products.map((p) => (
              <ProductRow key={p.name} product={p} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MatchBadge({ match }: { match: string }) {
  if (match === "direct")
    return <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap">Direct match</span>;
  if (match === "partial")
    return <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">Partial</span>;
  return <span className="text-[10px] font-medium bg-[#3DBFAD]/10 text-[#1a9d8e] px-2 py-0.5 rounded-full whitespace-nowrap">Proposed</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FIComparison() {
  return (
    <div className="min-h-screen bg-[#f0f5fa] overflow-x-hidden">

      <AppHeader label="F&I · Strategic Framework" />

      {/* Header */}
      <div className="bg-[#0C2340] text-white">
        <div className="container py-10 sm:py-14">
          <Reveal>
            <div className="flex items-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="w-4 h-px bg-[#3DBFAD]" />
              Strategic Framework
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 max-w-2xl">
              The Home F&I Opportunity
            </h1>
            <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed">
              Motor has mastered post-sale product bundling through F&I. This maps the
              equivalent process for residential property — and the gap we want to fill.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Canvas ── */}
      <div
        className="py-14 overflow-x-auto"
        style={{
          backgroundColor: "#e8eef5",
          backgroundImage: "radial-gradient(#b8c8d8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="container" style={{ minWidth: 720 }}>
          <Reveal className="mb-8">
            <h2 className="font-heading font-bold text-lg text-[#0C2340] mb-1">
              Post-Sale Process
            </h2>
            <p className="text-slate-500 text-sm">
              How value is captured after the deal is done — and how it should work in property.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-6 items-start">
            <CanvasFrame
              side="motor"
              accentColor="#0C2340"
              borderColor="rgba(12,35,64,0.2)"
              icon={<Car className="w-3.5 h-3.5" />}
              title="Motor Vehicle"
              subtitle="How it works today"
              steps={vehicleSteps}
              products={vehicleProducts}
              productsLabel="F&I products presented"
              delay={0}
            />
            <CanvasFrame
              side="home"
              accentColor="#3DBFAD"
              borderColor="rgba(61,191,173,0.35)"
              icon={<Home className="w-3.5 h-3.5" />}
              title="Residential Property"
              subtitle="What we want to build"
              steps={homeSteps}
              products={homeProducts}
              productsLabel="Home F&I products"
              delay={0.08}
            />
          </div>
        </div>
      </div>

      {/* ── Equivalency table ── */}
      <div className="bg-white border-y border-border">
        <div className="container py-12 sm:py-16">
          <Reveal>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#0C2340] mb-1">
              Product Equivalencies
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl">
              Every motor F&I product has a direct or logical home equivalent. Most
              simply don't exist as packaged offerings yet.
            </p>
          </Reveal>

          <div>
            <div className="grid grid-cols-[1fr_28px_1fr_auto] gap-x-3 border-b border-border pb-2 mb-0.5 px-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Car className="w-3 h-3" /> Motor
              </div>
              <div />
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Home className="w-3 h-3" /> Property
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Status
              </div>
            </div>

            {equivalencies.map((row, i) => (
              <Reveal key={row.vehicle} delay={0.025 * i}>
                <div className="grid grid-cols-[1fr_28px_1fr_auto] gap-x-3 items-center border-b border-border/50 py-3 hover:bg-[#f0f5fa]/70 transition-colors rounded px-1 -mx-1">
                  <span className="text-sm font-medium text-[#0C2340]">{row.vehicle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3DBFAD] mx-auto" />
                  <span className="text-sm text-[#0C2340]">{row.home}</span>
                  <div className="text-right">
                    <MatchBadge match={row.match} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted-foreground">
              {[
                { dot: "bg-emerald-500", label: "Direct match — product exists in both" },
                { dot: "bg-amber-500",   label: "Partial — exists but not consistently packaged" },
                { dot: "bg-[#3DBFAD]",  label: "Proposed — market gap, product to be built" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                  {item.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Gap callout ── */}
      <div className="container py-12 sm:py-16">
        <Reveal>
          <div className="bg-[#0C2340] rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-start gap-3 mb-6">
              <Info className="w-5 h-5 text-[#3DBFAD] flex-shrink-0 mt-0.5" />
              <h2 className="font-heading font-bold text-white text-lg sm:text-xl">
                The Gap in the Market
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {[
                {
                  heading: "No structured handover",
                  body: "In motor, the F&I manager is a defined, trained role. In property there's no equivalent. The estate agent closes the deal and the bond consultant (Betterbond/ooba) processes finance — but that same consultant never sits with the buyer to present a structured product suite.",
                },
                {
                  heading: "Products exist, but scattered",
                  body: "Credit life, building insurance and home warranties all exist as standalone products. They're just never bundled and presented in a single session at bond approval — the highest-intent moment in a buyer's journey.",
                },
                {
                  heading: "The MyHome opportunity",
                  body: "MyHome is positioned to become the Home F&I layer. The property report creates the relationship. Bond approval is the trigger. A structured product presentation at that moment mirrors exactly what motor has perfected.",
                },
              ].map((card, i) => (
                <Reveal key={card.heading} delay={0.08 * i}>
                  <div className="border border-white/10 rounded-xl p-4">
                    <h3 className="font-heading font-bold text-[#3DBFAD] text-sm mb-2">{card.heading}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{card.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-amber-400 text-sm">Next step: Bank partnership conversations</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">13 April</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">
                    A key unknown is which products banks will allow to be bundled into or presented alongside the bond. Meeting scheduled with Stephan (13 April) to explore what banks will include, what they'll refer, and what commercial model makes sense.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-heading font-semibold text-sm mb-0.5">See it in action</p>
                <p className="text-white/50 text-xs">Walk through the buyer-facing "Choose My Deal" experience — the Home F&I session, prototyped.</p>
              </div>
              <a
                href="/deal"
                className="inline-flex items-center gap-2 bg-[#3DBFAD] hover:bg-[#35a899] text-white font-heading font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
              >
                View Choose My Deal
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <AppFooter label="Internal strategy framework · Not for distribution" />
    </div>
  );
}
