app = {};
var canvas;
var game;
var ctx;
var menu;
var optMenu;
var bMenu;
var playGame;
var bOptions;

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");
  app.game = new Gameplay();
  app.menu = new MainMenu();
  app.optMenu = new OptionsMenu();
  this.bMenu = true;
  this.playGame = false;
  this.bOptions = false;
}

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  if(bMenu) {

    app.menu.draw();

  }
  else if(playGame) {

    app.game.update();
    app.game.draw();

  }
  else if(bOptions) {

    app.optMenu.draw();

  }

}
