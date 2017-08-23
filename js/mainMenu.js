var play;
var playP;
var playSwitch = true;
var options;
var optionsP;
var optionsSwitch = false;
var exit;
var exitP;
var exitSwitch = false;
var back;

document.addEventListener("keydown", update);

function MainMenu() {

  this.play = new Image();
  this.play.src = "assets/menu/play.png";
  this.playP = new Image();
  this.playP.src = "assets/menu/playP.png";
  this.options = new Image();
  this.options.src = "assets/menu/settings.png";
  this.optionsP = new Image();
  this.optionsP.src = "assets/menu/settingsP.png";
  this.exit = new Image();
  this.exit.src = "assets/menu/exit.png";
  this.exitP = new Image();
  this.exitP.src = "assets/menu/exitP.png";
  this.back = new Image();
  this.back.src = "assets/menu/menuBack.png";

}

function update(e) {

if(bMenu){
  if(e.keyCode === 38) {
    if (playSwitch){
      playSwitch = false;
      exitSwitch = true;
      optionsSwitch = false;
    }
    else if(exitSwitch) {
      exitSwitch = false;
      playSwitch = false;
      optionsSwitch = true;
    }
    else if(optionsSwitch) {
      optionsSwitch = false;
      exitSwitch = false;
      playSwitch = true;
    }
  }
  else if(e.keyCode === 40) {
    if (playSwitch){
      playSwitch = false;
      exitSwitch = false;
      optionsSwitch = true;
    }
    else if(exitSwitch) {
      exitSwitch = false;
      playSwitch = true;
      optionsSwitch = false;
    }
    else if(optionsSwitch) {
      optionsSwitch = false;
      exitSwitch = true;
      playSwitch = false;
    }
  }
  else if(e.keyCode === 13) {
    if(playSwitch) {
      bMenu = false;
      bTutorialMenu = true;
    }
    else if(exitSwitch) {
      if(confirm("Exit Game")) {
        close();
      }
    }
    else if(optionsSwitch) {
      bOptions = true;
      bMenu = false;
    }
  }
 }
}

MainMenu.prototype.draw = function() {

  app.ctx.drawImage(this.back,0,0);

  //Play button
  if (playSwitch) {
    app.ctx.drawImage(this.playP, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 1) - 50);
  }
  else {
    app.ctx.drawImage(this.play, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 1) - 50);
  }

  //Options button
  if (optionsSwitch) {
    app.ctx.drawImage(this.optionsP, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 2) - 50);
  }
  else {
    app.ctx.drawImage(this.options, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 2) - 50);
  }

  //Exit button
  if (exitSwitch) {
    app.ctx.drawImage(this.exitP, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 3) - 50);
  }
  else {
    app.ctx.drawImage(this.exit, (app.canvas.width / 2) - 50, ((app.canvas.height / 4) * 3) - 50);
  }

}
