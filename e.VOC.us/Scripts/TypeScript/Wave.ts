///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Wave {
        //private _waveDuration: number;
        public _rectangle: RotatableSpriteObject;
        private reduce: number = 0.1;

        constructor(public position: Vector2D, public angle: number) {
            //this._waveDuration = 100;
            var waveImage = new Image();
            waveImage.src = "/Assets/ship-waves.png";
            this._rectangle = new RotatableSpriteObject(new RotatableRectangle(position, 80, 80, angle), waveImage);
        }

        update(gameTime: number) {
            //console.log("in wave update");
            this._rectangle.rectangle.width -= this.reduce;
            this._rectangle.rectangle.height -= this.reduce;
            //this._rectangle.rectangle.position.x += this.reduce / 2;
            //this._rectangle.rectangle.position.y += this.reduce / 2;
        }

        draw(canvas: Canvas, gameTime: number) {
            this._rectangle.draw(canvas, gameTime);
        }
    }
}