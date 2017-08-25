var keysDown = {};
var frame = 0;
var timerB = false;
var prevTime = Date.now();
var timer = 0;
var direction;

document.addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

document.addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

document.addEventListener("touchstart", function (e) {

}, false);

document.addEventListener("touchend", function (e) {

}, false);

//Loading in a Player
function Player(options) {
  this.load(options.imagePath);
  this.x = app.canvas.width/2;
  this.y = app.canvas.height/2 + 100;
  this.isLoaded = false;
}

Player.prototype.load = function(imagePath) {
  this.image = new Image();
  var that = this;
  this.image.src = imagePath;
  this.image.onload = function() {
    that.isLoaded = true;
  }
};

Player.prototype.draw = function() {

  if((Date.now() - prevTime) > 100) {
    if(frame === 6) {
      frame = 0;
    }
    frame+= 1;
    prevTime = Date.now();
  }
  app.ctx.drawImage(this.image, frame*64, 0, 64, 64, this.x, this.y, 64, 64);

}

Player.prototype.move = function() {

  if(38 in keysDown) {

    if ((this.y) > 50) {
  		this.y -= 2;
      this.image.src = "assets/survivor/move/move_up.png";
      this.direction = 0;
    }
  }

  if(37 in keysDown) {

    if ((this.x) > 50) {
  		this.x -= 2;
      this.image.src = "assets/survivor/move/move_left.png";
      this.direction = 1;
    }
  }

  if(39 in keysDown) {

    if ((this.x + 64) < app.canvas.width - 50) {
      this.x += 2;
      this.image.src = "assets/survivor/move/move_right.png";
      this.direction = 3;
    }
  }

  if(40 in keysDown) {

  	if ((this.y + 64) < app.canvas.height - 50) {
      this.y += 2;
      this.image.src = "assets/survivor/move/move_down.png";
      this.direction = 2;
    }
  }

  if(32 in keysDown) {

    app.shootEffect.play();

    if(!bTutorial){
      for(i = 0; i < app.zombie.length; i++) {

        if(((app.zombie[i].x > this.x) && (app.zombie[i].x < this.x + 125)) && (app.zombie[i].y > this.y - 32 && app.zombie[i].y < this.y + 32)
          && (this.direction === 3)) {
            app.zombie[i].isLoaded = false;
            app.zombie.splice(i,1);
            app.killEffect.play();
          }

          else if(((app.zombie[i].y > this.y) && (app.zombie[i].y < this.y + 125)) && (app.zombie[i].x > this.x - 32 && app.zombie[i].x < this.x + 32)
          && (this.direction === 2)) {
            app.zombie[i].isLoaded = false;
            app.zombie.splice(i,1);
            app.killEffect.play();
          }

          else if(((app.zombie[i].x < this.x) && (app.zombie[i].x > this.x - 125)) && (app.zombie[i].y > this.y - 32 && app.zombie[i].y < this.y + 32)
          && (this.direction === 1)) {
            app.zombie[i].isLoaded = false;
            app.zombie.splice(i,1);
            app.killEffect.play();
          }

          else if(((app.zombie[i].y < this.y) && (app.zombie[i].y > this.y - 125)) && (app.zombie[i].x > this.x - 32 && app.zombie[i].x < this.x + 32)
          && (this.direction === 0)) {
            app.zombie[i].isLoaded = false;
            app.zombie.splice(i,1);
            app.killEffect.play();
          }
        }
      }
      else {
        if(((app.tutZombie.x > this.x) && (app.tutZombie.x < this.x + 125)) && (app.tutZombie.y > this.y - 32 && app.tutZombie.y < this.y + 32)
          && (this.direction === 3)) {
            app.tutZombie.isLoaded = false;
            app.killEffect.play();
          }

          else if(((app.tutZombie.y > this.y) && (app.tutZombie.y < this.y + 125)) && (app.tutZombie.x > this.x - 32 && app.tutZombie.x < this.x + 32)
          && (this.direction === 2)) {
            app.tutZombie.isLoaded = false;
            app.killEffect.play();
          }

          else if(((app.tutZombie.x < this.x) && (app.tutZombie.x > this.x - 125)) && (app.tutZombie.y > this.y - 32 && app.tutZombie.y < this.y + 32)
          && (this.direction === 1)) {
            app.tutZombie.isLoaded = false;
            app.killEffect.play();
          }

          else if(((app.tutZombie.y < this.y) && (app.tutZombie.y > this.y - 125)) && (app.tutZombie.x > this.x - 32 && app.tutZombie.x < this.x + 32)
          && (this.direction === 0)) {
            app.tutZombie.isLoaded = false;
            app.killEffect.play();
          }
      }
  }
}
