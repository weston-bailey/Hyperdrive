class Ship {
  constructor(){
    this.speed = 7;
    this.noseX = canvasWidth * .5;
    this.noseY = canvasHeight * .5;
    this.movingX = false;
    this.movingY = false;
    this.color = `antiquewhite`;
    this.sheildColor =  `173, 216, 230`;
    this.sheildColorAlpha = 1;
    this.sheild = false;
    this.sheildLevel = 4;
  }
  update(directionX, directionY){
    if(this.movingY){
      this.noseY += this.speed * directionY;
    }
    if(this.movingX){
      this.noseX += this.speed * directionX;
    }
    if(this.noseX > canvasWidth){                     //move ship to other side of screen when it reaches the side
      this.noseX = 0;
    }       
    if(this.noseX < 0){                     //move ship to other side of screen when it reaches the side
      this.noseX = canvasWidth;
    }       
    if(this.noseY > (canvasHeight - 30)){                     //move ship to other side of screen when it reaches the side
      this.noseY = (canvasHeight - 30);
    }       
    if(this.noseY < 0){                     //move ship to other side of screen when it reaches the side
      this.noseY = 0;
    } 
  }
  draw(){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.noseX, this.noseY);
    ctx.lineTo(this.noseX - 10, this.noseY + 30);
    ctx.lineTo(this.noseX + 10, this.noseY + 30);
    //ctx.lineTo(this.nose, this.nose);
    ctx.closePath();
    ctx.stroke();
    if(this.sheild){
      ctx.lineWidth = this.sheildLevel;
      ctx.strokeStyle = `rgba(${this.sheildColor}, ${this.sheildColorAlpha})`;
      ctx.beginPath();
      ctx.arc(this.noseX, this.noseY + 15, 30, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
  drawCollisionRadius(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `white`;
    ctx.beginPath();
    ctx.arc(this.noseX, this.noseY + 20, 12, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}