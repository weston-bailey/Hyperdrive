/*~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS AND VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//dom elements
const LOAD_PAGE = document.addEventListener(`DOMContentLoaded`, () => { emergencyMesssage1(); init(); });
const KEY_DOWN = document.body.addEventListener(`keydown`, e => { keys[e.keyCode] = true; });
const KEY_UP = document.body.addEventListener(`keyup`, e => { keys[e.keyCode] = false; });
const LOG_BUTTON = document.querySelector(`button`).addEventListener(`click`, () => { navComputerFadeIn(); });
const MANUAL_FLIGHT_BUTTON = document.getElementById(`manual-flight-button`);
const EMERGENCY_FLASH = document.getElementById(`emergency-flash`);
const NAV_COMPUTER = document.getElementById(`nav-computer`);
MANUAL_FLIGHT_BUTTON.addEventListener(`click`, () => { navComputerFadeOutGameStart(); });
//canvas variables
let canvas,  ctx; 
let canvasWidth = 800;
let canvasHeight = 800;
//Array of keypresses
let keys = []
//for ship object
let ship;
//for wavemachine object
let waveMachine;
//arrays of background objects
let backgroundZ0 = [];
let backgroundZ1 = [];
let backgroundZ2 = [];
let backgroundZ3 = [];
//array of enemies
let enemies = [];
//variables to make emergency message
var emergencyMessageInc1 = 0; //letter index to print
var emergencyMessageInc2 = 0;
var emergenccText1 = 'Emergency   '; //first message
var emergenccText2 = 'Auto Pilot System Failure   '; 
var typingSpeed = 150; //letter update speed

//for menufade
var navComputerOpacity = 1;
var navComputerFadeSpeed = 10;

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//fades the nav computer out and disables the start game button
function navComputerFadeOutGameStart(){
  if(navComputerOpacity > .0){
    navComputerOpacity -= .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    MANUAL_FLIGHT_BUTTON.style.opacity = navComputerOpacity;
    setTimeout(navComputerFadeOutGameStart, navComputerFadeSpeed);
  } else if (navComputerOpacity <= 0 ){
    MANUAL_FLIGHT_BUTTON.style.display = `none`;
  }
}
//fades out the nav computer but doesnt bother with the flight control
function navComputerFadeOut(){
  if(navComputerOpacity > .0){
    navComputerOpacity -= .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    setTimeout(navComputerFadeOut, navComputerFadeSpeed);
  } 
}
//fades out the nav computer 
function navComputerFadeIn(){
  if(navComputerOpacity < 1){
    navComputerOpacity += .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    setTimeout(navComputerFadeIn, navComputerFadeSpeed);
  } 
}


//writes emergencyText1 and switches by calling emergencyMessage2 when finished
function emergencyMesssage1() {
  if (emergencyMessageInc1 < emergenccText1.length) {
    EMERGENCY_FLASH.innerHTML += emergenccText1.charAt(emergencyMessageInc1);
    emergencyMessageInc1++;
    setTimeout(emergencyMesssage1, typingSpeed);
  } else if (emergencyMessageInc1 >= emergenccText1.length){
    emergencyMessageInc1 = 0;
    EMERGENCY_FLASH.innerHTML = ' ';
    setTimeout(emergencyMesssage2, typingSpeed);
  }
}
//writes emergencyText2 and switches by caliing emergencyMessage1 when finished
function emergencyMesssage2() {
  if (emergencyMessageInc2 < emergenccText2.length) {
    EMERGENCY_FLASH.innerHTML += emergenccText2.charAt(emergencyMessageInc2);
    emergencyMessageInc2++;
    setTimeout(emergencyMesssage2, typingSpeed);
  } else if (emergencyMessageInc2 >= emergenccText2.length){
    emergencyMessageInc2 = 0;
    EMERGENCY_FLASH.innerHTML = ' ';
    setTimeout(emergencyMesssage1, typingSpeed);
  }
}

//called on page load
function init() {
  //make ship class
  ship = new Ship;
  waveMachine = new WaveMachine(/*circleWave()*/);
  //populate the heavens
  makeStarBackgroud();
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
  //start rendering
  render();
}

function render(){
  //returns x and y directions in array
  let shipDirection = inputHandler();
  //clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //update and draw the backgrounds
  drawBackground();
  //update and draw ship
  ship.update(shipDirection[0], shipDirection[1]);
  ship.draw();
  ship.drawCollisionRadius();
  //update wavemachine
  waveMachine.update();
  //update and draw enemies
  for(let i = 0; i < enemies.length; i++){
    enemies[i].update();
    enemies[i].draw();
  }
  //check for collisions
  for(let i = 0; i < enemies.length; i++){
    let crash;
    if(!ship.sheild){
      crash = hitTest(12, ship.noseX, ship.noseY + 20, enemies[i].radius, enemies[i].x, enemies[i].y);
      if(crash){
        enemies[i].color = `red`;
      } else {
        enemies[i].color = `white`;
      }
    }else {
      crash = hitTest(30, ship.noseX, ship.noseY + 15, enemies[i].radius, enemies[i].x, enemies[i].y);
      if(crash){
        enemies[i].color = `red`;
        enemies[i].typingSpeedX *= -1;
        enemies[i].typingSpeedY *= -1;
        enemies.splice(i, 1);
      } else {
        enemies[i].color = `white`;
      }
    }
  }
  //console.log(crash)
  if(enemies.length === 0){
    // ctx.font = "80px Comic Sans MS";
    // ctx.fillStyle = "red";
    // ctx.textAlign = "center";
    // ctx.fillText("You Win", canvas.width/2, canvas.height/2);
  }
  //console.log(enemies[0].onScreen)
  //enemies[0].color = 'green';
  requestAnimationFrame(render);
}