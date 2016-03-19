function buildMachine(x,y) {
  var machine = new PIXI.Graphics();

  machine.x = x;
  machine.y = y;
  machine.color         = "purple";
  machine.worker        = buildWorker(500);
  machine.supply_crates = [];

  machine.entrance_point = {x: x, y: y+30};

  machine.exit_point = {x: x+60, y: y+30}

  machine.draw = function() {
    this.beginFill(0xcccccc);
    this.lineStyle(5, 0x000000);
    this.drawPolygon([0,0,0,60,60,60,60,0]);
    this.beginFill(0xff00ff);
    this.drawCircle(30,30,10);
    this.endFill();
  }

  machine.produce = function(deliver) {
    machine.worker.push(function() {
      if (_.every(machine.supply_crates, function(e) { return e.isStocked(); })) {
        _.each(machine.supply_crates, function(e) { e.consume() });

        machine.worker.push(function() {
          deliver(newWidget(machine.color));
        });
      } else {
        machine.worker.push(function() {
          machine.produce(deliver);
        });
      }
    });
  }

  machine.addSupplyCrate = function(crate) {
    this.supply_crates.push(crate);

    var line = new PIXI.Graphics();

    line.lineStyle(4, 0x333333, 1);
    line.moveTo(crate.exit_point.x, crate.exit_point.y);
    line.lineTo(this.entrance_point.x, this.entrance_point.y);
    stage.addChild(line);
  }

  machine.draw();

  stage.addChild(machine);

  return machine;
}