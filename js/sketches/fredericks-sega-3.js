let vaporwave = [
    "#ff71ce",
    "#01cdfe",
    "#05ffa1",
    "#b967ff",
    "#fffb96",
    "#0f62fe",
];

let particles;
let line_active = false;

function setup() {
    container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('canvas-container');
    particles = [];

    for (let _ = 0; _ < 100; _++) {
        particles.push({
            x: random(width), y: random(height),
            vx: random(-2, 2), vy: random(-2, 2),
            col: color(random(vaporwave))
        });
    }

    background(0);
}

function draw() {
    noStroke();
    background(`rgba(0,0,0,0.1)`);

    if (frameCount % 50 == 0) line_active = true;
    if (line_active) {
        stroke(`rgba(9, 177, 149, 0.5)`);
        line(0, ly, width, ly);
        ly += 4;

        if (ly >= height) {
            line_active = false;
            ly = 0;
        }
    }

    for (let p of particles) {
        fill(p.col);
        ellipse(p.x, p.y, 5, 5);

        for (let p2 of particles) {
            if (p != p2) {
                let d = dist(p.x, p.y, p2.x, p2.y);
                if (d < width * 0.07) {
                    stroke(`rgba(220,0,220,0.5)`);
                    line(p.x, p.y, p2.x, p2.y);
                }
            }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = constrain(p.x, 0, width);
        p.y = constrain(p.y, 0, height);
    }


}
let ly = 0;

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    update = true;
}