/* ============================================
   js/timer.js — Countdown Clock Engine
   Owner: Prith
   1-sec interval loop, format MM:SS,
   <10s panic mode, alarm audio on zero,
   TIME'S UP banner overlay.
   ============================================ */

(function () {
  'use strict';

  const display = document.getElementById('task-timer-display');
  const controls = document.getElementById('timer-controls');
  if (!display || !controls) return;

  let intervalId = null;

  // ---- FORMAT TIME ----
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  // ---- RENDER DISPLAY ----
  function renderDisplay() {
    const state = window.AppState;
    if (!state || !state.timer) return;

    display.textContent = formatTime(state.timer.remaining);

    // Panic mode: <10 seconds
    if (state.timer.remaining <= 10 && state.timer.remaining > 0 && state.timer.isRunning) {
      display.classList.add('timer-panic');
    } else {
      display.classList.remove('timer-panic');
    }
  }

  // ---- RENDER CONTROLS ----
  function renderControls() {
    const state = window.AppState;
    if (!state || !state.timer) return;

    const isRunning = state.timer.isRunning;

    controls.innerHTML = `
      <button class="btn-timer ${isRunning ? 'pause' : 'start'}" onclick="TimerModule.toggle()">
        <i class="fa-solid ${isRunning ? 'fa-pause' : 'fa-play'}"></i>
        ${isRunning ? 'Pause' : 'Start'}
      </button>
      <button class="btn-timer reset" onclick="TimerModule.reset()">
        <i class="fa-solid fa-rotate-left"></i> Reset
      </button>
      <button class="btn-timer preset" onclick="TimerModule.setPreset(300)">5 Min</button>
      <button class="btn-timer preset" onclick="TimerModule.setPreset(900)">15 Min</button>
      <button class="btn-timer preset" onclick="TimerModule.setPreset(1800)">30 Min</button>
    `;
  }

  // ---- TICK ----
  function tick() {
    const state = window.AppState;
    if (!state || !state.timer) return;

    if (state.timer.remaining > 0) {
      state.timer.remaining--;
      renderDisplay();

      // Play beep in last 10 seconds
      if (state.timer.remaining <= 10 && state.timer.remaining > 0) {
        if (typeof window.playSfx === 'function') {
          window.playSfx('beep');
        }
      }

      // Timer reached zero
      if (state.timer.remaining === 0) {
        stopInterval();
        state.timer.isRunning = false;
        display.classList.remove('timer-panic');

        if (typeof window.playSfx === 'function') {
          window.playSfx('alarm');
        }

        showTimesUpOverlay();
        renderControls();

        if (typeof window.dispatchStateChange === 'function') {
          window.dispatchStateChange('TIMER_TOGGLE', { isRunning: false });
        }
      }
    }
  }

  // ---- START / PAUSE ----
  function toggle() {
    const state = window.AppState;
    if (!state || !state.timer) return;

    if (state.timer.isRunning) {
      // Pause
      stopInterval();
      state.timer.isRunning = false;
      display.classList.remove('timer-panic');
    } else {
      // Start — only if time remaining
      if (state.timer.remaining <= 0) return;
      state.timer.isRunning = true;
      startInterval();
    }

    renderControls();

    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('TIMER_TOGGLE', { isRunning: state.timer.isRunning });
    }
  }

  // ---- RESET ----
  function reset() {
    const state = window.AppState;
    if (!state || !state.timer) return;

    stopInterval();
    state.timer.isRunning = false;
    state.timer.remaining = state.timer.totalDuration;
    display.classList.remove('timer-panic');
    renderDisplay();
    renderControls();

    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('TIMER_RESET', null);
    }
  }

  // ---- PRESET ----
  function setPreset(seconds) {
    const state = window.AppState;
    if (!state || !state.timer) return;

    stopInterval();
    state.timer.isRunning = false;
    state.timer.totalDuration = seconds;
    state.timer.remaining = seconds;
    display.classList.remove('timer-panic');
    renderDisplay();
    renderControls();

    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('TIMER_SET', { seconds: seconds });
    }
  }

  // ---- INTERVAL MGMT ----
  function startInterval() {
    stopInterval();
    intervalId = setInterval(tick, 1000);
  }

  function stopInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // ---- TIMES UP OVERLAY ----
  function showTimesUpOverlay() {
    // Remove existing overlay if any
    const existing = document.querySelector('.times-up-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'times-up-overlay';
    overlay.innerHTML = `
      <div class="times-up-text">⏰ TIME'S UP!</div>
      <button class="times-up-dismiss" onclick="TimerModule.dismissOverlay()">
        <i class="fa-solid fa-xmark"></i> Dismiss
      </button>
    `;
    document.body.appendChild(overlay);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 5000);
  }

  function dismissOverlay() {
    const overlay = document.querySelector('.times-up-overlay');
    if (overlay) overlay.remove();
  }

  // ---- INIT ----
  function init() {
    renderDisplay();
    renderControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---- REACTIVE LISTENER ----
  window.addEventListener('app:state-changed', () => {
    renderDisplay();
  });

  // ---- EXPOSE ----
  window.TimerModule = {
    toggle: toggle,
    reset: reset,
    setPreset: setPreset,
    dismissOverlay: dismissOverlay
  };

})();
