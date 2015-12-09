///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        private _maxSpeed: number;
        private _animation: Animation;
        private _animation_death: Animation
        private _rippleTime: number = 100;
        private _currentRippleTime: number = 100;
        public _boatState: string;
        public _cannons: RotatableSpriteObject[];

        constructor(public id: number, public speed: number, public maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this._animation = new Animation(image, rectangle.width, rectangle.height * 5, 5, 2000, false);
            var image2 = new Image();
            image2.src = "../Assets/boot-3-dead.png";
            this._animation_death = new Animation(image2, rectangle.width, rectangle.height * 5, 5, 2000, false);

            var image = new Image();
            image.src = "../Assets/canonball2.png";
            this._cannons = [new RotatableSpriteObject(new RotatableRectangle(new Vector2D(0,0), 30, 30, 0), image)];
        }

        update(gameTime: number) {
            

            this._currentRippleTime -= Game.instance.timeStep;
            if (this._currentRippleTime < 0) {
                this._currentRippleTime = this._rippleTime;
                var explosionImage = new Image();
                explosionImage.src = "../Assets/ship-waves.png";
                Game.instance.oneTimeAnimations.push(new AnimationWithRectangle(new RotatableRectangle(new Vector2D(this.rectangle.position.x, this.rectangle.position.y), 80, 80, this.rectangle.angle), explosionImage, 80, 80 * 10, 10, 5000, false));
            }
            this._animation.Update(gameTime);
            this._animation_death.Update(gameTime);
        }

        draw(canvas: Canvas) {
            if (this._boatState == "dying" || this._boatState == "spawning")
                this._animation_death.Draw(canvas, 0, this.rectangle);
            else
                this._animation.Draw(canvas, 0, this.rectangle);

            for (var i = 0; i < this._cannons.length; i++) {
                this._cannons[i].draw(canvas, 0);
            }
        }
    }
}