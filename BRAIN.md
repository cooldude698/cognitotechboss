# 🧠 BRAIN.md — SYSTEM ARCHITECTURE & EXECUTION ENGINE

> **Central Architecture Blueprint, Reactive Event Loop, and Team Delegation Plan**  
> **Team Cognito:** Vedesh (Lead/Shell/State) | Aman (Contestants/Evictions) | Prith (Tasks/Telemetry/Sandbox)

---

## 1. System Philosophy: Zero-Dependency Reactive Bus

The application does not use external node frameworks (React, Next.js, Vue) to eliminate compilation and bundle time during the 45-minute sprint. Instead, it utilizes a **Deterministic Reactive State Machine** mounted to `window.AppState` with an **Event Bus** (`window.dispatchStateChange`).

```
                ┌───────────────────────────────────────┐
                │          USER ACTION / EVENT          │
                │  (Button Click, Timer Tick, Sandbox)  │
                └───────────────────┬───────────────────┘
                                    │
                                    ▼
                ┌───────────────────────────────────────┐
                │      dispatchStateChange(type, data)  │
                └───────────────────┬───────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   STATE STORE    │      │   SOUND SYNTH    │      │   ACTIVITY LOG   │
│ (Mutates State)  │      │  (Web Audio FX)  │      │ (Appends event)  │
└────────┬─────────┘      └──────────────────┘      └──────────────────┘
         │
         ▼ CustomEvent("app:state-changed")
┌──────────────────────────────────────────────────────────────────────┐
│                        REACTIVE SUBSCRIBERS                          │
├─────────────────────┬────────────────────────┬───────────────────────┤
│  Aman's Subsystem:  │   Prith's Subsystem:   │  Vedesh's Subsystem:  │
│  • Contestant Grid  │   • Task List UI       │  • Marquee Ticker     │
│  • Leaderboard Rank │   • Countdown Display  │  • Drama Gauge Meter  │
│  • Danger Zone UI   │   • Chart.js Metrics   │  • System Status Pill │
└─────────────────────┴────────────────────────┴───────────────────────┘
```

---

## 2. Global State Schema (`window.AppState`)

```javascript
window.AppState = {
  // 1. Contestants Pool
  contestants: [
    {
      id: "c_1",
      name: "Vedesh",
      team: "Alpha",
      points: 480,
      status: "active", // "active" | "immune" | "nominated" | "evicted"
      isCaptain: true,
      avatar: "🦁",
      vibe: "Slay 💅",
      slayStreak: 4,
      isSus: false
    },
    // ... 7+ additional seeded contestants
  ],

  // 2. House Captain & Politics
  captainId: "c_1",
  nominees: ["c_4", "c_6"],
  evictedList: [],

  // 3. Task Pipeline
  tasks: [
    {
      id: "t_1",
      title: "Raid Luxury Ration Room",
      points: 100,
      assignedTo: "all", // "all" or contestant ID
      status: "pending", // "pending" | "completed"
      completedBy: null
    }
  ],

  // 4. Timer Telemetry
  timer: {
    totalDuration: 300,
    remaining: 300,
    isRunning: false,
    intervalId: null
  },

  // 5. Environmental Sensors
  dramaLevel: 62, // 0 to 100
  latestAnnouncement: "Big Boss: Nomination protocol is now strictly LIVE.",
  activityLog: [],
  settings: {
    soundMuted: false
  }
};
```

---

## 3. Subsystem Brains & Delegation Matrix

### 🅰️ Brain 1: Vedesh (Foundation, Layout Shell & Sound Engine)
- **Files Owned:**
  - `index.html` (Primary viewport scaffold, responsive 3-column layout)
  - `css/brutalist-theme.css` (Design tokens, paper grids, brutalist card & button classes)
  - `js/state.js` (Initial mock data seed, mutation utilities, state event dispatcher)
  - `js/sounds.js` (Procedural Web Audio API sound generator — eliminates missing MP3 404s)
  - `js/announcements.js` (Typewriter broadcast banner and live ticker)

- **Key Interface Provided to Teammates:**
  ```javascript
  // Dispatches any state mutation to the entire app:
  window.dispatchStateChange = function(eventType, payload) { ... };
  // Plays procedural retro audio effects:
  window.playSfx = function('beep' | 'airhorn' | 'vineboom' | 'alarm' | 'snap') { ... };
  ```

---

### 🅱️ Brain 2: Aman (Contestants, Live Leaderboard, Danger Zone & Evictions)
- **Files Owned:**
  - `css/contestants.css` (Contestant card styling, rank badges, Danger Zone container)
  - `js/contestants.js` (Renders 8+ cards, handles `+`/`-` point adjustments, Captain toggle, Immunity toggle)
  - `js/leaderboard.js` (Sorts contestants by points descending, updates position badges #1-#8)
  - `js/eviction.js` (Handles nominations, filters Danger Zone list, executes Thanos-snap eviction ceremony)

- **Business Rules Implemented:**
  1. Immune contestants cannot receive nominations (`nominateBtn.disabled = contestant.status === 'immune'`).
  2. Captain cannot be nominated.
  3. Evicted members are purged from active arrays and pushed to `AppState.evictedList`.

---

### 🅲 Brain 3: Prith (Tasks, Countdown Engine, House Telemetry & Gen-Z Sandbox)
- **Files Owned:**
  - `css/dashboard-panels.css` (Task boards, timer HUD, chart containers, sandbox trigger buttons)
  - `js/tasks.js` (Renders task list, assign dropdown, handles "Mark Done" and reward payout)
  - `js/timer.js` (1-sec interval loop, format MM:SS, `<10s` panic mode flashing red class, alarm audio trigger)
  - `js/stats.js` (Calculates live stats: MVP, tasks done, danger count; renders Chart.js bar chart)
  - `js/genZ.js` (Interactive event buttons: "Trigger Fight", "Slay Boost", "Skill Issue Penalty")

---

## 4. Conflict-Free Merge Protocol
To guarantee zero git merge conflicts during rapid pushes:
1. **Never edit another member's CSS or JS file.**
2. All communication between members occurs strictly via `window.AppState` and `window.dispatchStateChange`.
3. HTML container IDs are predetermined and frozen:
   - `#contestants-grid` (Aman)
   - `#leaderboard-list` (Aman)
   - `#danger-zone-container` (Aman)
   - `#tasks-list` (Prith)
   - `#task-timer-display` (Prith)
   - `#house-stats-panel` (Prith)
   - `#charts-canvas` (Prith)
   - `#announcement-banner` (Vedesh)
   - `#drama-meter-bar` (Vedesh)
