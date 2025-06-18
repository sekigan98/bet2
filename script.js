// Fix para iOS
function setVhUnit() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVhUnit();
window.addEventListener('resize', setVhUnit);

// 🎯 Chips animadas
const chipsContainer = document.querySelector(".chips-container");
const colors = ['#D32F2F', '#9C27B0', '#FFD700', '#030001']; // rojo, violeta, dorado

let activeChips = 0;
const maxChips = 15; // Máximo de fichas activas al mismo tiempo

function createChip() {
  if (activeChips >= maxChips) return;

  const chip = document.createElement("div");
  chip.classList.add("chip");

  // Color aleatorio
  const color = colors[Math.floor(Math.random() * colors.length)];
  chip.style.color = color;

  // Posición aleatoria
  chip.style.left = Math.random() * 100 + "vw";

  // Tamaño aleatorio
  const size = 30 + Math.random() * 20;
  chip.style.width = chip.style.height = size + "px";

  // Duración de la caída (más corta para no saturar)
  const duration = 2 + Math.random() * 2;
  chip.style.animationDuration = `${duration}s, 3s`;

  // Rotaciones iniciales aleatorias
  const rotX = Math.floor(Math.random() * 360);
  const rotY = Math.floor(Math.random() * 360);
  chip.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

  chipsContainer.appendChild(chip);
  activeChips++;

  // Eliminar después de la animación y restar contador
  setTimeout(() => {
    chip.remove();
    activeChips--;
  }, duration * 1000 + 500);
}

// Lanzar una ficha cada 400ms
setInterval(createChip, 400);

// 📱 Lógica de WhatsApp + GA
document.addEventListener("DOMContentLoaded", () => {
  const whatsappButton = document.getElementById("whatsapp-button");
  const whatsappLogo = document.getElementById("whatsapp-logo");

  const links = [
    // "https://wa.link/ddrw6q", // 011-6963-9808
    "https://wa.link/o3sylq", // 011-6964-0041
    // "https://wa.link/wvjsvu" // 011-3018-4335
  ];

  const randomIndex = Math.floor(Math.random() * links.length);
  const selectedLink = links[randomIndex];

  // Botón
  if (whatsappButton) {
    whatsappButton.href = selectedLink;
    whatsappButton.addEventListener("click", () => {
      gtag('event', 'click_whatsapp', {
        event_category: 'engagement',
        event_label: 'Botón WhatsApp',
      });
    });
  }

  // Logo clickeable
  if (whatsappLogo) {
    whatsappLogo.href = selectedLink;
    whatsappLogo.addEventListener("click", () => {
      gtag('event', 'click_whatsapp_logo', {
        event_category: 'engagement',
        event_label: 'Logo WhatsApp',
      });
    });
  }
});