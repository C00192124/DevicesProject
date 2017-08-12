app = {};
var keysDown = {};
var player;
var zombie;
var canvas;
var ctx;

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");

  //Creating the player
  app.player = new Player({imagePath:"assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png"});
  app.zombie = new Zombie({imagePath:"assets/zombie/move/skeleton-move_0_right.png"});
  app.zombie.x = app.canvas.width - 100;
}

function render() {
  if(app.player.isLoaded) {
    app.ctx.drawImage(app.player.image, app.player.x, app.player.y)
  }
  if(app.zombie.isLoaded) {
    app.ctx.drawImage(app.zombie.image, app.zombie.x, app.zombie.y)
  }
}

function clickHandler(e) {

}


//Game loop
setInterval(main, 16);

function main() {

  //app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  app.ctx.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);//clear the viewport AFTER the matrix is reset

  //Clamp the camera position to the world bounds while centering the camera around the player
  var camX = clamp(-app.player.x + app.canvas.width / 2, 0, 2016 - app.canvas.width);
  var camY = clamp(-app.player.y + app.canvas.height / 2, 0, 2016 - app.canvas.height);

  app.ctx.translate( camX, camY );

  render();
  app.zombie.zombieChase();

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

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}
