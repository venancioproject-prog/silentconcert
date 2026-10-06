document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const audioToggle = document.querySelector('#audio-toggle');
  const heroPlayBtn = document.querySelector('#hero-play-btn');
  const ambientAudio = document.querySelector('#ambient-audio');
  const heroVideoBg = document.querySelector('.hero-video-bg');
  const expVideo1 = document.querySelector('#experience-video-1');
  const expVideo2 = document.querySelector('#experience-video-2');
  const ambientVideo = document.querySelector('#ambient-video');

  const expVideos = [expVideo1, expVideo2].filter(Boolean);
  let currentExpIndex = 0;

  expVideos.forEach((vid) => {
    vid.muted = true;
    vid.defaultMuted = true;
  });

  const playExpSequence = (index) => {
    currentExpIndex = index;
    expVideos.forEach((vid, i) => {
      if (i === index) {
        vid.currentTime = 0;
        vid.classList.add('is-active');
        vid.play().catch(() => {});
      } else {
        vid.classList.remove('is-active');
        vid.pause();
      }
    });
  };

  // Encadeia automaticamente os vídeos pós-play em sequência cíclica contínua
  expVideos.forEach((vid, i) => {
    vid.addEventListener('ended', () => {
      if (heroVideoBg?.classList.contains('is-experience')) {
        const nextIndex = (i + 1) % expVideos.length;
        playExpSequence(nextIndex);
      }
    });
  });

  // Garante que o vídeo de abertura inicial rode imediatamente e continue em looping contínuo
  if (ambientVideo) {
    ambientVideo.muted = true;
    ambientVideo.defaultMuted = true;
    ambientVideo.loop = true;

    const playAmbient = () => {
      if (ambientVideo.paused && !heroVideoBg?.classList.contains('is-experience')) {
        ambientVideo.play().catch(() => {});
      }
    };

    playAmbient();

    // Fallback garantido de reinício em caso de interrupção ou término do ciclo
    ambientVideo.addEventListener('ended', () => {
      ambientVideo.currentTime = 0;
      ambientVideo.play().catch(() => {});
    });

    window.addEventListener('scroll', playAmbient, { passive: true });
    window.addEventListener('click', playAmbient);
    window.addEventListener('touchstart', playAmbient);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) playAmbient();
    });
    window.addEventListener('focus', playAmbient);
  }

  // Demais vídeos em cards (Ori e Oxum)
  document.querySelectorAll('video.card-bg-video').forEach((vid) => {
    vid.muted = true;
    vid.defaultMuted = true;
    const tryPlay = () => vid.play().catch(() => {});
    tryPlay();
    window.addEventListener('scroll', tryPlay, { once: true, passive: true });
    window.addEventListener('click', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
  });

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

  // Controle de Áudio Atmosférico (Header + Botão de Destaque no Hero)
  if (ambientAudio) {
    const audioLabel = audioToggle?.querySelector('.audio-label');
    const heroPlayTitle = heroPlayBtn?.querySelector('.hero-play-title');
    const heroPlaySub = heroPlayBtn?.querySelector('.hero-play-sub');

    const updateAudioState = (isPlaying) => {
      if (isPlaying) {
        audioToggle?.classList.add('is-playing');
        audioToggle?.setAttribute('aria-label', 'Pausar áudio da apresentação');
        if (audioLabel) audioLabel.textContent = 'pausar áudio';

        heroPlayBtn?.classList.add('is-playing');
        heroPlayBtn?.setAttribute('aria-label', 'Pausar áudio');
        if (heroPlayTitle) heroPlayTitle.textContent = 'Pausar áudio';
        if (heroPlaySub) heroPlaySub.textContent = 'tocando agora';

        heroVideoBg?.classList.add('is-experience');
        playExpSequence(0);
      } else {
        audioToggle?.classList.remove('is-playing');
        audioToggle?.setAttribute('aria-label', 'Tocar áudio da apresentação');
        if (audioLabel) audioLabel.textContent = 'ouvir atmosfera';

        heroPlayBtn?.classList.remove('is-playing');
        heroPlayBtn?.setAttribute('aria-label', 'Coloque seu fone de ouvido e viva essa experiência');
        if (heroPlayTitle) heroPlayTitle.textContent = 'Coloque seu fone de ouvido';
        if (heroPlaySub) heroPlaySub.textContent = 'e viva essa experiência';

        heroVideoBg?.classList.remove('is-experience');
        expVideos.forEach((vid) => {
          vid.pause();
          vid.classList.remove('is-active');
        });
        if (ambientVideo && ambientVideo.paused) {
          ambientVideo.play().catch(() => {});
        }
      }
    };

    const togglePlayback = async () => {
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
    };

    audioToggle?.addEventListener('click', togglePlayback);
    heroPlayBtn?.addEventListener('click', togglePlayback);

    ambientAudio.addEventListener('pause', () => updateAudioState(false));
    ambientAudio.addEventListener('play', () => updateAudioState(true));
    ambientAudio.addEventListener('ended', () => updateAudioState(false));
  }

  // Animação de entrada suave (Intersection Observer)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
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
});
