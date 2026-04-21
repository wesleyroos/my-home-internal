/*
 * Exco Follow-up — 17 April 2026
 * Editable meeting notes with persistent checkboxes and inline editing.
 */

import { useState, useEffect, useRef } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const STORAGE_KEY = "exco-meeting-17apr";

interface MeetingData {
  checked: boolean[];
  decisions: string[];
  actions: { owner: string; text: string }[];
  framework: { intro: string; factors: string[]; quote: string };
  closingCosts: { title: string; items: string[] };
  renovation: { title: string; text: string };
  questions: string[];
}

const DEFAULT_DATA: MeetingData = {
  checked: new Array(11).fill(false),
  decisions: [
    "This is a consumer-facing product — confirmed.",
    "Working name: BetterBond Home. It sits inside BetterBond for now. Define the elephant before naming it.",
    "The entire F&I model exists to cross-sell more of the bank's products.",
    "Insurance should be an aggregator view (like Hippo) — show BetterSure alongside third-party insurers, not a single add-on toggle.",
  ],
  actions: [
    { owner: "Wesley", text: "Meet with Colette (Head of Marketing, BHG) — define MyHome narrative and positioning before settling on a name. Also review Zoopla's \"My Home\" product (flagged by Charl)." },
    { owner: "Wesley", text: "Suburb report user interviews — three groups: (1) owners inside the group, (2) owners outside the group with no industry knowledge, (3) renters / upcoming first-time buyers. Define personas and what each wants to see." },
    { owner: "Wesley / Tersia", text: "Meet with Nolene (NCA compliance) and Mary (bank agreements) on bank bundling. Mary to review the bank agreement and send through — Wesley to go through it." },
    { owner: "Wesley / Charl", text: "Map out the full bank affordability framework. Our median-based analysis of 667 deals wasn't accurate — banks factor in cash flow, asset value, and individual risk. Core principle: if loss-given-default improves, banks lend more." },
    { owner: "Wesley / Charl / Tersia", text: "Approach a \"friendly bank\" to test which products we can bundle. Renovations and closing costs are top candidates. Need input on which bank." },
    { owner: "Wesley", text: "Pull one full Loom transaction end-to-end — not just bond registration. Jacques (Loom) connecting Wesley with Fran for this. [IN PROGRESS]" },
    { owner: "Wesley / Tersia", text: "Define closable closing-cost add-ons: transfer cost, transfer duty, bond registration cost (may already be amortised — TBC)." },
    { owner: "Wesley", text: "Explore Builders Warehouse / Cashbuild renovation voucher (~R100k credit). Quick-start play — no bank bundling approval needed." },
    { owner: "Wesley", text: "Get eyes on the Choose My Deal dashboard created by Jacques Oberholzer." },
    { owner: "Wesley", text: "Set up next follow-up session with Rudi and Charl — reached out to Yolande (exec PA) to get it in the diary. Target: May. [IN PROGRESS]" },
    { owner: "Wesley", text: "Set up NCA compliance session with Nolene — go via Stephan to arrange. Not urgent but needs to be in the diary. [IN PROGRESS]" },
  ],
  framework: {
    intro: "Banks determine loan amounts using three factors:",
    factors: [
      "Cash flow ability of the applicant",
      "Asset value of the property",
      "Individual risk profile (credit history, employment, existing defaults)",
    ],
    quote: "If loss-given-default improves or risk is mitigated, the banks will lend more.",
  },
  closingCosts: {
    title: "Closing costs to roll into bond",
    items: [
      "Transfer cost",
      "Transfer duty",
      "Bond registration cost (may already be amortised — TBC)",
    ],
  },
  renovation: {
    title: "Renovation voucher (quick-start, no bank approval needed)",
    text: "Partner with Builders Warehouse / Cashbuild. ~R100k credit for new bond holders — curtains, handyman services, geyser, paint, general renovation.",
  },
  questions: [
    "Should insurance sit as a separate step after add-ons rather than inside the add-on section? (Clarify with Tersia)",
    "Which bank do we approach first? (Need Charl + Tersia input)",
    "Is the bond registration cost already amortised by the bank?",
    "Can we structure a Builders / Cashbuild credit product independently?",
    "How transparent should the insurance aggregation comparison be?",
  ],
};

function EditableText({ value, onChange, className = "", as: Tag = "span" }: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  as?: "span" | "p" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [editing, setEditing] = useState(false);

  const handleBlur = () => {
    setEditing(false);
    const text = ref.current?.innerText ?? value;
    if (text !== value) onChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === "Escape") {
      if (ref.current) ref.current.innerText = value;
      ref.current?.blur();
    }
  };

  return (
    <Tag
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`outline-none rounded px-0.5 -mx-0.5 transition-colors cursor-text ${
        editing ? "bg-[#3DBFAD]/5 ring-1 ring-[#3DBFAD]/30" : "hover:bg-slate-50"
      } ${className}`}
    >
      {value}
    </Tag>
  );
}

