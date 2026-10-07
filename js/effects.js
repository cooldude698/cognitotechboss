/**
 * ============================================================================
 * VISUAL EFFECTS (MATRIX RAIN, SCREEN SHAKE, FLOATING POINTS, CCTV SIMULATOR)
 * ============================================================================
 */

(function () {
  // 1. Matrix Code Rain Canvas
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const characters = '0123456789ABCDEFTECHBOSS⚡👁️';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(251, 249, 244, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#121214';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 50);
  }

  // 2. Earth-Shattering Screen Shake
  window.triggerScreenShake = function () {
    const body = document.body;
    body.classList.remove('screen-shake-active');
    void body.offsetWidth; // Force reflow
    body.classList.add('screen-shake-active');

    setTimeout(() => {
      body.classList.remove('screen-shake-active');
    }, 600);
  };

  // 3. Floating Points Pop-up Indicator (+50, -25)
  window.triggerFloatingPoints = function (targetEl, delta) {
    if (!targetEl) return;

    const floatEl = document.createElement('div');
    floatEl.className = `floating-points-tag ${delta >= 0 ? 'positive' : 'negative'}`;
    floatEl.textContent = `${delta >= 0 ? '+' : ''}${delta} PTS`;

    targetEl.style.position = 'relative';
    targetEl.appendChild(floatEl);

    setTimeout(() => {
      if (floatEl.parentNode) {
        floatEl.parentNode.removeChild(floatEl);
      }
    }, 1200);
  };

  // 4. Confetti Blast FX
  window.triggerConfetti = function () {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4F77C', '#FEE159', '#FF5C98', '#121214']
      });
    }
  };

  // 5. CCTV Camera Real-Time Timecode Generator
  function initCCTVTelemetry() {
    const timeEls = document.querySelectorAll('.cctv-live-time');
    if (!timeEls.length) return;

    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds() / 100));
      timeEls.forEach(el => {
        el.textContent = timeStr;
      });
    }, 100);
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initCCTVTelemetry();
  });
})();
