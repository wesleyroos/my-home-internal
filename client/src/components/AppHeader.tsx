import { Link } from "wouter";
import { LayoutGrid } from "lucide-react";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

interface AppHeaderProps {
  /** Optional label shown next to the logo (e.g. "Exco · Entry Point Decision") */
  label?: string;
  /** Sticky header (default true) */
  sticky?: boolean;
}

export function AppHeader({ label, sticky = true }: AppHeaderProps) {
  return (
    <div
      className={`${sticky ? "sticky top-0 z-40" : ""} bg-white/90 backdrop-blur border-b border-slate-200`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/dashboard">
            <img src={LOGO} alt="MyHome" className="h-6 cursor-pointer flex-shrink-0" />
          </Link>
          {label && (
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest font-bold text-slate-400 border-l border-slate-200 pl-4 truncate">
              {label}
            </span>
          )}
        </div>
        <Link href="/dashboard">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#3DBFAD] transition-colors cursor-pointer flex-shrink-0">
            <LayoutGrid className="w-3.5 h-3.5" />
            Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
}
