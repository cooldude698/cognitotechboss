# 🏠 BIG BOSS COMMAND CENTER
### *Tech Boss Hackathon — Round 1 | Team Cognito*

> **"The House is in chaos. You are in control."**
> A real-time, Gen Z–powered digital control room for Big Boss — built in 45 minutes, but built like it took months.

---

## 🚨 MISSION BRIEF

**Challenge:** Build a web application that allows Big Boss to monitor and control the House in real time.
**Time Limit:** 45 minutes
**Platform:** [tech-boss.vercel.app/round-1](https://tech-boss.vercel.app/round-1)
**Design Paradigm:** Neo-Brutalist Paper & Ink Command Center Aesthetic
**Scoring:** Each verified feature = 100 pts | Early submission bonus = up to 60 pts | More features > faster submission

---

## 📚 ARCHITECTURE & SPECIFICATION SUITE

| Document | Purpose | File Link |
|---|---|---|
| **📄 PRD** | Complete Product Requirements, Acceptance Criteria, & 12 Deliverables | [PRD.md](PRD.md) |
| **🧠 BRAIN** | System Architecture, Reactive Event Bus, & 3-Person Team Breakdown | [BRAIN.md](BRAIN.md) |
| **🛠️ TECH STACK** | CDNs, Neo-Brutalist CSS Tokens, Fonts, & Audio Synthesizer | [TECH_STACK.md](TECH_STACK.md) |
| **📑 SCHEMA** | Data Contracts, JSON Schemas, Entity Types, & Action Payloads | [SCHEMA.md](SCHEMA.md) |

---

## 🗂️ TABLE OF CONTENTS

1. [Tech Stack](#-tech-stack)
2. [Architecture Overview](#-architecture-overview)
3. [Mandatory Features (12)](#-mandatory-features-12)
4. [Bonus Features](#-bonus-features)
5. [Gen Z Animations & Effects](#-gen-z-animations--effects)
6. [File Structure](#-file-structure)
7. [Component Blueprint](#-component-blueprint)
8. [Data Models](#-data-models)
9. [State Management Plan](#-state-management-plan)
10. [UI/UX Design System](#-uiux-design-system)
11. [Sound Design](#-sound-design)
12. [Team Task Split](#-team-task-split)
13. [Build Order](#-build-order)
14. [Deployment](#-deployment)

---

## 🛠️ TECH STACK

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Core** | HTML5 + Vanilla JS (ES6+) | Fast, no build step needed |
| **Styling** | Vanilla CSS (custom properties) | Full control, no bloat |
| **Animations** | CSS Keyframes + GSAP (CDN) | Silky smooth complex sequences |
| **3D Tilt** | vanilla-tilt.js (CDN) | 3D card hover effects |
| **Particles** | particles.js (CDN) | Background matrix/particle rain |
| **Sound** | Howler.js (CDN) | Cross-browser audio |
| **Charts** | Chart.js (CDN) | Stats visualizations |
| **Icons** | Font Awesome (CDN) | Icon library |
| **Font** | Google Fonts — Orbitron + Inter | Cyberpunk headings + readable body |
| **Hosting** | GitHub Pages / Vercel | Instant deploy |

> No framework. No npm. No build step. Just open `index.html` and it works.

---

## 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                    BIG BOSS COMMAND CENTER               │
│                        index.html                        │
├──────────────┬──────────────────────┬───────────────────┤
│   SIDEBAR    │     MAIN DASHBOARD   │    RIGHT PANEL    │
│              │                      │                   │
│ - Nav Links  │ - Contestant Grid    │ - Leaderboard     │
│ - Timer      │ - Active Section     │ - House Stats     │
│ - Drama-O-   │   (switches between  │ - Activity Feed   │
│   Meter      │    all sections)     │ - Danger Zone     │
│ - Vibe Check │                      │                   │
└──────────────┴──────────────────────┴───────────────────┘

                    JavaScript Modules
┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐
│  state.js   │  │  ui.js       │  │  animations.js      │
│             │  │              │  │                     │
│ Single      │  │ DOM render   │  │ GSAP sequences      │
│ source of   │  │ functions    │  │ CSS class toggles   │
│ truth for   │  │ update       │  │ Particle bursts     │
│ all data    │  │ leaderboard  │  │ Screen shake        │
└─────────────┘  └──────────────┘  └─────────────────────┘
       │                │                    │
       └────────────────┴────────────────────┘
                        │
                   sounds.js
              (Howler.js audio manager)
```

---

## ✅ MANDATORY FEATURES (12)

All 12 are **mandatory** and each is worth **100 points**.

### 1. 👥 Contestant Management
- Display **8+ contestants** in a card grid
- Each card shows: Name, Team, Points, Status (Active/Immune/Nominated/Evicted), Avatar emoji + color
- Add new contestant via modal form
- Cards support 3D tilt on hover

### 2. 🏆 Live Leaderboard
- Ranked list that **re-sorts dynamically** when points change
- Animated position swap (cards physically slide up/down)
- Gold/Silver/Bronze crown icons for top 3
- Shows rank number, name, points, status badge

### 3. 📋 Task Management
- Create tasks with a title, description, point value
- Assign task to a contestant or whole house
- Mark task as **Complete** — auto-adds points
- Tasks have: Pending / In Progress / Completed states
- Task list with filter tabs

### 4. 💰 Point System
- `+` / `-` buttons on each contestant card
- Custom point input with confirmation
- Points animate (floating `+100` / `-50` text flying up)
- Leaderboard re-ranks instantly
- History log of every point change

### 5. 👑 Captaincy
- Assign any active contestant as House Captain
- Only one captain at a time (previous loses crown)
- Captain card gets animated crown drop + golden border glow
- Airhorn sound effect plays
- Captain badge visible on leaderboard

### 6. 📌 Nominations
- Nominate any non-immune, non-evicted contestant
- Can nominate multiple contestants per round
- Nominated contestants move to **Danger Zone**
- Nomination history log
- Cannot nominate immune contestants (button disabled + tooltip)

### 7. 🛡️ Immunity
- Grant immunity to any active contestant
- Immune contestants get animated shield bubble effect
- Cannot be nominated while immune
- Immunity can be revoked by Big Boss
- Visual: golden force field around card

### 8. ⚠️ Danger Zone
- Dedicated section showing all nominated contestants
- Red pulsing border/scanline effect on danger zone cards
- Fire particle effect on nominated contestant cards
- Count of nominees shown prominently
- "Send to Eviction" button per nominee

### 9. 📢 Big Boss Announcement
- Big Boss can type and trigger a house-wide announcement
- Announcement appears with CRT TV glitch/flicker text effect
- Typing animation (letter by letter reveal)
- Full-screen overlay option for dramatic announcements
- Announcement log with timestamps

### 10. ⏱️ Task Timer
- Countdown timer: Start / Pause / Reset
- Set custom duration
- Timer turns red + screen edges flash when < 10 seconds
- Animated circular progress ring around timer
- "TIMES UP" explosion animation when it hits 0

### 11. 📊 House Statistics
- Live stat cards showing:
  - Current House Captain
  - Highest Scorer
  - Tasks Completed
  - Total Nominees
  - Longest Point Streak
  - Most Evicted Team
- Bar chart: Points distribution across all contestants
- Pie chart: Task completion breakdown

### 12. ☠️ Eviction
- Evict any nominated contestant (or force-evict anyone)
- **Thanos Snap disintegration animation** — card breaks into particles
- Evicted contestant removed from leaderboard and active grid
- Eviction Bell sound effect
- Evicted contestants shown in "Evicted Hall of Shame" section
- Screen shakes on eviction

---

## 🎁 BONUS FEATURES

These go **beyond the brief** and will separate us from everyone else.

### 🎭 Drama & Gameplay
| Feature | Description |
|---------|-------------|
| **Alliance System** | Form alliances between contestants — shown as connection lines |
| **Rivalry Tracker** | Mark rivals — adds tension visual between their cards |
| **Audience Poll** | Simulated live vote on who to evict — animated vote bars |
| **Confession Room** | Per-contestant note/quote log |
| **Secret Task** | Hidden task revealed only to selected contestant |
| **Voting History** | Full timeline of every nomination across rounds |

### 📈 Data & Intelligence
| Feature | Description |
|---------|-------------|
| **Win Probability** | Calculated % chance of winning based on pts + tasks + immunity count |
| **Activity Feed** | Live scrolling log — "Priya earned +50 pts a few seconds ago" |
| **Weekly Summary** | Auto-generated round recap card |
| **Export Data** | Download standings as CSV |

### 🔐 Admin Controls
| Feature | Description |
|---------|-------------|
| **Undo Last Action** | Reverse the last eviction/nomination/point change |
| **Reset House** | Full game reset with dramatic animation |
| **Dark/Light Mode** | Theme toggle with smooth transition |
| **Keyboard Shortcuts** | Power-user shortcuts for Big Boss |

---

## 🔥 GEN Z ANIMATIONS & EFFECTS

### Visual Effects
| Effect | Implementation |
|--------|----------------|
| **Holographic Cards** | CSS `background: linear-gradient` + `filter: hue-rotate` animation on hover |
| **Neon Glow** | `box-shadow` with multiple colored blur layers, animated pulse |
| **Glassmorphism** | `backdrop-filter: blur()` + semi-transparent backgrounds |
| **Matrix Rain BG** | Canvas element with JS falling characters |
| **3D Tilt Cards** | vanilla-tilt.js on all contestant cards |
| **Cursor Trail** | Custom cursor with CSS `::before` particle trail |
| **Particle Burst** | particles.js burst on eviction/points events |
| **Parallax** | `mousemove` listener shifting background layers |

### Animation Sequences (GSAP)
| Trigger | Animation |
|---------|-----------|
| **Eviction** | Card shatters → particles scatter → screen shakes → hall of shame entry |
| **New Captain** | Crown falls from top → golden glow expands → confetti burst → airhorn |
| **Immunity Grant** | Shield bubble expands from center → golden sparkle ring → pulse settle |
| **Nomination** | Card glitches red → shakes → horror static overlay → danger zone slide |
| **Timer End** | Screen flash white → "TIME'S UP" text explodes in → screen shake |
| **Point Change** | Floating `+/- value` flies upward → fades → leaderboard reshuffles |
| **Announcement** | Screen dims → announcement box glitches in → text types out → flash |

### Gen Z Specific Features
| Feature | Vibe |
|---------|------|
| **Vibe Check** | Daily vibe per contestant: Slay / Mid / L Bozo / NPC |
| **Rizz Rating** | Hidden stat — affects win probability calculation |
| **Sus Meter** | Mark contestants as SUS — Among Us vent sound + effect |
| **Main Character Mode** | Spotlight + glow on one contestant — they're the protagonist |
| **Slay Streak** | Fire counter for consecutive point-earning rounds |
| **Skill Issue Badge** | Auto-assigned to the lowest scorer each round |
| **W/L Board** | Tracks Wins and Losses separately per contestant |
| **Ratio Button** | Contestants ratio each other → affects morale points |
| **Drama-O-Meter** | House-wide drama level — spikes on evictions/nominations |
| **NPC Alert** | Contestants with 0 activity get greyed out NPC filter |

---

## 📁 FILE STRUCTURE

```
cognitotechboss/
│
├── index.html              # Main entry point — all sections
├── README.md               # This file
│
├── css/
│   ├── variables.css       # Design tokens (colors, fonts, spacing)
│   ├── base.css            # Reset, body, typography
│   ├── layout.css          # Grid, sidebar, panels
│   ├── components.css      # Cards, buttons, badges, modals
│   ├── animations.css      # All keyframe animations
│   ├── effects.css         # Neon glow, glassmorphism, holographic
│   └── responsive.css      # Mobile/tablet breakpoints
│
├── js/
│   ├── state.js            # Single source of truth — all game data
│   ├── contestants.js      # Contestant CRUD, card rendering
│   ├── leaderboard.js      # Leaderboard sort, render, animate
│   ├── tasks.js            # Task management logic
│   ├── points.js           # Point add/deduct + floating text
│   ├── nominations.js      # Nomination + immunity logic
│   ├── eviction.js         # Eviction + disintegration animation
│   ├── timer.js            # Countdown timer logic
│   ├── announcements.js    # Big Boss announcement system
│   ├── stats.js            # House stats + Chart.js charts
│   ├── animations.js       # GSAP animation sequences
│   ├── sounds.js           # Howler.js sound manager
│   ├── genZ.js             # Vibe check, sus meter, rizz, etc.
│   ├── effects.js          # Matrix rain, cursor trail, particles
│   └── app.js              # Init, event listeners, navigation
│
└── assets/
    └── sounds/
        ├── eviction.mp3
        ├── airhorn.mp3
        ├── vine-boom.mp3
        ├── bruh.mp3
        ├── nomination-sting.mp3
        └── timer-end.mp3
```

---

## 💾 DATA MODELS

### Contestant Object
```js
{
  id: "c_001",
  name: "Vedesh",
  team: "Alpha",
  points: 450,
  status: "active",        // "active" | "immune" | "nominated" | "evicted"
  isCaptain: false,
  avatar: "🦁",
  color: "#00f5ff",        // neon accent color
  vibeCheck: "Slay",       // "Slay" | "Mid" | "L Bozo" | "NPC"
  rizzRating: 78,
  isSus: false,
  isMainCharacter: false,
  slayStreak: 3,
  wins: 5,
  losses: 2,
  alliances: ["c_002"],
  rivals: ["c_003"],
  confessions: [],
  nominationCount: 0,
  immunityCount: 1,
  tasksCompleted: 4,
  joinedAt: Date.now()
}
```

### Task Object
```js
{
  id: "t_001",
  title: "Clean the House",
  description: "All contestants must clean their assigned areas",
  pointValue: 100,
  assignedTo: "all",       // "all" | contestant id
  status: "pending",       // "pending" | "in-progress" | "completed"
  createdAt: Date.now(),
  completedAt: null,
  completedBy: null
}
```

### Announcement Object
```js
{
  id: "a_001",
  message: "The nomination ceremony begins NOW.",
  type: "danger",          // "info" | "danger" | "warning" | "celebration"
  timestamp: Date.now(),
  isFullscreen: false
}
```

### Game State Object
```js
{
  contestants: [],
  tasks: [],
  announcements: [],
  activityFeed: [],
  currentRound: 1,
  captainId: null,
  dramaLevel: 0,            // 0-100
  timer: {
    duration: 300,
    remaining: 300,
    isRunning: false
  },
  settings: {
    theme: "dark",
    soundEnabled: true
  }
}
```

---

## 🔄 STATE MANAGEMENT PLAN

We use a **single global `state` object** — no framework needed.

```js
// state.js
const state = { ...initialGameState };

// Mutate only through functions:
function updateContestant(id, changes) { ... }
function addPoints(id, amount, reason) { ... }
function nominateContestant(id) { ... }
function evictContestant(id) { ... }

// After every mutation:
// 1. Re-render affected UI components
// 2. Log to activityFeed
// 3. Trigger relevant animation + sound
```

**Flow:**
```
User Action
  → State Mutation Function
  → Re-render UI
  → Play Animation
  → Play Sound
  → Log to Activity Feed
```

---

## 🎨 UI/UX DESIGN SYSTEM

### Color Palette
```css
--bg-primary:     #030712;   /* Near black */
--bg-secondary:   #0d1117;   /* Dark navy */
--bg-card:        #111827;   /* Card background */
--neon-blue:      #00f5ff;   /* Primary neon */
--neon-pink:      #ff00a0;   /* Accent neon */
--neon-green:     #00ff88;   /* Success/Immunity */
--neon-red:       #ff003c;   /* Danger/Nomination */
--neon-gold:      #ffd700;   /* Captain/Crown */
--neon-purple:    #bf00ff;   /* Vibe/Gen Z */
--text-primary:   #f0f6fc;
--text-muted:     #8b949e;
--glass-bg:       rgba(255,255,255,0.05);
--glass-border:   rgba(255,255,255,0.1);
```

### Typography
```css
--font-heading: 'Orbitron', monospace;   /* Cyberpunk headings */
--font-body:    'Inter', sans-serif;     /* Clean readable body */
```

### Card Style (Glassmorphism)
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
box-shadow: 0 0 20px rgba(0, 245, 255, 0.05);
```

---

## 🔊 SOUND DESIGN

| Sound File | Trigger |
|------------|---------|
| `eviction.mp3` | Contestant evicted |
| `airhorn.mp3` | New captain assigned |
| `vine-boom.mp3` | Dramatic stat reveal |
| `bruh.mp3` | Contestant hits 0 points |
| `nomination-sting.mp3` | Nomination ceremony |
| `timer-end.mp3` | Timer hits 0 |
| `shield.mp3` | Immunity granted |
| `vent.mp3` | Contestant marked Sus |

> All sounds respect the Sound Toggle in settings panel.

---

## 👥 TEAM TASK SPLIT

| Task | Priority |
|------|----------|
| HTML structure + layout skeleton | 🔴 Critical |
| CSS variables + base styles | 🔴 Critical |
| State management (state.js) | 🔴 Critical |
| Contestant cards + rendering | 🔴 Critical |
| Leaderboard logic | 🔴 Critical |
| Task management | 🔴 Critical |
| Point system + floating text | 🔴 Critical |
| Nominations + Immunity | 🔴 Critical |
| Eviction + disintegration animation | 🟠 High |
| Timer component | 🟠 High |
| Announcements system | 🟠 High |
| House Statistics + Charts | 🟠 High |
| GSAP animation sequences | 🟡 Medium |
| Gen Z features (Vibe, Sus, Rizz) | 🟡 Medium |
| Matrix rain + particle effects | 🟡 Medium |
| Sound system (Howler.js) | 🟡 Medium |
| Activity Feed | 🟡 Medium |
| Bonus features (Alliances, Poll) | 🟢 Nice to have |

---

## 🏃 BUILD ORDER

```
Phase 1 — Foundation (First 10 mins)
├── index.html skeleton (sidebar + main + right panel)
├── css/variables.css (all design tokens)
├── css/base.css + layout.css
└── js/state.js (initial state + mock data with 8 contestants)

Phase 2 — Core Features (Next 20 mins)
├── Contestant cards render
├── Leaderboard render
├── Point system
├── Nominations + Immunity
├── Eviction
├── Task management
├── Timer
├── Announcements
└── House Stats

Phase 3 — Polish & Wow Factor (Last 15 mins)
├── GSAP animations
├── Gen Z features
├── Matrix rain + particles
├── Sound system
└── Activity feed + final UI polish
```

---

## 🚀 DEPLOYMENT

### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: .
```

### Run Locally
```bash
git clone https://github.com/cooldude698/cognitotechboss.git
cd cognitotechboss
# Open index.html in browser — zero build step needed
```

---

## ⚡ CDN QUICK REFERENCE

```html
<!-- GSAP Animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- vanilla-tilt.js (3D card tilt) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>

<!-- particles.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>

<!-- Howler.js (Sound) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js"></script>

<!-- Chart.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 📝 TEAM GIT WORKFLOW

```bash
# 1. Pull latest before starting work
git pull origin main

# 2. Work on your assigned file(s) only

# 3. Commit with clear messages
git add .
git commit -m "feat: add eviction disintegration animation"

# 4. Push
git push origin main
```

> Each person works on their assigned .js or .css file only.
> Only one person edits index.html at a time to avoid conflicts.

---

## 🏁 THE GOAL

> Build the **most unhinged, most feature-complete, most visually insane** Big Boss dashboard any judge has ever seen.
>
> Every feature. Every animation. Every sound. Every Gen Z vibe.
>
> **We don't ship MVPs. We ship W's.**

---

*Built with by Team Cognito | Tech Boss Hackathon 2026*
