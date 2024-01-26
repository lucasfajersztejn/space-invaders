class Points {

  constructor(ctx, x, y, points = 0, lives = 0) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;

    this.wi = Math.ceil(LIVES_WIDTH / 24);
    this.hi = Math.ceil(LIVES_HEIGHT / 24);

    this.points = points;
    this.lives = lives;
    this.on = false;

    this.heartImages = [];

    this.sprite = new Image();
    this.sprite.src = '/assets/img/heart.png';
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

  pushLives(lives, sprite, heartImages) {
    if (heartImages.length === 0) {
      for (let i = 0; i < lives; i++) {
        heartImages.push(sprite);
      }
    }
    
  }

  drawHearts(heartImages, ctx, x, y, wi, hi) {
    heartImages.forEach((sprite) => {
      ctx.drawImage(
        sprite,
        sprite.horizontalFrameIndex * this.sprite.frameWidth,
        sprite.verticalFrameIndex * this.sprite.frameHeight,
        sprite.frameWidth,
        sprite.frameHeight,
        x + 20,
        y,
        wi,
        hi
      )
    })
  }

  clear(heartImages, lives) {
    if (heartImages.length !== lives) {
      heartImages.pop();
    }

  }

  winPoints(amount = 1) {
    this.points += amount;
  }

  draw(lives) {
    this.ctx.save();
    this.ctx.fillStyle = 'white'; 
    this.ctx.fillRect(this.x + 12, this.y + 20, 92, 20);

    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Prompt';
    this.ctx.fillText(`Score: ${this.points}`,this.x + 12, this.y + Math.ceil(this.y + this.h / 2));
    
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x + 12, this.y + 53, 55, 20);
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Lives:`, this.x + 12, this.y + Math.ceil(this.y + this.h / 2) * 2);
    this.ctx.restore();

    this.pushLives(lives, this.sprite, this.heartImages)
    
    this.heartImages.forEach((sprite, index) => {
      this.ctx.drawImage(
        sprite,
        sprite.horizontalFrameIndex * this.sprite.frameWidth,
        sprite.verticalFrameIndex * this.sprite.frameHeight,
        sprite.frameWidth,
        sprite.frameHeight,
        this.x + 70 + (25 * index) ,
        this.y + 53,
        this.wi,
        this.hi
      )
    });
  }


}