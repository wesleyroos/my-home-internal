/*
 * ReportMeta — Report ID, named data sources, prepared-for / prepared-by
 * Trust + audit signal at the bottom of the report (Lightstone-style)
 */

import { reportMeta } from "@/lib/mockData";
import { ShieldCheck, Hash, Database, Calendar } from "lucide-react";

function formatGenerated(d: string) {
  return new Date(d).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ReportMeta() {
  return (
    <section className="bg-[#0C2340] text-white">
      <div className="container py-8 sm:py-10">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-4 h-4 text-[#3DBFAD]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-white/60">
            Report Provenance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Hash className="w-3 h-3 text-white/40" />
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                Report ID
              </span>
            </div>
            <p className="font-mono text-sm text-white tracking-tight">
              {reportMeta.reportId}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3 h-3 text-white/40" />
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                Generated
              </span>
            </div>
            <p className="text-sm text-white">
              {formatGenerated(reportMeta.generatedOn)}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-3 h-3 text-white/40" />
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                Prepared For
              </span>
            </div>
            <p className="text-sm text-white">{reportMeta.preparedFor}</p>
            <p className="text-xs text-white/50 mt-0.5">by {reportMeta.preparedBy}</p>
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/10">
          <div className="flex items-center gap-1.5 mb-3">
            <Database className="w-3 h-3 text-white/40" />
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
              Data Sources
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {reportMeta.dataSources.map((src) => (
              <span
                key={src}
                className="inline-flex items-center text-[11px] sm:text-xs text-white/80 bg-white/8 border border-white/10 rounded-full px-3 py-1"
              >
                {src}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-white/40 leading-relaxed mt-5 max-w-3xl">
            Valuations and trend data are modelled from deeds office registrations
            and aggregated market data. Estimates are indicative — they do not
            replace a professional valuation, legal advice, or a formal market
            appraisal. Active listings reflect the state of partner inventory at
            the time this report was generated.
          </p>
        </div>
      </div>
    </section>
  );
}
