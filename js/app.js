/**
 * ============================================================================
 * BIG BOSS COMMAND CENTER — MASTER APPLICATION INITIALIZER
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Handles tab navigation, UI updates, sound toggling, and demo loading.
 */

(function () {
  function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-tab-btn');
    const sections = document.querySelectorAll('.view-section');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetViewId = btn.getAttribute('data-target-view');
        if (!targetViewId) return;

        if (window.playSfx) window.playSfx('beep');

        // Update nav active states
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Switch visible view
        sections.forEach(sec => {
          if (sec.id === targetViewId) {
            sec.classList.add('active');
          } else {
            sec.classList.remove('active');
          }
        });
      });
    });
  }

  function updateDramaMeterUI() {
    const dramaFill = document.getElementById('drama-meter-bar');
    const dramaText = document.getElementById('drama-meter-text');
    if (!dramaFill || !window.AppState) return;

    const level = window.AppState.dramaLevel || 50;
    dramaFill.style.width = `${level}%`;
    if (dramaText) {
      dramaText.textContent = `${level}%`;
    }
  }

  function updateActivityLogUI() {
    const feedContainer = document.getElementById('activity-feed-list');
    if (!feedContainer || !window.AppState) return;

    const logs = window.AppState.activityLog || [];
    feedContainer.innerHTML = logs.slice(0, 7).map(item => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0; border-bottom: 1px dashed var(--ink-300); font-family: var(--font-mono); font-size: 0.75rem;">
        <span style="font-weight: 700; color: var(--ink-900);">${item.text}</span>
        <span style="color: var(--ink-500); font-size: 0.7rem; white-space: nowrap;">${item.time}</span>
      </div>
    `).join('');
  }

  function initGlobalListeners() {
    // 1. Sound Mute Toggle Button
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (window.toggleSound) {
          window.toggleSound();
        }
      });
    }

    // 2. 1-Click "Load Demo State" Button
    const demoBtn = document.getElementById('load-demo-state-btn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        if (window.loadDemoState) {
          window.loadDemoState();
        }
      });
    }

    // 3. Reset All House State Button
    const resetBtn = document.getElementById('reset-house-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('🚨 Reset all House data back to factory settings?')) {
          if (window.dispatchStateChange) {
            window.dispatchStateChange('RESET_ALL', null);
          }
        }
      });
    }
  }

  // Reactive State Listener
  window.addEventListener('app:state-changed', () => {
    updateDramaMeterUI();
    updateActivityLogUI();
  });

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlobalListeners();
    updateDramaMeterUI();
    updateActivityLogUI();
    console.log('🚀 Big Boss Command Center Initialized & Ready.');
  });
})();
