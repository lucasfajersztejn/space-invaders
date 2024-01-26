window.addEventListener('load',() => {
  // const game = new Game('canvas-game');
  let games = [];

  games.forEach((game) => {
    document.addEventListener('keydown', (event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
  })
  
  const startPanel = document.getElementById('start-panel');
  const gamePanel = document.getElementById('container-canvas');
  const gameOverPanel = document.getElementById('gameOver-panel');
  
  // Button start
  const startButton = document.getElementById('button-start');
  startButton.addEventListener('click', () => {
    games.push(new Game('canvas-game'));
    setTimeout(() => {
      
      startPanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');

      games.forEach((game) => {
        if (!game.endGame){
          game.start();
        }

        document.addEventListener('keydown', (event) => game.onKeyEvent(event));
        document.addEventListener('keyup', (event) => game.onKeyEvent(event));

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
        
      });
      
    }, 500);
  });

  // Button restart
  const restart = document.getElementById('button-restart');
  restart.addEventListener('click', () => {
    games = games.filter((game) => !game.endGame);
    console.log(games.length);
    games.push(new Game('canvas-game'));

    setTimeout(() => {
      gameOverPanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');

      games.forEach((game) => {
        if (!game.endGame) {
          game.start();
        }

        document.addEventListener('keydown', (event) => game.onKeyEvent(event));
        document.addEventListener('keyup', (event) => game.onKeyEvent(event));

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
      });
    }, 500);
  });


});