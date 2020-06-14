//random polygons made on impacts, the only values it really needs are x y
class Debris {
  //staring x, starting y, speed that debris dissapears (values closer to 0 is longer), color of debris
  //constructor is randomized is not passed values when created 
  constructor(x, y, alphaDecrement, color){
    this.speedX = randomSignInRange(.1, 5);
    this.speedY = randomSignInRange(.1, 5);
    this.x = x;
    this.y = y;
    this.color = color || hexToRGBArray(randomColorHex());
    this.alpha = 1;  
    this.alphaDecrement = alphaDecrement || .1;
    this.size = randomInRange(.5, 10);
    this.radians = degreesToRadians(randomInRange(0, 360));
    this.spinSpeed = randomSignInRange(0, 1); 
    this.sides = Math.floor(randomInRange(2, 12));
    this.vertAngle = TWO_PI / this.sides; 
    this.isGarbage = false;
  }
  update(){
    //move debris
    this.y += this.speedY;
    this.x += this.speedX;
    this.alpha -= this.alphaDecrement;
    this.radians += this.spinSpeed;
    //if is no longer visible it is marked as garbage
    if(this.alpha <= 0){
      this.isGarbage = true;
    }
  }
  draw(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
    ctx.beginPath();
    //same maths as polygon classes (see them for formula)
    ctx.moveTo(this.x - this.size * Math.cos(this.radians), this.y - this.size * Math.sin(this.radians));
    for(let i = 0; i < this.sides; i++){
      ctx.lineTo(this.x - this.size * Math.cos(this.vertAngle * i + this.radians), this.y - this.size * Math.sin(this.vertAngle * i + this.radians));
    }
    ctx.closePath();
    ctx.stroke();
  }
}