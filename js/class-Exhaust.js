//ship exhaust
class Exhaust {
  //if no staring x and y position are given, and no speed is given, then the constructor
  //assumes its just regular ship exhaus
  constructor(x, y, speedX, speedY){
    this.speedX = speedX || randomSignInRange(.1, 1);
    this.speedY = speedY || randomInRange(.5, 2);
    this.x = x || ship.noseX;
    this.y = y || ship.noseY + 45;
    this.colorR =  255;
    this.colorG =  0;
    this.alpha = 1;  
    this.size = randomInRange(.5, 4);
    this.isGarbage = false;
  }
  update(){
    //move exhaust
    this.y += this.speedY;
    this.x += this.speedX;
    this.colorG += 2;
    this.colorR -= 2 ;
    this.alpha -= .01;
    //mark for garbage collector when no longer visible
    if(this.alpha <= 0){
      this.isGarbage = true;
    }
  }
  //exhaust are little circles
  draw(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${this.colorR}, ${this.colorG}, 0, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
    ctx.closePath();
    ctx.stroke();
  }
}