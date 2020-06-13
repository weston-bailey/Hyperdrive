/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY init() AND navComputerGameStart()~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function nextLevel(){
  //check if we are on level one, if so start timer and gameActive
  if(level === 0){
    //get rid of nav computer
    navComputerFadeOut();
    //make wave machine
    waveMachine = new WaveMachine(waveFunctions);
    //track distance
    distanceTimer = setInterval(distanceTick, 500);
    //game is now active
    gameActive = true;
  }
  level++;
}

//[triangleCometWaveBig, polygonWaveRandom, squareLineSlantWave, circleWave]
//called when manual flight control button is pressed
function gameStart(){
  //make a new wave machine
  //fade out menu
  //track distance
  distanceTimer = setInterval(distanceTick, 500);
  //game is now active
  gameActive = true;
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
  emergencyText1 = 'WARNING: COLLISION IMMINENT   '; //first message
  emergencyText2 = 'Evasive maneuvers required   '; 
  emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  //make timer for level start
  levelStartInterval = setTimeout(nextLevel, 6000);
}

//fades the nav computer out and disables the start game button
function navComputerPlayerDeath(){
  //fade in the title and nav computer
  setTimeout(titleFadeIn, 9000);
  setTimeout(navComputerFadeIn, 3000);
  //get rid of the button
  MANUAL_FLIGHT_BUTTON.style.display = `none`;
  AUTO_REPAIR_CONTAINER.style.visibility = `hidden`;
  SCOREBOARD_CONTAINER.style.visibility = `visible`;
  DISTANCE_SCORE_TEXT.innerText = `Distance Survived: ${distance}`;
  TOTAL_WAVES_TEXT.innerText = `Waves Survived: ${totalWaves}`;
  COLLISIONS_AVOIDED_TEXT.innerText = `Collisions Avoided: ${totalEnemies}`;
  NAV_COMPUTER_O.style.visibility = `hidden`;
  NAV_COMPUTER_M_P_U.style.color = `red`;
  navComputerBlinkTimerER = setTimeout(navComputerBlinkER, 350);
  navComputerBlinkTimerN = setTimeout(navComputerBlinkN, 200);

  // SECTOR_CONTAINER.style.visibility = `visible`;
  // //update nav computer screen
  MANUAL_FLIGHT_MESSAGE.style.visibility = `hidden`;
  //reset emergency flash message
  EMERGENCY_FLASH.innerHTML = ' ';
  clearTimeout(emergencyMessageTimeout);
  emergencyMessageInc1 = 0; //letter index to print
  emergencyMessageInc2 = 0;
  emergencyText1 = 'CRITICAL MALFUNCTION ALERT   '; //first message
  emergencyText2 = 'Life Support System Failure   '; 
  emergencyText1 = scrambleString(emergencyText1);
  emergencyText2 = scrambleString(emergencyText2);
  emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  // //make timer for level start
  // levelStartInterval = setTimeout(nextLevel, 6000);
}

