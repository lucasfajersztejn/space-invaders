window.addEventListener('load',() => {
  const game = new Game('canvas-game');
  document.addEventListener('keydown', (event) => game.onKeyEvent(event));
  document.addEventListener('keyup', (event) => game.onKeyEvent(event));

  const startButton = document.getElementById('button-start');
  startButton.addEventListener('click', () => {
    const startPanel = document.getElementById('start-panel');
    startPanel.classList.add('hidden');
    
    const gamePanel = document.getElementById('container-canvas');
    gamePanel.classList.remove('hidden');

    game.start();
  });
});