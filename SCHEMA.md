# 📑 SCHEMA.md — DATA MODELS, STATE CONTRACTS & APIS

> **Formal Data Schemas, Type Definitions, Mutation Actions & Event Payloads**  
> **Team Cognito** | Big Boss Command Center

---

## 1. Type Definitions & Entities

### 1.1 Contestant Entity (`Contestant`)
Represents an active, immune, nominated, or evicted house member.

```typescript
interface Contestant {
  id: string;                     // e.g. "c_1"
  name: string;                   // e.g. "Vedesh"
  team: "Alpha" | "Beta" | "Omega";
  points: number;                 // current aggregate score, e.g. 480
  status: "active" | "immune" | "nominated" | "evicted";
  isCaptain: boolean;             // true if designated House Captain
  avatar: string;                 // emoji symbol, e.g. "🦁", "⚡", "👑"
  accentColor: string;            // hex accent, e.g. "#D4F77C"
  vibe: "Slay 💅" | "Mid 😐" | "Sus 🛸" | "NPC 🤖";
  slayStreak: number;             // consecutive rounds with points
  isSus: boolean;                 // Gen-Z suspicion flag
  tasksCompleted: number;         // aggregate tasks finished
  history: PointHistoryEntry[];   // audit log of point mutations
}

interface PointHistoryEntry {
  timestamp: number;
  delta: number;
  reason: string;
}
```

### 1.2 Task Entity (`Task`)
Represents an assignment issued by Big Boss to individuals or the entire house.

```typescript
interface Task {
  id: string;                     // e.g. "t_101"
  title: string;                  // e.g. "Defend the Captain's Suite"
  description: string;
  points: number;                 // bounty awarded on completion, e.g. 100
  assignedTo: string;             // "all" or Contestant.id
  status: "pending" | "completed";
  createdAt: number;
  completedAt: number | null;
  completedBy: string | null;     // Contestant.id of the member who finished it
}
```

### 1.3 Announcement Entity (`Announcement`)
Represents a broadcast notification issued by Big Boss.

```typescript
interface Announcement {
  id: string;                     // e.g. "a_201"
  message: string;                // e.g. "Big Boss: Nomination protocol is active!"
  type: "broadcast" | "emergency" | "eviction" | "reward";
  timestamp: number;
  active: boolean;
}
```

---

## 2. Global State Interface (`AppState`)

```typescript
interface AppState {
  contestants: Contestant[];
  tasks: Task[];
  announcements: Announcement[];
  captainId: string | null;
  nominees: string[];             // Array of Contestant IDs in Danger Zone
  evictedList: Contestant[];       // Historical array of evicted members
  timer: {
    totalDuration: number;        // total seconds configured (e.g. 300)
    remaining: number;            // seconds left
    isRunning: boolean;
  };
  dramaLevel: number;             // 0 to 100 percentage
  activityLog: {
    id: string;
    text: string;
    badge: string;                // e.g. "POINTS", "EVICTION", "CAPTAIN"
    timestamp: number;
  }[];
  settings: {
    soundMuted: boolean;
    darkMode: boolean;
  };
}
```

---

## 3. State Mutation Actions (`ActionType`)

Mutations are triggered via `window.dispatchStateChange(type, payload)`:

| Action Type | Payload Contract | Description |
|---|---|---|
| `POINTS_ADJUST` | `{ contestantId: string, delta: number, reason: string }` | Increments or decrements score and logs entry. |
| `CAPTAIN_ASSIGN` | `{ contestantId: string }` | Transfers captaincy; automatically sets immunity for captain. |
| `IMMUNITY_TOGGLE` | `{ contestantId: string }` | Grants or revokes immunity status. |
| `NOMINATE_CONTESTANT` | `{ contestantId: string }` | Moves member to Danger Zone; blocked if member has immunity. |
| `EVICT_CONTESTANT` | `{ contestantId: string }` | Triggers snap animation, removes from active list, adds to Hall of Shame. |
| `TASK_CREATE` | `{ title: string, points: number, assignedTo: string }` | Adds a new pending task. |
| `TASK_COMPLETE` | `{ taskId: string, completedBy: string }` | Marks task completed and credits bounty to contestant. |
| `TIMER_SET` | `{ seconds: number }` | Configures countdown timer duration. |
| `TIMER_TOGGLE` | `{ isRunning: boolean }` | Starts or pauses countdown interval. |
| `TIMER_RESET` | `null` | Resets timer back to totalDuration. |
| `ANNOUNCEMENT_TRIGGER` | `{ message: string, type: string }` | Broadcasts new announcement across UI ticker and sound engine. |
| `SANDBOX_EVENT` | `{ eventName: string }` | Triggers simulated drama event (e.g. Fight, Slay Boost, Penalty). |

---

## 4. Default Seed Data Specification

The application initializes with 8 contestants across 3 teams:

```json
[
  { "id": "c_1", "name": "Vedesh", "team": "Alpha", "points": 480, "status": "immune", "isCaptain": true, "avatar": "🦁", "vibe": "Slay 💅", "slayStreak": 4, "isSus": false, "tasksCompleted": 5 },
  { "id": "c_2", "name": "Aman", "team": "Beta", "points": 420, "status": "active", "isCaptain": false, "avatar": "⚡", "vibe": "Slay 💅", "slayStreak": 2, "isSus": false, "tasksCompleted": 4 },
  { "id": "c_3", "name": "Prith", "team": "Alpha", "points": 390, "status": "active", "isCaptain": false, "avatar": "🚀", "vibe": "Slay 💅", "slayStreak": 3, "isSus": false, "tasksCompleted": 3 },
  { "id": "c_4", "name": "Ananya", "team": "Omega", "points": 340, "status": "nominated", "isCaptain": false, "avatar": "✨", "vibe": "Mid 😐", "slayStreak": 1, "isSus": true, "tasksCompleted": 2 },
  { "id": "c_5", "name": "Rohan", "team": "Beta", "points": 310, "status": "active", "isCaptain": false, "avatar": "🎯", "vibe": "Mid 😐", "slayStreak": 0, "isSus": false, "tasksCompleted": 2 },
  { "id": "c_6", "name": "Sarah", "team": "Omega", "points": 270, "status": "nominated", "isCaptain": false, "avatar": "🔥", "vibe": "Sus 🛸", "slayStreak": 0, "isSus": true, "tasksCompleted": 1 },
  { "id": "c_7", "name": "Kabir", "team": "Alpha", "points": 240, "status": "active", "isCaptain": false, "avatar": "🐺", "vibe": "Mid 😐", "slayStreak": 0, "isSus": false, "tasksCompleted": 1 },
  { "id": "c_8", "name": "Pooja", "team": "Beta", "points": 180, "status": "active", "isCaptain": false, "avatar": "💎", "vibe": "NPC 🤖", "slayStreak": 0, "isSus": false, "tasksCompleted": 0 }
]
```
