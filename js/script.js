/*~~~~~~~~~~~~~~~~~~~~~~~~~~CONSTANTS AND VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//const WIN = window.addEventListener(`resize`, () => { init(); });
//const REFERSH = document.getElementById(`canvas`).addEventListener(`click`, () => { init(); });
const LOAD_PAGE = document.addEventListener(`DOMContentLoaded`, () => { init(); });
const KEY_DOWN = document.body.addEventListener(`keydown`, (e) => { keys[e.keyCode] = true; });
const KEY_UP = document.body.addEventListener(`keyup`, (e) => { keys[e.keyCode] = false; });
const BUTTON = document.querySelector(`button`).addEventListener(`click`, e => { logFunction(); });
//canvas variables
let canvas,  ctx; 
let canvasWidth = 800;
let canvasHeight = 800;
let keys = []

let ship;
let stars = [];
let testObstacle = [];
let waveMachine;

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


function logFunction(){
  // console.log(testObstacle.length)
  // console.log(testObstacle)
  console.log(testObstacle[0].onScreen)
  testObstacle[0].color = 'green';
  //console.log(randomSignInRange(1, 5));
  console.log(randomInRange(-3, -5))
  canvas.onmousemove = e => {
    console.log(`x position: ${e.offsetX} y position: ${e.offsetY}`);
  }
}

//called on page load and resize
function init() {
  //make ship class
  ship = new Ship;
  waveMachine = new WaveMachine(circleWave());
  //populate the heavens
  for(let i = 0; i < 75; i++){
    stars[i] = new Star(3 - Math.random(), scale(Math.random(), 0, 1, 0, canvasHeight), 
      scale(Math.random(), 0, 1, 0, canvasWidth), `rgba(255, 255, 255, .3)`, 1);
  }
  for(let j = 0; j < 75; j++){
    stars.push(new Star(1 + Math.random(), scale(Math.random(), 0, 1, 0, canvasHeight), 
      scale(Math.random(), 0, 1, 0, canvasWidth), `rgba(255, 255, 255, .15)`, 1));
  }
  for(let k = 0; k < 3; k++){
    stars.push(new Star(Math.random() * 3, scale(Math.random(), 0, 1, 0, canvasHeight), 
    scale(Math.random(), 0, 1, 0, canvasWidth), hexToRGB(randomColorHex(), Math.random()), Math.random() * 3));
  }
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

//make random color hex
function randomColorHex(){
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
//makes a randoom number between a range that is either positive or negetive with probability (float 0 - 1) influencing the sign chance
function randomSignInRange(minimum, maximum, probability){
  let prob = .5 || probability;
  let coinToss = Math.random();
  let randomNum = Math.random() * (maximum - minimum) + minimum;
  if(coinToss > prob){
    return randomNum;
  } else {
    return randomNum * -1;
  }
}
//makes a random positive number in a range
function randomInRange(minimum, maximum){
  return Math.random() * (maximum - minimum) + minimum;
}

//remaps value x of known range between xLo and xHi to new range of yLo to yHi
function scale(x, xLo, xHi, yLo, yHi) {
  let percent = (x - xLo) / (xHi - xLo);
  return percent * (yHi - yLo) + yLo;
}

function render(){
  let directionX, directionY;
  if(keys[87]){
    ship.movingY = true;  //controls 87 = w S = 83 
    directionY = -1;
  } else if(keys[83]){
    ship.movingY = true;  
    directionY = 1;
  } else if (!keys[87] && !keys[83]){
    ship.movingY = false;
  }
  if(keys[65]){
    ship.movingX = true;  //68 = D 65 = A 
    directionX = -1;
  } else if(keys[68]){
    ship.movingX = true;  
    directionX = 1;
  } else if (!keys[68] && !keys[65]){
    ship.movingX = false;
  }
  if (keys[16]){
    ship.sheild = true;
  } else {
    ship.sheild = false;
  }
  //clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //update and draw stars
  for(i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].draw();
  }
  ship.update(directionX, directionY);
  ship.draw();
  ship.drawCollisionRadius();
  waveMachine.update();
  for(let i = 0; i < testObstacle.length; i++){
    testObstacle[i].update();
    testObstacle[i].draw();
  }
  for(let i = 0; i < testObstacle.length; i++){
    let crash;
    if(!ship.sheild){
      crash = hitTest(12, ship.noseX, ship.noseY + 20, testObstacle[i].radius, testObstacle[i].x, testObstacle[i].y);
      if(crash){
        testObstacle[i].color = `red`;
      } else {
        testObstacle[i].color = `white`;
      }
    }else {
      crash = hitTest(30, ship.noseX, ship.noseY + 15, testObstacle[i].radius, testObstacle[i].x, testObstacle[i].y);
      if(crash){
        testObstacle[i].color = `red`;
        testObstacle[i].speedX *= -1;
        testObstacle[i].speedY *= -1;
        testObstacle.splice(i, 1);
      } else {
        testObstacle[i].color = `white`;
      }
    }
  }
  //console.log(crash)
  if(testObstacle.length === 0){
    ctx.font = "80px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You Win", canvas.width/2, canvas.height/2);
  }
  //console.log(testObstacle[0].onScreen)
  //testObstacle[0].color = 'green';
  requestAnimationFrame(render);
}

//find the differences between the x and y values, square them, sum them
//and if the square root of the sum is less than the sum of the two radii
//then the circles overlap
function hitTest(radius1, x1, y1, radius2, x2, y2){
  let radiiSum = radius1 + radius2;
  let xDifference = x1 - x2;
  let yDifference = y1 - y2;
  xDifference *= xDifference;
  yDifference *= yDifference;
  if(radiiSum > Math.sqrt(xDifference + yDifference)){
    return true;
  } else {
    return false;
  }
}

function circleWave(){
    //for testing
    for(let i = 0; i < 50; i++){
      let rad = 15 + (Math.random() * 50);
      testObstacle[i] = new CircleObstacle(randomInRange(0, canvasWidth),      //x
        randomInRange(0, canvasHeight * -1),                              //y
          randomSignInRange(1, 5),                                        //speedX
            randomInRange(1, 5),                                          //speedY
              rad,                                                        //radius
                `white`);                                                 //color
    }  
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~CLASSES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
class Star {
  constructor(speed, x, y, color, size){
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    //this.element = element;
  }
  update(){
    //move stare
    this.y += this.speed;
    //if star moves off screen, reset y and randomize x to repurpose it as a new star
    if(this.y > canvasHeight){
      this.y = 0;
      this.x = scale(Math.random(), 0, 1, 0, canvasWidth);
    }
  }
  draw(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, this.size, 0, Math.pi * 2);
    ctx.closePath();
    ctx.stroke();
  }
}

class Ship {
  constructor(){
    this.speed = 7;
    this.noseX = canvasWidth * .5;
    this.noseY = canvasHeight * .5;
    this.movingX = false;
    this.movingY = false;
    this.color = `antiquewhite`;
    this.sheildColor =  `173, 216, 230`;
    this.sheildColorAlpha = 1;
    this.sheild = false;
    this.sheildLevel = 4;
  }
  update(directionX, directionY){
    if(this.movingY){
      this.noseY += this.speed * directionY;
    }
    if(this.movingX){
      this.noseX += this.speed * directionX;
    }
    if(this.noseX > canvasWidth){                     //move ship to other side of screen when it reaches the side
      this.noseX = 0;
    }       
    if(this.noseX < 0){                     //move ship to other side of screen when it reaches the side
      this.noseX = canvasWidth;
    }       
    if(this.noseY > (canvasHeight - 30)){                     //move ship to other side of screen when it reaches the side
      this.noseY = (canvasHeight - 30);
    }       
    if(this.noseY < 0){                     //move ship to other side of screen when it reaches the side
      this.noseY = 0;
    } 
  }
  draw(){
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.noseX, this.noseY);
    ctx.lineTo(this.noseX - 10, this.noseY + 30);
    ctx.lineTo(this.noseX + 10, this.noseY + 30);
    //ctx.lineTo(this.nose, this.nose);
    ctx.closePath();
    ctx.stroke();
    if(this.sheild){
      ctx.lineWidth = this.sheildLevel;
      ctx.strokeStyle = `rgba(${this.sheildColor}, ${this.sheildColorAlpha})`;
      ctx.beginPath();
      ctx.arc(this.noseX, this.noseY + 15, 30, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
  drawCollisionRadius(){
    ctx.lineWidth = 1;
    ctx.strokeStyle = `white`;
    ctx.beginPath();
    ctx.arc(this.noseX, this.noseY + 20, 12, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}

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

class CircleObstacle {
  constructor(x, y, speedX, speedY, radius, color){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
    this.onScreen = false;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x > canvasWidth + this.radius){                     //move ship to other side of screen when it reaches the side
      this.x = 0 - this.radius;
    }       
    if(this.x < 0 - this.radius){                     //move ship to other side of screen when it reaches the side
      this.x = canvasWidth + this.radius;
    }       
    // if(this.y > (canvasHeight - this.radius)){                     //move ship to other side of screen when it reaches the side
    //   this.speedY *= -1;
    // }       
    // if(this.y < (this.radius)){                     //move ship to other side of screen when it reaches the side
    //   this.speedY *= -1;
    // }       
    if(this.y > this.radius + canvasHeight){
      this.onScreen = false;
    } else if(this.y < 0 - this.radius){
      this.onScreen = false;
    } else {
      this.onScreen = true;
    }
  }
  draw(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}


// update(){
//   this.x += this.speedX;
//   this.y += this.speedY;
//   if(this.x > (canvasWidth - this.radius)){                     //move ship to other side of screen when it reaches the side
//     this.speedX *= -1;
//   }       
//   if(this.x < this.radius){                     //move ship to other side of screen when it reaches the side
//     this.speedX *= -1;
//   }       
//   if(this.y > (canvasHeight - this.radius)){                     //move ship to other side of screen when it reaches the side
//     this.speedY *= -1;
//   }       
//   if(this.y < (this.radius)){                     //move ship to other side of screen when it reaches the side
//     this.speedY *= -1;
//   }       
//   if(this.y > this.radius + canvasHeight){
//     this.onScreen = false;
//   } else if(this.y < 0 - this.radius){
//     this.onScreen = false;
//   } else {
//     this.onScreen = true;
//   }