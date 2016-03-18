
function newWidget(color) {
  var widget = new PIXI.Graphics();
  widget.color = color;
  
  stage.addChild(widget);

  if (color == "red") {
    widget.beginFill(0xff0000);
  } else {
    widget.beginFill(0x0000ff);
  }

  widget.lineStyle(5, 0x000000);
  widget.drawCircle(0,0,15);

  return widget;
};