//pass to the wave machine as a 'null' function so it doesn't freak out
let dummyWave = function(){
  return;
}

let circleWave = function(){
  //for testing
  for(let i = 0; i < 50; i++){
    let rad = 15 + (Math.random() * 50);
    enemies[i] = new CircleObstacle(randomInRange(0, canvasWidth),      //x
      randomInRange(spawn1X, spawn2X),                              //y
        randomSignInRange(1, 5),                                        //speedX
          randomInRange(1, 5),                                          //speedY
            rad,                                                        //radius
              `white`);                                                 //color
  }  
}
let polygonWaveRandom = function(){
  //for testing
  for(let i = 0; i < 50; i++){
    enemies.push(new PolygonTemplate());    
  }
}

let triangleCometWaveBig = function(){
  let boxColor = randomColorHex();
  for(let i = 0; i < randomInRange(30, 60); i++){
    enemies.push(new Square( randomInRange(0, canvasWidth), //x
        (i * 200) * -1 + spawn3X, //y
          0, //speedX
            randomInRange(7, 9), //speedY
            randomInRange(25, 70), //size
                180, //radians
                  .01, //spinSpeed
                    3, //sides
                      2, //lineWidth
                        boxColor));    //color
  }
}


let squareLineSlantWave = function() {
  let boxColor = randomColorHex();
  let spinningSpeed = randomSignInRange(.10, .12)
  for(let h = 0; h < randomInRange(3, 6); h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new Square( (i * 90), //x
          (i * 40 + spawn1X) + (h * spawnHalfX), //y
            0, //speedX
              4, //speedY
              50, //size
                  180, //radians
                    spinningSpeed, //spinSpeed
                      4, //sides
                        4, //lineWidth
                          boxColor));    //color
    }
  }
}

let squareLineWave = function() {
  let boxColor = randomColorHex();
  let spinningSpeed = randomSignInRange(.10, .12)
  for(let h = 0; h < randomInRange(3, 6); h++){
    for(let i = 0; i < 10; i++){
      enemies.push(new Square( (i * 90), //x
          (i * 40 + spawn1X) + (h * spawnHalfX), //y
            0, //speedX
              4, //speedY
              50, //size
                  180, //radians
                    spinningSpeed, //spinSpeed
                      4, //sides
                        4, //lineWidth
                          boxColor));    //color
    }
  }
}
