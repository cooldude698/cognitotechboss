# 👤 TASK ASSIGNMENT: VEDESH
### Role: Lead Architect, Layout Shell, State Store & Audio Broadcast Engine
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Vedesh  
**Time Limit:** 45 Minutes  
**Reference Architecture:** [BRAIN.md](file:///Users/cooldude69/Desktop/cognito/BRAIN.md) & [SCHEMA.md](file:///Users/cooldude69/Desktop/cognito/SCHEMA.md)

---

## 🎯 MANDATORY REQUIREMENTS OWNED (300 pts)

You own the following **3 Mandatory Requirements**:
1. ✅ **Requirement #9: Big Boss Announcement System** (Broadcast banner, typewriter text reveal, live audio broadcast)
2. ✅ **Application Shell & Container Layout** (3-column command center grid, frozen container IDs for teammates)
3. ✅ **Reactive State Machine & Audio Engine** (`window.AppState`, `dispatchStateChange`, Web Audio synthesizer)

Plus **Bonus "Wow Factor" Features**:
- 🤖 **Big Boss AI Robotic Voice Synthesizer** (Native `window.speechSynthesis` text-to-speech)
- 🔊 **Procedural Web Audio SFX Generator** (`window.playSfx`: beep, airhorn, vineboom, alarm, snap — zero 404 audio errors!)
- 🎭 **Drama-O-Meter & Marquee Ticker Tape** across the command center header
- ⚡ **1-Click "Load Demo State" Button** for instant evaluator review!

---

## 📁 FILES OWNED BY VEDESH

| File | Responsibility |
|---|---|
| `index.html` | Master HTML skeleton, 3-column layout, frozen teammate container IDs, CDN script links |
| `css/brutalist-theme.css` | Cyberpunk/Brutalist design tokens, HUD scanlines, neon glows, button classes |
| `js/state.js` | Single source of truth (`window.AppState`), `window.dispatchStateChange`, localStorage sync, demo data seeder |
| `js/sounds.js` | Procedural Web Audio API sound generator (`window.playSfx`) |
| `js/announcements.js` | Big Boss broadcast banner, typewriter text reveal, speech synthesis voice broadcaster |

---

## 🔌 FROZEN HTML TARGET CONTAINER IDs TO PROVIDE

In `index.html`, you provide these exact target IDs for Aman and Prit to mount their components:
- `#contestants-grid` — For Aman's contestant cards
- `#leaderboard-list` — For Aman's live leaderboard
- `#danger-zone-container` — For Aman's nominated cards
- `#evicted-graveyard` — For Aman's evicted hall of fame
- `#tasks-list` — For Prit's task management items
- `#task-timer-display` & `#timer-controls` — For Prit's countdown clock
- `#house-stats-panel` & `#charts-canvas` — For Prit's telemetry and Chart.js
- `#announcement-banner` & `#announcement-ticker` — For your announcement broadcasts
- `#drama-meter-bar` — For your drama gauge

---

## 🛠️ STEP-BY-STEP IMPLEMENTATION CHECKLIST

### 1. `index.html` (The Command Center Shell)
- [ ] Connect CDNs:
  - Font Awesome (`all.min.css`)
  - Google Fonts (`Orbitron`, `Inter`)
  - Chart.js (`chart.umd.min.js`)
  - GSAP (`gsap.min.js`)
- [ ] Connect teammate stylesheets:
  - `<link rel="stylesheet" href="css/brutalist-theme.css">`
  - `<link rel="stylesheet" href="css/contestants.css">`
  - `<link rel="stylesheet" href="css/dashboard-panels.css">`
- [ ] 3-Column Command Center layout:
  - **Header:** Big Boss Eye Logo, Live Ticker, Drama-O-Meter, "⚡ Load Demo State" button, Sound Mute toggle.
  - **Left Column:** Contestant Grid (`#contestants-grid`) + Add Contestant Modal.
  - **Center Column:** Live Leaderboard (`#leaderboard-list`) + Danger Zone (`#danger-zone-container`) + Evicted Archive (`#evicted-graveyard`).
  - **Right Column:** Task Pipeline (`#tasks-list`) + Countdown Timer (`#task-timer-display`) + Stats & Chart (`#charts-canvas`) + Gen-Z Sandbox.
- [ ] Script tags at bottom:
  - `state.js`, `sounds.js`, `announcements.js`, `contestants.js`, `leaderboard.js`, `eviction.js`, `tasks.js`, `timer.js`, `stats.js`, `genZ.js`.

### 2. `js/state.js` (Reactive State Bus)
- [ ] Initialize `window.AppState` following [SCHEMA.md](file:///Users/cooldude69/Desktop/cognito/SCHEMA.md):
  - Pre-seed 8+ contestants (Vedesh, Priya, Marcus, Elena, Dev, Sarah, Liam, Aisha) with valid scores.
  - Set `captainId`, `nominees`, `tasks`, `timer`, `dramaLevel`.
- [ ] Implement `window.dispatchStateChange(eventType, payload)`:
  - Updates `window.AppState` based on `eventType`.
  - Saves to `localStorage.setItem("BIG_BOSS_STATE", JSON.stringify(window.AppState))`.
  - Dispatches: `window.dispatchEvent(new CustomEvent("app:state-changed", { detail: { eventType, payload } }))`.
- [ ] Implement `loadDemoState()`:
  - Instantly populates rich demo data in 0.1s so evaluators can test immediately without typing.

### 3. `js/sounds.js` (Zero-Failure Web Audio API)
- [ ] Create procedural audio generator on `window.playSfx(type)`:
  - `"beep"`: Quick high-pitch sine wave (800Hz, 0.1s).
  - `"airhorn"`: Modulated saw-wave fanfare (new Captain).
  - `"vineboom"`: Low-frequency dramatic bass drop (55Hz with distortion).
  - `"alarm"`: Oscillating square wave siren (440Hz ➔ 880Hz).
  - `"snap"`: White noise burst with decay (Thanos snap eviction).
- [ ] Includes `window.toggleSound()` for the mute button.

### 4. `js/announcements.js` (Big Boss Voice & Broadcast)
- [ ] Input box for Big Boss decree + **"📢 Broadcast Decree"** button.
- [ ] Renders into `#announcement-banner` with glowing red border and typewriter reveal.
- [ ] **Robotic Voice Synthesizer:**
  ```javascript
  function speakBigBoss(message) {
    if (!window.speechSynthesis || window.AppState.settings.soundMuted) return;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 0.65; // Deep authoritative Big Boss tone
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
  ```

---

## 🧪 HOW TO TEST YOUR WORK
1. Open `index.html` in your browser — verify the 3-column layout, fonts, and dark brutalist styling render properly.
2. In the console, call `window.playSfx("airhorn")` — hear the procedural audio horn.
3. Broadcast an announcement — verify the banner updates, ticker scrolls, and robotic voice speaks.
4. Click the **"⚡ Load Demo State"** button — verify the entire app populates with 8 contestants, 1 captain, 2 nominees, and active tasks in 0.1 seconds.

---

## 🚀 GIT WORKFLOW FOR VEDESH
```bash
git pull origin main
# Work only on your assigned files:
# index.html, css/brutalist-theme.css, js/state.js, js/sounds.js, js/announcements.js
git add index.html css/brutalist-theme.css js/state.js js/sounds.js js/announcements.js
git commit -m "feat(vedesh): implement command center shell, state store, procedural audio and announcements"
git push origin main
```
