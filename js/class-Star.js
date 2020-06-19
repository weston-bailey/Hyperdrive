/* Star arguments object reference
starArgs {
      speed: amount added to y (float),
      x: starting x position (int),
      y: starting y positon (int),
      color: color (string),
      size: draw radius (float),
    }
*/
function Star(starArgs) {
  this.speed = starArgs.speed;
  this.x = starArgs.x;
  this.y = starArgs.y;
  this.color =  starArgs.color;
  this.size = starArgs.size;
}
//method to move star
Star.prototype.update = function(){
  this.y += this.speed;
  //if star moves off screen, reset y and randomize x to repurpose it as a new star
  if(this.y > canvasHeight){
    this.y = 0;
    this.x = Math.random() * canvasWidth; 
  }
}
//method to draw on canvas
Star.prototype.draw = function (){
  ctx.lineWidth = 2;
  ctx.strokeStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
  ctx.closePath();
  ctx.stroke();
}

