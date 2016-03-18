function buildMachine(x,y) {
  var machine = new PIXI.Graphics();

  machine.x = x;
  machine.y = y;
  machine.color = "purple";
  machine.worker = buildWorker();

  //machine.entrance_point = {x: x, y: y+90};

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
    this.worker.push(function() {
      deliver(newWidget(this.color));
    });
  }

  machine.draw();

  stage.addChild(machine);

  return machine;
}