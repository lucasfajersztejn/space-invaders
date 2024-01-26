class Enemybullet {
  constructor(ctx, x, y, vy = SPEED_BULLET) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.ceil(BULLET_ENEMY_WIDTH / 35);
    this.h = Math.ceil(BULLET_ENEMY_HEIGHT / 35);

    this.vy = vy;
    this.angle = 0;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/bulletEnemy.png';
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

  move() {
    this.y -= this.vy;
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.save();
      this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      this.ctx.rotate(this.angle);

      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        -this.w / 2,
        -this.h / 2,
        this.w,
        this.h
      );

      this.ctx.restore()
    }
  }


}