let data;
let puyopuyoID = 0;
let imgs = [];
let view = "detail"; // "detail" | "grid"
const GRID = { cols: 4, thumb: 140, pad: 22, top: 70, left: 40 };

function preload() {
  data = loadJSON("characters.json");
  imgs = data.data.map(d => {
    const FALLBACK = "assests/placeholder.png";
    return loadImage(path, () => {}, () => {}); 
  });
}

function setup() {
  createCanvas(800, 3500);
  textFont("monospace");
  textSize(14);
}

function draw() {
  background(0);
  if (view === "detail") {
    drawDetail();
  } else {
    drawGrid();
  }

  // instructions footer
  noStroke(); fill(200);
  const hint = view === "detail"
    ? "Press SPACE to browse • Press V for Grid View"
    : "Click a character to open • Press V for Detail View";
  text(hint, 40, height - 20);
}


function drawDetail() {
  const c = data.data[puyopuyoID];

  const left = 40;
  let y = 50;
  const lh = 20;

  fill(255); noStroke();
  textStyle(BOLD);
  text(safe(c.name), left, y); y += lh;
  textStyle(NORMAL);
  text(safe(c.nameJP), left, y); y += lh;
  text("Unicode: " + safe(c.unicode), left, y); y += lh;
  text("Latin: " + safe(c.latin), left, y); y += lh;
  text("Gender: " + safe(c.gender), left, y); y += lh;
  text("Alias: " + safe(c.alias), left, y); y += lh + 10;

  drawWrapped("Description: " + safe(c.description), left, y, 560, 18);
  y += 120;
  text("First Appearance: " + safe(c.firstAppear), left, y); y += lh;
  text("Last Appearance: " + safe(c.lastAppear), left, y);

  // image
  const img = imgs[puyopuyoID];
  if (img) {
    const w = 320, h = 320;
    const x = width - w - 40;
    const iy = height - h - 40;
    image(img, x, iy, w, h);
    noFill(); stroke(70); rect(x, iy, w, h);
  }
}

function drawGrid() {
  fill(255); noStroke();
  textStyle(BOLD);
  text("Puyo Puyo Characters", GRID.left, 35);
  textStyle(NORMAL);

  for (let i = 0; i < data.data.length; i++) {
    const r = tileRect(i);
    const over = mouseX >= r.x && mouseX <= r.x + r.w &&
                 mouseY >= r.y && mouseY <= r.y + r.h;

    // tile bg
    stroke(over ? 200 : 90);
    fill(over ? 30 : 18);
    rect(r.x, r.y, r.w, r.h, 10);

    // thumbnail
    const img = imgs[i];
    if (img) {
      image(img, r.x + 10, r.y + 10, r.w - 20, r.w - 20);
    } else {
      // fallback rectangle
      noStroke(); fill(50); rect(r.x + 10, r.y + 10, r.w - 20, r.w - 20, 8);
    }

    // name
    noStroke(); fill(230);
    textAlign(CENTER);
    text(truncate(safe(data.data[i].name), 18), r.x + r.w / 2, r.y + r.w + 26);
    textAlign(LEFT);
  }
}

function tileRect(i) {
  const w = GRID.thumb;
  const h = GRID.thumb + 40;
  const col = i % GRID.cols;
  const row = floor(i / GRID.cols);
  const x = GRID.left + col * (w + GRID.pad);
  const y = GRID.top + row * (h + GRID.pad);
  return { x, y, w, h };
}


function keyPressed() {
  if (key === "V" || key === "v") {
    view = (view === "detail") ? "grid" : "detail";
  } else if (key === " " && view === "detail") {
    puyopuyoID = (puyopuyoID + 1) % data.data.length;
  }
}

function mousePressed() {
  if (view !== "grid") return;
  for (let i = 0; i < data.data.length; i++) {
    const r = tileRect(i);
    if (mouseX >= r.x && mouseX <= r.x + r.w &&
        mouseY >= r.y && mouseY <= r.y + r.h) {
      puyopuyoID = i;
      view = "detail";
      break;
    }
  }
}

function safe(v) {
  if (v == null) return "";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") {
    if ("text" in v) return String(v.text);
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
}

function drawWrapped(str, x, y, maxW, lineH) {
  fill(255);
  const words = String(str).split(" ");
  let line = "", yy = y;
  for (let w of words) {
    const test = line + w + " ";
    if (textWidth(test) > maxW) {
      text(line, x, yy);
      line = w + " ";
      yy += lineH;
    } else line = test;
  }
  text(line, x, yy);
}

function truncate(s, n) {
  s = String(s);
  return (s.length > n) ? s.slice(0, n - 1) + "…" : s;
}
