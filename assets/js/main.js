window.addEventListener('load',() => {
  // const game = new Game('canvas-game');
  let games = [];
  const scores = [];

  games.forEach((game) => {
    document.addEventListener('keydown', (event) => game.onKeyEvent(event));
    document.addEventListener('keyup', (event) => game.onKeyEvent(event));
  })
  

  const startPanel = document.getElementById('start-panel');
  const gamePanel = document.getElementById('container-canvas');
  const gameOverPanel = document.getElementById('gameOver-panel');
  const scoresPanel = document.getElementById('scores-panel');
  const ulScores = document.querySelector('.scores-list');

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
        }, 2000);
        
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
        }, 2000);
      });
    }, 500);
  });

  // Button scores
  const buttonScores = document.querySelector('.button-score');
  buttonScores.addEventListener('click', () => {
    hidenAndLoadData();
  });

  const buttonScoresTwo = document.querySelector('.button-score-two');
  buttonScoresTwo.addEventListener('click', () => {
    hidenAndLoadData();
  });

  function hidenAndLoadData() {
    startPanel.classList.add('hidden');
    gameOverPanel.classList.add('hidden');
    scoresPanel.classList.remove('hidden');
    fillData();
    // scores.forEach((player) => {
    //   const newLi = document.createElement('li');
    //   newLi.classList.add('li-score');
    //   newLi.innerText = `Player: ${player.key} - Score: ${player.score}`
    //   ulScores.appendChild(newLi);
    // });
  }
  
  function fillData() {
    const scoreData = JSON.parse(localStorage.getItem(SCORE_KEY))
    //const newPlayerScore = [];
    ulScores.innerHTML = '';
    console.log(Object.keys(scoreData).length);
    for (const key in scoreData) {
      if (scoreData.hasOwnProperty(key)) {
        //newPlayerScore.push({key: key, score:scoreData[key]})
        //scores.push({key: key, score: scoreData[key]});
        //scores[key] = scoreData[key]
        const newLi = document.createElement('li');
        newLi.classList.add('li-score');
        newLi.innerText = `Player: ${key} - Score: ${scoreData[key]}`
        ulScores.appendChild(newLi);
      }
    }
  }

  // [[{key:Lucas, points: 10}], [{key: javier, points:7}]]


  // Button Main menu
  const mainMenu = document.querySelector('.mainMenu');
  mainMenu.addEventListener('click', () => {
    gameOverPanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    games = games.filter((game) => !game.endGame);
  });
  
  const mainMenuTwo = document.querySelector('.mainMenuTwo');
  mainMenuTwo.addEventListener('click', () => {
    scoresPanel.classList.add('hidden');
    startPanel.classList.remove('hidden');
    games = games.filter((game) => !game.endGame);
  });
});

