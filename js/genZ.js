/* ============================================
   js/genZ.js — Gen-Z Chaos Sandbox
   Owner: Prith
   Interactive drama buttons inside
   #genz-sandbox-panel:
     🥊 Trigger House Fight (-30 pts x2, drama+20%)
     💅 Slay Boost (+50 to Captain)
     💀 Skill Issue Penalty (-20 to lowest scorer)
   ============================================ */

(function () {
  'use strict';

  const sandboxPanel = document.getElementById('genz-sandbox-panel');
  if (!sandboxPanel) return;

  // ---- RENDER BUTTONS ----
  function renderSandbox() {
    sandboxPanel.innerHTML = `
      <div class="panel-section-title">
        <span class="icon">🎮</span> Gen-Z Chaos Sandbox
      </div>

      <button class="sandbox-btn fight" onclick="GenZModule.triggerFight()">
        <span class="sandbox-icon">🥊</span>
        <span>
          <span class="sandbox-label">Trigger House Fight</span><br>
          <span class="sandbox-effect">-30 pts to 2 rivals • Drama +20%</span>
        </span>
      </button>

      <button class="sandbox-btn slay" onclick="GenZModule.slayBoost()">
        <span class="sandbox-icon">💅</span>
        <span>
          <span class="sandbox-label">Slay Boost</span><br>
          <span class="sandbox-effect">+50 pts to House Captain</span>
        </span>
      </button>

      <button class="sandbox-btn skill-issue" onclick="GenZModule.skillIssuePenalty()">
        <span class="sandbox-icon">💀</span>
        <span>
          <span class="sandbox-label">Skill Issue Penalty</span><br>
          <span class="sandbox-effect">-20 pts to lowest scorer</span>
        </span>
      </button>
    `;
  }

  // ---- TRIGGER HOUSE FIGHT ----
  function triggerFight() {
    const state = window.AppState;
    if (!state || !state.contestants) return;

    const active = state.contestants.filter(c => c.status !== 'evicted');
    if (active.length < 2) return;

    // Pick 2 random active contestants
    const shuffled = [...active].sort(() => Math.random() - 0.5);
    const rival1 = shuffled[0];
    const rival2 = shuffled[1];

    // Deduct points
    rival1.points = Math.max(0, rival1.points - 30);
    rival2.points = Math.max(0, rival2.points - 30);

    // Log history
    if (rival1.history) {
      rival1.history.push({ timestamp: Date.now(), delta: -30, reason: '🥊 House Fight penalty' });
    }
    if (rival2.history) {
      rival2.history.push({ timestamp: Date.now(), delta: -30, reason: '🥊 House Fight penalty' });
    }

    // Spike drama
    state.dramaLevel = Math.min(100, (state.dramaLevel || 0) + 20);

    // SFX
    if (typeof window.playSfx === 'function') {
      window.playSfx('vineboom');
    }

    // Dispatch
    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('SANDBOX_EVENT', {
        eventName: 'HOUSE_FIGHT',
        rivals: [rival1.id, rival2.id],
        dramaLevel: state.dramaLevel
      });
    }

    // Visual feedback
    showFloatingText(sandboxPanel.querySelector('.fight'), `-30`, 'negative');

    // Log activity
    logActivity(`🥊 HOUSE FIGHT! ${rival1.avatar} ${rival1.name} vs ${rival2.avatar} ${rival2.name} — both lost 30 pts! Drama at ${state.dramaLevel}%`);
  }

  // ---- SLAY BOOST ----
  function slayBoost() {
    const state = window.AppState;
    if (!state || !state.contestants) return;

    const captain = state.contestants.find(c => c.isCaptain && c.status !== 'evicted');
    if (!captain) {
      // No captain assigned
      showFloatingText(sandboxPanel.querySelector('.slay'), `No Captain!`, 'negative');
      return;
    }

    captain.points += 50;

    if (captain.history) {
      captain.history.push({ timestamp: Date.now(), delta: 50, reason: '💅 Slay Boost from Big Boss' });
    }

    if (typeof window.playSfx === 'function') {
      window.playSfx('beep');
    }

    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('SANDBOX_EVENT', {
        eventName: 'SLAY_BOOST',
        contestantId: captain.id,
        delta: 50
      });
    }

    showFloatingText(sandboxPanel.querySelector('.slay'), `+50`, 'positive');
    logActivity(`💅 SLAY BOOST! Captain ${captain.avatar} ${captain.name} earned +50 bonus pts!`);
  }

  // ---- SKILL ISSUE PENALTY ----
  function skillIssuePenalty() {
    const state = window.AppState;
    if (!state || !state.contestants) return;

    const active = state.contestants.filter(c => c.status !== 'evicted');
    if (active.length === 0) return;

    // Find lowest scorer
    const lowest = active.reduce((worst, c) => c.points < worst.points ? c : worst, active[0]);

    lowest.points = Math.max(0, lowest.points - 20);

    if (lowest.history) {
      lowest.history.push({ timestamp: Date.now(), delta: -20, reason: '💀 Skill Issue Penalty' });
    }

    if (typeof window.playSfx === 'function') {
      window.playSfx('vineboom');
    }

    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('SANDBOX_EVENT', {
        eventName: 'SKILL_ISSUE',
        contestantId: lowest.id,
        delta: -20
      });
    }

    showFloatingText(sandboxPanel.querySelector('.skill-issue'), `-20`, 'negative');
    logActivity(`💀 SKILL ISSUE! ${lowest.avatar} ${lowest.name} penalized -20 pts for being the lowest scorer!`);
  }

  // ---- FLOATING TEXT ----
  function showFloatingText(element, text, type) {
    if (!element) return;

    const float = document.createElement('div');
    float.className = `floating-point ${type}`;
    float.textContent = text;

    const rect = element.getBoundingClientRect();
    float.style.left = (rect.left + rect.width / 2) + 'px';
    float.style.top = rect.top + 'px';

    document.body.appendChild(float);

    setTimeout(() => {
      if (float.parentNode) float.remove();
    }, 1300);
  }

  // ---- ACTIVITY LOG ----
  function logActivity(text) {
    const state = window.AppState;
    if (!state) return;
    if (!state.activityLog) state.activityLog = [];

    state.activityLog.unshift({
      id: 'act_' + Date.now(),
      text: text,
      badge: 'SANDBOX',
      timestamp: Date.now()
    });
  }

  // ---- INIT ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSandbox);
  } else {
    renderSandbox();
  }

  // ---- EXPOSE ----
  window.GenZModule = {
    triggerFight: triggerFight,
    slayBoost: slayBoost,
    skillIssuePenalty: skillIssuePenalty
  };

})();
