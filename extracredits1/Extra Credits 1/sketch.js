// Adrian "Data Breach Bubbles" – inspired by InformationIsBeautiful.net
// Created for Extra Credit: Data Visualization (p5.js prototype)

let breaches = [
  {company: "YouTube", records: 1000, year: 2005, type: "Social"},
  {company: "Facebook", records: 540, year: 2019, type: "Social"},
  {company: "X aka Twitter", records: 500, year: 2006, type: "Social"},
  {company: "Equifax", records: 145, year: 2017, type: "Financial"},
  {company: "eBay", records: 145, year: 2014, type: "Personal"},
  {company: "Amazon", records: 165, year: 1197, type: "Personal"}
];

function setup() {
  createCanvas(600, 400);
  noStroke();
  textAlign(CENTER);
  textFont("Arial");
}

function draw() {
  background(20);
  fill(255);
  textSize(18);
  text("Adrian Data Breach Visualizer (Inspired Prototype)", width / 2, 30);

  // Display bubbles
  for (let i = 0; i < breaches.length; i++) {
    let x = map(i, 0, breaches.length - 1, 100, width - 100);
    let y = height / 2 + sin(frameCount * 0.02 + i) * 20;
    let size = map(breaches[i].records, 100, 3000, 30, 100);

    // Color based on data type
    if (breaches[i].type === "Personal") fill(255, 150, 150);
    else if (breaches[i].type === "Social") fill(150, 200, 255);
    else if (breaches[i].type === "Identity") fill(180, 255, 180);
    else if (breaches[i].type === "Financial") fill(255, 220, 120);
    else fill(200);

    ellipse(x, y, size);

    // Hover effect
    if (dist(mouseX, mouseY, x, y) < size / 2) {
      fill(255);
      textSize(14);
      text(
        breaches[i].company + "\n" +
        breaches[i].records + "M records\n" +
        "Year: " + breaches[i].year,
        x, y - size / 2 - 10
      );
      noFill();
      stroke(255);
      ellipse(x, y, size + 10);
      noStroke();
    }
  }
}
