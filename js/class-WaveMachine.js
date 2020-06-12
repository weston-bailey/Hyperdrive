class WaveMachine {
  constructor (enemyTypes){
    this.waveActive = false;
    this.enemyTypes = enemyTypes;
    this.waveCount = 0;
  }
  update(){
    let waveFunction = Math.floor(randomInRange(-1, this.enemyTypes.length));  
    waveFunction = clamp(waveFunction, 0, this.enemyTypes.length);
    if(!this.waveActive){
      //LOUIS THANK YOU!
      let pooptest = this.enemyTypes[waveFunction];
      console.log(waveFunction, pooptest)
      //this.enemyTypes[waveFunction]();
      //this.enemyTypes();
      pooptest();
      this.waveCount++;
      this.waveActive = true;
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
      //console.log(`called`, this.enemyTypes)
    }
  }
}
