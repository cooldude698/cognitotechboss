/**
 * ============================================================================
 * ROLE-BASED ACCESS CONTROL (RBAC) ENGINE
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Features:
 *  - 3 Distinct Operational Roles:
 *      1. 👑 BIG BOSS (Super-Admin): Full house authority (Evictions, Decrees, Captaincy, Reset)
 *      2. 🎬 SHOW PRODUCER (Editor/Director): Task management, Timer, Nominations, Points
 *      3. 👁️ AUDIENCE / SPECTATOR (Viewer): Read-only telemetry + Live Fan Voting (+10 pts)
 *  - Dynamic UI enforcement & element locking
 *  - Interactive role switcher with real-time audit logging
 *  - Interactive Fan Voting loop for Spectators
 *  - Comprehensive RBAC Permission Matrix Modal
 */

(function () {
  /**
   * Applies RBAC enforcement across the entire DOM
   */
  window.applyRoleAccessControl = function () {
    const state = window.AppState;
    if (!state) return;

    const currentRole = state.currentUserRole || 'admin';

    // 1. Update Role Switcher Buttons UI
    const roleBtns = document.querySelectorAll('.role-switcher-btn');
    roleBtns.forEach(btn => {
      const role = btn.getAttribute('data-role');
      if (role === currentRole) {
        btn.classList.add('active');
        btn.style.boxShadow = '3px 3px 0px var(--ink-900)';
        if (role === 'admin') btn.style.background = 'var(--accent-yellow)';
        else if (role === 'producer') btn.style.background = 'var(--accent-lavender)';
        else if (role === 'audience') btn.style.background = 'var(--accent-lime)';
      } else {
        btn.classList.remove('active');
        btn.style.boxShadow = 'none';
        btn.style.background = '#ffffff';
      }
    });

    // 2. Update Header & Deck Role Badges
    const headerRoleBadge = document.getElementById('current-role-badge');
    if (headerRoleBadge) {
      if (currentRole === 'admin') {
        headerRoleBadge.innerHTML = '👑 BIG BOSS';
        headerRoleBadge.style.background = 'var(--accent-yellow)';
      } else if (currentRole === 'producer') {
        headerRoleBadge.innerHTML = '🎬 PRODUCER';
        headerRoleBadge.style.background = 'var(--accent-lavender)';
      } else {
        headerRoleBadge.innerHTML = '👁️ SPECTATOR';
        headerRoleBadge.style.background = 'var(--accent-lime)';
      }
    }

    const roleInfoBanner = document.getElementById('role-permission-banner');
    if (roleInfoBanner) {
      if (currentRole === 'admin') {
        roleInfoBanner.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="pill-badge" style="background: var(--accent-yellow); font-weight: 900;">👑 SUPER-ADMIN</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--ink-900);">
                Full Authority Unlocked: Evictions, Decrees, Captaincy, Task Bounties, and Reset.
              </span>
            </div>
            <button class="btn-brutalist btn-mini" onclick="window.showRbacMatrixModal()" style="font-size: 0.65rem; padding: 2px 8px;">
              <i class="fa-solid fa-table-cells"></i> View RBAC Matrix
            </button>
          </div>
        `;
        roleInfoBanner.style.background = '#FEF9C3';
        roleInfoBanner.style.borderColor = 'var(--ink-900)';
      } else if (currentRole === 'producer') {
        roleInfoBanner.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="pill-badge" style="background: var(--accent-lavender); font-weight: 900;">🎬 SHOW PRODUCER</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--ink-900);">
                Operational Authority: Task Pipeline, Timer Controls, and Nominations. Eviction requires Big Boss.
              </span>
            </div>
            <button class="btn-brutalist btn-mini" onclick="window.showRbacMatrixModal()" style="font-size: 0.65rem; padding: 2px 8px;">
              <i class="fa-solid fa-table-cells"></i> View RBAC Matrix
            </button>
          </div>
        `;
        roleInfoBanner.style.background = 'var(--accent-lavender)';
        roleInfoBanner.style.borderColor = 'var(--ink-900)';
      } else {
        roleInfoBanner.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="pill-badge" style="background: var(--accent-lime); font-weight: 900;">👁️ SPECTATOR MODE</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--ink-900);">
                Read-Only Telemetry: Administrative controls locked. You can participate in Audience Fan Voting (+10 pts).
              </span>
            </div>
            <button class="btn-brutalist btn-mini" onclick="window.showRbacMatrixModal()" style="font-size: 0.65rem; padding: 2px 8px;">
              <i class="fa-solid fa-table-cells"></i> View RBAC Matrix
            </button>
          </div>
        `;
        roleInfoBanner.style.background = '#ECFCCB';
        roleInfoBanner.style.borderColor = 'var(--ink-900)';
      }
    }

    // 3. Enforce Permissions on Interactive Elements
    const isSpectator = (currentRole === 'audience');
    const isProducer = (currentRole === 'producer');
    const isAdmin = (currentRole === 'admin');

    // A. Eviction Buttons (Admin Only)
    const evictBtns = document.querySelectorAll('.btn-evict, button[onclick*="evictContestant"], button[onclick*="executeEviction"]');
    evictBtns.forEach(btn => {
      btn.disabled = !isAdmin;
      if (!isAdmin) {
        btn.title = '🔒 Restricted: Eviction requires Big Boss Super-Admin authority.';
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.title = 'Execute Permanent Eviction';
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      }
    });

    // B. Broadcast Decree Button & Inputs
    const broadcastBtn = document.getElementById('broadcast-decree-btn');
    const decreeInput = document.getElementById('decree-input');
    if (broadcastBtn) {
      broadcastBtn.disabled = isSpectator;
      broadcastBtn.style.opacity = isSpectator ? '0.45' : '1';
      broadcastBtn.style.cursor = isSpectator ? 'not-allowed' : 'pointer';
      if (isSpectator) broadcastBtn.title = '🔒 Decrees restricted to Big Boss / Producer';
    }
    if (decreeInput) {
      decreeInput.disabled = isSpectator;
      if (isSpectator) decreeInput.placeholder = '🔒 Decrees locked in Spectator Mode...';
      else decreeInput.placeholder = "Type custom meme decree (e.g. 'Elena is nominated!')...";
    }

    // C. Point Adjustment Buttons
    const nudgeBtns = document.querySelectorAll('.btn-nudge-up, .btn-nudge-down, button[onclick*="adjustPoints"]');
    nudgeBtns.forEach(btn => {
      btn.disabled = isSpectator;
      btn.style.opacity = isSpectator ? '0.45' : '1';
      btn.style.cursor = isSpectator ? 'not-allowed' : 'pointer';
      if (isSpectator) btn.title = '🔒 Point adjustments locked in Spectator Mode.';
    });

    // D. Timer Controls
    const timerBtns = document.querySelectorAll('#start-timer-btn, #pause-timer-btn, #reset-timer-btn, .timer-preset-btn');
    timerBtns.forEach(btn => {
      btn.disabled = isSpectator;
      btn.style.opacity = isSpectator ? '0.45' : '1';
      btn.style.cursor = isSpectator ? 'not-allowed' : 'pointer';
      if (isSpectator) btn.title = '🔒 Timer locked in Spectator Mode.';
    });

    // E. Task Management Controls
    const taskBtns = document.querySelectorAll('.btn-mark-done, button[onclick*="completeTask"], #add-task-btn');
    taskBtns.forEach(btn => {
      btn.disabled = isSpectator;
      btn.style.opacity = isSpectator ? '0.45' : '1';
      btn.style.cursor = isSpectator ? 'not-allowed' : 'pointer';
      if (isSpectator) btn.title = '🔒 Task management locked in Spectator Mode.';
    });

    // F. Captaincy & Immunity Toggles
    const captainBtns = document.querySelectorAll('button[onclick*="assignCaptain"], button[onclick*="toggleImmunity"]');
    captainBtns.forEach(btn => {
      btn.disabled = isSpectator;
      btn.style.opacity = isSpectator ? '0.45' : '1';
      btn.style.cursor = isSpectator ? 'not-allowed' : 'pointer';
      if (isSpectator) btn.title = '🔒 Captaincy & immunity locked in Spectator Mode.';
    });

    // G. Reset House Button
    const resetBtn = document.getElementById('reset-house-btn');
    if (resetBtn) {
      resetBtn.disabled = !isAdmin;
      resetBtn.style.opacity = !isAdmin ? '0.4' : '1';
      resetBtn.style.cursor = !isAdmin ? 'not-allowed' : 'pointer';
    }

    // H. Spectator Fan Voting Pills
    const fanVotePills = document.querySelectorAll('.spectator-vote-pill');
    fanVotePills.forEach(pill => {
      pill.style.display = isSpectator ? 'inline-flex' : 'none';
    });
  };

  /**
   * ❤️ Cast Audience Live Fan Vote (+10 pts)
   * Dedicated interactive feature for Spectator Role
   */
  window.castAudienceVote = function (contestantId) {
    const state = window.AppState;
    if (!state || !state.contestants) return;

    const target = state.contestants.find(c => c.id === contestantId);
    if (!target) return;

    target.points += 10;

    if (window.playSfx) window.playSfx('cointax');
    if (window.triggerConfetti) window.triggerConfetti();

    if (window.logActivity) {
      window.logActivity({
        category: 'points',
        type: 'vote',
        text: `❤️ AUDIENCE FAN VOTE: +10 pts awarded to ${target.name} (Team ${target.team})!`,
        contestantName: target.name,
        team: target.team,
        delta: 10
      });
    }

    // Broadcast standard state mutation
    window.dispatchEvent(new CustomEvent('app:state-changed', {
      detail: { eventType: 'AUDIENCE_VOTE_CAST', payload: { contestantId, delta: 10 }, state: window.AppState }
    }));
  };

  /**
   * Displays the Role-Based Access Control Permission Matrix Modal
   */
  window.showRbacMatrixModal = function () {
    const old = document.getElementById('rbac-matrix-modal');
    if (old) old.remove();

    const modal = document.createElement('div');
    modal.id = 'rbac-matrix-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(18, 18, 20, 0.7)';
    modal.style.backdropFilter = 'blur(6px)';
    modal.style.zIndex = '10001';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '1rem';

    modal.innerHTML = `
      <div class="brutalist-card" style="background: #FBF9F4; max-width: 680px; width: 100%; border: 4px solid var(--ink-900); box-shadow: 10px 10px 0px var(--ink-900); border-radius: 12px; padding: 1.75rem; position: relative;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="pill-badge" style="background: var(--accent-yellow);">ENTERPRISE RBAC</span>
              <h3 style="font-family: var(--font-serif); font-size: 1.5rem; font-weight: 900; margin: 0;">
                Role-Based Access Control Matrix
              </h3>
            </div>
            <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--ink-500); margin-top: 0.25rem;">
              Strict deterministic permission enforcement across all command center endpoints.
            </p>
          </div>
          <button class="btn-brutalist btn-mini btn-danger" onclick="document.getElementById('rbac-matrix-modal').remove()" style="padding: 4px 10px;">
            ✕
          </button>
        </div>

        <!-- Table -->
        <div style="overflow-x: auto; margin-bottom: 1.25rem;">
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.75rem;">
            <thead>
              <tr style="background: var(--ink-900); color: #fff;">
                <th style="padding: 8px 10px; text-align: left; border: 1px solid var(--ink-900);">Permission Endpoint</th>
                <th style="padding: 8px 10px; text-align: center; border: 1px solid var(--ink-900); background: #CA8A04;">👑 Big Boss</th>
                <th style="padding: 8px 10px; text-align: center; border: 1px solid var(--ink-900); background: #7C3AED;">🎬 Producer</th>
                <th style="padding: 8px 10px; text-align: center; border: 1px solid var(--ink-900); background: #16A34A;">👁️ Spectator</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--ink-300);">
                <td style="padding: 7px 10px; font-weight: 700;">Permanent Eviction (Thanos Snap)</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300); background: rgba(0,0,0,0.02);">
                <td style="padding: 7px 10px; font-weight: 700;">Broadcast Big Boss Decrees</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300);">
                <td style="padding: 7px 10px; font-weight: 700;">Captaincy & Immunity Shields</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300); background: rgba(0,0,0,0.02);">
                <td style="padding: 7px 10px; font-weight: 700;">Danger Zone Nominations</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300);">
                <td style="padding: 7px 10px; font-weight: 700;">Task Pipeline & Bounty Credit</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300); background: rgba(0,0,0,0.02);">
                <td style="padding: 7px 10px; font-weight: 700;">Task Countdown Timer HUD</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--ink-300);">
                <td style="padding: 7px 10px; font-weight: 700;">Audience Live Fan Voting (+10)</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Enabled</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Enabled</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Active Role Power</td>
              </tr>
              <tr>
                <td style="padding: 7px 10px; font-weight: 700;">Master House Reset</td>
                <td style="text-align: center; color: #16A34A; font-weight: 900;">✓ Full Access</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
                <td style="text-align: center; color: #DC2626; font-weight: 800;">✕ Blocked</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px dashed var(--ink-900); padding-top: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-500);">
            Active Role: <strong>${(window.AppState?.currentUserRole || 'admin').toUpperCase()}</strong>
          </span>
          <button class="btn-brutalist btn-lime" onclick="document.getElementById('rbac-matrix-modal').remove()">
            Got It
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  };

  // Init on DOM ready and listen to state changes
  document.addEventListener('DOMContentLoaded', () => {
    window.applyRoleAccessControl();

    window.addEventListener('app:state-changed', () => {
      window.applyRoleAccessControl();
    });
  });
})();
