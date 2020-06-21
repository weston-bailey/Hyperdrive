/*~~~~~~~~~~~~~~~~~~~~~~~~~~NO LONGER USED~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//classes switched to constructor/prototype pattern
class Audio {
  //supply audio source and volume ( optional float 0 -1) 
  //TODO make class self-initializing so init() doesn't need to be called
  constructor(source, level){
    this.audio = document.createElement(`audio`);
    this.source = source;
    this.level = level || 1;
  }
  init(){
    this.audio.src = this.source;
    this.audio.setAttribute(`preload`, `auto`);
    this.audio.setAttribute(`control`, `none`);
    this.audio.style.display = `none`;
    document.body.appendChild(this.audio);
  }
  play(){
    this.audio.play();
  }
  pause(){
    this.audio.pause();
  }    
  stop(){
    this.audio.currentTime = 0;
    this.audio.pause();
  }
  loop(){
    this.audio.loop = `true`;
  }
  //spcify desired volume (float 0 - 1)
  volume(level){
    this.level = level;
    this.audio.volume = level;
  }
  //fade to targetLevel (float 0 - 1) at speed (float 0 - 1)
  //and call stopFunction (optional) when finished
  fade(targetLevel, speed, stopFuction){
    //level is gerater than target
    if(this.level > targetLevel){
      //move towards target level at speed
      this.level -= speed;
      //values outside of 0 - 1 throw an error
      this.level = clamp(this.level, 0, 1);
      //update audio object
      this.audio.volume = this.level;
      setTimeout( () => { this.fade(targetLevel, speed, stopFuction) }, 10);;
      //level is less than taret
    } else if (this.level < targetLevel) {
      //move towards target at speed
      this.level += speed;
      //values outside of 0 - 1 throw an error
      this.level = clamp(this.level, 0, 1);
      //update audio object
      this.audio.volume = this.level;
      //set callback
      setTimeout( () => { this.fade(targetLevel, speed, stopFuction) }, 10);
    } 
    //stop and reset if stopOnFadeOver is true, run stopFunction
    if(this.level == targetLevel){
      //make sure its a function to prevent crash
      if(typeof stopFuction === `function`){
        let callFuciton = stopFuction;
        callFuciton();
      }
    }
  }
}

//ship exhaust
class Exhaust {
  //if no staring x and y position are given, and no speed is given, then the constructor
  //assumes its just regular ship exhaust
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

//deprecated, debug wavemachine now extends wavemachine
class WaveMachineDebug {
  //pass an array of functions that generate enemy  wavws
  constructor (enemyTypes){
    this.waveActive = false;
    this.enemyTypes = enemyTypes; 
    this.waveCount = 0;
  }
  update(){
    if(!this.waveActive){
      this.enemyTypes();
      //inc wave cont and display, mark wave active 
      this.waveCount++;
      this.waveActive = true;
      level = this.waveCount;
      console.log(`level`, level)
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
      //console.log(`called`, this.enemyTypes)
    }
  }
}

//a star object to be rendered as a background
class Star {
  //size = radius
  constructor(speed, x, y, color, size){
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
  update(){
    //move star
    this.y += this.speed;
    //if star moves off screen, reset y and randomize x to repurpose it as a new star
    if(this.y > canvasHeight){
      this.y = 0;
      this.x = Math.random() * canvasWidth; 
    }
  }
  //stars are just little circles
  draw(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI);
    ctx.closePath();
    ctx.stroke();
  }
}
