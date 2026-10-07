/**
 * ============================================================================
 * REAL-TIME ACTIVITY LOG & AUDIT CONSOLE MODULE
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Features:
 *  - Real-time event streaming & immutable audit trail
 *  - Interactive category filtering (Drama, Points, Tasks, Danger, Evictions, Decrees)
 *  - Instant search filtering by housemate or action
 *  - Relative time calculation (Just now, 15s ago, 2m ago)
 *  - 1-Click live event injection for demo testing
 *  - Export audit log as formatted JSON
 */

(function () {
  let activeFilter = 'all';
  let searchQuery = '';

  const CATEGORY_META = {
    all: { label: 'ALL', icon: 'fa-list' },
    drama: { label: '⚔️ Drama', icon: 'fa-fire', bg: '#FED7AA', color: '#9A3412', border: '#121214' },
    points: { label: '⭐ Points', icon: 'fa-star', bg: 'var(--accent-lime)', color: '#121214', border: '#121214' },
    task: { label: '🏆 Tasks', icon: 'fa-list-check', bg: 'var(--accent-yellow)', color: '#121214', border: '#121214' },
    danger: { label: '⚠️ Danger', icon: 'fa-triangle-exclamation', bg: 'var(--accent-danger)', color: 'var(--accent-danger-ink)', border: '#121214' },
    eviction: { label: '☠️ Evictions', icon: 'fa-skull', bg: '#FEE2E2', color: '#DC2626', border: '#121214' },
    captain: { label: '👑 Captaincy', icon: 'fa-crown', bg: 'var(--accent-lavender)', color: '#121214', border: '#121214' },
    decree: { label: '📢 Decrees', icon: 'fa-bullhorn', bg: 'var(--accent-pink)', color: '#121214', border: '#121214' },
    contestant: { label: '👤 Housemates', icon: 'fa-user-check', bg: '#E0E7FF', color: '#3730A3', border: '#121214' }
  };

  /**
   * Calculate human-readable relative time string
   */
  function getRelativeTime(timestamp) {
    if (!timestamp) return 'Just now';
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 5) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return new Date(timestamp).toLocaleDateString();
  }

  /**
   * Filter Switcher
   */
  window.setActivityFilter = function (category) {
    activeFilter = category;
    if (window.playSfx) window.playSfx('beep');

    // Update button active states
    const btns = document.querySelectorAll('#activity-filter-buttons button');
    btns.forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      if (filter === category) {
        btn.classList.add('active');
        btn.style.background = 'var(--accent-yellow)';
        btn.style.boxShadow = '2px 2px 0px var(--ink-900)';
      } else {
        btn.classList.remove('active');
        btn.style.background = '#ffffff';
        btn.style.boxShadow = 'none';
      }
    });

    window.renderActivityLogUI();
  };

  /**
   * Search Input Handler
   */
  window.filterActivitySearch = function (query) {
    searchQuery = (query || '').toLowerCase().trim();
    window.renderActivityLogUI();
  };

  /**
   * Master Activity Log Renderer
   */
  window.renderActivityLogUI = function () {
    const fullContainer = document.getElementById('activity-stream-full');
    const rightSidebarContainer = document.getElementById('activity-feed-list');
    if (!window.AppState) return;

    const logs = window.AppState.activityLog || [];

    // 1. Update Category Filter Counts
    const counts = { all: logs.length, drama: 0, points: 0, task: 0, danger: 0, eviction: 0, decree: 0, captain: 0 };
    logs.forEach(log => {
      const cat = log.category || 'general';
      if (counts[cat] !== undefined) counts[cat]++;
    });

    Object.keys(counts).forEach(cat => {
      const countEl = document.getElementById(`count-filter-${cat}`);
      if (countEl) countEl.textContent = `(${counts[cat]})`;
    });

    // 2. Render Full Stream in View Section
    if (fullContainer) {
      let filtered = logs;

      // Filter by Category
      if (activeFilter !== 'all') {
        filtered = filtered.filter(l => (l.category || '') === activeFilter);
      }

      // Filter by Search Query
      if (searchQuery) {
        filtered = filtered.filter(l =>
          (l.text || '').toLowerCase().includes(searchQuery) ||
          (l.contestantName || '').toLowerCase().includes(searchQuery) ||
          (l.team || '').toLowerCase().includes(searchQuery) ||
          (l.category || '').toLowerCase().includes(searchQuery)
        );
      }

      if (filtered.length === 0) {
        fullContainer.innerHTML = `
          <div class="brutalist-card" style="text-align: center; padding: 2.5rem 1rem; background: #fff;">
            <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; opacity: 0.35; margin-bottom: 0.75rem;"></i>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 800; margin-bottom: 0.25rem;">
              No Audit Events Found
            </h4>
            <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--ink-500); margin-bottom: 1rem;">
              No activities match filter "${activeFilter.toUpperCase()}" with query "${searchQuery}".
            </p>
            <button class="btn-brutalist btn-mini btn-lime" onclick="window.injectSimulatedLiveEvent()">
              <i class="fa-solid fa-bolt"></i> ⚡ Inject Simulated Live Event
            </button>
          </div>
        `;
      } else {
        fullContainer.innerHTML = filtered.map(log => {
          const meta = CATEGORY_META[log.category] || CATEGORY_META.all;
          const relTime = getRelativeTime(log.timestamp);
          const fullTime = log.time || (log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '');

          return `
            <div class="activity-log-card" style="border-left: 6px solid ${meta.bg || 'var(--ink-900)'};">
              <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1;">
                <!-- Category Badge -->
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: var(--radius-md); border: 2px solid var(--ink-900); background: ${meta.bg || '#fff'}; box-shadow: 2px 2px 0 var(--ink-900); flex-shrink: 0;">
                  <i class="fa-solid ${meta.icon}" style="font-size: 1.1rem; color: ${meta.color || 'var(--ink-900)'};"></i>
                </div>

                <!-- Narrative & Details -->
                <div style="flex: 1;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.2rem;">
                    <span class="pill-badge" style="font-size: 0.6rem; background: ${meta.bg || '#f3f4f6'}; color: ${meta.color || '#121214'}; border: 1px solid var(--ink-900); padding: 1px 6px;">
                      ${(log.category || 'EVENT').toUpperCase()}
                    </span>

                    ${log.team ? `<span class="pill-badge" style="font-size: 0.6rem; background: #fff; border: 1px solid var(--ink-900); padding: 1px 6px;">TEAM ${log.team.toUpperCase()}</span>` : ''}

                    ${log.delta ? `
                      <span class="pill-badge" style="font-size: 0.6rem; font-weight: 800; background: ${log.delta > 0 ? 'var(--accent-lime)' : 'var(--accent-danger)'}; color: ${log.delta > 0 ? '#121214' : 'var(--accent-danger-ink)'}; border: 1px solid var(--ink-900); padding: 1px 6px;">
                        ${log.delta > 0 ? '+' : ''}${log.delta} PTS
                      </span>
                    ` : ''}
                  </div>

                  <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--ink-900); line-height: 1.35;">
                    ${log.text}
                  </div>
                </div>
              </div>

              <!-- Time & ID Block -->
              <div style="text-align: right; flex-shrink: 0; font-family: var(--font-mono);">
                <div style="font-size: 0.75rem; font-weight: 800; color: var(--ink-900);">
                  ${relTime}
                </div>
                <div style="font-size: 0.65rem; color: var(--ink-500); margin-top: 2px;">
                  ${fullTime}
                </div>
                <div style="font-size: 0.55rem; color: var(--ink-400); margin-top: 2px;">
                  ${log.id ? log.id.substring(0, 10) : ''}
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 3. Render Top Recent Feed in Right Sidebar (#activity-feed-list)
    if (rightSidebarContainer) {
      rightSidebarContainer.innerHTML = logs.slice(0, 8).map(item => {
        const meta = CATEGORY_META[item.category] || CATEGORY_META.all;
        const relTime = getRelativeTime(item.timestamp);
        return `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; padding: 0.5rem 0; border-bottom: 1px dashed var(--ink-300); font-family: var(--font-mono); font-size: 0.72rem;">
            <div style="display: flex; align-items: flex-start; gap: 0.4rem; flex: 1;">
              <i class="fa-solid ${meta.icon}" style="font-size: 0.75rem; margin-top: 2px; color: ${meta.color || 'var(--ink-700)'}; flex-shrink: 0;"></i>
              <span style="font-weight: 700; color: var(--ink-900); line-height: 1.3;">${item.text}</span>
            </div>
            <span style="color: var(--ink-500); font-size: 0.65rem; white-space: nowrap; flex-shrink: 0;">${relTime}</span>
          </div>
        `;
      }).join('');
    }
  };

  /**
   * ⚡ Inject Simulated Live Event
   * Allows evaluator/user to simulate live house drama, score adjustments, and bounties
   */
  window.injectSimulatedLiveEvent = function () {
    const state = window.AppState;
    if (!state || !state.contestants || state.contestants.length === 0) return;

    const activeList = state.contestants.filter(c => c.status !== 'evicted');
    if (activeList.length === 0) return;

    const randomContestant = activeList[Math.floor(Math.random() * activeList.length)];

    const SCENARIOS = [
      {
        category: 'drama',
        type: 'fight',
        text: `🥊 House Dispute: ${randomContestant.name} penalized -25 pts for breaking kitchen curfew!`,
        contestantName: randomContestant.name,
        team: randomContestant.team,
        delta: -25,
        apply: () => {
          randomContestant.points = Math.max(0, randomContestant.points - 25);
          state.dramaLevel = Math.min(100, (state.dramaLevel || 50) + 12);
        }
      },
      {
        category: 'task',
        type: 'task',
        text: `🏆 Bounty Claimed: ${randomContestant.name} crushed the 4-Hour Bug Squashing Sprint (+45 pts)!`,
        contestantName: randomContestant.name,
        team: randomContestant.team,
        delta: 45,
        apply: () => {
          randomContestant.points += 45;
          randomContestant.tasksCompleted = (randomContestant.tasksCompleted || 0) + 1;
        }
      },
      {
        category: 'points',
        type: 'points',
        text: `⭐ Fan Surge: ${randomContestant.name} received +30 bonus points from audience live voting!`,
        contestantName: randomContestant.name,
        team: randomContestant.team,
        delta: 30,
        apply: () => {
          randomContestant.points += 30;
        }
      },
      {
        category: 'captain',
        type: 'shield',
        text: `🛡️ Strategy Move: ${randomContestant.name} activated a Temporary Immunity Shield!`,
        contestantName: randomContestant.name,
        team: randomContestant.team,
        delta: 0,
        apply: () => {
          randomContestant.status = 'immune';
        }
      },
      {
        category: 'danger',
        type: 'nomination',
        text: `⚠️ Emergency Call: ${randomContestant.name} placed under Danger Zone nomination review!`,
        contestantName: randomContestant.name,
        team: randomContestant.team,
        delta: 0,
        apply: () => {
          if (randomContestant.status !== 'immune' && !randomContestant.isCaptain) {
            randomContestant.status = 'nominated';
            if (!state.nominees.includes(randomContestant.id)) {
              state.nominees.push(randomContestant.id);
            }
          }
        }
      }
    ];

    const pick = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    if (pick.apply) pick.apply();

    // Log the event
    if (window.logActivity) {
      window.logActivity({
        category: pick.category,
        type: pick.type,
        text: pick.text,
        contestantName: pick.contestantName,
        team: pick.team,
        delta: pick.delta,
        timestamp: Date.now()
      });
    }

    if (window.playSfx) window.playSfx('beep');
    if (pick.delta > 0 && window.triggerConfetti) window.triggerConfetti();

    // Trigger state changed event so all other modules update
    window.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: { eventType: 'LIVE_EVENT_INJECTED', payload: pick, state: window.AppState }
    }));
  };

  /**
   * 📥 Export Activity Log to JSON
   */
  window.exportActivityLogJSON = function () {
    if (!window.AppState || !window.AppState.activityLog) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(window.AppState.activityLog, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `techboss_activity_log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (window.playSfx) window.playSfx('beep');
  };

  /**
   * 🗑️ Clear Activity Log History
   */
  window.clearActivityLog = function () {
    if (!window.AppState) return;
    if (confirm('Are you sure you want to clear all activity log telemetry?')) {
      window.AppState.activityLog = [];
      window.renderActivityLogUI();
      if (window.playSfx) window.playSfx('beep');
    }
  };

  // Initialize on DOM ready and register state change listener
  document.addEventListener('DOMContentLoaded', () => {
    window.renderActivityLogUI();

    // Re-render whenever app state mutates
    window.addEventListener('app:state-changed', () => {
      window.renderActivityLogUI();
    });

    // Auto-update relative timestamps every 10 seconds
    setInterval(() => {
      window.renderActivityLogUI();
    }, 10000);
  });
})();
