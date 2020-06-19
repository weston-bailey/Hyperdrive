/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY init() AND navComputerGameStart()~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//callback for loading message
function loadingMessage(){
  if(loadingMessageInc < loadingText.length){
    LOAD_TEXT_UPDATE.innerText += loadingText.charAt(loadingMessageInc);
    loadingMessageInc++;
    loadingMessageTimeout = setTimeout(loadingMessage, typingSpeed);
  } else {
    LOAD_TEXT_UPDATE.style.display = `none`;
    START_GAME_BUTTON.style.display = `block`;
    LOAD_TEXT_COMPLETE.innerText = `Complete!`;
    LOAD_TEXT_PRESS_ENTER.innerText = `Use [W][S][A][D] to pilot your craft and [SHIFT] to active its sheild`;
    doneLoading = true;
  }
}

//fades in interfaceElements on load
function loadFadeIn(){
  if(loadOpacity < 1){
     loadOpacity += .003;
     for(let i = 0; i < LOAD_FADE.length; i++){
       LOAD_FADE[i].style.opacity = loadOpacity;
     }
    loadFadeInTimer = setTimeout(loadFadeIn, fadeSpeed);
  } 
}

//next level will do more when levels are implemented more
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

//called by init
function makeStarBackgroud() {
  for(let i = 0; i < 75; i++){
    //distant stars
    backgroundZ0[i] = new Star({
      speed: 1 + Math.random(),
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      color: `rgba(255, 255, 255, .15)`,
      size: 1,
    });
    //closer stars
    backgroundZ1[i] = new Star({
      speed: 3 - Math.random(),
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      color: `rgba(255, 255, 255, .3)`,
      size: 1.,
    });
  }
  for(let k = 0; k < 3; k++){
    backgroundZ2[k] = new Star({
      //three random 'planets'
      speed: Math.random() * 3,
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      color: hexToRGBA(randomColorHex(), Math.random()),
      size: Math.random() * 3,
    });
  }
}

//keeps track of overall distance and does distance-related duties
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY USER CLICK EVENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//fades the nav computer out and disables the start game button
function navComputerGameStart(){
  //stop the fade animation if it is still going
  clearInterval(loadFadeInTimer);
  for(let i = 0; i < LOAD_FADE.length; i++){
    LOAD_FADE[i].style.opacity = 1;
  }
  //enjoy the silence of space
  titleMusic.fade(0, .01, () => { titleMusic.stop(); });
  //clear enemies
  waveMachine = null;
  for(let i = 0; i < enemies.length; i++){
    enemies[i].selfDestruct = 'true';
  }
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
  //kick out the jams (need to wrap a class's method in a function to use with setTimeout?)
  musicTimer = setTimeout( () => { levelMusic.volume(1); levelMusic.play(); }, 6000);
}

//fades the nav computer out and disables the start game button
function navComputerPlayerDeath(){
  //fade in the title and nav computer
  titleFadeInTimer = setTimeout(titleFadeIn, 9000);
  navComputerFadeInTimer = setTimeout(navComputerFadeIn, 3000);
  //do all the menu stuff
  MAIN_MENU_BUTTON.style.display = `inline`;
  MANUAL_FLIGHT_BUTTON.style.display = `none`;
  AUTO_REPAIR_CONTAINER.style.visibility = `hidden`;
  SCOREBOARD_CONTAINER.style.visibility = `visible`;
  DISTANCE_SCORE_TEXT.innerText = `Distance Survived: ${distance}`;
  TOTAL_WAVES_TEXT.innerText = `Waves Survived: ${totalWaves}`;
  COLLISIONS_AVOIDED_TEXT.innerText = `Collisions Avoided: ${totalEnemies}`;
  NAV_COMPUTER_O.style.visibility = `hidden`;
  NAV_COMPUTER_M_P_U.style.color = `red`;
  HYPER_DRIVE_REPAIR_LEVEL_TEXT.innerText = `Hyperdirve Repair Level: ${precentageOf(level, 12)}%`;
  SECTOR_NAV_TEXT.innerText = `SECTOR: OPEN SPACE ${level}`;
  navComputerBlinkTimerER = setTimeout(navComputerBlinkER, 350);
  navComputerBlinkTimerN = setTimeout(navComputerBlinkN, 200);
  // //update nav computer screen
  MANUAL_FLIGHT_MESSAGE.style.visibility = `hidden`;
  //reset emergency flash message
  EMERGENCY_FLASH.innerText = ' ';
  clearTimeout(emergencyMessageTimeout);
  emergencyMessageInc1 = 0; //letter index to print
  emergencyMessageInc2 = 0;
  emergencyText1 = 'CRITICAL MALFUNCTION ALERT   '; //first message
  emergencyText2 = 'Life Support System Failure   '; 
  emergencyText1 = scrambleString(emergencyText1);
  emergencyText2 = scrambleString(emergencyText2);
  emergencyMessageTimeout = setTimeout(emergencyMesssage1, typingSpeed);
}

