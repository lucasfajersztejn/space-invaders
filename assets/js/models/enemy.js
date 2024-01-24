class Enemy {
  constructor(ctx, x, y) {
    this.ctx = ctx;
  
    this.x = x;
    this.y = y;
    this.w = Math.ceil(ENEMY_WIDTH / 6);
    this.h = Math.ceil(ENEMY_HEIGHT / 6);

    this.vy = ENEMY_SPEED;
    this.vx = ENEMY_SPEED;

    this.shootCount = 0
    this.bullets = [];

    this.candeciaDeTiro = Math.floor(Math.random() * 500) + 360
    //this.number = n;
    this.timeCounter = 0;
    this.lr = 0
    this.lives = 1;
    this.animationTick = 0;

    this.sprite = new Image();
    //this.sprite.src = `/assets/img/e${this.number}.png`;
    this.sprite.src = `/assets/img/enemySprite.png`;
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 2;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }
  }

  collision(ship){
    this.bullets = this.bullets.filter((bullet) => {
      const shipCollision = ship.collidesWith(bullet);
      if (shipCollision) {
        ship.lives--;
        return false;
      } else {
        return true;
      }
    });
    
  }

  isDead() {
    return this.lives <= 0;
  }

  move() {
    // Movimiento 2
    // this.timeCounter++;
    // if(this.timeCounter === 180){
    //   this.y += this.h;
    //   this.timeCounter = 0;
    // } else if (this.timeCounter === 120) {
    //   if (this.lr % 2 === 0) {
    //     this.x += this.w;
    //     this.lr++;
    //   } else {
    //     this.x -= this.w;
    //     this.lr++;
    //   }
    // }
    
    if(this.lr === 0 && !(this.x + this.w > WINDOW_WIDTH)){
      this.x += this.vx;
    } else if (this.lr === 1 && !(this.x < 0)) {
      this.x -= this.vx;
    } else {
      this.y += this.h;
      if (this.lr === 0) {
        this.lr++;
      } else {
        this.lr--;
      }
    }

    this.bullets.forEach(bullet => bullet.move());
  
  }

  draw() {
    if (this.sprite.isReady) {
      this.shootCount++;
      if (this.shootCount > this.candeciaDeTiro) {
        this.shootCount = 0
        this.bullets.push(new Bullet(this.ctx, this.x + (this.w / 2), this.y + this.h, -5));
      }

      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.bullets.forEach(bullet => bullet.draw())

      this.animate();
    }
  }

  animate() {
    if(this.lr === 0) {
      this.sprite.horizontalFrameIndex = 0;
    } else if (this.lr === 1) {
      this.sprite.horizontalFrameIndex = 1;
    }

  }
    

  clear() {
    this.bullets = this.bullets.filter(bullet => bullet.y < WINDOW_HEIGHT);
  }

  collidesWith(element) {
    return (
      this.x + this.w > element.x &&
      this.x < element.x + element.w &&
      this.y + this.h > element.y &&
      this.y < element.y + element.h
    )
  }


}