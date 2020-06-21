/* 
exhaustArgs {
      speedY: amount added to y (float),
      speedX: amount addec to x (float),
      x: starting x position (float),
      y: starting y position (float),
    }

{ null: null } assumes its just regular ship exhaust
*/
function Exhaust(exhaustArgs){
  this.speedX = exhaustArgs.speedX || randomSignInRange(.1, 1);
  this.speedY = exhaustArgs.speedY || randomInRange(.5, 2);
  this.x = exhaustArgs.x || ship.noseX;
  this.y = exhaustArgs.y || ship.noseY + 45;
  this.colorR = 255;
  this.colorG =  0;
  this.alpha = 1;  
  this.size = randomInRange(.5, 4);
  this.isGarbage = false;
}
//move exhaust
Exhaust.prototype.update = function(){
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
Exhaust.prototype.draw = function(){
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${this.colorR}, ${this.colorG}, 0, ${this.alpha})`;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
  ctx.closePath();
  ctx.stroke();
}
