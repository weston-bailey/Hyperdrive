/*~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS AND VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//dom elements
const LOAD_PAGE = document.addEventListener(`DOMContentLoaded`, () => { 
                                                                        init();
                                                                        if(debug){
                                                                          debugGameStart(bigBounceWave, 1, 4);
                                                                        }                                                              
                                                                      });
//listen for keypresses
const KEY_DOWN = document.body.addEventListener(`keydown`, e => { keys[e.keyCode] = true; });
const KEY_UP = document.body.addEventListener(`keyup`, e => { keys[e.keyCode] = false; });
//for debug
const LOG_BUTTON = document.getElementById(`log-button`);
//class that fades elements on load
const LOAD_FADE = document.getElementsByClassName(`load-fade`);
//the loading screen
const LOAD_TEXT = document.getElementsByClassName(`load-text`);
const LOAD_TEXT_CONTAINER = document.getElementById(`load-text-update`);
const LOAD_TEXT_UPDATE = document.getElementById(`load-text-update`);
const LOAD_TEXT_COMPLETE = document.getElementById(`load-text-complete`);
const LOAD_TEXT_PRESS_ENTER = document.getElementById(`load-text-press-enter`);
//title
const TITLE_CONTAINER = document.getElementById(`title-container`);
//nav computer
const NAV_COMPUTER = document.getElementById(`nav-computer`);
//for glitch effect on game over
const NAV_COMPUTER_N = document.getElementById(`nav-computer-N`);
const NAV_COMPUTER_O = document.getElementById(`nav-computer-O`);
const NAV_COMPUTER_M_P_U = document.getElementById(`nav-computer-M-P-U`);
const NAV_COMPUTER_E_R = document.getElementById(`nav-computer-E-R`);
//the typing red message
const EMERGENCY_FLASH = document.getElementById(`emergency-flash`);
//sector on game start/game over
const SECTOR_CONTAINER = document.getElementById(`sector-container`);
const SECTOR_NAV_TEXT = document.getElementById(`sector-nav-text`);
//auto repair on game start
const AUTO_REPAIR_CONTAINER = document.getElementById(`auto-repair-container`);
//scoreboard on game over
const SCOREBOARD_CONTAINER = document.getElementById(`scoreboard-container`);
const DISTANCE_SCORE_TEXT = document.getElementById(`distance-score-text`);
const TOTAL_WAVES_TEXT = document.getElementById(`total-waves-text`);
const COLLISIONS_AVOIDED_TEXT = document.getElementById(`collisons-avoided-text`);
const HYPER_DRIVE_REPAIR_LEVEL_TEXT = document.getElementById(`hyperdrive-repair-level-text`);
//reset button on game over
const MAIN_MENU_BUTTON = document.getElementById(`main-menu-button`);
//message at bottom of nav gomputer
const MANUAL_FLIGHT_MESSAGE = document.getElementById(`manual-flight-message`);
const MANUAL_FLIGHT_ERROR_MESSAGE = document.getElementById(`manual-flight-error-message`);
//game start button
const MANUAL_FLIGHT_BUTTON = document.getElementById(`manual-flight-button`);
//info HUD in lower left corner
const SHEILD_LEVEL_TEXT = document.getElementById(`sheild-level-text`);
const COLLISION_VECTOR_TEXT = document.getElementById(`collision-vector-text`);
const HYPER_DRIVE_TEXT = document.getElementById(`hyper-drive-text`);
//Score HUD on lower right
const SECTOR_TEXT = document.getElementById(`sector-text`);
const WAVES_TEXT = document.getElementById(`waves-text`);
const DISTANCE_TEXT = document.getElementById(`distance-text`);
//click event listeners for the buttons
MAIN_MENU_BUTTON.addEventListener(`click`, () => { resetGame(); });
MANUAL_FLIGHT_BUTTON.addEventListener(`click`, () => { navComputerGameStart(); });
//for debug
LOG_BUTTON.addEventListener(`click`, () => { logFunction() });
//useful for maths
const TWO_PI = 2 * Math.PI;
//toggles debug mode
let debug = true;
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
let ship = null;
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
let prevEnemiesLength = 0;
let totalEnemies = 0;
//array of exhuast particles
let exhuastParticles = [];
//array of debris
let debrisParticles = [];
//variables to make emergency and loading message
let emergencyMessageTimeout;
let emergencyMessageInc1 = 0; //letter index to print
let emergencyMessageInc2 = 0;
let emergencyText1 = '*EMERGENCY ALERT*   '; //first message
let emergencyText2 = 'Auto Pilot System Failure   '; 
let typingSpeed = 100; //letter update speed
let loadingMessageTimeout;
let loadingMessageInc = 0;
let loadingText = 'L o a d i n g . . . . . . . . . . . ';
let doneLoading = false;
let gameInitialized = false;
//timeout for blink E R and N on game over
let navComputerBlinkTimerER;
let navComputerBlinkTimerN;
//for fading out of elements
let navComputerOpacity = 1;
let navComputerFadeOutTimer;
let navComputerFadeInTimer;
let titleOpacity = 1;
let titleFadeInTimer;
let titleFadeOutTimer;
let fadeSpeed = 10;
let loadFadeInTimer;
let loadOpacity = 0;
//setinterval for distance
let distanceTimer;
let distance = 0;
//total amount of waves survived
let totalWaves = -1;
//for levels
let levelStartInterval;
let level = 0;
//varible to check if the game has started
let gameActive = false;
//for audio objects
let titleMusic;
let levelMusic;
let musicTimer;
//wave functions in an array for wave machine to call
let waveFunctions =   [triangleCometWaveRandomDirections, 
                      triangleCometWaveSameDirections, 
                      higherRightSlantWave, 
                      higherLeftSlantWave, 
                      higherRightSlantWaveMoveX, 
                      inverseHigherRightSlantWaveMoveX, 
                      higherLeftSlantWaveMoveX, 
                      inverseHigherLeftSlantWaveMoveX,
                      triangleCometWaveSameDirectionsSmall,
                      lineWave, lineWaveMoveX, lineWaveMoveY, bounceWaveSameX,
                      bounceWaveClusterSameY, bounceWaveSameY,
                      lineWaveSkipTwoMoveX, lineWaveSkipTwo]

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//called on page load
function init() {
  //dispaly loading message
  loadingMessage();
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
  //init audio objects
  titleMusic = new Audio(`./snd/last-step-contrast.mp3`);                                                  
  titleMusic.init();   
  titleMusic.loop();                                              
  levelMusic = new Audio(`./snd/aphex-twin-vordhosbn.mp3`);
  levelMusic.init();
  levelMusic.loop();
  //start rendering
  render();
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
        //decrease sheild level and mark enemy as garbage, fire off a sheild cool down, reduce shield's alhpa for flash effect
        if(!ship.sheildCoolDown){
          sheildCoolDownTimer = setTimeout(sheildCoolDownOver, 250);
          ship.sheild = true;
          ship.sheildCoolDown = true;
        }
        ship.sheildColorAlpha = 0;
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
          navComputerPlayerDeath();
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
  //check for debris marked as garbage
  for(let q = 0; q < debrisParticles.length; q++){
    if(debrisParticles[q].isGarbage){
      debrisParticles.splice(q, 1);
    }
  }
  //if no enemies are left, tell the wave machine so it can do its thing
  if(enemies.length === 0 && waveMachine != null){
    waveMachine.waveActive = false;
  }
  //update collison vectors hud if change while game is active
  if(gameActive){
    if(enemies.length != prevEnemiesLength){
      //update HUD
      COLLISION_VECTOR_TEXT.innerText = `COLLISION VECTORS: ${enemies.length}`;
      //for game over screen
      if(enemies.length < prevEnemiesLength){
        totalEnemies++;
      }
      //color HUD 
      if(enemies.length > prevEnemiesLength){
        COLLISION_VECTOR_TEXT.style.color = `red`;
      } else if(enemies.length > 10) 
        COLLISION_VECTOR_TEXT.style.color = `yellow`;
      else  {
        COLLISION_VECTOR_TEXT.style.color = `#33ff00`;
      }
      //update prev value for next compare
      prevEnemiesLength = enemies.length;
    }
  }
  //do it all again
  requestAnimationFrame(render);
}