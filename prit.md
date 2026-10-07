# 👤 TASK ASSIGNMENT: PRIT
### Role: Competition Engine, Points, Leaderboard & Task Management
**Project:** Big Boss Command Center (`cognitotechboss`)  
**Teammate:** Prit  
**Time Limit:** 45 Minutes  

---

## 🎯 MANDATORY REQUIREMENTS OWNED (400 pts)

You are the owner of the following **4 Mandatory Requirements**:
1. ✅ **Requirement #2: Live Leaderboard** (Auto-sorting ranks by points, medals 🥇🥈🥉, smooth animated transitions)
2. ✅ **Requirement #3: Task Management** (Create house tasks, assign to contestant or all, mark Complete, auto-credit points)
3. ✅ **Requirement #4: Point System** (`+` and `-` point delta buttons, custom points with reason tag, point history log)
4. ✅ **Requirement #11: House Statistics** (Live stat metrics: MVP Top Scorer, Lowest Scorer, Completed Tasks, Active Nominees, Charts)

Plus **Bonus Feature**:
- 🗳️ **Public Audience Save Poll Simulator** (Live voting percentage bars inside Danger Zone!)

---

## 📁 FILES ASSIGNED TO PRIT

| File | Responsibility |
|---|---|
| `js/leaderboard.js` | Sorted leaderboard rendering, dynamic re-ordering on point change, Rank 1/2/3 podium badges |
| `js/points.js` | `addPoints(id, amount, reason)` and `deductPoints(id, amount, reason)` logic, floating point animation |
| `js/tasks.js` | Task CRUD, task assignment, status toggling (`pending` ➔ `completed`), automatic point reward |
| `js/stats.js` | Live statistics calculation, MVP finder, Chart.js points and tasks breakdown |
| `css/components.css` | Styling for Leaderboard rows, task checklist items, point pills, stat cards |

---

## 🛠️ DETAILED IMPLEMENTATION CHECKLIST

### 1. `js/points.js` (Point System Engine)
- [ ] Implement `modifyPoints(contestantId, delta, reason)`:
  - Updates contestant's `points` in `state.contestants`.
  - Enforces minimum points floor (e.g. 0 points).
  - Triggers floating floating indicator (`+50` in green, `-20` in red) at the card position.
  - Logs the event to `state.activityFeed`: `"[10:04] Aman awarded +50 pts to Vedesh (Reason: Cleaned Kitchen)"`.
  - Re-triggers `renderLeaderboard()` and `renderStats()`.
- [ ] Provide quick-click buttons on each contestant card:
  - `+10` (Quick Bounty)
  - `+50` (Major Task)
  - `-10` (Minor Penalty)
  - `-50` (Severe Infraction)
- [ ] Provide a "Custom Points Modal" for Big Boss with custom number input + text reason.

### 2. `js/leaderboard.js` (Live Leaderboard)
- [ ] `renderLeaderboard()`:
  - Filters out evicted contestants (`status !== "evicted"`).
  - Sorts active contestants descending: `b.points - a.points`.
  - Renders top ranks with medals:
    - **Rank 1:** 🥇 Gold + Glowing border
    - **Rank 2:** 🥈 Silver
    - **Rank 3:** 🥉 Bronze
    - **Other:** #4, #5, #6, etc.
  - Displays: Rank number, Avatar, Contestant Name, Team tag, Captain crown if captain, and Total Points.
  - Smooth animation or transition when ranks swap positions.

### 3. `js/tasks.js` (Task Management)
- [ ] Initialize pre-seeded tasks in `state.tasks`:
  - *"Refactor Core Legacy Backend"* (Point Value: 100, Assigned to: Vedesh)
  - *"Survive 24-Hour Hackathon Shift"* (Point Value: 50, Assigned to: All)
  - *"Eliminate Memory Leak in Production"* (Point Value: 80, Assigned to: Priya)
- [ ] `renderTasks()`:
  - Shows task card with: Title, Description, Point Bounty, Assignee name/badge, and Status badge (`Pending` / `Completed`).
  - Filter tabs: `All`, `Pending`, `Completed`.
- [ ] `completeTask(taskId)`:
  - Marks status as `"completed"`.
  - **Automatically adds points** to the assigned contestant(s) via `modifyPoints`.
  - Logs task completion to Activity Feed.
- [ ] "New Task" form to create and assign custom house tasks.

### 4. `js/stats.js` (House Statistics Dashboard)
- [ ] Live summary stat cards:
  - 👑 **Current House Captain**
  - 🌟 **Top Scorer (MVP):** Contestant with highest points
  - 🔻 **Lowest Scorer:** Contestant with lowest points
  - ✅ **Tasks Completed:** `X / Y completed`
  - ⚠️ **Total Nominees:** Count of contestants in Danger Zone
  - 🚪 **Total Evicted:** Count of eliminated housemates
- [ ] Integrate **Chart.js** (CDN included in HTML):
  - Points distribution bar chart across all active contestants.

### 5. 🗳️ Bonus: Audience Save Poll
- [ ] For each nominated contestant, show a live public vote bar:
  - Simulates audience vote percentages (*"Alex: 58% | Sarah: 42%"*).
  - Include a `+ Vote` button for user interactivity.

---

## 🧪 HOW TO TEST YOUR WORK
1. Click `+50` on the 3rd-ranked contestant — verify their points increase and their card moves up the Leaderboard immediately.
2. Complete a task — verify the assigned contestant receives the reward points automatically.
3. Check the **House Statistics** bar — verify Top Scorer and Task counts reflect real data.
4. Add custom points with a reason — verify the reason appears in the activity feed.

---

## 🚀 GIT WORKFLOW FOR PRIT
```bash
git pull origin main
# Work on: js/points.js, js/leaderboard.js, js/tasks.js, js/stats.js, css/components.css
git add js/points.js js/leaderboard.js js/tasks.js js/stats.js css/components.css
git commit -m "feat(prit): implement live leaderboard, point system, task management and house statistics"
git push origin main
```
