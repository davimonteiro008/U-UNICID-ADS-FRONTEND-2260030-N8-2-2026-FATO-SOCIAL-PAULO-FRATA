/* ==========================================================================
   FATO SOCIAL — Script Principal (Interatividade, LocalStorage e WCAG 2.1 AA)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAccessibilityPreferences();
  initMobileNav();
  initKeyboardShortcuts();
  initDonationWidget();
  initVolunteerForm();
  initGalleryFiltersAndModal();
  initNewsFiltersAndModal();
  initImpactDashboard();
  initHostingCalculator();
});

/* 1. Preferências de Acessibilidade (Alto Contraste e Tamanho da Fonte) */
function initAccessibilityPreferences() {
  const savedContrast = localStorage.getItem('fatoSocialHighContrast');
  if (savedContrast === 'true') {
    document.body.classList.add('high-contrast');
  }

  const savedFont = parseInt(localStorage.getItem('fatoSocialFontSize') || '100', 10);
  document.documentElement.style.fontSize = `${savedFont}%`;

  const contrastBtns = document.querySelectorAll('[data-action="toggle-contrast"]');
  contrastBtns.forEach(btn => {
    btn.setAttribute('aria-pressed', savedContrast === 'true' ? 'true' : 'false');
    btn.addEventListener('click', () => {
      const isHC = document.body.classList.toggle('high-contrast');
      localStorage.setItem('fatoSocialHighContrast', isHC ? 'true' : 'false');
      contrastBtns.forEach(b => b.setAttribute('aria-pressed', isHC ? 'true' : 'false'));
      announceLive(isHC ? 'Modo de alto contraste ativado.' : 'Modo de alto contraste desativado.');
    });
  });

  document.querySelectorAll('[data-action="font-inc"]').forEach(btn => {
    btn.addEventListener('click', () => changeFontSize(10));
  });
  document.querySelectorAll('[data-action="font-dec"]').forEach(btn => {
    btn.addEventListener('click', () => changeFontSize(-10));
  });
  document.querySelectorAll('[data-action="font-reset"]').forEach(btn => {
    btn.addEventListener('click', () => setFontSize(100));
  });
}

function changeFontSize(delta) {
  const current = parseInt(localStorage.getItem('fatoSocialFontSize') || '100', 10);
  const next = Math.min(130, Math.max(85, current + delta));
  setFontSize(next);
}

function setFontSize(size) {
  document.documentElement.style.fontSize = `${size}%`;
  localStorage.setItem('fatoSocialFontSize', String(size));
  announceLive(`Tamanho do texto ajustado para ${size}%.`);
}

function announceLive(message) {
  let region = document.getElementById('a11y-live-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'a11y-live-region';
    region.setAttribute('aria-live', 'polite');
    region.style.position = 'absolute';
    region.style.width = '1px';
    region.style.height = '1px';
    region.style.overflow = 'hidden';
    region.style.clip = 'rect(0,0,0,0)';
    document.body.appendChild(region);
  }
  region.textContent = message;
}

/* 2. Menu Mobile Acessível */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggleBtn.focus();
    }
  });
}

/* 3. Atalhos de Teclado Acessíveis */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      const btn = document.querySelector('[data-action="toggle-contrast"]');
      if (btn) btn.click();
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    }
  });
}

/* 4. Área de Doações e Apoio (Calculadora de Impacto + PIX) */
function initDonationWidget() {
  const widget = document.getElementById('donation-widget');
  if (!widget) return;

  const amountBtns = widget.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-donation-amount');
  const impactPreview = document.getElementById('donation-impact-preview');
  const copyPixBtn = document.getElementById('copy-pix-btn');
  const confirmDonationBtn = document.getElementById('confirm-donation-btn');
  const statusBanner = document.getElementById('donation-status');

  let selectedAmount = 50;

  function updateImpactText(val) {
    const kits = Math.max(1, Math.floor(val / 25));
    const kgTriagem = Math.max(5, Math.round(val * 0.4));
    if (impactPreview) {
      impactPreview.innerHTML = `Com <strong>R$ ${val.toFixed(2).replace('.', ',')}</strong>, você viabiliza aproximadamente <strong>${kits} kit(s) pedagógico(s)</strong> e a triagem de <strong>${kgTriagem} kg de resíduos recicláveis</strong>.`;
    }
  }

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = parseFloat(btn.dataset.amount || '50');
      if (customInput) customInput.value = selectedAmount;
      updateImpactText(selectedAmount);
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseFloat(customInput.value);
      if (!isNaN(val) && val > 0) {
        amountBtns.forEach(b => b.classList.remove('active'));
        selectedAmount = val;
        updateImpactText(selectedAmount);
      }
    });
  }

  if (copyPixBtn) {
    copyPixBtn.addEventListener('click', async () => {
      const pixKey = 'doacoes@fatosocial.org.br';
      try {
        await navigator.clipboard.writeText(pixKey);
        copyPixBtn.textContent = 'Chave PIX Copiada!';
        setTimeout(() => { copyPixBtn.textContent = 'Copiar Chave PIX'; }, 2500);
        announceLive('Chave PIX copiada para a área de transferência.');
      } catch {
        alert('Chave PIX da ONG Fato Social: doacoes@fatosocial.org.br');
      }
    });
  }

  if (confirmDonationBtn && statusBanner) {
    confirmDonationBtn.addEventListener('click', () => {
      const history = JSON.parse(localStorage.getItem('fatoSocialDonations') || '[]');
      history.push({
        amount: selectedAmount,
        date: new Date().toLocaleDateString('pt-BR')
      });
      localStorage.setItem('fatoSocialDonations', JSON.stringify(history));
      statusBanner.className = 'status-banner success';
      statusBanner.textContent = `Obrigado pelo seu apoio de R$ ${selectedAmount.toFixed(2).replace('.', ',')}! Seu registro solidário foi salvo no painel de transparência local.`;
      statusBanner.style.display = 'block';
      announceLive(statusBanner.textContent);
    });
  }

  updateImpactText(selectedAmount);
}

