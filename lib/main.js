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

  blue_crate.consume = function() {
    w = blue_crate.pop();

    if (w) {
      stage.removeChild(w)
      order.submit();
    }

    return w;
  }

  var machine = buildMachine("blue", 400,400);
  var order   = buildOrder(machine, blue_crate);
  
  machine.worker.delay = 4500

  machine.addSupplyCrate(green_crate);

  _.times(3, function() { order.submit(); });
}

function buildMachineSupplyChain() {
  var machine = buildMachine("purple", 750,250);
  var crate   = buildCrate(900,190);
  var order   = buildOrder(machine, crate);


  space.release = function() {
    w = crate.pop();

    if (w) {
      stage.removeChild(w)
      order.submit();
    }
  }
  
  machine.addSupplyCrate(red_crate);
  machine.addSupplyCrate(blue_crate);

  _.times(3, function() { order.submit(); });
}


function buildGreenSupplyChain() {
  green_crate = buildCrate(210,340);

  var supplier  = buildSupplier("green", 50,400);

  var order    = buildOrder(supplier, green_crate);
  
  green_crate.consume = function() {
    w = green_crate.pop();

    if (w) {
      stage.removeChild(w)
      order.submit();
    }

    return w;
  }

  _.times(3, function() { order.submit(); });
}

function buildRedSupplyChain() {
  red_crate = buildCrate(600,40);

  var supplier  = buildSupplier("red", 425,100);

  var order    = buildOrder(supplier, red_crate);
  
  red_crate.consume = function() {
    w = red_crate.pop();

    if (w) {
      stage.removeChild(w)
      order.submit();
    }

    return w;
  }

  _.times(3, function() { order.submit(); });
}

function gameLoop() {
  id = requestAnimationFrame(gameLoop);
  t.update();
  
  renderer.render(stage);
}