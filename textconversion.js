// This takes a string of binary and replaces all 1s with one thing and all 0s with something else.
function convertToWord(str, word1, word2) {
    //how far right to start the text
    // var x = 10;
  
    let newString = [];
  
    for (let i = 0; i < str.length; i++) {
      //Replace 0 with something
      if (str.charAt(i) == "0") {
        let c = word1;
        newString.push(c + " ");
        //This was to determine where on the page to lay it out. may still be useful later
        //   text(c, x, 300);
        // x = x + textWidth(c);
        //Replace 1 with something
      } else if (str.charAt(i) == "1") {
        let c = word2;
        newString.push(c + " ");
        //      text(c, x, 300);
        //   x = x + textWidth(c);
      } else {
        let c = str.charAt(i);
        newString.push("// ");
        //     text(c, x, 300);
        //     x = x + textWidth(c);
      }
    }
  
    //Turns an array of strings to one string, and combines them with whatever you put in it (I chose no spaces at all)
    newString = newString.join("");
  
    // This loop makes sure that the string is long enough to fill the window by repeating it (700 is about how many chars fill the window)
    while (newString.length < 14000) {
      newString = newString + newString;
    }
  
    return newString;
  }
  