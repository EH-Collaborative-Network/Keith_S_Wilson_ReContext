let maxSizeOfText;
let maxWidthOfText;
let r;
let g;
let b;
let rDelta;
let gDelta;
let bDelta;
let timeToFreeze;

function customWrap(str, startingX, startingY, boxLength, boxHeight) {
  //how far right to start the text

  let paragraphSpace = 1.5;
  let x = startingX; // X keeps track of where on the line to print a word
  let lineNum = 1; // lineNum keeps track of what line to print text to
  let newString = splitTokens(str, " "); // Splits the string into an array at the space mark
  maxSizeOfText = round(boxHeight / (textAscent() * paragraphSpace)); // calculates how many lines of text will overflow
  maxWidthOfText = round(boxHeight / textWidth("x")); // calculates how many characters of text will overflow box
  let totalChar = maxSizeOfText * maxWidthOfText;
  //Use this to see where the text box is being printed
  // rect(startingX, startingY, bFoxLength, boxHeight);

  //Every time the function is run, it resets the colors that have been changed by the last run.
  r = 182;
  g = 40;
  b = 35;

  timeToFreeze = totalChar * (100 / (totalChar * 0.001)) - 11000;

  // This calculates how much to change each color by in order to change it across the span of all printed charcters
  // One formula is used for numbers that grow (255-x/maxSize*maxWidth) and another for numbers that shrink (x/maxSize*maxWidth)
  // For some reason this is always off by a factor of 3, so I just adjusted it. no idea why the math is so wrong.
  rDelta = (r / totalChar) * 3;
  gDelta = ((255 - g) / totalChar) * 3;
  bDelta = (b / totalChar) * 3;

  for (let i = 0; i < newString.length && lineNum; i++) {
    //textAscent is height, in pixels, of tallest letter

    // If the size of the text box is bigger than the current word (i)
    if (boxLength - (x - startingX + textWidth(newString[i])) > 0) {
      //No idea why, but i need to create temporary things to pass to the wrapper or it doesn't load correctly
      let tempstring1 = newString[i] + " ";
      let tempy = startingY + textAscent() * lineNum * paragraphSpace;
      let newx = x;
      // set so that text is put out slowly. change i portion to change timer
      setTimeout(function () {
        delayedWord(tempstring1, newx, tempy);
        //This is set up to slow down the bigger the text is
      }, i * (100 / (totalChar * 0.001))); //Have to change time below as well

      x = x + textWidth(newString[i]) + textWidth(" ");
    } else {
      // If it's too long a word AND we're at the max line, end the for loop
      if (lineNum > maxSizeOfText - 1) {
        return;
      } else {
        // If there's more lines left, move the word to the next line and write it there
        lineNum++;
        x = startingX;
        let newx2 = x;
        let tempstring2 = newString[i] + " ";
        let tempy2 = startingY + textAscent() * lineNum * paragraphSpace;
        setTimeout(function () {
          delayedWord(tempstring2, newx2, tempy2);
        }, i * (100 / (totalChar * 0.001))); //Have to change time above as well
        x = x + textWidth(newString[i]) + textWidth(" ");
      }
    }
  }
}

//delays the text output so you can watch it print to the screen
//1. text to be printed 2. x location of text  3. y location of text 4. color modifier
function delayedWord(xx, y, z) {
  let maxCharactersPossible = maxSizeOfText * maxWidthOfText;

  // Adjusts the global colors each time that you run it.
  r = r - rDelta;
  b = b - bDelta;
  g = g + gDelta;

  //This makes some pretty cool stuff
  // r = random(40, 255);
  // b = random(40, 255);
  // g = random(40, 255);

  // I have adjusted the final output because 255 green is TOO green


  
  fill(r, g / 2, b);
  
  //Delete the following if I want the slashes to come back
    if (xx.includes('//')){
    fill(0,0,0);
  }

  
  text(xx, y, z);

}
