module eVOCus {
    export class Explosion {
        private _animation: Animations;
        public _lifespan: number;

        constructor(public rectangle: RotatableRectangle, public game: Game) {
            this._lifespan = 0;
            var image = new Image();
            image.src = "../Assets/explosion.png";
            this._animation = new Animations(image, rectangle.width, rectangle.height * 3, 3, 3000, false);
        }

        update(gameTime: number) {
            if (this._lifespan > 3000) {
                this.game.explosions.splice(this.game.explosions.indexOf(this));
            }
            else {
                this._animation.Update(gameTime);
                this._lifespan += 30;
            }
        }

        draw(canvas: Canvas) {
            this._animation.Draw(canvas, 0, this.rectangle);
        }
    }
}