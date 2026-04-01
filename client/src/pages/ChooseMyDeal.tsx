/*
 * ChooseMyDeal — Buyer-facing bond deal configurator
 */

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Bed, Bath, Car, Maximize2,
  Shield, Wrench, HeartPulse, TrendingDown,
  BadgeCheck, Zap, CircleDollarSign, FileText,
  Check, ChevronRight, Info, Lock,
  CheckCircle2, Sparkles, TrendingUp, Pencil,
} from "lucide-react";
import { ownerProperty } from "@/lib/mockData";
import { Switch } from "@/components/ui/switch";
import { BackToDashboard } from "@/components/BackToDashboard";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROPERTY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/property-hero-3MRLeyu3Lsybd5cyftJY8F.webp";
const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

const PURCHASE_PRICE        = 1_595_000;
const DEFAULT_DEPOSIT       = PURCHASE_PRICE * 0.10;
const PRIME                 = 10.25;
const CONVEYANCING_AMOUNT   = 50_000;

// ─── Data ─────────────────────────────────────────────────────────────────────

const BANKS = [
  { id: "fnb",      name: "FNB",           logo: "/banks/fnb.svg",              discount: 0.50, best: false, logoClass: "h-8"  },
  { id: "absa",     name: "Absa",          logo: "/banks/absa.svg",             discount: 0.75, best: false, logoClass: "h-7"  },
  { id: "standard", name: "Standard Bank", logo: "/banks/standard-bank.png",    discount: 1.00, best: false, logoClass: "h-7"  },
  { id: "nedbank",  name: "Nedbank",       logo: "/banks/nedbank.webp",         discount: 1.50, best: true,  logoClass: "h-10" },
];

const TERMS = [15, 20, 25, 30];

interface Addon {
  id: string;
  name: string;
  description: string;
  monthly: number;
  icon: React.ReactNode;
  required?: boolean;
  recommended?: boolean;
  highlight?: string;
}

const ADDONS: Addon[] = [
  {
    id: "building_insurance",
    name: "Building Insurance",
    description: "Required by your bank. Covers structural damage, fire, flooding and more.",
    monthly: 645,
    icon: <Shield className="w-4 h-4" />,
    required: true,
    recommended: true,
  },
  {
    id: "credit_life",
    name: "Credit Life",
    description: "Your bond is settled in full on death, permanent disability or retrenchment.",
    monthly: 338,
    icon: <HeartPulse className="w-4 h-4" />,
    required: true,
    recommended: true,
  },
  {
    id: "home_warranty",
    name: "Home Warranty",
    description: "5-year structural and latent defect cover from date of transfer.",
    monthly: 189,
    icon: <BadgeCheck className="w-4 h-4" />,
    recommended: true,
  },
  {
    id: "services_plan",
    name: "Home Services Plan",
    description: "Unlimited callouts for plumbing, electrical and appliance breakdowns.",
    monthly: 299,
    icon: <Wrench className="w-4 h-4" />,
    recommended: true,
  },
  {
    id: "geyser",
    name: "Smart Geyser Controller",
    description: "Hardware installed at handover + monthly monitoring. Average saving: R450/month on electricity.",
    monthly: 149,
    icon: <Zap className="w-4 h-4" />,
    highlight: "Pays for itself",
    recommended: true,
  },
  {
    id: "credit_shortfall",
    name: "Credit Shortfall",
    description: "Covers the gap if your property is sold under distress for less than the outstanding bond.",
    monthly: 125,
    icon: <TrendingDown className="w-4 h-4" />,
  },
  {
    id: "electrical",
    name: "Electrical & Compliance",
    description: "Annual COC renewal, geyser compliance and smart monitoring subscription.",
    monthly: 89,
    icon: <CircleDollarSign className="w-4 h-4" />,
  },
  {
    id: "conveyancing",
    name: "Conveyancing Bundle",
    description: "Transfer attorney fees (~R50,000) negotiated at a reduced rate and rolled into your bond — spread over your loan term instead of paid upfront at registration.",
    monthly: 441,
    icon: <FileText className="w-4 h-4" />,
    highlight: "Roll into bond",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcMonthly(annualRatePct: number, termYears: number, principal: number) {
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function fmtRand(n: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency", currency: "ZAR", maximumFractionDigits: 0,
  }).format(n);
}

// ─── Bank Card ────────────────────────────────────────────────────────────────

function BankCard({
  bank,
  selected,
  monthly,
  onSelect,
}: {
  bank: typeof BANKS[0];
  selected: boolean;
  monthly: number;
  onSelect: () => void;
}) {
  const effectiveRate = (PRIME - bank.discount).toFixed(2);

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative w-full text-left rounded-2xl border p-4 transition-all duration-200 bg-white ${
        selected
          ? "border-[#0C2340] shadow-md shadow-black/[0.06] ring-1 ring-[#0C2340]"
          : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
      }`}
    >
      {bank.best && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#3DBFAD] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap">
          <Sparkles className="w-2.5 h-2.5" /> Best rate
        </div>
      )}

      {/* Logo */}
      <div className="h-10 flex items-center mb-3">
        <img
          src={bank.logo}
          alt={bank.name}
          className={`object-contain object-left ${bank.logoClass} max-w-[110px]`}
        />
      </div>

      {/* Rate */}
      <div className="mb-0.5 flex items-baseline gap-1">
        <span className="text-xl font-heading font-bold text-[#0C2340]">{effectiveRate}%</span>
        <span className="text-slate-400 text-xs">p.a.</span>
      </div>
      <div className="text-slate-400 text-[11px] mb-3">
        Prime − {bank.discount}%&nbsp;&nbsp;·&nbsp;&nbsp;Variable
      </div>

      {/* Monthly preview */}
      <div className="rounded-lg bg-[#f0f5fa] px-3 py-2">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Monthly</div>
        <div className="font-heading font-bold text-[#0C2340] text-sm">{fmtRand(monthly)}</div>
      </div>

      {/* Select indicator */}
      <div
        className={`mt-3 rounded-lg py-2 text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
          selected
            ? "bg-[#0C2340] text-white"
            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
        {selected ? "Selected" : "Select"}
      </div>
    </motion.button>
  );
}

