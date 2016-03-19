function buildMachine(color,x,y) {
  var machine = new PIXI.Graphics();

  machine.x = x;
  machine.y = y;
  machine.on = false;
  machine.color         = color;
  machine.worker        = buildWorker(500);
  machine.supply_crates = [];
  machine.gear          = new PIXI.Graphics();
  machine.addChild(machine.gear);


  machine.entrance_point = {x: x, y: y+30};

  machine.exit_point = {x: x+60, y: y+30}

  machine.draw = function() {
    this.beginFill(0xcccccc);
    this.lineStyle(5, 0x000000);
    this.drawPolygon([0,0,0,60,60,60,60,0]);

    this.gear.lineStyle(5, 0x000000);
    this.gear.pivot.set(30,30);
    this.gear.x = 30;
    this.gear.y = 30;

    if (machine.color == "purple") {
      this.gear.beginFill(0xAA00AA);
    } else if (machine.color == "green") {
      this.gear.beginFill(0x00ff00);
    } else if (machine.color == "red") {
      this.gear.beginFill(0xff0000);
    } else {
      this.gear.beginFill(0x0000ff);
    }

    this.gear.drawPolygon([15,30,30,15,45,30,30,45]);
    this.gear.endFill();
  }

  machine.produce = function(deliver) {
    if (_.every(machine.supply_crates, function(e) { return e.isStocked(); }) && !machine.on) {
      machine.on = true;
      
      setTimeout(function() {
        _.each(machine.supply_crates, function(e) { e.consume() });

        machine.worker.push(function() {
          deliver(newWidget(machine.color));
          machine.on = machine.worker.queue.length > 0
        });
      }, 300);
    } else {
      setTimeout(function() { machine.produce(deliver) }, 100); 
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