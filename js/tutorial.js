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
var leftArrow;
var rightArrow;
var downArrow;
var upArrow;
var shoot;
var livesNo;
var timer;
var allowTimer;
var allowMove;

function Tutorial() {

  //Creating the player
  this.player = new Player({imagePath:"assets/survivor/move/move_right.png"});
  this.zombie = new Zombie();
  this.livesNo = 100;
  this.timer = 0;
  allowTimer = true;
  allowMove = false;

  //Load images for background
  this.stoneFloorImg = new Image();
  this.stumpFloorImg = new Image();
  this.flowerFloorImg = new Image();
  this.bFlowerFloorImg = new Image();
  this.emptyFloorImg = new Image();
  this.leftArrow = new Image();
  this.upArrow = new Image();
  this.rightArrow = new Image();
  this.downArrow = new Image();
  this.shoot = new Image();
  this.stoneFloorImg.src = "assets/forest/stoneFloor.png";
  this.emptyFloorImg.src = "assets/forest/emptyFloor.png";
  this.flowerFloorImg.src = "assets/forest/flowerFloor.png";
  this.bFlowerFloorImg.src = "assets/forest/bFlowerFloor.png";
  this.stumpFloorImg.src = "assets/forest/stumpFloor.png";
  this.leftArrow.src = "assets/menu/leftArrow.png";
  this.upArrow.src = "assets/menu/upArrow.png";
  this.rightArrow.src = "assets/menu/rightArrow.png";
  this.downArrow.src = "assets/menu/downArrow.png";
  this.shoot.src = "assets/menu/shoot.png";
}

Tutorial.prototype.update = function() {

  if(allowTimer) {
    this.timer++;
  }

  if(allowMove){
    this.player.move();
  }

  if(this.zombie.isLoaded) {
    this.zombie.zombieChase();
  }
}

Tutorial.prototype.collision = function() {

  if((this.zombie.x < this.player.x + 50) && (this.zombie.x + 50 > this.player.x)
    && (this.zombie.y < this.player.y + 50) && (this.zombie.y + 50 > this.player.y)) {

      this.livesNo -= 0.1;
    }
}

Tutorial.prototype.draw = function() {

  for(i=0;i<11;i++) {
    for(j=0;j<11;j++) {
      if(level.levelData[i][j] === "stoneFloor") {
        app.ctx.drawImage(this.stoneFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "flowerFloor") {
        app.ctx.drawImage(this.flowerFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "bFlowerFloor") {
        app.ctx.drawImage(this.bFlowerFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "emptyFloor") {
        app.ctx.drawImage(this.emptyFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelData[i][j] === "stumpFloor") {
        app.ctx.drawImage(this.stumpFloorImg, j * 64, i * 64, 64, 64);
      }
    }
  }

  if(this.player.isLoaded) {
    this.player.draw();
  }

  if(this.zombie.isLoaded) {
    this.zombie.draw();
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
  app.ctx.font = "36px Roboto";
  app.ctx.textAlign = "center";
  app.ctx.textBaseline = "middle";

  if(this.timer > 0 && this.timer < 180) {
    app.ctx.fillText("Learn to survive", app.canvas.width / 2, app.canvas.height / 2);
  }
  else if(this.timer > 180 && this.timer < 360) {
    app.ctx.fillText("Follow the instructions to learn the basics", app.canvas.width / 2, app.canvas.height / 2);
  }
  else if(this.timer > 360 && this.timer < 540){
    app.ctx.fillText("Use the arrows to move", app.canvas.width / 2, app.canvas.height / 2);
    allowMove = true;
  }
  else if(this.timer > 540){
    app.ctx.fillText("Use spacebar to shoot the zombie", app.canvas.width / 2, app.canvas.height / 2);
    this.zombie.init({imagePath:"assets/zombie/move/move_right.png",x:64,y:64});
    allowTimer = false;
  }
  else if(!this.zombie.isLoaded && this.timer > 540) {
    allowMove = false;
    allowTimer= true;
    app.ctx.fillText("Your health will decrease if a zombie touches you", app.canvas.width / 2, app.canvas.height / 2);
  }
  else if(this.timer > 600 && this.timer < 780){
    app.ctx.fillText("Congratulations you are ready", app.canvas.width / 2, app.canvas.height / 2);
    allowMove = true;
  }

  app.ctx.drawImage(this.upArrow, 64, app.canvas.height - 128);
  app.ctx.drawImage(this.downArrow, 64, app.canvas.height - 64);
  app.ctx.drawImage(this.leftArrow, 0, app.canvas.height - 64);
  app.ctx.drawImage(this.rightArrow, 128, app.canvas.height - 64);
  app.ctx.drawImage(this.shoot, app.canvas.width - 128, app.canvas.height - 64);

  app.ctx.textAlign = "left";
  app.ctx.textBaseline = "top";
  app.ctx.fillText("" + Math.round(this.livesNo), 0,0);
}
