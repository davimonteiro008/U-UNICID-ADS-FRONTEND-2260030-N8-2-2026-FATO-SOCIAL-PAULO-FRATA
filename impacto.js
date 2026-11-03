/* Lógica da Calculadora Ecológica */
const ewasteInput = document.getElementById('ewaste-input');
const devicesCount = document.getElementById('devices-count');
const co2Result = document.getElementById('co2-result');
const waterResult = document.getElementById('water-result');
const energyResult = document.getElementById('energy-result');

if (ewasteInput) {
  ewasteInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    devicesCount.textContent = val;
    co2Result.textContent = `${val * 12} kg`;
    waterResult.textContent = `${(val * 150).toLocaleString('pt-BR')} L`;
    energyResult.textContent = `${val * 45} kWh`;
  });
}
