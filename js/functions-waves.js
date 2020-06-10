function circleWave(){
  //for testing
  for(let i = 0; i < 50; i++){
    let rad = 15 + (Math.random() * 50);
    enemies[i] = new CircleObstacle(randomInRange(0, canvasWidth),      //x
      randomInRange(0, canvasHeight * -1),                              //y
        randomSignInRange(1, 5),                                        //speedX
          randomInRange(1, 5),                                          //speedY
            rad,                                                        //radius
              `white`);                                                 //color
  }  
}