/**
 * ============================================================================
 * CONTESTANTS & DANGER ZONE MANAGEMENT (AMAN'S MODULE)
 * ============================================================================
 */

(function () {
  function renderContestants() {
    const grid = document.getElementById('contestants-grid');
    if (!grid || !window.AppState) return;

    const list = window.AppState.contestants || [];

    grid.innerHTML = list.map(c => `
      <div class="contestant-card ${c.isCaptain ? 'captain-card' : ''} ${c.status === 'nominated' ? 'danger-pulsing' : ''}" data-contestant-id="${c.id}">
        <div class="contestant-card-header">
          <div class="contestant-avatar">
            ${c.avatar || '👤'}
          </div>
          <div class="contestant-info" style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h3>${c.name}</h3>
              <span class="contestant-points-badge">${c.points} PTS</span>
            </div>
            <div style="display: flex; gap: 0.35rem; margin-top: 0.35rem; flex-wrap: wrap;">
              <span class="pill-badge" style="background: var(--accent-lavender);">Team ${c.team}</span>
              ${c.isCaptain ? '<span class="pill-badge" style="background: var(--accent-yellow); font-weight: 900;">👑 CAPTAIN</span>' : ''}
              ${c.status === 'immune' ? '<span class="pill-badge" style="background: var(--accent-lime); font-weight: 800;">🛡️ IMMUNE</span>' : ''}
              ${c.status === 'nominated' ? '<span class="pill-badge" style="background: var(--accent-danger); color: var(--accent-danger-ink); font-weight: 800;">⚠️ NOMINATED</span>' : ''}
              <span class="pill-badge" style="background: var(--bg-paper);">${c.vibe || 'Slay 💅'}</span>
            </div>
          </div>
        </div>

        ${(window.AppState?.currentUserRole === 'audience') ? `
          <div class="contestant-actions-row">
            <button class="btn-brutalist btn-mini" style="flex: 1; font-weight: 800; background: var(--accent-pink); color: #fff; padding: 0.5rem;" onclick="window.castAudienceVote('${c.id}')">
              <i class="fa-solid fa-heart"></i> Fan Vote (+10 pts)
            </button>
          </div>
        ` : `
          <div class="contestant-actions-row">
            <button class="btn-brutalist btn-mini btn-lime" onclick="window.dispatchStateChange('POINTS_ADJUST', { contestantId: '${c.id}', delta: 50, reason: 'Task Bounty' }); window.triggerFloatingPoints(this, 50); window.playSfx('beep');">
              +50
            </button>
            <button class="btn-brutalist btn-mini btn-danger" onclick="window.dispatchStateChange('POINTS_ADJUST', { contestantId: '${c.id}', delta: -25, reason: 'House Penalty' }); window.triggerFloatingPoints(this, -25); window.playSfx('beep');">
              -25
            </button>
            <button class="btn-brutalist btn-mini" title="Custom Points & Reason" onclick="window.promptCustomPoints('${c.id}')">
              +/-
            </button>
            <button class="btn-brutalist btn-mini ${c.isCaptain ? 'btn-yellow' : ''}" title="Assign House Captain" onclick="window.dispatchStateChange('CAPTAIN_ASSIGN', { contestantId: '${c.id}' }); window.playSfx('airhorn'); window.triggerConfetti();">
              👑
            </button>
            <button class="btn-brutalist btn-mini" title="Toggle Immunity" onclick="window.dispatchStateChange('IMMUNITY_TOGGLE', { contestantId: '${c.id}' }); window.playSfx('beep');">
              🛡️
            </button>
            <button class="btn-brutalist btn-mini btn-danger" ${c.status === 'immune' || c.isCaptain ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} title="${c.status === 'immune' || c.isCaptain ? 'Immune from nomination' : 'Nominate for Eviction'}" onclick="window.dispatchStateChange('NOMINATE_CONTESTANT', { contestantId: '${c.id}' }); window.playSfx('alarm');">
              ⚠️
            </button>
          </div>
        `}
      </div>
    `).join('');
  }

  function renderDangerZone() {
    const dangerZone = document.getElementById('danger-zone-container');
    const dangerCountEl = document.getElementById('danger-zone-count');
    if (!dangerZone || !window.AppState) return;

    const nominees = window.AppState.contestants.filter(c => c.status === 'nominated');
    const currentRole = window.AppState.currentUserRole || 'admin';
    const canEvict = (currentRole === 'admin');

    if (dangerCountEl) {
      dangerCountEl.textContent = `${nominees.length} IN DANGER`;
    }

    if (!nominees.length) {
      dangerZone.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #fff; border: var(--border-thick); border-radius: var(--radius-lg); font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-500);">
          <i class="fa-solid fa-shield-halved" style="font-size: 2rem; color: var(--accent-lime); display: block; margin-bottom: 0.5rem;"></i>
          Danger Zone is clear! No contestants currently nominated.
        </div>
      `;
      return;
    }

    dangerZone.innerHTML = nominees.map(c => `
      <div class="danger-zone-card danger-pulsing" data-contestant-id="${c.id}">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div class="contestant-avatar" style="width: 44px; height: 44px; font-size: 1.4rem;">${c.avatar}</div>
            <div>
              <h4 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 900; margin: 0;">${c.name}</h4>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-danger-ink); font-weight: 800;">
                NOMINATED FOR EVICTION
              </span>
            </div>
          </div>
          <span class="contestant-points-badge" style="background: #fff;">${c.points} PTS</span>
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="btn-brutalist btn-mini btn-danger" style="flex: 1; ${!canEvict ? 'opacity: 0.5; cursor: not-allowed;' : ''}" ${!canEvict ? 'disabled title="🔒 Eviction restricted to Big Boss Super-Admin"' : ''} onclick="window.evictContestant('${c.id}')">
            <i class="fa-solid fa-skull"></i> ${canEvict ? 'EVICT NOW' : '🔒 Evict (Big Boss Only)'}
          </button>
          ${currentRole !== 'audience' ? `
            <button class="btn-brutalist btn-mini" title="Save / Revoke Nomination" onclick="window.dispatchStateChange('IMMUNITY_TOGGLE', { contestantId: '${c.id}' }); window.playSfx('beep');">
              🛡️ Save
            </button>
          ` : `
            <button class="btn-brutalist btn-mini" style="background: var(--accent-pink); color: #fff;" onclick="window.castAudienceVote('${c.id}')">
              ❤️ Vote (+10)
            </button>
          `}
        </div>
      </div>
    `).join('');
  }

  /**
   * Register a new housemate dynamically
   */
  window.promptAddContestant = function () {
    const name = prompt("Enter new contestant name:");
    if (!name || !name.trim()) return;
    const team = prompt("Enter team (Alpha / Beta / Omega):", "Alpha") || "Alpha";
    const avatars = ["🦁", "⚡", "🚀", "✨", "🎯", "🔥", "🐺", "💎", "👾", "👑", "🦊", "🐉"];
    const avatar = prompt("Enter an emoji avatar:", avatars[Math.floor(Math.random() * avatars.length)]) || "👤";
    const pointsStr = prompt("Enter starting points (default 200):", "200");
    const points = parseInt(pointsStr, 10) || 200;

    const newContestant = {
      id: "c_" + Date.now().toString(36),
      name: name.trim(),
      team: team.trim(),
      points: points,
      status: "active",
      isCaptain: false,
      avatar: avatar,
      vibe: "Slay 💅",
      slayStreak: 0,
      isSus: false,
      tasksCompleted: 0
    };

    if (window.dispatchStateChange) {
      window.dispatchStateChange("CONTESTANT_ADD", { contestant: newContestant });
      if (window.playSfx) window.playSfx("beep");
    }
  };

  /**
   * Adjust custom points with audit justification
   */
  window.promptCustomPoints = function (contestantId) {
    const c = (window.AppState && window.AppState.contestants || []).find(item => item.id === contestantId);
    if (!c) return;
    const deltaStr = prompt(`Enter points delta for ${c.name} (e.g. +30 or -20):`, "+25");
    if (!deltaStr) return;
    const delta = parseInt(deltaStr, 10);
    if (isNaN(delta) || delta === 0) return;
    const reason = prompt("Enter reason for point adjustment:", delta > 0 ? "Outstanding Task Execution" : "House Rule Infraction") || "Manual Adjustment";

    if (window.dispatchStateChange) {
      window.dispatchStateChange("POINTS_ADJUST", { contestantId, delta, reason });
      if (window.playSfx) window.playSfx("beep");
    }
  };

  // Reactive updates
  window.addEventListener('app:state-changed', () => {
    renderContestants();
    renderDangerZone();
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderContestants();
    renderDangerZone();
  });
})();
