
//polygon enemy that wraps around the screen width boundaries like the player's ship
class PolgonWrap {
  //starting x, starting y, speed on x axis, speed on y axis, size =  draw radius, 
  //spinspeed should be float 0 - 1 (lower values better), sides = vertices, lineiwdth is an int
  //color needs to be a hex so makeDebris can run hexToRGBArray() on it
  constructor(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.lineWidth = lineWidth;
    this.alpha = 1;  //presently unused
    this.size = size;
    this.hitRadius = this.size * .8; //just shink the draw circle for hit detection
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
    if(this.x > canvasWidth + this.hitRadius){                    
      this.x = 0 - this.hitRadius;
    }       
    if(this.x < 0 - this.hitRadius){                     
      this.x = canvasWidth + this.hitRadius;
    }  
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
  //for debug
  drawCollisionRadius(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `white`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.hitRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
  makeDebris(){
    //make alot of partilces
    let amount = randomInRange(24, 64);
    for (let i = 0; i < amount; i++){
      debrisParticles.push(new Debris(this.x, this.y, .001, hexToRGBArray(this.color)));
    }
    //make a little rainbow explosion
    for (let i = 0; i < amount; i++){
      debrisParticles.push(new Debris(this.x, this.y, .09));
    }
  }
}