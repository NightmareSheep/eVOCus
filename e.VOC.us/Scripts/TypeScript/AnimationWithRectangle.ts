
///<reference path='Animation.ts' />

module eVOCus {
    export class AnimationWithRectangle extends Animation {
        constructor(private rectangle: RotatableRectangle, public image: HTMLImageElement, public width: number, public height: number, public frames: number, public duration: number, public loop = true) {
            super(image, width, height, frames, duration, loop);
        }

        Draw(canvas: Canvas, gameTime: number) {
            super.Draw(canvas, gameTime, this.rectangle);
        }
    }
}
