/**
 * ============================================================================
 * UNHINGED GEN-Z MEME BROADCASTER & BRAINROT SOUNDBOARD ENGINE
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Features:
 *  - 12 Viral Meme Slogans with Procedural SFX (Vine Boom, Metal Pipe, Womp Womp, Skibidi Beat, Airhorn)
 *  - Giant Screen-Wide Neo-Brutalist Meme Overlay Popups
 *  - 🎲 Unhinged Random Housemate Roast Generator (Dynamic Contestant Targeting)
 *  - 4 Crazy Voice Personas (GigaChad Sigma, TikTok Speedrun, Slay Baddie, Skibidi NPC)
 *  - Floating Animated Meme Sticker Bursts & Screen Shake Integration
 */

(function () {
  let activeVoiceMode = 'sigma'; // 'sigma' | 'speedrun' | 'slay' | 'npc'

  const VOICE_CONFIGS = {
    sigma: {
      pitch: 0.35,
      rate: 0.85,
      prefix: "Chat is this real? Big Boss decrees: ",
      suffix: " ... Bye bye! Mewing streak maintained. 🗿",
      sfx: "vineboom"
    },
    speedrun: {
      pitch: 1.7,
      rate: 1.65,
      prefix: "Yo yo listen up fast no cap Big Boss says: ",
      suffix: " ... speedrun done gg no re! ⚡",
      sfx: "metalpipe"
    },
    slay: {
      pitch: 1.45,
      rate: 1.25,
      prefix: "Periodt! Listen up besties no cap on god, Big Boss says: ",
      suffix: " ... Sheesh! Stand on business! Slay! 💅",
      sfx: "airhorn"
    },
    npc: {
      pitch: 1.25,
      rate: 1.3,
      prefix: "Ice cream so good! Emergency meeting Big Boss alert: ",
      suffix: " ... Gang gang yes yes! 🛸",
      sfx: "skibidi"
    }
  };

  const MEME_SLOGANS = {
    skibidi: {
      label: "🚽 SKIBIDI TOILET RIZZ",
      speech: "Skibidi dop dop dop yes yes! Level 10 Gyatt detected in Ohio!",
      sfx: "skibidi",
      emoji: "🚽",
      subtext: "OHIO RIZZ LEVEL: 9999 • NO CAP"
    },
    fanum: {
      label: "🍟 FANUM TAX YOINK",
      speech: "YOINK! Fanum tax collected on your rations! Hand over the pizza bro!",
      sfx: "cointax",
      emoji: "🍟",
      subtext: "COMMISSARY SNACKS CONFISCATED"
    },
    sigma: {
      label: "🗿 WHAT THE SIGMA",
      speech: "What the sigma?! Bro is literally mewing while committing syntax errors to main!",
      sfx: "vineboom",
      emoji: "🗿",
      subtext: "MEWING STREAK: ACTIVE • CHAD MODE"
    },
    l_ratio: {
      label: "💀 L + RATIO + SKILL ISSUE",
      speech: "L plus ratio plus caught in 4K plus massive skill issue plus touch grass plus you fell off!",
      sfx: "metalpipe",
      emoji: "💀",
      subtext: "BRO GOT CAUGHT IN 4K • RATIO'D"
    },
    aura_plus: {
      label: "⚡ +100K AURA BOOST",
      speech: "SHEESH! Plus 100,000 aura points! Unspoken rizz achieved! Bro is him!",
      sfx: "airhorn",
      emoji: "⚡",
      subtext: "MAXIMUM AURA UNLOCKED • BRO IS HIM"
    },
    aura_minus: {
      label: "📉 -50K NEGATIVE AURA",
      speech: "WOMP WOMP! Minus 50,000 aura points! Bro thought he was the main character!",
      sfx: "sadtrombone",
      emoji: "📉",
      subtext: "AURA BANKRUPTCY • WOMP WOMP"
    },
    cook: {
      label: "🍳 LET HIM COOK",
      speech: "Wait hold on chat... let him cook! Wait bro is burning down the entire kitchen!",
      sfx: "sheesh",
      emoji: "🍳",
      subtext: "HE IS IN THE KITCHEN • CHEF MODE"
    },
    chat: {
      label: "🚨 CHAT IS THIS REAL",
      speech: "Chat is this real or am I hallucinating in Ohio right now?!",
      sfx: "alarm",
      emoji: "🚨",
      subtext: "LIVE STREAM CHAT MELTDOWN"
    },
    cap: {
      label: "🧢 MASSIVE CAP DETECTED",
      speech: "CAP! Absolute colossal cap! Bro is capping harder than a graduation ceremony!",
      sfx: "bruh",
      emoji: "🧢",
      subtext: "LIE DETECTOR TEST FAILED: 100% CAP"
    },
    slay: {
      label: "💅 PERIODT SLAY BADDIE",
      speech: "Periodt! No cap on god, ate and left zero crumbs bestie! Pure baddie energy! Slay!",
      sfx: "airhorn",
      emoji: "💅",
      subtext: "ATE AND LEFT ZERO CRUMBS"
    },
    sus: {
      label: "🛸 SUSSY BAKA MEETING",
      speech: "EMERGENCY MEETING! Sussy baka vented in the coding den! Vote him out right now!",
      sfx: "sus",
      emoji: "🛸",
      subtext: "WHO VENTED IN SECTOR BETA?!"
    },
    npc: {
      label: "🍦 TIKTOK NPC GANG GANG",
      speech: "Ice cream so good! Gang gang yes yes! Thank you for the roses! Pop pop pop!",
      sfx: "beep",
      emoji: "🍦",
      subtext: "THANK YOU FOR THE GALAXY 🌹"
    }
  };

  /**
   * Giant Screen-Wide Neo-Brutalist Meme Overlay Popup
   */
  window.showGiantMemeOverlay = function (title, subtext, emoji = '🗿') {
    // Remove any existing overlay
    const old = document.getElementById('giant-meme-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'giant-meme-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%) scale(0.6) rotate(-3deg)';
    overlay.style.zIndex = '10000';
    overlay.style.background = '#FBF9F4';
    overlay.style.border = '5px solid #121214';
    overlay.style.boxShadow = '12px 12px 0px #121214';
    overlay.style.padding = '1.75rem 2.5rem';
    overlay.style.borderRadius = '16px';
    overlay.style.textAlign = 'center';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'all 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    overlay.style.maxWidth = '90vw';

    overlay.innerHTML = `
      <div style="font-size: 3.5rem; line-height: 1; margin-bottom: 0.5rem; animation: pulse 0.6s infinite alternate;">${emoji}</div>
      <div style="font-family: var(--font-serif); font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 900; color: #121214; letter-spacing: -0.02em; text-transform: uppercase;">
        ${title}
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; background: #FF5C98; color: #121214; display: inline-block; padding: 4px 14px; border: 2px solid #121214; border-radius: 999px; margin-top: 0.5rem; box-shadow: 3px 3px 0 #121214;">
        ${subtext}
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    });

    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transform = 'translate(-50%, -60%) scale(0.8) rotate(3deg)';
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 350);
    }, 2000);
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
    if (persona === 'sigma') {
      const deepVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Male') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
      if (deepVoice) utterance.voice = deepVoice;
    } else if (persona === 'slay' || persona === 'npc') {
      const femaleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha')));
      if (femaleVoice) utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Floating Animated Meme Sticker Bursts
   */
  window.triggerMemeBurst = function (emoji = '🗿') {
    const burstCount = 12;
    for (let i = 0; i < burstCount; i++) {
      const sticker = document.createElement('div');
      sticker.textContent = emoji;
      sticker.style.position = 'fixed';
      sticker.style.left = `${Math.random() * 85 + 5}vw`;
      sticker.style.top = `${Math.random() * 45 + 35}vh`;
      sticker.style.fontSize = `${Math.random() * 2.8 + 2}rem`;
      sticker.style.pointerEvents = 'none';
      sticker.style.zIndex = '9999';
      sticker.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(0)`;
      sticker.style.transition = 'all 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)';

      document.body.appendChild(sticker);

      setTimeout(() => {
        sticker.style.transform = `translateY(-140px) rotate(${Math.random() * 80 - 40}deg) scale(1.5)`;
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

    // 2. Trigger screen shake
    if (window.triggerScreenShake) window.triggerScreenShake();

    // 3. Float meme stickers across screen
    window.triggerMemeBurst(item.emoji);

    // 4. Show Giant Brutalist Meme Overlay
    window.showGiantMemeOverlay(item.label, item.subtext, item.emoji);

    // 5. Speak meme decree with crazy inflection
    if (window.speechSynthesis && (!window.AppState || !window.AppState.settings.soundMuted)) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.speech);
      const config = VOICE_CONFIGS[activeVoiceMode] || VOICE_CONFIGS.sigma;
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    // 6. Update banner & ticker
    const banner = document.getElementById('announcement-banner');
    if (banner) {
      const msgEl = banner.querySelector('.announcement-msg-text') || banner;
      msgEl.textContent = `🚨 ${item.label}: "${item.speech}"`;
    }

    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🚨 MEME ALERT: ${item.label} — "${item.speech.toUpperCase()}" • NO CAP •`;
    }

    if (window.triggerConfetti && (key === 'aura_plus' || key === 'cook' || key === 'slay')) {
      window.triggerConfetti();
    }
  };

  /**
   * 🎲 Unhinged Random Housemate Roast Generator
   * Dynamically roasts an active contestant in the house!
   */
  window.triggerRandomMemeRoast = function () {
    const state = window.AppState;
    let targetName = "Elena";
    if (state && state.contestants && state.contestants.length > 0) {
      const activeContestants = state.contestants.filter(c => c.status !== 'evicted');
      if (activeContestants.length > 0) {
        const rand = activeContestants[Math.floor(Math.random() * activeContestants.length)];
        targetName = rand.name;
      }
    }

    const ROAST_TEMPLATES = [
      {
        text: `Big Boss decree: ${targetName} just lost 100,000 aura points for pushing directly to main! Sentenced to Ohio!`,
        sfx: 'metalpipe',
        emoji: '💀',
        badge: 'MINUS 100K AURA'
      },
      {
        text: `ALERT! ${targetName} was caught paying the Fanum Tax on the house snacks! Sussy baka detected!`,
        sfx: 'cointax',
        emoji: '🍟',
        badge: 'FANUM TAX CONFISCATION'
      },
      {
        text: `Chat is this real?! ${targetName} tried to rizz up the camera and lost all immunity shields! L bozo!`,
        sfx: 'sadtrombone',
        emoji: '🚨',
        badge: 'IMMUNITY TERMINATED'
      },
      {
        text: `Big Boss announces: ${targetName} has officially broken their mewing streak! Massive skill issue!`,
        sfx: 'vineboom',
        emoji: '🗿',
        badge: 'MEWING STREAK BROKEN'
      },
      {
        text: `SHEESH! ${targetName} stood on business and secured plus 50k aura! Let them cook in the kitchen!`,
        sfx: 'airhorn',
        emoji: '🔥',
        badge: 'STAND ON BUSINESS'
      },
      {
        text: `Emergency meeting! ${targetName} vented in the server room and deleted the production database!`,
        sfx: 'sus',
        emoji: '🛸',
        badge: 'IMPOSTOR IDENTIFIED'
      }
    ];

    const pick = ROAST_TEMPLATES[Math.floor(Math.random() * ROAST_TEMPLATES.length)];

    // Play SFX & Shake
    if (window.playSfx) window.playSfx(pick.sfx);
    if (window.triggerScreenShake) window.triggerScreenShake();
    window.triggerMemeBurst(pick.emoji);
    window.showGiantMemeOverlay(`🚨 ROAST: ${targetName.toUpperCase()}`, pick.badge, pick.emoji);

    // Speak
    if (window.speechSynthesis && (!state || !state.settings.soundMuted)) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(pick.text);
      const config = VOICE_CONFIGS[activeVoiceMode] || VOICE_CONFIGS.sigma;
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;
      window.speechSynthesis.speak(utterance);
    }

    // Update banner & ticker
    const banner = document.getElementById('announcement-banner');
    if (banner) {
      const msgEl = banner.querySelector('.announcement-msg-text') || banner;
      msgEl.textContent = `🎯 ROAST TARGET [${targetName}]: "${pick.text}"`;
    }

    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🔥 HOUSE ROAST: ${pick.text.toUpperCase()} •`;
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

    // 2. Trigger floating stickers & screen shake
    window.triggerMemeBurst('🔥');
    if (window.triggerScreenShake) window.triggerScreenShake();
    window.showGiantMemeOverlay('📢 BIG BOSS DECREE', 'BROADCAST SENT • NO CAP', '📢');

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
      msgEl.textContent = `${VOICE_LABEL(activeVoiceMode)}: "${cleanText}"`;
    }
    const ticker = document.getElementById('announcement-ticker');
    if (ticker) {
      ticker.textContent = `🚨 BIG BOSS DECREE: ${cleanText.toUpperCase()} • NO CAP ON GOD •`;
    }
  };

  function VOICE_LABEL(mode) {
    switch (mode) {
      case 'sigma': return '🗿 GIGACHAD SIGMA';
      case 'speedrun': return '⚡ TIKTOK SPEEDRUN';
      case 'slay': return '💅 SLAY BADDIE';
      case 'npc': return '🍦 TIKTOK NPC';
      default: return '📢 BIG BOSS';
    }
  }

  // Voice Persona Switcher
  window.setVoiceMode = function (mode) {
    activeVoiceMode = mode;
    if (window.playSfx) {
      const sfx = (mode === 'sigma') ? 'vineboom' : (mode === 'speedrun' ? 'metalpipe' : (mode === 'slay' ? 'airhorn' : 'skibidi'));
      window.playSfx(sfx);
    }
    const badge = document.getElementById('voice-mode-badge');
    if (badge) {
      badge.textContent = `VOICE: ${VOICE_LABEL(mode)}`;
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
