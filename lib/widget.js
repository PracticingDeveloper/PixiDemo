
function newWidget(color) {
  var widget = new PIXI.Graphics();
  widget.color = color;
  
  stage.addChild(widget);

  if (color == "red") {
    widget.beginFill(0xff0000);
  } else if (color == "blue") {
    widget.beginFill(0x0000ff);
  } else if (color == "green") {
    widget.beginFill(0x00ff00);
  } else {
    widget.beginFill(0xAA00AA);
  }

  widget.lineStyle(5, 0x000000);
  widget.drawCircle(0,0,15);

  return widget;
};