var player;
var zombie;

function Gameplay() {
  //Creating the player
  app.player = new Player({imagePath:"assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png"});
  app.zombie = new Zombie({imagePath:"assets/zombie/move/skeleton-move_0_right.png"});
  //app.level = new Level(1);
  app.zombie.x = app.canvas.width - 100;
}

Gameplay.prototype.update = function() {
  app.zombie.zombieChase();
  app.player.move();
}

Gameplay.prototype.draw = function() {
  if(app.player.isLoaded) {
    app.player.draw();
  }
  if(app.zombie.isLoaded) {
    app.zombie.draw();
  }
}
