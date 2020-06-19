/* 
audioArgs {
      source: source for audio object (string),
      level: starting volume (float 0 - 1),
    }
*/

function Audio(audioArgs){
  this.audio = document.createElement(`audio`);
  this.source = audioArgs.source;
  this.level = audioArgs.level || 1;
  this.fadeTimer;
  /* still can't get auto init to work =/
  this.onLoad = (function() {
    console.log(audioArgs.source)
    this.audio = document.createElement(`audio`);
    this.audio.src = audioArgs.source;
    this.audio.setAttribute(`preload`, `auto`);
    this.audio.setAttribute(`control`, `none`);
    this.audio.style.display = `none`;
    document.body.appendChild(this.audio);
  })();
  */
}
//init audio object
Audio.prototype.init = function (){
  this.audio.src = this.source;
  this.audio.setAttribute(`preload`, `auto`);
  this.audio.setAttribute(`control`, `none`);
  this.audio.style.display = `none`;
  document.body.appendChild(this.audio);
}

Audio.prototype.play = function(){
  this.audio.play();
}

Audio.prototype.pause = function(){
  this.audio.pause();
}
Audio.prototype.stop = function(){
  this.audio.currentTime = 0;
  this.audio.pause();
}
Audio.prototype.loop = function(){
  this.audio.loop = `true`
}
Audio.prototype.volume = function(level){
  this.level = level;
  this.audio.volume = level;
}

//fade to targetLevel (float 0 - 1) at speed (float 0 - 1)
//and call stopFunction (optional) when finished
Audio.prototype.fade = function(targetLevel, speed, stopFuction){
  if(this.level > targetLevel){
    this.level -= speed;
    //values outside of 0 - 1 throw an error
    this.level = clamp(this.level, 0, 1);
    this.audio.volume = this.level;
    setTimeout( () => { this.fade(targetLevel, speed, stopFuction) }, 10);
  } else if (this.level < targetLevel) {
    this.level += speed;
    //values outside of 0 - 1 throw an error
    this.level = clamp(this.level, 0, 1);
    this.audio.volume = this.level;
    setTimeout( () => { this.fade(targetLevel, speed, stopFuction) }, 10);
  } 
  if(this.level == targetLevel){
    //make sure its a function to prevent crash
    if(typeof stopFuction === `function`){
      let callFuciton = stopFuction;
      callFuciton();
    }
  }
}

Audio.prototype.stopFade = function() {
  clearInterval(this.timer);
}