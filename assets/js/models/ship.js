class Ship {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = Math.ceil(SHIP_WIDTH / 10);
    this.h = Math.ceil(SHIP_HEIGHT / 10);

    this.wExplotion = EXPLOTION_WIDTH;
    this.hExplotion = EXPLOTION_HEIGHT;
    this.countIndex = 0;
    this.countSpecialAttack = 0;

    this.vx = SPEED_MOVE;
    this.lives = 5;
    this.sound_permission = true;

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

    this.spriteExplotion = new Image();
    this.spriteExplotion.src = '/assets/img/explosion.png';
    this.spriteExplotion.verticalFrames = 1;
    this.spriteExplotion.verticalFrameIndex = 0;
    this.spriteExplotion.horizontalFrames = 15;
    this.spriteExplotion.horizontalFrameIndex = 0;
    this.spriteExplotion.onload = () => {
      this.spriteExplotion.isReady = true;
      this.spriteExplotion.frameWidth = Math.ceil(this.spriteExplotion.width / this.spriteExplotion.horizontalFrames);
      this.spriteExplotion.frameHeight = Math.ceil(this.spriteExplotion.height / this.spriteExplotion.verticalFrames);
    }

    this.movements = {
      right: false,
      left: false,
      isShutting: false,
      keyUp: false,
      specialAttack: false
    }

    this.bullets = [];

  }

  isDead() {
    return this.lives <= 0;
  }

  fire() {
    if (!this.movements.isShutting) {
      this.movements.isShutting = true;
      this.bullets.push(new Bullet(this.ctx, this.x + (this.w / 3) + 4, this.y));
      setTimeout(() => this.movements.isShutting = false, SHIP_BULLET_RECHARGED);
    }

    const shootSound = new Audio('/assets/sounds/ship_shoot.mp3');
    if (this.sound_permission) {
      shootSound.play();
    }
    
  }

  fireSpecialAttack() {
    if (!this.movements.specialAttack) {
      this.movements.specialAttack = true;
      this.bullets.push(new SpecialBullet(this.ctx, this.x + (this.w / 3) + 4, this.y));
      setTimeout(() => this.movements.specialAttack = false, SHIP_BULLET_RECHARGED);
    }
  }

  clear() {
    this.bullets = this.bullets.filter((bullet) => bullet.y < this.ctx.canvas.height);
  }

  onKeyEvent(event, points) {
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
        if (enabled) {
          this.fire();
        }
        break;
      case KEY_SPECIAL_POWER:
        if (points >= 20 && this.countSpecialAttack < 1) {
          this.countSpecialAttack++;
          this.fireSpecialAttack();
        } else if (points >= 40 && this.countSpecialAttack < 2) {
          this.countSpecialAttack++;
          this.fireSpecialAttack();
        } else if (points >= 60 && this.countSpecialAttack < 3) {
          this.countSpecialAttack++;
          this.fireSpecialAttack();
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

  deathExplotion() {
    if(this.spriteExplotion.isReady) {
      this.ctx.drawImage(
        this.spriteExplotion,
        this.spriteExplotion.horizontalFrameIndex * this.spriteExplotion.frameWidth,
        this.spriteExplotion.verticalFrameIndex * this.spriteExplotion.frameHeight,
        this.spriteExplotion.frameWidth,
        this.spriteExplotion.frameHeight,
        this.x -40,
        this.y -60,
        this.wExplotion,
        this.hExplotion,
      );
      
      this.spriteExplotion.horizontalFrameIndex = (this.spriteExplotion.horizontalFrameIndex + 1) % this.spriteExplotion.horizontalFrames;
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
        this.h,
        this.w 
      );
    }

    this.bullets.forEach((bullet) => bullet.draw());
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