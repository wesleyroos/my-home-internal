interface AppFooterProps {
  /** Optional context label (e.g. "Global landscape scan") */
  label?: string;
}

export function AppFooter({ label }: AppFooterProps) {
  return (
    <div className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>Better Home Group · MyHome · Internal prototype</span>
        {label && <span className="italic">{label}</span>}
      </div>
    </div>
  );
}
