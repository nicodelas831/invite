const noBtn = document.getElementById("noBtn");
const container = document.querySelector(".container");

noBtn.style.position = "relative";

noBtn.addEventListener("mouseenter", () => {
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Current position relative to container
  const currentLeft = noBtn.offsetLeft;
  const currentTop = noBtn.offsetTop;

  // Calculate max move distances so button stays inside container
  const maxLeft = container.clientWidth - noBtn.offsetWidth;
  const maxTop = container.clientHeight - noBtn.offsetHeight;

  // Calculate a new position that moves the button away from mouse
  // We'll pick a random position within container, but away from current pos

  let newLeft, newTop;
  const safeDistance = 80; // minimum pixels to move

  function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
  }

  // Try 100 times to find a position far enough from current
  let tries = 0;
  do {
    newLeft = Math.random() * maxLeft;
    newTop = Math.random() * maxTop;
    tries++;
  } while(distance(newLeft, newTop, currentLeft, currentTop) < safeDistance && tries < 100);

  // Animate the button to new position smoothly
  noBtn.style.transition = "left 0.3s ease, top 0.3s ease";
  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;
});

// Optional: Reset button position when mouse leaves container
container.addEventListener("mouseleave", () => {
  noBtn.style.transition = "left 0.5s ease, top 0.5s ease";
  noBtn.style.left = "0px";
  noBtn.style.top = "0px";
});
