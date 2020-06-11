class CircleObstacle {
  constructor(x, y, speedX, speedY, radius, color){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
    this.onScreen = false;
    this.isGarbage = false;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvasWidth + this.radius){                     //move ship to other side of screen when it reaches the side
      this.x = 0 - this.radius;
    }       
    if(this.x < 0 - this.radius){                     //move ship to other side of screen when it reaches the side
      this.x = canvasWidth + this.radius;
    }       
    // if(this.y > (canvasHeight - this.radius)){                     //move ship to other side of screen when it reaches the side
    //   this.speedY *= -1;
    // }       
    // if(this.y < (this.radius)){                     //move ship to other side of screen when it reaches the side
    //   this.speedY *= -1;
    // }       
    if(this.y > this.radius + canvasHeight){
      this.onScreen = false;
      this.isGarbage = true;
    } else if(this.y < 0 - this.radius){
      this.onScreen = false;
    } else {
      this.onScreen = true;
    }
  }
  draw(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}