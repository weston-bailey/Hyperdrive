class WaveMachine {
  constructor (enemyTypes){
    this.waveActive = false;
    this.enemyTypes = enemyTypes;
    this.waveCount = 0;
  }
  update(){
    if(!this.waveActive){
      this.enemyTypes();
      this.waveCount++;
      this.waveActive = true;
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
    }
  }
}
