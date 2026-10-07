# 👤 TASK ASSIGNMENT: AMAN
### Role: Core Architecture, State Engine & Contestant Management
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Aman  
**Time Limit:** 45 Minutes  

---

## 🎯 MANDATORY REQUIREMENTS OWNED (500 pts)

You are the owner of the following **5 Mandatory Requirements**:
1. ✅ **Requirement #1: Contestant Management** (8+ contestants, name, team, points, status, avatar emoji)
2. ✅ **Requirement #5: Captaincy** (Assign/change House Captain, crown badge, auto-immunity)
3. ✅ **Requirement #6: Nominations** (Nominate non-immune contestants for eviction)
4. ✅ **Requirement #7: Immunity** (Grant/revoke shield; hard-lock validation preventing nomination)
5. ✅ **Requirement #8: Danger Zone** (Display all nominated contestants in dedicated high-contrast alarm panel)

Plus **Bonus Feature**:
- ⚡ **"Load Demo State / Chaos Button"** inside `state.js` for instant evaluator 1-click verification!

---

## 📁 FILES ASSIGNED TO AMAN

| File | Responsibility |
|---|---|
| `js/state.js` | Single source of truth: contestants list, captainId, state mutation helpers, localStorage sync, demo seeder |
| `js/contestants.js` | Contestant card rendering, add contestant modal, team badges, status badges |
| `js/nominations.js` | Nomination modal/trigger, immunity check validation, Danger Zone card renderer |
| `css/variables.css` | Color tokens (`--bg-primary`, `--neon-blue`, `--neon-red`, etc.), fonts, borders |
| `css/base.css` | Global reset, body styling, cyberpunk background styles |

---

## 🛠️ DETAILED IMPLEMENTATION CHECKLIST

### 1. `css/variables.css` & `css/base.css`
- [ ] Define CSS custom properties:
  - `--bg-primary: #030712;`
  - `--bg-secondary: #0d1117;`
  - `--bg-card: #111827;`
  - `--neon-blue: #00f5ff;`
  - `--neon-pink: #ff00a0;`
  - `--neon-green: #00ff88;`
  - `--neon-red: #ff003c;`
  - `--neon-gold: #ffd700;`
- [ ] Base typography (`Orbitron` for headings, `Inter` for body).

### 2. `js/state.js` (The Backbone)
- [ ] Initialize `state` object with:
  - `contestants`: Pre-seed **8+ contestants** (e.g. Vedesh, Priya, Marcus, Elena, Dev, Sarah, Liam, Aisha) with attributes:
    ```js
    {
      id: "c_001",
      name: "Vedesh",
      team: "Alpha",
      points: 450,
      status: "active", // "active" | "immune" | "nominated" | "evicted"
      isCaptain: false,
      avatar: "🦁",
      vibeCheck: "Slay",
      isSus: false
    }
    ```
  - `captainId`: ID of active captain.
  - `activityFeed`: Array of log events.
- [ ] Provide mutation functions:
  - `updateContestant(id, changes)`
  - `setCaptain(id)`: Removes crown from old captain, gives crown + immunity to new captain.
  - `grantImmunity(id)`: Sets status to `"immune"`.
  - `revokeImmunity(id)`: Reverts to `"active"`.
  - `nominateContestant(id, reason)`: **Validates that contestant is NOT immune or captain**; if valid, sets status to `"nominated"`.
  - `loadDemoState()`: Pre-fills 8 contestants with scores, 1 captain, 2 nominees, ready for evaluators.
- [ ] Add `saveState()` & `loadState()` using `localStorage`.

### 3. `js/contestants.js`
- [ ] `renderContestants()`: Builds interactive cards for each active contestant.
- [ ] Displays Avatar, Name, Team badge (`Team Alpha` / `Team Beta`), Points, Status badge (`ACTIVE`, `IMMUNE 🛡️`, `CAPTAIN 👑`).
- [ ] Action buttons on card:
  - **Crown Captain** (calls `setCaptain(id)`)
  - **Shield / Immunity** toggle (calls `grantImmunity(id)` or `revokeImmunity(id)`)
  - **Nominate** button (disabled if immune!)
- [ ] Modal to register a brand new contestant (`name`, `team`, `avatar`).

### 4. `js/nominations.js` & Danger Zone
- [ ] `renderDangerZone()`: Filters contestants where `status === "nominated"`.
- [ ] Shows red pulsating cards in the Danger Zone section.
- [ ] Each Danger Zone card has:
  - Nominee Name + Points
  - Nomination reason
  - "Evict" trigger button (calls Vedesh's eviction handler in `eviction.js`).
- [ ] Prevents nomination if contestant is currently immune (shows warning toast: *"Contestant has Immunity Shield!"*).

---

## 🧪 HOW TO TEST YOUR WORK
1. Open the app — verify **8+ contestants** render on the grid with avatars, teams, and points.
2. Click **Crown Captain** on a contestant — verify only 1 contestant has the gold crown.
3. Grant **Immunity** to a contestant — verify the shield badge appears.
4. Try to **Nominate** the immune contestant — verify it is blocked.
5. Nominate a non-immune contestant — verify they immediately appear in the **Danger Zone** with a red pulse.

---

## 🚀 GIT WORKFLOW FOR AMAN
```bash
git pull origin main
# Work on: css/variables.css, css/base.css, js/state.js, js/contestants.js, js/nominations.js
git add css/variables.css css/base.css js/state.js js/contestants.js js/nominations.js
git commit -m "feat(aman): implement state engine, contestant cards, captaincy, immunity and danger zone"
git push origin main
```
