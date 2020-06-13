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

//pass to the wave machine as a 'null' function so it doesn't freak out
let dummyWave = function(){
  return;
}

let testWave = function() {
  enemies[0] = new PolygonBounceBomb(randomInRange(0, canvasWidth), //x random
  0,                               //y random
    randomSignInRange(0, 6),                                                    //speedX
      randomInRange(7, 9),                                //speedY
      randomInRange(25, 70),                              //size
          180,                                            //radans
            .1,                                          //spinSpeed
              3,                                          //sides
                2,                                        //lineWidth
                  randomColorHex(),                               //color
                    .6,
                      randomInRange(0, canvasHeight));                                  //hit radius scale       
}

let circleWave = function(){
  //for testing
  for(let i = 0; i < 50; i++){
    let rad = 15 + (Math.random() * 50);
    enemies[i] = new CircleWrap(randomInRange(0, canvasWidth),      //x
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

//falling triangles random directions
let triangleCometWaveRandomDirections = function(){
  let boxColor = randomColorHex();
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
                        boxColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}
//falling triangles random directions
let triangleCometWaveSameDirections = function(){
  let boxColor = randomColorHex();
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
                        boxColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}
//falling triangles random directions
let triangleCometWaveSameDirectionsSmall = function(){
  let boxColor = randomColorHex();
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
                        boxColor,                               //color
                          .6));                                  //hit radius sca;e               
  }
}

//rows of squares with an offset y
let higherRightSlantWave = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}
//rows of squares with an offset y
let higherLeftSlantWave = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//rows of squares with an offset y
let higherRightSlantWaveMoveX = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}
//rows of squares with an offset y
let inverseHigherRightSlantWaveMoveX = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
  let sides =  Math.round(randomInRange(3, 10));
  let radiusScaling = sidesToHitRadiusScale(sides);
  //rows increase with level maxing out in range 4 - 8
  let rows = Math.round(randomInRange(clamp(1 + level, 2, 4), clamp(3 + level, 4, 8)));
  //speed inc with level but just a little
  let speedX = randomInRange(1, 5) * 1;
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

//rows of squares with an offset y
let higherLeftSlantWaveMoveX = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}

let inverseHigherLeftSlantWaveMoveX = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                          boxColor,               //color
                            radiusScaling));                   //hit radius scaling
    }
  }
}
//polgons in a line
let lineWave = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                            boxColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line
let lineWaveMoveX = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                            boxColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//polgons in a line
let lineWaveMoveY = function() {
  //random color per wave 
  let boxColor =  randomColorHex(); //`#FF0000`
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
                            boxColor,               //color
                              radiusScaling));                   //hit radius scaling
      }
    }
  }
}

//rows of squares missing on square per row
let squareLineWave = function() {
  //random per wave
  let boxColor = randomColorHex();
  let spinningSpeed = randomSignInRange(.10, .12)
  for(let h = 0; h < randomInRange(3, 6); h++){
    let noBox = Math.floor(randomInRange(1, 9)); //each row skips one box
    for(let i = 0; i < 10; i++){
      if(i != noBox){
        enemies.push(new PolygonWrap( (i * 90),  //x inc per box
            (spawn1X) + (h * spawnHalfX),       //y same for each box row
              0,                                //speedX falls straight down
                4,                              //speedY
                  50,                           //size
                    180,                        //radians
                      spinningSpeed,            //spinSpeed
                        4,                      //sides
                          4,                    //lineWidth
                            boxColor));         //color random per wave
      }
    }
  }
}
