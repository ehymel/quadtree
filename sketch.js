function setup() {
    createCanvas(600, 400);

    // initial boundary should include the entire canvas
    // center of initial boundary is center of canvas
    let boundary = new Rectangle(width/2, height/2, width/2, height/2);
    let qt = new QuadTree(boundary, 4);

    for (let i = 0; i < 1; i++) {
        let p = new Point(random(width), random(height));
        qt.insert(p);
    }
}

function draw() {
    background(100);

}
