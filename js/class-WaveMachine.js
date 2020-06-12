//wave machine keeps track of enemy waves and generates another when needed
class WaveMachine {
  //pass an array of functions that generate enemy  wavws
  constructor (enemyTypes){
    this.waveActive = false;
    this.enemyTypes = enemyTypes; 
    this.waveCount = 0;
  }
  update(){
    //randomly select a wave function from the array
    let waveFunction = Math.round(randomInRange(0, this.enemyTypes.length));  
    //double check that the value is in range just in case, because if it isn't, javascript will crash
    waveFunction = clamp(waveFunction, 0, this.enemyTypes.length);
    if(!this.waveActive){
      // pull the function out the array fand store it in a variable LOUIS THANK YOU THE IDEA!
      let thisFunction = this.enemyTypes[waveFunction];
      //call the chosen function
      thisFunction();
      //inc wave cont and display, mark wave active 
      this.waveCount++;
      this.waveActive = true;
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
      //console.log(`called`, this.enemyTypes)
    }
  }
}
