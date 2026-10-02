const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const audioToggle = document.querySelector('#audio-toggle');
const ambientAudio = document.querySelector('#ambient-audio');

// Menu mobile
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('is-open');
  });
});

// Controle de Áudio Atmosférico
if (audioToggle && ambientAudio) {
  const audioLabel = audioToggle.querySelector('.audio-label');

  const updateAudioState = (isPlaying) => {
    if (isPlaying) {
      audioToggle.classList.add('is-playing');
      audioToggle.setAttribute('aria-label', 'Pausar áudio ambiente');
      if (audioLabel) audioLabel.textContent = 'pausar atmosfera';
    } else {
      audioToggle.classList.remove('is-playing');
      audioToggle.setAttribute('aria-label', 'Tocar áudio ambiente');
      if (audioLabel) audioLabel.textContent = 'ouvir atmosfera';
    }
  };

  audioToggle.addEventListener('click', async () => {
    try {
      if (ambientAudio.paused) {
        await ambientAudio.play();
        updateAudioState(true);
      } else {
        ambientAudio.pause();
        updateAudioState(false);
      }
    } catch (err) {
      console.warn('Playback error:', err);
    }
  });

  ambientAudio.addEventListener('pause', () => updateAudioState(false));
  ambientAudio.addEventListener('play', () => updateAudioState(true));
  ambientAudio.addEventListener('ended', () => updateAudioState(false));
}

// Animação de entrada suave (Intersection Observer)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  revealItems.forEach((item) => observer.observe(item));
}

// Leve efeito de profundidade no hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!hero || prefersReducedMotion) return;
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  hero.style.setProperty('--hero-shift', `${progress * 12}px`);
}, { passive: true });
