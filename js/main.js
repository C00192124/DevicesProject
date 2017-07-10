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
var player = new Sprite({imagePath:"assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png"});
var zombie = new Sprite({imagePath:"assets/zombie/move/skeleton-move_0_right.png"});
zombie.x = canvas.width - 100;

function render() {
  if(player.isLoaded) {
    ctx.drawImage(player.image, player.x, player.y)
  }
  if(zombie.isLoaded) {
    ctx.drawImage(zombie.image, zombie.x, zombie.y)
  }
}


//Key/Mouse functionality
function keyDownHandler(e) {

	if(e.keyCode == 38) {

    if ((player.y) > 3) {
		  player.y -= 3;
      player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_up.png";
    }
	}

	if(e.keyCode == 37) {

    if ((player.x) > 3) {
		  player.x -= 3;
      player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_left.png";
    }
	}

	if(e.keyCode == 39) {

    if ((player.x + 96) < canvas.width - 3) {
      player.x += 3;
      player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_right.png";
    }
	}

	if(e.keyCode == 40) {

		if ((player.y + 96) < canvas.height - 3) {
      player.y += 3;
      player.image.src = "assets/survivor/shotgun/move/survivor-move_shotgun_0_down.png";
    }
	}

  if(e.keyCode == 32) {

    if(((zombie.x > player.x) && (zombie.x < player.x + 200)) && (zombie.y == player.y)) {
      console.log("win");
    }
  }

}

function clickHandler(e) {

}

function zombieChase() {

  if (player.x > zombie.x) {
    zombie.x = zombie.x + 0.5;
  }

  if (player.y > zombie.y) {
    zombie.y = zombie.y + 0.5;
  }

  if (player.x < zombie.x) {
    zombie.x = zombie.x - 0.5;
  }

  if (player.y < zombie.y) {
    zombie.y = zombie.y - 0.5;
  }
}


//Game loop
setInterval(main, 16);

function main() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render();
  zombieChase();

}
