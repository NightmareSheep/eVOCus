module eVOCus {
    export class Rectangle {
        constructor(public x: number, public y: number, public width: number, public height: number) { }

        contains(v: Vector2D) {
            if (v.x > this.x &&
                v.x < this.x + this.width &&
                v.y > this.y &&
                v.y < this.y + this.height)
                return true;
            return false;
        }
    }
} 