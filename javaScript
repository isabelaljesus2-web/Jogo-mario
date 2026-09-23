const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
  if (mario.classList.contains('jump')) return; // prevent spam

  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    jump();
  }
});

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = Number(
    window.getComputedStyle(mario).bottom.replace('px', '')
  );

  // Mario's right edge (in px from left of board)
  const marioRightEdge = mario.offsetLeft + mario.offsetWidth;

  if (
    pipePosition <= marioRightEdge &&
    pipePosition > 0 &&
    marioPosition < 80
  ) {
    // Freeze pipe in place
    pipe.style.animation = 'none';
    pipe.style.right = 'auto';
    pipe.style.left = `${pipePosition}px`;

    // Freeze Mario mid-air
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    mario.src = './imagens/game-over.png';
    mario.style.width = '75px';

    clearInterval(loop);
  }
}, 10);