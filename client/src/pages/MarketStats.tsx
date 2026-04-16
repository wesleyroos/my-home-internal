/*
 * Market Stats — standalone page listing the SA property market statistics
 * that also appear on the BHG Journey page.
 */

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const MARKET_STAT_GROUPS = [
  {
    act: "01",
    label: "The Market",
    description: "Scale of the South African residential property landscape.",
    stats: [
      { stat: "R6.8T", color: "#0C2340", label: "total **residential property stock** in SA", source: "Lightstone, Feb 2024" },
      { stat: "252,709", color: "#3DBFAD", label: "**property transfers** registered in 2024", source: "Deeds Office, 2024" },
      { stat: "~40,000", color: "#f59e0b", label: "**registered estate agents** in South Africa", source: "PPRA, 2024" },
      { stat: "1.67M", color: "#6366f1", label: "**outstanding mortgages** in SA", source: "NCR, Q1 2024" },
      { stat: "R178B", color: "#3DBFAD", label: "in new **mortgage originations** in 2024", source: "NCR Consumer Credit Market Report, 2024" },
    ],
  },
  {
    act: "02",
    label: "The Renter",
    description: "Most South Africans spend over a decade renting before they buy.",
    stats: [
      { stat: "53% / 23%", color: "#3DBFAD", label: "**owners** vs **renters**", source: "Stats SA General Household Survey, 2022" },
      { stat: "~23", color: "#6366f1", label: "estimated age at **first rental**", source: "Working estimate — no single authoritative SA dataset exists" },
      { stat: "R9,000+", color: "#f59e0b", label: "average **monthly rent** — crossed R9k for the first time in Q4 2024", source: "PayProp Rental Index, Q4 2024" },
      { stat: "~14 yrs", color: "#0C2340", label: "spent **renting** before buying a first home", source: "Derived: first rental ~23, first purchase ~37" },
      { stat: "~R1.51M", color: "#ef4444", label: "total **rent paid** over 14 years — roughly equal to the average bond", source: "Derived from PayProp Q4 2024 & ooba Q2 2025" },
    ],
  },
  {
    act: "03",
    label: "The Buyer",
    description: "When renters finally buy, the transaction is complex, fast-moving, and high-value.",
    stats: [
      { stat: "37", color: "#0C2340", label: "average age of a **first-time buyer**", source: "ooba oobarometer, 2024" },
      { stat: "55%", color: "#3DBFAD", label: "of first-time buyers are **female**", source: "ooba oobarometer, 2024" },
      { stat: "R1.46M", color: "#f59e0b", label: "average **approved bond** value", source: "ooba oobarometer, Q2 2025" },
      { stat: "~60%", color: "#0C2340", label: "of bonds submitted via a **bond originator**", source: "ooba / BetterBond market commentary, 2024" },
      { stat: "4–5", color: "#6366f1", label: "banks an originator **submits to simultaneously**", source: "ooba oobarometer, 2024" },
      { stat: "~90 days", color: "#6366f1", label: "from **offer to registration**", source: "SA conveyancing commentary" },
      { stat: "~7 yrs", color: "#3DBFAD", label: "average **time in home** before selling or upgrading", source: "Industry estimate" },
    ],
  },
];

function highlightLabel(label: string, color: string) {
  const parts = label.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color, fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function MarketStats() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <AppHeader label="SA Market Stats" />

      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-[#3DBFAD]" />
            <span className="text-[#3DBFAD] text-xs font-semibold uppercase tracking-[0.3em]">
              Research · Market Stats
            </span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#0C2340] mb-2">
            South African property market — by the numbers
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-3xl">
            The landscape, the renter, and the buyer — pulled from the BHG Journey page into one reference view.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {MARKET_STAT_GROUPS.map((group) => (
            <div key={group.act}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-heading font-bold text-xs text-white bg-[#0C2340] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {group.act}
                </span>
                <div>
                  <p className="font-heading font-bold text-base text-[#0C2340]">{group.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {group.stats.map((s) => (
                  <div key={s.stat} className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-5">
                    <p className="font-heading font-bold text-3xl leading-none" style={{ color: s.color }}>{s.stat}</p>
                    <p className="text-xs text-slate-500 mt-3 leading-snug">{highlightLabel(s.label, s.color)}</p>
                    <p className="text-[9px] text-slate-300 mt-3 italic">Source: {s.source}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AppFooter label="SA Market Stats reference" />
    </div>
  );
}
