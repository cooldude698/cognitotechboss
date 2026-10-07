# 👤 TASK ASSIGNMENT: PRIT (PRITH)
### Role: Task Management, Countdown Engine, House Telemetry & Gen-Z Sandbox
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Prit (Prith)  
**Time Limit:** 45 Minutes  
**Reference Architecture:** [BRAIN.md](file:///Users/cooldude69/Desktop/cognito/BRAIN.md) & [SCHEMA.md](file:///Users/cooldude69/Desktop/cognito/SCHEMA.md)

---

## 🎯 MANDATORY REQUIREMENTS OWNED (400 pts)

You own the following **4 Mandatory Requirements**:
1. ✅ **Requirement #3: Task Management** (Create tasks, assign to contestant/team/all, mark Complete, auto-reward points)
2. ✅ **Requirement #4: Point System Telemetry** (Real-time delta tracking, point logs, audit updates)
3. ✅ **Requirement #10: Task Timer** (Precision countdown: Start, Pause, Reset, `<10s` panic mode, alarm audio)
4. ✅ **Requirement #11: House Statistics** (Live telemetry: Top Scorer MVP, Tasks completed, Nominees, Chart.js graphs)

Plus **Bonus "Wow Factor" Features**:
- 🎮 **Gen-Z Chaos Sandbox** (Interactive event triggers: "Trigger Drama Fight", "Slay Boost", "Skill Issue Penalty")
- 📊 **Chart.js Live Points Visualization** (Dynamic bar chart of contestant score distribution)

---

## 📁 FILES OWNED BY PRIT

| File | Responsibility |
|---|---|
| `css/dashboard-panels.css` | Task board cards, countdown timer HUD, stat card metrics, Chart.js container, sandbox panel |
| `js/tasks.js` | Renders tasks into `#tasks-list`, handles "Complete Task", auto-awards points to assignees |
| `js/timer.js` | Countdown timer mounted to `#task-timer-display`, handles Start/Pause/Reset, triggers panic mode `<10s` |
| `js/stats.js` | Computes live metrics inside `#house-stats-panel`, renders Chart.js into `#charts-canvas` |
| `js/genZ.js` | Interactive drama sandbox buttons (Fight, Slay, Ratio) for live evaluator demo excitement |

---

## 🔌 FROZEN HTML TARGET CONTAINER IDs

Your scripts render directly into these pre-allocated containers created by Vedesh in `index.html`:
- `#tasks-list` — List of all active/completed tasks
- `#task-timer-display` — Large digital countdown HUD (`MM:SS`)
- `#timer-controls` — Start, Pause, Reset, and preset duration buttons
- `#house-stats-panel` — Summary metric cards (MVP, Completed tasks, Drama level)
- `#charts-canvas` — `<canvas>` element for Chart.js points chart
- `#genz-sandbox-panel` — Interactive chaos buttons

---

## 🛠️ STEP-BY-STEP IMPLEMENTATION CHECKLIST

### 1. `js/tasks.js` (Task Pipeline)
- [ ] Read `window.AppState.tasks`.
- [ ] Render task items into `#tasks-list`:
  - Title, point bounty (+50, +100), Assigned To badge (`All` or Contestant name)
  - Status badge: `PENDING ⏳` vs `COMPLETED ✅`
  - Action button: **"Mark Done"**
- [ ] On "Mark Done":
  - Mark task status as `"completed"`.
  - Dispatch: `window.dispatchStateChange("TASK_COMPLETED", { taskId, pointReward, assignedTo })`
  - Award points automatically to assigned contestant(s).
  - Play `window.playSfx("beep")`.
- [ ] Provide quick modal/form to create a new task with custom title, point value, and assignee.

### 2. `js/timer.js` (Countdown Clock Engine)
- [ ] Read `window.AppState.timer`.
- [ ] Render formatted time (`MM:SS`) into `#task-timer-display`.
- [ ] Controls:
  - **Start:** Sets `timer.isRunning = true`, starts 1-second `setInterval`.
  - **Pause:** Clears interval, sets `timer.isRunning = false`.
  - **Reset:** Resets `timer.remaining = timer.totalDuration`.
  - **Presets:** 5 Min (`300s`), 15 Min (`900s`), 30 Min (`1800s`).
- [ ] Panic Mode: When `remaining <= 10` seconds, add CSS class `.timer-panic` (flashing red).
- [ ] When `remaining === 0`:
  - Play alarm sound: `window.playSfx("alarm")`.
  - Display "TIME'S UP" banner overlay.

### 3. `js/stats.js` (Live Telemetry & Chart.js)
- [ ] Compute and render metrics into `#house-stats-panel`:
  - 🌟 **Top Scorer (MVP):** Name + highest points
  - 🔻 **Lowest Scorer:** Name + lowest points
  - ✅ **Tasks Progress:** `X / Y completed`
  - ⚠️ **Nominees at Risk:** Current count in Danger Zone
  - 🎭 **Drama Level:** Live gauge (0–100%)
- [ ] Initialize **Chart.js** bar chart on `#charts-canvas`:
  - Labels: Active contestant names
  - Data: Current point totals
  - Auto-updates on `window.addEventListener("app:state-changed", updateChart)`.

### 4. `js/genZ.js` (Bonus: Live Chaos Sandbox)
- [ ] Provide instant click buttons inside `#genz-sandbox-panel`:
  - 🥊 **"Trigger House Fight":** Deducts 30 points from 2 rivals, spikes drama level by +20%, plays Vine Boom SFX.
  - 💅 **"Slay Boost":** Awards +50 points to the Captain.
  - 💀 **"Skill Issue Penalty":** Deducts 20 points from the lowest scorer.

---

## 🧪 HOW TO TEST YOUR WORK
1. Open `index.html` — verify pre-seeded tasks appear in `#tasks-list`.
2. Click **Mark Done** on a task — verify points automatically credit to the assigned contestant and update on the leaderboard.
3. Click **Start** on the timer — watch it count down; set to 5 seconds and verify the red panic flash and alarm trigger at 0.
4. Check `#house-stats-panel` and `#charts-canvas` — verify bars and MVP reflect actual live points.
5. Click **Trigger House Fight** in the Sandbox — verify drama level spikes and sound plays.

---

## 🚀 GIT WORKFLOW FOR PRIT
```bash
git pull origin main
# Work only on your assigned files:
# css/dashboard-panels.css, js/tasks.js, js/timer.js, js/stats.js, js/genZ.js
git add css/dashboard-panels.css js/tasks.js js/timer.js js/stats.js js/genZ.js
git commit -m "feat(prit): implement task board, countdown timer, stats telemetry and GenZ sandbox"
git push origin main
```
