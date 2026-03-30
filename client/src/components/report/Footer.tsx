/*
 * Footer — MyHome branded footer with disclaimer
 */

const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-icon_201614c8.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={LOGO_ICON} alt="MyHome" className="w-7 h-7" />
            <span className="font-semibold text-sm text-[#0C2340]">MyHome</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[#5A7A9A]">
            <span className="hover:text-[#0C2340] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#0C2340] transition-colors cursor-pointer">Terms of Use</span>
            <span className="hover:text-[#0C2340] transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-[#5A7A9A] leading-relaxed max-w-3xl">
            <strong className="text-[#1E3A5A]">Disclaimer:</strong> Property valuations shown in this report are estimates based on
            available market data and proprietary algorithms. They should not be considered as formal
            valuations or appraisals. Actual property values may differ. Data sourced from the Deeds
            Office and various listing platforms. Report generated March 2026. MyHome (Pty) Ltd is a
            registered South African company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
