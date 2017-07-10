var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("click", clickHandler);

//Loading in a Sprite
function Sprite(options) {
  this.load(options.imagePath);
  this.x = 0;
  this.y = 50;
  this.isLoaded = false;
}

Sprite.prototype.load = function(imagePath) {
  this.image = new Image();
  var that = this;
  this.image.src = imagePath;
  this.image.onload = function() {
    that.isLoaded = true;
  }
};

Sprite.prototype.draw = function() {
  ctx.drawImage(this.image, this.x, this.y);
}


//Creating the player
var player = new Sprite({imagePath:"assets/survivor/shotgun/idle/survivor-idle_shotgun_0.png"});

function render() {
  if(player.isLoaded) {
    ctx.drawImage(player.image, player.x, player.y)
  }
}


//Key/Mouse functionality
function keyDownHandler(e) {

	if(e.keyCode == 38) {

		player.y -= 5;
	}

	if(e.keyCode == 37) {

		player.x -= 5;
	}

	if(e.keyCode == 39) {

		player.x += 5;
	}

	if(e.keyCode == 40) {

		player.y += 5;
	}
}

function clickHandler(e) {

}


//Game loop
setInterval(main, 16);

function main() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render();

}
