/*
 * Dashboard — Internal navigation hub
 */

import { Link } from "wouter";
import { Home, Mail, GitCompare, Handshake, ArrowRight, Vault, Map, Flag, Globe, BarChart3, Workflow } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

interface Screen {
  route: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentBg: string;
  accentText: string;
}

interface Group {
  id: string;
  title: string;
  blurb: string;
  screens: Screen[];
}

const GROUPS: Group[] = [
  {
    id: "strategy",
    title: "Strategy & Research",
    blurb: "Internal thinking, competitive scans, and the narrative for the next exco session.",
    screens: [
      {
        route: "/",
        label: "BHG Journey",
        description: "Strategy scratchpad — journey map, ecosystem, personas, market stats, entry point scoring and comparison.",
        icon: <Map className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
      },
      {
        route: "/exco",
        label: "Exco Deck",
        description: "Five-beat decision narrative for the next exco session. Prize → Lens → Contenders → Head-to-head → The Call.",
        icon: <Flag className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
      },
      {
        route: "/landscape",
        label: "Global Landscape",
        description: "Competitor scan across 5 categories and 19 companies. Coverage matrix at the bottom.",
        icon: <Globe className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
      },
      {
        route: "/bb-direct-grants",
        label: "BetterBond Direct Grants",
        description: "Granted business by rand value bracket (Sept 25 – Feb 26). Volume, value, monthly average and distribution charts.",
        icon: <BarChart3 className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
      },
      {
        route: "/buyer-flow",
        label: "Buyer F&I Flow",
        description: "Mapping of the We Buy Cars F&I handover onto MyHome. 5-step flow with the ROA rebranded as buyer-friendly 'Home Match'.",
        icon: <Workflow className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
      },
      {
        route: "/fi",
        label: "F&I Comparison",
        description: "Strategic framework mapping the motor F&I process to its residential property equivalent.",
        icon: <GitCompare className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
      },
    ],
  },
  {
    id: "entry-points",
    title: "Entry Point Prototypes",
    blurb: "Customer-facing product concepts — the surfaces being evaluated as MyHome's first move.",
    screens: [
      {
        route: "/report",
        label: "Property Report",
        description: "Homeowner-facing report. Value trend, suburb stats, surrounding sales, listings and premium locked sections.",
        icon: <Home className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
      },
      {
        route: "/deal",
        label: "Choose My Deal",
        description: "Buyer-facing bond deal configurator. Bank offer, loan term and F&I add-ons with a live deal summary.",
        icon: <Handshake className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
      },
      {
        route: "/vault",
        label: "Doc Vault",
        description: "Homeowner document vault — secure storage for bond, transfer, insurance and compliance documents.",
        icon: <Vault className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Comms",
    blurb: "Outbound assets that hook customers into the prototypes.",
    screens: [
      {
        route: "/email",
        label: "Email Template",
        description: "HTML email design for delivering the property report. Desktop and mobile preview with copy/download.",
        icon: <Mail className="w-5 h-5" />,
        accentBg: "bg-amber-50",
        accentText: "text-amber-600",
      },
    ],
  },
];

function ScreenCard({ s }: { s: Screen }) {
  return (
    <Link href={s.route}>
      <div className="group bg-white rounded-2xl border-2 border-transparent hover:border-[#3DBFAD]/40 shadow-sm hover:shadow-md transition-all duration-200 p-5 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.accentBg} ${s.accentText}`}>
            {s.icon}
          </div>
        </div>

        <h2 className="font-heading font-bold text-[#0C2340] text-base mb-1.5">{s.label}</h2>
        <p className="text-muted-foreground text-xs leading-relaxed flex-1">{s.description}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <code className="text-[11px] text-muted-foreground font-mono">{s.route}</code>
          <span className="flex items-center gap-1 text-[#3DBFAD] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f0f5fa]">

      <AppHeader label="Internal" />

      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
          <div className="flex items-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-[#3DBFAD]" />
            Prototype
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#0C2340] mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Every screen built so far, grouped by purpose. Strategy work at the top, customer-facing prototypes in the middle, marketing surfaces at the bottom.
          </p>
        </div>
      </div>

      {/* Grouped cards */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 space-y-14">
        {GROUPS.map((group) => (
          <section key={group.id}>
            <div className="mb-5">
              <h2 className="font-heading font-bold text-[#0C2340] text-lg mb-1">{group.title}</h2>
              <p className="text-muted-foreground text-xs max-w-xl">{group.blurb}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.screens.map((s) => (
                <ScreenCard key={s.route} s={s} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <AppFooter label="Not for distribution" />
    </div>
  );
}
