/*
 * Survey Admin — view all survey responses.
 * Protected by basic auth (server-side).
 */

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { RefreshCw, ChevronDown, ChevronUp, Users, Building2, Home, Search } from "lucide-react";

interface SurveyResponse {
  id: number;
  segment: string;
  answers: Record<string, string>;
  ranking: string[];
  created_at: string;
}

const SEGMENT_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  insider: { label: "Industry insider", icon: <Building2 className="w-3.5 h-3.5" />, color: "#3DBFAD" },
  homeowner: { label: "Homeowner", icon: <Home className="w-3.5 h-3.5" />, color: "#0C2340" },
  renter: { label: "Renter / Buyer", icon: <Search className="w-3.5 h-3.5" />, color: "#6366f1" },
};

export default function SurveyAdmin() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/survey/responses");
      const data = await res.json();
      setResponses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResponses(); }, []);

  const filtered = filter === "all" ? responses : responses.filter((r) => r.segment === filter);

  const counts = {
    all: responses.length,
    insider: responses.filter((r) => r.segment === "insider").length,
    homeowner: responses.filter((r) => r.segment === "homeowner").length,
    renter: responses.filter((r) => r.segment === "renter").length,
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Survey Responses" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0C2340] mb-0.5">Survey Responses</h1>
            <p className="text-sm text-slate-400">{responses.length} response{responses.length !== 1 ? "s" : ""} collected</p>
          </div>
          <button
            onClick={fetchResponses}
            disabled={loading}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#0C2340] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Segment filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "insider", "homeowner", "renter"] as const).map((seg) => {
            const meta = seg === "all" ? { label: "All", icon: <Users className="w-3.5 h-3.5" />, color: "#94a3b8" } : SEGMENT_META[seg];
            const count = counts[seg];
            return (
              <button
                key={seg}
                onClick={() => setFilter(seg)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  filter === seg
                    ? "border-current bg-current/5"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
                style={filter === seg ? { color: meta.color, borderColor: meta.color } : {}}
              >
                {meta.icon}
                {meta.label}
                <span className="ml-1 text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Responses */}
        {loading && responses.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No responses yet.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r) => {
              const meta = SEGMENT_META[r.segment] ?? { label: r.segment, icon: null, color: "#94a3b8" };
              const isExpanded = expanded === r.id;
              const answerCount = Object.keys(r.answers).length;
              const date = new Date(r.created_at);
              const dateStr = date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
              const timeStr = date.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });

              return (
                <div key={r.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : r.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-[#0C2340]">#{r.id}</span>
                      <span className="text-xs text-slate-400 ml-2">{meta.label}</span>
                      <span className="text-xs text-slate-400 ml-2">&middot; {answerCount} answers</span>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{dateStr} {timeStr}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-100 px-4 py-4 space-y-4 bg-slate-50/50">
                      {Object.entries(r.answers).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{key.replace(/_/g, " ")}</p>
                          <p className="text-sm text-[#0C2340]">{value}</p>
                        </div>
                      ))}
                      {r.ranking && r.ranking.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Ranking</p>
                          <ol className="text-sm text-[#0C2340] space-y-0.5">
                            {r.ranking.map((item, i) => (
                              <li key={item} className="flex gap-2">
                                <span className="text-xs font-bold text-slate-400 w-4">{i + 1}.</span>
                                {item}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AppFooter label="Survey admin" />
    </div>
  );
}
