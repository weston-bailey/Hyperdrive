/*~~~~~~~~~~~~~~~~~~~~~~~~~~THESE FUNCTIONS CAN BE PASSED TO THE WAVE MACHINE TO MAKE ENEMIESS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//pass to the wave machine as a 'null' function so it doesn't freak out if needed for debug
let dummyWave = function(){
  return;
}

//for testing new enemy behaviors
let testWave = function() {
  let sides =  Math.round(randomInRange(3, 6));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let amount = randomInRange(5, clamp(level + 10, 11, 20));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5);
  let speedY = randomInRange(2, clamp(2 + level, 3, 6));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06);
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonBounceBomb(randomInRange(0, canvasWidth), //x random
    spawnHalfX,                               //y random
    speedX,                                       //speedX
        speedY,                                //speedY
        randomInRange(15, 25),                              //size
            180,                                            //radans
            spinningSpeed,                                          //spinSpeed
              sides,                                          //sides
                lineWidth,                                        //lineWidth
                randomColorHex(),                       //color
                    radiusScaling,                                   //hit radius scale    
                        randomInRange(0, canvasHeight), //y position of self destruct   
                        randomInRange(3, 6)             //bounce times until self destruct
                        ));     
  }                       
}

///small polgons that bounce with the same x pos
let bounceWaveSameX = function() {
  let sides =  Math.round(randomInRange(3, 6));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in ran
  let amount = randomInRange(5, clamp(level + 10, 11, 20));
  //speed inc with level but just a little
  let speedX = randomInRange(2, clamp(2 + level, 3, 6));
  let speedY = randomInRange(2, clamp(2 + level, 3, 6));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06);
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonBounceBomb(randomInRange(0, canvasWidth), //x random
    spawnHalfX,                               //y random
    speedX,                                       //speedX
        speedY,                                //speedY
        randomInRange(15, 25),                              //size
            180,                                            //radans
            spinningSpeed,                                          //spinSpeed
              sides,                                          //sides
                lineWidth,                                        //lineWidth
                randomColorHex(),                       //color
                    radiusScaling,                                   //hit radius scale    
                        randomInRange(0, canvasHeight), //y position of self destruct   
                        randomInRange(3, 8)             //bounce times until self destruct
                        ));     
  }                       
}
///small polgons that bounce with the same x pos
let bounceWaveClusterSameY = function() {
  let sides =  Math.round(randomInRange(3, 6));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let amount = randomInRange(30, clamp(level + 35, 36, 60));
  //speed inc with level but just a little
  let speedX = randomInRange(2, clamp(2 + level, 3, 6));
  let speedY = randomInRange(2, clamp(2 + level, 3, 6));
  let posX = randomInRange(0, canvasHeight);
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06);
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonBounceBomb(posX, //x random
    spawnHalfX - i * 25,                               //y random
    speedX,                                       //speedX
        speedY,                                //speedY
        randomInRange(15, 25),                              //size
            180,                                            //radans
            spinningSpeed,                                          //spinSpeed
              sides,                                          //sides
                lineWidth,                                        //lineWidth
                randomColorHex(),                       //color
                    radiusScaling,                                   //hit radius scale    
                        randomInRange(0, canvasHeight), //y position of self destruct   
                        randomInRange(3, 8)             //bounce times until self destruct
                        ));     
  }                       
}
///small polgons that bounce with the same x pos
let bounceWaveSameY = function() {
  let sides =  Math.round(randomInRange(3, 6));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let amount = randomInRange(10, clamp(level + 20, 21, 40));
  //speed inc with level but just a little
  let speedX = randomInRange(2, clamp(2 + level, 3, 6));
  let speedY = randomInRange(2, clamp(2 + level, 3, 6));
  let posX = randomInRange(0, canvasHeight);
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06);
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonBounceBomb(posX, //x random
    spawnHalfX - i * 100,                               //y random
    speedX,                                       //speedX
        speedY,                                //speedY
        randomInRange(15, 25),                              //size
            180,                                            //radans
            spinningSpeed,                                          //spinSpeed
              sides,                                          //sides
                lineWidth,                                        //lineWidth
                randomColorHex(),                       //color
                    radiusScaling,                                   //hit radius scale    
                        randomInRange(0, canvasHeight), //y position of self destruct   
                        randomInRange(3, 8)             //bounce times until self destruct
                        ));     
  }                       
}

//a bunch of circles to maving around randomly
let circleWave = function(){
  //for testing
  for(let i = 0; i < 50; i++){
    let rad = 15 + (Math.random() * 50);
    enemies[i] = new Circle(randomInRange(0, canvasWidth),      //x
      randomInRange(spawn1X, spawn2X),                                  //y
        randomSignInRange(1, 5),                                        //speedX
          randomInRange(1, 5),                                          //speedY
            rad,                                                        //radius
              `#FFFFFF`);                                                //color white
  }  
}

//completely random polygons
let polygonWaveRandom = function(){
  for(let i = 0; i < 50; i++){
    enemies.push(new PolygonTemplate());    
  }
}

//falling triangles random directions and random sizes
let triangleCometWaveRandomDirections = function(){
  let lineColor = randomColorHex();
  let amount = randomInRange(clamp(30 + (level * 5), 35, 80), clamp(60 + (level * 5), 65, 120));
  let spinningSpeed = randomInRange(0., .05);
  let lineWidth = randomInRange(2, 4);
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonWrap(randomInRange(0, canvasWidth), //x random
        (i * 200) * -1 + spawn3X,                               //y random
          randomSignInRange(0, 6),                                                    //speedX
            randomInRange(7, 9),                                //speedY
            randomInRange(25, 70),                              //size
                180,                                            //radans
                  spinningSpeed,                                          //spinSpeed
                    3,                                          //sides
                      lineWidth,                                        //lineWidth
                        lineColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}

//falling triangles random directions
let triangleCometWaveSameDirections = function(){
  let lineColor = randomColorHex();
  let amount = randomInRange(clamp(30 + (level * 5), 35, 80), clamp(60 + (level * 5), 65, 120));
  let spinningSpeed = randomInRange(0., .05);
  let lineWidth = randomInRange(2, 4);
  let direction = randomSignInRange(1, 6)
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonWrap(randomInRange(0, canvasWidth), //x random
        (i * 200) * -1 + spawn3X,                               //y random
          direction,                              //speedX
            randomInRange(7, 9),                                //speedY
            randomInRange(25, 70),                              //size
                180,                                            //radans
                  spinningSpeed,                                          //spinSpeed
                    3,                                          //sides
                      lineWidth,                                        //lineWidth
                        lineColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}

//falling small fast moving triangles in random directions
let triangleCometWaveSameDirectionsSmall = function(){
  let lineColor = randomColorHex();
  let amount = randomInRange(clamp(50 + (level * 5), 50, 100), clamp(75 + (level * 5), 75, 200));
  let spinningSpeed = randomInRange(0., .05);
  let lineWidth = randomInRange(2, 4);
  let direction = randomSignInRange(1, 6)
  for(let i = 0; i < amount; i++){
    enemies.push(new PolygonWrap(randomInRange(0, canvasWidth), //x random
        (i * 200) * -1 + spawn3X,                               //y random
          direction,                              //speedX
            randomInRange(9, 15),                                //speedY
            randomInRange(15, 20),                              //size
                180,                                            //radans
                  spinningSpeed,                                          //spinSpeed
                    3,                                          //sides
                      lineWidth,                                        //lineWidth
                        lineColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}

//rows of ploygons with an offset y higher on right side of screen
let higherRightSlantWave = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          ((10 - i) * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            0,                                    //speedX fall straight down
              speedY,                                  //speedY
              50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}
//rows of polygons with an offset y, higher on left side of screen
let higherLeftSlantWave = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          (i * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            0,                                    //speedX fall straight down
              speedY,                                  //speedY
              50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//rows of polygons with an offset y higher on the left side of screen moving in a
//candycane like pattern
let higherLeftSlantWaveMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          (i * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            speedX,                                    //speedX fall straight down
              speedY,                                  //speedY
              50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//rows of polygons with an higer y slanted to the left of the screen
//moving on thier x axis (hard wave bc x is negetive)
let inverseHigherLeftSlantWaveMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5) * -1;
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          (i * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            speedX,                                    //speedX fall straight down
              speedY,                                  //speedY
              50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//rows of squares with an offset y higher on the right side of the screen 
//moving on x
let higherRightSlantWaveMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5) * -1;
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          ((10 - i) * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            speedX,                                    //speedX fall straight down
              speedY,                                  //speedY
              50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}
//rows of squares with an offset y higher on the right with a positive x speed
//hard wave
let inverseHigherRightSlantWaveMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
          ((10 - i) * 40 + spawn1X) + (h * spawnHalfX),  //y inc with everybox made
            speedX,                                    //speedX fall straight down
              speedY,                                  //speedY
                50,                                 //size needs to be consistent
                  180,                            //radians so they all spin together
                    spinningSpeed,                //spinSpeed
                      sides,                          //no of polygon vertices
                        lineWidth,                        //lineWidth
                          lineColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//polgons in a line, skipping one 
//hard wave
let lineWave = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 5));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  //let speedX = randomInRange(1, 5);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox){
        enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
            spawn1X + (h * (spawnHalfX + clamp(level * 25, 25, 150))),  //y inc with everybox made
              0,                                    //speedX fall straight down
                speedY,                                  //speedY
                50,                                 //size needs to be consistent
                    180,                            //radians so they all spin together
                      spinningSpeed,                //spinSpeed
                        sides,                          //no of polygon vertices
                          lineWidth,                        //lineWidth
                            lineColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line, missing one moving on x
//Very hard wave
let lineWaveMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 5));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomSignInRange(1, 4);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox){
        enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
            spawn1X + (h * (spawnHalfX + clamp(level * 25, 25, 150))),  //y inc with everybox made
              speedX,                                    //speedX fall straight down
                speedY,                                  //speedY
                50,                                 //size needs to be consistent
                    180,                            //radians so they all spin together
                      spinningSpeed,                //spinSpeed
                        sides,                          //no of polygon vertices
                          lineWidth,                        //lineWidth
                            lineColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line, skipping two in a row
//hard wave
let lineWaveSkipTwo = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 5));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  //let speedX = randomInRange(1, 5);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox && i != noBox + 1){
        enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
            spawn1X + (h * (spawnHalfX + clamp(level * 25, 25, 150))),  //y inc with everybox made
              0,                                    //speedX fall straight down
                speedY,                                  //speedY
                50,                                 //size needs to be consistent
                    180,                            //radians so they all spin together
                      spinningSpeed,                //spinSpeed
                        sides,                          //no of polygon vertices
                          lineWidth,                        //lineWidth
                            lineColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line moving on x, skipping two
//easy mode for lower levels
let lineWaveSkipTwoMoveX = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 5));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomSignInRange(1, 4);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox && i != noBox + 1){
        enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
            spawn1X + (h * (spawnHalfX + clamp(level * 25, 25, 150))),  //y inc with everybox made
              speedX,                                    //speedX fall straight down
                speedY,                                  //speedY
                50,                                 //size needs to be consistent
                    180,                            //radians so they all spin together
                      spinningSpeed,                //spinSpeed
                        sides,                          //no of polygon vertices
                          lineWidth,                        //lineWidth
                            lineColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line
let lineWaveMoveY = function() {
  //random color per wave 
  let lineColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 5));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  //let speedX = randomSignsInRange(1, 4);
  let speedY = randomInRange(4, clamp(3 + level, 4, 5));
  let lineWidth = randomInRange(2, 4);
  //random speed per wave;
  let spinningSpeed = randomSignInRange(.05, .06)
  for(let h = 0; h < rows; h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox){
        enemies.push(new PolygonWrap( (i * 90),      //x inc with every box made
            spawn1X + (h * (spawnHalfX + clamp(level * 25, 25, 150))),  //y inc with everybox made
              0,                                    //speedX fall straight down
                speedY + randomSignInRange(0, .1),                                  //speedY
                50,                                 //size needs to be consistent
                    180,                            //radians so they all spin together
                      spinningSpeed,                //spinSpeed
                        sides,                          //no of polygon vertices
                          lineWidth,                        //lineWidth
                            lineColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}