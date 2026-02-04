// Confetti effect code adapted from https://www.kirilv.com/canvas-confetti/
// Minimal confetti implementation

const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
let confettiElements = [];

function setCanvasSize() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.tilt = Math.random() * 10 - 10;
    this.tiltSpeed = Math.random() * 0.1 + 0.05;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.tilt += this.tiltSpeed;

    if (this.y > confettiCanvas.height) {
      this.y = -this.size;
      this.x = Math.random() * confettiCanvas.width;
    }
    if (this.x > confettiCanvas.width) this.x = 0;
    if (this.x < 0) this.x = confettiCanvas.width;
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = this.size / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.size / 4, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.size / 4);
    ctx.stroke();
  }
}

function initConfetti() {
  confettiElements = [];
  for (let i = 0; i < 150; i++) {
    confettiElements.push(new ConfettiParticle());
  }
}

function runConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiElements.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(runConfetti);
}

let confettiRunning = false;

function startConfetti() {
  if (!confettiRunning) {
    confettiRunning = true;
    initConfetti();
    runConfetti();
    // Stop confetti after 5 seconds
    setTimeout(() => {
      confettiRunning = false;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 5000);
  }
}

// --- Floating hearts animation ---

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 15) + "px";
  heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
  heart.style.animationDelay = "-" + (Math.random() * 4) + "s";
  heart.textContent = "❤️";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

setInterval(createHeart, 600);

// --- No button avoiding cursor ---

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".container");

const padding = 15; // safe space from edges

function moveNoButtonAway(event) {
  const btnRect = noBtn.getBoundingClientRect();
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Calculate distance between cursor and button center
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distX = cursorX - btnCenterX;
  const distY = cursorY - btnCenterY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  const minDistance = 80; // px, start moving away if cursor closer than this

  if (distance < minDistance) {
    // Calculate new position opposite of cursor relative to button center
    const angle = Math.atan2(distY, distX);
    const moveDistance = minDistance - distance;

    let newX = btnRect.left - Math.cos(angle) * moveDistance * 1.5;
    let newY = btnRect.top - Math.sin(angle) * moveDistance * 1.5;

    // Limit newX and newY within container viewport (with padding)
    const containerRect = container.getBoundingClientRect();

    // Left boundary
    if (newX < containerRect.left + padding) newX = containerRect.left + padding;
    // Right boundary
    if (newX + btnRect.width > containerRect.right - padding) newX = containerRect.right - btnRect.width - padding;
    // Top boundary
    if (newY < containerRect.top + padding) newY = containerRect.top + padding;
    // Bottom boundary
    if (newY + btnRect.height > containerRect.bottom - padding) newY = containerRect.bottom - btnRect.height - padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
  }
}

// Reset No button position to center under btn-group on mouse leave
function resetNoButton() {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

noBtn.addEventListener("mousemove", moveNoButtonAway);
noBtn.addEventListener("mouseleave", resetNoButton);

// --- Yes button click: show confetti + message ---

yesBtn.addEventListener("click", () => {
  startConfetti();
  // Disable buttons to prevent multiple clicks
  yesBtn.disabled = true;
  noBtn.disabled = true;

  // Show thank you message after 1.2s
  setTimeout(() => {
    container.innerHTML = `
      <h1>Yay! 💖 Can't wait for our valentine's date!</h1>
    `;
  }, 1200);
});
