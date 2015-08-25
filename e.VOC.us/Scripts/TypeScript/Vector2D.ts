module eVOCus {
    export class Vector2D {
        constructor(public x: number, public y: number) { }

        add(vector: Vector2D): Vector2D {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }

        multiply(i: number): Vector2D {
            this.x *= i;
            this.y *= i;
            return this;
        }
    }
} 