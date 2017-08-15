var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

//Loading in a Player
function Player(options) {
  this.load(options.imagePath);
  this.x = app.canvas.width/2;
  this.y = app.canvas.height/2;
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
  app.ctx.drawImage(this.image, this.x, this.y);
}

Player.prototype.move = function() {
  if(38 in keysDown) {

    if ((app.player.y) > 2) {
  		 app.player.y -= 2;
      app.player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_up.png";
    }
  }

  if(37 in keysDown) {

    if ((app.player.x) > 2) {
  		 app.player.x -= 2;
      app.player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_left.png";
    }
  }

  if(39 in keysDown) {

    if ((app.player.x + 96) < app.canvas.width - 2) {
      app.player.x += 2;
      app.player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png";
    }
  }

  if(40 in keysDown) {

  	if ((app.player.y + 96) < app.canvas.height - 2) {
      app.player.y += 2;
      app.player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_down.png";
    }
  }

  /*if(32 in keysDown) {

    if(((app.zombie.x > app.player.x) && (app.zombie.x < app.player.x + 200)) && (app.zombie.y == app.player.y)) {
      app.zombie.isLoaded = false;
    }

    if(((app.zombie.y > app.player.y) && (app.zombie.y < app.player.y + 200)) && (app.zombie.x == app.player.x)) {
      app.zombie.isLoaded = false;
    }

    if(((app.zombie.x < app.player.x) && (app.zombie.x > app.player.x - 200)) && (app.zombie.y == app.player.y)) {
      app.zombie.isLoaded = false;
    }

    if(((app.zombie.y < app.player.y) && (app.zombie.y > app.player.y - 200)) && (app.zombie.x == app.player.x)) {
      app.zombie.isLoaded = false;
    }
  }*/
  
}
