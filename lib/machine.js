function buildMachine(color,x,y) {
  var machine = new PIXI.Graphics();

  machine.x = x;
  machine.y = y;
  machine.color         = color;
  machine.worker        = buildWorker(500);
  machine.supply_crates = [];

  machine.entrance_point = {x: x, y: y+30};

  machine.exit_point = {x: x+60, y: y+30}

  machine.draw = function() {
    this.beginFill(0xcccccc);
    this.lineStyle(5, 0x000000);
    this.drawPolygon([0,0,0,60,60,60,60,0]);

    if (machine.color == "purple") {
      this.beginFill(0xff00ff);
    } else {
      this.beginFill(0x0000ff);
    }

    this.drawPolygon([15,30,30,15,45,30,30,45]);
    this.endFill();
  }

  machine.produce = function(deliver) {
    if (_.every(machine.supply_crates, function(e) { return e.isStocked(); })) {
      _.each(machine.supply_crates, function(e) { e.consume() });
      machine.worker.push(function() {
        setTimeout(function() {
          deliver(newWidget(machine.color));
        }, 250);
      });
    } else {
      machine.worker.push(function() {
        machine.produce(deliver);
      });
    }

  }

  machine.addSupplyCrate = function(crate) {
    this.supply_crates.push(crate);

    var line = new PIXI.Graphics();

    line.zIndex = 1;

    line.lineStyle(5, 0x999999, 1);
    line.moveTo(crate.exit_point.x, crate.exit_point.y);
    line.lineTo(this.entrance_point.x, this.entrance_point.y);
    stage.addChild(line);
    stage.updateLayersOrder();
  }

  machine.draw();

  stage.addChild(machine);

  return machine;
}