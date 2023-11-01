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

        if (!this.divided) {
            this.subdivide();
            this.divided = true;
        }
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.northEast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.northWest = new QuadTree(nw, this.capacity);
        let sw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.southWest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.southEast = new QuadTree(se, this.capacity);
    }
}