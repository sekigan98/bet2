// Fix para iOS
function setVhUnit() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVhUnit();
window.addEventListener('resize', setVhUnit);

// 🎯 Chips animadas optimizadas para iOS
const chipsContainer = document.querySelector(".chips-container");
const colors = ['#D32F2F', '#9C27B0', '#FFD700', '#030001'];

let chipCount = 0;
const maxChips = 30;

function createChip() {
  if (chipCount >= maxChips) return;

  const chip = document.createElement("div");
  chip.classList.add("chip");
  chipCount++;

  const color = colors[Math.floor(Math.random() * colors.length)];
  chip.style.color = color;

  const x = Math.random() * window.innerWidth;
  const size = 30 + Math.random() * 20;
  const duration = 3 + Math.random() * 3;
  const rotX = Math.floor(Math.random() * 360);
  const rotY = Math.floor(Math.random() * 360);

  chip.style.width = chip.style.height = size + "px";
  chip.style.left = x + "px";
  chip.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-100px)`; // arranca más arriba
  chip.style.animation = `fall ${duration}s linear forwards`;

  chipsContainer.appendChild(chip);

  setTimeout(() => {
    chip.remove();
    chipCount--;
  }, duration * 1000 + 1000);
}

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

  // ✅ Fix Safari: forzar repintado para animaciones y capas 3D
  document.body.style.transform = 'translateZ(0)';
});
