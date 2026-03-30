/*
 * Dashboard — Internal navigation hub
 */

import { Link } from "wouter";
import { Home, Mail, GitCompare, Handshake, ArrowRight } from "lucide-react";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

const SCREENS = [
  {
    route: "/",
    label: "Property Report",
    description: "The main homeowner-facing report. Value trend, suburb stats, surrounding sales, active listings and premium locked sections.",
    icon: <Home className="w-5 h-5" />,
    tag: "Homeowner",
    tagColor: "bg-[#3DBFAD]/10 text-[#1a9d8e]",
    accentBg: "bg-[#3DBFAD]/10",
    accentText: "text-[#3DBFAD]",
  },
  {
    route: "/deal",
    label: "Choose My Deal",
    description: "Buyer-facing bond deal configurator. Select bank offer, loan term and F&I add-on products with a live deal summary.",
    icon: <Handshake className="w-5 h-5" />,
    tag: "Buyer",
    tagColor: "bg-[#3DBFAD]/10 text-[#1a9d8e]",
    accentBg: "bg-[#3DBFAD]/10",
    accentText: "text-[#3DBFAD]",
  },
  {
    route: "/fi",
    label: "F&I Comparison",
    description: "Strategic framework mapping the motor F&I process to its residential property equivalent. Canvas-style process diagram.",
    icon: <GitCompare className="w-5 h-5" />,
    tag: "Internal",
    tagColor: "bg-slate-100 text-slate-500",
    accentBg: "bg-[#0C2340]/8",
    accentText: "text-[#0C2340]",
  },
  {
    route: "/email",
    label: "Email Template",
    description: "HTML email design for delivering the property report to homeowners. Desktop and mobile preview with copy/download.",
    icon: <Mail className="w-5 h-5" />,
    tag: "Marketing",
    tagColor: "bg-amber-50 text-amber-700",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f0f5fa]">

      {/* Nav */}
      <div className="bg-white border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <img src={LOGO} alt="MyHome" className="h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-slate-100 px-2.5 py-1 rounded-full">
            Internal
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <div className="flex items-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-[#3DBFAD]" />
            Prototype
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#0C2340] mb-1">
            Project Screens
          </h1>
          <p className="text-muted-foreground text-sm max-w-md">
            All screens built so far. Click any card to open it.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {SCREENS.map((s) => (
            <Link key={s.route} href={s.route}>
              <div className="group bg-white rounded-2xl border-2 border-transparent hover:border-[#3DBFAD]/40 shadow-sm hover:shadow-md transition-all duration-200 p-5 cursor-pointer h-full flex flex-col">

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.accentBg} ${s.accentText}`}>
                    {s.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${s.tagColor}`}>
                    {s.tag}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-[#0C2340] text-base mb-1.5">
                  {s.label}
                </h2>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1">
                  {s.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <code className="text-[11px] text-muted-foreground font-mono">{s.route}</code>
                  <span className="flex items-center gap-1 text-[#3DBFAD] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-white">
        <div className="container py-4">
          <p className="text-muted-foreground text-xs">MyHome · Internal prototype · Not for distribution</p>
        </div>
      </div>
    </div>
  );
}
