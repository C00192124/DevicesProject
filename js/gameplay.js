var player;
var zombie;
var level = {
  "levelData": [
    ["stoneFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stumpFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor"],
    ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","emptyFloor","emptyFloor","bFlowerFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stumpFloor"],
    ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","bFlowerFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","emptyFloor","bFlowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
    ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","stoneFloor"],
    ["stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor"]
  ]
}
var stoneFloorImg;
var flowerFloorImg;
var bFlowerFloorImg;
var emptyFloorImg;
var stumpFloorImg;

function Gameplay() {
  //Creating the player
  app.player = new Player({imagePath:"assets/survivor/move_right.png"});
  app.zombie = new Zombie({imagePath:"assets/zombie/move/skeleton-move_0_right.png"});
  app.stoneFloorImg = new Image();
  app.stumpFloorImg = new Image();
  app.flowerFloorImg = new Image();
  app.bFlowerFloorImg = new Image();
  app.emptyFloorImg = new Image();
  app.stoneFloorImg.src = "assets/forest/stoneFloor.png";
  app.emptyFloorImg.src = "assets/forest/emptyFloor.png";
  app.flowerFloorImg.src = "assets/forest/flowerFloor.png";
  app.bFlowerFloorImg.src = "assets/forest/bFlowerFloor.png";
  app.stumpFloorImg.src = "assets/forest/stumpFloor.png";
  app.zombie.x = app.canvas.width - 100;
}

Gameplay.prototype.update = function() {
  app.zombie.zombieChase();
  app.player.move();
}

Gameplay.prototype.draw = function() {

  for(i=0;i<11;i++) {
    for(j=0;j<11;j++) {
      if(level.levelData[i][j] === "stoneFloor") {
        app.ctx.drawImage(app.stoneFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "flowerFloor") {
        app.ctx.drawImage(app.flowerFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "bFlowerFloor") {
        app.ctx.drawImage(app.bFlowerFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "emptyFloor") {
        app.ctx.drawImage(app.emptyFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "stumpFloor") {
        app.ctx.drawImage(app.stumpFloorImg, j * 64, i * 64, 64, 64);
      }
    }
  }
  if(app.player.isLoaded) {
    app.player.draw();
  }
  if(app.zombie.isLoaded) {
    app.zombie.draw();
  }
}
