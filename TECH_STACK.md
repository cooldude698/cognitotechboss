# 🛠️ TECH_STACK.md — TECHNOLOGY SPECIFICATION

> **Detailed Tech Stack, CDN Imports, CSS Tokens, and Browser Specifications**  
> **Target:** High-Performance, Zero-Build Neo-Brutalist Web Application

---

## 1. Core Runtime & Architecture

| Layer | Selection | Technical Reason |
|---|---|---|
| **Core Architecture** | Native Vanilla JavaScript (ES6 Modules) | Zero build time, instant reload, no node packaging overhead. |
| **Styling Paradigm** | Pure Vanilla CSS (CSS3 Custom Properties) | Maximum control, zero CSS purging/bundling issues, exact Neo-Brutalist pixel fidelity. |
| **Audio Engine** | Procedural Web Audio API (Native `AudioContext`) | Synthesizes sounds in-browser directly. Never fails due to missing MP3 files or CDN blocks. |
| **Graphics & Charts** | Chart.js 4.4.x (via CDN) | Lightweight, performant canvas-rendered bar and doughnut charts for live house statistics. |
| **Typography** | Google Fonts (`Syne` / `Fraunces` + `JetBrains Mono` + `DM Sans`) | Editorial-headline & technical-mono character. |
| **Iconography** | Font Awesome 6.5.x CDN | Full coverage for crowns, skulls, timers, shields, and indicators. |
| **Hosting Platform** | Vercel / GitHub Pages | Instant production deployment from the `main` branch. |

---

## 2. External CDN Dependencies

Place the following CDN script tags inside `index.html`:

```html
<!-- Google Fonts: Syne (Headings), JetBrains Mono (Badges/Data), DM Sans (Body) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;600;800&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">

<!-- Font Awesome Free 6.5.1 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- Chart.js 4.4.1 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- Canvas Confetti (Celebration / Captaincy / Eviction FX) -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
```

---

## 3. Neo-Brutalist Design Tokens (`css/brutalist-theme.css`)

```css
:root {
  /* Paper & Ink Foundations */
  --bg-paper: #FBF9F4;
  --bg-paper-alt: #FAF8F5;
  --ink-900: #121214;
  --ink-700: #2a2a2e;
  --ink-500: #57575e;
  --ink-300: #a1a1aa;
  
  /* Highlighter Accent Palettes */
  --accent-lime: #D4F77C;       /* Primary CTA, #1 Leaderboard, Active */
  --accent-yellow: #FEE159;     /* Captaincy, Warnings, Points Boost */
  --accent-pink: #FF5C98;       /* Drama, Gen Z Badges, Hot Topics */
  --accent-lavender: #EDE9FE;   /* Neutral Tags, Round Indicators */
  --accent-danger: #FEE2E2;     /* Danger Zone, Evictions, Panics */
  --accent-danger-ink: #DC2626;

  /* Brutalist Geometric Shadow Tokens */
  --border-thick: 2px solid var(--ink-900);
  --border-heavy: 3px solid var(--ink-900);
  --shadow-sm: 2px 2px 0px var(--ink-900);
  --shadow-md: 4px 4px 0px var(--ink-900);
  --shadow-lg: 6px 6px 0px var(--ink-900);
  --shadow-hover: 5px 5px 0px var(--ink-900);
  --shadow-active: 1px 1px 0px var(--ink-900);

  /* Radius Tokens */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-pill: 9999px;

  /* Typography Stacks */
  --font-serif: 'Syne', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'DM Sans', -apple-system, sans-serif;
}
```

---

## 4. Reusable Brutalist Utility Classes

```css
/* Card Base */
.brutalist-card {
  background: #ffffff;
  border: var(--border-thick);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all 0.15s ease-in-out;
}

/* Button Base */
.btn-brutalist {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 8px 16px;
  border: var(--border-thick);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
  background: var(--bg-paper);
  color: var(--ink-900);
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.btn-brutalist:hover {
  transform: translate(-1px, -1px);
  box-shadow: var(--shadow-hover);
}

.btn-brutalist:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-active);
}

/* Tilted Sticky Tag */
.sticky-tag {
  display: inline-block;
  padding: 4px 12px;
  border: var(--border-thick);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 800;
  box-shadow: var(--shadow-sm);
}
.sticky-tag.rotate-left { transform: rotate(-2deg); }
.sticky-tag.rotate-right { transform: rotate(2deg); }
```
