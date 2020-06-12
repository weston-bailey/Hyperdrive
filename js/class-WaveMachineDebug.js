//waveMachineDebug jsut accepts one wave at a time
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
