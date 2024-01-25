window.addEventListener('load',() => {
  const game = new Game('canvas-game');
  document.addEventListener('keydown', (event) => game.onKeyEvent(event));
  document.addEventListener('keyup', (event) => game.onKeyEvent(event));

  const gamePanel = document.getElementById('container-canvas');
  const gameOverPanel = document.getElementById('gameOver-panel');

  const startButton = document.getElementById('button-start');
  startButton.addEventListener('click', () => {
    setTimeout(() => {
      const startPanel = document.getElementById('start-panel');
      startPanel.classList.add('hidden');
    
      
      gamePanel.classList.remove('hidden');

      game.start();

      setTimeout(() => {
        let intervalId = setInterval(() => {
        
          if (game.isGameOver) {
            gamePanel.classList.add('hidden');
            gameOverPanel.classList.remove('hidden');
          }
  
          if (game.endGame) {
            clearInterval(intervalId);
          }
        }, 1000);
      }, 1000);
      
    }, 500);
  });



  const restart = document.getElementById('button-restart');
  restart.addEventListener('click', () => {
    setTimeout(() => {
      gameOverPanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');
      game.restart();
    }, 500);
    

  });


});