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

  }

  onKeyEvent(event) {
    this.ship.onKeyEvent(event);
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
        this.move();
        this.checkCollisions();
        this.enemies_respawn === 180 ? this.generateEnemies() : this.enemies_respawn++;
        this.draw();
        this.win();
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  win() {
    if (this.score.points === 30) {
      this.stop();
    }
  }

  gameOver() {
    this.score.heartImages.pop();
    this.stop();
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy.collidesWith(this.ship) || enemy.y + enemy.h > this.canvas.height) {
        this.gameOver();
      }
    });

    this.ship.bullets = this.ship.bullets.filter((bullet) => {
      const enemyCollision = this.enemies.find(enemy => enemy.collidesWith(bullet));
      if (enemyCollision) {
        enemyCollision.lives--;
        if (enemyCollision.isDead()){
          this.enemies = this.enemies.filter(enemy => enemy !== enemyCollision);
          this.score.winPoints();
        }
        return false;
      } else {
        return true;
      }
    });

    this.enemies.forEach((enemy) => enemy.collision(this.ship, this.gameOver));
    if (this.ship.isDead()) {this.gameOver()};

  }

  move() {
    this.ship.move();
    this.enemies.forEach((enemy) => enemy.move());
  }

  draw() {
    this.backGround.draw();
    this.score.draw(this.ship.lives);
    this.ship.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    
  }

  clear() {
    this.ship.clear();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach(enemy => enemy.clear());
    this.score.clear(this.score.heartImages, this.ship.lives);
  }

}