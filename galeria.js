/* Interatividade da Galeria Modal Lightbox */
const hexes = document.querySelectorAll('.hexagono');
const lightbox = document.getElementById('lightbox');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const lightboxPlaceholder = document.getElementById('lightbox-img-placeholder');
const lightboxFechar = document.querySelector('.lightbox-fechar');

hexes.forEach(hex => {
  hex.addEventListener('click', () => {
    const text = hex.querySelector('.overlay span').textContent;
    lightboxLegenda.textContent = text;
    lightboxPlaceholder.textContent = `[ Visualização Ampliada: ${text} ]`;
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

if (lightboxFechar) {
  lightboxFechar.addEventListener('click', () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});
