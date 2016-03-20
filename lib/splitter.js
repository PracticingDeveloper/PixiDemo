function buildSplitter(source) {
  var composite = {};

  composite.destinations = [];

  composite.exit_point = source.exit_point;
  composite.entrance_point = source.entrance_point;

  composite.order = buildOrder(source, composite);
  composite.worker = buildWorker(0);

  composite.subOrder = function(dest) {
    var partial_order = {quantity: 0, exit_point: composite.exit_point};

    this.destinations.push(partial_order);

    partial_order.produce = function(deliver) {
      partial_order.quantity += 1;
      partial_order.deliver = deliver;

      composite.worker.push(function() {
        if (_.all(composite.destinations, function(e) { return e.quantity > 0 } )) {  
          _.each(composite.destinations, function(e) { e.quantity -= 1 })
          composite.order.submit();
        }
      });
    }

    var partial = buildOrder(partial_order, dest);
    partial.indicator.visible = false

    return partial;
  }
  
  composite.push = function(widget) {
    _.each(composite.destinations, function(e) { 
      e.deliver(widget.shift());
    });
  }

  return composite;
}
  


  

  