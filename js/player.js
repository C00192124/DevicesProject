var keysDown = {};
var frame = 0;
var prevTime = Date.now();
var double;
var releaseTime;

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

addEventListener("touchstart", function (e) {
  if(((Date.now() - this.releaseTime) < 300)) {
    //Code for double tap
    console.log("double");
  }
  else if (((Date.now() - this.releaseTime) > 300)){
    //Code for single tap
    console.log("single");
  }
}, false);

addEventListener("touchend", function (e) {
  this.releaseTime = Date.now();
}, false);

function handleStart() {

}

function handleEnd() {

}

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

    if ((app.player.y) > 50) {
  		app.player.y -= 2;
      app.player.image.src = "assets/survivor/move/move_up.png";
    }
  }

  if(37 in keysDown) {

    if ((app.player.x) > 50) {
  		app.player.x -= 2;
      app.player.image.src = "assets/survivor/move/move_left.png";
    }
  }

  if(39 in keysDown) {

    if ((app.player.x + 64) < app.canvas.width - 50) {
      app.player.x += 2;
      app.player.image.src = "assets/survivor/move/move_right.png";
    }
  }

  if(40 in keysDown) {

  	if ((app.player.y + 64) < app.canvas.height - 50) {
      app.player.y += 2;
      app.player.image.src = "assets/survivor/move/move_down.png";
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
