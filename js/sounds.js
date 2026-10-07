/**
 * ============================================================================
 * PROCEDURAL WEB AUDIO SYNTHESIZER (ZERO-DEPENDENCY AUDIO ENGINE)
 * ============================================================================
 * Architect: Vedesh (Lead Architect)
 * Zero external asset dependencies. Procedurally synthesized SFX.
 */

(function () {
  let audioCtx = null;
  let isMuted = false;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Sound Engine Object
  window.SoundEngine = {
    isMuted: () => isMuted,

    toggleMute: function () {
      isMuted = !isMuted;
      if (window.AppState && window.AppState.settings) {
        window.AppState.settings.soundMuted = isMuted;
      }
      return isMuted;
    },

    // 1. Tactical Beep (UI Click / Toggle)
    playBeep: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    },

    // 2. Airhorn (Captaincy Coronation / MVP Victory)
    playAirhorn: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const freqs = [311.13, 311.13, 466.16];
      const now = ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.22, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.28);
      });
    },

    // 3. Vine Boom (Low-frequency 55Hz dramatic bass drop with distortion)
    playVineBoom: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    },

    // 4. Danger Alarm Siren (Oscillating 440Hz -> 880Hz square wave)
    playAlarm: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.2);
      osc.frequency.linearRampToValueAtTime(440, now + 0.4);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    },

    // 5. Thanos Snap / Disintegration (White Noise Burst with decay)
    playSnap: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    },

    // 6. Meme "Bruh" Sound (Vocal Formant Glide)
    playBruh: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.45);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.value = 4.0;

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    },

    // 7. Among Us Sussy Impostor 4-Note Jingle
    playSus: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 622.25, 698.46, 739.99]; // C5, Eb5, F5, F#5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0.25, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.15);
      });
    },

    // 8. "Sheesh" High Pitch Slide
    playSheesh: function () {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1900, now + 0.35);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }
  };

  /**
   * Global Universal SFX Helper
   * @param {string} type 'beep' | 'airhorn' | 'vineboom' | 'alarm' | 'snap' | 'bruh' | 'sus' | 'sheesh'
   */
  window.playSfx = function (type) {
    switch (type) {
      case 'beep':
        window.SoundEngine.playBeep();
        break;
      case 'airhorn':
        window.SoundEngine.playAirhorn();
        break;
      case 'vineboom':
      case 'gavel':
        window.SoundEngine.playVineBoom();
        break;
      case 'alarm':
      case 'buzzer':
        window.SoundEngine.playAlarm();
        break;
      case 'snap':
        window.SoundEngine.playSnap();
        break;
      case 'bruh':
        window.SoundEngine.playBruh();
        break;
      case 'sus':
        window.SoundEngine.playSus();
        break;
      case 'sheesh':
        window.SoundEngine.playSheesh();
        break;
      default:
        window.SoundEngine.playBeep();
        break;
    }
  };

  window.toggleSound = function () {
    const muted = window.SoundEngine.toggleMute();
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.innerHTML = muted
        ? '<i class="fa-solid fa-volume-xmark"></i> Muted'
        : '<i class="fa-solid fa-volume-high"></i> Sound FX';
      btn.classList.toggle('btn-danger', muted);
      btn.classList.toggle('btn-yellow', !muted);
    }
    return muted;
  };
})();
