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