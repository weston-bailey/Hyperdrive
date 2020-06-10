/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS FOR GAMEPLAY MECHANICS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
      scale(Math.random(), 0, 1, 0, canvasWidth), hexToRGB(randomColorHex(), Math.random()), Math.random() * 3);
    }
}

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

//updates ship moving values and reutrns x y directions
function inputHandler(){
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
    ship.sheild = true;
  } else {
    ship.sheild = false;
  }
  return [directionX, directionY];
}