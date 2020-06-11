class Ship {
  constructor(){
    this.speed = 7;
    this.noseX = canvasWidth * .5;
    this.noseY = canvasHeight * .5;
    this.movingX = false;
    this.movingY = false;
    this.color = `antiquewhite`;
    this.sheildColor =  `173, 216, 230`;
    this.sheildColorAlpha = 1;  //presently unsued, but could be modified for effect
    this.sheild = false;
    this.sheildLevel = 0;
  }
  update(directionX, directionY){
    //update postion 
    if(this.movingY){
      this.noseY += this.speed * directionY;
    }
    if(this.movingX){
      this.noseX += this.speed * directionX;
    }
    //move ship to other side of screen when it reaches the side
    if(this.noseX > canvasWidth){                     
      this.noseX = 0;
    }       
    if(this.noseX < 0){                     
      this.noseX = canvasWidth;
    }  
    //restrict movement to height boundaries of screen     
    if(this.noseY > (canvasHeight - 30)){                    
      this.noseY = (canvasHeight - 30);
    }       
    if(this.noseY < 0){                     
      this.noseY = 0;
    } 
  }
  draw(){
    //draw a traingle
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.noseX, this.noseY);
    ctx.lineTo(this.noseX - 15, this.noseY + 45);
    ctx.lineTo(this.noseX + 15, this.noseY + 45);
    ctx.closePath();
    ctx.stroke();
    //draw sheild if sheild is active
    if(this.sheild && this.sheildLevel > 0){
      ctx.lineWidth = this.sheildLevel; //shield gets smaller when hit
      ctx.strokeStyle = `rgba(${this.sheildColor}, ${this.sheildColorAlpha})`;
      ctx.beginPath();
      ctx.arc(this.noseX, this.noseY + 25, 45, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
  //for debug
  drawCollisionRadius(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `white`;
    ctx.beginPath();
    ctx.arc(this.noseX, this.noseY + 30, 15, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}