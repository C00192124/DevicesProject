app = {};
var canvas;
var game;
var ctx;
var play = true;

function init() {
  app.canvas = document.getElementById('myCanvas');
  app.ctx = app.canvas.getContext("2d");
  app.game = new Gameplay();
}

//Game loop
setInterval(main, 16);

function main() {

  app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
  if(!play) {

  }
  else if(play) {

    app.game.update();
    app.game.draw();
    
  }

}
