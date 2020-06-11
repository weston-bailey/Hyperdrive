/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS FOR VARIOUS USEFUL TASKS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//clamp value to range
function clamp(x, min, max){
  if (x < min) { x = min; }
      else if (x > max) { x = max; } 
      else { x = x; }
  return x;
}

//called by log button
function logFunction(){
  console.log(ship.sheildLevel > 0)
  console.log(ship.sheildLevel)
  console.log(ship.sheild)
  canvas.onmousemove = e => {
    console.log(`x position: ${e.offsetX} y position: ${e.offsetY}`);
  }
}

//make random color hex
function randomColorHex(){
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

//convert color hex to rgb with a predefined alpha(optional)
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
      a = alpha || 1.;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//makes a randoom number between a range that is either positive or negetive with probability (float 0 - 1) influencing the sign chance
function randomSignInRange(minimum, maximum, probability){
  let prob = probability || .5;
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
