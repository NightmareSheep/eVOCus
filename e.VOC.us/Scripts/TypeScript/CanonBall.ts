///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class CanonBall extends RotatableSpriteObject {
        private _speed: number;
        
        constructor(public id: number, speed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this.setSpeed(speed);
        }

        update(canvas: Canvas, gameTime: number) {
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
