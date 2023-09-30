const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const characters = [];

function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < numberOfCharacters; i++) {
  createCharacter();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const character of characters) {
    changeCharacterDirection(character);
    if (character.offsetLeft < 0.8 || character.offsetLeft > canvas.width) {
      removeCharacter(character);
    }
  }
  if (characters.length === 0) {
    resetAnimation();
  }
  requestAnimationFrame(draw);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCharacter() {
  const character = document.createElement('div');
  const isSpooderman = Math.random() < 0.5;
  character.classList.add(isSpooderman ? 'spooderman' : 'stickman');
  character.style.left = getRandomNumber(0, window.innerWidth) + 'px';
  document.getElementById('characters-container').appendChild(character);
  character.style.animationDelay = `${Math.random() * 5}s`;
  characters.push(character);
}

const numberOfCharacters = getRandomNumber(2, 50);
for (let i = 0; i < numberOfCharacters; i++) {
  createCharacter();
}

function changeCharacterDirection(character) {
  const randomDirection = Math.random();
  if (randomDirection < 3) {
    character.style.left = `${character.offsetLeft + 10}px`;
  } else {
    character.style.left = `${character.offsetLeft - 10}px`;
  }
}

function removeCharacter(character) {
  character.parentNode.removeChild(character);
}

function resetAnimation() {
  while (characters.length > 0) {
    removeCharacter(characters[0]);
  }
  for (let i = 0; i < numberOfCharacters; i++) {
    createCharacter();
  }
}

initializeCanvas();
draw();

window.addEventListener('resize', () => {
  initializeCanvas();
});
