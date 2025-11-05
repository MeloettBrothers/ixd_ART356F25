let data;
let characters;
let puyopuyoID = 0;

function preload() {
  data = loadJSON("characters.json");
}

function setup() {
  createCanvas(1000, 500);

  // console.log(data.data[0].gender);
  console.log(data.data.length);
}

function draw() {
  background(0);

  let name = data.data[puyopuyoID].name;
  let nameJP = data.data[puyopuyoID].nameJP;
  let unicode = data.data[puyopuyoID].unicode;
  let latin = data.data[puyopuyoID].latin;
  let gender = data.data[puyopuyoID].gender;
  let alias = data.data[puyopuyoID].alias;
  let description = data.data[puyopuyoID].description;
  let firstAppear = data.data[puyopuyoID].firstAppear;
  let lastAppear = data.data[puyopuyoID].lastAppear;

  // for (let i = 0; i < data.data.length; i++) {
  // console.log(description.length);
  // }

  fill(255);
  text(name, 50, 50);
  text(nameJP, 50, 70);
  text(unicode, 50, 80);
  text(latin, 50, 90);
  text(gender, 50, 110);
  text(alias, 50, 130);
  text(description, 50, 150);
  text(firstAppear, 50, 200);
  text(lastAppear, 50, 250);
}

function keyPressed() {
  if (keyIsDown(32)) {
    puyopuyoID++;
  }
}
