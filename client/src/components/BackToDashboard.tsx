import { Link } from "wouter";
import { LayoutGrid } from "lucide-react";

export function BackToDashboard({ light }: { light?: boolean }) {
  return (
    <Link href="/">
      <span className={`inline-flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer ${
        light
          ? "text-white/60 hover:text-white"
          : "text-muted-foreground hover:text-[#0C2340]"
      }`}>
        <LayoutGrid className="w-3 h-3" />
        Dashboard
      </span>
    </Link>
  );
}
