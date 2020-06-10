class WaveMachine {
  constructor (enemyTypes){
    this.waveActive = false;
    this.enemyTypes = enemyTypes;
  }
  update(){
    // console.log(this.waveActive);
    if(!this.waveActive){
      this.enemyTypes
      this.waveActive = true;
    }
  }
}