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
    if (window.renderActivityLogUI) {
      window.renderActivityLogUI();
    }
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

  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#view-')) {
      const targetView = hash.substring(1);
      const tabBtn = document.querySelector(`[data-target-view="${targetView}"]`);
      if (tabBtn) {
        tabBtn.click();
      }
    }
  }

  window.addEventListener('hashchange', handleHashNavigation);

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGlobalListeners();
    updateDramaMeterUI();
    updateActivityLogUI();
    handleHashNavigation();
    console.log('🚀 Big Boss Command Center Initialized & Ready.');
  });
})();
