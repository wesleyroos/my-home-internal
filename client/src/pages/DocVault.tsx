/*
 * DocVault — Friendly homeowner document vault.
 * Sidebar nav + warm, large-text consumer layout designed to be reassuring for older users.
 */

import { useState } from "react";
import {
  FileText, Shield, Home, Landmark, ScrollText,
  Lock, CheckCircle2, Upload, Eye, Download,
  Clock, FolderOpen, LifeBuoy, Share2, Phone, Sparkles,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "verified" | "uploaded" | "pending" | "empty";

interface Document {
  id: string;
  name: string;
  category: CategoryId;
  icon: React.ReactNode;
  status: DocStatus;
  date?: string;
  issuer?: string;
}

type CategoryId = "ownership" | "bond" | "insurance" | "transfer" | "compliance";

interface Category {
  id: CategoryId | "all";
  label: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: "all",         label: "All documents", icon: <FolderOpen className="w-5 h-5" />, color: "#0C2340" },
  { id: "ownership",   label: "Ownership",     icon: <ScrollText className="w-5 h-5" />, color: "#3DBFAD" },
  { id: "bond",        label: "Home loan",     icon: <Landmark className="w-5 h-5" />,   color: "#6366f1" },
  { id: "insurance",   label: "Insurance",     icon: <Shield className="w-5 h-5" />,     color: "#ef4444" },
  { id: "transfer",    label: "Transfer",      icon: <FileText className="w-5 h-5" />,   color: "#f59e0b" },
  { id: "compliance",  label: "Compliance",    icon: <CheckCircle2 className="w-5 h-5" />, color: "#10b981" },
];

const DOCUMENTS: Document[] = [
  { id: "title_deed",        name: "Title Deed",                category: "ownership",  icon: <ScrollText className="w-6 h-6" />, status: "verified", date: "15 Nov 2024", issuer: "Deeds Office, Pretoria" },
  { id: "valuation",         name: "Property Valuation",        category: "ownership",  icon: <Home className="w-6 h-6" />,        status: "verified", date: "22 Oct 2024", issuer: "Lightstone Property" },
  { id: "bond_agreement",    name: "Home Loan Agreement",       category: "bond",       icon: <Landmark className="w-6 h-6" />,    status: "verified", date: "30 Oct 2024", issuer: "Nedbank Home Loans" },
  { id: "bond_statement",    name: "Latest Bond Statement",     category: "bond",       icon: <FileText className="w-6 h-6" />,    status: "uploaded", date: "1 Mar 2025",  issuer: "Nedbank" },
  { id: "building_insurance", name: "Building Insurance",       category: "insurance",  icon: <Shield className="w-6 h-6" />,      status: "verified", date: "1 Nov 2024",  issuer: "BetterSure" },
  { id: "home_warranty",     name: "Home Warranty",             category: "insurance",  icon: <Shield className="w-6 h-6" />,      status: "uploaded", date: "15 Nov 2024", issuer: "BHG Home Warranty" },
  { id: "credit_life",       name: "Credit Life Cover",         category: "insurance",  icon: <Shield className="w-6 h-6" />,      status: "verified", date: "1 Nov 2024",  issuer: "BetterSure" },
  { id: "otp",               name: "Offer to Purchase",         category: "transfer",   icon: <FileText className="w-6 h-6" />,    status: "verified", date: "8 Oct 2024",  issuer: "RE/MAX" },
  { id: "transfer_docs",     name: "Transfer Documents",        category: "transfer",   icon: <ScrollText className="w-6 h-6" />,  status: "verified", date: "10 Nov 2024", issuer: "STBB Attorneys" },
  { id: "coc",               name: "Electrical Compliance",     category: "compliance", icon: <CheckCircle2 className="w-6 h-6" />,status: "uploaded", date: "20 Oct 2024", issuer: "Certified Electricians SA" },
  { id: "rates",             name: "Rates Clearance",           category: "compliance", icon: <FileText className="w-6 h-6" />,    status: "pending" },
  { id: "plans",             name: "Approved Building Plans",   category: "compliance", icon: <FolderOpen className="w-6 h-6" />,  status: "empty" },
];

const STATUS_CONFIG: Record<DocStatus, { label: string; pillBg: string; pillText: string; iconBg: string; iconText: string }> = {
  verified: { label: "Verified",     pillBg: "bg-emerald-50", pillText: "text-emerald-700", iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
  uploaded: { label: "Saved",        pillBg: "bg-blue-50",    pillText: "text-blue-700",    iconBg: "bg-blue-100",    iconText: "text-blue-600" },
  pending:  { label: "On the way",   pillBg: "bg-amber-50",   pillText: "text-amber-700",   iconBg: "bg-amber-100",   iconText: "text-amber-600" },
  empty:    { label: "Add this",     pillBg: "bg-slate-100",  pillText: "text-slate-500",   iconBg: "bg-slate-100",   iconText: "text-slate-400" },
};

// ─── Components ───────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: DocStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.pillBg} ${cfg.pillText}`}>
      {status === "verified" && <CheckCircle2 className="w-3.5 h-3.5" />}
      {status === "uploaded" && <Upload className="w-3.5 h-3.5" />}
      {status === "pending"  && <Clock className="w-3.5 h-3.5" />}
      {cfg.label}
    </span>
  );
}

