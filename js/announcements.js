/**
 * ============================================================================
 * BIG BOSS ANNOUNCEMENT SYSTEM (VOICE SYNTHESIZER & BROADCAST HUD)
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Mandatory Requirement #9: Big Boss Announcements
 */

(function () {
  /**
   * AI Robotic Voice Synthesizer
   * Speaks decrees using browser SpeechSynthesis with authoritative pitch
   */
  function speakBigBoss(message) {
    if (!window.speechSynthesis) return;
    if (window.AppState && window.AppState.settings && window.AppState.settings.soundMuted) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.pitch = 0.65; // Deep authoritative Big Boss tone
    utterance.rate = 0.92;
    utterance.volume = 1.0;

    // Pick a dramatic voice if available
    const voices = window.speechSynthesis.getVoices();
    const deepVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Male') || v.name.includes('Natural') || v.name.includes('Google')));
    if (deepVoice) {
      utterance.voice = deepVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // Typewriter effect renderer
  function typewriteMessage(element, text, speed = 25) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  /**
   * Broadcasts a new Big Boss decree across UI, Ticker, and Voice
   */
  window.broadcastAnnouncement = function (text, type = 'danger') {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // 1. Play SFX
    if (window.playSfx) {
      window.playSfx('vineboom');
    }

    // 2. Dispatch state change
    if (window.dispatchStateChange) {
      window.dispatchStateChange('ANNOUNCEMENT_TRIGGER', {
        text: cleanText,
        type: type
      });
    }

    // 3. Trigger Robotic Voice Synthesizer
    speakBigBoss(cleanText);

    // 4. Update UI Components
    renderAnnouncementBanner(cleanText);
    renderAnnouncementTicker(cleanText);
  };

  function renderAnnouncementBanner(text) {
    const banner = document.getElementById('announcement-banner');
    if (!banner) return;

    banner.classList.remove('crt-glitch-text');
    void banner.offsetWidth; // reflow
    banner.classList.add('crt-glitch-text');

    const msgEl = banner.querySelector('.announcement-msg-text') || banner;
    typewriteMessage(msgEl, text);

    setTimeout(() => {
      banner.classList.remove('crt-glitch-text');
    }, 1500);
  }

  function renderAnnouncementTicker(text) {
    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🚨 BIG BOSS DECREE: ${text.toUpperCase()} • ALL CONTESTANTS TAKE POSITIONS •`;
    }
  }

  // Bind Broadcast Form Events
  function initAnnouncementUI() {
    const broadcastBtn = document.getElementById('broadcast-decree-btn');
    const inputEl = document.getElementById('decree-input');

    if (broadcastBtn && inputEl) {
      broadcastBtn.addEventListener('click', () => {
        const message = inputEl.value;
        if (message.trim()) {
          window.broadcastAnnouncement(message, 'danger');
          inputEl.value = '';
        }
      });

      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const message = inputEl.value;
          if (message.trim()) {
            window.broadcastAnnouncement(message, 'danger');
            inputEl.value = '';
          }
        }
      });
    }

    // Quick Decrees preset buttons
    const presetBtns = document.querySelectorAll('.quick-decree-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const decree = btn.getAttribute('data-decree');
        if (decree) {
          window.broadcastAnnouncement(decree, 'danger');
        }
      });
    });

    // Initial render from AppState
    if (window.AppState && window.AppState.latestAnnouncement) {
      renderAnnouncementBanner(window.AppState.latestAnnouncement);
      renderAnnouncementTicker(window.AppState.latestAnnouncement);
    }
  }

  // Subscribe to state change
  window.addEventListener('app:state-changed', (e) => {
    if (e.detail && e.detail.eventType === 'DEMO_STATE_LOADED') {
      if (window.AppState && window.AppState.latestAnnouncement) {
        renderAnnouncementBanner(window.AppState.latestAnnouncement);
        renderAnnouncementTicker(window.AppState.latestAnnouncement);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', initAnnouncementUI);
})();
