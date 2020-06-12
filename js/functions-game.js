/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY init() AND navComputerGameStart()~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function nextLevel(){
  //check if we are on level one, if so start timer and gameActive
  if(level === 0){
    //get rid of nav computer
    navComputerFadeOut();
    //make wave machine
    waveMachine = new WaveMachine(circleWave);
    //track distance
    distanceTimer = setInterval(distanceTick, 500);
    //game is now active
    gameActive = true;
  }
  level++;
}

//called when manual flight control button is pressed
function gameStart(){
  //make a new wave machine
  //fade out menu
  //track distance
  distanceTimer = setInterval(distanceTick, 500);
  //game is now active
  gameActive = true;
}

//writes emergencyText1 and switches by calling emergencyMessage2 when finished
function emergencyMesssage1() {
  if (emergencyMessageInc1 < emergenccText1.length) {
    EMERGENCY_FLASH.innerHTML += emergenccText1.charAt(emergencyMessageInc1);
    emergencyMessageInc1++;
    emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  } else if (emergencyMessageInc1 >= emergenccText1.length){
    emergencyMessageInc1 = 0;
    EMERGENCY_FLASH.innerHTML = ' ';
    emergencyMessageTimeout = setTimeout(emergencyMesssage2, typingSpeed);
  }
}
//writes emergencyText2 and switches by caliing emergencyMessage1 when finished
function emergencyMesssage2() {
  if (emergencyMessageInc2 < emergenccText2.length) {
    EMERGENCY_FLASH.innerHTML += emergenccText2.charAt(emergencyMessageInc2);
    emergencyMessageInc2++;
    emergencyMessageTimeout = setTimeout(emergencyMesssage2, typingSpeed);
  } else if (emergencyMessageInc2 >= emergenccText2.length){
    emergencyMessageInc2 = 0;
    EMERGENCY_FLASH.innerHTML = ' ';
    emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  }
}

function makeStarBackgroud() {
  for(let i = 0; i < 75; i++){
    backgroundZ0[i] = new Star(3 - Math.random(), scale(Math.random(), 0, 1, 0, canvasHeight), 
      scale(Math.random(), 0, 1, 0, canvasWidth), `rgba(255, 255, 255, .3)`, 1);
  }
  for(let j = 0; j < 75; j++){
    backgroundZ1[j] = new Star(1 + Math.random(), scale(Math.random(), 0, 1, 0, canvasHeight), 
      scale(Math.random(), 0, 1, 0, canvasWidth), `rgba(255, 255, 255, .15)`, 1);
  }
  for(let k = 0; k < 3; k++){
    backgroundZ2[k] = new Star(Math.random() * 3, scale(Math.random(), 0, 1, 0, canvasHeight), 
    scale(Math.random(), 0, 1, 0, canvasWidth), hexToRGBA(randomColorHex(), Math.random()), Math.random() * 3);
  }
}

// //fades the nav computer out and disables the start game button
// function navComputerFadeOutGameStart(){
//   if(navComputerOpacity > .0){
//     navComputerOpacity -= .01;
//     NAV_COMPUTER.style.opacity = navComputerOpacity;
//     MANUAL_FLIGHT_BUTTON.style.opacity = navComputerOpacity;
//     TITLE_CONTAINER.style.opacity = navComputerOpacity;
//     setTimeout(navComputerFadeOutGameStart, navComputerFadeSpeed);
//   } else if (navComputerOpacity <= 0 ){
//     MANUAL_FLIGHT_BUTTON.style.display = `none`;
//   }
// }

//keeps track of overall distance
function distanceTick(){
  distance++;
  DISTANCE_TEXT.innerText = `DISTANCE: ${distance}`;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY render()~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//updates ship moving values and reutrns x y directions for the ships movement method
function inputHandler(){
  if(gameActive){
    let directionX = null;
    let directionY = null;
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
      if(ship.sheildLevel > 0){
        ship.sheild = true;
      }
    } else {
      ship.sheild = false;
    }
    return [directionX, directionY];
  }
}

//looks for objects in the background arrays and updates and draws them
function drawBackground(){
  for(let i = 0; i < backgroundZ0.length; i++){
    backgroundZ0[i].update();
    backgroundZ0[i].draw();
  }
  for(let j = 0; j < backgroundZ1.length; j++){
    backgroundZ1[j].update();
    backgroundZ1[j].draw();
  }
  for(let k = 0; k < backgroundZ2.length; k++){
    backgroundZ2[k].update();
    backgroundZ2[k].draw();
  }
  for(let l = 0; l < backgroundZ3.length; l++){
    backgroundZ3[l].update();
    backgroundZ3[l].draw();
  }
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

//decrements sheild level on hit and updates hud
function decrementSheild(){
  //return if called and the ship has no sheild
  if(ship.sheildLevel <= 0){
    return;
  } else {
    //decrement shield level value
    clamp(ship.sheildLevel -= 1, 0, 4);
    //update HUD Textt
    SHEILD_LEVEL_TEXT.innerText = `SHEILD LEVEL: ${scale(ship.sheildLevel, 0, 4, 0, 100)}%`;
    //update HUD color
    if (ship.sheildLevel > 2) {
      SHEILD_LEVEL_TEXT.style.color = `#33ff00`;
    } else if (ship.sheildLevel >= 2) {
      SHEILD_LEVEL_TEXT.style.color = `yellow`;
    } else if (ship.sheildLevel >= 0) {
      SHEILD_LEVEL_TEXT.style.color = `red`; 
      //set ship sheild to false if the sheild runs out, just in case the key is still being held down
      ship.sheild = false;  
    }
  }
}

/* TODO: try to make a function/class that fades 
whatever html element is passed to it, that would slick af */

//fades out the title (same speed as nav computer)
function titleFadeOut(){
  if(titleOpacity > .0){
    titleOpacity -= .01;
    TITLE_CONTAINER.style.opacity = titleOpacity;
    setTimeout(titleFadeOut, fadeSpeed);
  } 
}
//fades out the nav computer but doesnt bother with the flight control
function navComputerFadeOut(){
  if(navComputerOpacity > .0){
    navComputerOpacity -= .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    setTimeout(navComputerFadeOut, fadeSpeed);
  } 
}

//fades in the nav computer 
function navComputerFadeIn(){
  if(navComputerOpacity < 1){
    navComputerOpacity += .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    setTimeout(navComputerFadeIn, fadeSpeed);
  } 
}
