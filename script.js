const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".btn-group");

// Store button dimensions
const btnWidth = noBtn.offsetWidth;
const btnHeight = noBtn.offsetHeight;

function getRandomOffset(max) {
  return Math.floor(Math.random() * max);
}

function moveNoButtonAway(event) {
  // Get container boundaries relative to viewport
  const containerRect = container.getBoundingClientRect();

  // Get mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Current button position relative to viewport
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate distance from mouse to button center
  const btnCenterX = btnRect.left + btnWidth / 2;
  const btnCenterY = btnRect.top + btnHeight / 2;

  const deltaX = btnCenterX - mouseX;
  const deltaY = btnCenterY - mouseY;

  // Amount to move the button away (more distance means bigger move)
  let moveX = deltaX * 0.5;
  let moveY = deltaY * 0.5;

  // Current button position relative to container
  const style = window.getComputedStyle(noBtn);
  const currentLeft = parseFloat(style.left) || 0;
  const currentTop = parseFloat(style.top) || 0;

  // Calculate new position (relative to container)
  let newLeft = currentLeft + moveX;
  let newTop = currentTop + moveY;

  // Container width/height
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // Clamp the new position so button stays inside container
  newLeft = Math.min(Math.max(newLeft, 0), containerWidth - btnWidth);
  newTop = Math.min(Math.max(newTop, 0), containerHeight - btnHeight);

  // Apply new position to button
  noBtn.style.position = "absolute";
  noBtn.style.left = newLeft + "px";
  noBtn.style.top = newTop + "px";
}

noBtn.addEventListener("mouseenter", (e) => {
  // Initialize position if not set
  if (!noBtn.style.left) {
    noBtn.style.position = "absolute";
    noBtn.style.left = "0px";
    noBtn.style.top = "0px";
  }
});

noBtn.addEventListener("mousemove", moveNoButtonAway);

yesBtn.addEventListener("click", () => {
  // Show a cute confirmation message
  document.body.innerHTML = `
    <div style="display:flex; justify-content:center; align-items:center; height:100vh; flex-direction: column; background: #fda085;">
      <h1 style="color: #d93f3f; font-size: 3rem;">Yay! 💖 Can't wait for our date!</h1>
      <p style="font-size: 1.2rem;">Thanks for saying yes!</p>
    </div>
  `;
});
