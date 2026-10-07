/**
 * ============================================================================
 * EVICTION CEREMONY & HALL OF SHAME ENGINE (THANOS SNAP & SCREEN SHAKE)
 * ============================================================================
 * Mandatory Requirement #12: Eviction
 * Purges contestants from active house & moves them into Hall of Shame
 */

(function () {
  /**
   * Executes Eviction with Thanos Snap Disintegration & Screen Shake
   * @param {string} contestantId 
   */
  window.evictContestant = function (contestantId) {
    if (!window.AppState) return;

    const contestant = window.AppState.contestants.find(c => c.id === contestantId);
    if (!contestant) return;

    // Big Boss Confirmation Dialog
    const confirmEvict = confirm(
      `🚨 BIG BOSS EVICTION VERDICT:\n\nAre you sure you want to permanently EVICT ${contestant.name.toUpperCase()} from the Tech House?`
    );
    if (!confirmEvict) return;

    // Find card DOM element for Thanos Snap Disintegration animation
    const cardEl = document.querySelector(`[data-contestant-id="${contestantId}"]`);
    if (cardEl) {
      cardEl.classList.add('disintegrating');
    }

    // 1. Play Heavy Gavel / Vine Boom Sound
    if (window.playSfx) {
      window.playSfx('snap');
      setTimeout(() => {
        window.playSfx('vineboom');
      }, 300);
    }

    // 2. Trigger Earth-Shattering Screen Shake
    if (window.triggerScreenShake) {
      window.triggerScreenShake();
    }

    // 3. Robotic Voice Announcement
    const decree = `Bigg Boss announces: ${contestant.name} has been evicted from the Tech House!`;
    if (window.broadcastAnnouncement) {
      window.broadcastAnnouncement(decree, 'danger');
    }

    // 4. Complete Eviction State Mutation after disintegration finishes
    setTimeout(() => {
      if (window.dispatchStateChange) {
        window.dispatchStateChange('EVICT_CONTESTANT', { contestantId });
      }
      renderEvictedHallOfShame();
    }, 900);
  };

  /**
   * Renders the Evicted Hall of Shame Drawer into #evicted-graveyard
   */
  window.renderEvictedHallOfShame = function () {
    const container = document.getElementById('evicted-graveyard');
    if (!container) return;

    const evictedList = (window.AppState && window.AppState.evictedList) || [];

    if (!evictedList.length) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--ink-500); font-family: var(--font-mono); font-size: 0.85rem;">
          <i class="fa-solid fa-peace" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; opacity: 0.4;"></i>
          No contestants evicted yet. The house remains whole... for now.
        </div>
      `;
      return;
    }

    container.innerHTML = evictedList.map(c => `
      <div class="evicted-card">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.8rem; background: #fff; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid var(--ink-900);">
            ${c.avatar || '💀'}
          </div>
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.1rem; font-weight: 900; margin: 0; color: var(--ink-900);">
              ${c.name}
            </h4>
            <span class="pill-badge" style="background: var(--ink-100); font-size: 0.65rem;">
              Team ${c.team} • Final Score: ${c.points} pts
            </span>
          </div>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-danger-ink); font-weight: 700; margin-top: 0.25rem;">
          <i class="fa-solid fa-skull"></i> Departed: ${c.evictedAt ? new Date(c.evictedAt).toLocaleTimeString() : 'Round 1'}
        </div>
      </div>
    `).join('');
  };

  // Re-render Hall of Shame on state change
  window.addEventListener('app:state-changed', () => {
    renderEvictedHallOfShame();
  });

  document.addEventListener('DOMContentLoaded', () => {
    renderEvictedHallOfShame();
  });
})();
