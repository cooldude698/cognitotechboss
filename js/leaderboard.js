/**
 * ============================================================================
 * LIVE LEADERBOARD (DYNAMIC SORTING & RANKINGS)
 * ============================================================================
 * Mandatory Requirement #2: Live Leaderboard
 */

(function () {
  function renderLeaderboard() {
    const listEl = document.getElementById('leaderboard-list');
    if (!listEl || !window.AppState) return;

    // Filter active (non-evicted) and sort descending by points
    const sorted = [...(window.AppState.contestants || [])]
      .filter(c => c.status !== 'evicted')
      .sort((a, b) => b.points - a.points);

    listEl.innerHTML = sorted.map((c, index) => {
      const rank = index + 1;
      const isTop = rank === 1;

      return `
        <div class="leaderboard-row ${isTop ? 'rank-1' : ''}">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="leaderboard-rank-num">
              ${isTop ? '👑 #1' : `#${rank}`}
            </span>
            <div style="font-size: 1.2rem;">${c.avatar}</div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <strong style="font-family: var(--font-serif); font-size: 0.95rem; font-weight: 900;">${c.name}</strong>
                ${c.isCaptain ? '<span class="pill-badge" style="background: var(--accent-yellow); font-size: 0.6rem;">CAPTAIN</span>' : ''}
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--ink-500);">Team ${c.team}</span>
            </div>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 900; background: #fff; padding: 0.2rem 0.5rem; border: var(--border-subtle); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm);">
            ${c.points} PTS
          </span>
        </div>
      `;
    }).join('');
  }

  window.addEventListener('app:state-changed', renderLeaderboard);
  document.addEventListener('DOMContentLoaded', renderLeaderboard);
})();
