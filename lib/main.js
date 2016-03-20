//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;
//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1000,600);


stage.updateLayersOrder = function () {
    stage.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

renderer.backgroundColor = 0xFFFFFF;
document.body.appendChild(renderer.view);

var t = new Tink(PIXI, renderer.view);
var b = new Bump(PIXI);

var pointer = t.makePointer();

var red_crate, blue_crate, green_crate;
var machines = [];

var space = keyboard(32);

setup()
gameLoop();

function setup() {
  buildGreenSupplyChain();
  buildRedSupplyChain();
  buildPurifierSupplyChain();
  buildMachineSupplyChain();
}

function buildPurifierSupplyChain() {
  blue_crate   = buildCrate(600,340);



  var purifier_machine = buildMachine("blue", 400,400);
  machines.push(purifier_machine);

  var order   = buildOrder(purifier_machine, blue_crate);

  blue_crate.consume = buildConsumer(order);
  
  purifier_machine.worker.delay = 3000

  purifier_machine.addSupplyCrate(green_crate);

  _.times(3, function() { order.submit(); });
}

function buildMachineSupplyChain() {
  var combiner_machine = buildMachine("purple", 750,250);
  machines.push(combiner_machine);

  var crate   = buildCrate(900,190);
  var order   = buildOrder(combiner_machine, crate);

  space.release = buildConsumer(order);

  combiner_machine.worker.delay = 1500
  
  combiner_machine.addSupplyCrate(red_crate);
  combiner_machine.addSupplyCrate(blue_crate);

  _.times(3, function() { order.submit(); });
}


function buildConsumer(order) {
  var consumer = function() {
    var w = order.destination.pop();

    if (w) {
      stage.removeChild(w)
      order.submit();
    }
  };

  return consumer;
}

function buildGreenSupplyChain() {
  green_crate = buildCrate(210,340);

  var machine  = buildMachine("green", 50,400);

  machines.push(machine);

  var order    = buildOrder(machine, green_crate);
  
  green_crate.consume = buildConsumer(order);

  _.times(3, function() { order.submit(); });
}

function buildRedSupplyChain() {
  red_crate = buildCrate(600,40);

  var supplier  = buildMachine("red", 425,100);
  machines.push(supplier);

  var order    = buildOrder(supplier, red_crate);
  
  red_crate.consume = buildConsumer(order);

  _.times(3, function() { order.submit(); });
}

function gameLoop() {
  id = requestAnimationFrame(gameLoop);
  t.update();

  _.each(machines, function(e) {
    if (e.on) { 
      e.gear.rotation += (0.1/(e.worker.delay/500.0)); 
    } else {
      e.gear.rotation = 0;
    }
   });
  
  renderer.render(stage);
}