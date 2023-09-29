const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#00FFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);
function drawCloud(ctx, x, y, size) {
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(x + size, y + size, size, 0, 2 * Math.PI);
  ctx.arc(x + size * 1.5, y + size * 0.5, size * 0.75, 0, 2 * Math.PI);
  ctx.arc(x + size * 2.5, y + size * 1.5, size, 0, 2 * Math.PI);
  ctx.fill();
}
for (let i = 0; i < 10; i++) {
  drawCloud(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50 + 20);
}
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 10; i++) {
    drawCloud(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50 + 20);
  }
});
document.body.appendChild(canvas);
