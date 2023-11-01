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
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return;
        }

        this.subdivide();
    }

    subdivide() {
        let ne = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2);
        this.northEast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2);
        this.northWest = new QuadTree(nw, this.capacity);
        let sw = new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2);
        this.southWest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2);
        this.southEast = new QuadTree(se, this.capacity);
    }
}