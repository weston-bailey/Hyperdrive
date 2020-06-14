//template for making polygon enemies, can spawn with totally random but functional constructor values
class PolygonTemplate {
    //starting x, starting y, speed on x axis, speed on y axis, size =  draw radius, 
  //spinspeed should be float 0 - 1 (lower values better), sides = vertices, lineiwdth is an int
  //color needs to be a hex so makeDebris can run hexToRGBArray() on it
  constructor(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color){
    this.x = x || randomInRange(0, canvasWidth);
    this.y = y || randomInRange(spawn1X, spawn2X);
    this.speedX = speedX || randomSignInRange( 1, 5);
    this.speedY = speedY || randomInRange(1, 5);
    this.color = color || randomColorHex();
    this.lineWidth = lineWidth || randomInRange(2, 5);
    this.alpha = 1;  
    this.size = size || randomInRange(15, 60);
    this.hitRadius = this.size * .8;
    this.radians = radians || degreesToRadians(randomInRange(0, 360));
    this.spinSpeed = spinSpeed || randomSignInRange(0, 1); 
    this.sides = sides || Math.floor(randomInRange(3, 16));
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
    //plot starting x y on circle x = (x - r * cosine of starting degrees as radians, y = y - r * sine of starting degrees as radians
    ctx.moveTo(this.x - this.size * Math.cos(this.radians), this.y - this.size * Math.sin(this.radians));
    //one stroke per side
    for(let i = 0; i < this.sides; i++){
      //calculate angles on circle x = x - r * (cosine of (two pi / number of sides) * angle number + starting degrees as radians), 
      //y = y - r * (sine of (two pi / number of sides) * angle number + starting degrees as radians)
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
    ctx.arc(this.x, this.y, this.hitRadius, 0, TWO_PI);
    ctx.closePath();
    ctx.stroke();
  }
  makeDebris(){
     //space junk
     let amount = randomInRange(24, 64);
     for (let i = 0; i < amount; i++){
       debrisParticles.push(new Debris(this.x, this.y, .001, hexToRGBArray(this.color)));
     }
     amount = randomInRange(24, 64);
     //make a little rainbow explosion
     for (let i = 0; i < amount; i++){
       debrisParticles.push(new Debris(this.x, this.y, .09));
     }
  }
}