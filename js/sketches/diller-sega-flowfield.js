let style;
let ns;
let octaves;
let falloff;

let nDone = 0;
let particles = [];

let palettes = [
  ["#010b13", "#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
  ["#16003d", "#7a0045", "#ff0054", "#ff5400", "#ffbd00"],
  ["#122d40", "#38a3a5", "#57cc99", "#80ed99", "#a3f5ab"],
  ["#1b1b1b", "#f2636a", "#dc4b4f", "#c63333", "#e94900", "#ef6803",
   "#f58606", "#c1b225", "#72a85f", "#229e99", "#36a7a2"],
  ["#001233", "#023e7d", "#0466c8", "#70e000", "#9ef01a"],
  ["#001219", "#005f73", "#0a9396", "#ee9b00", "#bb3e03", "#ae2012", "#9b2226"],
  ["#100904", "#780218", "#903813", "#00524c", "#043862", "#580e3d"],
  ["#1b1110", "#0cb2af", "#a1c65d", "#fac723", "#f29222", "#e95e50", "#936fac"],
  ["#131615", "#026c7c", "#b24c63", "#25bb7a", "#ee6d71"],
  ["#0c050f", "#0b7189", "#9f2042", "#244f26", "#6ba168"],
  ["#111716", "#931f1d", "#1c8784", "#f3a712", "#fffbbd"],
  ["#201a23", "#631d76", "#176087", "#1d84b5", "#16b6b3"],
  ["#151828", "#379ea9", "#2bcab7", "#ff8600", "#ff570a"],
];

function setup() {
  pixelDensity(1);
  container = document.getElementById('canvas-container');
  let canvas = createCanvas(container.clientWidth, container.clientHeight);
  canvas.parent('canvas-container');
  
  style = random() < 0.5 ? "flowy" : "edgy";
  ns = Math.floor(random(200, 801));
  noiseDetail(Math.floor(random(2, 9)), random(0.25, 0.75));
  spawnParticles();
}

function reset(){
  particles = [];
  nDone = 0;
  style = random() < 0.5 ? "flowy" : "edgy";
  ns = Math.floor(random(200, 801));
  noiseDetail(Math.floor(random(2, 9)), random(0.25, 0.75));
  loop();
  spawnParticles();
}

function spawnParticles(){
  //let palette = random(palettes);
  let palette = palettes[palettes.length-1];
  background(palette[0]);
  let colours = palette.slice(1);
  let res = random(2, 5);
  
  for (let x = 0; x < width; x += res) {
    let y = random() < 0.5 ? -2 : height + 2;
    particles.push({
      x: x,
      y: y,
      c: random(colours),
      active: true,
      vlength: Math.floor(random(1, 4)),
      sweight: random(1.5, 2.5)
    });
  }
  
  for (let y = 0; y < height; y += res) {
    let x = random() < 0.5 ? -2 : width + 2;
    particles.push({
      x: x,
      y: y,
      c: random(colours),
      active: true,
      vlength: Math.floor(random(1, 4)),
      sweight: random(1.5, 2.5)
    });
  }
}

function draw() {
  if (nDone >= particles.length) {
    noLoop();
    setTimeout(reset, 5000);
  }
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    if (p.active) {
      stroke(p.c);
      strokeWeight(p.sweight);
      point(p.x, p.y);

      let n = noise(p.x / ns, p.y / ns);

      let angle;
      if (style == "flowy") {
        angle = map(n, 0.0, 1.0, 0.0, TWO_PI);
      } else {
        angle = Math.ceil((map(n, 0.0, 1.0, 0.0, TWO_PI * 2.0) * (PI / 4)) / (PI / 4));
      }

      let vec = p5.Vector.fromAngle(angle, p.vlength);
      p.x += vec.x;
      p.y += vec.y;

      if (p.x < -2 || p.x > width + 2 || p.y < -2 || p.y > height + 2) {
        p.active = false;
        nDone++;
      }
    }
  }
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    reset();
}