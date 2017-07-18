function Mouse() {
  Entity.call(this, 0, 0);

  this.mouseValid = true;

  this.update = function(game) {
    this.x = game.canvas.mouseX;
    this.y = game.canvas.mouseY;
    this.mouseValid = game.canvas.mouseOn;
  };

  this.draw = function(game) {
    return;
  };

  this.pixelInBox = function(box, x, y) {
    return this.mouseValid;
  };
}
Mouse.prototype = Object.create(Entity.prototype);
Mouse.prototype.constructor = Mouse;
