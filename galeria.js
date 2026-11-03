/* Interatividade da Galeria Modal Lightbox */
const hexes = document.querySelectorAll('.hexagono');
const lightbox = document.getElementById('lightbox');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const lightboxPlaceholder = document.getElementById('lightbox-img-placeholder');
const lightboxFechar = document.querySelector('.lightbox-fechar');

// Cria ou ajusta a tag <img> dentro do lightbox para exibir a foto real
let lightboxImg = document.getElementById('lightbox-img');
if (!lightboxImg && lightboxPlaceholder) {
  lightboxImg = document.createElement('img');
  lightboxImg.id = 'lightbox-img';
  // Estilização da imagem expandida (tamanho máximo, bordas e centralizada)
  lightboxImg.style.cssText = 'max-width: 90vw; max-height: 80vh; border-radius: 8px; object-fit: contain; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5);';
  lightboxPlaceholder.replaceWith(lightboxImg);
}

hexes.forEach(hex => {
  function abrirLightbox() {
    const imgOriginal = hex.querySelector('img');
    const overlayText = hex.querySelector('.overlay span');
    const texto = overlayText ? overlayText.textContent : 'Imagem ampliada';

    // Joga a imagem e a legenda corretas para dentro do modal
    if (imgOriginal && lightboxImg) {
      lightboxImg.src = imgOriginal.src;
      lightboxImg.alt = imgOriginal.alt || texto;
    }

    if (lightboxLegenda) {
      lightboxLegenda.textContent = texto;
    }

    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  // Evento de clique no hexágono
  hex.addEventListener('click', abrirLightbox);

  // Acessibilidade: abrir ao pressionar Enter ou Espaço
  hex.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirLightbox();
    }
  });
});

// Fechar no botão X
if (lightboxFechar) {
  lightboxFechar.addEventListener('click', fecharLightbox);
}

// Fechar ao clicar fora da imagem (no fundo escuro)
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      fecharLightbox();
    }
  });
}

// Fechar ao pressionar a tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-active')) {
    fecharLightbox();
  }
});

function fecharLightbox() {
  lightbox.classList.remove('is-active');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImg) {
    lightboxImg.src = ''; // Limpa a imagem ao fechar
  }
}