function navComputerBlinkER(){
  if( NAV_COMPUTER_E_R.style.visibility == `hidden`){
    NAV_COMPUTER_E_R.style.visibility = `visible`;
    let coinToss = Math.random();
    if (coinToss > .66) {
      NAV_COMPUTER_E_R.style.color = `#33ff00`;
    } else if (coinToss > .33) {
      NAV_COMPUTER_E_R.style.color = `yellow`;
    } else {
      NAV_COMPUTER_E_R.style.color = `red`; 
    }
  } else {
    NAV_COMPUTER_E_R.style.visibility = `hidden`;
  }
  setTimeout(navComputerBlinkER, 350);
}
function navComputerBlinkN(){
  if( NAV_COMPUTER_N.style.visibility == `hidden`){
    let navComputerRandomChars = `NnñÑ¿µúùû¥ü`;
    let randomChar = Math.round(randomInRange(0, navComputerRandomChars.length - 1));
    NAV_COMPUTER_N.innerText = `${navComputerRandomChars[randomChar]}`
    NAV_COMPUTER_N.style.visibility = `visible`;
  } else {
    NAV_COMPUTER_N.style.visibility = `hidden`;
  }
  setTimeout(navComputerBlinkN, randomInRange(30, 300));
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

function scrambleString(string){
  let stringArray = [];
  for(let i = 0; i < string.length; i++){
    let randomChars = `NnñÑ¿µúùû¥ü¡åß∂ƒœ∑≈ç£¢∞§¶•ªº–øˆ∆˚¬˙≥≤÷æ…¬“”˚*  `;
    let randomIndex = Math.round(randomInRange(0, randomChars.length - 1))
    let coinToss = Math.random();
    stringArray.push(string[i]);
    if(coinToss > .9){
      stringArray[i] += randomChars[randomIndex];
    } else if (coinToss > .8){
      stringArray[i] = randomChars[randomIndex];
    }
  }
  return stringArray.toString().replace( /,/g, "" );;
}


//writes emergencyText1 and switches by calling emergencyMessage2 when finished
function emergencyMesssage1() {
  if (emergencyMessageInc1 < emergencyText1.length) {
    EMERGENCY_FLASH.innerHTML += emergencyText1.charAt(emergencyMessageInc1);
    emergencyMessageInc1++;
    emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
  } else if (emergencyMessageInc1 >= emergencyText1.length){
    emergencyMessageInc1 = 0;
    EMERGENCY_FLASH.innerHTML = ' ';
    emergencyMessageTimeout = setTimeout(emergencyMesssage2, typingSpeed);
  }
}
//writes emergencyText2 and switches by caliing emergencyMessage1 when finished
function emergencyMesssage2() {
  if (emergencyMessageInc2 < emergencyText2.length) {
    EMERGENCY_FLASH.innerHTML += emergencyText2.charAt(emergencyMessageInc2);
    emergencyMessageInc2++;
    emergencyMessageTimeout = setTimeout(emergencyMesssage2, typingSpeed);
  } else if (emergencyMessageInc2 >= emergencyText2.length){
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

//keeps track of overall distance
function distanceTick(){
  if(gameActive){
    distance++;
    DISTANCE_TEXT.innerText = `DISTANCE: ${distance}`;
    //inc sheild level every 50 distances
    //inc by 2 and call decrementSheild() bc im lazy, haha
    if(distance % 50 == 0){
      ship.sheildLevel = clamp(ship.sheildLevel + 1, 0, 4);
    //update HUD Textt
    SHEILD_LEVEL_TEXT.innerText = `SHEILD LEVEL: ${scale(ship.sheildLevel, 0, 4, 0, 100)}%`;
    //update HUD color
    if (ship.sheildLevel > 2) {
        SHEILD_LEVEL_TEXT.style.color = `#33ff00`;
      } else if (ship.sheildLevel >= 2) {
        SHEILD_LEVEL_TEXT.style.color = `yellow`;
      } else if (ship.sheildLevel >= 0) {
        SHEILD_LEVEL_TEXT.style.color = `red`; 
      }
    }
  }
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
      if(ship.sheildLevel > 0 && !ship.sheildCoolDown){
        ship.sheild = true;
      }
    } else if(!ship.sheildCoolDown) {
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
  if(gameActive){
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
}

//decrements sheild level on hit and updates hud
function decrementSheild(){
  //return if called and the ship has no sheild
  if(ship.sheildLevel <= 0 && !ship.sheildCoolDown){
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

function sheildCoolDownOver(){
  decrementSheild();
  ship.sheildCoolDown = false;
  ship.sheild = ship.sheild;
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
//fades out the title (same speed as nav computer)
function titleFadeIn(){
  if(titleOpacity <= 1){
    titleOpacity += .01;
    TITLE_CONTAINER.style.opacity = titleOpacity;
    setTimeout(titleFadeIn, fadeSpeed);
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
