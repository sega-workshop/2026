let w, h
function setup() {
    container = document.getElementById('canvas-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent('canvas-container');
    angleMode(DEGREES)
    colorMode(HSB, 360, 100, 100, 250);

    w = container.clientWidth
    h = container.clientHeight
}

function draw() {
    background(0, 0, 0)
    let steps,cellh,cellw,off,colorful
    steps=random([[8,2],[4,3],[8,3],[12,3],[16,3],[4,4],[8,4],[12,4],[16,4],[8,5],[12,5],[16,5],[24,7]])
    cellw = w / steps[0]
    cellh = h / steps[1]
    off = random(0.03,0.1)
    colorful = random(0.01,0.1)
    for (j = 0; j < steps[1]; j++) {
        y = j*cellh
        for (i = 0; i < steps[0]; i+=4) {
            x=i*cellw
            flipcolor(colorful);drawAnS(x, y, cellw, cellh, off)
            x += cellw
            flipcolor(colorful);drawAnE(x, y, cellw, cellh, off)
            x += cellw
            flipcolor(colorful);drawAnG(x, y, cellw, cellh, off)
            x += cellw
            flipcolor(colorful);drawAnA(x, y, cellw, cellh, off)
        }
    } noLoop()
}

function flipcolor(colorful){
    if(random()<colorful){
        fill(300,100,100)
        stroke(300,100,100)
    }else{
        fill(300,0,100)
        stroke(300,0,100)
    }

}

function drawAnS(x, y, cellw, cellh, off) {
    var cw, cellh, res, splitw, splith, off
    cw = (1 - off) * cellw
    ch = (1 - off) * cellh
    x += off * cellw
    y += off * cellh
    res = 5
    splitw = cw / res
    splith = ch / res
    rect(x, y, cw, splith)
    y += splith
    rect(x, y, splitw, splith)
    y += splith
    rect(x, y, cw, splith)
    y += splith
    rect(x + cw - splitw, y, splitw, splith)
    y += splith
    rect(x, y, cw, splith)
}

function drawAnE(x, y, cellw, cellh, off) {
    var cw, cellh, res, splitw, splith, off
    cw = (1 - off) * cellw
    ch = (1 - off) * cellh
    x += off * cellw
    y += off * cellh
    res = 5
    splitw = cw / res
    splith = ch / res
    rect(x, y, cw, splith)
    y += splith
    rect(x, y, splitw, splith)
    y += splith
    rect(x, y, cw, splith)
    y += splith
    rect(x, y, splitw, splith)
    y += splith
    rect(x, y, cw, splith)
}


function drawAnG(x, y, cellw, cellh, off) {
    var cw, cellh, res, splitw, splith, off
    cw = (1 - off) * cellw
    ch = (1 - off) * cellh
    x += off * cellw
    y += off * cellh
    res = 5
    splitw = cw / res
    splith = ch / res
    rect(x, y, cw, splith)
    y += splith
    rect(x, y, splitw, 3 * splith)
    y += splith
    rect(x + 2 * splitw, y, 3 * splitw, splith)
    y += splith
    rect(x + 4 * splitw, y, splitw, splith)
    y += splith
    rect(x, y, cw, splith)
}


function drawAnA(x, y, cellw, cellh, off) {
    var cw, cellh, res, splitw, splith, off
    cw = (1 - off) * cellw
    ch = (1 - off) * cellh
    x += off * cellw
    y += off * cellh
    res = 5
    splitw = cw / res
    splith = ch / res
    rect(x, y, cw, splith)
    y += splith
    rect(x, y, splitw, splith * 4)
    rect(x + cw - splitw, y, splitw, splith * 4)
    y += splith
    rect(x, y, cw, splith)
}

function windowResized() {
    resizeCanvas(container.clientWidth, container.clientHeight);
    background(0);
    image(main_gfx, 0, 0, width, height)
}
