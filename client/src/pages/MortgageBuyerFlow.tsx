/*
 * Mortgage Buyer Journey — low-fidelity wireframe flow.
 * Each "screen" is a phone-shaped mock with placeholder UI elements showing
 * what the buyer actually sees at that step of the journey. Laid out on a
 * React Flow canvas so the user can pan / zoom Figma-style.
 *
 * Scope: BetterID handoff → Registration at the Deeds Office (Phases 0–2
 * of the project spec). Stops at "Registered" — the legal end of the deal.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import type { Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Maximize2, ChevronLeft, Lock, Video, Phone, MoreVertical, Smile, Paperclip, Mic, Camera } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

const MYHOME_LOGO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

// BetterID brand
const BETTERID_BLUE = "#3E84FA";
const BETTERID_NAVY = "#000069";

function BetterIDLogo({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.8902 13.4949C24.8902 21.2553 20.386 27.9631 13.8491 31.1474C13.6284 31.255 13.3705 31.255 13.1501 31.1474C6.61397 27.9635 2.10938 21.2553 2.10938 13.4949C2.10938 13.2382 2.11412 12.983 2.1248 12.7287C2.12599 12.6915 2.12718 12.6547 2.12915 12.6175C2.14023 12.3668 2.26997 12.1358 2.47764 11.9945C5.61954 9.85854 9.41371 8.60938 13.4998 8.60938C17.5859 8.60938 21.3813 9.85854 24.5232 11.9953C24.7312 12.1365 24.8606 12.3672 24.8716 12.6183C24.8728 12.6527 24.8748 12.6868 24.876 12.7216V12.7247C24.8859 12.9803 24.8906 13.237 24.8906 13.4953L24.8902 13.4949Z" fill={BETTERID_BLUE} />
      <path d="M42.5509 19.7811C43.9347 20.507 44.7514 21.8268 44.7514 23.4766C44.7514 25.9403 42.5055 27.92 39.7378 27.92H33V12.522H39.5563C42.3013 12.522 44.3431 14.2158 44.3431 16.4815C44.3431 17.8013 43.6625 19.0332 42.5509 19.7811ZM41.0082 16.9874C41.0082 16.0196 40.3049 15.3596 39.2387 15.3596H36.3576V18.6372H39.2387C40.3049 18.6372 41.0082 17.9553 41.0082 16.9874ZM39.4202 24.8624C40.5545 24.8624 41.3031 24.1365 41.3031 23.1247C41.3031 22.1348 40.5545 21.4089 39.4202 21.4089H36.3576V24.8624H39.4202Z" fill={BETTERID_NAVY} />
      <path d="M59.2162 21.9368C59.2162 22.2448 59.1935 22.5527 59.1481 22.8607H49.8695C50.1644 24.4885 51.2533 25.3904 52.864 25.3904C54.021 25.3904 54.9739 24.8624 55.473 24.0045H58.9439C58.0592 26.6002 55.7225 28.25 52.864 28.25C49.2569 28.25 46.5119 25.5223 46.5119 21.9588C46.5119 18.3953 49.2343 15.6896 52.864 15.6896C56.6299 15.6896 59.2162 18.5052 59.2162 21.9368ZM52.864 18.4392C51.3894 18.4392 50.3459 19.2751 49.9602 20.683H55.904C55.4276 19.2311 54.3613 18.4392 52.864 18.4392Z" fill={BETTERID_NAVY} />
      <path d="M67.3858 25.0384H68.8831V27.898H66.5238C63.8241 27.898 62.168 26.2922 62.168 23.6746V18.6152H59.9675V17.9113L64.7996 12.9399H65.4348V16.0196H68.8151V18.6152H65.4802V23.2346C65.4802 24.3785 66.1608 25.0384 67.3858 25.0384Z" fill={BETTERID_NAVY} />
      <path d="M77.1338 25.0384H78.6311V27.898H76.2717C73.5721 27.898 71.916 26.2922 71.916 23.6746V18.6152H69.7154V17.9113L74.5476 12.9399H75.1828V16.0196H78.563V18.6152H75.2282V23.2346C75.2282 24.3785 75.9088 25.0384 77.1338 25.0384Z" fill={BETTERID_NAVY} />
      <path d="M92.6694 21.9368C92.6694 22.2448 92.6467 22.5527 92.6013 22.8607H83.3227C83.6176 24.4885 84.7066 25.3904 86.3173 25.3904C87.4743 25.3904 88.4271 24.8624 88.9262 24.0045H92.3972C91.5124 26.6002 89.1757 28.25 86.3173 28.25C82.7102 28.25 79.9652 25.5223 79.9652 21.9588C79.9652 18.3953 82.6875 15.6896 86.3173 15.6896C90.0832 15.6896 92.6694 18.5052 92.6694 21.9368ZM86.3173 18.4392C84.8427 18.4392 83.7991 19.2751 83.4134 20.683H89.3572C88.8808 19.2311 87.8146 18.4392 86.3173 18.4392Z" fill={BETTERID_NAVY} />
      <path d="M101.289 15.9536H102.377V18.9892H100.926C99.0653 18.9892 98.3394 19.8031 98.3394 21.7388V27.898H95.0272V16.0196H97.137L97.7268 17.4934C98.6116 16.4375 99.7005 15.9536 101.289 15.9536Z" fill={BETTERID_NAVY} />
      <path d="M105.014 27.898V12.5H106.171V27.898H105.014Z" fill={BETTERID_NAVY} />
      <path d="M115.741 12.5V12.522C120.414 12.522 123.794 15.7556 123.794 20.199C123.794 24.6645 120.414 27.898 115.741 27.898H110.863V12.5H115.741ZM115.718 26.8642C119.733 26.8642 122.637 24.0485 122.637 20.199C122.637 16.3495 119.733 13.5559 115.718 13.5559H112.02V26.8642H115.718Z" fill={BETTERID_NAVY} />
      <path d="M13.503 19.6425C15.2088 19.6426 16.8443 19.9692 18.3701 20.6142C18.4583 20.6522 18.5474 20.6905 18.6348 20.7304C18.7028 20.7609 18.7699 20.7925 18.836 20.8242C18.8482 20.8289 18.8601 20.8344 18.8711 20.8408C18.901 20.8542 18.9303 20.8682 18.959 20.8828C19.0175 20.9108 19.0776 20.9406 19.1358 20.9706L19.1992 21.0029C19.2697 21.0385 19.3406 21.076 19.4102 21.1132C19.482 21.1515 19.5536 21.1901 19.625 21.2304L19.6416 21.2402C19.6545 21.2475 19.6675 21.2555 19.6807 21.2626C19.8859 21.3793 20.0222 21.5716 20.0733 21.7831C20.0865 21.8368 20.0943 21.8904 20.0957 21.9453C20.0965 21.9475 20.0967 21.9495 20.0967 21.9521L20.0957 21.955C20.1004 22.1094 20.0603 22.2663 19.9727 22.4081L19.9248 22.4833C19.8433 22.6093 19.7623 22.7345 19.6778 22.8583C19.51 23.1107 19.3311 23.3632 19.1289 23.6337C18.9162 23.9172 18.6967 24.1953 18.4785 24.455C18.202 24.7833 17.9163 25.0999 17.6299 25.3974L17.6143 25.413C17.5461 25.4853 17.4752 25.557 17.4043 25.6288L17.3653 25.6689C17.1594 25.8735 16.9489 26.0749 16.7364 26.2685L16.6787 26.3193C16.6353 26.3594 16.591 26.3996 16.5469 26.4394L16.5059 26.4765L16.4893 26.4892C16.288 26.6675 16.0868 26.8363 15.8906 26.9941C15.5106 27.3042 15.1167 27.5969 14.7129 27.8749C14.6322 27.9307 14.5505 27.986 14.4678 28.041L14.4395 28.0595C14.4131 28.0767 14.3869 28.094 14.3604 28.1103C14.2797 28.1649 14.1983 28.2167 14.1153 28.2685L14.0987 28.2792C14.0652 28.3002 14.0314 28.3218 13.9971 28.3427C13.9694 28.3597 13.94 28.3771 13.9112 28.3945C13.6549 28.5445 13.3355 28.541 13.0821 28.3876C13.0801 28.3868 13.0762 28.3847 13.0762 28.3847L13.0371 28.3593C12.9839 28.3265 12.9301 28.2935 12.878 28.2597C12.7898 28.204 12.7037 28.149 12.6172 28.0917L12.6055 28.0849C12.5886 28.0741 12.5724 28.0633 12.5557 28.0517C12.4675 27.9936 12.3796 27.9351 12.293 27.8749C11.8955 27.6028 11.501 27.3083 11.1201 26.999C10.9164 26.8364 10.715 26.667 10.5137 26.4882C10.4319 26.4155 10.3527 26.3435 10.2744 26.2724C10.0624 26.0794 9.84953 25.877 9.6387 25.6669C9.62407 25.652 9.60945 25.6369 9.59475 25.622C9.58329 25.6104 9.57107 25.5985 9.55959 25.5869C9.50247 25.5289 9.44511 25.4707 9.38967 25.412L9.37893 25.3984C9.07875 25.0883 8.79465 24.7716 8.53323 24.4579C8.30146 24.1827 8.07955 23.9057 7.87112 23.6269C7.68605 23.3782 7.50175 23.1187 7.32815 22.8593L7.32034 22.8486C7.23476 22.7193 7.15103 22.5924 7.07034 22.4648L7.03518 22.4091L7.0342 22.4081L7.03323 22.4062C6.9451 22.2658 6.90525 22.1086 6.9092 21.954V21.9511L6.91018 21.9482C6.91136 21.8921 6.91844 21.8369 6.93264 21.7831C6.98284 21.5748 7.11609 21.3842 7.31643 21.2675L7.31838 21.2665C7.32082 21.2647 7.32265 21.2627 7.32522 21.2617C7.3339 21.2569 7.34232 21.2531 7.35061 21.248L7.36233 21.2411C7.43678 21.1994 7.51244 21.1573 7.58791 21.1171C7.59773 21.1121 7.6076 21.1068 7.61721 21.1015C7.62655 21.0964 7.6354 21.0905 7.64455 21.0859C7.69743 21.0573 7.75201 21.0302 7.80569 21.0029L7.85159 20.9794C7.92266 20.9432 7.99471 20.9081 8.06643 20.873L8.1094 20.8515C8.19119 20.8124 8.27428 20.774 8.35647 20.7372C8.36532 20.7326 8.37496 20.7286 8.38381 20.7255C8.46688 20.6872 8.55151 20.6502 8.63577 20.6142C10.1597 19.9692 11.7971 19.6425 13.503 19.6425Z" fill="white" />
      <path d="M13.4981 11.2275C15.4337 11.2275 17.003 12.7968 17.003 14.7324C17.0029 16.6679 15.4336 18.2372 13.4981 18.2372C11.5625 18.2372 9.99327 16.6679 9.99319 14.7324C9.99319 12.7968 11.5625 11.2275 13.4981 11.2275Z" fill="white" />
    </svg>
  );
}

// ─── Wireframe primitives ──────────────────────────────────────────────────

function Line({
  w = "100%",
  thick = false,
  tone = "slate",
}: {
  w?: string | number;
  thick?: boolean;
  tone?: "slate" | "teal" | "amber";
}) {
  const colour =
    tone === "teal" ? "bg-[#3DBFAD]" : tone === "amber" ? "bg-amber-500" : "bg-slate-300";
  return (
    <div
      className={`rounded-full ${thick ? "h-2" : "h-1.5"} ${colour}`}
      style={{ width: typeof w === "number" ? `${w}px` : w }}
    />
  );
}

function Block({
  h = 40,
  tone = "slate",
  rounded = "rounded-md",
}: {
  h?: number;
  tone?: "slate" | "teal" | "navy" | "amber" | "green";
  rounded?: string;
}) {
  const colour =
    tone === "teal"
      ? "bg-[#3DBFAD]/15"
      : tone === "navy"
      ? "bg-[#0C2340]/10"
      : tone === "amber"
      ? "bg-amber-100"
      : tone === "green"
      ? "bg-emerald-100"
      : "bg-slate-100";
  return <div className={`w-full ${rounded} ${colour}`} style={{ height: h }} />;
}

function Pill({
  children,
  tone = "navy",
}: {
  children: React.ReactNode;
  tone?: "navy" | "teal" | "amber" | "green" | "slate";
}) {
  const colour =
    tone === "teal"
      ? "bg-[#3DBFAD] text-white"
      : tone === "amber"
      ? "bg-amber-500 text-white"
      : tone === "green"
      ? "bg-emerald-500 text-white"
      : tone === "slate"
      ? "bg-slate-200 text-slate-700"
      : "bg-[#0C2340] text-white";
  return (
    <div className={`inline-flex text-[8px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${colour}`}>
      {children}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <div className="text-[8px] text-slate-400 leading-tight">{children}</div>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-bold text-[#0C2340] leading-tight">{children}</div>;
}

// ─── Device frames ─────────────────────────────────────────────────────────

const SCREEN_W = 220;
const SCREEN_H = 420;

type Platform = "myhome" | "whatsapp" | "betterid" | "betterbond";

// BetterBond brand (real colors from logo)
const BETTERBOND_RED = "#DD1B22";
const BETTERBOND_NAVY = "#002C5E";

function BetterBondLogo({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 172 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M20.0255 0.547852C17.5927 0.547852 15.4299 1.69371 14.0432 3.47453C14.8582 3.5986 15.6537 3.80052 16.4176 4.08273C16.4322 4.08759 16.4444 4.09489 16.459 4.09976C17.4078 3.25801 18.6558 2.74468 20.0255 2.74468C22.9984 2.74468 25.4069 5.15317 25.4069 8.12606C25.4069 11.099 22.9984 13.5074 20.0255 13.5074C17.2399 13.5074 14.9506 11.3885 14.6757 8.67345C14.413 8.581 14.143 8.50315 13.868 8.4399C13.778 8.42043 13.6856 8.40097 13.5931 8.38151C13.2209 8.31096 12.8414 8.26717 12.4521 8.25257C12.5203 12.3786 15.8848 15.7043 20.0255 15.7043C24.1661 15.7043 27.6037 12.3105 27.6037 8.12606C27.6037 3.94163 24.2124 0.547852 20.0255 0.547852Z" fill={BETTERBOND_RED} />
        <path d="M20.0258 15.7043C19.943 15.7043 19.8603 15.7043 19.78 15.6994C19.78 15.7554 19.7825 15.8113 19.7825 15.8697C19.7825 20.0785 16.3741 23.4893 12.1629 23.4893C7.95171 23.4893 4.5409 20.0785 4.5409 15.8697C4.5409 11.6609 7.95171 8.25013 12.1629 8.25013C15.1942 8.25013 17.8095 10.0188 19.038 12.583C19.3129 12.6341 19.5976 12.6608 19.8871 12.6608C21.067 12.6608 22.1472 12.2229 22.9768 11.5052C21.2495 7.22835 17.0602 4.20923 12.1629 4.20923C5.72325 4.20437 0.5 9.42762 0.5 15.8673C0.5 22.3069 5.72325 27.5302 12.1653 27.5302C18.6074 27.5302 23.8282 22.3094 23.8282 15.8673C23.8282 15.478 23.8063 15.0936 23.7699 14.7117C22.6654 15.3394 21.3906 15.7018 20.0282 15.7018" fill={BETTERBOND_NAVY} />
        <path d="M46.2371 14.2812C47.726 15.0621 48.5702 16.5242 48.5702 18.3075C48.5702 21.0104 46.1933 23.1731 43.2642 23.1731H36.0996V6.31616H43.0696C45.9768 6.31616 48.1372 8.16997 48.1372 10.6514C48.1372 12.1014 47.4244 13.4516 46.2371 14.2836V14.2812ZM44.5999 11.2183C44.5999 10.16 43.8676 9.42043 42.7217 9.42043H39.6831V13.0161H42.7217C43.87 13.0161 44.5999 12.2717 44.5999 11.2183ZM42.9212 19.8256C44.1206 19.8256 44.9113 19.0325 44.9113 17.9255C44.9113 16.8186 44.1206 16.045 42.9212 16.045H39.6831V19.8256H42.9212Z" fill={BETTERBOND_NAVY} />
        <path d="M74.2024 20.042V23.173H71.7039C68.8429 23.173 67.084 21.4141 67.084 18.5288V12.9941H64.7314V12.2351L69.8671 6.77588H70.5386V10.1697H74.127V12.9966H70.597V18.0641C70.597 19.3219 71.3195 20.0444 72.5992 20.0444H74.1975L74.2024 20.042Z" fill={BETTERBOND_NAVY} />
        <path d="M84.5588 20.042V23.173H82.0603C79.1993 23.173 77.4404 21.4141 77.4404 18.5288V12.9941H75.0879V12.2351L80.2236 6.77588H80.895V10.1697H84.4834V12.9966H80.9534V18.0641C80.9534 19.3219 81.6759 20.0444 82.9556 20.0444H84.554L84.5588 20.042Z" fill={BETTERBOND_NAVY} />
        <path d="M109.765 10.0967V13.4126H108.24C106.257 13.4126 105.473 14.2909 105.473 16.4171V23.173H101.958V10.1697H104.213L104.838 11.7632C105.765 10.6124 106.94 10.0967 108.609 10.0967H109.765Z" fill={BETTERBOND_NAVY} />
        <path d="M124.155 18.5532C124.155 21.1417 122.024 23.1731 119.105 23.1731H112.466V6.31616H119.037C121.764 6.31616 123.693 8.14807 123.693 10.5493C123.693 12.1379 122.793 13.69 121.44 14.3834C123.085 15.011 124.155 16.6483 124.155 18.5532ZM114.137 7.96804V13.5854H119.11C120.735 13.5854 121.971 12.3009 121.971 10.7658C121.971 9.23067 120.689 7.96804 119.059 7.96804H114.137ZM122.416 18.3659C122.416 16.6021 121.01 15.2397 119.18 15.2397H114.137V21.4993H119.144C121.003 21.4993 122.416 20.1613 122.416 18.3659Z" fill={BETTERBOND_NAVY} />
        <path d="M126.695 16.6702C126.695 12.7582 129.637 9.89233 133.549 9.89233C137.461 9.89233 140.402 12.7825 140.402 16.6702C140.402 20.5578 137.468 23.448 133.549 23.448C129.629 23.448 126.695 20.5578 126.695 16.6702ZM138.73 16.6702C138.73 13.6778 136.541 11.481 133.549 11.481C130.556 11.481 128.367 13.6705 128.367 16.6702C128.367 19.6698 130.563 21.8593 133.549 21.8593C136.534 21.8593 138.73 19.6625 138.73 16.6702Z" fill={BETTERBOND_NAVY} />
        <path d="M154.997 15.4148V23.1731H153.359V15.7846C153.359 12.999 151.977 11.3958 149.547 11.3958C147.117 11.3958 145.295 13.4078 145.295 15.9233V23.1731H143.657V10.1697H144.84L145.166 12.4663C146.134 10.8874 147.878 9.89478 149.953 9.89478C153.058 9.89478 154.999 12.1792 154.999 15.4148H154.997Z" fill={BETTERBOND_NAVY} />
        <path d="M171.5 5.54248V23.1731H170.215L169.982 20.9617C168.785 22.4968 166.916 23.448 164.707 23.448C160.832 23.448 158.024 20.5335 158.024 16.6702C158.024 12.8069 160.832 9.89235 164.707 9.89235C166.846 9.89235 168.663 10.7779 169.862 12.223V5.54248H171.5ZM169.965 16.6702C169.965 13.6948 167.787 11.481 164.827 11.481C161.866 11.481 159.698 13.6948 159.698 16.6702C159.698 19.6455 161.88 21.8594 164.827 21.8594C167.773 21.8594 169.965 19.626 169.965 16.6702Z" fill={BETTERBOND_NAVY} />
        <path d="M60.2409 18.9399C60.1557 19.0494 60.0779 19.1321 59.983 19.2416C59.3675 19.969 58.2752 20.4093 57.2096 20.4093C55.5042 20.4093 54.3364 19.4313 54.0323 17.6578H63.8755C63.9193 17.3148 63.9436 16.9717 63.9436 16.6263C63.9436 12.8798 61.2043 9.80225 57.212 9.80225C53.2198 9.80225 50.4658 12.7557 50.4658 16.6725C50.4658 20.5893 53.3706 23.5428 57.212 23.5428C59.3796 23.5428 61.5254 22.6086 62.771 21.0345L60.2433 18.9399H60.2409ZM57.2096 12.8019C58.7885 12.8019 59.9295 13.6631 60.4258 15.2542H54.1248C54.5335 13.7142 55.6453 12.8019 57.2096 12.8019Z" fill={BETTERBOND_NAVY} />
        <path d="M95.6813 18.9399C95.5961 19.0494 95.5183 19.1321 95.4234 19.2416C94.8079 19.969 93.7156 20.4093 92.65 20.4093C90.9446 20.4093 89.7769 19.4313 89.4728 17.6578H99.3159C99.3597 17.3148 99.384 16.9717 99.384 16.6263C99.384 12.8798 96.6447 9.80225 92.6524 9.80225C88.6602 9.80225 85.9062 12.7557 85.9062 16.6725C85.9062 20.5893 88.811 23.5428 92.6524 23.5428C94.8201 23.5428 96.9658 22.6086 98.2114 21.0345L95.6837 18.9399H95.6813ZM92.65 12.8019C94.2289 12.8019 95.3699 13.6631 95.8662 15.2542H89.5652C89.9739 13.7142 91.0857 12.8019 92.65 12.8019Z" fill={BETTERBOND_NAVY} />
      </g>
    </svg>
  );
}

const PLATFORM_META: Record<
  Platform,
  { label: string; bg: string; chipBg: string; chipText: string }
> = {
  myhome: {
    label: "MyHome app",
    bg: "bg-[#3DBFAD]",
    chipBg: "bg-[#3DBFAD]/15",
    chipText: "text-[#0F6E56]",
  },
  whatsapp: {
    label: "WhatsApp",
    bg: "bg-[#25D366]",
    chipBg: "bg-[#25D366]/15",
    chipText: "text-[#075E54]",
  },
  betterid: {
    label: "BetterID web",
    bg: "bg-[#3E84FA]",
    chipBg: "bg-[#3E84FA]/15",
    chipText: "text-[#000069]",
  },
  betterbond: {
    label: "BetterBond portal",
    bg: "bg-[#F57C2F]",
    chipBg: "bg-[#F57C2F]/15",
    chipText: "text-[#1A3543]",
  },
};

function PlatformChrome({
  platform,
  whatsappContact,
}: {
  platform: Platform;
  whatsappContact?: { name: string; sub: string; initials?: string };
}) {
  if (platform === "whatsapp") {
    const initials = whatsappContact?.initials ?? "S";
    return (
      <div className="bg-[#075E54] flex items-center px-1.5 py-1.5 gap-1.5 flex-shrink-0">
        <ChevronLeft className="text-white w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
        <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center flex-shrink-0 text-white text-[9px] font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-[10px] font-semibold leading-tight truncate">
            {whatsappContact?.name ?? "Contact"}
          </div>
          <div className="text-white/75 text-[7px] leading-tight">
            {whatsappContact?.sub ?? "online"}
          </div>
        </div>
        <Video className="text-white w-3 h-3 flex-shrink-0" strokeWidth={2} />
        <Phone className="text-white w-3 h-3 flex-shrink-0" strokeWidth={2} />
        <MoreVertical className="text-white w-3 h-3 flex-shrink-0" strokeWidth={2} />
      </div>
    );
  }
  if (platform === "betterid") {
    return (
      <>
        {/* Browser URL bar */}
        <div className="bg-slate-100 border-b border-slate-200 flex items-center gap-1 px-2 py-1 flex-shrink-0">
          <Lock className="w-2 h-2 text-emerald-600 flex-shrink-0" />
          <div className="text-[7px] text-slate-500 truncate">betterid.co.za/v/p4z2k</div>
        </div>
        {/* App brand bar with real BetterID logo */}
        <div
          className="flex items-center px-3 py-2 gap-2 flex-shrink-0 border-b border-slate-100"
          style={{ backgroundColor: "white" }}
        >
          <BetterIDLogo className="h-4 w-auto" />
          <div
            className="ml-auto text-[7px] font-mono font-bold"
            style={{ color: BETTERID_NAVY }}
          >
            SECURE
          </div>
        </div>
      </>
    );
  }
  if (platform === "betterbond") {
    return (
      <>
        {/* Browser URL bar */}
        <div className="bg-slate-100 border-b border-slate-200 flex items-center gap-1 px-2 py-1 flex-shrink-0">
          <Lock className="w-2 h-2 text-emerald-600 flex-shrink-0" />
          <div className="text-[7px] text-slate-500 truncate">consultant.betterbond.co.za</div>
        </div>
        {/* BetterBond brand bar — real logo */}
        <div
          className="flex items-center px-2.5 py-2 gap-1.5 flex-shrink-0 border-b border-slate-100"
          style={{ backgroundColor: "white" }}
        >
          <BetterBondLogo className="h-4 w-auto" />
          <div
            className="ml-auto text-[7px] font-mono font-bold"
            style={{ color: BETTERBOND_NAVY }}
          >
            CONSULTANT
          </div>
        </div>
      </>
    );
  }
  // MyHome
  return (
    <div className="bg-white border-b border-slate-200 flex items-center px-3 py-2 gap-2 flex-shrink-0">
      <img
        src={MYHOME_LOGO}
        alt="MyHome"
        className="h-3.5 w-auto flex-shrink-0"
        crossOrigin="anonymous"
      />
      <div className="ml-auto text-[7px] text-slate-400 font-mono">in-app</div>
    </div>
  );
}

