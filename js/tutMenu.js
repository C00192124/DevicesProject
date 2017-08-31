var tutButton;
var tutButtonP;
var playButton;
var playButtonP;
var tutSwitch;
var back;

addEventListener("keydown", updateTut);
addEventListener("touchstart", clickTut);

function TutMenu() {

  this.tutButton = new Image();
  this.tutButtonP = new Image();
  this.playButton = new Image();
  this.playButtonP = new Image();
  this.back = new Image();
  this.tutButton.src = "assets/menu/tutorial.png"
  this.tutButtonP.src = "assets/menu/tutorialP.png"
  this.playButton.src = "assets/menu/play.png"
  this.playButtonP.src = "assets/menu/playP.png"
  this.back.src = "assets/menu/menuBack.png";
  this.timer = 0;

}

function clickTut(e) {

  if(bTutorialMenu) {

    touches = e.touches;
    tX = touches[0].clientX;
    tY = touches[0].clientY;

    if((tX > (app.canvas.width / 3 * 1) + 100) && (tX < (app.canvas.width / 3 * 1) + 180)
    && (tY < (app.canvas.height / 2) + 50) && (tY > (app.canvas.height / 2) - 50)) {
      if(confirm("Proceed to tutorial?")) {
        app.tutorial = new Tutorial();
        bTutorialMenu = false;
        bTutorial = true;
      }
    }

    if((tX > (app.canvas.width / 3 * 2) + 100) && (tX < (app.canvas.width / 3 * 2) + 180)
    && (tY < (app.canvas.height / 2) + 50) && (tY > (app.canvas.height / 2) - 50)) {
      app.game = new Gameplay();
      levelTwo = false;
      bTutorialMenu = false;
      playGame = true;
    }

  }

}

function updateTut(e) {

if(bTutorialMenu) {
  if(e.keyCode === 37) {
      if(tutSwitch) {
        tutSwitch = false;
      }
      else {
        tutSwitch = true;
      }
  }

  if(e.keyCode === 39) {
      if(tutSwitch) {
        tutSwitch = false;
      }
      else {
        tutSwitch = true;
      }
  }

  if(e.keyCode === 13) {
      if(tutSwitch && bTutorialMenu) {
        app.game = new Gameplay();
        bTutorialMenu = false;
        playGame = true;
      }
      else if (!tutSwitch && bTutorialMenu){
        if(confirm("Proceed to tutorial?")) {
          app.tutorial = new Tutorial();
          bTutorialMenu = false;
          bTutorial = true;
        }
      }
  }

  if(e.keyCode === 27) {
      bMenu = true;
      bTutorialMenu = false;
    }
  }
}

TutMenu.prototype.draw = function() {

  app.ctx.drawImage(this.back,0,0);

  if(tutSwitch) {
    app.ctx.drawImage(this.tutButton, ((app.canvas.width / 3) * 1)- 50, ((app.canvas.height / 2) * 1) - 50);
    app.ctx.drawImage(this.playButtonP, ((app.canvas.width / 3) * 2)- 50, ((app.canvas.height / 2) * 1) - 50);
  }
  else {
    app.ctx.drawImage(this.tutButtonP, ((app.canvas.width / 3) * 1)- 50, ((app.canvas.height / 2) * 1) - 50);
    app.ctx.drawImage(this.playButton, ((app.canvas.width / 3) * 2)- 50, ((app.canvas.height / 2) * 1) - 50);
  }

  app.ctx.fillStyle = "rgb(255, 255, 255)";
  app.ctx.font = "56px Roboto";
  app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Esc to Exit", 0, 0);

}
