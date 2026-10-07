/**
 * ============================================================================
 * LIVE EVENT NOTIFICATION & HUD TOAST ENGINE
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Features:
 *  - Floating Neo-Brutalist Toast Notification Stack with Auto-Dismiss & Progress Countdown
 *  - Real-Time Event Bus Hook (Evictions, Nominations, Decrees, Tasks, Roles, Voting)
 *  - Interactive Notification Bell Tray with Unread Count & Filter Categories
 *  - Procedural Audio Chimes & Sound Synthesis Synchronization
 *  - HTML5 Web Desktop Push Notifications API Integration
 *  - 1-Click Interactive Test Alert Trigger for Evaluators
 */

(function () {
  let activeFilter = 'all';

  /**
   * Helper: relative time formatter
   */
  function formatRelativeTime(ts) {
    if (!ts) return 'Just now';
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  }

  /**
   * 1. Core Dispatcher: window.notifyEvent
   */
  window.notifyEvent = function (options = {}) {
    const {
      title = 'HOUSE EVENT',
      message = 'An update occurred in the Big Boss house.',
      type = 'info', // 'danger' | 'warning' | 'task' | 'decree' | 'vote' | 'info'
      icon = 'fa-bell',
      sfx = 'beep',
      viewTarget = null,
      duration = 4500
    } = options;

    const state = window.AppState;
    if (!state) return;

    if (!state.notifications) state.notifications = [];

    const notifItem = {
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      title,
      message,
      type,
      icon,
      viewTarget,
      read: false,
      timestamp: Date.now(),
      time: 'Just now'
    };

    // Prepend and cap to 30 items
    state.notifications.unshift(notifItem);
    if (state.notifications.length > 30) {
      state.notifications.pop();
    }

    try {
      localStorage.setItem('big_boss_2026_state', JSON.stringify(state));
    } catch (e) {
      console.warn('Storage save error:', e);
    }

    // Play SFX
    if (sfx && window.playSfx) {
      window.playSfx(sfx);
    }

    // Spawn Floating Toast
    spawnToast(notifItem, duration);

    // Native Browser Desktop Notification (if permitted)
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`Big Boss 2026: ${title}`, {
          body: message,
          icon: 'favicon.ico'
        });
      } catch (e) {
        console.warn('Desktop notification error:', e);
      }
    }

    // Update Tray & Unread Badge
    updateUnreadBadge();
    renderNotificationsList();
  };

  /**
   * 2. Spawn Floating Neo-Brutalist Toast Card
   */
  function spawnToast(notif, duration = 4500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-stack-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-card toast-${notif.type}`;
    toast.setAttribute('data-id', notif.id);

    const typeLabels = {
      danger: '🚨 CRITICAL ALERT',
      warning: '⚠️ ATTENTION',
      task: '🎯 TASK BOUNTY',
      decree: '📢 BIG BOSS DECREE',
      vote: '❤️ FAN VOTE',
      info: 'ℹ️ HOUSE NOTICE'
    };

    toast.innerHTML = `
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.45rem;">
          <span style="font-size: 1rem;">
            <i class="fa-solid ${notif.icon}"></i>
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase;">
            ${typeLabels[notif.type] || 'NOTIFICATION'}
          </span>
        </div>
        <button class="toast-close-btn" style="background: transparent; border: none; font-size: 0.85rem; font-weight: 900; cursor: pointer; color: var(--ink-900); padding: 0 4px; line-height: 1;" title="Dismiss">
          ✕
        </button>
      </div>

      <div style="font-family: var(--font-serif); font-size: 0.88rem; font-weight: 900; line-height: 1.25; margin-top: 2px;">
        ${notif.title}
      </div>

      <div style="font-family: var(--font-sans); font-size: 0.78rem; font-weight: 600; line-height: 1.35; color: var(--ink-700);">
        ${notif.message}
      </div>

      ${notif.viewTarget ? `
        <div style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 800; color: var(--accent-pink); margin-top: 2px;">
          👉 Click to view details
        </div>
      ` : ''}

      <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    // Click handler: navigate to view if target exists
    toast.addEventListener('click', (e) => {
      if (e.target.closest('.toast-close-btn')) {
        dismissToast(toast);
        return;
      }
      if (notif.viewTarget) {
        navigateToTarget(notif.viewTarget);
      }
      dismissToast(toast);
    });

    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissToast(toast);
      });
    }

    // Auto-dismiss timer with pause on hover
    let timeoutId;
    let remainingTime = duration;
    let startTime = Date.now();

    function startTimer() {
      startTime = Date.now();
      timeoutId = setTimeout(() => {
        dismissToast(toast);
      }, remainingTime);
    }

    function pauseTimer() {
      clearTimeout(timeoutId);
      remainingTime -= (Date.now() - startTime);
      const bar = toast.querySelector('.toast-progress-bar');
      if (bar) bar.style.animationPlayState = 'paused';
    }

    function resumeTimer() {
      if (remainingTime > 0) {
        const bar = toast.querySelector('.toast-progress-bar');
        if (bar) bar.style.animationPlayState = 'running';
        startTimer();
      } else {
        dismissToast(toast);
      }
    }

    toast.addEventListener('mouseenter', pauseTimer);
    toast.addEventListener('mouseleave', resumeTimer);

    startTimer();
    container.appendChild(toast);
  }

  function dismissToast(toast) {
    if (!toast || toast.classList.contains('dismissing')) return;
    toast.classList.add('dismissing');
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px) scale(0.9)';
    setTimeout(() => {
      toast.remove();
    }, 250);
  }

  function navigateToTarget(targetId) {
    if (!targetId) return;
    if (targetId.startsWith('view-')) {
      const tabBtn = document.querySelector(`[data-target-view="${targetId}"]`);
      if (tabBtn) tabBtn.click();
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * 3. Update Unread Badge
   */
  function updateUnreadBadge() {
    const badge = document.getElementById('notification-unread-count');
    if (!badge || !window.AppState || !window.AppState.notifications) return;

    const unreadCount = window.AppState.notifications.filter(n => !n.read).length;
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  /**
   * 4. Toggle Notifications Dropdown Tray
   */
  window.toggleNotificationsTray = function (forceState) {
    const menu = document.getElementById('notifications-dropdown');
    if (!menu) return;

    const shouldOpen = (typeof forceState === 'boolean') ? forceState : !menu.classList.contains('open');
    if (shouldOpen) {
      menu.classList.add('open');
      renderNotificationsList();
      if (window.playSfx) window.playSfx('beep');
    } else {
      menu.classList.remove('open');
    }
  };

  /**
   * 5. Filter Notifications
   */
  window.filterNotifications = function (filter) {
    activeFilter = filter;
    const filterBtns = document.querySelectorAll('.notif-filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-notif-filter') === filter);
      if (btn.getAttribute('data-notif-filter') === filter) {
        btn.style.background = 'var(--accent-yellow)';
        btn.style.boxShadow = '2px 2px 0px var(--ink-900)';
      } else {
        btn.style.background = '#ffffff';
        btn.style.boxShadow = 'none';
      }
    });
    renderNotificationsList();
  };

  /**
   * 6. Render Notifications List in Dropdown
   */
  function renderNotificationsList() {
    const listEl = document.getElementById('notifications-dropdown-list');
    if (!listEl || !window.AppState || !window.AppState.notifications) return;

    let items = window.AppState.notifications;
    if (activeFilter === 'urgent') {
      items = items.filter(n => n.type === 'danger' || n.type === 'warning');
    } else if (activeFilter === 'decree') {
      items = items.filter(n => n.type === 'decree');
    } else if (activeFilter === 'task') {
      items = items.filter(n => n.type === 'task');
    }

    if (items.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: var(--ink-500); font-family: var(--font-mono); font-size: 0.78rem;">
          <i class="fa-solid fa-bell-slash" style="font-size: 1.8rem; margin-bottom: 0.5rem; opacity: 0.4; display: block;"></i>
          No notifications in this category.<br>The Big Boss house is calm... for now! 😴
        </div>
      `;
      return;
    }

    listEl.innerHTML = items.map(n => `
      <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="window.handleNotificationClick('${n.id}', '${n.viewTarget || ''}')">
        <div style="font-size: 1.15rem; color: ${getIconColor(n.type)}; padding-top: 2px;">
          <i class="fa-solid ${n.icon}"></i>
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.35rem; margin-bottom: 2px;">
            <span style="font-family: var(--font-serif); font-size: 0.82rem; font-weight: 900; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${n.title}
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--ink-500); white-space: nowrap;">
              ${formatRelativeTime(n.timestamp)}
            </span>
          </div>
          <div style="font-family: var(--font-sans); font-size: 0.75rem; color: var(--ink-700); line-height: 1.3;">
            ${n.message}
          </div>
        </div>
      </div>
    `).join('');
  }

  function getIconColor(type) {
    switch (type) {
      case 'danger': return '#DC2626';
      case 'warning': return '#D97706';
      case 'task': return '#16A34A';
      case 'decree': return '#7C3AED';
      case 'vote': return '#DB2777';
      default: return '#2563EB';
    }
  }

  /**
   * 7. Handle click on a notification inside dropdown
   */
  window.handleNotificationClick = function (notifId, viewTarget) {
    const state = window.AppState;
    if (state && state.notifications) {
      const item = state.notifications.find(n => n.id === notifId);
      if (item) {
        item.read = true;
        try {
          localStorage.setItem('big_boss_2026_state', JSON.stringify(state));
        } catch (e) {}
      }
    }
    updateUnreadBadge();
    renderNotificationsList();

    if (viewTarget) {
      navigateToTarget(viewTarget);
      window.toggleNotificationsTray(false);
    }
  };

  /**
   * 8. Mark All Read
   */
  window.markAllNotificationsRead = function () {
    const state = window.AppState;
    if (!state || !state.notifications) return;

    state.notifications.forEach(n => n.read = true);
    try {
      localStorage.setItem('big_boss_2026_state', JSON.stringify(state));
    } catch (e) {}

    updateUnreadBadge();
    renderNotificationsList();
    if (window.playSfx) window.playSfx('beep');
  };

  /**
   * 9. Clear All
   */
  window.clearAllNotifications = function () {
    const state = window.AppState;
    if (!state) return;

    state.notifications = [];
    try {
      localStorage.setItem('big_boss_2026_state', JSON.stringify(state));
    } catch (e) {}

    updateUnreadBadge();
    renderNotificationsList();
    if (window.playSfx) window.playSfx('beep');
  };

  /**
   * 10. Web Browser Desktop Push Notification Permission Request
   */
  window.requestPushNotifications = function () {
    if (!('Notification' in window)) {
      alert('Desktop notifications are not supported in this browser.');
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        window.notifyEvent({
          title: 'DESKTOP ALERTS ENABLED',
          message: 'You will now receive native desktop event alerts even when tab is backgrounded!',
          type: 'task',
          icon: 'fa-bell',
          sfx: 'airhorn'
        });
      } else {
        alert('Push notification permission was denied or dismissed.');
      }
    });
  };

  /**
   * 11. Interactive Test Alert Trigger (Evaluator Showcase)
   */
  window.testNotification = function () {
    const testCases = [
      {
        title: '🚨 DANGER ZONE ALERT',
        message: 'Sudden nomination spike detected for Contestant Elena!',
        type: 'danger',
        icon: 'fa-skull',
        sfx: 'alarm',
        viewTarget: 'view-danger-zone'
      },
      {
        title: '👑 CAPTAINCY ROYAL DECREE',
        message: 'Big Boss orders 30-minute immunity challenge in the yard!',
        type: 'decree',
        icon: 'fa-crown',
        sfx: 'airhorn',
        viewTarget: 'view-contestants'
      },
      {
        title: '🎯 HIGH-STAKES BOUNTY',
        message: 'New Mega-Task "Midnight Circuit Hack" unlocked (+150 pts)!',
        type: 'task',
        icon: 'fa-trophy',
        sfx: 'cointax',
        viewTarget: 'view-tasks'
      },
      {
        title: '🔥 DRAMA SURGE CONFIRMED',
        message: 'Contestants engaged in heated verbal dispute near kitchen CCTV!',
        type: 'warning',
        icon: 'fa-fire',
        sfx: 'emotional_damage',
        viewTarget: 'view-stats'
      },
      {
        title: '❤️ AUDIENCE TSUNAMI',
        message: '10,000 live viewer votes received across Maharashtra streaming!',
        type: 'vote',
        icon: 'fa-heart',
        sfx: 'bruh',
        viewTarget: 'view-leaderboard'
      }
    ];

    const pick = testCases[Math.floor(Math.random() * testCases.length)];
    window.notifyEvent(pick);
  };

  /**
   * 12. Universal Event Bus Translation
   * Translates app:state-changed events into real-time notifications
   */
  window.addEventListener('app:state-changed', (e) => {
    const detail = e.detail || {};
    const eventType = detail.eventType;
    const payload = detail.payload || {};

    if (!eventType) return;

    switch (eventType) {
      case 'CONTESTANT_EVICTED': {
        const contestant = payload.contestant;
        if (contestant) {
          window.notifyEvent({
            title: '💀 HOUSE EVICTION COMPLETE',
            message: `${contestant.name} (Team ${contestant.team}) has been evicted from the Big Boss house!`,
            type: 'danger',
            icon: 'fa-skull',
            sfx: 'vineboom',
            viewTarget: 'view-danger-zone'
          });
        }
        break;
      }

      case 'NOMINATE_CONTESTANT': {
        const contestantId = payload.contestantId;
        const target = window.AppState?.contestants?.find(c => c.id === contestantId);
        if (target) {
          window.notifyEvent({
            title: '⚠️ NOMINATION IN DANGER ZONE',
            message: `${target.name} has been nominated for eviction!`,
            type: 'warning',
            icon: 'fa-triangle-exclamation',
            sfx: 'alarm',
            viewTarget: 'view-danger-zone'
          });
        }
        break;
      }

      case 'CAPTAIN_ASSIGN': {
        const contestantId = payload.contestantId;
        const target = window.AppState?.contestants?.find(c => c.id === contestantId);
        if (target) {
          window.notifyEvent({
            title: '👑 NEW HOUSE CAPTAIN',
            message: `${target.name} was coronated House Captain with full immunity!`,
            type: 'decree',
            icon: 'fa-crown',
            sfx: 'airhorn',
            viewTarget: 'view-contestants'
          });
        }
        break;
      }

      case 'IMMUNITY_TOGGLE': {
        const contestantId = payload.contestantId;
        const target = window.AppState?.contestants?.find(c => c.id === contestantId);
        if (target) {
          const isImmune = target.status === 'immune';
          window.notifyEvent({
            title: isImmune ? '🛡️ IMMUNITY GRANTED' : '🛡️ IMMUNITY REVOKED',
            message: `${target.name} is now ${isImmune ? 'shielded from eviction nominations' : 'vulnerable to danger'}.`,
            type: 'info',
            icon: 'fa-shield-halved',
            sfx: 'beep',
            viewTarget: 'view-contestants'
          });
        }
        break;
      }

      case 'TASK_COMPLETED': {
        const task = payload.task;
        if (task) {
          window.notifyEvent({
            title: '🎯 TASK BOUNTY CLAIMED',
            message: `"${task.title}" completed! +${task.points} pts added to house pool.`,
            type: 'task',
            icon: 'fa-circle-check',
            sfx: 'cointax',
            viewTarget: 'view-tasks'
          });
        }
        break;
      }

      case 'BROADCAST_DECREE': {
        const decree = payload.decree;
        if (decree) {
          window.notifyEvent({
            title: '📢 BIG BOSS ROYAL DECREE',
            message: `"${decree.text}"`,
            type: 'decree',
            icon: 'fa-bullhorn',
            sfx: 'gavel',
            viewTarget: 'control-deck'
          });
        }
        break;
      }

      case 'ROLE_CHANGED': {
        const role = payload.role;
        const roleLabels = {
          admin: '👑 Big Boss (Super-Admin)',
          producer: '🎬 Show Producer (Control Room)',
          audience: '👁️ Spectator (Audience Mode)'
        };
        window.notifyEvent({
          title: '🔐 ACCESS CLEARANCE SWITCHED',
          message: `Active persona is now ${roleLabels[role] || role}. UI permissions updated.`,
          type: 'info',
          icon: 'fa-user-shield',
          sfx: 'beep',
          viewTarget: 'control-deck'
        });
        break;
      }

      case 'AUDIENCE_VOTE_CAST': {
        const contestantId = payload.contestantId;
        const target = window.AppState?.contestants?.find(c => c.id === contestantId);
        if (target) {
          window.notifyEvent({
            title: '❤️ AUDIENCE LIVE FAN VOTE',
            message: `+10 Fan Vote Points awarded to ${target.name} (Team ${target.team})!`,
            type: 'vote',
            icon: 'fa-heart',
            sfx: 'cointax',
            viewTarget: 'view-leaderboard'
          });
        }
        break;
      }

      case 'DRAMA_SPIKE': {
        window.notifyEvent({
          title: '🔥 DRAMA SPIKE SIMULATED',
          message: 'House drama surged to 88%! Tension alarm active.',
          type: 'warning',
          icon: 'fa-fire',
          sfx: 'emotional_damage',
          viewTarget: 'view-stats'
        });
        break;
      }

      default:
        break;
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notifications-dropdown');
    const bellBtn = document.getElementById('notification-bell-btn');
    if (dropdown && dropdown.classList.contains('open')) {
      if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    }
  });

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    updateUnreadBadge();
    renderNotificationsList();
  });
})();
