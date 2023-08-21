// from coding train

let bubbles = [];
let invasion = [
  "😀",
  "😁 ",
  "😂 ",
  "🤣 ",
  "😃 ",
  "😄 ",
  "😅 ",
  "😆 ",
  "😗 ",
  "🥰 ",
  "😘 ",
  "😍 ",
  "😎 ",
  "😋 ",
  "😊 ",
  "😉 ",
  "😙 ",
  "😚 ",
  "☺ ",
  "🙂 ",
  "🤗 ",
  "🤩 ",
  "🤔 ",
  "🤨 ",
  "😮 ",
  "😥 ",
  "😣 ",
  "😏 ",
  "🙄 ",
  "😶 ",
  "😑 ",
  "😐 ",
  "🤐 ",
  "😯 ",
  "😪 ",
  "😫 ",
  "🥱 ",
  "😴 ",
  "😌 ",
  "😛 ",
  "🙃 ",
  "😕 ",
  "😔 ",
  "😓 ",
  "😒 ",
  "🤤 ",
  "😝 ",
  "😜 ",
  "🤑 ",
  "😲 ",
  "☹ ",
  "🙁 ",
  "😖 ",
  "😞 ",
  "😟 ",
  "😤 ",
  "😬 ",
  "🤯 ",
  "😩 ",
  "😨 ",
  "😧 ",
  "😦 ",
  "😭 ",
  "😢 ",
  "😰 ",
  "😱 ",
  "🥵 ",
  "🥶 ",
  "😳 ",
  "🤪 ",
  "😵 ",
  "🥴 ",
  "🤮 ",
  "🤢 ",
  "🤕 ",
  "🤒 ",
  "😷 ",
  "🤬 ",
  "😡 ",
  "😠 ",
  "🤧 ",
  "😇 ",
  "🥳 ",
  "🥺 ",
  "🤠 ",
  "🤡 ",
  "🤥 ",
  "🤫 ",
  "💀 ",
  "👺 ",
  "👹 ",
  "👿 ",
  "😈 ",
  "🤓 ",
  "🧐 ",
  "🤭 ",
];

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    //choose, for this bubble, one of the above emoji at random
    this.rand = round(random(0, invasion.length - 1));
    // The larger the second number, the less bubbles will have an emoji at all. when 10 is chosen, 1/10th of all bubbles have them.
    this.coinFlip = round(random(0, 10));
  }

  //the increased size of the y element causes it to move downward slowly
  move() {
    this.x = this.x + random(-5, 5.3);
    this.y = this.y + random(-5, 5.3);
    
    // lerp smoothes the the movement, the last number is the percent to move the first number toward the second each moment
    // this.x = lerp(this.x, this.x + random(-5, 5.3), .6);
    // this.y = lerp(this.y, this.y + random(-5, 5.3), .6);
    

    // if the bubble is at about the center of the image, it starts to grow
    if (this.x > width * 0.4 && this.y > height * 0.4) {
      this.r = this.r + 0.2;
    }
    // if the bubble gets to the bottom right corner of the canvas, it grows faster
    if (this.x > width * 0.8 && this.y > height * 0.8) {
      this.r = this.r + 1;
    }

    //if the bubble reaches a certain size, it grows even FASTER
    if (this.r > 70) {
      this.r = this.r + 0.5;
    }
  }
  show() {
    noStroke();
    colorMode(RGB);
    fill(255, 255, 255, 230);
    ellipse(this.x, this.y, this.r * 2);
    colorMode(HSL);

    // Print the emoji onto some of the bubbles based on a random element
    textAlign(CENTER);
    textSize(12);
    fill(0, 10);
    if (this.coinFlip == 1) {
      //     text(whiteTweets[this.rando], this.x, this.y, this.r, this.r );
      text(invasion[this.rand], this.x, this.y);
    }
  }
  // A function that when called moves the bubble away from the mouse. If the mouse pointer is less than its x or y, it moves a positive amount and if more, it does the reverse. The amount is how much it is moved by
  avoidMouse(mx, my, amount) {
    let d = dist(mx, my, this.x, this.y);

    if (d < this.r) {
      if (mx < this.x) {
        this.x = this.x + amount;
      } else {
        this.x = this.x - amount;
      }

      if (my < this.y) {
        this.y = this.y + amount;
      } else {
        this.y = this.y - amount;
      }
    }
  }
}
