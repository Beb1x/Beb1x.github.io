const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
class Cloud {
 constructor(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.velocity = 0.05;
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
  if (this.x > canvas.width) {
   this.x = 0;
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
  for (const cloud of clouds) {
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
