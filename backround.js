const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
class Cloud {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = 0.10;
  }
  draw(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x + this.size, this.y + this.size, this.size, 0, 2 * Math.PI);
    ctx.arc(this.x + this.size * 1.5, this.y + this.size * 0.5, this.size * 0.75, 0, 2 * Math.PI);
    ctx.arc(this.x + this.size * 2.5, this.y + this.size * 1.5, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    this.x += this.velocity;
    if (this.y < 0) {
      this.y = canvas.height;
    }
  }
}
const clouds = [];
function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const cloud of clouds) {
    cloud.update();
    cloud.draw(ctx);
  }
  requestAnimationFrame(draw);
}
function generateRandomCloud() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 50 + 20;
  return new Cloud(x, y, size);
}
for (let i = 0; i < 10; i++) {
  clouds.push(generateRandomCloud());
}
initializeCanvas();
draw();
window.addEventListener('resize', () => {
  initializeCanvas();
});
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const stickmen = [];
function createStickman() {
  const stickman = document.createElement('div');
  stickman.classList.add('stickman');
  stickman.style.left = getRandomNumber(0, window.innerWidth) + 'px';
  document.getElementById('stickmen-container').appendChild(stickman);
  stickman.style.animationDelay = `${Math.random() * 5}s`;
  stickmen.push(stickman);
}
const numberOfStickmen = getRandomNumber(5, 20);
for (let i = 0; i < numberOfStickmen; i++) {
    createStickman();
}
function changeStickmanDirection(stickman) {
  const randomDirection = Math.random();
  if (randomDirection < 0.5) {
    stickman.style.left = `${stickman.offsetLeft + 10}px`;
  } else {
    stickman.style.left = `${stickman.offsetLeft - 10}px`;
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const cloud of clouds) {
    cloud.update();
    cloud.draw(ctx);
  }
  for (const stickman of stickmen) {
    changeStickmanDirection(stickman);
    if (stickman.offsetLeft < 0 || stickman.offsetLeft > canvas.width) {
      removeStickman(stickman);
    }
  }
  if (stickmen.length === 0) {
    resetAnimation();
  }
  requestAnimationFrame(draw);
}
function removeStickman(stickman) {
  stickman.parentNode.removeChild(stickman);
}
function generateNewStickman() {
  const stickman = document.createElement('div');
  stickman.classList.add('stickman');
  stickman.style.left = getRandomNumber(0, window.innerWidth) + 'px';
  document.getElementById('stickmen-container').appendChild(stickman);
}
function resetAnimation() {
  while (stickmen.length > 0) {
    removeStickman(stickmen[0]);
  }
  for (let i = 0; i < numberOfStickmen; i++) {
    createStickman();
  }
}
