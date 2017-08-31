var player;
var zombie;
var zomInit;
var timer;
var spawn;
var level;
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
var corner;
var gameOver = false;
var kills;
var limit;
var boltImg;
var boltAlive = true;
var boltTimer;

addEventListener("keydown", keyDown);

function keyDown(e) {
  if(playGame){
    if(e.keyCode === 27 && gameOver) {
        bMenu = true;
        playGame = false;
        gameOver = false;
        app.menu = new MainMenu();
    }
    if(e.keyCode === 13 && gameOver) {
        gameOver = false;
        app.game = new Gameplay();
    }
  }
}

function Gameplay() {

  app.zombie = [];

  //Creating the player
  app.player = new Player({imagePath:"assets/survivor/move/move_right.png"});
  this.spawn = true;
  this.corner = false;
  this.livesNo = 100;
  app.kills = 0;
  this.limit = 320;
  this.boltTimer = 0;

  level = {
    "levelOne": [
      ["stoneFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stumpFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stumpFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor"]
    ],
    "levelTwo": [
      ["stoneFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","stumpFloor"],
      ["stoneFloor","emptyFloor","bFlowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stoneFloor","emptyFloor","emptyFloor","flowerFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stumpFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","emptyFloor","bFlowerFloor","emptyFloor","emptyFloor","stoneFloor"],
      ["stumpFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stoneFloor","stumpFloor"]
    ]
  };

  //Load images for background
  app.stoneFloorImg = new Image();
  app.stumpFloorImg = new Image();
  app.flowerFloorImg = new Image();
  app.bFlowerFloorImg = new Image();
  app.emptyFloorImg = new Image();
  app.boltImg = new Image();
  app.stoneFloorImg.src = "assets/forest/stoneFloor.png";
  app.emptyFloorImg.src = "assets/forest/emptyFloor.png";
  app.flowerFloorImg.src = "assets/forest/flowerFloor.png";
  app.bFlowerFloorImg.src = "assets/forest/bFlowerFloor.png";
  app.stumpFloorImg.src = "assets/forest/stumpFloor.png";
  app.boltImg.src = "assets/pickup/bolt.png";
}

Gameplay.prototype.update = function() {

  if(playGame){
    if(!gameOver) {
      if(!levelTwo){
        for(i = 0; i < app.zombie.length; i++) {
          if(app.zombie[i].dead){
            app.zombie[i].deathTimer++;
            if(app.zombie[i].deathTimer > 30){
              app.zombie[i].isLoaded = false;
              app.zombie.splice(i,1);
              app.kills += 1;
            }
          }
          else {app.zombie[i].zombieChase();}
        }
        app.player.move();

        if(this.timer < this.limit) {
          this.timer++;
        }
        else {
          this.pushZombie();
          this.pushZombie();
          this.timer = 0;
          if(this.limit > 80) {
            this.limit -= 20;
          }
        }

        if(app.kills === 20) {
          levelTwo = true;
          this.kills = 0;
          this.boltTimer = 0;
          app.game = new Gameplay();
        }
      }

      ///////////LevelTwo//////////////
      else {
        for(i = 0; i < app.zombie.length; i++) {
          if(app.zombie[i].dead){
            app.zombie[i].deathTimer++;
            if(app.zombie[i].deathTimer > 30){
              app.zombie[i].isLoaded = false;
              app.zombie.splice(i,1);
              app.kills += 1;
            }
          }
          else {app.zombie[i].zombieChase();}
        }
        app.player.move();

        if(this.timer < this.limit) {
          this.timer++;
        }
        else {
          this.pushZombie();
          this.pushZombie();
          this.timer = 0;
          if(this.limit > 80) {
            this.limit -= 20;
          }
        }
      }
    }
  }

  if(this.livesNo <= 0)
  {
    gameOver = true;
  }
}

Gameplay.prototype.collision = function() {

if(!levelTwo){
  for(i = 0; i < app.zombie.length; i++) {

    if((app.zombie[i].x < app.player.x + 50) && (app.zombie[i].x + 50 > app.player.x)
      && (app.zombie[i].y < app.player.y + 50) && (app.zombie[i].y + 50 > app.player.y)) {
        if(this.livesNo > 0) {
          this.livesNo -= 0.1;
        }
      }
    }
  }

  /////////////LevelTwo////////////
  else{
    for(i = 0; i < app.zombie.length; i++) {

      if((app.zombie[i].x < app.player.x + 50) && (app.zombie[i].x + 50 > app.player.x)
        && (app.zombie[i].y < app.player.y + 50) && (app.zombie[i].y + 50 > app.player.y)) {
          if(this.livesNo > 0) {
            this.livesNo -= 0.2;
          }
        }
      }
      if(app.player.x < 200 + 46 && app.player.x > 200
      && app.player.y < 200 + 46 && app.player.y > 200 && boltAlive){
        boltAlive = false;
        this.boltTimer = 0;
      }
  }
}

