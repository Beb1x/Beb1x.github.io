const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const characters = [];

function initializeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = '#00FFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numberOfCharacters = getRandomNumber(5, 25);
  for (let i = 0; i < numberOfCharacters; i++) {
    createCharacter();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const character of characters) {
    changeCharacterDirection(character);
    if (character.offsetTop > canvas.height) {
      removeCharacter(character);
    }
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
  character.style.left = getRandomNumber(0, window.innerWidth - 66) + 'px'; 
  character.style.top = '0'; // Start at the top
  document.getElementById('characters-container').appendChild(character);
  characters.push(character);
}

function changeCharacterDirection(character) {
  character.style.top = `${character.offsetTop + getRandomNumber(1, 5)}px`; 
}

function removeCharacter(character) {
  character.parentNode.removeChild(character);
}

function resetAnimation() {
  while (characters.length > 0) {
    removeCharacter(characters[0]);
  }
  const numberOfCharacters = getRandomNumber(5, 25);
  for (let i = 0; i < numberOfCharacters; i++) {
    createCharacter();
  }
}

initializeCanvas();
draw();

window.addEventListener('resize', () => {
  initializeCanvas();
});
