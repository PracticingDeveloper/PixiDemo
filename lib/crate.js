function buildCrate(x,y) {
  var crate = new PIXI.Graphics();

  crate.x = x;
  crate.y = y;

  crate.entrance_point = {x: x, y: y+90};

  crate.contents = [];

  //crate.entrance_point = {x: crate.x, y: crate.y + 50};
  //crate.exit_point     = {x: crate.x + 100, y: crate.y + 50};

  //crate.tap = function() { clicked.push(this); }

  crate.draw = function() {
    this.beginFill(0xffffff);
    this.lineStyle(5, 0x000000);
    this.drawPolygon([0,0,0,180,60,180,60,0]);
    this.endFill();
  }

  crate.push = function(widget) {
    this.contents.push(widget);

    widget.x = this.x + 30;
    widget.y = this.y + (4 - this.contents.length)*45;
  }

  crate.pop = function() {
    return this.contents.pop();
  }

  crate.isFull = function() {
    return this.contents.length == 3;
  }

  crate.draw();

  stage.addChild(crate);

  return crate;
}