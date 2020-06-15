class Audio {
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
  volume(level){
    this.level = level;
    this.audio.volume = level;
  }
  //setTimeout doesn't scope right or something?
  // fade(targetLevel, speed){
  //   if(this.level >= targetLevel){
  //     this.level -= speed;
  //     this.level = clamp(this.level, 0, 1);
  //     this.audio.volume = this.level;
  //     setTimeout(this.fade(targetLevel, speed), 100);
  //     console.log(`dec ${this.level}`);
  //   } else if (this.level <= targetLevel) {
  //     this.level += speed;
  //     this.level = clamp(this.level, 0, 1);
  //     this.audio.volume = this.level;
  //     setTimeout(this.fade(targetLevel, speed), 100);
  //     console.log(`inc ${this.level}`);
  //   }
  //   console.log(`done ${this.level}`);
  // }
}