//callback to blink nav comp letters on game over
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
  navComputerBlinkTimerER = setTimeout(navComputerBlinkER, 350);
}
//callback to blink nav comp on game over
function navComputerBlinkN(){
  if( NAV_COMPUTER_N.style.visibility == `hidden`){
    let navComputerRandomChars = `NnñÑ¿µúùû¥ü`;
    let randomChar = Math.round(randomInRange(0, navComputerRandomChars.length - 1));
    NAV_COMPUTER_N.innerText = `${navComputerRandomChars[randomChar]}`;
    NAV_COMPUTER_N.style.visibility = `visible`;
  } else {
    NAV_COMPUTER_N.style.visibility = `hidden`;
  }
  navComputerBlinkTimerN = setTimeout(navComputerBlinkN, randomInRange(30, 300));
}

//for debug mode start wants a single wave function and a starting level
function debugGameStart(wave, level){
  level = level;
  ship.sheildLevel = 5;
  decrementSheild();
  for(let i = 0; i < LOAD_TEXT.length; i++){
    LOAD_TEXT[i].style.display = `none`;
  }
  //fade out the title
  TITLE_CONTAINER.style.opacity = 0;
  NAV_COMPUTER.style.opacity = 0;
  START_GAME_BUTTON.style.display = `none`;
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

//used to scramble message text on game over
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
  return stringArray.toString().replace( /,/g, "" );; //TODO maybe limit length of returned string
}

//writes emergencyText1 and switches by calling emergencyMessage2 when finished
//TODO do this wihout innerHTML
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

/* TODO: try to make a function/class that fades 
whatever html element is passed to it, that would slick af */

//fades out the title (same speed as nav computer)
function titleFadeOut(){
  if(titleOpacity > .0){
    titleOpacity -= .01;
    TITLE_CONTAINER.style.opacity = titleOpacity;
    titleFadeOutTimer = setTimeout(titleFadeOut, fadeSpeed);
  } 
}
//fades out the title (same speed as nav computer)
function titleFadeIn(){
  if(titleOpacity <= 1){
    titleOpacity += .01;
    TITLE_CONTAINER.style.opacity = titleOpacity;
    titleFadeInTimer = setTimeout(titleFadeIn, fadeSpeed);
  } 
}
//fades out the nav computer but doesnt bother with the flight control
function navComputerFadeOut(){
  if(navComputerOpacity > .0){
    navComputerOpacity -= .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    navComputerFadeOutTimer = setTimeout(navComputerFadeOut, fadeSpeed);
  } 
}

//fades in the nav computer 
function navComputerFadeIn(){
  if(navComputerOpacity < 1){
    navComputerOpacity += .01;
    NAV_COMPUTER.style.opacity = navComputerOpacity;
    navComputerFadeInTimer = setTimeout(navComputerFadeIn, fadeSpeed);
  } 
}

