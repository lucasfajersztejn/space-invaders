window.addEventListener('load',() => {

  let games = [];
  const scores = [];
  let count = 0;
  const soundClickButton = new Audio('/assets/sounds/buttonClick.mp3')

  const stages = {
    startMenu: false,
    gameOver: false,
    winGame: false
  }

  games.forEach((game) => {
    document.addEventListener('keydown', (event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
  })
  

  const startPanel = document.getElementById('start-panel');
  const gamePanel = document.getElementById('container-canvas');
  const gameOverPanel = document.getElementById('gameOver-panel');
  const winGamePanel = document.getElementById('winGame-panel');
  const scoresPanel = document.getElementById('scores-panel');
  const ulScores = document.querySelector('.scores-list');

  // Button start
  const startButton = document.getElementById('button-start');
  startButton.addEventListener('click', () => {
    soundClickButton.play()
    games = games.filter((game) => !game.endGame);
    games.push(new Game('canvas-game'));
    count = 0;
    setTimeout(() => {
      startPanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');
      buttonMuteCanvas.classList.add('hidden');
      buttonSoundCanvas.classList.remove('hidden');

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

            if (game.winGame) {          
              game.winGame = false;    
              const random = Math.floor(Math.random() * 10)
              if (random <= 4) {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame1.jpg')"; 
                } else {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame2.jpg')";
                }
              gamePanel.classList.add('hidden');
              winGamePanel.classList.remove('hidden');
            }
    
            if (game.endGame) {
              clearInterval(intervalId);
            }
          }, 1000);
        }, 2000);
        
      });
      
    }, 500);
  });

  // Button restart
  const restart = document.getElementById('button-restart');
  restart.addEventListener('click', () => {
    soundClickButton.play()
    games = games.filter((game) => !game.endGame);
    games.push(new Game('canvas-game'));
    count = 0;

    setTimeout(() => {
      gameOverPanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');
      buttonMuteCanvas.classList.add('hidden');
      buttonSoundCanvas.classList.remove('hidden');

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

            if (game.winGame) {      
              game.winGame = false;        
              const random = Math.floor(Math.random() * 10)
              if (random <= 4) {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame1.jpg')"; 
                } else {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame2.jpg')";
                }
              gamePanel.classList.add('hidden');
              winGamePanel.classList.remove('hidden');
            }

            if (game.endGame) {
              clearInterval(intervalId);
            }

          }, 1000);
        }, 2000);
      });
    }, 500);
  });

  const restartTwo = document.querySelector('.button-restartGame');
  restartTwo.addEventListener('click', () => {
    soundClickButton.play()
    games = games.filter((game) => !game.endGame);
    games.push(new Game('canvas-game'));
    count = 0;

    setTimeout(() => {
      winGamePanel.classList.add('hidden');
      gamePanel.classList.remove('hidden');
      buttonMuteCanvas.classList.add('hidden');
      buttonSoundCanvas.classList.remove('hidden');

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

            if (game.winGame) { 
              game.winGame = false;             
              const random = Math.floor(Math.random() * 10)
              if (random <= 4) {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame1.jpg')"; 
                } else {
                winGamePanel.style.backgroundImage = "url('/assets/img/bgWinGame2.jpg')";
                }
              gamePanel.classList.add('hidden');
              winGamePanel.classList.remove('hidden');
            }

            if (game.endGame) {
              clearInterval(intervalId);
            }

          }, 1000);
        }, 2000);
      });
    }, 500);
  });

  // Button scores
  const buttonScores = document.querySelector('.button-score');
  buttonScores.addEventListener('click', () => {
    soundClickButton.play();
    hidenAndLoadData();
    stages.startMenu = true;
  });

  const buttonScoresTwo = document.querySelector('.button-score-two');
  buttonScoresTwo.addEventListener('click', () => {
    soundClickButton.play()
    hidenAndLoadData();
    stages.gameOver = true;
  });

  const buttonScoresThree = document.querySelector('.button-score-three');
  buttonScoresThree.addEventListener('click', () => {
    soundClickButton.play()
    hidenAndLoadData();
  })

  // Button back
  const buttonBack = document.querySelector('.back');
  buttonBack.addEventListener('click', () => { 
    if (stages.startMenu) {
      scoresPanel.classList.add('hidden');
      startPanel.classList.remove('hidden');
      stages.startMenu = false;
    } else if (stages.gameOver)
  });

  function hidenAndLoadData() {
    startPanel.classList.add('hidden');
    gameOverPanel.classList.add('hidden');
    winGamePanel.classList.add('hidden');
    scoresPanel.classList.remove('hidden');
    fillData();
  }
  
  function fillData() {
    const scoreData = JSON.parse(localStorage.getItem(SCORE_KEY))
    ulScores.innerHTML = '';
    for (const key in scoreData) {
      if (scoreData.hasOwnProperty(key)) {
        const newLi = document.createElement('li');
        newLi.classList.add('li-score');
        newLi.innerText = `Player: ${key} - Score: ${scoreData[key]}`
        ulScores.appendChild(newLi);
      }
    }
  }

  // Button Main Menu
  const mainMenu = document.querySelector('.mainMenu');
  mainMenu.addEventListener('click', () => {
    soundClickButton.play();
    gameOverPanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    games = games.filter((game) => !game.endGame);
  });
  
  const mainMenuTwo = document.querySelector('.mainMenuTwo');
  mainMenuTwo.addEventListener('click', () => {
    soundClickButton.play();
    scoresPanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    games = games.filter((game) => !game.endGame);
  });

  const mainMenuThree = document.querySelector('.button-mainMenuThree');
  mainMenuThree.addEventListener('click', () => {
    soundClickButton.play();
    winGamePanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    games = games.filter((game) => !game.endGame);
  });

  // Button sound canvas
  const buttonSoundCanvas = document.getElementById('soundIcon');
  buttonSoundCanvas.addEventListener('click', () => {
    games = games.filter((game) => !game.endGame);
    games.forEach((game) => {
      if (count === 0) {
        count++;
        game.stopAllSounds();
        buttonSoundCanvas.classList.add('hidden');
        buttonMuteCanvas.classList.remove('hidden')
      } 
    });
  });

  const buttonMuteCanvas = document.getElementById('soundIconTwo');
  buttonMuteCanvas.addEventListener('click', () => {
    games = games.filter((game) => !game.endGame);
    games.forEach((game) => {
      if (count === 1) {
        count--;
        game.playAllSound();
        buttonMuteCanvas.classList.add('hidden');
        buttonSoundCanvas.classList.remove('hidden');
      }
    });
  })


});

