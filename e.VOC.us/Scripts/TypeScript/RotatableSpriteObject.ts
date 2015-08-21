///<reference path='GameObject.ts' />

module eVOCus {
    export class RotatableSpriteObject {

        constructor(public rectangle:RotatableRectangle, public image: HTMLImageElement) {
        }

        draw(canvas: Canvas, gameTime: number) {
            canvas.drawRotatableImage(this.image, this.rectangle);
        }

    }
} 