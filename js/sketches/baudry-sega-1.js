let cx, cy, count, xstep, ystep, glass, grow
function setup() {
    container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('canvas-container');
    angleMode(DEGREES)
    colorMode(HSB, 360, 100, 100, 250);

    cx = container.clientWidth * 0.5
    cy = container.clientHeight * 0.5
    count = 0
    glass = 250
    grow = true
    xstep = container.clientWidth * 0.001
    ystep = container.clientHeight * 0.001
}

function draw() {
    background(0, 0, 0)
    fill(0, 0, 100)
    let x1, y1, x2, y2, x3, y3, x4, y4
    x1 = cx + xstep
    y1 = cy - ystep
    x2 = cx + xstep
    y2 = cy + ystep
    x3 = cx - xstep
    y3 = cy + ystep
    x4 = cx - xstep
    y4 = cy - ystep
    if (xstep <= container.clientWidth * 0.5 && grow) {
        quad(x1, y1, x2, y2, x3, y3, x4, y4)
        xstep += container.clientWidth * 0.0005
        ystep += container.clientHeight * 0.0005
        console.log("xstep: "+xstep)
    }
    else {
        grow=false
        if (count < 1242) {
            if (random() < 0.42) {
                quad(x1, y1, x2, y2, x3, y3, x4, y4)
            }
        }
        else {
            if (glass > 0) {
                fill(0, 0, 100, glass)
                quad(x1, y1, x2, y2, x3, y3, x4, y4)
                glass-=0.2
            }
            else{
                fill(0,0,100)
                quad(x1, y1, x2, y2, x3, y3, x4, y4)
                xstep -= container.clientWidth * 0.0005
                ystep -= container.clientHeight * 0.0005
                if(xstep < container.clientWidth * 0.0005 && !grow){
                    grow=true
                    count=0
                    glass=250
                }
            }
        }
    }
    count++
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    background(0);
    image(main_gfx, 0, 0, width, height)
}
