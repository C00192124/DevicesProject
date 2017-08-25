var player;
var zombie;
var zomInit;
var timer;
var spawn;
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
var leftArrow;
var rightArrow;
var downArrow;
var upArrow;
var shoot;
var livesNo;
var levelTwo = false;

function Gameplay() {

  app.zombie = [];

  //Creating the player
  app.player = new Player({imagePath:"assets/survivor/move/move_right.png"});
  this.spawn = true;
  this.livesNo = 100;

  //Load images for background
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
}

Gameplay.prototype.update = function() {

if(!levelTwo){
  for(i = 0; i < app.zombie.length; i++) {
    app.zombie[i].zombieChase();
  }
  app.player.move();

  if(this.timer < 480) {
    this.timer++;
  }
  else {
    this.pushZombie();
    this.timer = 0;
  }
 }
}

Gameplay.prototype.collision = function() {

if(!levelTwo){
  for(i = 0; i < app.zombie.length; i++) {

    if((app.zombie[i].x < app.player.x + 50) && (app.zombie[i].x + 50 > app.player.x)
      && (app.zombie[i].y < app.player.y + 50) && (app.zombie[i].y + 50 > app.player.y)) {

        this.livesNo -= 0.1;
      }
  }
 }
}

Gameplay.prototype.draw = function() {

if(!levelTwo){
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

  for(i = 0; i < app.zombie.length; i++) {
    if(app.zombie[i].isLoaded) {
      app.zombie[i].draw();
    }
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
  app.ctx.font = "56px Roboto";
  app.ctx.textAlign = "left";
  app.ctx.textBaseline = "top";
  app.ctx.fillText("" + Math.round(this.livesNo), 0,0);

 }
 else {


 }

}

Gameplay.prototype.pushZombie = function() {

  app.zomInit = new Zombie();
  if(this.spawn) {
    app.zomInit.init({imagePath:"assets/zombie/move/move_right.png",x:64,y:64});
    this.spawn = false;
  }
  else {
    app.zomInit.init({imagePath:"assets/zombie/move/move_left.png", x:app.canvas.width - 128, y:app.canvas.height - 128});
    this.spawn = true;
  }
  app.zombie.push(app.zomInit);

}
