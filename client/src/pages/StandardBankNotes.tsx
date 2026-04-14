/*
 * Standard Bank Meeting Notes
 * Rough notes and ideas from the Standard Bank partnership discussion.
 */

import {
  Sun,
  Wifi,
  TrendingUp,
  GraduationCap,
  ExternalLink,
  Lightbulb,
  HelpCircle,
  Wrench,
  Tag,
  GitCompare,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

/* ── data ────────────────────────────────────────────────────────────── */

interface NoteCard {
  id: string;
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}

const NOTES: NoteCard[] = [
  {
    id: "whizzoh",
    tag: "Partner",
    tagColor: "bg-blue-100 text-blue-700",
    icon: <Wrench className="w-5 h-5" />,
    title: "Whizzoh — Home Services Partner",
    body: (
      <>
        <p>
          Standard Bank uses{" "}
          <a
            href="https://www.whizzoh.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3DBFAD] underline underline-offset-2 inline-flex items-center gap-1 font-medium hover:text-[#0C2340] transition-colors"
          >
            Whizzoh
            <ExternalLink className="w-3 h-3" />
          </a>{" "}
          as their home services partner. Worth exploring what their integration
          looks like and whether a similar model fits into the MyHome ecosystem
          — either as a direct partnership or as a marketplace layer.
        </p>
      </>
    ),
  },
  {
    id: "solar-education",
    tag: "GTM / Solar",
    tagColor: "bg-amber-100 text-amber-700",
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Solar Education as a GTM Play",
    body: (
      <>
        <p>
          Standard Bank highlighted how important <strong>solar education</strong> has
          been in their journey. Educating customers on solar — costs, savings,
          financing, panel types — has been a big part of their go-to-market
          strategy.
        </p>
        <p className="mt-3">
          <strong>MyHome angle:</strong> For people building towards buying
          their first home (or next home), this kind of educational content could
          be incredibly relevant. Solar readiness, what to look for in a
          property, how to budget for an installation — all of this ties into the
          "informed buyer" positioning.
        </p>
      </>
    ),
  },
  {
    id: "solar-value",
    tag: "Data Gap",
    tagColor: "bg-red-100 text-red-700",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Solar & Property Value — The Missing Data",
    body: (
      <>
        <p>
          An interesting question came up:{" "}
          <strong>how do solar installations affect property value?</strong>
        </p>
        <p className="mt-3">
          There was speculation that solar does increase value, but the key pain
          point is that <strong>nobody seems to have the data</strong> to verify
          this. No one is tracking how home values shift post-installation in the
          South African market.
        </p>
        <div className="mt-4 p-4 bg-[#0C2340]/5 rounded-xl border border-[#0C2340]/10">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-[#0C2340] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#0C2340]">
              Could MyHome be the platform that starts collecting and surfacing
              this data? If we know which properties have solar (via the report
              or vault), we could begin correlating installations with valuation
              changes over time.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "naming",
    tag: "Branding",
    tagColor: "bg-slate-100 text-slate-700",
    icon: <Tag className="w-5 h-5" />,
    title: "Reconsider the \"MyHome\" Name",
    body: (
      <p>
        Advised to look at using a different name — apparently everyone in this
        industry has used "MyHome" at some point. Everyone has tried to build
        this before and no one is really getting it right. The name carries
        baggage.
      </p>
    ),
  },
  {
    id: "brand-identity",
    tag: "Branding",
    tagColor: "bg-slate-100 text-slate-700",
    icon: <Tag className="w-5 h-5" />,
    title: "Group Brand or Own Identity?",
    body: (
      <p>
        If the name does stay as MyHome — does it sit under the Better Home
        Group brand identity, or does it get its own unique brand and
        personality? Important question for positioning, trust, and how it shows
        up to consumers.
      </p>
    ),
  },
  {
    id: "ooba",
    tag: "Question",
    tagColor: "bg-orange-100 text-orange-700",
    icon: <GitCompare className="w-5 h-5" />,
    title: "What Are We Doing That Ooba Aren't?",
    body: (
      <p>
        Ooba Home Loans apparently have a similar ecosystem already. Need to
        understand what they offer, where the overlap is, and what MyHome would
        do differently.
      </p>
    ),
  },
  {
    id: "connectivity",
    tag: "Idea",
    tagColor: "bg-purple-100 text-purple-700",
    icon: <Wifi className="w-5 h-5" />,
    title: "Connectivity as a Home Service",
    body: (
      <>
        <p>
          Separate thought — could we bring <strong>connectivity</strong> into
          the F&I layer? Not necessarily as an add-on in the traditional sense,
          but as a service layer:
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD] mt-1.5 flex-shrink-0" />
            What fibre providers cover this area?
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD] mt-1.5 flex-shrink-0" />
            What speeds are available at this address?
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBFAD] mt-1.5 flex-shrink-0" />
            Partner referrals (Vumatel, Openserve, etc.)
          </li>
        </ul>
        <p className="mt-3">
          For buyers, knowing the connectivity situation of a property before
          purchase is a real decision factor — especially for remote workers.
          This could live on the property report or as part of the deal
          configurator.
        </p>
      </>
    ),
  },
];

/* ── page ─────────────────────────────────────────────────────────────── */

export default function StandardBankNotes() {
  return (
    <div className="min-h-screen bg-[#f0f5fa]">
      <AppHeader label="Standard Bank · Meeting Notes" />

      {/* Hero */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
          <div className="flex items-center gap-2 text-[#3DBFAD] text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-[#3DBFAD]" />
            Meeting Notes
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#0C2340] mb-2">
            Standard Bank
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Rough notes and ideas from the Standard Bank discussion — home
            services partnerships, solar strategy, data gaps, and a connectivity
            play.
          </p>
        </div>
      </div>

      {/* Notes grid */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <div className="space-y-6">
          {NOTES.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8"
            >
              {/* Header row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0C2340]/5 flex items-center justify-center text-[#0C2340] flex-shrink-0">
                  {note.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${note.tagColor}`}
                    >
                      {note.tag}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-[#0C2340] text-lg">
                    {note.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="text-sm text-muted-foreground leading-relaxed pl-14">
                {note.body}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom idea callout */}
        <div className="mt-10 p-6 bg-[#3DBFAD]/8 rounded-2xl border border-[#3DBFAD]/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#3DBFAD] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-heading font-bold text-[#0C2340] text-sm mb-1">
                Threads to pull
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  Research Whizzoh's model — what services, what integration
                  depth?
                </li>
                <li>
                  Scope a "Solar 101" content module for the MyHome journey.
                </li>
                <li>
                  Explore whether Lightstone or Deeds data can correlate solar
                  installs with value changes.
                </li>
                <li>
                  Prototype a connectivity card on the property report — fibre
                  availability by address.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AppFooter label="Not for distribution — internal notes" />
    </div>
  );
}
