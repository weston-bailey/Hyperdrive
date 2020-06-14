//polygon enemy that needs to be given an upodate method
class Polygon {
  //starting x, starting y, speed on x axis, speed on y axis, size =  draw radius, radians should be degrees already converted to radians 
  //spinspeed should be float 0 - 1 (lower values better), sides = vertices, lineiwdth is an int
  //color needs to be a hex so makeDebris can run hexToRGBArray() on it
  //hitRadiusScale shrinks the radius for hit detection based on draw radius
  constructor(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color, hitRadiusScale){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.prevColor = null;
    this.lineWidth = lineWidth;
    //this.alpha = 1;  //presently unused
    this.size = size;
    this.hitRadius = this.size * hitRadiusScale; //just shink the draw circle for hit detection
    this.radians = radians;
    this.spinSpeed = spinSpeed; 
    this.sides = sides;
    this.vertAngle = TWO_PI / this.sides; 
    this.onScreen = false;
    this.isGarbage = false;
  }
  update(){
    console.log(`Polygon class needs to be extended with an update method`);
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
    //beautiful space junk
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

//wraps movement from one x boundary to another
class PolygonWrap extends Polygon {
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
}
//bounces around until bounceThresh has been reached and then self destructs, acceclerates every bounce
class PolygonBounceBomb extends Polygon {
  constructor(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color, hitRadiusScale, selfDestructVal, bounceThresh) {
    super(x, y, speedX, speedY, size, radians, spinSpeed, sides, lineWidth, color, hitRadiusScale);
    this.selfDestruct = false; //render checks if the object wants to self destruct
    this.selfDestructVal = selfDestructVal || null; //a value for self destruct logic (in this case y position)
    this.bounceCount = 0; //a 
    this.bounceThresh = bounceThresh; //how many bounces befor self destruct
  }
  update(){
    //move polygon
    this.y += this.speedY;
    this.x += this.speedX;
    this.radians += this.spinSpeed;
    //wrap the screen boundaries
    if(this.x > canvasWidth + this.hitRadius){   
      this.bounceCount++;                 
      this.speedX *= -1.3;
    }       
    if(this.x < 0 - this.hitRadius){  
      this.bounceCount++;                   
      this.speedX *= -1.3;
    }  
    //doesn't start bouncing until y0 threshhold is passed, inc bounce count each time bounce happens
    if(this.y > this.hitRadius + canvasHeight){
      this.bounceCount++;
      this.speedY *= -1.3;
    } else if(this.y < 0 - this.hitRadius && this.onScreen){
      this.bounceCount++;
      this.speedY *= -1.3;
    } else if (this.y < 0 - this.hitRadius) {
      this.onScreen = false;
    } else {
      this.onScreen = true;
    }
    //explode after bounce count is reached at a certian y position
    if(this.y < this.selfDestructVal && this.bounceCount >= this.bounceThresh){
      this.selfDestruct = true;
    }
  }
}
