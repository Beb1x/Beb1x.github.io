const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawCloud(ctx, x, y, size) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x + size, y + size, size, 0, 2 * Math.PI);
    ctx.arc(x + size * 1.5, y + size * 0.5, size * 0.75, 0, 2 * Math.PI);
    ctx.arc(x + size * 2.5, y + size * 1.5, size, 0, 2 * Math.PI);
    ctx.fill();
}
function drawRandomClouds() {
    for (let i = 0; i < 10; i++) {
        drawCloud(ctx, Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50 + 20);
    }
}
function drawStickman(ctx, x, y) {
  ctx.fillStyle = '#000';
  ctx.fillRect(x, y, 20, 50);
  ctx.beginPath();
  ctx.arc(x + 10, y + 10, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x - 10, y + 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 20, y + 20);
  ctx.lineTo(x + 30, y + 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y + 40);
  ctx.lineTo(x - 10, y + 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 20, y + 40);
  ctx.lineTo(x + 30, y + 50);
  ctx.stroke();
}
}
function generateRandomStickmanPosition() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    return { x, y };
}
initializeCanvas();
drawRandomClouds();
const numberOfStickmen = 15;
const stickmen = [];
for (let i = 0; i < numberOfStickmen; i++) {
    const position = generateRandomStickmanPosition();
    stickmen.push(position);
    drawStickman(ctx, position.x, position.y);
}
window.addEventListener('resize', () => {
    initializeCanvas();
    drawRandomClouds();
    stickmen.forEach((position) => {
        drawStickman(ctx, position.x, position.y);
    });
});
