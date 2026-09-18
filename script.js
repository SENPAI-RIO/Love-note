/**
 * Cute Retro Pixel Art Interactive Logic & Sound Engine
 * Author: Michi for Trevor
 */

// Global State
let noClickCount = 0;
let yesScale = 1;
const MAX_NO_CLICKS = 3;

// Web Audio API Synthesizer for 8-Bit Retro Sound Effects
class RetroAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute short blip sound when clicking NO
  playNoSound() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    // Pitch drops down boing sound
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Rising pitch chime sound when YES button grows or is clicked
  playGrowSound() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(400 + (noClickCount * 120), now);
    osc.frequency.exponentialRampToValueAtTime(650 + (noClickCount * 120), now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Playful dialogue popup sound ("GOOD BOY!")
  playDialogueSound() {
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const now = this.ctx.currentTime + (idx * 0.08);

      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    });
  }

  // Victory fanfare on reaching YAY screen
  playVictoryMelody() {
    this.init();
    if (!this.ctx) return;

    const arpeggio = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51];
    arpeggio.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const start = this.ctx.currentTime + (index * 0.09);

      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.25);
    });
  }
}

const audio = new RetroAudioEngine();

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  generateStarrySky();

  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const dialogueModal = document.getElementById('dialogueModal');
  const btnModalOk = document.getElementById('btnModalOk');
  const btnContinue = document.getElementById('btnContinue');
  const screenQuestion = document.getElementById('screenQuestion');
  const screenVictory = document.getElementById('screenVictory');

  // NO Button Click Handler
  if (btnNo) {
    btnNo.addEventListener('click', () => {
      noClickCount++;
      audio.playNoSound();

      // Scale up YES button progressively
      yesScale += 0.35;
      if (btnYes) btnYes.style.setProperty('--btn-scale', yesScale);
      
      // Play grow sound effect
      setTimeout(() => audio.playGrowSound(), 50);

      // If clicked more than 3 times (i.e. on/after 3rd or 4th click)
      if (noClickCount >= MAX_NO_CLICKS) {
        // Disintegrate & hide NO button
        btnNo.classList.add('disappearing');
        
        setTimeout(() => {
          btnNo.style.display = 'none';
          if (btnYes) {
            btnYes.classList.add('highlighted');
            btnYes.style.setProperty('--btn-scale', Math.max(yesScale, 1.8));
          }
        }, 450);
      }
    });
  }

  // YES Button Click Handler
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      audio.playDialogueSound();
      
      // Show Retro Dialogue Box ("GOOD BOY!")
      if (dialogueModal) dialogueModal.classList.remove('hidden-modal');
      
      // Spawn confetti in the background of the modal
      spawnHeartConfetti();
    });
  }

  // Dialogue Modal OK Button Click Handler
  if (btnModalOk) {
    btnModalOk.addEventListener('click', () => {
      // Hide Modal
      if (dialogueModal) dialogueModal.classList.add('hidden-modal');

      // Transition to Screen 2 ("YAY!")
      if (screenQuestion) {
        screenQuestion.classList.remove('active-screen');
        screenQuestion.classList.add('hidden-screen');
      }

      if (screenVictory) {
        screenVictory.classList.remove('hidden-screen');
        screenVictory.classList.add('active-screen');
      }

      // Play Victory Chime
      audio.playVictoryMelody();
      spawnHeartConfetti();
    });
  }

  // Continue Button Handler on Victory Screen
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      audio.playDialogueSound();
      spawnHeartConfetti();
      
      // Transition to Screen 3 (Scrollable Text Wall)
      if (screenVictory) {
        screenVictory.classList.remove('active-screen');
        screenVictory.classList.add('hidden-screen');
      }
      const screenTextWall = document.getElementById('screenTextWall');
      if (screenTextWall) {
        screenTextWall.classList.remove('hidden-screen');
        screenTextWall.classList.add('active-screen');
      }
    });
  }

  // View Memories Button Handler
  const btnMemories = document.getElementById('btnMemories');
  const screenTextWall = document.getElementById('screenTextWall');
  const screenMemories = document.getElementById('screenMemories');

  if (btnMemories) {
    btnMemories.addEventListener('click', () => {
      audio.playDialogueSound();
      spawnHeartConfetti();
      
      if (screenTextWall) {
        screenTextWall.classList.remove('active-screen');
        screenTextWall.classList.add('hidden-screen');
      }
      if (screenMemories) {
        screenMemories.classList.remove('hidden-screen');
        screenMemories.classList.add('active-screen');
      }
    });
  }

  // Back Button Handlers
  const btnBackTo1 = document.getElementById('btnBackTo1');
  const btnBackTo2 = document.getElementById('btnBackTo2');
  const btnBackTo3 = document.getElementById('btnBackTo3');

  if (btnBackTo1) {
    btnBackTo1.addEventListener('click', () => {
      audio.playNoSound(); // Play a blip
      if (screenVictory) {
        screenVictory.classList.remove('active-screen');
        screenVictory.classList.add('hidden-screen');
      }
      if (screenQuestion) {
        screenQuestion.classList.remove('hidden-screen');
        screenQuestion.classList.add('active-screen');
      }
      // Reset state for Question screen
      noClickCount = 0;
      yesScale = 1;
      if (btnYes) {
        btnYes.classList.remove('highlighted');
        btnYes.style.setProperty('--btn-scale', yesScale);
      }
      if (btnNo) {
        btnNo.classList.remove('disappearing');
        btnNo.style.display = '';
        btnNo.style.opacity = '1';
        btnNo.style.pointerEvents = 'auto';
      }
    });
  }

  if (btnBackTo2) {
    btnBackTo2.addEventListener('click', () => {
      audio.playNoSound();
      if (screenTextWall) {
        screenTextWall.classList.remove('active-screen');
        screenTextWall.classList.add('hidden-screen');
      }
      if (screenVictory) {
        screenVictory.classList.remove('hidden-screen');
        screenVictory.classList.add('active-screen');
      }
    });
  }

  if (btnBackTo3) {
    btnBackTo3.addEventListener('click', () => {
      audio.playNoSound();
      if (screenMemories) {
        screenMemories.classList.remove('active-screen');
        screenMemories.classList.add('hidden-screen');
      }
      if (screenTextWall) {
        screenTextWall.classList.remove('hidden-screen');
        screenTextWall.classList.add('active-screen');
      }
    });
  }
});

// Dynamic Starry Night Sky Generator
function generateStarrySky() {
  const starsContainer = document.getElementById('starsLayer');
  if (!starsContainer) return;

  const starCount = 30;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 90}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.opacity = `${0.3 + Math.random() * 0.7}`;
    starsContainer.appendChild(star);
  }
}

// Retro Pixel Heart Sparkles Effect on Victory
function spawnHeartConfetti() {
  const card = document.querySelector('.pixel-card');
  if (!card) return;

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.position = 'absolute';
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${20 + Math.random() * 50}%`;
    heart.style.fontSize = `${14 + Math.random() * 16}px`;
    // We hardcode colors if CSS vars aren't defined
    heart.style.color = Math.random() > 0.5 ? '#CDBAED' : '#FFFFFF';
    heart.style.zIndex = '50';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out';
    heart.style.transform = `translateY(0) scale(1)`;

    card.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(-${60 + Math.random() * 60}px) scale(${1.2 + Math.random() * 0.5})`;
      heart.style.opacity = '0';
    }, 50);

    setTimeout(() => heart.remove(), 1300);
  }
}
