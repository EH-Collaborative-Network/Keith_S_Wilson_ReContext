// This turns a string into binary
function convertToBinary(x) {
    result = "";
    for (var i = 0; i < x.length; i++) {
      result += x[i].charCodeAt(0).toString(2) + " ";
    }
    //  print("Binary: " + result);
    return result;
  }