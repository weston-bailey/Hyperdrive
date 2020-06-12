
class Square {
  constructor(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.lineWidth = lineWidth;
    this.alpha = 1;  
    this.size = size;
    this.hitRadius = this.size * .8;
    this.radians = radians;
    this.spinSpeed = spinSpeed; 
    this.sides = sides;
    this.vertAngle = TWO_PI / this.sides; 
    this.onScreen = false;
    this.isGarbage = false;
  }
  update(){
    //move polygon
    this.y += this.speedY;
    this.x += this.speedX;
    this.radians += this.spinSpeed;
    //wrap the screen boundaries
    if(this.x > canvasWidth + this.hitRadius){                     //move ship to other side of screen when it reaches the side
      this.x = 0 - this.hitRadius;
    }       
    if(this.x < 0 - this.hitRadius){                     //move ship to other side of screen when it reaches the side
      this.x = canvasWidth + this.hitRadius;
    }  
    // if(this.y > (canvasHeight - this.size)){                     
    //   this.speedY *= -1;
    // }       
    // if(this.y < (this.size)){                     
    //   this.speedY *= -1;
    // }     
    if(this.y > this.hitRadius + canvasHeight){
      this.onScreen = false;
      this.isGarbage = true;
    } else if(this.y < 0 - this.hitRadius){
      this.onScreen = false;
    } else {
      this.onScreen = true;
    }
    

  }
  draw(){
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - this.size * Math.cos(this.radians), this.y - this.size * Math.sin(this.radians));
    for(let i = 0; i < this.sides; i++){
      ctx.lineTo(this.x - this.size * Math.cos(this.vertAngle * i + this.radians), this.y - this.size * Math.sin(this.vertAngle * i + this.radians));
    }
    ctx.closePath();
    ctx.stroke();
  }
  makeDebris(){
    let amount = randomInRange(8, 32);
    for (let i = 0; i < amount; i++){
      debrisParticles.push(new Debris(this.x, this.y));
    }
  }
}