/*~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS AND VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//dom elements
const LOAD_PAGE = document.addEventListener(`DOMContentLoaded`, () => { 
                                                                        init();
                                                                        if(debug){
                                                                          debugGameStart(testWave, 1, 4);
                                                                        }                                                              
                                                                      });
const KEY_DOWN = document.body.addEventListener(`keydown`, e => { keys[e.keyCode] = true; });
const KEY_UP = document.body.addEventListener(`keyup`, e => { keys[e.keyCode] = false; });
const LOG_BUTTON = document.querySelector(`button`).addEventListener(`click`, () => { logFunction() });
const MANUAL_FLIGHT_BUTTON = document.getElementById(`manual-flight-button`);
const EMERGENCY_FLASH = document.getElementById(`emergency-flash`);
const NAV_COMPUTER = document.getElementById(`nav-computer`);
const TITLE_CONTAINER = document.getElementById(`title-container`);
const SECTOR_CONTAINER = document.getElementById(`sector-container`);
const AUTO_REPAIR_CONTAINER = document.getElementById(`auto-repair-container`);
const DISTANCE_TEXT = document.getElementById(`distance-text`);
const WAVES_TEXT = document.getElementById(`waves-text`);
const SHEILD_LEVEL_TEXT = document.getElementById(`sheild-level-text`);
const MANUAL_FLIGHT_MESSAGE = document.getElementById(`manual-flight-message`);
const COLLISION_VECTOR_TEXT = document.getElementById(`collision-vector-text`);

MANUAL_FLIGHT_BUTTON.addEventListener(`click`, () => { navComputerGameStart(); });

const TWO_PI = 2 * Math.PI;

//toggles debug mode
let debug = false;

//canvas variables
let canvas, ctx; 
let canvasWidth = 800;
let canvasHeight = 800;
//usesful spawn coordinates for enemies
let spawn1X = canvasHeight * -1;
let spawnHalfX = spawn1X * .5;
let spawn2X = spawn1X * 2;
let spawn3X = spawn1X * 3;
//Array of keypresses
let keys = [];
//for ship object
let ship;
//timeout of shield cooldown
let sheildCoolDownTimer;
//for wavemachine object
let waveMachine = null;
//arrays of background objects
let backgroundZ0 = [];
let backgroundZ1 = [];
let backgroundZ2 = [];
let backgroundZ3 = [];
//array of enemies
let enemies = [];
//previous amount of enemies for HUD update
var prevEnemiesLength = 0;
//array of exhuast particles
let exhuastParticles = [];
//array of debris
let debrisParticles = [];
//variables to make emergency message
var emergencyMessageTimeout;
var emergencyMessageInc1 = 0; //letter index to print
var emergencyMessageInc2 = 0;
var emergenccText1 = '*EMERGENCY ALERT*   '; //first message
var emergenccText2 = 'Auto Pilot System Failure   '; 
var typingSpeed = 150; //letter update speed
//for fading out of elements
var navComputerOpacity = 1;
var titleOpacity = 1;
var fadeSpeed = 10;
//setinterval for distance
var distanceTimer;
var distance = 0;
//for levels
var levelStartInterval;
var level = 0;
//varible to check if the game has started
var gameActive = false;
//functions for wave machine to call
var waveFunctions =   [triangleCometWaveRandomDirections, 
                      triangleCometWaveSameDirections, 
                      higherRightSlantWave, 
                      higherLeftSlantWave, 
                      higherRightSlantWaveMoveX, 
                      inverseHigherRightSlantWaveMoveX, 
                      higherLeftSlantWaveMoveX, 
                      inverseHigherLeftSlantWaveMoveX,
                      triangleCometWaveSameDirectionsSmall,
                      lineWave, lineWaveMoveX, lineWaveMoveY]

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//called on page load
function init() {
  //write emergency message onscren
  emergencyMesssage1(); 
  //make ship class
  ship = new Ship;
  ship.sheildLevel = 2;
  decrementSheild();
  //setupcanvas
  canvas = document.querySelector("#game-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = `rgba(0, 0, 0, 0)`;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  //init keys array
  for (let i = 0; i < 88; i++){
    keys[i] = false;
  }  
  //populate the heavens
  makeStarBackgroud();                                                       
  //start rendering
  render();
}

//fades the nav computer out and disables the start game button
function navComputerGameStart(){
  //fade out the title
  titleFadeOut();
  //get rid of the button
  MANUAL_FLIGHT_BUTTON.style.display = `none`;
  AUTO_REPAIR_CONTAINER.style.visibility = `visible`;
  SECTOR_CONTAINER.style.visibility = `visible`;
  //update nav computer screen
  MANUAL_FLIGHT_MESSAGE.innerText = `FLIGHT CONTROL: MANUAL`;
  //reset emergency flash message
  EMERGENCY_FLASH.innerHTML = ' ';
  clearTimeout(emergencyMessageTimeout);
  emergencyMessageInc1 = 0; //letter index to print
  emergencyMessageInc2 = 0;
  emergenccText1 = 'WARNING: COLLISION IMMINENT   '; //first message
  emergenccText2 = 'Evasive maneuvers required   '; 
  emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  //make timer for level start
  levelStartInterval = setTimeout(nextLevel, 9500);
}

//for debug mode start
function debugGameStart(wave, level){
  level = level;
  ship.sheildLevel = 5;
  decrementSheild();
  //fade out the title
  TITLE_CONTAINER.style.opacity = 0;
  NAV_COMPUTER.style.opacity = 0;
  //get rid of the button
  MANUAL_FLIGHT_BUTTON.style.display = `none`;
  // AUTO_REPAIR_CONTAINER.style.visibility = `visible`;
  // SECTOR_CONTAINER.style.visibility = `visible`;
  //update nav computer screen
  MANUAL_FLIGHT_MESSAGE.innerText = `FLIGHT CONTROL: MANUAL`;
  //reset emergency flash message
  EMERGENCY_FLASH.innerHTML = ' ';
  clearTimeout(emergencyMessageTimeout);
  //make debug wave machine
  waveMachine = new WaveMachineDebug(wave);
  distanceTimer = setInterval(distanceTick, 500);
  //game is now active
  gameActive = true;
}

//main render loop
function render(){
  //returns x and y directions in array
  let shipDirection = inputHandler();
  //clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //update and draw the backgrounds
  drawBackground();
  //update and draw ship only after game starts
  if(gameActive){
    ship.update(shipDirection[0], shipDirection[1]);
    ship.draw();
    if(debug){
      ship.drawCollisionRadius();
    }
  }
  //update and draw exhaust
  for(let i = 0; i < exhuastParticles.length; i++){
    exhuastParticles[i].update();
    exhuastParticles[i].draw();
  }
  //update and debris
  for(let j = 0; j < debrisParticles.length; j++){
    debrisParticles[j].update();
    debrisParticles[j].draw();
  }
  //update wavemachine
  if(waveMachine != null){
    waveMachine.update();
  }
  //update and draw enemies
  for(let k = 0; k < enemies.length; k++){
    enemies[k].update();
    enemies[k].draw();
    if(debug){
      enemies[k].drawCollisionRadius();
    }
  }
  //check for collisions
  for(let l = 0; l < enemies.length; l++){
    let crash;
    if(ship.sheild && ship.sheildLevel > 0){     //sheild is on
      crash = hitTest(45, ship.noseX, ship.noseY + 25, enemies[l].hitRadius, enemies[l].x, enemies[l].y); //(radius1, x1, y1, radius2, x2, y2,)
      if(crash){  //hit detected
        //decrease sheild level and mark enemy as garbage, fire off a sheild cool down
        if(!ship.sheildCoolDown){
          sheildCoolDownTimer = setTimeout(sheildCoolDownOver, 250);
          ship.sheild = true;
          ship.sheildCoolDown = true;
        }
        enemies[l].makeDebris();
        enemies[l].isGarbage = true;
      } 
    } else if (!ship.sheild) { //sheild is off
      crash = hitTest(15, ship.noseX, ship.noseY + 30, enemies[l].hitRadius, enemies[l].x, enemies[l].y); //(radius1, x1, y1, radius2, x2, y2,)
      if(crash){
        enemies[l].makeDebris();
        enemies[l].isGarbage = true;
        //ship is invincible in debug mode
        if(!debug){
          ship.makeDebris();
          ship.isGarbage = true;
          gameActive = false;
        }
      } 
    }
  }
  //check if any enemies want to self destruct
  for(let m = 0; m < enemies.length; m++){
    if(enemies[m].selfDestruct){
      enemies[m].makeDebris();
      enemies[m].isGarbage = true;
    }
  }
  //check if enemies are marked as garbage, splice the ones that are
  for(let o = 0; o < enemies.length; o++){
    if(enemies[o].isGarbage) {
      enemies.splice(o, 1);
    }
  }
  //check for exhaust marked as garbage
  for(let p = 0; p < exhuastParticles.length; p++){
    if(exhuastParticles[p].isGarbage){
      exhuastParticles.splice(p, 1);
    }
  }
  //check for exhaust marked as garbage
  for(let q = 0; q < debrisParticles.length; q++){
    if(debrisParticles[q].isGarbage){
      debrisParticles.splice(q, 1);
    }
  }
  //if no enemies are left, tell the wave machine so it can do its thing
  if(enemies.length === 0 && waveMachine != null){
    waveMachine.waveActive = false;

  }
  //update collison vectors hud if change
  if(gameActive){
    if(enemies.length != prevEnemiesLength){
      COLLISION_VECTOR_TEXT.innerText = `COLLISION VECTORS: ${enemies.length}`;
      if(enemies.length > prevEnemiesLength){
        COLLISION_VECTOR_TEXT.style.color = `red`;
      } else if(enemies.length > 10) 
        COLLISION_VECTOR_TEXT.style.color = `yellow`;
      else  {
        COLLISION_VECTOR_TEXT.style.color = `#33ff00`;
      }
      prevEnemiesLength = enemies.length;
    }
  }
  //console.log(ship.sheildCoolDown)
  requestAnimationFrame(render);
}
