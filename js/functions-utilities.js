/*~~~~~~~~~~~~~~~~~~~~~~~~~~FUNCTIONS FOR VARIOUS USEFUL TASKS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
//limit value x to range between min and max
function clamp(x, min, max){
  if (x < min) { x = min; }
      else if (x > max) { x = max; } 
      else { x = x; }
  return x;
}

//degrees to radians
function degreesToRadians(angle){
  return (angle / Math.PI) * 180;
}

//called by log button
function logFunction(){
  console.log(enemies)
  canvas.onmousemove = e => {
    console.log(`x position: ${e.offsetX} y position: ${e.offsetY}`);
  }
}

//make random color hex
function randomColorHex(){
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

//convert color hex to rgb with a predefined alpha(optional)
function hexToRGBA(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
      a = alpha || 1.;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//convert color hex to rgb 
function hexToRGB(hex) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b})`;
}

//convert color hex to rgb values rturned as an array
//used mainly to convert enemy colors from hexes to a format
//that debris can use to modify the alpha of
function hexToRGBArray(hex) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
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