Gameplay.prototype.draw = function() {

if(!levelTwo){
  for(i=0;i<11;i++) {
    for(j=0;j<11;j++) {
      if(level.levelOne[i][j] === "stoneFloor") {
        app.ctx.drawImage(app.stoneFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelOne[i][j] === "emptyFloor") {
        app.ctx.drawImage(app.emptyFloorImg, j * 64, i * 64, 64, 64);
      }
      if(level.levelOne[i][j] === "stumpFloor") {
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
      app.zombie[i].splat();
    }
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
  app.ctx.font = "56px Roboto";
  app.ctx.textAlign = "left";
  app.ctx.textBaseline = "top";
  app.ctx.fillText("" + Math.round(this.livesNo), 0,0);
  app.ctx.fillText("Kills:" + app.kills, app.canvas.width - 200 ,0);

  if(gameOver) {
    app.ctx.font = "36px Roboto";
    app.ctx.textAlign = "center";
    app.ctx.textBaseline = "middle";
    app.ctx.fillText("Game Over, Esc to Exit, Return to Retry", app.canvas.width/2,app.canvas.height/2);
  }

 }
 else {

   for(i=0;i<11;i++) {
     for(j=0;j<11;j++) {
       if(level.levelTwo[i][j] === "stoneFloor") {
         app.ctx.drawImage(app.stoneFloorImg, j * 64, i * 64, 64, 64);
       }
       if(level.levelTwo[i][j] === "flowerFloor") {
         app.ctx.drawImage(app.flowerFloorImg, j * 64, i * 64, 64, 64);
       }
       if(level.levelTwo[i][j] === "bFlowerFloor") {
         app.ctx.drawImage(app.bFlowerFloorImg, j * 64, i * 64, 64, 64);
       }
       if(level.levelTwo[i][j] === "emptyFloor") {
         app.ctx.drawImage(app.emptyFloorImg, j * 64, i * 64, 64, 64);
       }
       if(level.levelTwo[i][j] === "stumpFloor") {
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
       app.zombie[i].splat();
     }
   }

   if(boltAlive){
     app.ctx.drawImage(app.boltImg, 200, 200);
   }
   else {
     this.boltTimer++;
     if(this.boltTimer > 300){
       boltAlive = true;
     }
   }

   app.ctx.fillStyle = "rgb(255, 255, 255)";
   app.ctx.font = "56px Roboto";
   app.ctx.textAlign = "left";
   app.ctx.textBaseline = "top";
   app.ctx.fillText("" + Math.round(this.livesNo), 0,0);
   app.ctx.fillText("Kills:" + app.kills, app.canvas.width - 200 ,0);

   if(gameOver) {
     app.ctx.font = "36px Roboto";
     app.ctx.textAlign = "center";
     app.ctx.textBaseline = "middle";
     app.ctx.fillText("Game Over, Esc to Exit, Return to Retry", app.canvas.width/2,app.canvas.height/2);
   }
 }

}

Gameplay.prototype.pushZombie = function() {

  app.zomInit = new Zombie();
  if(this.spawn) {
    if(!this.corner) {
      app.zomInit.init({imagePath:"assets/zombie/move/move_right.png",x:app.canvas.width - 128,y:64});
      this.spawn = false;
      this.corner = false;
    }
    else {
      app.zomInit.init({imagePath:"assets/zombie/move/move_right.png",x:64,y:64});
      this.spawn = false;
      this.corner = true;
    }
  }
  else {
    if(this.corner) {
      app.zomInit.init({imagePath:"assets/zombie/move/move_left.png", x:app.canvas.width - 128, y:app.canvas.height - 128});
      this.spawn = true;
      this.corner = false;
    }
    else {
      app.zomInit.init({imagePath:"assets/zombie/move/move_left.png", x:64, y:app.canvas.height - 128});
      this.spawn = true;
      this.corner = true;
    }
  }
  app.zombie.push(app.zomInit);

}
