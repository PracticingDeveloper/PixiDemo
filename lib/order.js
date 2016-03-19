function buildOrder(src, dest) {
  var o = { source: src, destination: dest };

  o.submit = function() {
    this.source.produce(this.fulfill)
  } 

  o.fulfill = function(widget) {
    o.destination.push(widget);
  }

  o.draw = function() {
    var line = new PIXI.Graphics();

    line.lineStyle(5, 0x999999, 1);
    line.zIndex = 1;

    line.moveTo(this.source.exit_point.x, this.source.exit_point.y);
    line.lineTo(this.destination.entrance_point.x, this.destination.entrance_point.y);
    stage.addChild(line);
    stage.updateLayersOrder();
  }

  o.draw();

  return o;
}