function DocCard({ doc }: { doc: Document }) {
  const cfg = STATUS_CONFIG[doc.status];
  const isEmpty = doc.status === "empty";

  return (
    <div className={`rounded-2xl p-6 transition-all duration-200 ${
      isEmpty
        ? "bg-white border-2 border-dashed border-slate-200 hover:border-[#3DBFAD]/50"
        : "bg-white border border-slate-200 hover:shadow-lg hover:-translate-y-0.5"
    }`}>
      <div className="flex items-start gap-5">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg} ${cfg.iconText}`}>
          {doc.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-heading font-bold text-xl text-[#0C2340] leading-tight">{doc.name}</h3>
            <StatusPill status={doc.status} />
          </div>

          {doc.issuer ? (
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              From <span className="font-semibold text-slate-700">{doc.issuer}</span>
              {doc.date && <> · {doc.date}</>}
            </p>
          ) : (
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              We don't have this one yet. Upload it whenever you're ready.
            </p>
          )}

          {!isEmpty ? (
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C2340] text-white text-sm font-semibold hover:bg-[#0C2340]/90 transition-colors">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          ) : (
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3DBFAD] text-white text-sm font-semibold hover:bg-[#3DBFAD]/90 transition-colors">
              <Upload className="w-4 h-4" />
              Upload document
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocVault() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");

  const filtered = activeCategory === "all"
    ? DOCUMENTS
    : DOCUMENTS.filter((d) => d.category === activeCategory);

  const counts: Record<string, number> = { all: DOCUMENTS.length };
  for (const cat of CATEGORIES) {
    if (cat.id !== "all") counts[cat.id] = DOCUMENTS.filter((d) => d.category === cat.id).length;
  }

  const verifiedCount = DOCUMENTS.filter((d) => d.status === "verified").length;
  const actionNeeded  = DOCUMENTS.filter((d) => d.status === "empty" || d.status === "pending").length;
  const completion    = Math.round((DOCUMENTS.filter((d) => d.status !== "empty").length / DOCUMENTS.length) * 100);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <AppHeader label="Doc Vault · Homeowner Prototype" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="space-y-5">
            {/* Greeting card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3DBFAD] to-[#1a9d8e] flex items-center justify-center text-white font-heading font-bold text-lg">
                  R
                </div>
                <div>
                  <p className="text-xs text-slate-500">Welcome back</p>
                  <p className="font-heading font-bold text-[#0C2340]">Rudi Botha</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[11px] text-slate-500 mb-1">14 Jacaranda Crescent</p>
                <p className="text-xs font-semibold text-[#0C2340]">Waterkloof Ridge</p>
              </div>
            </div>

            {/* Category nav */}
            <nav className="bg-white rounded-2xl border border-slate-200 p-3">
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Your folders
              </div>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-[#0C2340] text-white"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: isActive ? "rgba(255,255,255,0.12)" : `${cat.color}15`,
                          color: isActive ? "white" : cat.color,
                        }}
                      >
                        {cat.icon}
                      </div>
                      <span className="font-semibold text-sm flex-1">{cat.label}</span>
                      <span className={`text-xs font-bold ${isActive ? "text-white/70" : "text-slate-400"}`}>
                        {counts[cat.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Help card */}
            <div className="bg-gradient-to-br from-[#0C2340] to-[#163056] rounded-2xl p-5 text-white">
              <div className="w-11 h-11 rounded-xl bg-[#3DBFAD]/20 flex items-center justify-center text-[#3DBFAD] mb-3">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Need a hand?</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Speak to a real person — we'll help you find or upload anything.
              </p>
              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3DBFAD] text-white text-sm font-semibold hover:bg-[#3DBFAD]/90 transition-colors">
                <Phone className="w-4 h-4" />
                Call us
              </button>
            </div>
          </aside>

          {/* ── Main ──────────────────────────────────────────────────────── */}
          <main className="space-y-6">
            {/* Welcome banner */}
            <div className="bg-gradient-to-br from-[#3DBFAD] to-[#2ba696] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Your home, organised</span>
                </div>
                <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3 leading-tight">
                  Hi Rudi, everything's<br />in one safe place.
                </h1>
                <p className="text-white/85 max-w-xl leading-relaxed">
                  Your title deed, home loan, insurance and compliance papers — all together,
                  always up to date, and ready to share whenever you need them.
                </p>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-heading font-bold text-3xl text-[#0C2340] leading-none">{verifiedCount}</p>
                  <p className="text-sm text-slate-500 mt-1">documents verified</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-heading font-bold text-3xl text-[#0C2340] leading-none">{actionNeeded}</p>
                  <p className="text-sm text-slate-500 mt-1">need your attention</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-600">Vault complete</p>
                  <p className="font-heading font-bold text-2xl text-[#3DBFAD]">{completion}%</p>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3DBFAD] to-[#2ba696] rounded-full transition-all"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Section header */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#0C2340]">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">{filtered.length} document{filtered.length === 1 ? "" : "s"}</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#0C2340] hover:border-[#3DBFAD] hover:text-[#3DBFAD] transition-colors">
                <Upload className="w-4 h-4" />
                Add a document
              </button>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              {filtered.map((doc) => (
                <DocCard key={doc.id} doc={doc} />
              ))}
            </div>

            {/* Reassurance footer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#3DBFAD]/10 flex items-center justify-center text-[#3DBFAD] flex-shrink-0">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <p className="font-heading font-bold text-[#0C2340] mb-1">Safe and private</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Your documents are encrypted and only you can see them. We'll never share anything without your permission.
                </p>
              </div>
            </div>
          </main>

        </div>
      </div>

      <AppFooter label="Homeowner-facing prototype" />
    </div>
  );
}
