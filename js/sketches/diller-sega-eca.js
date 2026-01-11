let w;
let ruleset;
let toDraw;
let drawCount;

let palettes = [
  ["#03071e", "#9d0208", "#d00000", "#dc2f02", "#e85d04", "#f48c06", "#f48c06", "#ffba08"],
  ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6",
   "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"],
  ["#2f4f4f", "#84e3c8", "#a8e6cf", "#dcedc1", "#ffd3b6", "#ffaaa5", "#ff8b94", "#ff7480"],
  ["#008080", "#f55c7a", "#f56c77", "#f57c73", "#f68c70", "#f69c6d", "#f6ac69", "#f6bc66"],
  ["#073b4c", "#ef476f", "#f78c6b", "#ffd166", "#06d6a0", "#118ab2"],
  ["#023047", "#219ebc", "#8ecae6", "#fc9d33", "#fb8500", "#ffb703"],
  ["#0b3319", "#15751e", "#39a325", "#79e230", "#c0ff35", "#ee6352"],
  ["#002147", "#1a67a5", "#73d6ee", "#b8ffc6", "#2dc48d", "#1b7b3d"],
  ["#1b1b1b", "#008040", "#6bb359", "#ffcc00", "#ff8c19", "#ff400d"],
  ["#290016", "#730437", "#950646", "#b60854", "#d80a63", "#f90c71"],
  ["#111111", "#76030f", "#65071e", "#550b2c", "#440f3b", "#33134a", "#231758", "#121b67"],
  ["#010b13", "#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
  ["#231942", "#5e548e", "#9f86c0", "#7f5dac", "#22bfac", "#1b998b"],
  ["#151414", "#01295f", "#437f97", "#849324", "#b1c530", "#ffb30f", "#a20207", "#fd151b"],
  ["#20163b", "#ba3f1d", "#2d82b7", "#4fe3bc", "#eca72c", "#e7737b"],
  ["#242124", "#4c7680", "#38a3a5", "#7dba60", "#c2d11b", "#ffc800", "#f6992d", "#ed6a5a", "#a75a5a"]
];
let palette;

function setup() {
  pixelDensity(1);
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');
  
  noStroke();
  reset();
}

function reset() {
  let p = random(palettes);
  palette = p.slice(1);
  background(p[0]);
  
  w = floor(random(20, 31));
  getRule();
  
  toDraw = [];
  drawCount = 0;
  generate();
  frameRate(20);
  loop();
}

function getRule() {
  let rules = [
    "00010010", "00010110", "00011010", "00011010", "00100101", "00101001", "00101101", "00110110",
    "00111001", "00111100", "00111110", "01001001", "01001011", "01010110", "01011001", "01011100",
    "01011110", "01100011", "01100101", "01100110", "01101001", "01101010", "01101011", "01101101",
    "01101110", "01110110", "01111010", "01111110", "10010010", "10010110", "10011110", "10110110"
  ];
  let r = random(rules);
  ruleset = r.split("");
  console.log("rule " + parseInt(r, 2));
}

function checkRule(a, b, c) {
  let s = "" + a + b + c;
  let i = parseInt(s, 2);
  return ruleset[7 - i];
}

function generate() {  
  let nCells = floor(width / w);
  let gen0 = new Array(nCells);
  if (random() < 0.5) {
    // "single 1" initial state
    for (let i = 0; i < nCells; i++) {
      gen0[i] = 0;
    }
    gen0[floor(gen0.length/2)] = 1;
  } else {
    // random initial state
    for (let i = 0; i < gen0.length; i++) {
      gen0[i] = round(random());
    }
  }
  let history = [];
  history.push(gen0);
  
  let nGens = floor(height / w); // # of generations that can fit onscreen
  let gen = 1;
  let prevgen = history[0];
  while (gen < nGens) {
    let nextgen = new Array(nCells);
    
    // leftmost edge cell
    nextgen[0] = checkRule(prevgen[prevgen.length-1], prevgen[0], prevgen[1]);
    // rightmost edge cell
    nextgen[nextgen.length-1] = checkRule(prevgen[prevgen.length-2], prevgen[prevgen.length-1], prevgen[0]);
    
    for (let i = 1; i < prevgen.length - 1; i++) {
      nextgen[i] = checkRule(prevgen[i-1], prevgen[i], prevgen[i+1]);
    }
    history.push(nextgen);
    prevgen = nextgen;
    gen++;
  }
  
  let xOff = (width - (nCells * w)) / 2;
  let yOff = (height - (nGens * w)) / 2;

  for (let g = 0; g < history.length; g++) {
    for (let c = 0; c < history[g].length; c++) {
      if (history[g][c] == 1) {
        toDraw.push([(c * w) + xOff, (g * w) + yOff]);
      }
    }
  }
}

function draw() {
  let cell = toDraw[drawCount];
  fill(random(palette));
  square(cell[0], cell[1], w);
  drawCount++;
  
  if (drawCount >= toDraw.length) {
    noLoop();
    setTimeout(reset, 5000);
  }
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    reset();
}