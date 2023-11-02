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
        return this.x - w/2 > point.location.x ||
            this.x + w/2 > point.location.x ||
            this.y - y/2 < point.location.y ||
            this.y + y/2 > point.location.y;
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

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return;
        }

        if (!this.divided) {
            this.subdivide();
            this.divided = true;
        }

        this.northEast.insert(point);
        this.southEast.insert(point);
        this.southWest.insert(point);
        this.northWest.insert(point);
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