function Zombie() {}

Zombie.prototype.init = function(options) {
  this.load(options.imagePath);
  this.x = options.x;
  this.y = options.y;
  this.isLoaded = false;
}

Zombie.prototype.load = function(imagePath) {
  this.image = new Image();
  var that = this;
  this.image.src = imagePath;
  this.image.onload = function() {
    that.isLoaded = true;
  }
}

Zombie.prototype.draw = function() {

  if((Date.now() - prevTime) > 100) {
    if(frame === 6) {
      frame = 0;
    }
    frame+= 1;
    prevTime = Date.now();
  }
  app.ctx.drawImage(this.image, frame*64, 0, 64, 64, this.x, this.y, 64, 64);

}

Zombie.prototype.zombieChase = function() {

  if(this.isLoaded == true) {
    
    if (app.player.x > this.x) {
      this.x = this.x + 0.5;
      this.image.src = "assets/zombie/move/move_right.png";
    }

    if (app.player.y > this.y) {
      this.y = this.y + 0.5;
      this.image.src = "assets/zombie/move/move_down.png";
    }

    if (app.player.x < this.x) {
      this.x = this.x - 0.5;
      this.image.src = "assets/zombie/move/move_left.png";
    }

    if (app.player.y < this.y) {
      this.y = this.y - 0.5;
      this.image.src = "assets/zombie/move/move_up.png";
    }
  }
}
