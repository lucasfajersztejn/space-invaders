class SpecialBullet {
  constructor(ctx, x, y, vy = SPEED_BULLET) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.ceil(BULLET_SPECIAL_WIDTH / 14);
    this.h = Math.ceil(BULLET_SPECIAL_HEIGHT / 14);

    this.vy = vy;
    this.angle = 0;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/bulletSpecial.png';
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

      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x -25,
        this.y -60,
        this.w,
        this.h
      );
    }
  }

}