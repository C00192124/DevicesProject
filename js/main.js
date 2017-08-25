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
var menuMusic;
var gameMusic;

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");
  app.menuMusic = new Audio("assets/sound/menu.mp3");
  app.gameMusic = new Audio("assets/sound/gameplay.mp3");
  app.killEffect = new Audio("assets/sound/zombie.wav");
  app.shootEffect = new Audio("assets/sound/shotgun.wav");
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
  app.gameMusic.volume = .5;
  app.menuMusic.volume = .5;
  app.menuMusic.loop = true;
  app.gameMusic.loop = true;

}

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  if(bMenu) {

    app.gameMusic.pause();
    app.menuMusic.play();
    app.menu.draw();

  }
  else if(playGame) {

    app.gameMusic.play();
    app.menuMusic.pause();
    app.game.collision();
    app.game.update();
    app.game.draw();

  }
  else if(bOptions) {

    app.gameMusic.pause();
    app.menuMusic.play();
    app.optMenu.draw();

  }
  else if(bTutorialMenu) {

    app.gameMusic.pause();
    app.menuMusic.play();
    app.tutorialMenu.draw();

  }
  else if(bTutorial) {

    app.gameMusic.play();
    app.menuMusic.pause();
    app.tutorial.collision();
    app.tutorial.update();
    app.tutorial.draw();

  }

}
