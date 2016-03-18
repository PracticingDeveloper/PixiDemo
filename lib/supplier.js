function buildSupplier(color, x,y) {
  var supplier = new PIXI.Graphics();

  supplier.x = x;
  supplier.y = y;
  supplier.color = color;

  supplier.exit_point = {x: x + 45, y: y + 30};
  supplier.worker = buildWorker();

  supplier.draw = function() {
    if (color == "red") {
      this.beginFill(0xcc6666);
    } else {
      this.beginFill(0x6666cc);
    }

    this.lineStyle(5, 0x000000);
    this.drawPolygon([0,60,45,30,0,0]);
    this.endFill();
  }

  supplier.produce = function(deliver) {
    this.worker.push(function() {
      deliver(newWidget(supplier.color));
    })
  }

  stage.addChild(supplier);
  supplier.draw();

  return supplier;
}