///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Background {

        private _image = new Image();
    

        constructor( ) {
        }

        update(gameTime: number) {
            
        }

        draw(canvas: Canvas) {
            this._image.src = "../Assets/Water.png";
            canvas.ctx.drawImage(this._image, 0, 0);
            for (var i = 0; i < canvas.width; i += 50) {
                for (var j = 0; j < canvas.height; j += 50) {
                    canvas.ctx.drawImage(this._image, i, j);
                }
            }
        }
    }
}
