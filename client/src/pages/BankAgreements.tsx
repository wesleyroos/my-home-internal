/*
 * Bank Agreements Review — What can be bundled?
 * Summary of all four bank origination agreements.
 */

import { useState, useEffect, useRef } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const STORAGE_KEY = "bank-agreements-notes-v1";

function EditableText({ value, onChange, className = "" }: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [editing, setEditing] = useState(false);
  const handleBlur = () => { setEditing(false); const t = ref.current?.innerText ?? value; if (t !== value) onChange(t); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ref.current?.blur(); }
    if (e.key === "Escape") { if (ref.current) ref.current.innerText = value; ref.current?.blur(); }
  };
  return (
    <span ref={ref as any} contentEditable suppressContentEditableWarning onFocus={() => setEditing(true)} onBlur={handleBlur} onKeyDown={handleKeyDown}
      className={`outline-none rounded px-0.5 -mx-0.5 transition-colors cursor-text ${editing ? "bg-[#3DBFAD]/5 ring-1 ring-[#3DBFAD]/30" : "hover:bg-slate-50"} ${className}`}
    >{value}</span>
  );
}

const DEFAULT_NOTES = "";

export default function BankAgreements() {
  const [notes, setNotes] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) return JSON.parse(s).notes ?? ""; } catch {} return DEFAULT_NOTES;
  });
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ notes })); } catch {} }, [notes]);

  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Bank Agreements Review" />

      <article className="max-w-2xl mx-auto px-6 py-10 text-[15px] text-[#1a1a1a] leading-[1.75]">

        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Compliance & Bank Alignment</p>
        <h1 className="text-2xl font-bold text-[#0C2340] mb-0.5">Bank Agreements Review</h1>
        <p className="text-sm text-slate-400 mb-8">Reviewed 28 April 2026 &middot; 4 agreements &middot; Nedbank, Absa, FNB, Standard Bank</p>

        <hr className="border-slate-200 mb-8" />

        <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-lg p-4 mb-8">
          <p className="text-sm font-semibold text-[#ef4444] mb-1">Key finding</p>
          <p className="text-sm text-slate-700">None of these agreements contemplate bundling additional products into the bond. They are all purely mortgage origination agreements. Each would need an addendum or new parallel agreement to enable any F&I cross-sell or bundling.</p>
        </div>

        {/* Nedbank */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">1. Nedbank</h2>
        <p className="text-xs text-slate-400 mb-3">Cession from BetterBond to BLOS · Feb 2019 · Original agreement Jan 2013</p>
        <ul className="list-disc ml-5 space-y-1.5 mb-3">
          <li>Commission: <strong>1.4% VAT-inclusive</strong> on disbursed loan amount</li>
          <li>Services: strictly origination — <strong>no financial advice</strong> (explicitly excluded)</li>
          <li>No FAIS advice without FSB + Nedbank accreditation</li>
          <li>No competing lending/deposit products — material breach = instant termination</li>
          <li>Conveyancers: Nedbank's panel only, BB has no say</li>
          <li>Insurance section: only covers BB's own professional liability (R1M min)</li>
          <li><strong>Nothing about bundling, cross-sell, or add-on products</strong></li>
        </ul>
        <p className="text-xs text-slate-400 italic mb-8">Key clauses: 1.2.19 (services definition), 9.1.8 (no financial advice), 10 (restrictive conditions), 19 (regulatory compliance), 23.7 (no competing with bank), 25 (insurance = BB's own liability only)</p>

        {/* Absa */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">2. Absa</h2>
        <p className="text-xs text-slate-400 mb-3">BetterLife Origination Services · Mar 2023 · Most modern agreement</p>
        <ul className="list-disc ml-5 space-y-1.5 mb-3">
          <li>Commission: per Schedule C (not in main body)</li>
          <li><strong>No raising fees</strong> — originator must ensure no fees/charges are charged to the customer for originating. Any fees = breach</li>
          <li>Aggregation requires Absa's <strong>written consent</strong></li>
          <li>Regulatory: NCA, FAIS, FICA, CPA, POPI, Financial Sector Regulation Act</li>
          <li><strong>Nothing about bundling, cross-sell, or add-on products</strong></li>
        </ul>
        <p className="text-xs text-slate-400 italic mb-8">Key clauses: 4.1.3 (no raising fees), 4.3 (regulatory compliance material term), 6 (aggregation controls)</p>

        {/* FNB */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">3. FNB / FirstRand</h2>
        <p className="text-xs text-slate-400 mb-3">BetterLife Home Loans · Jun 2021 · Effective Jul 2021 – Jun 2024</p>
        <ul className="list-disc ml-5 space-y-1.5 mb-3">
          <li>Commission: tied to SARB repo rate (3.5% at time), rates in Annexure 2</li>
          <li>Services: <strong>"Lead Services" only</strong> — explicitly limited to sourcing applicants and submitting applications</li>
          <li>"The Mortgage Broker is <strong>not involved in the administration or management</strong> of any finance provided by the Bank"</li>
          <li><strong>No lending or deposit-taking</strong> that competes with FNB — material breach, instant termination</li>
          <li>Insurance: only BB's own professional liability (R1M)</li>
          <li>Regulatory: NCA, FAIS, FICA, CPA, Code of Banking Practice, MORCSA, POPI</li>
          <li><strong>Nothing about bundling, cross-sell, or add-on products</strong></li>
        </ul>
        <p className="text-xs text-slate-400 italic mb-8">Key clauses: 5.15 (lead services limited), 7.7 (no competing), 8 (regulatory compliance), 12 (insurance = BB liability only)</p>

        {/* Standard Bank */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">4. Standard Bank</h2>
        <p className="text-xs text-slate-400 mb-3">PA BetterBond · Dec 2010 · Oldest agreement · Represented by Rudi Botha as CEO</p>
        <ul className="list-disc ml-5 space-y-1.5 mb-3">
          <li>Commission: 1.55% → <strong>reduced to 1.35%</strong> from Jun 2011, capped at R3M loan amount</li>
          <li>Most detailed origination obligations — interview, complete forms, explain products</li>
          <li><strong>Section 6.2.5 — the closest any agreement gets to cross-sell:</strong> originator must "explain the requirements regarding insurance of the immovable residential property" and inform applicants of insurance products offered by SBG Group members</li>
          <li>But this is limited to <strong>explaining existing SBG insurance</strong>, not bundling new products into the bond</li>
          <li>Panel of attorneys: SBSA controls (Section 9)</li>
          <li>Conversion rate penalties: if &lt;25% convert to Final Grants, SBSA claws back 0.05%</li>
          <li>NTU penalty: if &gt;55% of Final Grants not taken up, same 0.05% clawback</li>
        </ul>
        <p className="text-xs text-slate-400 italic mb-8">Key clauses: 6.2.5 (insurance explanation obligation), 8 (commission structure with caps), 8.7-8.9 (conversion/NTU penalties), 9 (panel of attorneys)</p>

        <hr className="border-slate-200 mb-8" />

        {/* Cross-cutting findings */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Cross-cutting findings</h2>
        <div className="space-y-4 mb-8">
          <div className="pl-3 border-l-2 border-[#ef4444]">
            <p className="font-semibold text-sm text-[#0C2340]">No financial advice allowed</p>
            <p className="text-sm text-slate-600">All four banks prohibit giving financial advice. Any add-on that could be construed as advice needs separate FAIS accreditation.</p>
          </div>
          <div className="pl-3 border-l-2 border-[#ef4444]">
            <p className="font-semibold text-sm text-[#0C2340]">No fees to the customer</p>
            <p className="text-sm text-slate-600">Absa is explicit, others implied. Add-on revenue would need to come from the bank or a separate product arrangement, not from the applicant.</p>
          </div>
          <div className="pl-3 border-l-2 border-[#ef4444]">
            <p className="font-semibold text-sm text-[#0C2340]">No competing with bank lending</p>
            <p className="text-sm text-slate-600">All four — the renovation voucher / personal loan play needs very careful structuring to avoid triggering this.</p>
          </div>
          <div className="pl-3 border-l-2 border-[#3DBFAD]">
            <p className="font-semibold text-sm text-[#0C2340]">Standard Bank is the only one that mentions insurance cross-sell</p>
            <p className="text-sm text-slate-600">Section 6.2.5 — but limited to informing applicants about existing SBG Group insurance products. Not bundling new products.</p>
          </div>
          <div className="pl-3 border-l-2 border-[#f59e0b]">
            <p className="font-semibold text-sm text-[#0C2340]">All agreements would need addendums</p>
            <p className="text-sm text-slate-600">The current agreements don't block bundling, but they don't enable it either. Each bank needs a new addendum or parallel agreement to cover cross-sell and bundling mechanics.</p>
          </div>
        </div>

        <hr className="border-slate-200 mb-8" />

        {/* Commission comparison */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Commission comparison</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 font-semibold text-[#0C2340]">Bank</th>
                <th className="text-left py-2 pr-4 font-semibold text-[#0C2340]">Rate</th>
                <th className="text-left py-2 font-semibold text-[#0C2340]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium text-[#0C2340]">Nedbank</td>
                <td className="py-2 pr-4">1.4% VAT-incl</td>
                <td className="py-2">On disbursed amount</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium text-[#0C2340]">Absa</td>
                <td className="py-2 pr-4">Schedule C</td>
                <td className="py-2">Not in main body</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium text-[#0C2340]">FNB</td>
                <td className="py-2 pr-4">Annexure 2</td>
                <td className="py-2">Tied to SARB repo rate</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-[#0C2340]">Standard Bank</td>
                <td className="py-2 pr-4">1.35% VAT-incl</td>
                <td className="py-2">Capped at R3M loan, 1.2% on Further Advances &gt;R100k</td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="border-slate-200 mb-8" />

        {/* What this means */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">What this means for MyHome</h2>
        <ul className="list-disc ml-5 space-y-2 mb-8">
          <li>The agreements confirm the need for <strong>bank-by-bank negotiation</strong> — can't just add bundling on top of existing origination agreements</li>
          <li>Standard Bank's insurance clause (6.2.5) is a potential <strong>starting point</strong> — there's already a precedent for mentioning insurance products at the origination stage</li>
          <li>The "no fees to customer" rule means <strong>revenue must come from the bank side</strong> (commission on bundled products) or from a separate, non-origination arrangement</li>
          <li>The "no competing lending" clauses need careful navigation if pursuing the <strong>renovation voucher / Builders credit</strong> play — it must not look like a competing credit product</li>
          <li>Bring this summary to the <strong>Rudi + Charl alignment session</strong> as context for why the bundling conversation needs to happen at the bank relationship level, not just product level</li>
        </ul>

        {/* Notes */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Notes</h2>
        <div
          contentEditable suppressContentEditableWarning
          onBlur={(e) => setNotes(e.currentTarget.innerText)}
          className="min-h-[80px] p-3 rounded-lg border border-slate-200 text-sm text-slate-600 outline-none focus:ring-1 focus:ring-[#3DBFAD]/30 focus:border-[#3DBFAD]/30 transition-colors mb-10"
          style={{ whiteSpace: "pre-wrap" }}
        >{notes || "Click to add notes..."}</div>

      </article>

      <AppFooter label="Internal — bank agreement review" />
    </div>
  );
}
