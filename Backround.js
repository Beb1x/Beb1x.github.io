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
initializeCanvas();
drawRandomClouds();
window.addEventListener('resize', () => {
    initializeCanvas();
    drawRandomClouds();
});
