

module eVOCus {
    export class Animation {
        private currentTime: number = 0;
        private previousTime: number = 0;
        private currentAnimationTime: number = 0;
        private currentFrame: number = 0;
        private frameWidth: number;
        private frameHeight: number;
        public ended = false;

        constructor(public image: HTMLImageElement, public width: number, public height: number, public frames: number, public duration: number, public loop = true) {
            this.frameWidth = width;
            this.frameHeight = height / frames;
        }

        Update(gameTime: number) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            const elapsedTime = this.previousTime === 0 ? 0 : this.currentTime - this.previousTime;
            if (this.loop)
                this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            else
                this.currentAnimationTime = Math.min(this.currentAnimationTime + elapsedTime, this.duration);
            if (!this.loop && this.currentAnimationTime == this.duration)
                this.ended = true;
            this.currentFrame = Math.min(this.frames - 1, Math.floor(this.frames * (this.currentAnimationTime / this.duration)));
        }

        Draw(canvas: Canvas, gameTime: number, rectangle: RotatableRectangle) {
            canvas.drawRotatableClippedImage(this.image, rectangle, 0, this.frameHeight * this.currentFrame, this.frameWidth, this.frameHeight);
        }

        Reset() {
            this.currentAnimationTime = 0;
        }

    }
}
