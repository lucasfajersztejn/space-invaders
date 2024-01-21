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
    this.enemies = [];

  }

  onKeyEvent(event) {
    this.ship.onKeyEvent(event);
  }

  generateEnemies() {
    this.enemies_respawn = 0;
    let margin = 150;
    const limit = ENEMY_WIDTH_LIMIT / Math.ceil(ENEMY_WIDTH / 5);
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
      }, this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  gameOver() {
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
        }
        return false;
      } else {
        return true;
      }
    });

  }

  move() {
    this.ship.move();
    this.enemies.forEach((enemy) => enemy.move());
  }

  draw() {
    this.backGround.draw();
    this.ship.draw();
    this.enemies.forEach((enemy) => enemy.draw());
  }

  clear() {
    this.ship.clear();
    this.enemies.filter((enemy) => !enemy.isDead());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}