//reset lmao
function resetGame() {
  //do music stuff
  levelMusic.fade(0, .1, () =>  { levelMusic.stop(); titleMusic.volume(1); titleMusic.play(); });
  //enemies now cleared at game start
  // for(let i = 0; i < enemies.length; i++){
  //   enemies[i].selfDestruct = 'true';
  // }
  //clear timers
  clearTimeout(navComputerFadeInTimer);
  clearTimeout(navComputerFadeOutTimer);
  clearTimeout(titleFadeInTimer);
  clearTimeout(navComputerFadeOutTimer);
  clearTimeout(navComputerBlinkTimerER);
  clearTimeout(navComputerBlinkTimerN);
  clearTimeout(emergencyMessageTimeout);
  clearInterval(distanceTimer);
  //reset HUD
  TITLE_CONTAINER.style.opacity = `1`;
  NAV_COMPUTER_N.style.visibility = `visible`;
  NAV_COMPUTER_N.innerText = `N`;
  NAV_COMPUTER_O.style.visibility = `visible`;
  NAV_COMPUTER_M_P_U.style.color = `#33ff00`;
  NAV_COMPUTER_M_P_U.style.visibility = `visible`;
  NAV_COMPUTER_E_R.style.visibility = `visible`;
  NAV_COMPUTER_E_R.style.color = `#33ff00`;
  EMERGENCY_FLASH.innerHTML = ' ';
  SECTOR_CONTAINER.style.visibility = `hidden`;
  SECTOR_NAV_TEXT.innerText = `sector: open space 1`;
  MANUAL_FLIGHT_BUTTON.style.display = `inline`;
  AUTO_REPAIR_CONTAINER.style.visibility = `hidden`;
  SCOREBOARD_CONTAINER.style.visibility = `hidden`;
  MANUAL_FLIGHT_MESSAGE.style.visibility = `visible`;
  MANUAL_FLIGHT_MESSAGE.innerText = `FLIGHT CONTROL:`;
  MANUAL_FLIGHT_ERROR_MESSAGE.innerText = `ERROR`;
  MAIN_MENU_BUTTON.style.display = `none`;
  COLLISION_VECTOR_TEXT.innerText = `COLLISION VECTORS: 0`;
  COLLISION_VECTOR_TEXT.style.color = `#33ff00`;
  HYPER_DRIVE_TEXT.innerText = `HYPERDIVE REPAIR: 8%`;
  WAVES_TEXT.innerText = `WAVE #: `;
  SECTOR_TEXT.innerText = `SECTOR: OPEN SPACE 1`;
  DISTANCE_TEXT.innerText = `DISTANCE: 0`;
  //reset vars
  ship = null;
  //waveMachine = null; //wavemachine can stay active, now enemies are handled ad game start
  prevEnemiesLength = 0;
  totalEnemies = 0;
  emergencyMessageTimeout = null;
  emergencyMessageInc1 = 0; 
  mergencyMessageInc2 = 0;
  emergencyText1 = '*EMERGENCY ALERT*   '; 
  emergencyText2 = 'Auto Pilot System Failure   '; 
  navComputerBlinkTimerER = null;
  navComputerBlinkTimerN = null;
  navComputerOpacity = 1;
  titleOpacity = 1;
  distanceTimer = null;
  distance = 0;
  totalWaves = -1;
  levelStartInterval = null;
  level = 0;
  gameActive = false;
  //from init
  emergencyMesssage1(); 
  ship = new Ship;
  ship.sheildLevel = 2;
  decrementSheild();
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS CALLED BY render()~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//updates ship moving values and reutrns x y directions for the ships movement method
//TODO make inoutHandler directly modify the ships x y instead of returning them
function inputHandler(){
  //for gameplay
  if(gameActive){
    let directionX = null;
    let directionY = null;
    if(keys[87] || keys[38]){
      ship.movingY = true;  //controls 87 = w S = 83 
      directionY = -1;
    } else if(keys[83] || keys[40]){
      ship.movingY = true;  
      directionY = 1;
    } else if (!keys[87] && !keys[83] && !keys[38] && !keys[40]){
      ship.movingY = false;
    }
    if(keys[65] || keys[37]){
      ship.movingX = true;  //68 = D 65 = A 
      directionX = -1;
    } else if(keys[68] || keys[39]){
      ship.movingX = true;  
      directionX = 1;
    } else if (!keys[68] && !keys[65] && !keys[38] && !keys[39]){
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

//for load screen
function loadScreenClickThru(){
  if(doneLoading && !gameInitialized){
    gameInitialized = true;
    MANUAL_FLIGHT_BUTTON.style.display = `inline`;
    for(let i = 0; i < LOAD_TEXT.length; i++){
      LOAD_TEXT[i].style.display = `none`;
    }
    //this is reduntant with next level, but in the future they
    //could be different
    waveMachine = new WaveMachine(waveFunctions); 
    titleMusic.play();
    loadFadeIn();
  }
}

//update and draw background
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

//update and draw ship (needs x y in and array from input handler)
function drawShip(shipDirection){
  //only draw on game active
  if(gameActive){
    ship.update(shipDirection[0], shipDirection[1]);
    ship.draw();
    if(debug){
      ship.drawCollisionRadius();
    }
  }
}

//update and draw enemies
function drawEnemies(){
  for(let k = 0; k < enemies.length; k++){
    enemies[k].update();
    enemies[k].draw();
    if(debug){
      enemies[k].drawCollisionRadius();
    }
  }
}
///update and draw exhaust
function drawExhaust() {
  for(let i = 0; i < exhuastParticles.length; i++){
    exhuastParticles[i].update();
    exhuastParticles[i].draw();
  }
}

//update and draw debris
function drawDebris(){
  for(let j = 0; j < debrisParticles.length; j++){
    debrisParticles[j].update();
    debrisParticles[j].draw();
  }
}

//find the differences between the x and y values, square them, sum them
//and if the square root of the sum is less than the sum of the two radii
//then the circles overlap √((x1 + x2)^2 + (y1 + y2)^2)
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

//callback after shield is hit
function sheildCoolDownOver(){
  //handle HUD and subtraction
  decrementSheild();
  //cooldown has ended
  ship.sheildCoolDown = false;
  ship.sheild = ship.sheild; // why did i put this here? is this needed TODO
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

//splice everything marked as garbage
//TODO Change garbage collection by letting objects know
//thier array index and handle splicing themself
function collectGarbage(){
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
}

//used by wave functions to scale hit radius of enemies based on sides
function sidesToHitRadiusScale(numOfSides){
  let scaleValue;
  switch(numOfSides){
    case 3 :
      scaleValue = .65;
      break;
    case 4 :
      scaleValue = .8;
      break;
    case 5 :
      scaleValue = .85;
      break;
    case 6 :
      scaleValue = .9;
      break;
    case 7 :
      scaleValue = .95;
      break;
    default :
      scaleValue = .95;
      break;
  }
  return scaleValue;
}