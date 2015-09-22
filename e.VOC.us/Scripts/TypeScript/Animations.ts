

module eVOCus {
    export class Animations {
        private currentTime: number = 0;
        private previousTime: number = 0;
        private currentAnimationTime: number = 0;
        private currentFrame: number = 0;
        private frameWidth: number;
        private frameHeight: number;

        constructor(public image: HTMLImageElement, public width: number, public height: number, public frames: number, public duration: number, public loop = false) {
            this.frameWidth = width;
            this.frameHeight = height / frames;
        }

        Update(gameTime: number) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.currentTime - this.previousTime;
            this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            this.currentFrame = Math.floor(this.frames * (this.currentAnimationTime / this.duration));
        }

        Draw(canvas: Canvas, gameTime: number, rectangle: RotatableRectangle) {
            canvas.drawRotatableClippedImage(this.image, rectangle, 0, this.frameHeight * this.currentFrame, this.frameWidth, this.frameHeight);
        }

        Reset() {
            this.currentAnimationTime = 0;
        }

    }
}
