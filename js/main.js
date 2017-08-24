app = {};
var canvas;
var game;
var ctx;
var menu;
var tutorialMenu;
var optMenu;
var bMenu;
var playGame;
var bOptions;
var bTutorialMenu;
var bTutorial;

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");
  app.game = new Gameplay();
  app.menu = new MainMenu();
  app.optMenu = new OptionsMenu();
  app.tutorialMenu = new TutMenu();
  app.tutorial = new Tutorial();
  this.bMenu = true;
  this.playGame = false;
  this.bOptions = false;
  this.bTutorialMenu = false;
  this.bTutorial = false;

}

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  if(bMenu) {

    app.menu.draw();

  }
  else if(playGame) {

    app.game.collision();
    app.game.update();
    app.game.draw();

  }
  else if(bOptions) {

    app.optMenu.draw();

  }
  else if(bTutorialMenu) {

    app.tutorialMenu.draw();

  }
  else if(bTutorial) {

    app.tutorial.collision();
    app.tutorial.update();
    app.tutorial.draw();

  }

}
