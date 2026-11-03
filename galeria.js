/* Interatividade da Galeria Modal Lightbox */
const hexes = document.querySelectorAll('.hexagono');
const lightbox = document.getElementById('lightbox');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const lightboxPlaceholder = document.getElementById('lightbox-img-placeholder');
const lightboxFechar = document.querySelector('.lightbox-fechar');

// Cria ou substitui o placeholder pela tag de imagem real no modal
let lightboxImg = document.getElementById('lightbox-img');
if (!lightboxImg && lightboxPlaceholder) {
  lightboxImg = document.createElement('img');
  lightboxImg.id = 'lightbox-img';
  lightboxImg.style.cssText = 'max-width: 90vw; max-height: 80vh; border-radius: 8px; object-fit: contain; display: block; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5);';
  lightboxPlaceholder.replaceWith(lightboxImg);
}

hexes.forEach(hex => {
  hex.addEventListener('click', () => {
    const imgOriginal = hex.querySelector('img');
    const text = hex.querySelector('.overlay span').textContent;
    
    // Pega o caminho (src) da imagem clicada e envia para o lightbox
    if (imgOriginal && lightboxImg) {
      lightboxImg.src = imgOriginal.src;
      lightboxImg.alt = imgOriginal.alt || text;
    }

    lightboxLegenda.textContent = text;
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

if (lightboxFechar) {
  lightboxFechar.addEventListener('click', () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) {
      lightboxImg.src = ''; // Limpa a imagem ao fechar
    }
  });
}

// Fechar ao clicar fora da imagem (no fundo escuro do modal)
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('is-active');
      lightbox.setAttribute('aria-hidden', 'true');
      if (lightboxImg) {
        lightboxImg.src = '';
      }
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  }
});
