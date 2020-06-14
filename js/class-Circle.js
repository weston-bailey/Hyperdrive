//first enemy made, initally a test but still useful maybe
class Circle {
  constructor(x, y, speedX, speedY, radius, color){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.hitRadius = this.radius; //radius = hit radius bc its a circle
    this.color = color;           //should be a hex for debris
    this.onScreen = false;
    this.isGarbage = false;
  }
  update(){
    //wraps around screen like playership
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvasWidth + this.radius){                     
      this.x = 0 - this.radius;
    }       
    if(this.x < 0 - this.radius){                     
      this.x = canvasWidth + this.radius;
    }           
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
    //for debug (no radius needed)
    drawCollisionRadius(){
      return;
    }
  makeDebris(){
     //make alot of space junk
     let amount = randomInRange(24, 64);
     for (let i = 0; i < amount; i++){
       debrisParticles.push(new Debris(this.x, this.y, .001, hexToRGBArray(this.color)));
     }
     amount = randomInRange(24, 64);
     //make a little rainbow explosion
     for (let i = 0; i < amount; i++){
       debrisParticles.push(new Debris(this.x, this.y, .05));
    }
  }
}