let sonic, tails, sanic, shadow;  // character images
let bg1, bg2, bg3;                // background images

let animal;        // 1..4 -> which character is showing
let shuffle = true;
let score = 0;     // (kept for your future use)
let bgArray = [];

function preload() {
  // Characters
  sonic = loadImage("SonicLOGO1.png");
  shadow = loadImage("SonicLOGO2.png");
  sanic  = loadImage("SonicLOGO3.png");
  tails  = loadImage("SonicLOGO4.png");

  // Backgrounds
  bg1 = loadImage("bg1.png");
  bg2 = loadImage("bg2.png");
  bg3 = loadImage("bg3.png");

  bgArray = [bg1, bg2, bg3];
}

function setup() {
  createCanvas(500, 600);
  pickRandomAnimal();      // start with a random choice
  bg = random(bgArray);
}

function draw() {
  // show a background (random while shuffling; fixed when stopped)
  // const bg = shuffle ? random([bg1, bg2, bg3]) : currentBg;
  // if (shuffle) currentBg = bg; // remember the last bg when we stop
  image(bg, 0, 0, width, height);

  // keep shuffling character until user presses Stop
  if (shuffle && frameCount % 60 === 0) pickRandomAnimal();

  // draw the chosen character
  if (animal === 1) image(sonic, 50, 50, 400, 400);
  else if (animal === 2) image(tails, 50, 50, 400, 400);
  else if (animal === 3) image(sanic, 50, 50, 400, 400);
  else if (animal === 4) image(shadow, 50, 50, 400, 400);

  drawUI();
}

function mouseClicked() {
  // Stop button: freeze the current character/background
  if (mouseX >= 50 && mouseX <= 200 && mouseY >= 450 && mouseY <= 530) {
    shuffle = false;
  }
  // Reset button: start shuffling again and reset score
  if (mouseX >= 380 && mouseX <= 480 && mouseY >= 10 && mouseY <= 60) {
    score = 0;
    shuffle = true;
  }
}

// helpers
let currentBg = null;

function pickRandomAnimal() {
  // picks 1,2,3,4
  animal = int(random(1, 5));
}

function drawUI() {
  // buttons
  noStroke();
  fill(110, 65, 184);
  rect(50, 450, 150, 80, 12);  // Stop
  rect(380, 10, 100, 50, 12);  // Reset

  // labels
  fill(230, 219, 247);
  textFont("Time to Random some");
  textSize(40);
  text("Stop", 90, 505);
  textSize(20);
  text("Shuffle", 405, 42);

  // instructions (UX signifiers)
  fill(0);
  textSize(14);
  text("Click Stop to freeze the randomizer. Click Reset to shuffle again.", 50, 585);
}
