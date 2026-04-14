/*
 * BetterBond Direct Focus Group — Meeting with Di and her team.
 * Placeholder page — content to be added after the meeting.
 */

import {
  Users, Clock,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

// ─── Design tokens (matched to Exco/Loom pages) ────────────────────────────

const SECTION = "py-28 sm:py-36 px-8 sm:px-12";
const CARD = "bg-white rounded-2xl shadow-sm";
const INNER = "max-w-7xl mx-auto w-full";

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BBDirectMeeting() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="BetterBond Direct · Focus Group" />

      {/* Hero */}
      <section className="bg-[#0C2340] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#163a5e]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3DBFAD]/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

        <div className={`${INNER} px-8 sm:px-12 py-24 sm:py-32 relative`}>
          <div className="flex items-center gap-3 text-[#3DBFAD] text-sm font-bold uppercase tracking-[0.2em] mb-8">
            <span className="w-8 h-px bg-[#3DBFAD]" />
            Focus Group
          </div>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight mb-6">
            BetterBond Direct
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            Focus group session with Di Williams and her team from BetterBond Direct.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-white/40 text-base">
            <span>13 April 2026</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span><span className="text-white/70 font-medium">Di Williams & team</span> — BetterBond Direct</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span><span className="text-white/70 font-medium">Wesley & Tersia</span> — MyHome Project Team</span>
          </div>
        </div>
      </section>

      {/* Placeholder */}
      <section className={`${SECTION} bg-slate-50`}>
        <div className={INNER}>
          <div className={`${CARD} p-12 sm:p-16 border border-dashed border-slate-300 text-center`}>
            <div className="w-16 h-16 rounded-2xl bg-[#3DBFAD]/10 text-[#3DBFAD] flex items-center justify-center mx-auto mb-6">
              <Clock className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0C2340] mb-4">
              Meeting notes pending
            </h2>
            <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
              This page will be updated with findings, key takeaways, and action items after the focus group session.
            </p>
          </div>
        </div>
      </section>

      <AppFooter label="Not for distribution — internal meeting notes" />
    </div>
  );
}
