//wave machine keeps track of enemy waves and generates another when needed
class WaveMachine {
  //pass an array of functions that generate enemy waves (wavemax optional)
  constructor (enemyTypes, waveMax){
    this.waveActive = false;
    this.enemyTypes = enemyTypes; 
    this.waveCount = 0;
    this.waveMax = waveMax || Math.round(randomInRange(8, 12));
  }
  update(){
    //check if a wave is active
    if(!this.waveActive){
      //randomly select a wave function from the array
      let waveFunction = Math.round(randomInRange(0, this.enemyTypes.length));  //this might be bad math re: not a function bug TODO
      //double check that the value is in range just in case, because if it isn't, javascript will crash
      waveFunction = clamp(waveFunction, 0, this.enemyTypes.length);
      //inc level and reset wavecount if max wave passed already, update HUD
      if(this.waveCount >= this.waveMax){
        level++;
        this.waveCount = 0;
        this.waveMax = Math.round(randomInRange(8, 12));
        HYPER_DRIVE_TEXT.innerText = `HYPERDIVE REPAIR: ${precentageOf(level, 12)}%`;
        SECTOR_TEXT.innerText = `SECTOR: OPEN SPACE ${level}`;
      }
      // pull the function out the array and store it in a variable LOUIS THANK YOU THE IDEA!
      let thisFunction = this.enemyTypes[waveFunction];
      //if its not a function, break here to avoid a crash (need to fix not a function bug TODO)
      if(typeof thisFunction != `function`){
        console.log(`wavemachine needs a function and found ${this.enemyTypes[waveFunction]} at index ${waveFunction} wavemachine retuning early`);
        return;
      }
      //call the chosen function
      thisFunction();
      //inc wave cont and display, mark wave active 
      this.waveActive = true;
      if(gameActive){
        this.waveCount++;
        //for endgame scoreboard
        totalWaves++;
        WAVES_TEXT.innerText = `WAVE #: ${this.waveCount} of ${this.waveMax}`;
      }
    }
  }
}
//active in debug mode, just wants one wave not an array
class WaveMachineDebug extends WaveMachine {
  update(){
    if(!this.waveActive){
      this.enemyTypes();
      //inc wave cont and display, mark wave active 
      this.waveCount++;
      this.waveActive = true;
      level = this.waveCount;
      console.log(`level: ${level}`)
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
      //console.log(`called`, this.enemyTypes)
    }
  }
}
