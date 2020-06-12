/*~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS AND VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//dom elements
const LOAD_PAGE = document.addEventListener(`DOMContentLoaded`, () => { 
                                                                        init();
                                                                        navComputerGameStart(); 
                                                                        /*gameStart()*/
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

MANUAL_FLIGHT_BUTTON.addEventListener(`click`, () => { navComputerGameStart(); });

const TWO_PI = 2 * Math.PI;

//canvas variables
let canvas,  ctx; 
let canvasWidth = 800;
let canvasHeight = 800;
//usesful spawn coordinates for enemies
let spawn1X = canvasHeight * -1;
let spawn2X = spawn1X * 2;
let spawn3X = spawn1X * 3;


//Array of keypresses
let keys = [];
//for ship object
let ship;
//for wavemachine object
let waveMachine = null;
//arrays of background objects
let backgroundZ0 = [];
let backgroundZ1 = [];
let backgroundZ2 = [];
let backgroundZ3 = [];
//array of enemies
let enemies = [];
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//called on page load
function init() {
  //write emergency message onscren
  emergencyMesssage1(); 
  //make ship class
  ship = new Ship;
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
    ship.drawCollisionRadius();
  }
  //update and draw exhaust
  for(let i = 0; i < exhuastParticles.length; i++){
    exhuastParticles[i].update();
    exhuastParticles[i].draw();
  }
  //update and debris
  for(let i = 0; i < debrisParticles.length; i++){
    debrisParticles[i].update();
    debrisParticles[i].draw();
  }
  //update wavemachine
  if(waveMachine != null){
    waveMachine.update();
  }
  //update and draw enemies
  for(let i = 0; i < enemies.length; i++){
    enemies[i].update();
    enemies[i].draw();
  }
  //check for collisions
  for(let i = 0; i < enemies.length; i++){
    let crash;
    if(ship.sheild && ship.sheildLevel > 0){     //sheild is on
      crash = hitTest(45, ship.noseX, ship.noseY + 25, enemies[i].radius, enemies[i].x, enemies[i].y); //(radius1, x1, y1, radius2, x2, y2,)
      if(crash){  //hit detected
        //decrease sheild level and mark enemy as garbage
        decrementSheild();
        enemies[i].makeDebris();
        enemies[i].isGarbage = true;
      } else {
        enemies[i].color = `white`;
      }
    } else if (!ship.sheild) { //sheild is off
      crash = hitTest(15, ship.noseX, ship.noseY + 30, enemies[i].radius, enemies[i].x, enemies[i].y); //(radius1, x1, y1, radius2, x2, y2,)
      if(crash){
        enemies[i].makeDebris();
        enemies[i].isGarbage = true;
        enemies[i].color = `red`;
      } else {
        enemies[i].color = `white`;
      }
    }
  }
  //check if enemies are marked as garbage, splice the ones that are
  for(let i = 0; i < enemies.length; i++){
    if(enemies[i].isGarbage) {
      enemies.splice(i, 1);
    }
  }
  //check for exhaust marked as garbage
  for(let i = 0; i < exhuastParticles.length; i++){
    if(exhuastParticles[i].isGarbage){
      exhuastParticles.splice(i, 1);
    }
  }
  //check for exhaust marked as garbage
  for(let i = 0; i < debrisParticles.length; i++){
    if(debrisParticles[i].isGarbage){
      debrisParticles.splice(i, 1);
    }
  }
  //if no enemies are left, tell the wave machine so it can do its thing
  if(enemies.length === 0 && waveMachine != null){
    waveMachine.waveActive = false;
  }
  requestAnimationFrame(render);
}
