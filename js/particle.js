var velocityX;
var velocityY;

function Particle(x, y) {

  this.x = this.oldX = x;
  this.y = this.oldY = y;
}

Particle.prototype.integrate = function() {

  this.velocityX = this.x - this.oldX;
  this.velocityY = this.y - this.oldY;
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += this.velocityX;
  this.y += this.velocityY;
}

Particle.prototype.repulse = function(x, y) {

  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  this.x += dx / distance;
  this.y += dy / distance;
}

Particle.prototype.draw = function() {

  app.ctx.strokeStyle = '#ff0000';
  app.ctx.lineWidth = 2;
  app.ctx.beginPath();
  app.ctx.moveTo(this.oldX, this.oldY);
  app.ctx.lineTo(this.x, this.y);
  app.ctx.stroke();
}
