# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Project: Big Boss Command Center (Tech Boss — Round 1)
**Team:** Cognito (Vedesh, Aman, Prith)  
**Target:** [tech-boss.vercel.app/round-1](https://tech-boss.vercel.app/round-1)  
**Time Limit:** 45 Minutes  
**Design Paradigm:** Custom Neo-Brutalist / Editorial Papercraft Command Center

---

## 1. Executive Summary & Vision
The Big Boss House is descending into chaos. Big Boss requires an unyielding, real-time command dashboard to control, monitor, nominate, reward, punish, and evict house contestants during live operations.

Rather than a generic corporate dashboard or dark dashboard, this platform adopts a **high-energy Neo-Brutalist aesthetic**: warm paper backgrounds (`#FBF9F4`), 2px bold ink borders (`#121214`), hard isometric drop shadows (`4px 4px 0px #121214`), high-contrast highlighter tags (Lime `#D4F77C`, Yellow `#FEE159`, Pink `#FF5C98`, Lavender `#EDE9FE`), retro sticky tags, and interactive drama sandbox triggers.

---

## 2. Core Personas & Roles
- **Big Boss (Administrator / Showrunner):** Commands the house, triggers emergency announcements, controls countdown timers, assigns house captains, resolves ties, and performs evictions.
- **Audience / Evaluators:** Monitors live house telemetry, leaderboard shifts, drama metrics, task completion rates, and nominees in the Danger Zone.

---

## 3. Mandatory Requirements Matrix (12 Deliverables — 100 Pts Each)

| ID | Feature | Functional Specification | Acceptance Criteria |
|---|---|---|---|
| **FR-01** | **Contestant Management** | Support 8+ default seeded contestants with: ID, Name, Team, Points, Status (`active`, `immune`, `nominated`, `evicted`), Avatar, and Vibe tag. Add contestant modal available. | ≥ 8 distinct contestants displayed with full details and team categorization. |
| **FR-02** | **Live Leaderboard** | Real-time ranked roster sorted dynamically in descending order by points. Rank 1 receives House MVP styling & golden crown. | Instant auto-resort when points change; smooth visual ranking shifts. |
| **FR-03** | **Task Management** | Create, assign (to individual or "All"), and complete house tasks with assigned point bounties. | Tasks transition `pending` → `completed`, auto-crediting bounty to the assignee. |
| **FR-04** | **Point System** | Fast-action increment and decrement controls (`+10`, `+50`, `-25`, or custom) per contestant card. | Real-time score balance update with floating numerical feedback indicators. |
| **FR-05** | **House Captaincy** | Designate 1 contestant as House Captain. Captain badge, crown icon, and default immunity granted. | Only one active captain at any given time; changing captain transfers badge. |
| **FR-06** | **Nominations** | Select non-immune, active contestants to be put up for eviction. Nominated contestants show warning status. | Nominees flagged and moved into the Danger Zone. Immune contestants blocked. |
| **FR-07** | **Immunity Shield** | Grant or revoke immunity for any contestant. Immune contestants cannot be nominated by any action. | Nomination action fails / is disabled with clear warning badge for immune members. |
| **FR-08** | **Danger Zone** | Dedicated hazard holding area displaying all nominated contestants awaiting audience vote or eviction. | Dedicated red-tinted Neo-Brutalist container displaying nominee count & cards. |
| **FR-09** | **Big Boss Announcements** | Real-time alert broadcast system with high-priority ticker tape and typewriter banner overlay. | Input custom broadcast message; instantly rendered across house top banner. |
| **FR-10** | **Task Countdown Timer** | Digital countdown timer with Start, Pause, Reset, and custom minute duration buttons. | Visual countdown with audio alarm and red panic flash when `< 10s`. |
| **FR-11** | **House Live Statistics** | Real-time telemetry: Current Captain, Top Scorer, Total Tasks Completed, Nominee Count, and Chart.js point distribution. | Minimum 4 live metric boxes + dynamic graphical charts. |
| **FR-12** | **Eviction Ceremony** | Execute permanent eviction of nominated contestant. Evicted contestant stripped of points and removed from active board. | Disintegration / snap exit animation; removed from leaderboard to Hall of Shame. |

---

## 4. UI/UX Specifications (Neo-Brutalist Design Language)
- **Palette Tokens:**
  - Base Paper: `#FBF9F4` / `#FAF8F5`
  - Deep Ink: `#121214`
  - Accent Lime: `#D4F77C`
  - Accent Yellow: `#FEE159`
  - Accent Pop Pink: `#FF5C98`
  - Lavender Tag: `#EDE9FE`
  - Hazard Red: `#FEE2E2` / `#DC2626`
- **Brutalist Tactility:**
  - `border: 2px solid #121214;`
  - `box-shadow: 4px 4px 0px #121214;`
  - Interactive state: Hover translates `-2px, -2px` with expanded shadow `6px 6px 0px #121214`; Active translates `2px, 2px` with shadow `1px 1px 0px #121214`.
- **Rotated Sticky Badges:**
  - Badges rendered with `-2deg` or `3deg` slight tilt for editorial character.

---

## 5. Non-Functional Requirements
- **Zero Build Step:** Native browser ES6 modules + CSS. Works instantly via static server or double-click.
- **Latency & Performance:** DOM updates occur sub-16ms; Chart.js canvas repaints seamlessly.
- **Fault-Tolerance:** Audio system leverages Web Audio API synthesizers so it does not fail if external audio assets are blocked or offline.
- **Responsive Breakpoints:** Fully usable on desktop monitors (1280px+ 3-column), tablets (2-column), and mobile (single column stack).
