/**
 * ============================================================================
 * UNHINGED GEN-Z MEME BROADCASTER & BRAINROT SOUNDBOARD ENGINE
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Features:
 *  - 4 Crazy Voice Persona Modulators (GigaChad Sigma, Slay Baddie, L Bozo, Sussy Impostor)
 *  - Instant Gen-Z Meme Soundboard (What The Sigma, Chat Is This Real, Let Him Cook, Bruh)
 *  - Procedural Meme SFX (Bruh, Sus, Vine Boom, Airhorn, Sheesh)
 *  - Floating Animated Meme Sticker Bursts (🗿, 💀, 💅, 🍳, 🛸, 🔥)
 */

(function () {
  let activeVoiceMode = 'sigma'; // 'sigma' | 'slay' | 'lbozo' | 'sus'

  const VOICE_CONFIGS = {
    sigma: {
      pitch: 0.35,
      rate: 0.88,
      prefix: "Chat is this real? Big Boss decrees: ",
      suffix: " ... Bye bye! Mewing streak maintained. 🗿",
      sfx: "vineboom"
    },
    slay: {
      pitch: 1.45,
      rate: 1.25,
      prefix: "Periodt! No cap listen up besties, Big Boss says: ",
      suffix: " ... Sheesh! Stand on business! 💅",
      sfx: "airhorn"
    },
    lbozo: {
      pitch: 0.85,
      rate: 1.15,
      prefix: "Bro think he on the team! Big Boss alert: ",
      suffix: " ... Total skill issue, L bozo! 💀",
      sfx: "bruh"
    },
    sus: {
      pitch: 1.65,
      rate: 1.35,
      prefix: "EMERGENCY MEETING! Sussy baka detected: ",
      suffix: " ... He is definitely the impostor! 🛸",
      sfx: "sus"
    }
  };

  const MEME_SLOGANS = {
    sigma: {
      label: "🗿 WHAT THE SIGMA",
      speech: "What the sigma?! Bro is literally standing on business!",
      sfx: "vineboom",
      emoji: "🗿"
    },
    chat: {
      label: "🚨 CHAT IS THIS REAL",
      speech: "Chat is this real?! Bro got caught in 4K with negative aura points!",
      sfx: "alarm",
      emoji: "🚨"
    },
    skill_issue: {
      label: "💀 SKILL ISSUE / L BOZO",
      speech: "Massive skill issue detected! L bozo, ratio plus you fell off!",
      sfx: "bruh",
      emoji: "💀"
    },
    cook: {
      label: "🍳 LET HIM COOK",
      speech: "Wait a minute... hold on chat, let him cook! He is in the kitchen!",
      sfx: "sheesh",
      emoji: "🍳"
    },
    sus: {
      label: "🛸 SUSSY IMPOSTOR",
      speech: "Sussy baka alert! Emergency meeting! Who vented in the ration room?!",
      sfx: "sus",
      emoji: "🛸"
    },
    sheesh: {
      label: "🔥 SHEESH / HUGE W",
      speech: "SHEESH! Major W for the tech house! Bro dropped 500 aura points!",
      sfx: "airhorn",
      emoji: "🔥"
    }
  };

  /**
   * Gen-Z Speech Synthesizer with Meme Inflection
   */
  function speakGenZ(message, persona = activeVoiceMode) {
    if (!window.speechSynthesis) return;
    if (window.AppState && window.AppState.settings && window.AppState.settings.soundMuted) return;

    window.speechSynthesis.cancel();

    const config = VOICE_CONFIGS[persona] || VOICE_CONFIGS.sigma;
    const fullText = `${config.prefix}${message}${config.suffix}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;
    utterance.volume = 1.0;

    // Pick dynamic voice
    const voices = window.speechSynthesis.getVoices();
    if (persona === 'sigma' || persona === 'lbozo') {
      const deepVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Male') || v.name.includes('Natural') || v.name.includes('Google')));
      if (deepVoice) utterance.voice = deepVoice;
    } else {
      const highVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Zira')));
      if (highVoice) utterance.voice = highVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Floating Animated Meme Sticker Bursts (🗿, 💀, 💅, 🍳, 🛸)
   */
  window.triggerMemeBurst = function (emoji = '🗿') {
    const burstCount = 10;
    for (let i = 0; i < burstCount; i++) {
      const sticker = document.createElement('div');
      sticker.textContent = emoji;
      sticker.style.position = 'fixed';
      sticker.style.left = `${Math.random() * 80 + 10}vw`;
      sticker.style.top = `${Math.random() * 40 + 40}vh`;
      sticker.style.fontSize = `${Math.random() * 2.5 + 2}rem`;
      sticker.style.pointerEvents = 'none';
      sticker.style.zIndex = '9999';
      sticker.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(0)`;
      sticker.style.transition = 'all 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)';

      document.body.appendChild(sticker);

      setTimeout(() => {
        sticker.style.transform = `translateY(-120px) rotate(${Math.random() * 80 - 40}deg) scale(1.4)`;
        sticker.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        if (sticker.parentNode) sticker.parentNode.removeChild(sticker);
      }, 1300);
    }
  };

  /**
   * Plays Instant Gen-Z Meme Slogan from Soundboard
   */
  window.triggerMemeSlogan = function (key) {
    const item = MEME_SLOGANS[key];
    if (!item) return;

    // 1. Play procedural meme SFX
    if (window.playSfx) window.playSfx(item.sfx);

    // 2. Trigger screen shake on intense memes
    if (key === 'sigma' || key === 'chat' || key === 'skill_issue') {
      if (window.triggerScreenShake) window.triggerScreenShake();
    }

    // 3. Float meme stickers across screen
    window.triggerMemeBurst(item.emoji);

    // 4. Speak meme decree with crazy inflection
    if (window.speechSynthesis && (!window.AppState || !window.AppState.settings.soundMuted)) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.speech);
      utterance.pitch = (key === 'sigma') ? 0.35 : (key === 'cook' ? 1.3 : 1.1);
      utterance.rate = 1.15;
      window.speechSynthesis.speak(utterance);
    }

    // 5. Update banner & ticker
    const banner = document.getElementById('announcement-banner');
    if (banner) {
      const msgEl = banner.querySelector('.announcement-msg-text') || banner;
      msgEl.textContent = `🚨 ${item.label}: ${item.speech}`;
    }

    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🚨 MEME ALERT: ${item.label} — "${item.speech.toUpperCase()}" •`;
    }

    if (window.triggerConfetti && (key === 'sheesh' || key === 'cook')) {
      window.triggerConfetti();
    }
  };

  /**
   * Broadcasts a custom typed decree with Gen-Z flair
   */
  window.broadcastAnnouncement = function (text, type = 'danger') {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // 1. Play SFX matching active voice mode
    const config = VOICE_CONFIGS[activeVoiceMode] || VOICE_CONFIGS.sigma;
    if (window.playSfx) window.playSfx(config.sfx);

    // 2. Trigger floating stickers
    window.triggerMemeBurst('🔥');

    // 3. Dispatch state change
    if (window.dispatchStateChange) {
      window.dispatchStateChange('ANNOUNCEMENT_TRIGGER', {
        text: cleanText,
        type: type
      });
    }

    // 4. Speak with active Gen-Z voice persona
    speakGenZ(cleanText, activeVoiceMode);

    // 5. Update UI
    const banner = document.getElementById('announcement-banner');
    if (banner) {
      const msgEl = banner.querySelector('.announcement-msg-text') || banner;
      msgEl.textContent = `${VOITE_LABEL(activeVoiceMode)}: "${cleanText}"`;
    }
    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🚨 BIG BOSS DECREE: ${cleanText.toUpperCase()} • NO CAP ON GOD •`;
    }
  };

  function VOITE_LABEL(mode) {
    switch (mode) {
      case 'sigma': return '🗿 GIGACHAD SIGMA';
      case 'slay': return '💅 SLAY BADDIE';
      case 'lbozo': return '💀 L BOZO';
      case 'sus': return '🛸 SUSSY IMPOSTOR';
      default: return '📢 BIG BOSS';
    }
  }

  // Voice Persona Switcher
  window.setVoiceMode = function (mode) {
    activeVoiceMode = mode;
    if (window.playSfx) window.playSfx('beep');
    const badge = document.getElementById('voice-mode-badge');
    if (badge) {
      badge.textContent = `VOICE: ${VOITE_LABEL(mode)}`;
    }
  };

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

    // Quick Gen-Z Decrees Presets
    const presetBtns = document.querySelectorAll('.quick-decree-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const decree = btn.getAttribute('data-decree');
        if (decree) {
          window.broadcastAnnouncement(decree, 'danger');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initAnnouncementUI);
})();
