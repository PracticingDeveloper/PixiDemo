function buildOrder(src, dest) {
  var o = { source: src, destination: dest };
  o.backlog = 0
  o.indicator = new PIXI.Text(o.backlog);

  o.submit = function() {
    o.backlog += 1;
    o.indicator.text = o.backlog;
    this.source.produce(this.fulfill)
  } 

  o.fulfill = function(widget) {
    o.backlog -= 1;
    o.indicator.text = o.backlog;
    o.destination.push(widget);
  }

  o.draw = function() {
    var line = new PIXI.Graphics();

    line.lineStyle(5, 0x999999, 1);
    line.zIndex = 1;

    line.moveTo(this.source.exit_point.x, this.source.exit_point.y);
    line.lineTo(this.destination.entrance_point.x, this.destination.entrance_point.y);


    o.indicator.x = this.source.exit_point.x - 25
    o.indicator.y = this.source.exit_point.y + 50

    stage.addChild(line);
    stage.addChild(o.indicator);
    stage.updateLayersOrder();
  }

  o.draw();

  return o;
}