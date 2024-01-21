class Ship {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.ceil(SHIP_WIDTH / 10);
    this.h = Math.ceil(SHIP_HEIGHT / 10);

    this.vx = SPEED_MOVE;

    this.sprite = new Image()
    this.sprite.src = '/assets/img/ship.png';
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 1;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.onload = () => {
      this.sprite.isReady = true;
      this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
    }

    this.movements = {
      right: false,
      left: false,
      isShutting: false,
      keyUp: false
    }

    this.bullets = [];

  }

  fire() {
    if(!this.movements.isShutting) {
      this.movements.isShutting = true;
      this.bullets.push(new Bullet(this.ctx, this.x + (this.w / 3) + 4, this.y));
      setTimeout(() => this.movements.isShutting = false, SHIP_BULLET_RECHARGED);
    }
  }

  clear() {
    this.bullets = this.bullets.filter((bullet) => bullet.y < this.ctx.canvas.height);
  }

  onKeyEvent(event) {
    const enabled = event.type === 'keydown';
    const keyUp = event.type === 'keyup';

    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = enabled;  
        break;
      case KEY_LEFT:
        this.movements.left = enabled;
        break;
      case KEY_FIRE:
        if(enabled) {
          this.fire();
        }
        break;
    }
  }

  move() {
    if (this.movements.right) {
      this.x += this.vx;
    } else if (this.movements.left) {
      this.x -= this.vx;
    }

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > WINDOW_WIDTH) {
      this.x = WINDOW_WIDTH - this.w;
    }

    this.bullets.forEach((bullet) => bullet.move());
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
        this.h,
        this.w 
      );
    }

    this.bullets.forEach((bullet) => bullet.draw());
  }
}