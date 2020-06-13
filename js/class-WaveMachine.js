//wave machine keeps track of enemy waves and generates another when needed
class WaveMachine {
  //pass an array of functions that generate enemy  wavws
  constructor (enemyTypes, waveMax){
    this.waveActive = false;
    this.enemyTypes = enemyTypes; 
    this.waveCount = 0;
    this.waveMax = waveMax || Math.round(randomInRange(8, 12));
  }
  update(){
    //randomly select a wave function from the array
    let waveFunction = Math.round(randomInRange(0, this.enemyTypes.length));  
    //double check that the value is in range just in case, because if it isn't, javascript will crash
    waveFunction = clamp(waveFunction, 0, this.enemyTypes.length);
    if(!this.waveActive){
      //inc level and reset wavecount if max wave passed already
      if(this.waveCount >= this.waveMax){
        level++;
        this.waveCount = 0;
        this.waveMax = Math.round(randomInRange(8, 12));
        ship.sheild = clamp(ship.sheild + 2, 0, 4);
      }
      // pull the function out the array fand store it in a variable LOUIS THANK YOU THE IDEA!
      let thisFunction = this.enemyTypes[waveFunction];
      if(typeof thisFunction != `function`){
        console.log(`this.enemyTypes[waveFunction]: ${this.enemyTypes[waveFunction]}`)
        console.log(`BREAK`)
        return;
      }
      let colors = [];
      for (let i = 0; i < enemies.length; i++){
        colors.push(enemies[i].color);
      }
      //console.log(`waveFunction ${waveFunction} enemyTypes.length ${this.enemyTypes.length}, this function: ${thisFunction}, typeof ${typeof thisFunction}`/* this.enemyTypes[waveFunction] ${this.enemyTypes[waveFunction]}*/)
      //call the chosen function
      thisFunction();
      //inc wave cont and display, mark wave active 
      this.waveActive = true;
      if(gameActive){
        this.waveCount++;
        WAVES_TEXT.innerText = `WAVE #: ${this.waveCount} of ${this.waveMax}`;
      }
      //console.log(`called`, this.enemyTypes)
    }
  }
}

class WaveMachineDebug extends WaveMachine {
  update(){
    if(!this.waveActive){
      this.enemyTypes();
      //inc wave cont and display, mark wave active 
      this.waveCount++;
      this.waveActive = true;
      level = this.waveCount;
      let colors = [];
      for (let i = 0; i < enemies.length; i++){
        colors.push(enemies[i].color);
      }
      console.log(`level: ${level}, color: ${colors}`)
      WAVES_TEXT.innerText = `WAVE #: ${this.waveCount}`;
      //console.log(`called`, this.enemyTypes)
    }
  }
}
