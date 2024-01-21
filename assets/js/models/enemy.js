class Enemy {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.ceil(ENEMY_WIDTH / 6);
    this.h = Math.ceil(ENEMY_HEIGHT / 6);

    this.vy = ENEMY_SPEED;
    this.vx = ENEMY_SPEED;
    this.timeCounter = 0;
    this.lr = 0
    this.lives = 1;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/eDer.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }
  }

  isDead() {
    return this.lives <= 0;
  }

  move() {
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
      this.timeCounter++;
    } else if (this.lr === 1 && !(this.x < 0)) {
      this.x -= this.vx;
      this.timeCounter++;
    } else {
      this.y += this.h;
      if (this.lr === 0) {
        this.lr++;
      } else {
        this.lr--;
      }
    }


  }

  draw() {
    if (this.sprite.isReady) {
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
    }
  }

  animate() {

  }

  clear() {

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