export default function ExcoMeeting() {
  const [data, setData] = useState<MeetingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_DATA;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const update = (patch: Partial<MeetingData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const toggleCheck = (i: number) =>
    update({ checked: data.checked.map((v, j) => (j === i ? !v : v)) });

  const setDecision = (i: number, v: string) =>
    update({ decisions: data.decisions.map((d, j) => (j === i ? v : d)) });

  const setActionText = (i: number, v: string) =>
    update({ actions: data.actions.map((a, j) => (j === i ? { ...a, text: v } : a)) });

  const setActionOwner = (i: number, v: string) =>
    update({ actions: data.actions.map((a, j) => (j === i ? { ...a, owner: v } : a)) });

  const setFactor = (i: number, v: string) =>
    update({ framework: { ...data.framework, factors: data.framework.factors.map((f, j) => (j === i ? v : f)) } });

  const setClosingItem = (i: number, v: string) =>
    update({ closingCosts: { ...data.closingCosts, items: data.closingCosts.items.map((c, j) => (j === i ? v : c)) } });

  const setQuestion = (i: number, v: string) =>
    update({ questions: data.questions.map((q, j) => (j === i ? v : q)) });

  return (
    <div className="min-h-screen bg-white">
      <AppHeader label="Exco Follow-up · 17 April" />

      <article className="max-w-2xl mx-auto px-6 py-10 text-[15px] text-[#1a1a1a] leading-[1.75]">

        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Meeting Notes</p>
        <h1 className="text-2xl font-bold text-[#0C2340] mb-0.5">Exco Follow-up</h1>
        <p className="text-sm text-slate-400 mb-8">17 April 2026 &middot; Wesley Roos, Tersia Bester, Charl</p>

        <hr className="border-slate-200 mb-8" />

        {/* Decisions */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Key Decisions</h2>
        <ul className="list-disc ml-5 space-y-2 mb-10">
          {data.decisions.map((d, i) => (
            <li key={i}>
              <EditableText value={d} onChange={(v) => setDecision(i, v)} />
            </li>
          ))}
        </ul>

        {/* Actions */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Action Points</h2>
        <div className="space-y-3 mb-10">
          {data.actions.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${data.checked[i] ? "opacity-50" : ""}`}
            >
              <input
                type="checkbox"
                checked={data.checked[i]}
                onChange={() => toggleCheck(i)}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#3DBFAD] focus:ring-[#3DBFAD] cursor-pointer flex-shrink-0"
              />
              <span className={data.checked[i] ? "line-through" : ""}>
                <EditableText
                  value={a.text}
                  onChange={(v) => setActionText(i, v)}
                />
                {" "}
                <EditableText
                  value={a.owner}
                  onChange={(v) => setActionOwner(i, v)}
                  className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded inline-block"
                />
              </span>
            </div>
          ))}
        </div>

        {/* Framework */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Bank Affordability Framework</h2>
        <p className="mb-2">
          <EditableText
            value={data.framework.intro}
            onChange={(v) => update({ framework: { ...data.framework, intro: v } })}
          />
        </p>
        <ol className="list-decimal ml-5 space-y-1 mb-3">
          {data.framework.factors.map((f, i) => (
            <li key={i}>
              <EditableText value={f} onChange={(v) => setFactor(i, v)} />
            </li>
          ))}
        </ol>
        <blockquote className="border-l-2 border-[#3DBFAD] pl-4 text-slate-500 italic mb-10">
          "<EditableText
            value={data.framework.quote}
            onChange={(v) => update({ framework: { ...data.framework, quote: v } })}
          />"
        </blockquote>

        {/* Product ideas */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Product Ideas</h2>
        <p className="font-semibold mb-1">
          <EditableText
            value={data.closingCosts.title}
            onChange={(v) => update({ closingCosts: { ...data.closingCosts, title: v } })}
          />
        </p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          {data.closingCosts.items.map((c, i) => (
            <li key={i}>
              <EditableText value={c} onChange={(v) => setClosingItem(i, v)} />
            </li>
          ))}
        </ul>
        <p className="font-semibold mb-1">
          <EditableText
            value={data.renovation.title}
            onChange={(v) => update({ renovation: { ...data.renovation, title: v } })}
          />
        </p>
        <p className="mb-10">
          <EditableText
            value={data.renovation.text}
            onChange={(v) => update({ renovation: { ...data.renovation, text: v } })}
          />
        </p>

        {/* Questions */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Open Questions</h2>
        <ul className="list-disc ml-5 space-y-2 mb-10">
          {data.questions.map((q, i) => (
            <li key={i}>
              <EditableText value={q} onChange={(v) => setQuestion(i, v)} />
              {i === 0 && (
                <a href="/deal" target="_blank" rel="noopener noreferrer" className="ml-1.5 text-[13px] font-semibold text-[#3DBFAD] hover:text-[#0C2340] transition-colors">
                  (view deal page)
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* References */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">References</h2>
        <div className="mb-10 p-4 rounded-lg bg-slate-50 border border-slate-100">
          <p className="text-sm font-semibold text-[#0C2340] mb-1">Connells + Lloyds Bank: fully digital home-buying service (UK)</p>
          <p className="text-[13px] text-slate-500 mb-2">
            Connells Group, Lloyds Bank, and LMS launch an end-to-end digital homebuying service — single ID verification, upfront searches, shared data across agents/conveyancers/lenders. Built on the Property Data Trust Framework. Essentially the UK version of what MyHome is trying to do.
          </p>
          <a
            href="https://www.estateagenttoday.co.uk/breaking-news/2026/04/connells-and-lloyds-launch-fully-digital-home-buying-service/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#3DBFAD] hover:text-[#0C2340] transition-colors"
          >
            Read full article &rarr;
          </a>
        </div>

      </article>

      <AppFooter label="Internal meeting notes" />
    </div>
  );
}
