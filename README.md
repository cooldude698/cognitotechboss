# 🏠 BIG BOSS COMMAND CENTER
### *Tech Boss Hackathon — Round 1 | Team Cognito*

> **"The House is in chaos. You are in control."**  
> A high-voltage, real-time command dashboard for Big Boss — built with a custom **Neo-Brutalist Paper Design System**, zero build latency, and a reactive state machine.

---

## 🚨 MISSION BRIEF & CHALLENGE STATUS

- **Challenge:** Build a web application allowing Big Boss to monitor and control the Tech House in real time.
- **Time Limit:** 45 minutes
- **Platform:** [tech-boss.vercel.app/round-1](https://tech-boss.vercel.app/round-1)
- **UI/UX Philosophy:** Custom Neo-Brutalist Paper Aesthetic (Paper Grid Canvas, Pink Highlighter Hero, Fanned Showcase Cards, Isometric Hard Drop Shadows)
- **Score Target:** **1,200 / 1,200 points** (12 Mandatory Features @ 100 pts each) + **Speed & Feature Bonus**
- **Live Local Server:** `http://localhost:3000` (run via `python -m http.server 3000`)

---

## 🏆 JUDGE EVALUATION MATRIX: ALL 12 MANDATORY FEATURES

Every requirement from the official checklist is fully implemented, reactive, and verified:

| # | Mandatory Feature | Description | Implementation File | How to Test in UI (`http://localhost:3000`) |
|---|---|---|---|---|
| **1** | **Contestant Management** | 8+ contestants with Name, Team, Points, Status, Avatar, and Vibe tag. | [js/state.js](file:///c:/Users/Vedesh/cognitotechboss/js/state.js)<br>[js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | View `#contestants-grid`. 8 seeded members across Alpha, Beta, Omega. |
| **2** | **Live Leaderboard** | Real-time ranked roster sorted dynamically in descending order by points. | [js/leaderboard.js](file:///c:/Users/Vedesh/cognitotechboss/js/leaderboard.js) | Right sidebar `#leaderboard-list`. Auto-sorts on any point change; #1 gets crown and lime card. |
| **3** | **Task Management** | Assign tasks to contestants or whole house; mark complete to award points. | [js/tasks.js](file:///c:/Users/Vedesh/cognitotechboss/js/tasks.js) | Tab **Tasks Pipeline** (`#tasks-list`). Click "Complete" to award bounty points. |
| **4** | **Point System** | Fast-action add and deduct score buttons per contestant. | [js/state.js](file:///c:/Users/Vedesh/cognitotechboss/js/state.js)<br>[js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | Click `+50` or `-25` on any card. Watch floating numbers pop up and leaderboard re-sort. |
| **5** | **Captaincy** | Assign or change House Captain. Captain gets crown, default immunity, and airhorn fanfare. | [js/state.js](file:///c:/Users/Vedesh/cognitotechboss/js/state.js)<br>[js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | Click `👑` crown button on any card. Confetti blasts, airhorn plays, and status sets to Captain. |
| **6** | **Nominations** | Nominate active non-immune contestants for eviction. Nominees show pulsing hazard border. | [js/state.js](file:///c:/Users/Vedesh/cognitotechboss/js/state.js)<br>[js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | Click `⚠️` button on any contestant card. Contestant moves immediately into Danger Zone. |
| **7** | **Immunity** | Grant immunity shield; immune contestants cannot be nominated by any action. | [js/state.js](file:///c:/Users/Vedesh/cognitotechboss/js/state.js)<br>[js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | Click `🛡️` button. When immune, the nominate button is strictly disabled and locked. |
| **8** | **Danger Zone** | Dedicated hazard tray displaying all nominated contestants awaiting verdict. | [js/contestants.js](file:///c:/Users/Vedesh/cognitotechboss/js/contestants.js) | Open **Danger Zone** tab (`#danger-zone-container`). Shows nominee counter and action cards. |
| **9** | **Big Boss Announcement** | Broadcast decrees across top ticker, banner, and native AI robotic voice synthesizer. | [js/announcements.js](file:///c:/Users/Vedesh/cognitotechboss/js/announcements.js) | Type into decree input and click "BROADCAST DECREE". Hear the robotic voice speak aloud. |
| **10** | **Task Timer** | Countdown timer: Start, Pause, Reset, 5m/15m/30m presets, SVG progress ring, <10s panic flashing. | [js/timer.js](file:///c:/Users/Vedesh/cognitotechboss/js/timer.js) | Right sidebar `#task-timer-display`. Click Start/Pause/Reset. Test panic mode when `< 10s`. |
| **11** | **House Statistics** | Live telemetry: Captain, Top Scorer MVP, Tasks Done, Nominee Count, and Chart.js points bar chart. | [js/stats.js](file:///c:/Users/Vedesh/cognitotechboss/js/stats.js) | Right sidebar `#house-stats-panel` and canvas `#charts-canvas`. Auto-updates with state. |
| **12** | **Eviction** | Permanently evict contestants; Thanos snap disintegration animation, screen shake, moved to Hall of Shame. | [js/eviction.js](file:///c:/Users/Vedesh/cognitotechboss/js/eviction.js)<br>[css/animations.css](file:///c:/Users/Vedesh/cognitotechboss/css/animations.css) | In Danger Zone, click "EVICT NOW". Card disintegrates into dust, screen shakes, moved to Hall of Shame. |

---

## 🎁 BONUS "WOW FACTOR" FEATURES

1. **⚡ 1-Click "LOAD DEMO STATE" Button:** Populates rich demo data in 0.1s so evaluators can inspect every feature instantly.
2. **🔊 Procedural Web Audio API Sound Engine:** Zero external audio files (no 404s). Procedurally synthesizes airhorns, vine booms, sirens, buzzers, and snaps.
3. **🤖 Native AI Robotic Voice Synthesizer:** Big Boss speaks decrees aloud with deep authoritative pitch using `window.speechSynthesis`.
4. **📹 4-Channel CCTV Surveillance Grid:** Multi-cam view (*Coding Den, Luxury Pantry, Confession Room, Danger Cell*) with live timecodes and CRT scanlines.
5. **🧪 Interactive Drama Sandbox:** 1-Click simulated events (*Trigger Drama Spike, Slay Streak Boost, Skill Issue Penalty*) for instant game master interventions.
6. **💥 Thanos Snap & Screen Shake VFX:** Procedural CSS disintegration keyframes and earthquake screen shake on evictions.
7. **💾 LocalStorage State Persistence:** Page refresh retains all scores, nominations, and captaincy.
8. **🔐 Role-Based Access Control (RBAC Engine):** 3 distinct operational roles:
   - **👑 Big Boss (Super-Admin):** Full master authority (Evictions, Decrees, Captaincy, Point Overrides, Master Reset).
   - **🎬 Show Producer (Director):** Operational controls (Task Management, Countdown Timer, Nominations, Points).
   - **👁️ Audience / Spectator (Viewer):** Read-only telemetry with interactive live Fan Voting (`❤️ +10 pts`).
9. **🚨 Live Event Notifications & Toast HUD:** Real-time event notifications with auto-dismiss progress countdown, category filters (`Urgent`, `Decrees`, `Tasks`), interactive top-nav Bell tray (`🔔`), audio synchronization, and Web Desktop Push Notifications API.

---

## 🎨 NEO-BRUTALIST PAPER DESIGN SYSTEM

The visual aesthetic features a high-energy tactile papercraft design:

- **Notebook Paper Grid Background:** `#FBF9F4` paper canvas with light 32px ink grid lines.
- **Ink & Geometry:** Thick `2px solid #121214` borders on all cards, buttons, badges, and modals.
- **Isometric Hard Drop Shadows:** `4px 4px 0px #121214` and `6px 6px 0px #121214` with zero blur.
- **Iconic Pink Highlighter Box:** `<span class="highlight-pink">command copilot.</span>` with `#FF5C98` fill, 2px border, and `-1.5deg` tilt.
- **Tilted Sticky Notes:** Rotated yellow (`#FEE159`), pink (`#FF5C98`), and lime (`#D4F77C`) tags with `-3deg` and `2.5deg` rotation.
- **5-Card Horizontal Fan-Out Showcase:** Fanned cards illustrating captaincy, heuristics rules, live care loop, AI brief, and audience circle.
- **Highlighter Color Palette:**
  - ⚡ **Electric Lime:** `#D4F77C` (Active, #1 Leaderboard, Primary CTAs)
  - 💛 **Canary Yellow:** `#FEE159` (Captaincy, Warnings, Points Boost)
  - 💖 **Pop Bubblegum Pink:** `#FF5C98` (Drama triggers, Gen-Z Tags)
  - 💜 **Soft Lavender:** `#EDE9FE` (System tags, Round pills)
  - 🔴 **Hazard Red:** `#FEE2E2` / `#DC2626` (Danger Zone, Evictions)

---

## 📚 ARCHITECTURE & SPECIFICATION SUITE

| Document | Purpose | File Link |
|---|---|---|
| **📄 PRD** | Complete Product Requirements Document & Acceptance Criteria | [PRD.md](file:///c:/Users/Vedesh/cognitotechboss/PRD.md) |
| **🧠 BRAIN** | System Architecture, Reactive Event Bus, & 3-Person Team Split | [BRAIN.md](file:///c:/Users/Vedesh/cognitotechboss/BRAIN.md) |
| **🛠️ TECH STACK** | CDNs, Neo-Brutalist CSS Tokens, & Audio Synthesizer | [TECH_STACK.md](file:///c:/Users/Vedesh/cognitotechboss/TECH_STACK.md) |
| **📑 SCHEMA** | Data Contracts, JSON Schemas, Entity Types, & Action Payloads | [SCHEMA.md](file:///c:/Users/Vedesh/cognitotechboss/SCHEMA.md) |
| **👤 VEDESH** | Lead Architect, Layout Shell, State Store, Audio & Evictions | [vedesh.md](file:///c:/Users/Vedesh/cognitotechboss/vedesh.md) |
| **👤 AMAN** | Contestant Management, Live Leaderboard, Nominations & Immunity | [aman.md](file:///c:/Users/Vedesh/cognitotechboss/aman.md) |
| **👤 PRITH** | Task System, Countdown Timer, Live Stats & Chaos Sandbox | [prit.md](file:///c:/Users/Vedesh/cognitotechboss/prit.md) |

---

## ⚡ QUICK START / HOW TO RUN LOCALLY

No Node build step required. The app runs via static HTTP server or direct file opening:

```bash
# 1. Clone repository
git clone https://github.com/cooldude698/cognitotechboss.git
cd cognitotechboss

# 2. Start local server
python -m http.server 3000

# 3. Open in browser
# http://localhost:3000
```

---

## 📁 REPOSITORY STRUCTURE

```
cognitotechboss/
│
├── index.html                  # Master Command Center HTML (Hero, Sandbox, 3-Column Deck)
├── README.md                   # Project hub & evaluation audit
├── PRD.md                      # Product Requirements Document
├── BRAIN.md                    # System architecture & reactive event loop
├── TECH_STACK.md               # Technology specifications & CSS design tokens
├── SCHEMA.md                   # Data models & mutation contracts
├── vedesh.md                   # Task assignment for Vedesh
├── aman.md                     # Task assignment for Aman
├── prit.md                     # Task assignment for Prith
│
├── css/
│   ├── brutalist-theme.css     # Neo-Brutalist design tokens, paper grid & buttons
│   ├── layout.css              # 3-column HUD command grid, CCTV feeds, responsive rules
│   ├── animations.css          # Thanos snap, screen shake, floating points, CRT glitch
│   ├── contestants.css         # Contestant cards, live leaderboard, Danger Zone styles
│   └── dashboard-panels.css    # Tasks list, timer HUD, telemetry stat boxes
│
└── js/
    ├── state.js                # Central Reactive State Store (window.AppState, dispatchStateChange)
    ├── sounds.js               # Web Audio API procedural sound synthesizer (window.playSfx)
    ├── effects.js              # Matrix rain, screen shake, floating points, CCTV timecodes
    ├── announcements.js        # Unhinged Gen-Z meme broadcaster, 4 voice personas, 12 viral slogans & random roast engine
    ├── timer.js                # Task countdown clock, circular SVG ring, panic mode
    ├── eviction.js             # Eviction ceremony, Thanos snap particle disintegration
    ├── contestants.js          # Contestant cards renderer, points buttons, immunity locks
    ├── leaderboard.js          # Dynamic live leaderboard sorting & rank badges
    ├── tasks.js                # Task CRUD, assignment dropdown, mark done & bounty payouts
    ├── stats.js                # Live house metrics & Chart.js points bar chart
    ├── genZ.js                 # Interactive triage sandbox & live drama simulator
    ├── activityLog.js          # Real-time activity log & audit stream, filtering, search & JSON export
    ├── rbac.js                 # Role-Based Access Control engine (Big Boss, Producer, Spectator & live fan voting)
    ├── notifications.js        # Live event notification engine, HUD toasts, bell tray & desktop push
    └── app.js                  # Master app initializer, tab navigation, global listeners
```

---

## 👥 TEAM COGNITO

- **Vedesh:** Lead Architect, Command Center Layout Shell, State Store, Audio Broadcast Engine & Eviction Lifecycle.
- **Aman:** Contestant Management System, Live Dynamic Leaderboard, Nominations & Immunity Hard-Locks.
- **Prith:** Task Pipeline, Countdown Timer with Panic Mode, House Telemetry & Gen-Z Drama Sandbox.

---

*Built with ⚡ by Team Cognito | Tech Boss Hackathon 2026*
