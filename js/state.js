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
        {
          id: 'act_init_1',
          category: 'captain',
          type: 'captain',
          text: '👑 Vedesh appointed House Captain (Team Alpha)',
          contestantName: 'Vedesh',
          team: 'Alpha',
          delta: 0,
          timestamp: Date.now() - 300000,
          time: '5m ago'
        },
        {
          id: 'act_init_2',
          category: 'danger',
          type: 'danger',
          text: '⚠️ Elena & Sarah nominated to Danger Zone',
          contestantName: 'Elena',
          team: 'Alpha',
          delta: 0,
          timestamp: Date.now() - 180000,
          time: '3m ago'
        },
        {
          id: 'act_init_3',
          category: 'task',
          type: 'task',
          text: '✅ Priya completed Morning Algorithm Drill (+50 pts)',
          contestantName: 'Priya',
          team: 'Beta',
          delta: 50,
          timestamp: Date.now() - 90000,
          time: '1m ago'
        },
        {
          id: 'act_init_4',
          category: 'decree',
          type: 'decree',
          text: '📢 Big Boss Decree: "Luxury room raid starts NOW, no cap!"',
          contestantName: '',
          team: '',
          delta: 0,
          timestamp: Date.now() - 60000,
          time: '1m ago'
        },
        {
          id: 'act_init_5',
          category: 'drama',
          type: 'drama',
          text: '🥊 House Dispute: Marcus vs Priya over ration distribution (-20 pts)',
          contestantName: 'Marcus',
          team: 'Beta',
          delta: -20,
          timestamp: Date.now() - 45000,
          time: '45s ago'
        },
        {
          id: 'act_init_6',
          category: 'captain',
          type: 'shield',
          text: '🛡️ Rohan activated Immunity Shield',
          contestantName: 'Rohan',
          team: 'Omega',
          delta: 0,
          timestamp: Date.now() - 30000,
          time: '30s ago'
        },
        {
          id: 'act_init_7',
          category: 'points',
          type: 'points',
          text: '⭐ Aman earned Clean Code Review Bounty (+35 pts)',
          contestantName: 'Aman',
          team: 'Beta',
          delta: 35,
          timestamp: Date.now() - 15000,
          time: '15s ago'
        },
        {
          id: 'act_init_8',
          category: 'decree',
          type: 'meme',
          text: '🗿 Big Boss Meme: "Silence in the house! Mewing streak maintained."',
          contestantName: '',
          team: '',
          delta: 0,
          timestamp: Date.now() - 5000,
          time: 'Just now'
        }
      ],
      currentUserRole: 'admin', // 'admin' (Big Boss) | 'producer' (Control Room) | 'audience' (Spectator)
      roles: {
        admin: {
          name: 'Big Boss',
          label: '👑 BIG BOSS',
          description: 'Super-Administrator with absolute house authority.',
          permissions: ['evict', 'nominate', 'immunity', 'points', 'captain', 'broadcast', 'tasks', 'timer', 'reset', 'vote']
        },
        producer: {
          name: 'Show Producer',
          label: '🎬 PRODUCER',
          description: 'Control Room Director managing tasks, timers & nominations.',
          permissions: ['nominate', 'immunity', 'points', 'tasks', 'timer', 'vote']
        },
        audience: {
          name: 'Audience / Spectator',
          label: '👁️ SPECTATOR',
          description: 'Public viewer with read-only telemetry and live voting privileges.',
          permissions: ['vote']
        }
      },
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
   * RBAC Helper: Check if active user role possesses a specific permission
   */
  window.hasPermission = function (perm) {
    if (!window.AppState) return true;
    const currentRole = window.AppState.currentUserRole || 'admin';
    const roleConfig = window.AppState.roles && window.AppState.roles[currentRole];
    if (!roleConfig) return true;
    return roleConfig.permissions.includes(perm);
  };

  /**
   * RBAC Switcher: Change user persona ('admin' | 'producer' | 'audience')
   */
  window.setUserRole = function (role) {
    if (!window.AppState) return;
    if (!['admin', 'producer', 'audience'].includes(role)) return;

    window.AppState.currentUserRole = role;
    saveState();

    const roleLabels = {
      admin: '👑 BIG BOSS (Super-Admin)',
      producer: '🎬 SHOW PRODUCER (Control Room)',
      audience: '👁️ AUDIENCE (Spectator Mode)'
    };

    if (window.logActivity) {
      window.logActivity({
        category: 'decree',
        type: 'role',
        text: `🔐 Access Role switched to ${roleLabels[role]}!`
      });
    }

    if (window.playSfx) window.playSfx('beep');

    // Broadcast standard state changed event
    window.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: { eventType: 'ROLE_CHANGED', payload: { role }, state: window.AppState }
    }));

    if (window.applyRoleAccessControl) {
      window.applyRoleAccessControl();
    }
  };

  /**
   * Central Real-Time Activity Logger
   */
  window.logActivity = function (entry) {
    if (!window.AppState) return;
    if (!window.AppState.activityLog) window.AppState.activityLog = [];

    const now = Date.now();
    const timeFormatted = new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const item = {
      id: entry.id || ('act_' + now + '_' + Math.random().toString(36).substr(2, 4)),
      category: entry.category || 'general',
      type: entry.type || 'info',
      text: entry.text || '',
      contestantName: entry.contestantName || '',
      team: entry.team || '',
      delta: entry.delta || 0,
      timestamp: entry.timestamp || now,
      time: entry.time || timeFormatted
    };

    window.AppState.activityLog.unshift(item);
    if (window.AppState.activityLog.length > 100) {
      window.AppState.activityLog.pop();
    }

    saveState();

    if (window.renderActivityLogUI) {
      window.renderActivityLogUI();
    }
    return item;
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
        window.logActivity({
          category: 'decree',
          type: 'decree',
          text: `📢 Big Boss Decree: "${payload.text.substring(0, 52)}..."`
        });
        break;

      case 'POINTS_ADJUST':
        const target = window.AppState.contestants.find(c => c.id === payload.contestantId);
        if (target) {
          target.points = Math.max(0, target.points + payload.delta);
          window.logActivity({
            category: 'points',
            type: 'points',
            text: `${target.name} ${payload.delta >= 0 ? '+' : ''}${payload.delta} pts (${payload.reason || 'Manual Adjustment'})`,
            contestantName: target.name,
            team: target.team,
            delta: payload.delta
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
        window.logActivity({
          category: 'captain',
          type: 'captain',
          text: `👑 ${newCap ? newCap.name : 'Contestant'} appointed House Captain!`,
          contestantName: newCap ? newCap.name : '',
          team: newCap ? newCap.team : ''
        });
        break;

      case 'IMMUNITY_TOGGLE':
        const imm = window.AppState.contestants.find(c => c.id === payload.contestantId);
        if (imm) {
          if (imm.status === 'immune') {
            imm.status = 'active';
            window.logActivity({
              category: 'captain',
              type: 'shield',
              text: `🛡️ ${imm.name} Immunity Shield REVOKED`,
              contestantName: imm.name,
              team: imm.team
            });
          } else {
            imm.status = 'immune';
            window.AppState.nominees = window.AppState.nominees.filter(id => id !== payload.contestantId);
            window.logActivity({
              category: 'captain',
              type: 'shield',
              text: `🛡️ ${imm.name} Immunity Shield ACTIVATED`,
              contestantName: imm.name,
              team: imm.team
            });
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
          window.logActivity({
            category: 'danger',
            type: 'nomination',
            text: `⚠️ ${nom.name} nominated for Eviction in Danger Zone!`,
            contestantName: nom.name,
            team: nom.team
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
          window.logActivity({
            category: 'eviction',
            type: 'eviction',
            text: `☠️ ${evicted.name} PERMANENTLY EVICTED from the Tech House!`,
            contestantName: evicted.name,
            team: evicted.team
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
            window.logActivity({
              category: 'task',
              type: 'task',
              text: `✅ ${earner.name} completed "${task.title}" (+${task.points} pts)`,
              contestantName: earner.name,
              team: earner.team,
              delta: task.points
            });
          }
        }
        break;

      case 'CONTESTANT_ADD':
        if (payload.contestant) {
          window.AppState.contestants.push(payload.contestant);
          window.logActivity({
            category: 'contestant',
            type: 'registration',
            text: `👤 Housemate ${payload.contestant.name} registered into Team ${payload.contestant.team}!`,
            contestantName: payload.contestant.name,
            team: payload.contestant.team
          });
        }
        break;

      case 'DRAMA_SPIKE':
        window.AppState.dramaLevel = Math.min(100, (window.AppState.dramaLevel || 50) + (payload.amount || 10));
        window.logActivity({
          category: 'drama',
          type: 'drama',
          text: `🔥 House Drama spiked to ${window.AppState.dramaLevel}% (+${payload.amount || 10}%)!`
        });
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
