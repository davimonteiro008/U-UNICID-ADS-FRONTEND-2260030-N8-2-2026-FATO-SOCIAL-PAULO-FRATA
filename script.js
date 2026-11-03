/* ==========================================================================
   SCRIPT GLOBAL - RECURSOS INTERATIVOS, MODO ESCURO E ACESSIBILIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Carregar preferências do usuário (Dark Mode / Contraste)
  const theme = localStorage.getItem('ecoinclusao_theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeButtonText(true);
  } else if (localStorage.getItem('ecoinclusao_contrast') === '1') {
    document.body.classList.add('high-contrast');
  }

  // 2. Menu Mobile Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.remove('high-contrast');
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('ecoinclusao_theme', isDark ? 'dark' : 'light');
  localStorage.removeItem('ecoinclusao_contrast');
  updateThemeButtonText(isDark);
}

function updateThemeButtonText(isDark) {
  const btn = document.getElementById('btn-dark-mode');
  if (btn) {
    btn.innerHTML = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  }
}

// Toggle Alto Contraste
function toggleContrast() {
  document.body.classList.remove('dark-mode');
  const isContrast = document.body.classList.toggle('high-contrast');
  localStorage.setItem('ecoinclusao_contrast', isContrast ? '1' : '0');
  localStorage.removeItem('ecoinclusao_theme');
}

// Controle de Zoom Acessível
let currentZoom = 100;
function adjustFontSize(delta) {
  currentZoom += delta * 10;
  if (currentZoom < 80) currentZoom = 80;
  if (currentZoom > 150) currentZoom = 150;
  document.documentElement.style.fontSize = currentZoom + '%';
}

function resetFontSize() {
  currentZoom = 100;
  document.documentElement.style.fontSize = '100%';
}
