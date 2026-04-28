/*
 * Dashboard — Internal navigation hub
 */

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Home, Mail, GitCompare, Handshake, ArrowRight, Vault, Map, Flag, Globe, BarChart3, Workflow, StickyNote, Database, Users, Presentation, ClipboardList, LayoutGrid, List, ArrowUpDown, ArrowUp, ArrowDown, FileQuestion } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

interface Screen {
  route: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentBg: string;
  accentText: string;
  added?: string;
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
        route: "/lc-presentation",
        label: "LC Presentation — 16 April",
        description: "Two-section deck for the weekly Leadership Committee: vision image and status (what's been done, next steps).",
        icon: <Presentation className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "16 Apr 2026",
      },
      {
        route: "/exco-presentation",
        label: "Exco Presentation — 17 April",
        description: "Full slide deck presented to the Exco. Recap, meetings, research, prototypes, discussion points, next steps.",
        icon: <Presentation className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "17 Apr 2026",
      },
      {
        route: "/",
        label: "BHG Journey",
        description: "Strategy scratchpad — journey map, ecosystem, personas, market stats, entry point scoring and comparison.",
        icon: <Map className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "22 Mar 2026",
      },
      {
        route: "/exco",
        label: "Exco Deck",
        description: "Five-beat decision narrative for the next exco session. Prize → Lens → Contenders → Head-to-head → The Call.",
        icon: <Flag className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "28 Mar 2026",
      },
      {
        route: "/landscape",
        label: "Global Landscape",
        description: "Competitor scan across 5 categories and 19 companies.",
        icon: <Globe className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
        added: "01 Apr 2026",
      },
      {
        route: "/zoopla-myhome",
        label: "Zoopla My Home",
        description: "Competitor breakdown — Zoopla's homeowner dashboard. Flagged by Charl.",
        icon: <Globe className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
        added: "21 Apr 2026",
      },
      {
        route: "/connells-lloyds",
        label: "Connells + Lloyds (UK)",
        description: "Fully digital homebuying service — NPTN. Shared by Rudi.",
        icon: <Globe className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
        added: "21 Apr 2026",
      },
      {
        route: "/market-stats",
        label: "SA Market Stats",
        description: "SA property market stats — market, renter, and buyer groups.",
        icon: <BarChart3 className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "16 Apr 2026",
      },
      {
        route: "/personas",
        label: "SA Personas",
        description: "Three user journeys + service provider ecosystem.",
        icon: <Users className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "16 Apr 2026",
      },
      {
        route: "/bb-direct-grants",
        label: "BetterBond Direct Grants",
        description: "Granted business by rand value bracket (Sept 25 – Feb 26).",
        icon: <BarChart3 className="w-5 h-5" />,
        accentBg: "bg-indigo-50",
        accentText: "text-indigo-600",
        added: "10 Apr 2026",
      },
      {
        route: "/buyer-flow",
        label: "Buyer F&I Flow",
        description: "We Buy Cars F&I handover mapped onto MyHome.",
        icon: <Workflow className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "05 Apr 2026",
      },
      {
        route: "/fi",
        label: "F&I Comparison",
        description: "Motor F&I process mapped to residential property equivalent.",
        icon: <GitCompare className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "25 Mar 2026",
      },
      {
        route: "/standard-bank",
        label: "Standard Bank Notes",
        description: "Meeting notes — Whizzoh, solar GTM, solar-value data gap.",
        icon: <StickyNote className="w-5 h-5" />,
        accentBg: "bg-amber-50",
        accentText: "text-amber-600",
        added: "08 Apr 2026",
      },
      {
        route: "/loom-meeting",
        label: "Loom Meeting",
        description: "Meeting with Jacques (CEO) — Loom as data partner.",
        icon: <Database className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "01 Apr 2026",
      },
      {
        route: "/bb-direct-meeting",
        label: "BB Direct Focus Group",
        description: "Focus group with Di Williams and team.",
        icon: <Users className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "12 Apr 2026",
      },
      {
        route: "/bank-agreements",
        label: "Bank Agreements Review",
        description: "Review of all 4 bank origination agreements — what can be bundled into the bond.",
        icon: <Flag className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "28 Apr 2026",
      },
      {
        route: "/survey-admin",
        label: "Survey Responses",
        description: "Admin view of all suburb report survey responses.",
        icon: <ClipboardList className="w-5 h-5" />,
        accentBg: "bg-[#0C2340]/8",
        accentText: "text-[#0C2340]",
        added: "28 Apr 2026",
      },
      {
        route: "/suburb-report-survey",
        label: "Suburb Report Survey",
        description: "User research — interview questions for three segments on what they want in a suburb report.",
        icon: <FileQuestion className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "28 Apr 2026",
      },
      {
        route: "/exco-meeting",
        label: "Exco Follow-up — 17 April",
        description: "Follow-up with Tersia and Charl. Naming, bank affordability, F&I model.",
        icon: <ClipboardList className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "21 Apr 2026",
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
        label: "Suburb Report",
        description: "Homeowner-facing report. Value trend, suburb stats, surrounding sales, listings.",
        icon: <Home className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "22 Mar 2026",
      },
      {
        route: "/deal",
        label: "Choose My Deal",
        description: "Buyer-facing bond deal configurator with F&I add-ons.",
        icon: <Handshake className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "25 Mar 2026",
      },
      {
        route: "/vault",
        label: "Doc Vault",
        description: "Homeowner document vault — bond, transfer, insurance, compliance.",
        icon: <Vault className="w-5 h-5" />,
        accentBg: "bg-[#3DBFAD]/10",
        accentText: "text-[#3DBFAD]",
        added: "28 Mar 2026",
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
        description: "HTML email for delivering the suburb report.",
        icon: <Mail className="w-5 h-5" />,
        accentBg: "bg-amber-50",
        accentText: "text-amber-600",
        added: "22 Mar 2026",
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

function ScreenRow({ s }: { s: Screen }) {
  return (
    <Link href={s.route}>
      <div className="group flex items-center gap-3 hover:bg-slate-50 transition-colors px-3 py-2.5 cursor-pointer border-b border-slate-100 last:border-b-0">
        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${s.accentBg} ${s.accentText}`}>
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm text-[#0C2340] font-medium truncate block">{s.label}</span>
          <span className="text-xs text-slate-400 truncate block">{s.description}</span>
        </div>
        <span className="text-xs text-slate-400 hidden md:block w-24 text-right flex-shrink-0">{s.added ?? ""}</span>
      </div>
    </Link>
  );
}

const VIEW_KEY = "dashboard-view";

function parseDate(s?: string): number {
  if (!s) return 0;
  const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const parts = s.split(" ");
  if (parts.length < 3) return 0;
  return new Date(parseInt(parts[2]), months[parts[1]] ?? 0, parseInt(parts[0])).getTime();
}

export default function Dashboard() {
  const [view, setView] = useState<"grid" | "list">(() => {
    try { return (localStorage.getItem(VIEW_KEY) as "grid" | "list") ?? "list"; } catch { return "list"; }
  });

  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");

  const toggleDateSort = () => {
    setDateSort((prev) => prev === "desc" ? "asc" : "desc");
  };

  const toggleView = (v: "grid" | "list") => {
    setView(v);
    try { localStorage.setItem(VIEW_KEY, v); } catch {}
  };

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
          <div className="flex items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Every screen built so far, grouped by purpose. Strategy work at the top, customer-facing prototypes in the middle, marketing surfaces at the bottom.
            </p>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => toggleView("grid")}
                className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-white shadow-sm text-[#0C2340]" : "text-slate-400 hover:text-slate-600"}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleView("list")}
                className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-white shadow-sm text-[#0C2340]" : "text-slate-400 hover:text-slate-600"}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped screens */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 space-y-14">
        {GROUPS.map((group) => (
          <section key={group.id}>
            <div className="mb-5">
              <h2 className="font-heading font-bold text-[#0C2340] text-lg mb-1">{group.title}</h2>
              <p className="text-muted-foreground text-xs max-w-xl">{group.blurb}</p>
            </div>
            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.screens.map((s) => (
                  <ScreenCard key={s.route} s={s} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 bg-slate-50/50">
                  <span className="w-7 flex-shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex-1">Name</span>
                  <button
                    onClick={toggleDateSort}
                    className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden md:flex items-center gap-1 w-24 justify-end hover:text-slate-600 transition-colors"
                  >
                    Added
                    {dateSort === "desc" && <ArrowDown className="w-3 h-3" />}
                    {dateSort === "asc" && <ArrowUp className="w-3 h-3" />}
                  </button>
                </div>
                {[...group.screens].sort((a, b) => {
                      const da = parseDate(a.added);
                      const db = parseDate(b.added);
                      return dateSort === "desc" ? db - da : da - db;
                    }).map((s) => (
                  <ScreenRow key={s.route} s={s} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      <AppFooter label="Not for distribution" />
    </div>
  );
}
