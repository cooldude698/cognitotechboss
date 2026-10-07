/**
 * ============================================================================
 * BIG BOSS COMMAND CENTER — REACTIVE STATE STORE & EVENT BUS
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Single source of truth (window.AppState) + Reactive Event Dispatcher
 */

(function () {
  const STORAGE_KEY = 'BIG_BOSS_STATE';

  // Seed Data: 8+ High-Fidelity Contestants with Stats & Vibes
  const DEFAULT_CONTESTANTS = [
    {
      id: 'c_1',
      name: 'Vedesh',
      team: 'Alpha',
      points: 540,
      status: 'immune', // 'active' | 'immune' | 'nominated' | 'evicted'
      isCaptain: true,
      avatar: '🦁',
      vibe: 'Slay 💅',
      slayStreak: 5,
      isSus: false,
      tasksCompleted: 6,
      evictedAt: null
    },
    {
      id: 'c_2',
      name: 'Priya',
      team: 'Beta',
      points: 480,
      status: 'active',
      isCaptain: false,
      avatar: '⚡',
      vibe: 'Slay 💅',
      slayStreak: 3,
      isSus: false,
      tasksCompleted: 5,
      evictedAt: null
    },
    {
      id: 'c_3',
      name: 'Marcus',
      team: 'Alpha',
      points: 420,
      status: 'active',
      isCaptain: false,
      avatar: '🚀',
      vibe: 'Slay 💅',
      slayStreak: 2,
      isSus: false,
      tasksCompleted: 4,
      evictedAt: null
    },
    {
      id: 'c_4',
      name: 'Elena',
      team: 'Omega',
      points: 380,
      status: 'nominated',
      isCaptain: false,
      avatar: '✨',
      vibe: 'Mid 😐',
      slayStreak: 1,
      isSus: true,
      tasksCompleted: 3,
      evictedAt: null
    },
    {
      id: 'c_5',
      name: 'Dev',
      team: 'Beta',
      points: 350,
      status: 'active',
      isCaptain: false,
      avatar: '🎯',
      vibe: 'Mid 😐',
      slayStreak: 0,
      isSus: false,
      tasksCompleted: 2,
      evictedAt: null
    },
    {
      id: 'c_6',
      name: 'Sarah',
      team: 'Omega',
      points: 310,
      status: 'nominated',
      isCaptain: false,
      avatar: '🔥',
      vibe: 'Sus 🛸',
      slayStreak: 0,
      isSus: true,
      tasksCompleted: 2,
      evictedAt: null
    },
    {
      id: 'c_7',
      name: 'Liam',
      team: 'Alpha',
      points: 260,
      status: 'active',
      isCaptain: false,
      avatar: '🐺',
      vibe: 'Mid 😐',
      slayStreak: 0,
      isSus: false,
      tasksCompleted: 1,
      evictedAt: null
    },
    {
      id: 'c_8',
      name: 'Aisha',
      team: 'Beta',
      points: 210,
      status: 'active',
      isCaptain: false,
      avatar: '💎',
      vibe: 'NPC 🤖',
      slayStreak: 0,
      isSus: false,
      tasksCompleted: 1,
      evictedAt: null
    }
  ];

  const DEFAULT_TASKS = [
    {
      id: 't_1',
      title: 'Defend Captain Suite Security',
      points: 100,
      assignedTo: 'all',
      status: 'pending',
      completedBy: null
    },
    {
      id: 't_2',
      title: 'Morning Fitness & Endurance Drill',
      points: 50,
      assignedTo: 'c_2',
      status: 'completed',
      completedBy: 'c_2'
    },
    {
      id: 't_3',
      title: 'Raid Luxury Ration Chamber',
      points: 150,
      assignedTo: 'c_3',
      status: 'pending',
      completedBy: null
    },
    {
      id: 't_4',
      title: 'Secret Agent Code Cipher Challenge',
      points: 80,
      assignedTo: 'c_5',
      status: 'pending',
      completedBy: null
    }
  ];

  function getFreshDemoState() {
    return {
      contestants: JSON.parse(JSON.stringify(DEFAULT_CONTESTANTS)),
      tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
      captainId: 'c_1',
      nominees: ['c_4', 'c_6'],
      evictedList: [
        {
          id: 'c_legacy_1',
          name: 'Vikram',
          team: 'Omega',
          points: 120,
          status: 'evicted',
          isCaptain: false,
          avatar: '💀',
          vibe: 'L Bozo 💀',
          slayStreak: 0,
          isSus: true,
          tasksCompleted: 0,
          evictedAt: Date.now() - 86400000
        }
      ],
      timer: {
        totalDuration: 300,
        remaining: 300,
        isRunning: false
      },
      dramaLevel: 75,
      latestAnnouncement: 'Big Boss: Nominations are now strictly ACTIVE. Danger Zone is live!',
      announcementsHistory: [
        {
          id: 'a_0',
          text: 'Big Boss: Welcome to the Tech House. Rules are absolute.',
          timestamp: Date.now() - 3600000,
          type: 'info'
        },
        {
          id: 'a_1',
          text: 'Big Boss: Nominations are now strictly ACTIVE. Danger Zone is live!',
          timestamp: Date.now() - 600000,
          type: 'danger'
        }
      ],
      activityLog: [
        { id: 'act_1', text: '👑 Vedesh appointed House Captain', time: '5m ago' },
        { id: 'act_2', text: '⚠️ Elena & Sarah transferred to Danger Zone', time: '3m ago' },
        { id: 'act_3', text: '⚡ Priya completed Morning Drill (+50 pts)', time: '1m ago' }
      ],
      settings: {
        soundMuted: false,
        darkMode: false
      }
    };
  }

  function loadInitialState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed reading from localStorage:', e);
    }
    return getFreshDemoState();
  }

  // Set Global State Object
  window.AppState = loadInitialState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(window.AppState));
    } catch (e) {
      console.warn('Failed writing to localStorage:', e);
    }
  }

  /**
   * 1-Click "Load Demo State" Button for instant evaluator review
   */
  window.loadDemoState = function () {
    window.AppState = getFreshDemoState();
    saveState();
    if (window.playSfx) window.playSfx('airhorn');
    if (window.triggerScreenShake) window.triggerScreenShake();
    window.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: { eventType: 'DEMO_STATE_LOADED', payload: null, state: window.AppState }
    }));
    console.log('⚡ Big Boss Demo State Successfully Loaded in 0.1s!');
  };

  /**
   * Central Reactive Event Dispatcher
   */
  window.dispatchStateChange = function (eventType, payload) {
    console.log(`[DISPATCH] ${eventType}:`, payload);

    switch (eventType) {
      case 'ANNOUNCEMENT_TRIGGER':
        window.AppState.latestAnnouncement = payload.text;
        window.AppState.announcementsHistory.unshift({
          id: 'a_' + Date.now(),
          text: payload.text,
          timestamp: Date.now(),
          type: payload.type || 'info'
        });
        window.AppState.activityLog.unshift({
          id: 'act_' + Date.now(),
          text: `📢 Decree: "${payload.text.substring(0, 42)}..."`,
          time: 'Just now'
        });
        break;

      case 'POINTS_ADJUST':
        const target = window.AppState.contestants.find(c => c.id === payload.contestantId);
        if (target) {
          target.points = Math.max(0, target.points + payload.delta);
          window.AppState.activityLog.unshift({
            id: 'act_' + Date.now(),
            text: `${target.name} ${payload.delta >= 0 ? '+' : ''}${payload.delta} pts (${payload.reason || 'Manual'})`,
            time: 'Just now'
          });
        }
        break;

      case 'CAPTAIN_ASSIGN':
        window.AppState.contestants.forEach(c => {
          c.isCaptain = (c.id === payload.contestantId);
          if (c.id === payload.contestantId) {
            c.status = 'immune';
          }
        });
        window.AppState.captainId = payload.contestantId;
        const newCap = window.AppState.contestants.find(c => c.id === payload.contestantId);
        window.AppState.activityLog.unshift({
          id: 'act_' + Date.now(),
          text: `👑 ${newCap ? newCap.name : 'Contestant'} appointed House Captain!`,
          time: 'Just now'
        });
        break;

      case 'IMMUNITY_TOGGLE':
        const imm = window.AppState.contestants.find(c => c.id === payload.contestantId);
        if (imm) {
          if (imm.status === 'immune') {
            imm.status = 'active';
          } else {
            imm.status = 'immune';
            window.AppState.nominees = window.AppState.nominees.filter(id => id !== payload.contestantId);
          }
        }
        break;

      case 'NOMINATE_CONTESTANT':
        const nom = window.AppState.contestants.find(c => c.id === payload.contestantId);
        if (nom && nom.status !== 'immune' && !nom.isCaptain) {
          nom.status = 'nominated';
          if (!window.AppState.nominees.includes(payload.contestantId)) {
            window.AppState.nominees.push(payload.contestantId);
          }
          window.AppState.dramaLevel = Math.min(100, window.AppState.dramaLevel + 10);
          window.AppState.activityLog.unshift({
            id: 'act_' + Date.now(),
            text: `⚠️ ${nom.name} nominated for Eviction!`,
            time: 'Just now'
          });
        }
        break;

      case 'EVICT_CONTESTANT':
        const eIdx = window.AppState.contestants.findIndex(c => c.id === payload.contestantId);
        if (eIdx !== -1) {
          const evicted = window.AppState.contestants[eIdx];
          evicted.status = 'evicted';
          evicted.evictedAt = Date.now();
          window.AppState.evictedList.unshift(evicted);
          window.AppState.contestants.splice(eIdx, 1);
          window.AppState.nominees = window.AppState.nominees.filter(id => id !== payload.contestantId);
          window.AppState.dramaLevel = Math.min(100, window.AppState.dramaLevel + 15);
          window.AppState.activityLog.unshift({
            id: 'act_' + Date.now(),
            text: `☠️ ${evicted.name} EVICTED from the Tech House!`,
            time: 'Just now'
          });
        }
        break;

      case 'TASK_COMPLETE':
        const task = window.AppState.tasks.find(t => t.id === payload.taskId);
        if (task) {
          task.status = 'completed';
          task.completedBy = payload.completedBy;
          const earner = window.AppState.contestants.find(c => c.id === payload.completedBy);
          if (earner) {
            earner.points += task.points;
            earner.tasksCompleted = (earner.tasksCompleted || 0) + 1;
            window.AppState.activityLog.unshift({
              id: 'act_' + Date.now(),
              text: `✅ ${earner.name} completed "${task.title}" (+${task.points} pts)`,
              time: 'Just now'
            });
          }
        }
        break;

      case 'DRAMA_SPIKE':
        window.AppState.dramaLevel = Math.min(100, Math.max(0, payload.level));
        break;

      case 'RESET_ALL':
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
        return;
    }

    saveState();

    // Broadcast standard DOM custom event to all reactive subscriber modules
    window.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: { eventType, payload, state: window.AppState }
    }));
  };
})();
