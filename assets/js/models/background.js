class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.sprite = new Image();
    this.sprite.src = '/assets/img/bgGame.jpg';
    this.sprite.onload = () => {
      this.sprite.isReady = true;
    }
  }

  draw() {
    if (this.sprite.isReady) {
      this.ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.w,
        this.h
      );

      /*
      this.save()
      this.rect(x,y,w,h);
      this.stroke()
      this.restore()*/
    }
  }


}