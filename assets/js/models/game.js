class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = WINDOW_WIDTH;
    this.canvas.height = WINDOW_HEIGHT;
    this.ctx = this.canvas.getContext("2d");

    this.fps = FPS;
    this.drawIntervalId = undefined;
    this.enemies_respawn = 0;

    this.backGround = new Background(this.ctx);
    this.ship = new Ship(this.ctx, 334, 670);
    this.score = new Points(this.ctx, 15, 15);
    this.enemies = [];

    this.winGame = false;
    this.isGameOver = false;
  }

  onKeyEvent(event) {
    this.ship.onKeyEvent(event, this.score.points);
  }

  generateEnemies() {
    this.enemies_respawn = 0;
    let margin = 150;
    const limit = 20; //ENEMY_WIDTH_LIMIT / Math.ceil(ENEMY_WIDTH / 5);
    const enemy_w = Math.ceil(ENEMY_WIDTH / 5);

    for (let i = 0; i < limit; i++) {
      if (i === 0) {
        this.enemies.push(new Enemy(this.ctx, margin, 20))
      } else if (i % 2 === 0) {
        this.enemies.push(new Enemy(this.ctx, margin, 20))
      } else {
        margin += 60;
      }
    }  
  }

  start() {
    if (!this.drawIntervalId) {
      
      this.drawIntervalId = setInterval(() => {
        this.clear();
        if (!this.isGameOver) {
          this.move();
          this.checkCollisions();
          this.enemies_respawn === 180 ? this.generateEnemies() : this.enemies_respawn++;
        }
        
        this.draw();
        if (this.isGameOver) {
          this.ship.deathExplotion();
          if (this.ship.spriteExplotion['horizontalFrameIndex'] === 14) {
            this.ship.spriteExplotion['isReady'] = false;
          }
        }
        
        this.win();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
    this.endGame = true;
    ENEMY_SPEED = 3;
    let name = document.getElementById('user-name').value;
    if (name === "") {
      name = 'Player 1';
    }
    this.saveScoreName(name);
  }

  win() {
    if (this.score.points === 80) {
      this.winGame = true;
      setTimeout(() => {
        this.stop();
      }, 250);
    }
  }

  gameOver() {
    this.score.heartImages.pop(); // Elimina el último corazon
    this.isGameOver = true;
    this.enemies.splice(0, this.enemies.length);
    this.ship.sprite['isReady'] = false;
    setTimeout(() => {
      this.stop();
    }, 216.8);  
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy.collidesWith(this.ship) || enemy.y + enemy.h > this.canvas.height) {
        this.gameOver();
      }
    });

    this.ship.bullets = this.ship.bullets.filter((bullet) => {
      let enemyCollisions = []
      if (bullet instanceof SpecialBullet) {
        enemyCollisions = this.enemies.filter(enemy => enemy.collidesWith(bullet));
      } else {
        const enemyCollision = this.enemies.find(enemy => enemy.collidesWith(bullet));
        if (enemyCollision) {
          enemyCollisions.push(enemyCollision);
        }
      }
      
      if (enemyCollisions.length > 0) {
        enemyCollisions.forEach((enemyCollision) => {
          enemyCollision.lives--;
          if (enemyCollision.isDead()){
            this.score.winPoints();
          }
        }) 

        this.enemies = this.enemies.filter(enemy => !enemy.isDead());
        return false;
      } else {
        return true;
      }
    });

    this.enemies.forEach((enemy) => enemy.collision(this.ship, this.gameOver));
    if (this.ship.isDead()) {
      this.gameOver();
      
    };
  }

  move() {
    this.ship.move();
    this.enemies.forEach((enemy) => enemy.move());

    if (this.score.points === 20) {
      ENEMY_SPEED = 5;
    } else if (this.score.points === 40) {
      ENEMY_SPEED = 7;
    } else if (this.score.points === 60) {
      ENEMY_SPEED = 9;
    }
  }

  draw() {
    this.backGround.draw();
    this.score.draw(this.ship.lives);
    this.ship.draw();
    this.enemies.forEach((enemy) => enemy.draw());
  }

  saveScoreName(name) {
    const scores = localStorage.getItem(SCORE_KEY) ? JSON.parse(localStorage.getItem(SCORE_KEY)) : {};
    scores[name] = this.score.points;
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
  }

  clear() {
    this.ship.clear();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach(enemy => enemy.clear());
    this.score.clear(this.score.heartImages, this.ship.lives);
  }

}