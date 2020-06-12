//a star object to be rendered as a background
class Star {
  //size = radius
  constructor(speed, x, y, color, size){
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
  update(){
    //move star
    this.y += this.speed;
    //if star moves off screen, reset y and randomize x to repurpose it as a new star
    if(this.y > canvasHeight){
      this.y = 0;
      this.x = scale(Math.random(), 0, 1, 0, canvasWidth);
    }
  }
  //stars are just little circles
  draw(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
    ctx.closePath();
    ctx.stroke();
  }
}