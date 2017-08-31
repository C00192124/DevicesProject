var player;
var tutZombie;
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
var livesNo;
var timer;
var rightPress = false;
var leftPress = false;
var upPress = false;
var downPress = false;
var allowMove = false;
var advance = false;
var advanced = false;

addEventListener("keydown", function(e) {

  if(bTutorial){
    if(allowMove && e.keyCode === 39 && bTutorial){ rightPress = true }
    if(allowMove && e.keyCode === 37 && bTutorial){ leftPress = true }
    if(allowMove && e.keyCode === 40 && bTutorial){ downPress = true }
    if(allowMove && e.keyCode === 38 && bTutorial){ upPress = true }
    if(e.keyCode === 27) {
      bTutorial = false;
      bMenu = true;
    }
  }
}, false);

function Tutorial() {

  //Creating the player
  this.player = new Player({imagePath:"assets/survivor/move/move_right.png"});
  app.tutZombie = new Zombie();
  this.livesNo = 100;
  this.timer = 0;

  //Load images for background
  this.stoneFloorImg = new Image();
  this.stumpFloorImg = new Image();
  this.flowerFloorImg = new Image();
  this.bFlowerFloorImg = new Image();
  this.emptyFloorImg = new Image();
  this.stoneFloorImg.src = "assets/forest/stoneFloor.png";
  this.emptyFloorImg.src = "assets/forest/emptyFloor.png";
  this.flowerFloorImg.src = "assets/forest/flowerFloor.png";
  this.bFlowerFloorImg.src = "assets/forest/bFlowerFloor.png";
  this.stumpFloorImg.src = "assets/forest/stumpFloor.png";
}

Tutorial.prototype.update = function() {

  this.timer++;

  if(allowMove){
    this.player.move();
  }

  if(this.timer > 0 && this.timer < 180 && !advance) {
    this.tutText = "Welcome To Bootcamp";
  }
  if(this.timer > 180 && this.timer < 360 && !advance) {
    this.tutText = "This Is Where You Will Learn To Survive";
  }
  if(this.timer > 360 && this.timer < 480 && !advance) {
    this.tutText = "First Things First,";
  }
  if(this.timer > 480 && !advance) {
    this.tutText = "Press Right/Left To Move Horizontally";
    allowMove = true;
  }
  if(this.timer > 600 && rightPress && leftPress && !advance) {
    this.tutText = "Press Up/Down To Move Vertically";
  }
  if(rightPress && leftPress && upPress && downPress && !advance) {
    advance = true;
    this.timer = 1020;
  }
  if(this.timer > 1020 && advance && this.timer < 1200) {
    this.tutText = "Step Two: Learn To Kill";
    app.tutZombie.init({imagePath:"assets/zombie/move/move_down.png",x:app.canvas.width/2,y:128});
  }
  if(this.timer > 1200 && advance && this.timer < 1400) {
    this.tutText = "This Is A Zombie, This One Is Harmless";
  }
  if(this.timer > 1400 && advance && this.timer < 1600) {
    this.tutText = "Unless You Walk Into It Of Course";
  }
  if(this.timer > 1600 && advance && this.timer < 1800) {
    this.tutText = "Kill It By Pressing Spacebar To Shoot";
  }
  if(this.timer > 1800 && advance && this.timer < 2000) {
    this.tutText = "You Must Be Facing It And Be Close Enough";
  }
  if(this.timer > 2000 && advance && !app.tutZombie.isLoaded && this.timer < 2200) {
    this.tutText = "Well Done You Have Completed Boot Camp";
  }
  if(this.timer > 2200 && advance && !app.tutZombie.isLoaded) {
    this.tutText = "Press Esc To Return To The Menu";
  }

}

Tutorial.prototype.collision = function() {

  if((app.tutZombie.x < this.player.x + 50) && (app.tutZombie.x + 50 > this.player.x)
    && (app.tutZombie.y < this.player.y + 50) && (app.tutZombie.y + 50 > this.player.y)) {

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

  if(app.tutZombie.isLoaded) {
    app.tutZombie.draw();
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
  app.ctx.font = "36px Roboto";
  app.ctx.textAlign = "center";
  app.ctx.textBaseline = "middle";

  app.ctx.fillText("" + this.tutText, app.canvas.width / 2, app.canvas.height / 2);

  app.ctx.textAlign = "left";
  app.ctx.textBaseline = "top";
  app.ctx.fillText("" + Math.round(this.livesNo), 0,0);
}
