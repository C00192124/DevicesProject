var volume;
var volUp;
var volUpP;
var volDown;
var volDownP;
var volumeNo = 50;
var volSwitch = true;

addEventListener("keydown", updateOpt);
addEventListener("touchstart", clickOpt);

function OptionsMenu() {

  this.volume = new Image();
  this.volume.src = "assets/menu/volume.png"
  this.volUp = new Image();
  this.volUp.src = "assets/menu/plus.png"
  this.volUpP = new Image();
  this.volUpP.src = "assets/menu/plusP.png"
  this.volDown = new Image();
  this.volDown.src = "assets/menu/minus.png"
  this.volDownP = new Image();
  this.volDownP.src = "assets/menu/minusP.png"
  this.back = new Image();
  this.back.src = "assets/menu/menuBack.png";

}

function clickOpt(e) {

  if(bOptions){
    touches = e.touches;
    tX = touches[0].clientX;
    tY = touches[0].clientY;

    if((tX > (app.canvas.width / 3 * 1) + 100) && (tX < (app.canvas.width / 3 * 1) + 180)
    && (tY < (app.canvas.height / 3 * 2) + 50) && (tY > (app.canvas.height / 3 * 2) - 50)) {
      volumeNo -= 5;
      app.menuMusic.volume = volumeNo/100;
      app.gameMusic.volume = volumeNo/100;
    }

    if((tX > (app.canvas.width / 3 * 2) + 100) && (tX < (app.canvas.width / 3 * 2) + 180)
    && (tY < (app.canvas.height / 3 * 2) + 50) && (tY > (app.canvas.height / 3 * 2) - 50)) {
      volumeNo += 5;
      app.menuMusic.volume = volumeNo/100;
      app.gameMusic.volume = volumeNo/100;
    }
  }
}

function updateOpt(e) {

if(bOptions){
  if(e.keyCode === 37) {
    if(volSwitch) {
      volSwitch = false;
    }
    else {
      volSwitch = true;
    }
  }

  if(e.keyCode === 39) {
    if(volSwitch) {
      volSwitch = false;
    }
    else {
      volSwitch = true;
    }
  }

  if(e.keyCode === 13) {
    if(volSwitch && volumeNo > 0) {
      volumeNo -= 5;
    }
    else if(!volSwitch && volumeNo < 100){
      volumeNo += 5;
    }
    app.menuMusic.volume = volumeNo/100;
    app.gameMusic.volume = volumeNo/100;
  }

  if(e.keyCode === 27) {
    bOptions = false;
    bMenu = true;
    app.menu = new MainMenu();
  }
 }
}

OptionsMenu.prototype.draw = function() {

  app.ctx.drawImage(this.back,0,0);
  app.ctx.drawImage(this.volume, (app.canvas.width / 2) - 50, ((app.canvas.height / 3) * 1) - 50);

  if(volSwitch) {
    app.ctx.drawImage(this.volDownP, ((app.canvas.width / 3) * 1)- 50, ((app.canvas.height / 3) * 2) - 50);
    app.ctx.drawImage(this.volUp, ((app.canvas.width / 3) * 2)- 50, ((app.canvas.height / 3) * 2) - 50);
  }
  else {
    app.ctx.drawImage(this.volDown, ((app.canvas.width / 3) * 1)- 50, ((app.canvas.height / 3) * 2) - 50);
    app.ctx.drawImage(this.volUpP, ((app.canvas.width / 3) * 2)- 50, ((app.canvas.height / 3) * 2) - 50);
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "56px rubik";
	app.ctx.textAlign = "center";
	app.ctx.textBaseline = "middle";
	app.ctx.fillText("" + volumeNo, app.canvas.width / 2, ((app.canvas.height / 3) * 2));

	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Esc to Exit", 0, 0);

}
