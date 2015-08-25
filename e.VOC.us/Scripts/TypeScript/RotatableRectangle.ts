///<reference path='Rectangle.ts' />

module eVOCus {

    // Rectangle that can rotate with the x and y in the center.
    export class RotatableRectangle {
        constructor(public position:Vector2D, public width: number, public height: number, public angle : number) {
        }

        hitsBorder() {
            if (this.position.x + this.width/2 >= 1000 && (this.angle > 270 || this.angle < 90))
                return true;
            if (this.position.x - this.width / 2 <= 0 && (this.angle > 90 && this.angle < 270))
                return true;
            if (this.position.y + this.width / 2 >= 1000 && (this.angle < 180))
                return true;
            if (this.position.y - this.width / 2 <= 0 && (this.angle > 180))
                return true;
            return false;
        }

    }
} 