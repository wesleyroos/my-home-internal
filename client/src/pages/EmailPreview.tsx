/*
 * EmailPreview — HTML email with MyHome branding
 * Navy #0C2340, Teal #3DBFAD, white/light backgrounds
 * Real MyHome logo from CDN
 */

import { useState, useEffect } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Copy, Check, Download } from "lucide-react";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const LOGO_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";
const LOGO_ICON = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-icon_201614c8.png";

const EMAIL_HTML = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your Property Report is Ready</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&family=Inter:wght@400;500;600&display=swap');
    
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; background-color: #f0f5fa; }
    
    .email-body { background-color: #f0f5fa; }
    .email-container { max-width: 600px; margin: 0 auto; }
    
    h1, h2, h3 { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    p, a, td, span, li { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .hero-value { font-size: 42px !important; }
      .stat-value { font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f0f5fa;">
  
  <!-- Preview text (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; font-size:1px; line-height:1px; color:#f0f5fa;">
    Rudi, your home at 14 Jacaranda Crescent is now worth R1,580,000 — up 11.3% this year. See your full property report inside.
  </div>

  <center style="width:100%; background-color:#f0f5fa;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f0f5fa;">
      <tr>
        <td style="padding: 20px 0;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="margin:0 auto;">
            
            <!-- TEAL ACCENT BAR -->
            <tr>
              <td style="height:4px; background-color:#3DBFAD; border-radius:12px 12px 0 0;"></td>
            </tr>

            <!-- HEADER -->
            <tr>
              <td style="padding: 24px 32px 16px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="width: 140px;">
                      <img src="${LOGO_FULL}" alt="MyHome" width="130" style="display:block; border:0; height:auto;" />
                    </td>
                    <td style="text-align:right;">
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:12px; color:#5A7A9A;">March 2026</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- PROMINENT ADDRESS BLOCK -->
            <tr>
              <td style="padding: 0 32px 20px; background-color: #ffffff;" class="mobile-padding">
                <p style="margin:0 0 4px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#5A7A9A;">Property report for Rudi Botha</p>
                <h2 style="margin:0 0 6px; font-family:'Plus Jakarta Sans',sans-serif; font-size:28px; color:#0C2340; font-weight:700; line-height:1.2;">14 Jacaranda Crescent</h2>
                <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:14px; color:#5A7A9A;">&#128205; Fourways, Johannesburg</p>
              </td>
            </tr>

            <!-- HERO IMAGE -->
            <tr>
              <td style="background-color:#ffffff;">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/property-hero-3MRLeyu3Lsybd5cyftJY8F.webp" alt="Your property at 14 Jacaranda Crescent" width="600" style="width:100%; display:block; border:0;" />
              </td>
            </tr>

            <!-- PROPERTY VALUE HERO -->
            <tr>
              <td style="padding: 32px 32px 24px; background-color: #ffffff;" class="mobile-padding">
                <p style="margin:0 0 4px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#5A7A9A; font-weight:600;">
                  Your Estimated Property Value
                </p>
                <h1 class="hero-value" style="margin:0 0 12px; font-family:'Plus Jakarta Sans',sans-serif; font-size:52px; line-height:1.1; color:#0C2340; font-weight:700;">
                  R&nbsp;1,580,000
                </h1>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="background-color:rgba(61,191,173,0.1); border-radius:20px; padding:5px 14px;">
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; font-weight:600; color:#3DBFAD;">&#8593; 11.3% this year</span>
                    </td>
                    <td style="padding-left:12px;">
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#5A7A9A;">+R160,000 in 12 months</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding: 0 32px; background-color: #ffffff;" class="mobile-padding">
                <div style="border-top: 1px solid #e2e8f0;"></div>
              </td>
            </tr>

            <!-- PROPERTY DETAILS -->
            <tr>
              <td style="padding: 20px 32px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#0C2340; padding-right:8px;">
                      <strong>3</strong> <span style="color:#5A7A9A;">Beds</span>
                    </td>
                    <td style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#0C2340; padding-right:8px;">
                      <strong>2</strong> <span style="color:#5A7A9A;">Baths</span>
                    </td>
                    <td style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#0C2340; padding-right:8px;">
                      <strong>2</strong> <span style="color:#5A7A9A;">Garages</span>
                    </td>
                    <td style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#0C2340;">
                      <strong>680</strong> <span style="color:#5A7A9A;">m&sup2;</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- GAIN BANNER -->
            <tr>
              <td style="padding: 16px 32px; background-color: rgba(61,191,173,0.06); border-top: 1px solid rgba(61,191,173,0.15);" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#5A7A9A;">
                      Since you purchased in <strong style="color:#0C2340;">Mar 2019</strong>, your home has gained
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:4px;">
                      <span style="font-family:'Plus Jakarta Sans',sans-serif; font-size:28px; color:#3DBFAD; font-weight:700;">R&nbsp;430,000</span>
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#3DBFAD; padding-left:8px; font-weight:600;">+37.4%</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- SPACER -->
            <tr><td style="height:4px; background-color:#ffffff;"></td></tr>

            <!-- AREA SNAPSHOT HEADING -->
            <tr>
              <td style="padding: 28px 32px 16px; background-color: #ffffff;" class="mobile-padding">
                <h2 style="margin:0 0 6px; font-family:'Plus Jakarta Sans',sans-serif; font-size:22px; color:#0C2340; font-weight:700;">
                  What's happening in Fourways
                </h2>
                <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#5A7A9A; line-height:1.5;">
                  A snapshot of your neighbourhood's property market
                </p>
              </td>
            </tr>

            <!-- STATS ROW 1 -->
            <tr>
              <td style="padding: 0 32px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td width="50%" style="padding: 12px 8px 12px 0; vertical-align:top;">
                      <div style="background-color:#f0f5fa; border-radius:10px; padding:16px 18px;">
                        <p style="margin:0 0 2px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#5A7A9A; font-weight:600;">Median Sale Price</p>
                        <p class="stat-value" style="margin:0 0 4px; font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; color:#0C2340;">R1.52m</p>
                        <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; font-weight:600; color:#3DBFAD; background-color:rgba(61,191,173,0.1); border-radius:10px; padding:2px 8px;">&#8593; 6.8%</span>
                      </div>
                    </td>
                    <td width="50%" style="padding: 12px 0 12px 8px; vertical-align:top;">
                      <div style="background-color:#f0f5fa; border-radius:10px; padding:16px 18px;">
                        <p style="margin:0 0 2px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#5A7A9A; font-weight:600;">Avg Days on Market</p>
                        <p class="stat-value" style="margin:0 0 4px; font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; color:#0C2340;">54 days</p>
                        <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; font-weight:600; color:#3DBFAD;">12d faster</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- STATS ROW 2 -->
            <tr>
              <td style="padding: 0 32px 20px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td width="50%" style="padding: 0 8px 0 0; vertical-align:top;">
                      <div style="background-color:#f0f5fa; border-radius:10px; padding:16px 18px;">
                        <p style="margin:0 0 2px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#5A7A9A; font-weight:600;">Recent Sales Nearby</p>
                        <p class="stat-value" style="margin:0 0 4px; font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; color:#0C2340;">6</p>
                        <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#5A7A9A;">within 600m</span>
                      </div>
                    </td>
                    <td width="50%" style="padding: 0 0 0 8px; vertical-align:top;">
                      <div style="background-color:#f0f5fa; border-radius:10px; padding:16px 18px;">
                        <p style="margin:0 0 2px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#5A7A9A; font-weight:600;">Buyer Demand</p>
                        <p class="stat-value" style="margin:0 0 4px; font-family:'Plus Jakarta Sans',sans-serif; font-size:26px; color:#0C2340;">High</p>
                        <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; font-weight:600; color:#3DBFAD; background-color:rgba(61,191,173,0.1); border-radius:10px; padding:2px 8px;">78/100</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- TEASER: PREMIUM INSIGHT -->
            <tr>
              <td style="padding: 0 32px 24px; background-color: #ffffff;" class="mobile-padding">
                <div style="position:relative; border-radius:10px; overflow:hidden; background-color:#f0f5fa; padding:20px; border:1px solid #e2e8f0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom:12px;">
                        <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:10px; text-transform:uppercase; letter-spacing:1.5px; color:#3DBFAD; font-weight:700;">&#128274; Premium Insight</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p style="margin:0 0 4px; font-family:'Plus Jakarta Sans',sans-serif; font-size:18px; color:#0C2340;">Your property vs the neighbourhood</p>
                        <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:13px; color:#5A7A9A; line-height:1.5;">
                          See how your home's value, size, and growth rate compares to every recent sale within 1km. <strong style="color:#3DBFAD;">Open your full report to unlock.</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>

            <!-- PRIMARY CTA -->
            <tr>
              <td style="padding: 0 32px 32px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="border-radius:10px; background-color:#3DBFAD; text-align:center;">
                      <a href="/" target="_blank" style="display:block; padding:16px 24px; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; letter-spacing:0.3px;">
                        View Your Full Property Report &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- SECONDARY HOOK -->
            <tr>
              <td style="padding: 0 32px 28px; background-color: #ffffff;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="text-align:center;">
                      <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:12px; color:#5A7A9A; line-height:1.6;">
                        Your report includes an interactive map of nearby sales,<br/>
                        value trends since purchase, and properties currently for sale.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- AERIAL IMAGE TEASER -->
            <tr>
              <td style="background-color:#ffffff; padding: 0 32px 0;" class="mobile-padding">
                <div style="border-radius:10px; overflow:hidden;">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/hero-aerial-kHz3HR4JoyhTDPjeV4oNYH.webp" alt="Aerial view of your neighbourhood" width="536" style="width:100%; display:block; border:0; border-radius:10px; opacity:0.85;" />
                </div>
              </td>
            </tr>

            <!-- MAP TEASER TEXT -->
            <tr>
              <td style="padding: 16px 32px 32px; background-color: #ffffff; border-radius: 0 0 12px 12px;" class="mobile-padding">
                <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:12px; color:#5A7A9A; text-align:center; line-height:1.5;">
                  &#128205; 6 properties sold near you &nbsp;&bull;&nbsp; 4 currently for sale &nbsp;&bull;&nbsp; Interactive map inside
                </p>
              </td>
            </tr>

            <!-- FOOTER SPACER -->
            <tr><td style="height:24px;"></td></tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding: 0 32px;" class="mobile-padding">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="text-align:center; padding-bottom:16px;">
                      <img src="${LOGO_ICON}" alt="MyHome" width="28" style="display:inline-block; border:0; height:auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center; padding-bottom:16px;">
                      <p style="margin:0; font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#5A7A9A; line-height:1.6;">
                        This report was generated for the property at<br/>
                        14 Jacaranda Crescent, Fourways, Johannesburg.<br/>
                        Valuations are estimates and should not be considered formal appraisals.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align:center; padding-bottom:24px;">
                      <a href="#" style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#5A7A9A; text-decoration:underline;">Unsubscribe</a>
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#e2e8f0;">&nbsp;&bull;&nbsp;</span>
                      <a href="#" style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#5A7A9A; text-decoration:underline;">Privacy Policy</a>
                      <span style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#e2e8f0;">&nbsp;&bull;&nbsp;</span>
                      <a href="/" style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; font-size:11px; color:#5A7A9A; text-decoration:underline;">View in browser</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;

// Extract just the inner body content from the email HTML for inline rendering
function extractEmailBody(html: string): string {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

export default function EmailPreview() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL_HTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([EMAIL_HTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myhome-property-report-email.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f0f5fa]">
      <AppHeader label="Email Template · Marketing Prototype" />
      {/* Toolbar — hidden on mobile */}
      <div className="hidden sm:block sticky top-[57px] z-40 bg-white border-b border-border shadow-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_ICON} alt="MyHome" className="w-7 h-7" />
            <div>
              <h1 className="font-semibold text-sm text-[#0C2340]">Email Template Preview</h1>
              <p className="text-xs text-[#5A7A9A]">Property Report — Homeowner Hook Email</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex items-center bg-muted rounded-lg p-0.5">
              <button
                onClick={() => setView("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === "desktop" ? "bg-white text-[#0C2340] shadow-sm" : "text-[#5A7A9A]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === "mobile" ? "bg-white text-[#0C2340] shadow-sm" : "text-[#5A7A9A]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>

            <div className="w-px h-6 bg-border mx-1" />

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#5A7A9A] hover:text-[#0C2340] hover:bg-muted transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#3DBFAD]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy HTML"}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3DBFAD] text-white hover:bg-[#3DBFAD]/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Email preview */}
      {isMobile ? (
        /* Mobile: render email inline with non-sticky header */
        <div className="w-full bg-white">
          {/* Email client header — non-sticky, scrolls with content */}
          <div className="bg-[#f0f5fa] border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#5A7A9A] w-12">From:</span>
                <span className="text-xs text-[#0C2340]">MyHome &lt;reports@myhome.co.za&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#5A7A9A] w-12">To:</span>
                <span className="text-xs text-[#0C2340]">rudi.botha@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[#5A7A9A] w-12">Subject:</span>
                <span className="text-xs text-[#0C2340] font-semibold">Rudi, your home at 14 Jacaranda Crescent is now worth R1,580,000</span>
              </div>
            </div>
          </div>
          <div
            className="w-full email-inline-content"
            dangerouslySetInnerHTML={{ __html: extractEmailBody(EMAIL_HTML) }}
          />
        </div>
      ) : (
        /* Desktop: animated wrapper with email client chrome */
        <div className="py-8 flex justify-center">
          <motion.div
            className="bg-white rounded-lg shadow-xl shadow-[#0C2340]/10 overflow-hidden"
            animate={{
              width: view === "desktop" ? 700 : 375,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Fake email client header */}
            <div className="bg-[#f0f5fa] border-b border-border px-5 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-[#5A7A9A] w-12">From:</span>
                  <span className="text-xs text-[#0C2340]">MyHome &lt;reports@myhome.co.za&gt;</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-[#5A7A9A] w-12">To:</span>
                  <span className="text-xs text-[#0C2340]">rudi.botha@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-[#5A7A9A] w-12">Subject:</span>
                  <span className="text-xs text-[#0C2340] font-semibold">Rudi, your home at 14 Jacaranda Crescent is now worth R1,580,000</span>
                </div>
              </div>
            </div>

            {/* Email content in iframe */}
            <iframe
              srcDoc={EMAIL_HTML}
              title="Email Preview"
              className="w-full border-0"
              style={{ height: "1600px" }}
            />
          </motion.div>
        </div>
      )}
      <AppFooter label="Marketing prototype" />
    </div>
  );
}
