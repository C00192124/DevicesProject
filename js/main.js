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
  app.player = new Sprite({imagePath:"assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png"});
  app.zombie = new Sprite({imagePath:"assets/zombie/move/skeleton-move_0_right.png"});
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

function zombieChase() {

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

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  render();
  zombieChase();

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
