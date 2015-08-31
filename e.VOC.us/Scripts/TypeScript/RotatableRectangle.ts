///<reference path='Rectangle.ts' />

module eVOCus {

    // Rectangle that can rotate with the x and y in the center.
    export class RotatableRectangle {

        private _cornerLV: Vector2D;
        private _cornerRV: Vector2D;
        private _cornerLA: Vector2D;
        private _cornerRA: Vector2D;

        constructor(public position: Vector2D, public width: number, public height: number, public angle: number) {
        }

        hitsBorder(canvas: Canvas) {
            this.calcCorners();
            
            if (Math.max(this._cornerLV.x, this._cornerRV.x) >= canvas.width && (this.angle > 270 || this.angle < 90)) 
                return true;
            if (Math.min(this._cornerLV.x, this._cornerRV.x) <= 0 && (this.angle > 90 && this.angle < 270)) 
                return true;
            if (Math.max(this._cornerLV.y, this._cornerRV.y) >= canvas.height && (this.angle < 180)) 
                return true;
            if (Math.min(this._cornerLV.y, this._cornerRV.y) <= 0 && (this.angle > 180))
                return true;
            return false;
        }

        hitsShip(num: number, canvas: Canvas) {
            this.calcCorners();
            var ships: Array<Ship> = Game.game.gamestate.ships;

            for (var i = 0; i < ships.length; i++) {
                canvas.ctx.translate(-ships[i].rectangle.position.x, -ships[i].rectangle.position.y);
                canvas.ctx.rotate(-ships[i].rectangle.angle * (Math.PI / 180));

                if (num != ships[i].id) {
                    if (this.cornerHitsShip(this._cornerLV, ships[i].rectangle) || this.cornerHitsShip(this._cornerRV, ships[i].rectangle)) {
                        canvas.ctx.rotate(ships[i].rectangle.angle * (Math.PI / 180));
                        canvas.ctx.translate(ships[i].rectangle.position.x, ships[i].rectangle.position.y);  
                        return ships[i].id;
                    }
                }
                canvas.ctx.rotate(ships[i].rectangle.angle * (Math.PI / 180));
                canvas.ctx.translate(ships[i].rectangle.position.x, ships[i].rectangle.position.y);         
            }
            return 0;    
        }


        calcCorners() {
            this._cornerLV = this.calcCorner(this.width / 2, this.height / -2);
            this._cornerRV = this.calcCorner(this.width / 2, this.height / 2);
            this._cornerLA = this.calcCorner(this.width / -2, this.height / -2);
            this._cornerRA = this.calcCorner(this.width / -2, this.height / 2);
        }

        calcCorner(dX: number, dY: number) {
            return new Vector2D(
                this.position.x + dX * Math.cos(this.angle / 180 * Math.PI) - dY * Math.sin(this.angle / 180 * Math.PI),
                this.position.y + dX * Math.sin(this.angle / 180 * Math.PI) + dY * Math.cos(this.angle / 180 * Math.PI)
                );
        }

        cornerHitsShip(corner: Vector2D, rectangle: RotatableRectangle) {
            return (
                corner.x > (rectangle.position.x - rectangle.width / 2) &&
                corner.x < (rectangle.position.x + rectangle.width / 2) &&
                corner.y > (rectangle.position.y - rectangle.height / 2) &&
                corner.y < (rectangle.position.y + rectangle.height / 2)
                );
        }


    }
} 