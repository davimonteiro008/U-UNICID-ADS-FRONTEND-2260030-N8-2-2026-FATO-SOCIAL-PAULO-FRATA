/* ==========================================================================
   FATO SOCIAL — Central Multimídia Conectada (YouTube + Podcast Vozes do Bairro)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initConnectedYouTubeHub();
  initConnectedPodcastHub();
});

const VIDEO_CATALOG = {
  ods: {
    id: 'uWqvUO3LIZY',
    youtubeUrl: 'https://www.youtube.com/watch?v=uWqvUO3LIZY',
    badge: 'Vídeo 01 • Agenda 2030 & ODS • ONU Brasil',
    title: 'Você conhece os 17 Objetivos de Desenvolvimento Sustentável?',
    desc: 'Entenda como nossas ações locais de erradicação da pobreza, educação de qualidade e ação climática se conectam às metas globais da ONU.',
    transcript: 'Apresentação oficial da ONU Brasil sobre os 17 Objetivos de Desenvolvimento Sustentável (ODS) estabelecidos para transformar o mundo até 2030, destacando a atuação comunitária na redução das desigualdades, educação tecnológica e preservação ambiental.',
    chapters: [
      { start: 0, label: '00:00 — Introdução à Agenda 2030' },
      { start: 45, label: '00:45 — Erradicação da Pobreza e Inclusão' },
      { start: 95, label: '01:35 — Ação Climática e Comunidades' }
    ]
  },
  economia: {
    id: 'TCwIGf9sM3Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=TCwIGf9sM3Q',
    badge: 'Vídeo 02 • Economia Circular • Yattó',
    title: 'Logística Reversa e Economia Circular: Como Funciona na Prática?',
    desc: 'Descubra o modelo econômico que inspira nossos mutirões de triagem, reaproveitamento de materiais e logística reversa.',
    transcript: 'Explicação prática sobre a transição da economia linear (extrair, produzir, descartar) para a logística reversa e economia circular, onde resíduos sólidos e eletrônicos são reintegrados como insumos contínuos.',
    chapters: [
      { start: 0, label: '00:00 — Limites da Economia Linear' },
      { start: 60, label: '01:00 — Ciclos Técnico e Biológico' },
      { start: 130, label: '02:10 — Logística Reversa na Prática' }
    ]
  },
  coleta: {
    id: '1zJd9xcYl_o',
    youtubeUrl: 'https://www.youtube.com/watch?v=1zJd9xcYl_o',
    badge: 'Vídeo 03 • Educação Ambiental • Info Sustentável',
    title: 'Como Funciona a Coleta Seletiva e o Ciclo dos Resíduos',
    desc: 'Material educativo utilizado em nossas oficinas escolares para demonstrar a importância da separação correta na fonte.',
    transcript: 'O vídeo apresenta o funcionamento da coleta seletiva, a identificação correta dos materiais recicláveis e como a triagem comunitária reduz a contaminação do solo e dos rios.',
    chapters: [
      { start: 0, label: '00:00 — O Destino do Lixo Urbano' },
      { start: 50, label: '00:50 — Triagem na Fonte' },
      { start: 110, label: '01:50 — Impacto da Reciclagem' }
    ]
  }
};

const PODCAST_EPISODES = {
  ep01: {
    meta: 'Episódio 01 • Triagem & Condomínios • Duração: 00:06',
    title: 'Como Organizar um Ponto de Coleta no Seu Condomínio',
    src: 'assets/audio/episodio-01-triagem.wav',
    segments: [
      { time: 0, label: '00:00', text: '[Vinheta musical em piano] Olá, comunidade Fato Social! Seja bem-vindo ao Podcast Vozes do Bairro.' },
      { time: 2, label: '00:02', text: 'Para iniciar um ponto de coleta seletiva no seu prédio ou escola, separe três recipientes identificados: papel limpo, plásticos secos e metais.' },
      { time: 4, label: '00:04', text: 'Nossa equipe comunitária realiza a retirada agendada toda sexta-feira, das 08h às 16h, com emissão de recibo ambiental.' }
    ]
  },
  ep02: {
    meta: 'Episódio 02 • Educação & TI • Duração: 00:06',
    title: 'Inclusão Digital: Primeiros Passos na Programação Web',
    src: 'assets/audio/episodio-02-inclusao.wav',
    segments: [
      { time: 0, label: '00:00', text: '[Vinheta harmônica] Bem-vindos ao boletim de educação tecnológica do Vozes do Bairro!' },
      { time: 2, label: '00:02', text: 'Nas nossas oficinas gratuitas na Zona Leste, moradores aprendem a estruturar páginas acessíveis com HTML semântico e CSS responsivo.' },
      { time: 4, label: '00:04', text: 'As turmas contam com mentoria de voluntários de TI e preparação prática para vagas de estágio e jovem aprendiz.' }
    ]
  },
  ep03: {
    meta: 'Episódio 03 • Economia Circular • Duração: 00:06',
    title: 'Boletim Sonoro: Logística Reversa de Eletrônicos',
    src: 'assets/audio/episodio-01-triagem.wav',
    segments: [
      { time: 0, label: '00:00', text: '[Abertura institucional Fato Social] Você tem notebooks antigos, cabos ou teclados sem uso em casa?' },
      { time: 2, label: '00:02', text: 'No nosso polo de logística reversa, cada equipamento passa por triagem técnica, limpeza e recondicionamento seguro.' },
      { time: 4, label: '00:04', text: 'As máquinas recuperadas equipam laboratórios comunitários e garantem inclusão digital para estudantes da rede pública.' }
    ]
  }
};

function initConnectedYouTubeHub() {
  const iframe = document.getElementById('main-yt-iframe');
  if (!iframe) return;

  const badgeEl = document.getElementById('stage-video-badge');
  const titleEl = document.getElementById('stage-video-title');
  const descEl = document.getElementById('stage-video-desc');
  const transcriptEl = document.getElementById('stage-video-transcript');
  const externalLinkEl = document.getElementById('stage-yt-external-link');
  const chaptersEl = document.getElementById('stage-video-chapters');
  const ytWrapper = document.getElementById('yt-player-wrapper');
  const localWrapper = document.getElementById('local-video-wrapper');
  const fileNotice = document.getElementById('file-protocol-notice');
  const btnModeYt = document.getElementById('btn-mode-yt');
  const btnModeLocal = document.getElementById('btn-mode-local');

  function setPlayerMode(mode) {
    const isLocal = mode === 'local';
    if (ytWrapper) ytWrapper.style.display = isLocal ? 'none' : 'block';
    if (localWrapper) localWrapper.style.display = isLocal ? 'block' : 'none';
    if (btnModeYt) {
      btnModeYt.classList.toggle('active', !isLocal);
      btnModeYt.setAttribute('aria-pressed', String(!isLocal));
    }
    if (btnModeLocal) {
      btnModeLocal.classList.toggle('active', isLocal);
      btnModeLocal.setAttribute('aria-pressed', String(isLocal));
    }
  }

  if (window.location.protocol === 'file:') {
    setPlayerMode('local');
    if (fileNotice) fileNotice.style.display = 'block';
  }

  if (btnModeYt) btnModeYt.addEventListener('click', () => setPlayerMode('youtube'));
  if (btnModeLocal) btnModeLocal.addEventListener('click', () => setPlayerMode('local'));

  function loadVideo(key, startSeconds = 0, autoplay = false) {
    const item = VIDEO_CATALOG[key] || VIDEO_CATALOG.ods;
    const autoParam = autoplay ? '&autoplay=1' : '';
    iframe.src = `https://www.youtube-nocookie.com/embed/${item.id}?rel=0&modestbranding=1&hl=pt-BR&cc_lang_pref=pt&cc_load_policy=1&start=${startSeconds}${autoParam}`;
    iframe.title = item.title;

    if (badgeEl) badgeEl.textContent = item.badge;
    if (titleEl) titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.desc;
    if (transcriptEl) transcriptEl.textContent = item.transcript;
    if (externalLinkEl && item.youtubeUrl) {
      externalLinkEl.href = item.youtubeUrl;
      externalLinkEl.setAttribute('aria-label', `Assistir "${item.title}" diretamente no YouTube`);
    }

    document.querySelectorAll('.video-playlist-card').forEach(card => {
      card.classList.toggle('active', card.dataset.videoKey === key);
    });

    if (chaptersEl) {
      chaptersEl.innerHTML = item.chapters.map((ch, idx) => `
        <button type="button" class="chapter-btn ${idx === 0 && startSeconds === 0 ? 'active' : ''}" data-start="${ch.start}">
          ${ch.label}
        </button>
      `).join('');

      chaptersEl.querySelectorAll('.chapter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sec = parseInt(btn.dataset.start || '0', 10);
          chaptersEl.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const localVideo = document.getElementById('main-local-video');
          if (localWrapper && localWrapper.style.display === 'block' && localVideo) {
            localVideo.currentTime = Math.min(sec, localVideo.duration || sec);
            localVideo.play().catch(() => {});
          } else {
            iframe.src = `https://www.youtube-nocookie.com/embed/${item.id}?rel=0&modestbranding=1&hl=pt-BR&cc_lang_pref=pt&cc_load_policy=1&start=${sec}&autoplay=1`;
          }
        });
      });
    }

    localStorage.setItem('fatoSocialLastVideo', key);
  }

  document.querySelectorAll('.select-video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.videoKey;
      loadVideo(key, 0, true);
      document.getElementById('video-stage-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  const params = new URLSearchParams(window.location.search);
  const requestedVideo = params.get('video');
  const hash = window.location.hash;

  if (requestedVideo && VIDEO_CATALOG[requestedVideo]) {
    loadVideo(requestedVideo, 0, false);
  } else if (hash === '#video-economia') {
    loadVideo('economia', 0, false);
  } else if (hash === '#video-coleta') {
    loadVideo('coleta', 0, false);
  } else {
    loadVideo('ods', 0, false);
  }
}

function initConnectedPodcastHub() {
  const audioEl = document.getElementById('podcast-audio-player');
  if (!audioEl) return;

  const sourceEl = document.getElementById('podcast-audio-source');
  const metaEl = document.getElementById('pod-master-meta');
  const titleEl = document.getElementById('pod-master-title');
  const linesEl = document.getElementById('pod-transcript-lines');
  const downloadBtn = document.getElementById('btn-download-audio');
  const copyBtn = document.getElementById('btn-copy-transcript');
  const ttsBtn = document.getElementById('btn-tts-podcast');
  const resumeBadge = document.getElementById('podcast-resume-badge');

  let currentEpKey = 'ep01';

  function renderTranscript(ep) {
    if (!linesEl) return;
    linesEl.innerHTML = ep.segments.map((seg, i) => `
      <button type="button" class="transcript-line-btn ${i === 0 ? 'active' : ''}" data-time="${seg.time}">
        <span class="transcript-time">[${seg.label}]</span>
        <span>${seg.text}</span>
      </button>
    `).join('');

    linesEl.querySelectorAll('.transcript-line-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTime = parseFloat(btn.dataset.time || '0');
        audioEl.currentTime = targetTime;
        audioEl.play().catch(() => {});
        highlightActiveLine(targetTime);
      });
    });
  }

  function highlightActiveLine(currentTime) {
    if (!linesEl) return;
    const btns = Array.from(linesEl.querySelectorAll('.transcript-line-btn'));
    let activeIdx = 0;
    btns.forEach((btn, idx) => {
      const t = parseFloat(btn.dataset.time || '0');
      if (currentTime >= t) activeIdx = idx;
    });
    btns.forEach((btn, idx) => btn.classList.toggle('active', idx === activeIdx));
  }

  function loadEpisode(epKey, autoPlay = false) {
    const ep = PODCAST_EPISODES[epKey] || PODCAST_EPISODES.ep01;
    currentEpKey = epKey;

    if (window.speechSynthesis) window.speechSynthesis.cancel();

    if (metaEl) metaEl.textContent = ep.meta;
    if (titleEl) titleEl.textContent = ep.title;
    if (sourceEl) sourceEl.src = ep.src;
    if (downloadBtn) downloadBtn.href = ep.src;

    audioEl.load();
    renderTranscript(ep);

    document.querySelectorAll('.podcast-ep-card').forEach(card => {
      card.classList.toggle('active', card.dataset.epKey === epKey);
    });

    localStorage.setItem('fatoSocialLastPodcast', epKey);

    if (autoPlay) {
      audioEl.play().catch(() => {});
    }
  }

  audioEl.addEventListener('timeupdate', () => {
    highlightActiveLine(audioEl.currentTime);
  });

  document.querySelectorAll('.select-ep-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.epKey;
      loadEpisode(key, true);
      document.getElementById('podcast-master-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rate = parseFloat(btn.dataset.rate || '1');
      audioEl.playbackRate = rate;
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const ep = PODCAST_EPISODES[currentEpKey];
      const fullText = `${ep.title}\n\n` + ep.segments.map(s => `[${s.label}] ${s.text}`).join('\n');
      try {
        await navigator.clipboard.writeText(fullText);
        copyBtn.textContent = 'Transcrição Copiada!';
        setTimeout(() => { copyBtn.textContent = 'Copiar Transcrição'; }, 2200);
      } catch {
        alert(fullText);
      }
    });
  }

  if (ttsBtn) {
    ttsBtn.addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        alert('Seu navegador não suporta síntese de voz nativa.');
        return;
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        ttsBtn.textContent = 'Ouvir Transcrição Narrada (PT-BR)';
        return;
      }
      const ep = PODCAST_EPISODES[currentEpKey];
      const textToRead = ep.segments.map(s => s.text.replace(/\[.*?\]/g, '')).join(' ');
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = audioEl.playbackRate || 1;
      utterance.onend = () => {
        ttsBtn.textContent = 'Ouvir Transcrição Narrada (PT-BR)';
      };
      ttsBtn.textContent = 'Parar Narração';
      window.speechSynthesis.speak(utterance);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const requestedEp = params.get('episodio');
  const hash = window.location.hash;
  const savedEp = localStorage.getItem('fatoSocialLastPodcast');

  if (requestedEp && PODCAST_EPISODES[requestedEp]) {
    loadEpisode(requestedEp, false);
  } else if (hash === '#episodio-02') {
    loadEpisode('ep02', false);
  } else if (hash === '#episodio-03') {
    loadEpisode('ep03', false);
  } else if (savedEp && PODCAST_EPISODES[savedEp]) {
    loadEpisode(savedEp, false);
    if (resumeBadge) {
      resumeBadge.style.display = 'inline-block';
      resumeBadge.textContent = `Último ouvido: ${PODCAST_EPISODES[savedEp].title}`;
    }
  } else {
    loadEpisode('ep01', false);
  }
}
