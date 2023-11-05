let qtree;

function setup() {
    createCanvas(600, 400);

    // initial boundary should include the entire canvas
    // center of initial boundary is center of canvas
    let boundary = new Rectangle(width/2, height/2, width/2, height/2);
    qtree = new QuadTree(boundary, 4);

    for (let i = 0; i < 1500; i++) {
        let p = new Point(random(width), random(height));
        qtree.insert(p);
    }

    background(0);
    qtree.show();

    stroke(255, 0, 0);
    // rectMode(CENTER);
    // let range = new Rectangle(250, 250, 53, 68);
    // rect(range.x, range.y, range.w * 2, range.h * 2);
    let range = new Circle(255, 245, 26);

    let points = qtree.queryRange(range);

    for (let p of points) {
        strokeWeight(2);
        point(p.location.x, p.location.y);
    }

    circle(range.x, range.y, range.r*2);
}
