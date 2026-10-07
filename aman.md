# 👤 TASK ASSIGNMENT: AMAN
### Role: Contestants, Live Leaderboard, Danger Zone & Eviction Engine
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Aman  
**Time Limit:** 45 Minutes  
**Reference Architecture:** [BRAIN.md](file:///Users/cooldude69/Desktop/cognito/BRAIN.md) & [SCHEMA.md](file:///Users/cooldude69/Desktop/cognito/SCHEMA.md)

---

## 🎯 MANDATORY REQUIREMENTS OWNED (500 pts)

You own the following **5 Mandatory Requirements**:
1. ✅ **Requirement #1: Contestant Management** (8+ contestants with Name, Team, Points, Status, Avatar, Vibe)
2. ✅ **Requirement #2: Live Leaderboard** (Dynamic auto-sort descending by points, Rank 1-8 badges)
3. ✅ **Requirement #5: Captaincy** (Assign/change House Captain, crown badge, auto-immunity)
4. ✅ **Requirement #6 & #7: Nominations & Immunity** (Immunity shield; hard-lock blocking nomination of immune/captain contestants)
5. ✅ **Requirement #8 & #12: Danger Zone & Eviction** (Display nominated housemates, execute eviction with Thanos-snap purge)

---

## 📁 FILES OWNED BY AMAN

| File | Responsibility |
|---|---|
| `css/contestants.css` | Contestant card styling, rank badges, Danger Zone container, eviction snap VFX |
| `js/contestants.js` | Renders 8+ cards into `#contestants-grid`, handles `+`/`-` point adjustments, Captain toggle, Immunity toggle |
| `js/leaderboard.js` | Renders into `#leaderboard-list`, sorts active contestants by points descending (`b.points - a.points`) |
| `js/eviction.js` | Handles nominations, renders into `#danger-zone-container`, executes eviction ceremony and updates `AppState.evictedList` |

---

## 🔌 FROZEN HTML TARGET CONTAINER IDs

Your scripts render directly into these pre-allocated containers created by Vedesh in `index.html`:
- `#contestants-grid` — Grid of all 8+ contestant cards
- `#leaderboard-list` — Real-time sorted ranking list
- `#danger-zone-container` — High-contrast crimson card grid of all nominated contestants
- `#evicted-graveyard` — Archive of eliminated housemates

---

## 🛠️ STEP-BY-STEP IMPLEMENTATION CHECKLIST

### 1. `js/contestants.js` (Roster & Card Actions)
- [ ] Read `window.AppState.contestants`.
- [ ] For each active contestant, render a cyberpunk card inside `#contestants-grid` showing:
  - Avatar emoji (🦁, ⚡, 🦊, 🐉, etc.)
  - Name and Team badge (`Alpha` / `Beta`)
  - Current Points counter
  - Status badge: `ACTIVE`, `IMMUNE 🛡️`, `CAPTAIN 👑`, or `NOMINATED ⚠️`
  - Vibe tag: `Slay 💅`, `Mid 😐`, `L Bozo 💀`, `NPC 🤖`
- [ ] Implement action buttons on each card:
  - `+10` / `+50` / `-10` / `-50` points ➔ calls `window.dispatchStateChange("POINTS_MODIFIED", { contestantId, delta, reason })`
  - **Crown Captain** ➔ calls `window.dispatchStateChange("CAPTAIN_ASSIGNED", { contestantId })`
  - **Shield / Immunity** ➔ calls `window.dispatchStateChange("IMMUNITY_TOGGLED", { contestantId })`
  - **Nominate** ➔ calls `window.dispatchStateChange("CONTESTANT_NOMINATED", { contestantId, reason })` (DISABLED if status === "immune" or isCaptain === true!)

### 2. `js/leaderboard.js` (Live Dynamic Rankings)
- [ ] Listen to `window.addEventListener("app:state-changed", renderLeaderboard)`.
- [ ] Filter active contestants (`status !== "evicted"`).
- [ ] Sort descending by points: `contestants.sort((a, b) => b.points - a.points)`.
- [ ] Render into `#leaderboard-list` with podium medal accents:
  - 🥇 Rank 1: Gold Crown + Glowing border
  - 🥈 Rank 2: Silver medal
  - 🥉 Rank 3: Bronze medal
  - Ranks 4–8: Standard badge
- [ ] Smooth CSS transition on rank swaps.

### 3. `js/eviction.js` (Danger Zone & Thanos Eviction Ceremony)
- [ ] Render nominated contestants into `#danger-zone-container`.
- [ ] Display reason for nomination and an **"Evict Contestant"** button.
- [ ] On Evict click:
  - Play `window.playSfx("snap")`
  - Trigger screen shake (`document.body.classList.add("screen-shake")`)
  - Dispatch: `window.dispatchStateChange("CONTESTANT_EVICTED", { contestantId })`
  - Purge contestant from active leaderboard and move them to `#evicted-graveyard`.

---

## 🧪 HOW TO TEST YOUR WORK
1. Open `index.html` — verify 8+ contestants appear in `#contestants-grid`.
2. Click `+50` on any contestant — check that `#leaderboard-list` re-sorts instantly.
3. Crown a captain — check that the previous captain loses their crown and the new captain gets immunity.
4. Try to nominate an immune contestant — verify the button is disabled and blocked.
5. Nominate an active contestant — verify they appear in `#danger-zone-container` with red danger pulse.
6. Click Evict on a nominee — verify they disappear from the active grid and leaderboard.

---

## 🚀 GIT WORKFLOW FOR AMAN
```bash
git pull origin main
# Work only on your assigned files:
# css/contestants.css, js/contestants.js, js/leaderboard.js, js/eviction.js
git add css/contestants.css js/contestants.js js/leaderboard.js js/eviction.js
git commit -m "feat(aman): implement contestant grid, leaderboard, immunity and eviction engine"
git push origin main
```