/* 5. Formulário de Contato / Voluntariado com Validação JS e Autosave */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  if (!form) return;

  const fields = ['nome', 'email', 'telefone', 'area', 'disponibilidade', 'mensagem'];
  const statusBanner = document.getElementById('form-status-banner');
  const draftBanner = document.getElementById('draft-restored-banner');
  const submissionsList = document.getElementById('saved-submissions-list');

  // Restaurar rascunho do LocalStorage
  const savedDraft = JSON.parse(localStorage.getItem('fatoSocialVolunteerDraft') || 'null');
  if (savedDraft) {
    let hasContent = false;
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && savedDraft[id]) {
        el.value = savedDraft[id];
        hasContent = true;
      }
    });
    if (hasContent && draftBanner) {
      draftBanner.className = 'status-banner info';
      draftBanner.textContent = 'Rascunho recuperado automaticamente do seu navegador.';
      draftBanner.style.display = 'block';
    }
  }

  // Salvar rascunho automaticamente ao digitar
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const draft = {};
      fields.forEach(f => {
        const inputEl = document.getElementById(f);
        if (inputEl) draft[f] = inputEl.value;
      });
      localStorage.setItem('fatoSocialVolunteerDraft', JSON.stringify(draft));
      clearFieldError(id);
    });
  });

  function setFieldError(id, msg) {
    const errEl = document.getElementById(`err-${id}`);
    const inputEl = document.getElementById(id);
    if (errEl) errEl.textContent = msg;
    if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(id) {
    const errEl = document.getElementById(`err-${id}`);
    const inputEl = document.getElementById(id);
    if (errEl) errEl.textContent = '';
    if (inputEl) inputEl.removeAttribute('aria-invalid');
  }

  function renderSubmissions() {
    if (!submissionsList) return;
    const items = JSON.parse(localStorage.getItem('fatoSocialSubmissions') || '[]');
    if (items.length === 0) {
      submissionsList.innerHTML = '<p class="section-subtitle">Nenhuma inscrição registrada neste navegador ainda.</p>';
      return;
    }
    submissionsList.innerHTML = items.map(item => `
      <div class="card" style="padding:14px 18px; margin-bottom:10px;">
        <strong>${escapeHtml(item.nome)}</strong> — <span>${escapeHtml(item.area)}</span>
        <div class="card-meta">Registrado em ${escapeHtml(item.date)} • Disponibilidade: ${escapeHtml(item.disponibilidade)}</div>
      </div>
    `).join('');
  }

  renderSubmissions();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const area = document.getElementById('area').value;
    const disponibilidade = document.getElementById('disponibilidade').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome.length < 3) {
      setFieldError('nome', 'Por favor, informe seu nome completo (mínimo 3 caracteres).');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('email', 'Informe um endereço de e-mail válido.');
      valid = false;
    }
    if (telefone.replace(/\D/g, '').length < 10) {
      setFieldError('telefone', 'Informe um telefone/WhatsApp com DDD (mínimo 10 dígitos).');
      valid = false;
    }
    if (!area) {
      setFieldError('area', 'Selecione uma área de interesse.');
      valid = false;
    }
    if (mensagem.length < 10) {
      setFieldError('mensagem', 'Escreva uma breve mensagem com pelo menos 10 caracteres.');
      valid = false;
    }

    if (!valid) {
      announceLive('Existem campos obrigatórios com erro no formulário. Verifique as mensagens.');
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('fatoSocialSubmissions') || '[]');
    submissions.unshift({
      nome,
      email,
      telefone,
      area,
      disponibilidade,
      mensagem,
      date: new Date().toLocaleString('pt-BR')
    });
    localStorage.setItem('fatoSocialSubmissions', JSON.stringify(submissions));
    localStorage.removeItem('fatoSocialVolunteerDraft');

    if (draftBanner) draftBanner.style.display = 'none';
    if (statusBanner) {
      statusBanner.className = 'status-banner success';
      statusBanner.textContent = `Inscrição confirmada, ${nome}! Nossa equipe entrará em contato pelo e-mail ${email}.`;
      statusBanner.style.display = 'block';
    }
    form.reset();
    renderSubmissions();
    announceLive('Formulário enviado com sucesso.');
  });
}

