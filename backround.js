const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

class Cloud {
  constructor(x, y, size, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
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
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * (canvas.width - 100) + 50;
    }
  }
}

const clouds = [];
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
  for (const cloud of clouds) {
    cloud.update();
    cloud.draw(ctx);
  }
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

function generateRandomCloud() {
  const x = Math.random() * (canvas.width - 100) + 50;
  const y = Math.random() * (canvas.height / 2);
  const size = Math.random() * 45 + 20;
  const velocity = Math.random() * 0.1 + 0.05; 
  return new Cloud(x, y, size, velocity);
}

for (let i = 0; i < 50; i++) { 
  const cloud = generateRandomCloud();
  clouds.push(cloud);
}

initializeCanvas();
draw();

window.addEventListener('resize', () => {
  initializeCanvas();
});

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
