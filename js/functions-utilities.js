/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS FOR VARIOUS USEFUL TASKS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//called by log button
function logFunction(){
  console.log(backgroundZ3.length)
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