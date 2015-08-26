///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class CanonBall extends RotatableSpriteObject {
        private _speed: number;
        
        constructor(speed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this.setSpeed(speed);
        }

        update(canvas: Canvas, gameTime: number) {
            // Buiten canvas verdwijnen
            if (this.rectangle.hitsBorder(canvas))
                //Delete object

            // positie aanpassen
            this.rectangle.position.add(Helper.angleToUnitVector(this.rectangle.angle).multiply(this.getSpeed()));
        }

        draw(canvas:Canvas) {
            super.draw(canvas, 0);
        }

        getSpeed(): number {
            return this._speed;
        }

        setSpeed(value: number) {
            this._speed = value;
        }

        
    }
}
