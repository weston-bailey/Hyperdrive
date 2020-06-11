//pass to the wave machine as a 'null' function so it doesn't freak out
let dummyWave = function(){
  return;
}

let circleWave = function(){
  //for testing
  for(let i = 0; i < 50; i++){
    let rad = 15 + (Math.random() * 50);
    enemies[i] = new CircleObstacle(randomInRange(spawn2X, canvasWidth),      //x
      randomInRange(spawn1X, spawn2X),                              //y
        randomSignInRange(1, 5),                                        //speedX
          randomInRange(1, 5),                                          //speedY
            rad,                                                        //radius
              `white`);                                                 //color
  }  
}