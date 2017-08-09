//Loading in a Sprite
function Sprite(options) {
  this.load(options.imagePath);
  this.x = 0;
  this.y = 50;
  this.isLoaded = false;
}

Sprite.prototype.load = function(imagePath) {
  this.image = new Image();
  var that = this;
  this.image.src = imagePath;
  this.image.onload = function() {
    that.isLoaded = true;
  }
};

Sprite.prototype.draw = function() {
  ctx.drawImage(this.image, this.x, this.y);
}
