const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const stickmen = [];

function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 15; i++) {
    createStickman();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const stickman of stickmen) {
    changeStickmanDirection(stickman);
    if (stickman.offsetLeft < 0.8 || stickman.offsetLeft > canvas.width) {
      removeStickman(stickman);
    }
  }
  if (stickmen.length === 0) {
    resetAnimation();
  }
  requestAnimationFrame(draw);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createStickman() {
  const stickman = document.createElement('div');
  stickman.classList.add('stickman');
  stickman.style.left = getRandomNumber(0, window.innerWidth) + 'px';
  document.getElementById('stickmen-container').appendChild(stickman);
  stickman.style.animationDelay = `${Math.random() * 5}s`;
  stickmen.push(stickman);
}

const numberOfStickmen = getRandomNumber(2, 50);
for (let i = 0; i < numberOfStickmen; i++) {
  createStickman();
}

function changeStickmanDirection(stickman) {
  const randomDirection = Math.random();
  if (randomDirection < 3) {
    stickman.style.left = `${stickman.offsetLeft + 10}px`;
  } else {
    stickman.style.left = `${stickman.offsetLeft - 10}px`;
  }
}

function removeStickman(stickman) {
  stickman.parentNode.removeChild(stickman);
}

function resetAnimation() {
  while (stickmen.length > 0) {
    removeStickman(stickmen[0]);
  }
  for (let i = 0; i < numberOfStickmen; i++) {
    createStickman();
  }
}

initializeCanvas();
draw();

window.addEventListener('resize', () => {
  initializeCanvas();
});
