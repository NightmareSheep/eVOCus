///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        private _maxSpeed: number;
        private _animation: Animations;

        constructor(public id: number, public speed: number, public maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this._animation = new Animations(image, rectangle.width, rectangle.height*5, 5, 2000, false);
        }

        update(gameTime: number) {
            this._animation.Update(gameTime);
        }

        draw(canvas:Canvas, name: string) {
            this._animation.Draw(canvas,0,this.rectangle, name);
        }
    }
}
