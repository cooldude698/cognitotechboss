# 👤 TASK ASSIGNMENT: VEDESH
### Role: Big Boss Control Room, Eviction Engine, Timer & VFX/Audio Experience
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Vedesh  
**Time Limit:** 45 Minutes  

---

## 🎯 MANDATORY REQUIREMENTS OWNED (300 pts)

You are the owner of the following **3 Mandatory Requirements**:
1. ✅ **Requirement #9: Big Boss Announcement** (Trigger/display broadcast banner & feed, CRT glitch/typewriter effect)
2. ✅ **Requirement #10: Task Timer** (Precision countdown timer: Start, Pause, Reset, preset times, alarm siren)
3. ✅ **Requirement #12: Eviction** (Evict contestants, purge from active house & leaderboard, move to "Hall of Shame")

Plus **Bonus "Wow Factor" Features**:
- 🤖 **Big Boss Robotic AI Voice** (Native `window.speechSynthesis` text-to-speech)
- 🔊 **Web Audio Procedural Sound Engine** (Airhorn, Eviction Gavel, Danger Siren, Timer Buzzer)
- 📹 **CCTV Multi-Cam Surveillance Grid** (4-channel retro CRT camera switcher)
- 💥 **Thanos Snap Particle Disintegration & Screen Shake** on eviction!

---

## 📁 FILES ASSIGNED TO VEDESH

| File | Responsibility |
|---|---|
| `index.html` | Master HTML skeleton, 3-column command center layout, CDN library links |
| `js/announcements.js` | Big Boss announcement broadcaster, ticker marquee, robotic voice synthesizer |
| `js/timer.js` | Countdown clock logic, circular SVG progress ring, audio warning on zero |
| `js/eviction.js` | Eviction execution, removal from active roster, "Evicted Hall of Shame" section |
| `js/sounds.js` | Web Audio API procedural sound engine (zero external file failures) |
| `js/effects.js` | Matrix rain background canvas, screen shake, particle bursts, CRT scanlines |
| `js/app.js` | Master init, event listener attachments, tab navigation |
| `css/layout.css` | Command Center HUD grid, 3-column layout, responsive panels |
| `css/animations.css` | Glitch text, pulsing danger borders, crown drops, Thanos snap keyframes |

---

## 🛠️ DETAILED IMPLEMENTATION CHECKLIST

### 1. `index.html` (The Master Shell)
- [ ] Connect all CDNs in `<head>`:
  - Font Awesome 6.4.0
  - Orbitron & Inter Google Fonts
  - GSAP (`gsap.min.js`)
  - Chart.js (`chart.umd.min.js`)
  - vanilla-tilt.js (`vanilla-tilt.min.js`)
- [ ] 3-Column Command Center layout:
  - **Left Sidebar:** Big Boss Logo, Navigation tabs (Dashboard, Contestants, Tasks, Danger Zone, CCTV, Evicted), Quick Stats.
  - **Center Panel:** Active view (Contestant Grid / Danger Zone / Tasks / CCTV).
  - **Right Panel:** Live Leaderboard + Countdown Timer + Announcement Feed + Activity Log.

### 2. `js/announcements.js` (Big Boss Voice & Broadcast)
- [ ] Big Boss announcement input box with a glowing **"📢 Broadcast Decree"** button.
- [ ] Displays animated banner overlay + ticker tape across the top of the HUD.
- [ ] **AI Robotic Voice:**
  ```js
  function speakBigBoss(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.7; // Deep authoritative tone
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
  ```
- [ ] Archives past announcements in the Announcement Log.

### 3. `js/timer.js` (Countdown Clock Engine)
- [ ] State: `duration`, `remaining`, `isRunning`, `intervalId`.
- [ ] Controls: **Start**, **Pause**, **Reset**.
- [ ] Quick duration presets: `5 Mins`, `15 Mins`, `30 Mins`.
- [ ] Visual: Large digital display (`MM:SS`) + circular SVG ring.
- [ ] Flash screen red and play warning alarm when timer reaches `00:00`.

### 4. `js/eviction.js` (Eviction Lifecycle)
- [ ] `evictContestant(id)`:
  - Confirms action via Big Boss confirmation dialog (*"Are you sure you want to evict X?"*).
  - Triggers **Thanos snap disintegration animation** (card dissolves into particles) + screen shake.
  - Plays Eviction Gavel sound.
  - Triggers robotic voice: *"Bigg Boss announces: [Name] has been evicted from the Tech House."*
  - Updates contestant status to `"evicted"`.
  - Removes them from active leaderboard.
  - Adds them to the **"☠️ Evicted Hall of Shame"** archive section with departure timestamp.

### 5. `js/sounds.js` & `js/effects.js` (Sound & VFX)
- [ ] Procedural sound generation via `AudioContext`:
  - `playAlarm()` (oscillating siren for nominations/danger)
  - `playGavel()` (deep thud for evictions)
  - `playAirhorn()` (fanfare for new Captain)
  - `playBuzzer()` (timer end)
- [ ] Canvas Matrix Rain effect running subtly in the background.
- [ ] 📹 **Simulated CCTV Grid:** 4-quadrant security camera viewer (*CAM 1: Coding Den, CAM 2: Pantry, CAM 3: Confession Room, CAM 4: Danger Cell*) with blinking `● REC` indicator.

---

## 🧪 HOW TO TEST YOUR WORK
1. Enter an announcement like *"Nominations begin now"* and click Broadcast — hear the robotic voice speak and see the announcement banner.
2. Click **Start** on the timer — verify the countdown decreases; click **Pause** and **Reset**.
3. In the Danger Zone, click **Evict** on a nominee — verify the disintegration animation plays, screen shakes, and the contestant moves to the Evicted section.
4. Open the **CCTV Viewer** — verify the 4 simulated camera feeds and scanning lines render smoothly.

---

## 🚀 GIT WORKFLOW FOR VEDESH
```bash
git pull origin main
# Work on: index.html, js/announcements.js, js/timer.js, js/eviction.js, js/sounds.js, js/effects.js, js/app.js, css/layout.css, css/animations.css
git add index.html js/announcements.js js/timer.js js/eviction.js js/sounds.js js/effects.js js/app.js css/layout.css css/animations.css
git commit -m "feat(vedesh): implement Big Boss announcements, countdown timer, eviction engine, sounds and VFX"
git push origin main
```
