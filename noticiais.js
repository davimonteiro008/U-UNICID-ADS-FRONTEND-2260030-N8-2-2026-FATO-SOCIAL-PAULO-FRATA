/* Validação e Envio da Newsletter */
const newsForm = document.getElementById('newsletter-form');
const newsMsg = document.getElementById('newsletter-msg');

if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsMsg.style.display = 'block';
    newsForm.reset();
  });
}