// ─── Addon Card ───────────────────────────────────────────────────────────────

function AddonCard({
  addon,
  enabled,
  onToggle,
}: {
  addon: Addon;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors duration-200 ${
        enabled ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
          enabled ? "bg-[#3DBFAD]/10 text-[#3DBFAD]" : "bg-slate-100 text-slate-400"
        }`}>
          {addon.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-heading font-semibold text-[#0C2340] text-sm">{addon.name}</span>
            {addon.required && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" /> Required
              </span>
            )}
            {addon.highlight && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" /> {addon.highlight}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">{addon.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
          <span className={`text-sm font-bold font-heading ${enabled ? "text-[#0C2340]" : "text-slate-400"}`}>
            {fmtRand(addon.monthly)}<span className="text-[10px] font-normal text-slate-400">/mo</span>
          </span>
          {addon.required ? (
            <div className="w-9 h-5 rounded-full bg-[#3DBFAD]/10 flex items-center justify-center">
              <Lock className="w-3 h-3 text-[#3DBFAD]" />
            </div>
          ) : (
            <Switch
              checked={enabled}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-[#3DBFAD]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChooseMyDeal() {
  const [selectedBank, setSelectedBank] = useState("nedbank");
  const [term, setTerm] = useState(20);
  const [enabledAddons, setEnabledAddons] = useState<string[]>(
    ADDONS.filter((a) => a.required || a.recommended).map((a) => a.id)
  );
  const [confirmed, setConfirmed] = useState(false);
  const [depositAmount, setDepositAmount] = useState(DEFAULT_DEPOSIT);
  const [depositEditing, setDepositEditing] = useState(false);
  const [depositInputStr, setDepositInputStr] = useState("");
  const depositInputRef = useRef<HTMLInputElement>(null);

  const bondAmount = PURCHASE_PRICE - depositAmount;
  const depositPct = ((depositAmount / PURCHASE_PRICE) * 100).toFixed(1).replace(/\.0$/, "");

  function handleDepositFocus() {
    setDepositInputStr(String(Math.round(depositAmount)));
    setDepositEditing(true);
    setTimeout(() => depositInputRef.current?.select(), 0);
  }

  function handleDepositBlur() {
    const parsed = parseInt(depositInputStr.replace(/\D/g, ""), 10);
    if (!isNaN(parsed)) {
      setDepositAmount(Math.min(Math.max(parsed, 0), PURCHASE_PRICE));
    }
    setDepositEditing(false);
  }

  const bank = BANKS.find((b) => b.id === selectedBank)!;
  const effectiveRate = PRIME - bank.discount;

  const monthlyBond = useMemo(
    () => calcMonthly(effectiveRate, term, bondAmount),
    [effectiveRate, term, bondAmount]
  );

  const bankMonthlyMap = useMemo(
    () => Object.fromEntries(BANKS.map((b) => [b.id, calcMonthly(PRIME - b.discount, term, bondAmount)])),
    [term, bondAmount]
  );

  const activeAddons = ADDONS.filter((a) => enabledAddons.includes(a.id));
  const addonTotal = activeAddons.reduce((sum, a) => sum + a.monthly, 0);
  const totalMonthly = monthlyBond + addonTotal;

  function toggleAddon(id: string) {
    setEnabledAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="container py-3 flex items-center justify-between">
          <img src={LOGO} alt="MyHome" className="h-6" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>Property Report</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#0C2340] font-semibold">Choose My Deal</span>
            </div>
            <BackToDashboard />
          </div>
        </div>
      </div>

      {/* Page title */}
      <div className="border-b border-border bg-white">
        <div className="container py-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-4">
            <CheckCircle2 className="w-3 h-3" />
            Bond Approval Received
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#0C2340] mb-1">
            Choose My Deal
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mb-4">
            Your bond application has been approved by multiple banks. Select your preferred offer and customise your add-ons.
          </p>
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-[#0C2340] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">RB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-[#0C2340]">Rudy Buerta</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">Verified</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                SA ID · 8804155012088 · Primary applicant
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">

        {/* Property card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-52 h-36 sm:h-auto flex-shrink-0 relative overflow-hidden">
              <img src={PROPERTY_IMG} alt={ownerProperty.address} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <MapPin className="w-3 h-3" />
                  {ownerProperty.suburb}, {ownerProperty.city}
                </div>
                <h2 className="font-heading font-bold text-[#0C2340] text-lg leading-snug">
                  {ownerProperty.address}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{ownerProperty.bedrooms} bed</span>
                  <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{ownerProperty.bathrooms} bath</span>
                  <span className="flex items-center gap-1"><Car className="w-3 h-3" />{ownerProperty.garages} garage</span>
                  <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{ownerProperty.buildingSize}m²</span>
                </div>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Purchase price</div>
                <div className="font-heading font-bold text-[#0C2340] text-2xl">{fmtRand(PURCHASE_PRICE)}</div>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-xs text-muted-foreground">Deposit</span>
                  <div
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 border transition-colors cursor-text ${
                      depositEditing
                        ? "border-[#3DBFAD] bg-white"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                    onClick={() => depositInputRef.current?.focus()}
                  >
                    <span className="text-xs text-muted-foreground">R</span>
                    <input
                      ref={depositInputRef}
                      className="text-xs font-semibold text-[#0C2340] bg-transparent outline-none w-20 text-right"
                      value={depositEditing ? depositInputStr : Math.round(depositAmount).toLocaleString("en-ZA")}
                      onChange={(e) => setDepositInputStr(e.target.value)}
                      onFocus={handleDepositFocus}
                      onBlur={handleDepositBlur}
                      onKeyDown={(e) => e.key === "Enter" && depositInputRef.current?.blur()}
                    />
                    {!depositEditing && <Pencil className="w-2.5 h-2.5 text-slate-400" />}
                  </div>
                  <span className="text-xs text-muted-foreground">({depositPct}%) · Bond {fmtRand(bondAmount)}</span>
                </div>
                <div className={`mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                  enabledAddons.includes("conveyancing")
                    ? "bg-[#3DBFAD]/10 text-[#1a9d8e]"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  {enabledAddons.includes("conveyancing")
                    ? `+ ${fmtRand(CONVEYANCING_AMOUNT)} conveyancing rolled in · effective bond ${fmtRand(bondAmount + CONVEYANCING_AMOUNT)}`
                    : `+ ${fmtRand(CONVEYANCING_AMOUNT)} conveyancing fees — roll into bond?`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* Left */}
          <div className="space-y-8">

            {/* Bank selection */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-heading font-bold text-[#0C2340] text-lg mb-1">Select Your Bank</h2>
              <p className="text-muted-foreground text-sm mb-5">
                All four banks have approved your bond. Rates are variable, linked to prime ({PRIME}%).
              </p>

              {/* Term selector */}
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-sm font-medium text-slate-600 mr-1">Loan term:</span>
                {TERMS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTerm(t)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      term === t
                        ? "bg-[#0C2340] text-white border-[#0C2340]"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {t} yrs
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {BANKS.map((b) => (
                  <BankCard
                    key={b.id}
                    bank={b}
                    selected={selectedBank === b.id}
                    monthly={bankMonthlyMap[b.id]}
                    onSelect={() => setSelectedBank(b.id)}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-px" />
                Variable rate — your monthly repayment adjusts whenever the prime lending rate changes.
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="font-heading font-bold text-[#0C2340] text-lg">Add-Ons</h2>
                <span className="text-muted-foreground text-xs">
                  {activeAddons.length} of {ADDONS.length} selected
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Bundled into your monthly commitment. Required products are included by your lender.
              </p>
              <div className="space-y-3">
                {ADDONS.map((addon) => (
                  <AddonCard
                    key={addon.id}
                    addon={addon}
                    enabled={enabledAddons.includes(addon.id)}
                    onToggle={() => !addon.required && toggleAddon(addon.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — sticky summary */}
          <div>
            <div className="sticky top-[64px]">
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">

              {/* Summary header */}
              <div className="bg-[#0C2340] px-5 py-5">
                <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Total monthly</div>
                <div className="font-heading font-bold text-white text-3xl">
                  {fmtRand(totalMonthly)}
                  <span className="text-white/50 text-sm font-normal">/mo</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <TrendingUp className="w-3 h-3 text-[#3DBFAD]" />
                  <span className="text-xs text-white/50">
                    {((totalMonthly / PURCHASE_PRICE) * 100).toFixed(2)}% of purchase price per month
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-5">

                {/* Bond breakdown */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">Bond</div>
                  <div className="space-y-2">
                    {[
                      { label: "Bank",       value: bank.name },
                      { label: "Rate",       value: `${effectiveRate.toFixed(2)}% p.a.` },
                      { label: "Term",       value: `${term} years` },
                      { label: "Bond",       value: fmtRand(bondAmount) },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium text-[#0C2340]">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="text-muted-foreground">Monthly repayment</span>
                      <span className="font-bold text-[#0C2340]">{fmtRand(monthlyBond)}</span>
                    </div>
                  </div>
                </div>

                {/* Add-ons breakdown */}
                {activeAddons.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">Add-Ons</div>
                    <div className="space-y-2">
                      {activeAddons.map((a) => (
                        <div key={a.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground truncate pr-2">{a.name}</span>
                          <span className="text-[#0C2340] flex-shrink-0">{fmtRand(a.monthly)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="text-muted-foreground">Add-ons total</span>
                        <span className="font-bold text-[#0C2340]">{fmtRand(addonTotal)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total row */}
                <div className="rounded-xl bg-[#f0f5fa] border border-border p-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#0C2340]">Total monthly</span>
                    <span className="font-heading font-bold text-[#0C2340] text-lg">{fmtRand(totalMonthly)}</span>
                  </div>
                </div>

                {/* CTA */}
                <AnimatePresence mode="wait">
                  {confirmed ? (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center"
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                      <p className="font-heading font-bold text-emerald-800 text-sm">Deal confirmed!</p>
                      <p className="text-emerald-600 text-xs mt-0.5">A consultant will be in touch within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="cta"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConfirmed(true)}
                      className="w-full bg-[#3DBFAD] hover:bg-[#35a899] text-white font-heading font-bold py-3.5 rounded-xl text-sm transition-colors"
                    >
                      Confirm My Deal
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  By confirming you agree to be contacted by a bond consultant. No commitment required.
                </p>
              </div>
            </div>
            </div>
          </div>

        </div>

        {/* Compliance block */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              {
                heading: "Rates are variable",
                body: "All interest rates quoted are linked to the South African Reserve Bank's prime lending rate, currently 10.25%. Your repayment will adjust whenever prime changes.",
              },
              {
                heading: "Products are optional",
                body: "Except where marked as required by your lender, all add-on products are optional. You may source equivalent cover independently before registration.",
              },
              {
                heading: "This is not financial advice",
                body: "The figures shown are indicative estimates based on the information provided. Consult a registered financial adviser before making any commitment.",
              },
            ].map((item) => (
              <div key={item.heading}>
                <p className="text-xs font-semibold text-[#0C2340] mb-1">{item.heading}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt="MyHome" className="h-5 opacity-50" />
              <span className="text-slate-300 text-xs">|</span>
              <span className="text-xs text-slate-400">Powered by MyHome · Internal prototype</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {["Privacy Policy", "Terms of Use", "POPIA Compliance", "FSP Licence"].map((label) => (
                <span key={label} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">{label}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