type MyHomeTab = "home" | "vault" | "deals" | "money" | "me";

function WhatsappInput() {
  return (
    <div className="bg-[#F0F0F0] border-t border-slate-200 px-1.5 py-1.5 flex items-center gap-1 flex-shrink-0">
      <div className="bg-white rounded-full flex items-center gap-1 px-2 py-1 flex-1 min-w-0 shadow-sm">
        <Smile className="w-3 h-3 text-slate-400 flex-shrink-0" strokeWidth={2} />
        <div className="text-[8px] text-slate-400 flex-1 truncate">Message</div>
        <Paperclip className="w-3 h-3 text-slate-400 flex-shrink-0 -rotate-45" strokeWidth={2} />
        <Camera className="w-3 h-3 text-slate-400 flex-shrink-0" strokeWidth={2} />
      </div>
      <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0">
        <Mic className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
      </div>
    </div>
  );
}

function BottomTabs({
  platform,
  activeTab,
}: {
  platform: Platform;
  activeTab?: MyHomeTab | "chats";
}) {
  if (platform === "betterid" || platform === "betterbond") return null; // focused web portals — no tab bar
  if (platform === "whatsapp") {
    // In a chat view you don't see the tab bar — you see the input bar.
    return <WhatsappInput />;
  }
  // MyHome
  const tabs: { id: MyHomeTab; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: "⌂" },
    { id: "vault", label: "Vault", icon: "▢" },
    { id: "deals", label: "Deals", icon: "◈" },
    { id: "money", label: "Money", icon: "₽" },
    { id: "me", label: "Me", icon: "○" },
  ];
  return (
    <div className="bg-white border-t border-slate-200 flex items-stretch flex-shrink-0">
      {tabs.map((t) => {
        const active = t.id === activeTab;
        return (
          <div
            key={t.id}
            className={`flex-1 flex flex-col items-center justify-center py-1 ${
              active ? "text-[#3DBFAD]" : "text-slate-400"
            }`}
          >
            <div className="text-[11px] leading-none font-bold">{t.icon}</div>
            <div className="text-[7px] font-bold mt-0.5 leading-none">{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function PhoneFrame({
  label,
  step,
  children,
  platform,
  whatsappContact,
  activeTab,
}: {
  label: string;
  step: number | string;
  children: React.ReactNode;
  platform: Platform;
  whatsappContact?: { name: string; sub: string };
  activeTab?: MyHomeTab | "chats";
}) {
  const meta = PLATFORM_META[platform];
  return (
    <div className="flex flex-col items-center" style={{ width: SCREEN_W + 20 }}>
      {/* Caption above the phone */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-5 h-5 rounded-full bg-[#0C2340] text-white text-[10px] font-bold flex items-center justify-center">
          {step}
        </div>
        <div className="text-[9px] font-bold tracking-wider uppercase text-[#0C2340]">
          {label}
        </div>
      </div>
      {/* Platform tag */}
      <div
        className={`inline-flex items-center gap-1 ${meta.chipBg} ${meta.chipText} px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase mb-2`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${meta.bg}`} />
        on {meta.label}
      </div>
      {/* Phone */}
      <div
        className="relative bg-white border-[6px] border-slate-800 rounded-[28px] shadow-md overflow-hidden"
        style={{ width: SCREEN_W, height: SCREEN_H }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-800 rounded-b-xl z-10" />
        {/* OS status bar */}
        <div className="h-4 flex items-center justify-end px-3 pt-1">
          <div className="text-[6px] font-bold text-slate-500">●●● 100%</div>
        </div>
        {/* Screen content */}
        <div className="flex flex-col h-[calc(100%-16px)]">
          <PlatformChrome platform={platform} whatsappContact={whatsappContact} />
          <div
            className={`flex-1 overflow-hidden p-2 ${
              platform === "whatsapp" ? "bg-[#E5DDD5]" : ""
            }`}
            style={
              platform === "whatsapp"
                ? {
                    backgroundImage:
                      "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }
                : undefined
            }
          >
            {children}
          </div>
          <BottomTabs platform={platform} activeTab={activeTab} />
          {/* Home bar */}
          <div className="flex justify-center pb-1 pt-0.5">
            <div className="w-12 h-1 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screens — each is a tiny wireframe inside a PhoneFrame ────────────────

// Agent prep — what happens BEFORE the buyer ever opens MyHome. Sarah (agent)
// has been working with Wesley to find a property; once the OTP is accepted,
// she uploads it via BetterID and triggers the buyer's verification flow.

function ScreenAgentChat() {
  return (
    <PhoneFrame
      step="A1"
      label="Agent ↔ buyer (Sarah's view)"
      platform="whatsapp"
      whatsappContact={{ name: "Wesley · prospect", sub: "online", initials: "W" }}
      activeTab="chats"
    >
      <div className="flex flex-col gap-1.5 pt-0.5">
        <div className="self-center bg-white/80 rounded px-2 py-0.5 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-500">LAST 2 WEEKS</div>
        </div>

        {/* Outgoing (agent → buyer) — green WhatsApp bubble, right-aligned */}
        <div className="self-end max-w-[170px] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2 py-1 shadow-sm relative">
          <div className="absolute -right-1 top-0 w-0 h-0 border-t-[6px] border-t-[#DCF8C6] border-r-[6px] border-r-transparent" />
          <div className="text-[9px] text-slate-800 leading-snug">
            Saw this one for you 👀
          </div>
          <div className="bg-white/60 border border-slate-200/60 rounded px-1 py-0.5 mt-0.5">
            <div className="text-[7px] font-bold text-[#0C2340]">14 Greenside Cres</div>
            <div className="text-[7px] text-slate-500">R 1.35m · 3 bed</div>
          </div>
          <div className="text-[6px] text-slate-500 mt-0.5 text-right">12 May ✓✓</div>
        </div>

        {/* Incoming (buyer → agent) */}
        <div className="self-start max-w-[160px] bg-white rounded-lg rounded-tl-sm px-2 py-1 shadow-sm relative">
          <div className="absolute -left-1 top-0 w-0 h-0 border-t-[6px] border-t-white border-l-[6px] border-l-transparent" />
          <div className="text-[9px] text-slate-800 leading-snug">
            Love it. Let's offer R 1.35m
          </div>
          <div className="text-[6px] text-slate-400 mt-0.5">14 May</div>
        </div>

        {/* Outgoing — OTP signing */}
        <div className="self-end max-w-[170px] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2 py-1 shadow-sm">
          <div className="text-[9px] text-slate-800 leading-snug">
            Seller accepted ✨ OTP attached
          </div>
          <div className="text-[6px] text-slate-500 mt-0.5 text-right">Today ✓✓</div>
        </div>

        {/* System / status — OTP signed */}
        <div className="self-center bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
          <div className="text-[7px] font-bold text-amber-800">
            ✍️ OTP signed by Wesley · time to set up file
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenAgentUpload() {
  return (
    <PhoneFrame step="A2" label="Agent uploads OTP via BetterID" platform="betterid">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: BETTERID_NAVY, opacity: 0.6 }}>
            Agent portal
          </div>
          <div className="text-[7px] font-semibold" style={{ color: BETTERID_BLUE }}>
            Sarah · PG
          </div>
        </div>
        <Heading>New deal file</Heading>
        <div className="text-[8px] text-slate-500 leading-tight">
          Verify your buyer and attach the signed OTP. We'll create their MyHome file.
        </div>

        {/* Buyer details (pre-filled from chat) */}
        <div>
          <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
            Buyer
          </div>
          <div className="border border-slate-200 rounded-md px-2 py-1 bg-slate-50 flex items-center gap-1">
            <div className="text-[8.5px] text-[#0C2340] font-semibold flex-1 truncate">
              Wesley M. Roos · 910101•••071
            </div>
          </div>
        </div>

        {/* Property */}
        <div>
          <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
            Property
          </div>
          <div className="border border-slate-200 rounded-md px-2 py-1 bg-slate-50">
            <div className="text-[8.5px] text-[#0C2340] font-semibold leading-tight">
              14 Greenside Cres
            </div>
            <div className="text-[7px] text-slate-500">ERF 1209 · R 1,350,000</div>
          </div>
        </div>

        {/* OTP upload */}
        <div>
          <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
            Signed OTP
          </div>
          <div
            className="border-2 border-dashed rounded-md px-2 py-1.5 flex items-center gap-1.5 bg-white"
            style={{ borderColor: BETTERID_BLUE + "55" }}
          >
            <div className="text-[14px] leading-none">📄</div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-bold text-[#0C2340] leading-tight truncate">
                OTP-signed-greenside.pdf
              </div>
              <div className="text-[7px] text-slate-500 leading-tight">attached · 1.8 MB</div>
            </div>
            <div
              className="w-3 h-3 rounded-full text-white text-[7px] font-bold flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: BETTERID_BLUE }}
            >
              ✓
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto flex flex-col gap-1">
          <div
            className="text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm"
            style={{ backgroundColor: BETTERID_BLUE }}
          >
            Send BetterID link to buyer →
          </div>
          <div className="text-center text-[7.5px]" style={{ color: BETTERID_NAVY, opacity: 0.55 }}>
            We'll WhatsApp Wesley to verify
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// BetterBond consultant prep — happens in parallel with Sarah's property work.
// Bianca gets Wes pre-approved across 4 banks, then logs the result so it
// appears on Wes's MyHome dashboard the moment he opens the app.

function ScreenConsultantChat() {
  return (
    <PhoneFrame
      step="B1"
      label="Bond consultant ↔ buyer (Bianca's view)"
      platform="whatsapp"
      whatsappContact={{ name: "Wesley · pre-approval", sub: "online", initials: "W" }}
      activeTab="chats"
    >
      <div className="flex flex-col gap-1.5 pt-0.5">
        <div className="self-center bg-white/80 rounded px-2 py-0.5 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-500">LAST WEEK</div>
        </div>

        {/* Bianca asks for income + ID for the affordability check */}
        <div className="self-end max-w-[170px] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2 py-1 shadow-sm relative">
          <div className="absolute -right-1 top-0 w-0 h-0 border-t-[6px] border-t-[#DCF8C6] border-r-[6px] border-r-transparent" />
          <div className="text-[9px] text-slate-800 leading-snug">
            Hi Wes — quick affordability check before you go house-hunting. Send me your latest payslip + ID 👍
          </div>
          <div className="text-[6px] text-slate-500 mt-0.5 text-right">7 May ✓✓</div>
        </div>

        {/* Wesley sends docs */}
        <div className="self-start max-w-[160px] bg-white rounded-lg rounded-tl-sm px-2 py-1 shadow-sm relative">
          <div className="absolute -left-1 top-0 w-0 h-0 border-t-[6px] border-t-white border-l-[6px] border-l-transparent" />
          <div className="bg-slate-50 border border-slate-200 rounded px-1 py-0.5 flex items-center gap-1">
            <div className="text-[10px]">📎</div>
            <div className="text-[7px] font-bold text-[#0C2340] flex-1">payslip · ID</div>
          </div>
          <div className="text-[6px] text-slate-400 mt-0.5">9 May</div>
        </div>

        {/* Bianca runs the credit check */}
        <div className="self-end max-w-[170px] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2 py-1 shadow-sm">
          <div className="text-[9px] text-slate-800 leading-snug">
            Running your credit + affordability check now — give me 5 min
          </div>
          <div className="text-[6px] text-slate-500 mt-0.5 text-right">9 May ✓✓</div>
        </div>

        {/* Pre-approval result — indicative, not bank-specific */}
        <div className="self-end max-w-[170px] bg-[#DCF8C6] rounded-lg rounded-tr-sm px-2 py-1 shadow-sm">
          <div className="text-[9px] text-slate-800 leading-snug">
            🎉 You're indicatively pre-approved up to <span className="font-bold">R 1.5m</span>. Go shop! When you sign an OTP I'll submit to the banks.
          </div>
          <div className="text-[6px] text-slate-500 mt-0.5 text-right">Today ✓✓</div>
        </div>

        {/* System note */}
        <div className="self-center bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
          <div className="text-[7px] font-bold text-amber-800">
            📊 Logging pre-approval to MyHome
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenConsultantUpload() {
  return (
    <PhoneFrame step="B2" label="Consultant logs pre-approval to MyHome" platform="betterbond">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: BETTERBOND_NAVY, opacity: 0.6 }}>
            Pre-approval · push to MyHome
          </div>
          <div className="text-[7px] font-semibold" style={{ color: BETTERBOND_RED }}>
            Bianca N.
          </div>
        </div>
        <Heading>Log indicative pre-approval</Heading>
        <div className="text-[8px] text-slate-500 leading-tight">
          Affordability check based on credit bureau + income. Buyer can shop with confidence.
        </div>

        {/* Buyer */}
        <div>
          <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
            Buyer
          </div>
          <div className="border border-slate-200 rounded-md px-2 py-1 bg-slate-50">
            <div className="text-[8.5px] text-[#0C2340] font-semibold leading-tight">
              Wesley M. Roos
            </div>
          </div>
        </div>

        {/* Pre-approval amount — the headline */}
        <div
          className="rounded-md p-2 text-white"
          style={{ backgroundColor: BETTERBOND_NAVY }}
        >
          <div className="text-[7px] uppercase tracking-wider opacity-70 font-semibold">
            Indicative pre-approval
          </div>
          <div className="text-[18px] font-extrabold leading-none mt-0.5">
            up to R 1,500,000
          </div>
          <div className="text-[7px] opacity-70 mt-0.5">valid 3 months · until 12 Aug</div>
        </div>

        {/* Affordability inputs — what went into the number */}
        <div className="border border-slate-200 rounded-md overflow-hidden">
          <div className="bg-slate-50 px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider text-slate-500">
            Inputs
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Credit score", value: "Excellent (725)" },
              { label: "Gross income", value: "R 45,000 / mo" },
              { label: "Net income", value: "R 32,000 / mo" },
              { label: "Existing debt", value: "R 4,200 / mo" },
            ].map((r) => (
              <div key={r.label} className="px-2 py-0.5 flex items-center justify-between">
                <div className="text-[7.5px] text-slate-500">{r.label}</div>
                <div className="text-[7.5px] font-bold text-[#0C2340] tabular-nums">{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Note about banks coming later */}
        <div className="text-[7.5px] text-slate-500 italic leading-snug">
          Bank submissions happen later — once Wes signs an OTP.
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <div
            className="text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm flex items-center justify-center gap-1.5"
            style={{ backgroundColor: BETTERBOND_RED }}
          >
            <span>Push to MyHome →</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenAgentWhatsapp() {
  return (
    <PhoneFrame
      step={1}
      label="Agent sends BetterID link"
      platform="whatsapp"
      whatsappContact={{ name: "Sarah · Pam Golding", sub: "typing…", initials: "S" }}
      activeTab="chats"
    >
      <div className="flex flex-col gap-1.5 pt-0.5">
        {/* Date separator pill */}
        <div className="self-center bg-white/80 rounded px-2 py-0.5 shadow-sm">
          <div className="text-[7px] font-semibold text-slate-500">TODAY</div>
        </div>

        {/* First incoming bubble — short greeting */}
        <div className="self-start max-w-[180px] bg-white rounded-lg rounded-tl-sm px-2 py-1.5 shadow-sm relative">
          {/* Bubble tail */}
          <div className="absolute -left-1 top-0 w-0 h-0 border-t-[6px] border-t-white border-l-[6px] border-l-transparent" />
          <div className="text-[9px] text-slate-800 leading-snug">
            Hi Wes 👋
          </div>
          <div className="flex items-center justify-end gap-0.5 mt-0.5">
            <div className="text-[6px] text-slate-400">10:42</div>
          </div>
        </div>

        {/* Second incoming bubble — message + link preview */}
        <div className="self-start max-w-[180px] bg-white rounded-lg rounded-tl-sm overflow-hidden shadow-sm">
          {/* Link preview card (rendered inside the bubble, like real WhatsApp) */}
          <div
            className="bg-slate-100 border-l-2 px-1.5 py-1 m-0.5 rounded flex items-center gap-1.5"
            style={{ borderColor: BETTERID_BLUE }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-[7px] font-bold" style={{ color: BETTERID_NAVY }}>
                BetterID
              </div>
              <div className="text-[7px] text-slate-600 leading-tight">
                Identity verification · FICA-grade
              </div>
              <div className="text-[7px] text-slate-400 mt-0.5">
                betterid.co.za
              </div>
            </div>
            <BetterIDLogo className="h-3 w-auto flex-shrink-0" />
          </div>
          <div className="px-2 pb-1.5 pt-1">
            <div className="text-[9px] text-slate-800 leading-snug">
              Please verify for FICA before we sign:
            </div>
            <div className="text-[8px] text-[#039BE5] underline mt-0.5">
              betterid.co.za/v/p4z2k
            </div>
            <div className="flex items-center justify-end gap-0.5 mt-0.5">
              <div className="text-[6px] text-slate-400">10:42</div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenBetterID() {
  return (
    <PhoneFrame step={2} label="BetterID verification" platform="betterid">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-center mb-1">
          <BetterIDLogo className="h-5 w-auto" />
        </div>
        <Heading>Verify your identity</Heading>
        <Caption>Step 2 of 3 · Face match</Caption>
        <div className="flex gap-1">
          <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: BETTERID_BLUE }} />
          <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: BETTERID_BLUE }} />
          <div className="flex-1 h-1 rounded-full bg-slate-200" />
        </div>
        <div
          className="w-full rounded-xl border-2 border-dashed flex items-center justify-center"
          style={{ height: 110, borderColor: BETTERID_BLUE + "55", backgroundColor: BETTERID_BLUE + "0d" }}
        >
          <div className="text-[8px]" style={{ color: BETTERID_NAVY }}>
            Camera preview
          </div>
        </div>
        <Caption>Hold your face inside the frame</Caption>
        <div className="mt-auto">
          <div
            className="text-white text-[10px] font-bold rounded-lg py-2 text-center"
            style={{ backgroundColor: BETTERID_BLUE }}
          >
            Take photo
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenHandoff() {
  return (
    <PhoneFrame step={3} label="BetterID success → MyHome handoff" platform="betterid">
      <div
        className="flex flex-col gap-2 h-full relative -m-2 p-2 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${BETTERID_BLUE}0d 0%, white 60%)`,
        }}
      >
        {/* Decorative shield silhouette in the background (echoes the BetterID logo) */}
        <svg
          className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-[0.04]"
          width="160"
          height="200"
          viewBox="0 0 24 30"
          fill={BETTERID_BLUE}
        >
          <path d="M22.78 11.49C22.78 19.25 18.28 25.96 11.74 29.14C11.52 29.25 11.26 29.25 11.04 29.14C4.51 25.96 0 19.25 0 11.49C0 11.24 0 10.98 0.02 10.73C0.02 10.69 0.02 10.65 0.02 10.62C0.04 10.37 0.17 10.14 0.37 9.99C3.51 7.86 7.31 6.61 11.39 6.61C15.48 6.61 19.27 7.86 22.42 9.99C22.62 10.14 22.75 10.37 22.76 10.62C22.76 10.65 22.77 10.69 22.77 10.72V10.72C22.78 10.98 22.78 11.24 22.78 11.49Z" />
        </svg>

        {/* BetterID shield with checkmark — replaces the generic green tick */}
        <div className="relative flex flex-col items-center mt-1">
          <div className="relative">
            <svg
              width="58"
              height="72"
              viewBox="0 0 24 30"
              fill="none"
              className="drop-shadow-md"
            >
              <path
                d="M22.78 11.49C22.78 19.25 18.28 25.96 11.74 29.14C11.52 29.25 11.26 29.25 11.04 29.14C4.51 25.96 0 19.25 0 11.49C0 11.24 0 10.98 0.02 10.73C0.02 10.69 0.02 10.65 0.02 10.62C0.04 10.37 0.17 10.14 0.37 9.99C3.51 7.86 7.31 6.61 11.39 6.61C15.48 6.61 19.27 7.86 22.42 9.99C22.62 10.14 22.75 10.37 22.76 10.62C22.76 10.65 22.77 10.69 22.77 10.72V10.72C22.78 10.98 22.78 11.24 22.78 11.49Z"
                fill={BETTERID_BLUE}
              />
              {/* Inner checkmark */}
              <path
                d="M7 15 L10.5 18.5 L17 11.5"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div className="mt-1 inline-flex items-center gap-1">
            <BetterIDLogo className="h-2.5 w-auto" />
            <span
              className="text-[7px] font-bold tracking-widest uppercase"
              style={{ color: BETTERID_NAVY }}
            >
              · Verified
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-1 px-1">
          <div
            className="text-[13px] font-extrabold leading-tight"
            style={{ color: BETTERID_NAVY }}
          >
            Congrats on verifying!
          </div>
        </div>

        {/* Verified details card — feels official, signals trust */}
        <div
          className="rounded-lg border bg-white p-1.5 flex flex-col gap-0.5"
          style={{ borderColor: BETTERID_BLUE + "30" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-slate-500 uppercase tracking-wider font-semibold">
              Name
            </span>
            <span className="text-[8px] font-bold" style={{ color: BETTERID_NAVY }}>
              Wesley M. Roos
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-slate-500 uppercase tracking-wider font-semibold">
              ID
            </span>
            <span className="text-[8px] font-mono font-bold" style={{ color: BETTERID_NAVY }}>
              91••••••••71
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-slate-500 uppercase tracking-wider font-semibold">
              Status
            </span>
            <span className="text-[8px] font-bold" style={{ color: BETTERID_BLUE }}>
              ✓ Home Affairs match
            </span>
          </div>
        </div>

        {/* Subhead leading into the MyHome handoff */}
        <div className="text-[8.5px] leading-snug text-center px-2" style={{ color: BETTERID_NAVY, opacity: 0.75 }}>
          Continue to <span className="font-bold" style={{ color: "#3DBFAD" }}>MyHome</span> to track your deal and manage your home-buying journey in the palm of your hand.
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="bg-[#3DBFAD] text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm flex items-center justify-center gap-1.5">
            <img
              src={MYHOME_LOGO}
              alt=""
              className="h-2.5 w-auto brightness-0 invert"
              crossOrigin="anonymous"
            />
            <span>Continue to MyHome →</span>
          </div>
          <div
            className="text-center text-[8px] font-semibold"
            style={{ color: BETTERID_NAVY, opacity: 0.55 }}
          >
            Maybe later
          </div>
          {/* Footer trust badge */}
          <div className="flex items-center justify-center gap-1 pt-0.5">
            <Lock className="w-2 h-2" style={{ color: BETTERID_NAVY, opacity: 0.5 }} />
            <span className="text-[6px] font-semibold tracking-wider uppercase" style={{ color: BETTERID_NAVY, opacity: 0.55 }}>
              Secured by BetterID · POPIA compliant
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenReengage() {
  return (
    <PhoneFrame
      step={4}
      label="WhatsApp re-engagement"
      platform="whatsapp"
      whatsappContact={{ name: "MyHome", sub: "Business account", initials: "M" }}
      activeTab="chats"
    >
      <div className="flex flex-col gap-1.5 pt-0.5">
        {/* Encryption notice (the yellow band at the top of every WA chat) */}
        <div className="self-center max-w-[190px] bg-[#FFF6BC] rounded px-2 py-1 shadow-sm">
          <div className="text-[6px] text-amber-900 leading-tight text-center">
            🔒 Messages are end-to-end encrypted
          </div>
        </div>

        {/* WhatsApp Business message — has a header card + body + quick replies */}
        <div className="self-start max-w-[190px] bg-white rounded-lg rounded-tl-sm overflow-hidden shadow-sm relative">
          {/* Bubble tail */}
          <div className="absolute -left-1 top-0 w-0 h-0 border-t-[6px] border-t-white border-l-[6px] border-l-transparent" />

          {/* Business header image */}
          <div className="bg-[#3DBFAD]/15 border-b border-[#3DBFAD]/20 px-2 py-1.5 flex items-center gap-1.5">
            <img
              src={MYHOME_LOGO}
              alt="MyHome"
              className="h-3 w-auto"
              crossOrigin="anonymous"
            />
            <div className="text-[6px] font-semibold text-[#3DBFAD] uppercase tracking-wider">
              Verified business
            </div>
          </div>

          {/* Message body */}
          <div className="px-2 py-1.5">
            <div className="text-[9px] text-slate-800 leading-snug">
              Hi Wes — your verified profile is ready 🎉
            </div>
            <div className="text-[9px] text-slate-800 leading-snug mt-1">
              Upload your payslips once and we'll handle the rest of your home-buying paperwork.
            </div>
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <div className="text-[6px] text-slate-400">09:15</div>
            </div>
          </div>

          {/* WhatsApp Business quick-reply buttons */}
          <div className="border-t border-slate-100 divide-y divide-slate-100">
            <div className="px-2 py-1 text-center text-[8px] font-semibold text-[#039BE5]">
              ↗ Open MyHome
            </div>
            <div className="px-2 py-1 text-center text-[8px] font-semibold text-[#039BE5]">
              ⏰ Remind me tomorrow
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenSignin() {
  return (
    <PhoneFrame step={5} label="MyHome welcome (interstitial)" platform="myhome" activeTab="home">
      <div
        className="flex flex-col h-full -m-2 p-3 relative overflow-hidden items-center justify-center text-center"
        style={{
          background:
            "linear-gradient(180deg, #3DBFAD18 0%, #3DBFAD08 35%, white 100%)",
        }}
      >
        {/* Soft orbs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#3DBFAD]/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#0C2340]/10 blur-2xl pointer-events-none" />

        {/* Logo */}
        <img
          src={MYHOME_LOGO}
          alt="MyHome"
          className="h-7 w-auto relative"
          crossOrigin="anonymous"
        />

        {/* Welcome */}
        <div className="mt-6 relative">
          <div className="text-[16px] font-extrabold text-[#0C2340] leading-tight">
            Hi Wesley 👋
          </div>
          <div className="text-[10px] text-[#0C2340]/70 leading-snug mt-2 px-2">
            Your home-buying journey is already in motion.{" "}
            <span className="font-bold text-[#3DBFAD]">Let's take a look.</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto w-full relative">
          <div className="bg-[#3DBFAD] text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm">
            Continue →
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenLogin() {
  return (
    <PhoneFrame step={6} label="MyHome sign-up (one-tap)" platform="myhome" activeTab="home">
      <div className="flex flex-col gap-2 h-full">
        {/* Brand */}
        <div className="flex items-center justify-center mt-2">
          <img src={MYHOME_LOGO} alt="MyHome" className="h-4 w-auto" crossOrigin="anonymous" />
        </div>

        <div className="mt-2 text-center">
          <Heading>Save it for next time</Heading>
          <div className="text-[8.5px] text-slate-500 mt-0.5 leading-tight px-1">
            One tap to come back. No password to remember.
          </div>
        </div>

        {/* Hero Face ID button */}
        <div className="flex flex-col items-center mt-3">
          <div className="w-16 h-16 rounded-full border-2 border-[#3DBFAD] bg-[#3DBFAD]/10 flex items-center justify-center mb-1.5">
            <div className="text-[#3DBFAD] text-[28px] leading-none">👤</div>
          </div>
          <div className="text-[8px] font-semibold uppercase tracking-wider text-[#3DBFAD]">
            Face ID
          </div>
        </div>

        {/* Account email — tiny, just for reassurance */}
        <div className="text-center">
          <div className="text-[7px] uppercase tracking-wider text-slate-400 font-semibold">
            Account
          </div>
          <div className="text-[8.5px] text-[#0C2340] font-semibold">
            wesley.roos@gmail.com
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="bg-[#3DBFAD] text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm">
            Set up Face ID →
          </div>
          <div className="text-center text-[8px] text-slate-400 font-semibold">
            Use a password instead
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenVault() {
  return (
    <PhoneFrame step={7} label="Dashboard · your deal is already here" platform="myhome" activeTab="home">
      <div className="flex flex-col gap-2 h-full">
        {/* Greeting — compact */}
        <div
          className="-mx-2 -mt-2 px-2.5 pt-2 pb-2 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, #3DBFAD15 0%, #0C234008 60%, white 100%)",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-[#0C2340] text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
            WR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold text-[#0C2340] leading-tight">
              Hi Wesley, here's your deal.
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="text-[12px] text-[#0C2340]">🔔</div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500" />
          </div>
        </div>

        {/* Single hero card — property + pre-approval + deal status in one */}
        <div className="rounded-lg border-2 border-[#3DBFAD]/40 overflow-hidden bg-white shadow-sm">
          {/* Photo */}
          <Block h={70} tone="slate" rounded="rounded-none" />
          {/* Property details */}
          <div className="px-2 py-1.5">
            <div className="text-[12px] font-extrabold text-[#0C2340] leading-tight">
              R 1,350,000
            </div>
            <div className="text-[8px] text-slate-600 leading-tight">
              14 Greenside Cres · ERF 1209
            </div>
          </div>
          {/* Pre-approval inline chip */}
          <div
            className="px-2 py-1 flex items-center gap-1.5 border-t border-slate-100"
            style={{ backgroundColor: "#fafbfc" }}
          >
            <BetterBondLogo className="h-2 w-auto flex-shrink-0" />
            <div className="text-[7.5px] font-semibold flex-1" style={{ color: BETTERBOND_NAVY }}>
              Pre-approved up to <span className="font-extrabold">R 1.5m</span> · 3 mo
            </div>
            <div
              className="w-3 h-3 rounded-full text-white text-[7px] font-bold flex items-center justify-center"
              style={{ backgroundColor: BETTERBOND_RED }}
            >
              ✓
            </div>
          </div>
          {/* Deal progress bar inline */}
          <div className="px-2 py-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[7px] text-slate-400 uppercase tracking-wider font-semibold">
                Deal progress
              </div>
              <div className="text-[7px] font-mono font-bold text-[#3DBFAD]">2 / 17</div>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 17 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${
                    i < 2 ? "bg-emerald-500" : i === 2 ? "bg-amber-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-[8px] text-[#0C2340] font-semibold mt-1">
              Next: <span className="font-bold">Bond approval</span> — Bianca's on it
            </div>
          </div>
        </div>

        {/* This week — single compact line, not a card */}
        <div className="flex items-center gap-1.5 px-1">
          <div className="text-[10px] leading-none">📅</div>
          <div className="text-[8.5px] text-amber-900 font-semibold leading-tight flex-1">
            Sarah expects seller response <span className="font-bold">Friday</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto">
          <div className="bg-[#3DBFAD] text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm flex items-center justify-center gap-1.5">
            <span>Upload your docs</span>
            <span className="bg-white/25 px-1 rounded text-[8px]">0 / 6</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenDocVault() {
  const docs = [
    { label: "SA ID", sub: "front + back", state: "done" as const },
    { label: "Proof of address", sub: "≤ 3 months", state: "done" as const },
    { label: "Payslips", sub: "last 3 months", state: "uploading" as const },
    { label: "Bank statements", sub: "last 3 months", state: "empty" as const },
    { label: "Marriage cert", sub: "if applicable", state: "empty" as const },
    { label: "SARS tax no.", sub: "for transfer duty", state: "empty" as const },
  ];

  const tileStyle = (state: "done" | "uploading" | "empty") => {
    if (state === "done") return "border-[#3DBFAD] bg-[#3DBFAD]/10";
    if (state === "uploading") return "border-[#3DBFAD] bg-white";
    return "border-dashed border-amber-400 bg-amber-50/50";
  };
  const doneCount = docs.filter((d) => d.state === "done").length;

  return (
    <PhoneFrame step="7a" label="Doc vault (side trip from home)" platform="myhome" activeTab="vault">
      <div className="flex flex-col gap-2 h-full">
        {/* Header with back arrow → home */}
        <div className="flex items-center gap-1.5">
          <ChevronLeft className="w-3 h-3 text-[#0C2340]" strokeWidth={2.5} />
          <Heading>Your documents</Heading>
          <div className="ml-auto">
            <Pill tone="amber">{doneCount} / 6</Pill>
          </div>
        </div>
        <Caption>Upload once. Reuse across every actor in the deal.</Caption>

        {/* Progress bar */}
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3DBFAD] rounded-full"
            style={{ width: `${(doneCount / 6) * 100}%` }}
          />
        </div>

        {/* 2x3 grid of doc tiles */}
        <div className="grid grid-cols-2 gap-1.5 mt-0.5">
          {docs.map((d) => (
            <div
              key={d.label}
              className={`border-2 rounded-md p-1.5 flex flex-col gap-0.5 ${tileStyle(d.state)}`}
            >
              <div className="flex items-start justify-between gap-1">
                <div className="text-[8.5px] font-bold text-[#0C2340] leading-tight flex-1">
                  {d.label}
                </div>
                {d.state === "done" && (
                  <div className="w-3 h-3 rounded-full bg-[#3DBFAD] text-white text-[7px] font-bold flex items-center justify-center flex-shrink-0">
                    ✓
                  </div>
                )}
                {d.state === "uploading" && (
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-[#3DBFAD] border-t-transparent animate-spin flex-shrink-0" />
                )}
              </div>
              <div className="text-[7px] text-slate-500 leading-tight">
                {d.state === "done"
                  ? "✓ uploaded"
                  : d.state === "uploading"
                  ? "uploading…"
                  : d.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Auto-share reassurance */}
        <div className="bg-[#3DBFAD]/8 border border-[#3DBFAD]/20 rounded-md p-1.5 flex items-start gap-1.5">
          <div className="text-[10px] leading-none mt-0.5">🔁</div>
          <div className="text-[7.5px] text-[#0C2340] leading-snug">
            Auto-shared with{" "}
            <span className="font-bold">Bianca · bank · attorneys</span> when they need them
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="bg-[#3DBFAD] text-white text-[9.5px] font-bold rounded-lg py-1.5 text-center shadow-sm">
            Add next doc →
          </div>
          <div className="text-center text-[7.5px] text-slate-400 font-semibold">
            Done — back to home
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenPreapproval() {
  // Same dashboard as screen 7 — but the deal has progressed one beat.
  // OTP is now signed, docs are uploaded, Bianca's ready. Funnels into the bundle.
  return (
    <PhoneFrame step={8} label="Dashboard · OTP signed (one beat later)" platform="myhome" activeTab="home">
      <div className="flex flex-col gap-2 h-full">
        {/* Same greeting strip as screen 7 */}
        <div
          className="-mx-2 -mt-2 px-2.5 pt-2 pb-2 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, #3DBFAD15 0%, #0C234008 60%, white 100%)",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-[#0C2340] text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
            WR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold text-[#0C2340] leading-tight">
              Hi Wesley, your deal moved.
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="text-[12px] text-[#0C2340]">🔔</div>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500" />
          </div>
        </div>

        {/* Property hero card — slimmer than screen 7 so the progress bar fits */}
        <div className="rounded-lg border-2 border-[#3DBFAD]/40 overflow-hidden bg-white shadow-sm">
          <Block h={42} tone="slate" rounded="rounded-none" />
          <div className="px-2 py-1">
            <div className="text-[11px] font-extrabold text-[#0C2340] leading-tight">
              R 1,350,000
            </div>
            <div className="text-[7.5px] text-slate-600 leading-tight">
              14 Greenside Cres · ERF 1209
            </div>
          </div>
          {/* Pre-approval chip */}
          <div
            className="px-2 py-1 flex items-center gap-1.5 border-t border-slate-100"
            style={{ backgroundColor: "#fafbfc" }}
          >
            <BetterBondLogo className="h-2 w-auto flex-shrink-0" />
            <div className="text-[7.5px] font-semibold flex-1" style={{ color: BETTERBOND_NAVY }}>
              Pre-approved up to <span className="font-extrabold">R 1.5m</span>
            </div>
            <div
              className="w-3 h-3 rounded-full text-white text-[7px] font-bold flex items-center justify-center"
              style={{ backgroundColor: BETTERBOND_RED }}
            >
              ✓
            </div>
          </div>
          {/* Deal progress — ticked forward one step */}
          <div className="px-2 py-1.5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[7px] text-slate-400 uppercase tracking-wider font-semibold">
                Deal progress
              </div>
              <div className="text-[7px] font-mono font-bold text-[#3DBFAD]">3 / 17</div>
            </div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 17 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${
                    i < 3 ? "bg-emerald-500" : i === 3 ? "bg-amber-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-[8px] text-[#0C2340] font-semibold mt-1">
              Next: <span className="font-bold">Review your bundle</span> before banks
            </div>
          </div>
        </div>

        {/* Consultant card — compact, signals Bianca's the next actor */}
        <div className="rounded-lg border border-slate-200 bg-white p-1.5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: BETTERBOND_RED }}
            >
              BN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-bold text-[#0C2340] leading-tight">
                Bianca Naidoo
              </div>
              <div className="text-[7px] text-slate-500 leading-tight">
                Ready to submit · 6 / 6 docs in
              </div>
            </div>
            <div className="text-[#3DBFAD] text-[14px] leading-none">›</div>
          </div>
        </div>

        {/* CTA — natural funnel into the bundle product */}
        <div className="mt-auto">
          <div className="bg-[#3DBFAD] text-white text-[10px] font-bold rounded-lg py-2 text-center shadow-sm">
            Review your MyHome bundle →
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenBondBundle() {
  // MyHome All-In Loan — the bundling product. Rolls transfer + reno + move-in
  // costs into the bond ask so the buyer doesn't pay them in cash up front.
  const baseBond = 1350000;
  const items = [
    { label: "Transfer + bond costs", amount: 61000, on: true, why: "Don't lose R 61k cash on day 45" },
    { label: "HOC + life cover (yr 1)", amount: 8400, on: true, why: "12 months of cover, paid in" },
    { label: "Move-in essentials", amount: 25000, on: true, why: "Movers, fibre, handyman, alarm" },
    { label: "Renovation budget", amount: 50000, on: true, why: "Snag list + small reno · slider" },
  ];
  const bundled = items.filter((i) => i.on).reduce((sum, i) => sum + i.amount, baseBond);
  const extraMonthly = Math.round(((bundled - baseBond) * 0.095) / 12 + (bundled - baseBond) / (20 * 12));

  return (
    <PhoneFrame step={9} label="MyHome All-In Loan (the bundle)" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-1.5 h-full">
        <div className="flex items-center justify-between">
          <Heading>Bundle your true cost</Heading>
          <Pill tone="teal">NEW</Pill>
        </div>
        <Caption>Roll the cash-outs into your bond. Pay over 20 years, not Friday.</Caption>

        {/* Base */}
        <div className="border border-slate-200 rounded-md px-2 py-1 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-[7px] uppercase tracking-wider font-semibold text-slate-500">Property</div>
            <div className="text-[9px] font-bold text-[#0C2340]">R 1,350,000</div>
          </div>
          <div className="text-[7px] text-slate-400 font-mono">fixed</div>
        </div>

        {/* Bundle items */}
        <div className="border border-slate-200 rounded-md divide-y divide-slate-100">
          {items.map((it) => (
            <div key={it.label} className="px-2 py-1 flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#3DBFAD] text-white text-[7px] font-bold flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[8.5px] font-semibold text-[#0C2340] leading-tight">
                  + {it.label}
                </div>
                <div className="text-[7px] text-slate-500 leading-tight">{it.why}</div>
              </div>
              <div className="text-[8px] font-mono font-bold text-[#0C2340] tabular-nums">
                R {(it.amount / 1000).toFixed(1)}k
              </div>
            </div>
          ))}
        </div>

        {/* Total — the wow number */}
        <div className="rounded-md p-2 text-white bg-[#0C2340]">
          <div className="text-[7px] uppercase tracking-wider opacity-70 font-semibold">
            Bundled bond ask
          </div>
          <div className="text-[16px] font-extrabold leading-none mt-0.5 tabular-nums">
            R {(bundled / 1000000).toFixed(2)}m
          </div>
          <div className="text-[7.5px] text-[#3DBFAD] font-bold mt-0.5">
            R 0 cash today  ·  +R {extraMonthly.toLocaleString()}/mo for 20 yrs
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <div className="bg-[#3DBFAD] text-white text-[9.5px] font-bold rounded-lg py-1.5 text-center shadow-sm">
            Submit bundled application →
          </div>
          <div className="text-center text-[7px] text-slate-400 mt-0.5">
            Or skip — submit just R 1.35m
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenBondOffers() {
  // The big moment — 4 banks come back with offers, buyer picks one.
  const offers = [
    { bank: "Nedbank", rate: "9.50%", spread: "Prime − 0.75", monthly: 14250, interest: 1960000, best: true },
    { bank: "Absa", rate: "10.00%", spread: "Prime − 0.25", monthly: 14840, interest: 2060000, best: false },
    { bank: "FNB", rate: "10.00%", spread: "Prime − 0.25", monthly: 14840, interest: 2060000, best: false },
    { bank: "Standard", rate: "10.25%", spread: "Prime", monthly: 15130, interest: 2110000, best: false },
  ];

  return (
    <PhoneFrame step={11} label="Bank offers · compare & choose" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-1.5 h-full">
        <div className="flex items-center justify-between">
          <Heading>4 banks responded</Heading>
          <Pill tone="green">ALL ACCEPTED</Pill>
        </div>
        <Caption>Your R 1.49m bundled bond · pick your bank</Caption>

        {/* Offer cards */}
        <div className="flex flex-col gap-1">
          {offers.map((o) => (
            <div
              key={o.bank}
              className={`border-2 rounded-md p-1.5 ${
                o.best ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="text-[10px] font-extrabold text-[#0C2340]">{o.bank}</div>
                <div className="flex items-center gap-1">
                  <div className="text-[13px] font-extrabold text-[#0C2340] tabular-nums">{o.rate}</div>
                  {o.best && <Pill tone="green">BEST</Pill>}
                </div>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <div className="text-[7px] text-slate-500">{o.spread}</div>
                <div className="text-[8px] font-mono text-[#0C2340]">
                  R {o.monthly.toLocaleString()}/mo
                </div>
              </div>
              <div className="text-[7px] text-slate-400 mt-0.5">
                Total interest over 20 yrs: R {(o.interest / 1000000).toFixed(2)}m
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <div className="bg-[#3DBFAD] text-white text-[9.5px] font-bold rounded-lg py-1.5 text-center shadow-sm">
            Accept Nedbank — save R 100k →
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenBondApp() {
  return (
    <PhoneFrame step={10} label="Multi-bank submission" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-2">
        <Heading>Bond application</Heading>
        <Caption>BetterBond · 4 banks · R 1,494,400 (bundled)</Caption>
        {[
          { bank: "Nedbank", status: "✓ Submitted", tone: "green" as const },
          { bank: "Absa", status: "○ Pending", tone: "slate" as const },
          { bank: "Standard", status: "○ Pending", tone: "slate" as const },
          { bank: "FNB", status: "✓ Submitted", tone: "green" as const },
        ].map((b) => (
          <div key={b.bank} className="flex items-center justify-between border-b border-slate-100 pb-1">
            <div className="text-[9px] font-semibold text-[#0C2340]">{b.bank}</div>
            <Pill tone={b.tone}>{b.status}</Pill>
          </div>
        ))}
        <Caption>Docs sent from your vault · 6 files</Caption>
      </div>
    </PhoneFrame>
  );
}

function ScreenBondApproved() {
  return (
    <PhoneFrame step={12} label="Bond approved · letter signed" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-2">
        <Pill tone="green">APPROVED</Pill>
        <Heading>Nedbank · R 1.49m bundled bond</Heading>
        <div className="border border-emerald-200 bg-emerald-50 rounded-md p-2">
          <Caption>Interest rate</Caption>
          <div className="text-[15px] font-extrabold text-[#0C2340]">9.50%</div>
          <Caption>Prime − 0.75 · linked</Caption>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="border border-slate-200 rounded-md p-1.5">
            <Caption>Term</Caption>
            <div className="text-[9px] font-bold text-[#0C2340]">20 yrs</div>
          </div>
          <div className="border border-slate-200 rounded-md p-1.5">
            <Caption>Monthly</Caption>
            <div className="text-[9px] font-bold text-[#0C2340]">R 14,250</div>
          </div>
        </div>
        <Caption>Letter saved to vault</Caption>
      </div>
    </PhoneFrame>
  );
}

function ScreenMoneyWaterfall() {
  return (
    <PhoneFrame step={15} label="Money waterfall" platform="myhome" activeTab="money">
      <div className="flex flex-col gap-2">
        <Heading>What you owe, when</Heading>
        <Caption>Next 60 days · 4 events</Caption>
        {[
          { what: "Deposit", to: "Attorney trust", amt: "R 202,500", when: "today", tone: "amber" as const },
          { what: "Bond + transfer", to: "Attorney trust", amt: "R 61,000", when: "Day 38", tone: "amber" as const },
          { what: "Disbursements", to: "SARS · atty", amt: "~R 35k", when: "Day 45", tone: "slate" as const },
          { what: "Bank settles", to: "Seller", amt: "R 1.15m", when: "Day 88", tone: "slate" as const },
        ].map((e) => (
          <div key={e.what} className="flex items-center justify-between border-l-2 border-amber-300 pl-1.5 py-0.5">
            <div>
              <div className="text-[9px] font-bold text-[#0C2340]">{e.what}</div>
              <Caption>{e.to} · {e.when}</Caption>
            </div>
            <div className="text-[9px] font-bold text-amber-700 tabular-nums">{e.amt}</div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function ScreenFICA() {
  return (
    <PhoneFrame step={16} label="Document inbox · FICA" platform="myhome" activeTab="vault">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Heading>Tasks from attorney</Heading>
          <Pill tone="amber">3</Pill>
        </div>
        {[
          { task: "Sign FICA pack", action: "Pre-filled from vault" },
          { task: "Confirm cost statement", action: "v2 · attorney updated" },
          { task: "Book signing apt", action: "3 slots offered" },
        ].map((t) => (
          <div key={t.task} className="flex items-start gap-1.5 border-b border-slate-100 pb-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-[9px] font-semibold text-[#0C2340]">{t.task}</div>
              <Caption>{t.action}</Caption>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function ScreenInsurance() {
  return (
    <PhoneFrame step={17} label="Insurance · compare" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-2">
        <Heading>HOC + life cover</Heading>
        <Caption>Compare before you sign</Caption>
        {[
          { name: "Bank broker", price: "695", best: false },
          { name: "BetterSure", price: "540", best: true },
          { name: "Naked", price: "580", best: false },
        ].map((q) => (
          <div
            key={q.name}
            className={`border-2 rounded-md p-1.5 ${q.best ? "border-emerald-400 bg-emerald-50" : "border-slate-200"}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-bold text-[#0C2340]">{q.name}</div>
              {q.best && <Pill tone="green">BEST</Pill>}
            </div>
            <Caption>R {q.price} / mo</Caption>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function ScreenStatusFeed() {
  // Deal status timeline — accessible from anywhere in MyHome.
  // Green ✓ = done · pulsing amber = current · amber ○ = upcoming.
  const milestones: { label: string; date: string; state: "done" | "current" | "upcoming" }[] = [
    { label: "OTP signed", date: "Day 0 · 14 May", state: "done" },
    { label: "Bond approved", date: "Day 14 · Nedbank", state: "done" },
    { label: "Deposit paid", date: "Day 0 · R 202,500", state: "done" },
    { label: "FICA cleared", date: "Day 32", state: "done" },
    { label: "Bond signed", date: "Day 35", state: "done" },
    { label: "Costs + disbursements", date: "Day 45 · ~R 96k", state: "done" },
    { label: "Lodged at Deeds", date: "Today · 09:30", state: "current" },
    { label: "Registered", date: "ETA 2–6 weeks", state: "upcoming" },
  ];

  return (
    <PhoneFrame step={18} label="Deal timeline (open from anywhere)" platform="myhome" activeTab="deals">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <Heading>Deal timeline</Heading>
          <Pill tone="amber">AT DEEDS</Pill>
        </div>
        <Caption>14 Greenside · Day 58 of ~88</Caption>

        <div className="flex flex-col gap-0.5 mt-1">
          {milestones.map((m, i) => {
            const isLast = i === milestones.length - 1;
            const dotColour =
              m.state === "done"
                ? "bg-emerald-500 border-emerald-500"
                : m.state === "current"
                ? "bg-amber-500 border-amber-500 ring-2 ring-amber-200"
                : "bg-white border-amber-400";
            const icon =
              m.state === "done" ? "✓" : m.state === "current" ? "●" : "○";
            const iconColour =
              m.state === "done"
                ? "text-white"
                : m.state === "current"
                ? "text-white"
                : "text-amber-500";
            const lineColour =
              m.state === "done"
                ? "bg-emerald-500"
                : m.state === "current"
                ? "bg-amber-300"
                : "bg-amber-200";
            const labelColour =
              m.state === "upcoming" ? "text-slate-400" : "text-[#0C2340]";

            return (
              <div key={m.label} className="flex items-start gap-1.5">
                <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${dotColour} flex items-center justify-center text-[7px] font-bold ${iconColour} leading-none`}
                  >
                    {icon}
                  </div>
                  {!isLast && <div className={`w-px h-3 ${lineColour}`} />}
                </div>
                <div className="flex-1 pb-1">
                  <div className={`text-[9px] font-bold ${labelColour} leading-tight`}>
                    {m.label}
                  </div>
                  <div className="text-[7px] text-slate-400 leading-tight">
                    {m.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}

function ScreenRegistered() {
  return (
    <PhoneFrame step={19} label="Registered · keys" platform="myhome" activeTab="home">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex flex-col items-center mt-3">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
            <div className="text-emerald-600 text-3xl leading-none">✓</div>
          </div>
          <Pill tone="green">REGISTERED</Pill>
        </div>
        <div className="mt-2 text-center">
          <Heading>Your home is yours</Heading>
        </div>
        <div className="text-center">
          <Caption>Title deed · T1209/2026</Caption>
        </div>
        <Block h={44} tone="green" rounded="rounded-md" />
        <div className="mt-auto flex flex-col gap-1">
          <div className="bg-[#0C2340] text-white text-[9px] font-bold rounded-lg py-1.5 text-center">
            View title deed
          </div>
          <div className="text-center">
            <Caption>Up next: month 1 debits</Caption>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── React Flow nodes ──────────────────────────────────────────────────────

type ScreenNodeData = { Screen: () => JSX.Element };

function ScreenNode({ data }: NodeProps<Node<ScreenNodeData>>) {
  const { Screen } = data;
  return (
    <div>
      <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle id="t-s" type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle id="b-t" type="target" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle id="r-t" type="target" position={Position.Right} style={{ opacity: 0 }} />
      <Handle id="l-s" type="source" position={Position.Left} style={{ opacity: 0 }} />
      <Screen />
    </div>
  );
}

type PhaseFrameData = { label: string; sub: string };

function PhaseFrameNode({ data }: NodeProps<Node<PhaseFrameData>>) {
  return (
    <div className="w-full h-full rounded-2xl border-2 border-dashed border-[#0C2340]/20 bg-[#0C2340]/[0.02] relative pointer-events-none">
      <div className="absolute -top-3 left-4 bg-[#f0f5fa] px-3 text-[10px] font-extrabold uppercase tracking-widest text-[#0C2340]">
        {data.label}
      </div>
      <div className="absolute -bottom-5 left-4 text-[9px] text-slate-500 italic">
        {data.sub}
      </div>
    </div>
  );
}

const nodeTypes = {
  screen: ScreenNode,
  phase: PhaseFrameNode,
};

// ─── Layout ────────────────────────────────────────────────────────────────

// Layout constants.
// Each node renders the phone PLUS caption + platform chip above it.
// Total visual height of a node ≈ phone height (420) + ~50 of caption block.
const COL = 270; // horizontal stride: 220 phone + 50 gap
const PHONE_BLOCK_H = SCREEN_H + 60; // phone + caption + chip
const ROW_GAP = 70; // gap between rows inside a phase
const PHASE_GAP = 100; // gap between phase frames
const FRAME_PAD = 40; // padding inside a phase frame

const X0 = 40;
const Y0 = 40;

// Phase −1A — agent prep (2 screens) sitting to the LEFT of the buyer journey
const PHASE_AGENT_X = X0;
const PHASE_AGENT_ROWS = 1;
const PHASE_AGENT_H = FRAME_PAD * 2 + PHASE_AGENT_ROWS * PHONE_BLOCK_H;
const PHASE_AGENT_COLS = 2;
const PHASE_AGENT_W = FRAME_PAD * 2 + (PHASE_AGENT_COLS - 1) * COL + SCREEN_W + 20;

// Buyer journey (phases 0/1/2) — shifted right so agent fits on the left
const PHASE_BUYER_X = PHASE_AGENT_X + PHASE_AGENT_W + 60;

// Phase −1B — bond consultant prep (2 screens) sits ABOVE the buyer journey,
// right-aligned so its right edge matches Phase 0's right edge.
const PHASE_CONSULTANT_COLS = 2;
const PHASE_CONSULTANT_W = FRAME_PAD * 2 + (PHASE_CONSULTANT_COLS - 1) * COL + SCREEN_W + 20;
const PHASE_CONSULTANT_H = FRAME_PAD * 2 + 1 * PHONE_BLOCK_H;
const PHASE_CONSULTANT_Y = Y0;

// Phase 0 — 6 screens in row 0 (full happy path) + 1 fallback below row 0
const PHASE0_X = PHASE_BUYER_X;
const PHASE0_ROWS = 2;
const PHASE0_H = FRAME_PAD * 2 + PHASE0_ROWS * PHONE_BLOCK_H + ROW_GAP;
const PHASE0_COLS = 6;
const PHASE0_W = FRAME_PAD * 2 + (PHASE0_COLS - 1) * COL + SCREEN_W + 20;

// Right-align consultant frame with Phase 0
const PHASE_CONSULTANT_X = PHASE0_X + PHASE0_W - PHASE_CONSULTANT_W;

// Agent sits at the same Y as phase 0 (both below consultant)
const PHASE_AGENT_Y = PHASE_CONSULTANT_Y + PHASE_CONSULTANT_H + PHASE_GAP;
const PHASE0_Y = PHASE_AGENT_Y;

// Phase 1 — combined journey from OTP-signed dashboard through registration
// 10 screens in a 5×2 grid (wraps at s10 → s11)
const PHASE1_Y = PHASE0_Y + PHASE0_H + PHASE_GAP;
const PHASE1_ROWS = 2;
const PHASE1_H = FRAME_PAD * 2 + PHASE1_ROWS * PHONE_BLOCK_H + ROW_GAP;
const PHASE1_COLS = 5;
const PHASE1_W = FRAME_PAD * 2 + (PHASE1_COLS - 1) * COL + SCREEN_W + 20;

// Inner X helper — X of column n inside a frame; pass baseX to position relative to a specific phase
const colX = (n: number, baseX: number = X0) => baseX + FRAME_PAD + n * COL;
const innerY = (frameY: number, row: number) =>
  frameY + FRAME_PAD + row * (PHONE_BLOCK_H + ROW_GAP);

const nodes: Node[] = [
  // ── Phase frames (rendered behind, must come first) ─────────────────────
  {
    id: "phase-agent",
    type: "phase",
    position: { x: PHASE_AGENT_X, y: PHASE_AGENT_Y },
    data: { label: "Phase −1A · Agent prep", sub: "Sarah works the OTP, uploads via BetterID — triggers buyer flow" },
    style: { width: PHASE_AGENT_W, height: PHASE_AGENT_H },
    selectable: false,
    draggable: false,
    zIndex: -1,
  },
  {
    id: "phase-consultant",
    type: "phase",
    position: { x: PHASE_CONSULTANT_X, y: PHASE_CONSULTANT_Y },
    data: { label: "Phase −1B · Bond consultant prep", sub: "Bianca gets Wes pre-approved across 4 banks, pushes the result to MyHome" },
    style: { width: PHASE_CONSULTANT_W, height: PHASE_CONSULTANT_H },
    selectable: false,
    draggable: false,
    zIndex: -1,
  },
  {
    id: "phase-0",
    type: "phase",
    position: { x: PHASE_BUYER_X, y: PHASE0_Y },
    data: { label: "Phase 0 · Buyer onboarding", sub: "BetterID handoff → first dashboard — the make-or-break moment for the buyer" },
    style: { width: PHASE0_W, height: PHASE0_H },
    selectable: false,
    draggable: false,
    zIndex: -1,
  },
  {
    id: "phase-1",
    type: "phase",
    position: { x: PHASE_BUYER_X, y: PHASE1_Y },
    data: { label: "Phase 1 · Buyer's journey", sub: "Pre-approval → registration · the full ride · MyHome carries the load for the buyer" },
    style: { width: PHASE1_W, height: PHASE1_H },
    selectable: false,
    draggable: false,
    zIndex: -1,
  },

  // ── Phase −1A — Agent prep ──────────────────────────────────────────────
  { id: "a1", type: "screen", position: { x: colX(0), y: innerY(PHASE_AGENT_Y, 0) }, data: { Screen: ScreenAgentChat }, draggable: false },
  { id: "a2", type: "screen", position: { x: colX(1), y: innerY(PHASE_AGENT_Y, 0) }, data: { Screen: ScreenAgentUpload }, draggable: false },

  // ── Phase −1B — Bond consultant prep ─────────────────────────────────────
  // Consultant phase sits to the right of agent phase, same row, own X helper.
  { id: "b1", type: "screen", position: { x: PHASE_CONSULTANT_X + FRAME_PAD, y: innerY(PHASE_CONSULTANT_Y, 0) }, data: { Screen: ScreenConsultantChat }, draggable: false },
  { id: "b2", type: "screen", position: { x: PHASE_CONSULTANT_X + FRAME_PAD + COL, y: innerY(PHASE_CONSULTANT_Y, 0) }, data: { Screen: ScreenConsultantUpload }, draggable: false },

  // ── Phase 0 — row 0 (full happy path) and row 1 (just the fallback) ──────
  { id: "s1", type: "screen", position: { x: colX(0, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenAgentWhatsapp }, draggable: false },
  { id: "s2", type: "screen", position: { x: colX(1, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenBetterID }, draggable: false },
  { id: "s3", type: "screen", position: { x: colX(2, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenHandoff }, draggable: false },
  // First MyHome touch — brand welcome
  { id: "s_signin", type: "screen", position: { x: colX(3, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenSignin }, draggable: false },
  // Sign-up — create MyHome account (password / passkey)
  { id: "s_login", type: "screen", position: { x: colX(4, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenLogin }, draggable: false },
  // Home dashboard — the first real product surface after sign-up
  { id: "s5", type: "screen", position: { x: colX(5, PHASE_BUYER_X), y: innerY(PHASE0_Y, 0) }, data: { Screen: ScreenVault }, draggable: false },
  // Fallback — re-engage sits below screen 3 (where the bouncer left)
  { id: "s4", type: "screen", position: { x: colX(2, PHASE_BUYER_X), y: innerY(PHASE0_Y, 1) }, data: { Screen: ScreenReengage }, draggable: false },
  // Side branch — doc vault upload UI, opened from the dashboard
  { id: "s_vault", type: "screen", position: { x: colX(5, PHASE_BUYER_X), y: innerY(PHASE0_Y, 1) }, data: { Screen: ScreenDocVault }, draggable: false },

  // ── Phase 1 — 5×2 grid (wraps at s_offers → s10)
  // Row 0: dashboard-after-OTP → bundle → bond app → offers → bond approved
  { id: "s6", type: "screen", position: { x: colX(0, PHASE_BUYER_X), y: innerY(PHASE1_Y, 0) }, data: { Screen: ScreenPreapproval }, draggable: false },
  { id: "s_bundle", type: "screen", position: { x: colX(1, PHASE_BUYER_X), y: innerY(PHASE1_Y, 0) }, data: { Screen: ScreenBondBundle }, draggable: false },
  { id: "s9", type: "screen", position: { x: colX(2, PHASE_BUYER_X), y: innerY(PHASE1_Y, 0) }, data: { Screen: ScreenBondApp }, draggable: false },
  { id: "s_offers", type: "screen", position: { x: colX(3, PHASE_BUYER_X), y: innerY(PHASE1_Y, 0) }, data: { Screen: ScreenBondOffers }, draggable: false },
  { id: "s10", type: "screen", position: { x: colX(4, PHASE_BUYER_X), y: innerY(PHASE1_Y, 0) }, data: { Screen: ScreenBondApproved }, draggable: false },
  // Row 1: money waterfall → FICA → insurance → status → registered
  { id: "s11", type: "screen", position: { x: colX(0, PHASE_BUYER_X), y: innerY(PHASE1_Y, 1) }, data: { Screen: ScreenMoneyWaterfall }, draggable: false },
  { id: "s12", type: "screen", position: { x: colX(1, PHASE_BUYER_X), y: innerY(PHASE1_Y, 1) }, data: { Screen: ScreenFICA }, draggable: false },
  { id: "s13", type: "screen", position: { x: colX(2, PHASE_BUYER_X), y: innerY(PHASE1_Y, 1) }, data: { Screen: ScreenInsurance }, draggable: false },
  { id: "s14", type: "screen", position: { x: colX(3, PHASE_BUYER_X), y: innerY(PHASE1_Y, 1) }, data: { Screen: ScreenStatusFeed }, draggable: false },
  { id: "s15", type: "screen", position: { x: colX(4, PHASE_BUYER_X), y: innerY(PHASE1_Y, 1) }, data: { Screen: ScreenRegistered }, draggable: false },
];

const SOLID = { type: "smoothstep", style: { stroke: "#0C2340", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#0C2340" } } as const;
const DASHED = { type: "smoothstep", style: { stroke: "#F59E0B", strokeWidth: 2, strokeDasharray: "6 4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" } } as const;
// Side trip — round-trip from a main screen and back, drawn in MyHome teal.
// Uses bezier curves so the two arrows sweep around each other naturally.
const SIDE = { type: "default", style: { stroke: "#3DBFAD", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3DBFAD" } } as const;
// Phase-to-phase transition — bezier curve so the long diagonal reads cleanly
const PHASE_LINK = { type: "default", style: { stroke: "#0C2340", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#0C2340" } } as const;

const edges: Edge[] = [
  // Phase −1A — Agent prep flow
  { id: "ea1-a2", source: "a1", target: "a2", sourceHandle: "r", targetHandle: "l", ...SOLID },
  // Trigger: agent's upload kicks off the buyer's WhatsApp invite (Phase 0)
  // Agent sits to the LEFT of phase 0 now, so the arrow goes right → left
  { id: "ea2-s1", source: "a2", target: "s1", sourceHandle: "r", targetHandle: "l", ...PHASE_LINK, label: "triggers BetterID invite" },

  // Phase −1B — Bond consultant prep flow
  { id: "eb1-b2", source: "b1", target: "b2", sourceHandle: "r", targetHandle: "l", ...SOLID },
  // Push: consultant's pre-approval surfaces on the buyer's MyHome dashboard
  { id: "eb2-s5", source: "b2", target: "s5", sourceHandle: "b", targetHandle: "t", ...PHASE_LINK, label: "pre-approval appears" },

  // Phase 0 — main path
  { id: "e1-2", source: "s1", target: "s2", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e2-3", source: "s2", target: "s3", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e3-signin", source: "s3", target: "s_signin", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "esignin-login", source: "s_signin", target: "s_login", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "elogin-5", source: "s_login", target: "s5", sourceHandle: "r", targetHandle: "l", ...SOLID },
  // Phase 0 — fallback (labelled, because they're not obvious).
  // zIndex > 0 keeps the dashed line on top of any solid edge it crosses.
  // Both fallback and happy path converge at s_signin — the buyer still has to
  // set up their passkey first time, even if they came back via WhatsApp.
  { id: "e3-4", source: "s3", target: "s4", sourceHandle: "b", targetHandle: "t", ...DASHED, label: "bounces", zIndex: 10 },
  { id: "e4-signin", source: "s4", target: "s_signin", sourceHandle: "r", targetHandle: "b-t", ...DASHED, label: "recovered", zIndex: 10 },

  // Side branch — dashboard ↔ doc vault round trip
  // Down arrow uses the bottom handle; back-up arrow uses the right-side handles so the two lines don't overlap.
  { id: "e5-vault", source: "s5", target: "s_vault", sourceHandle: "b", targetHandle: "t", ...SIDE, label: "tap upload" },
  { id: "evault-5", source: "s_vault", target: "s5", sourceHandle: "r", targetHandle: "r-t", ...SIDE, label: "done" },

  // Phase 0 → Phase 1 — bezier curve from dashboard down-left into pre-approval
  { id: "e5-6", source: "s5", target: "s6", sourceHandle: "b", targetHandle: "t", ...PHASE_LINK },

  // Phase 1 — row 0: dashboard (OTP signed) → bundle → bond app → offers → approved
  { id: "e6-bundle", source: "s6", target: "s_bundle", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "ebundle-9", source: "s_bundle", target: "s9", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e9-offers", source: "s9", target: "s_offers", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "eoffers-10", source: "s_offers", target: "s10", sourceHandle: "r", targetHandle: "l", ...SOLID },

  // Phase 1 — wrap from row 0 (bond approved) to row 1 (money waterfall), bezier
  { id: "e10-11", source: "s10", target: "s11", sourceHandle: "b", targetHandle: "t", ...PHASE_LINK },

  // Phase 1 — row 1: money waterfall → FICA → insurance → status → registered
  { id: "e11-12", source: "s11", target: "s12", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e12-13", source: "s12", target: "s13", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e13-14", source: "s13", target: "s14", sourceHandle: "r", targetHandle: "l", ...SOLID },
  { id: "e14-15", source: "s14", target: "s15", sourceHandle: "r", targetHandle: "l", ...SOLID },
];

// ─── Actor → node mapping (for the cast filter) ─────────────────────────────

type ActorKey = "buyer" | "agent" | "consultant";

const NODE_ACTOR: Record<string, ActorKey> = {
  // Buyer (phases 0, 1 + all s_ nodes)
  "phase-0": "buyer",
  "phase-1": "buyer",
  s1: "buyer",
  s2: "buyer",
  s3: "buyer",
  s_signin: "buyer",
  s_login: "buyer",
  s5: "buyer",
  s4: "buyer",
  s_vault: "buyer",
  s6: "buyer",
  s7: "buyer",
  s8: "buyer",
  s_bundle: "buyer",
  s9: "buyer",
  s_offers: "buyer",
  s10: "buyer",
  s11: "buyer",
  s12: "buyer",
  s13: "buyer",
  s14: "buyer",
  s15: "buyer",
  // Agent prep
  "phase-agent": "agent",
  a1: "agent",
  a2: "agent",
  // Bond consultant prep
  "phase-consultant": "consultant",
  b1: "consultant",
  b2: "consultant",
};

// ─── Page ──────────────────────────────────────────────────────────────────

function FlowCanvas({
  visibleNodes,
  visibleEdges,
}: {
  visibleNodes: Node[];
  visibleEdges: Edge[];
}) {
  const { fitView } = useReactFlow();
  const handleFit = useCallback(() => fitView({ padding: 0.15, duration: 400 }), [fitView]);

  // Refit whenever the visible set changes
  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.15, duration: 300 }), 50);
    return () => clearTimeout(t);
  }, [visibleNodes.length, fitView]);

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#0C2340" gap={32} size={1} style={{ opacity: 0.06 }} />
        <Controls showInteractive={false} />
      </ReactFlow>
      <button
        type="button"
        onClick={handleFit}
        className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 bg-white border border-slate-300 rounded-full shadow-md px-3 py-1.5 text-xs font-semibold text-[#0C2340] hover:bg-slate-50"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        Fit to screen
      </button>
    </div>
  );
}

const CAST: {
  initials: string;
  name: string;
  role: string;
  colour: string;
  actor?: ActorKey; // toggleable actors have an actor key; others are info only
}[] = [
  { initials: "S", name: "Sarah", role: "Estate agent · Pam Golding", colour: "bg-purple-500", actor: "agent" },
  { initials: "WR", name: "Wesley M. Roos", role: "Buyer", colour: "bg-[#0C2340]", actor: "buyer" },
  { initials: "BN", name: "Bianca Naidoo", role: "Bond consultant · BetterBond", colour: "bg-[#DD1B22]", actor: "consultant" },
  { initials: "—", name: "Seller", role: "Sells 14 Greenside Cres", colour: "bg-slate-400" },
  { initials: "—", name: "Transfer attorney", role: "TBA · appointed by seller", colour: "bg-slate-300" },
  { initials: "BS", name: "BetterSure", role: "Insurance · HOC + life cover", colour: "bg-emerald-500" },
];

export default function MortgageBuyerFlow() {
  // Which actors are currently hidden — default: none (everyone shown)
  const [hidden, setHidden] = useState<Set<ActorKey>>(new Set());

  const toggleActor = (actor: ActorKey) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(actor)) next.delete(actor);
      else next.add(actor);
      return next;
    });
  };

  const isHidden = (n: { id: string }) => {
    const actor = NODE_ACTOR[n.id];
    return actor ? hidden.has(actor) : false;
  };

  const visibleNodes = useMemo(() => nodes.filter((n) => !isHidden(n)), [hidden]);
  const visibleEdges = useMemo(
    () =>
      edges.filter((e) => {
        const srcActor = NODE_ACTOR[e.source];
        const tgtActor = NODE_ACTOR[e.target];
        return !(srcActor && hidden.has(srcActor)) && !(tgtActor && hidden.has(tgtActor));
      }),
    [hidden],
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f5fa]">
      <AppHeader label="Mortgage Buyer · User Journey · BetterID → Registered" />

      {/* Canvas */}
      <div className="relative flex-1">
        <ReactFlowProvider>
          <FlowCanvas visibleNodes={visibleNodes} visibleEdges={visibleEdges} />
        </ReactFlowProvider>

        {/* Cast panel (top-left) — who's who, click to show/hide flows */}
        <div className="absolute top-4 left-4 z-10 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 flex flex-col gap-2 w-[260px]">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#0C2340]/70">
              Cast
            </div>
            {hidden.size > 0 && (
              <button
                type="button"
                onClick={() => setHidden(new Set())}
                className="text-[10px] font-bold text-[#3DBFAD] hover:underline"
              >
                Show all
              </button>
            )}
          </div>
          <div className="text-[10px] text-slate-500 leading-snug -mt-1">
            Click an active role to show/hide their flow
          </div>
          <div className="flex flex-col gap-1.5">
            {CAST.map((p) => {
              const isToggleable = !!p.actor;
              const isOff = p.actor ? hidden.has(p.actor) : false;
              return (
                <button
                  key={p.name}
                  type="button"
                  disabled={!isToggleable}
                  onClick={() => p.actor && toggleActor(p.actor)}
                  className={`flex items-center gap-2 text-left rounded-md p-1 transition ${
                    isToggleable
                      ? "cursor-pointer hover:bg-slate-50"
                      : "cursor-default"
                  } ${isOff ? "opacity-40" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full ${p.colour} text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0`}
                  >
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-[#0C2340] leading-tight">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      {p.role}
                    </div>
                  </div>
                  {isToggleable && (
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                        isOff
                          ? "border-2 border-slate-300 bg-white text-slate-300"
                          : "bg-[#3DBFAD] text-white"
                      }`}
                    >
                      {isOff ? "" : "✓"}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating legend (top-right) */}
        <div className="absolute top-4 right-4 z-10 bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 flex flex-col gap-1.5">
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#0C2340]/60">
            Platforms
          </div>
          <div className="flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3DBFAD]" />
              <span className="text-[#0C2340] font-semibold">MyHome app</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span className="text-[#0C2340] font-semibold">WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3E84FA]" />
              <span className="text-[#0C2340] font-semibold">BetterID web</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#DD1B22]" />
              <span className="text-[#0C2340] font-semibold">BetterBond portal</span>
            </div>
          </div>
          <div className="border-t border-slate-100 mt-1 pt-1.5 flex flex-col gap-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[#0C2340]" />
              <span className="text-[#0C2340]/70">happy path</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 border-t border-dashed border-amber-500" />
              <span className="text-[#0C2340]/70">fallback</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[#3DBFAD]" />
              <span className="text-[#0C2340]/70">side trip</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
