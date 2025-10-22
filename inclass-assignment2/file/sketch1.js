let data;
let url =  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc-6j7dtfa0meR3bGpieH7dHPFwkwvYXPcS9212XfbiorZMxvtrWvHgU8D_eXgRDJZ4aArGVmREnAe/pub?output=csv";

function preload() {
  data = loadTable(url, "csv", "header");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (data) {
    let numRows = data.getRowCount();
    let carbs = data.getColumn("Carbs");
    let names = data.getColumn("Food");

    for (let i = 0; i < numRows; i++) {
      let x = 50;
      let y = 100 + i * 50;
      let w = carbs[i];
      let h = 10;

      rect(x, y, w, h);

      textAlign(LEFT);
      fill(255);
      textSize(14);
      text(names[i], x, y - 5);

      textAlign(CENTER);
      text("Carbs of Food Items V2", width / 2, 50);
    }
  }
}

