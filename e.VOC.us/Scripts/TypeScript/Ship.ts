///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        private _maxSpeed: number;
        private _animation: Animation;
        private _animation_death: Animation
        _boatState: string;

        constructor(public id: number, public speed: number, public maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this._animation = new Animation(image, rectangle.width, rectangle.height * 5, 5, 2000, false);
            var image2 = new Image();
            image2.src = "../Assets/boot-3-dead.png";
            this._animation_death = new Animation(image2, rectangle.width, rectangle.height * 5, 5, 2000, false);
        }

        update(gameTime: number) {
            this._animation.Update(gameTime);
            this._animation_death.Update(gameTime);
        }

        draw(canvas: Canvas) {
            if (this._boatState == "dying" || this._boatState == "spawning")
                this._animation_death.Draw(canvas, 0, this.rectangle);
            else
                this._animation.Draw(canvas,0,this.rectangle);
        }
    }
}
