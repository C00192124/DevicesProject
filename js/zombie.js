function Zombie(options) {
  this.load(options.imagePath);
  this.x = 0;
  this.y = 50;
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
  app.ctx.drawImage(this.image, this.x, this.y);
}

Zombie.prototype.zombieChase = function() {

  if(app.zombie.isLoaded == true) {

    if (app.player.x > app.zombie.x) {
      app.zombie.x = app.zombie.x + 0.5;
    }

    if (app.player.y > app.zombie.y) {
      app.zombie.y = app.zombie.y + 0.5;
    }

    if (app.player.x < app.zombie.x) {
      app.zombie.x = app.zombie.x - 0.5;
    }

    if (app.player.y < app.zombie.y) {
      app.zombie.y = app.zombie.y - 0.5;
    }
  }
}