/* 6. Galeria Fotográfica (Filtros + Lightbox Acessível) */
function initGalleryFiltersAndModal() {
  const filterBtns = document.querySelectorAll('[data-gallery-filter]');
  const tiles = document.querySelectorAll('.photo-tile');
  const modal = document.getElementById('gallery-modal');

  if (filterBtns.length && tiles.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.galleryFilter;
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        tiles.forEach(tile => {
          const match = cat === 'todos' || tile.dataset.category === cat;
          tile.style.display = match ? '' : 'none';
        });
      });
    });
  }

  if (modal && tiles.length) {
    const modalImg = document.getElementById('modal-photo-img');
    const modalTitle = document.getElementById('modal-photo-title');
    const modalDesc = document.getElementById('modal-photo-desc');
    const closeBtn = modal.querySelector('.modal-close');

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const img = tile.querySelector('img');
        const title = tile.querySelector('h3');
        const desc = tile.querySelector('p');
        if (modalImg && img) {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
        }
        if (modalTitle && title) modalTitle.textContent = title.textContent;
        if (modalDesc && desc) modalDesc.textContent = desc.textContent;
        modal.classList.add('open');
        if (closeBtn) closeBtn.focus();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

/* 7. Portal de Notícias (Filtro + Busca + Modal de Leitura) */
function initNewsFiltersAndModal() {
  const newsCards = document.querySelectorAll('[data-news-category]');
  const catBtns = document.querySelectorAll('[data-news-filter]');
  const searchInput = document.getElementById('news-search');
  const modal = document.getElementById('news-modal');

  if (newsCards.length) {
    let activeCat = 'todas';

    function filterNews() {
      const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
      newsCards.forEach(card => {
        const catMatch = activeCat === 'todas' || card.dataset.newsCategory === activeCat;
        const textMatch = !q || card.textContent.toLowerCase().includes(q);
        card.style.display = catMatch && textMatch ? '' : 'none';
      });
    }

    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCat = btn.dataset.newsFilter;
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterNews();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', filterNews);
    }
  }

  if (modal) {
    const titleEl = document.getElementById('news-modal-title');
    const metaEl = document.getElementById('news-modal-meta');
    const imgEl = document.getElementById('news-modal-img');
    const bodyEl = document.getElementById('news-modal-body');
    const closeBtn = modal.querySelector('.modal-close');

    document.querySelectorAll('[data-open-news]').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        if (!card) return;
        titleEl.textContent = card.querySelector('.card-title').textContent;
        metaEl.textContent = card.querySelector('.card-meta').textContent;
        const img = card.querySelector('img');
        if (img && imgEl) {
          imgEl.src = img.src;
          imgEl.alt = img.alt;
        }
        bodyEl.textContent = btn.dataset.fullText || card.querySelector('.card-text').textContent;
        modal.classList.add('open');
        if (closeBtn) closeBtn.focus();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

/* 8. Dashboard de Impacto (LocalStorage) */
function initImpactDashboard() {
  const localStatsEl = document.getElementById('local-community-stats');
  if (!localStatsEl) return;

  const donations = JSON.parse(localStorage.getItem('fatoSocialDonations') || '[]');
  const volunteers = JSON.parse(localStorage.getItem('fatoSocialSubmissions') || '[]');
  const totalDonated = donations.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

  localStatsEl.innerHTML = `
    <div class="kpi-card">
      <div class="kpi-value">${volunteers.length}</div>
      <div class="kpi-label">Inscrições de Voluntariado neste Navegador</div>
    </div>
    <div class="kpi-card amber">
      <div class="kpi-value">R$ ${totalDonated.toFixed(2).replace('.', ',')}</div>
      <div class="kpi-label">Apoios Registrados na Sessão Local</div>
    </div>
  `;
}

/* 9. Simulador de Hospedagem */
function initHostingCalculator() {
  const planSelect = document.getElementById('hosting-plan-select');
  const monthsInput = document.getElementById('hosting-months');
  const resultEl = document.getElementById('hosting-total-result');
  if (!planSelect || !monthsInput || !resultEl) return;

  function calc() {
    const monthly = parseFloat(planSelect.value || '0');
    const months = Math.max(1, parseInt(monthsInput.value || '12', 10));
    const total = monthly * months;
    resultEl.innerHTML = `Custo estimado para <strong>${months} meses</strong>: <strong>R$ ${total.toFixed(2).replace('.', ',')}</strong> (${monthly === 0 ? 'Gratuito com SSL e CDN inclusos' : 'Inclui domínio .org.br e backups'}).`;
  }

  planSelect.addEventListener('change', calc);
  monthsInput.addEventListener('input', calc);
  calc();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]));
}
