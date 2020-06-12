class Exhaust {
  constructor(){
    this.speedX = randomSignInRange(.1, 1);
    this.speedY = randomInRange(.5, 2);
    this.x = ship.noseX;
    this.y = ship.noseY + 45;
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
    //if star moves off screen, reset y and randomize x to repurpose it as a new star
    if(this.alpha <= 0){
      this.isGarbage = true;
    }
  }
  draw(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${this.colorR}, ${this.colorG}, 0, ${this.alpha})`;
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.size, 2, Math.pi * 2);
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
    ctx.closePath();
    ctx.stroke();
  }
}