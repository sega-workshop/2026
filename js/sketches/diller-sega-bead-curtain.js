let r;

let beads;
let strands;

let palette;

function setup() {
  pixelDensity(1);
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');
  
  reset();
}

function reset() {
  let palettes = [
    [color(255, 0, 110), color(131, 56, 236), color(58, 134, 255), color(0, 245, 212)],
    [color(255, 211, 25), color(255, 144, 31), color(255, 41, 117), color(242, 34, 255), color(140, 30, 255)],
    [color(0, 255, 159), color(0, 184, 255), color(0, 30, 255), color(189, 0, 255), color(214, 0, 255)]
  ];
  palette = random(palettes);
  
  strands = [];
  beads = [];
  r = floor(random(3, 7));
  
  beadCurtain();
}

function beadCurtain() {
  let xPad = r * 5;
  let yPad = r + 2;
  
  let minStrand = random(yPad, yPad * 2);
  let maxStrand = floor(height * 0.1);
  
  let n = floor(width/xPad) - 1;
  let xOff = (width - (n * xPad)) / 2;
  
  for (let i = 1; i < n; i++) {
    let y = 0;
    while (y < height * 0.8) {
      let strandLength = random(minStrand, maxStrand);
      strands.push({x: (i * xPad) + xOff, y1: y, y2: y + strandLength});
      y += strandLength + yPad + r;
      beads.push({x: (i * xPad) + xOff, y: y});
      y += r + yPad;
    }
  }
}

function draw() {
  background(13, 2, 33);
  
  stroke(255, 255, 255, 150);
  for (let i = 0; i < strands.length; i++) {
    line(strands[i].x, strands[i].y1, strands[i].x, strands[i].y2);
  }
  
  for (let i = 0; i < beads.length; i++) {
    let c = random(palette); 
    c.setAlpha(4);
    noStroke();
    fill(c);
    for (let j = 0; j < r*4; j += 0.1) {
      circle(beads[i].x, beads[i].y, j);
    }
    c.setAlpha(255);
    stroke(c);
    fill(c);
    circle(beads[i].x, beads[i].y, r);
  }
  frameRate(0.5);
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    reset();
}