///<reference path='Rectangle.ts' />

module eVOCus {

    // Rectangle that can rotate with the x and y in the center.
    export class RotatableRectangle {

        constructor(public position: Vector2D, public width: number, public height: number, public angle: number) {
        }

        hitsBorder() {
            
            var _cornerLV: Vector2D = this.calcCorner(this.width / 2, this.height / -2);
            var _cornerRV: Vector2D = this.calcCorner(this.width / 2, this.height / 2);

            if (Math.max(_cornerLV.x, _cornerRV.x) >= 2000 && (this.angle > 270 || this.angle < 90))
                return true;
            if (Math.min(_cornerLV.x, _cornerRV.x) <= 0 && (this.angle > 90 && this.angle < 270))
                return true;
            if (Math.max(_cornerLV.y, _cornerRV.y) >= 2000 && (this.angle < 180))
                return true;
            if (Math.min(_cornerLV.y, _cornerRV.y) <= 0 && (this.angle > 180))
                return true;
            return false;
        }

        calcCorner(dX: number, dY: number) {
            return new Vector2D(
                this.position.x + dX * Math.cos(this.angle / 180 * Math.PI) - dY * Math.sin(this.angle / 180 * Math.PI),
                this.position.y + dX * Math.sin(this.angle / 180 * Math.PI) + dY * Math.cos(this.angle / 180 * Math.PI)
                );
        }

    }
} 