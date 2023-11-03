class Point {
    constructor(x, y) {
        this.location = createVector(x, y);
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.location.x >= this.x - this.w &&
            point.location.x < this.x + this.w &&
            point.location.y <= this.y + this.h &&
            point.location.y > this.y - this.h;
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return;
        }

        if (this.divided) {
            this.insertIntoDivisions(point);
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return;
        }

        this.subdivide();

        // re-distribute points of this container to its subdivisions
        let pts = this.points;
        this.points = [];
        for (let p of pts) {
            this.insertIntoDivisions(p);
        }

        this.insertIntoDivisions(point);
    }

    insertIntoDivisions(point) {
        this.northWest.insert(point);
        this.northEast.insert(point);
        this.southEast.insert(point);
        this.southWest.insert(point);
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northWest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northEast = new QuadTree(ne, this.capacity);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southEast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southWest = new QuadTree(sw, this.capacity);

        this.divided = true;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

        if (this.divided) {
            this.northWest.show();
            this.northEast.show();
            this.southEast.show()
            this.southWest.show()
        }

        for (let p of this.points) {
            strokeWeight(4);
            point(p.location.x, p.location.y);
        }
    }
}