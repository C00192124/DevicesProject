app = {};
var canvas;
var game;
var ctx;
var menu;
var playGame = false;

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");
  app.game = new Gameplay();
  app.menu = new MainMenu();
}

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  if(!app.playGame) {

    app.menu.draw();

  }
  else if(app.playGame) {

    app.game.update();
    app.game.draw();

  }

}
