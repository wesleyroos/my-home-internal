# MyHome Property Report — Design Brainstorm

## Context
- Target: South African homeowners, avg age 37, 55% female, avg property value R1.4–1.6m
- Goal: Hook users into the MyHome platform by showing compelling data about their biggest asset
- Must feel trustworthy, modern, and genuinely useful — not overwhelming
- Sections: Property value + trend, surrounding sales, active listings, satellite/street view

---

<response>
## Idea 1: "Editorial Finance" — Bloomberg meets Architectural Digest

<text>
**Design Movement:** Editorial / Data Journalism — inspired by Bloomberg, The Economist, and high-end financial publications that make data feel like storytelling.

**Core Principles:**
1. Data as narrative — every number tells a story, not just a stat
2. Typographic hierarchy drives the eye — large statement numbers, supporting context
3. Restrained elegance — trust through whitespace and precision, not flashiness
4. Progressive disclosure — summary first, detail on demand

**Color Philosophy:** A warm neutral base (off-white / warm grey) with a single confident accent — deep teal (#0D7377) — that signals growth, stability, and financial health. Red (#D94F4F) only for negative changes. Gold (#C9A84C) for premium highlights. The palette avoids cold corporate blue to feel approachable for a 37-year-old homeowner.

**Layout Paradigm:** Vertical scroll with a "newspaper fold" structure — a bold hero card at the top showing the property value as a headline, then content flows in an asymmetric two-column layout. Left column is wider (data/charts), right column is narrower (contextual insights, tips). Sections are separated by subtle horizontal rules, not cards-in-cards.

**Signature Elements:**
1. "Big number" typography — property value displayed in a large serif font with a trend arrow, like a stock ticker
2. Inline sparklines next to every metric — tiny trend lines embedded in text
3. Subtle dot-grid background texture on key sections

**Interaction Philosophy:** Hover reveals deeper context (tooltips with sale details). Scroll-triggered animations that feel like turning pages. Click to expand sale cards for full detail.

**Animation:** Smooth counter animations on numbers (count up to value). Fade-in-up on scroll for each section. Chart lines draw themselves on viewport entry. Subtle parallax on the hero satellite image.

**Typography System:** Display: DM Serif Display (elegant, trustworthy serif). Body: DM Sans (clean geometric sans that pairs perfectly). Monospace numbers: Tabular figures from DM Sans for aligned data columns.
</text>
<probability>0.07</probability>
</response>

---

<response>
## Idea 2: "Warm Modernist" — Airbnb meets Property Dashboard

<text>
**Design Movement:** Warm Modernism / Scandinavian Digital — soft, rounded, human-centered design that makes financial data feel approachable and even enjoyable. Think Airbnb's clarity meets a wellness app's warmth.

**Core Principles:**
1. Approachability over authority — data should feel like a friend explaining your finances
2. Soft geometry — rounded corners, organic shapes, gentle gradients
3. Celebration of the home — the property is the hero, not the data
4. Emotional anchoring — use color and micro-interactions to make positive trends feel rewarding

**Color Philosophy:** Warm sand base (#FAF7F2) with a rich terracotta accent (#C45D3E) that feels distinctly South African — earthy, warm, optimistic. Secondary accent of sage green (#7B9E6B) for positive growth indicators. Charcoal (#2D2D2D) for text. The palette is deliberately warm to counter the cold, clinical feel of most property reports.

**Layout Paradigm:** Card-based mosaic with varying card sizes — a large hero card for the property, medium cards for value trends and area stats, smaller cards for individual sales. Cards have generous padding and soft shadows. The layout uses a staggered grid that feels curated, not mechanical.

**Signature Elements:**
1. Illustrated map pin with a tiny house icon as the brand motif
2. Gradient "glow" behind the property value card — warm amber to terracotta
3. Circular progress rings for comparative metrics (your property vs area average)

**Interaction Philosophy:** Cards have a gentle lift on hover (translateY + shadow increase). Tapping a sale card flips to reveal details. The value chart responds to touch/hover with a crosshair showing exact values. Everything feels tactile and responsive.

**Animation:** Spring-based animations (framer-motion springs) for card entrances. Value counter with easing. Chart area fills with a smooth wipe. Sale pins drop onto the map one by one.

**Typography System:** Display: Plus Jakarta Sans (bold weight — modern, friendly, slightly rounded). Body: Plus Jakarta Sans (regular — excellent readability). The single-family approach keeps things clean and approachable.
</text>
<probability>0.06</probability>
</response>

---

<response>
## Idea 3: "Crisp Intelligence" — Apple Health meets Fintech

<text>
**Design Movement:** Neo-Brutalist Fintech — the precision of Apple Health's data presentation combined with the bold confidence of modern fintech apps like Revolut or Wise. Clean, bold, unapologetic about being data-rich.

**Core Principles:**
1. Clarity is king — every pixel earns its place
2. Bold contrasts — dark sections against light, large type against small
3. The property is a financial instrument — treat it with the same seriousness as a stock portfolio
4. Mobile-first density — pack information without clutter

**Color Philosophy:** Pure white (#FFFFFF) base with a deep navy (#1A1F36) for headers and key sections. Electric green (#00D26A) for positive growth (unmistakable "your money is growing" signal). Coral red (#FF6B6B) for declines. A single accent of electric blue (#4C6FFF) for interactive elements. High contrast, high confidence.

**Layout Paradigm:** Full-width sections that alternate between white and navy backgrounds, creating a strong visual rhythm. Within sections, a strict 12-column grid with generous gutters. The hero is a full-bleed satellite image with a frosted-glass overlay showing the property value. Data sections use a "dashboard strip" pattern — horizontal scrollable cards within vertical sections.

**Signature Elements:**
1. Frosted glass (backdrop-blur) overlays on the satellite image
2. Pill-shaped metric badges with colored backgrounds (green for up, red for down)
3. Bold section dividers with diagonal cuts (CSS clip-path)

**Interaction Philosophy:** Snappy, immediate feedback. Hover states are instant (no transition delay). Horizontal scroll for sale cards feels native. The chart has a scrubber that follows the cursor. Everything feels fast and precise.

**Animation:** Staggered fade-in for metric cards (50ms delay between each). Number counters with a slight overshoot spring. Chart lines animate with a drawing effect. Section transitions use a subtle slide-up.

**Typography System:** Display: Space Grotesk (bold — geometric, modern, slightly techy). Body: Space Grotesk (regular — maintains the systematic feel). Monospace: JetBrains Mono for financial figures (signals precision).
</text>
<probability>0.05</probability>
</response>

---

## Decision

**Selected: Idea 1 — "Editorial Finance"**

This approach best serves the MyHome platform's goals because:
1. It treats the homeowner's property as a serious financial asset — which it is
2. The editorial/data journalism style makes complex data feel like a compelling story
3. The warm neutral palette with teal accents feels trustworthy without being corporate
4. The "big number" approach immediately communicates value — the first thing a homeowner wants to see
5. Progressive disclosure means the average homeowner isn't overwhelmed, but curious users can dig deeper
6. The serif + sans pairing feels premium and differentiated from typical property portals
