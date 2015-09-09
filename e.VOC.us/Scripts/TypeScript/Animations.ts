﻿

module eVOCus {
    export class Animations {
        private currentTime: number = 0;
        private previousTime: number = 0;
        private currentAnimationTime: number = 0;
        private currentFrame: number = 0;
        private frameWidth: number;
        private frameHeight: number;

        constructor(public image: HTMLImageElement, public width: number, public height: number, public frames: number, public duration: number, public loop = false) {
            //this.frameWidth = width / frames;
            //this.frameHeight = height;
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

        Draw(ctx: CanvasRenderingContext2D, gameTime: number, rectangle: RotatableRectangle) {
            //ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, rectangle.position.x, rectangle.position.y, rectangle.width, rectangle.height);
            ctx.drawImage(this.image, 0, this.frameHeight * this.currentFrame, this.frameWidth, this.frameHeight, -rectangle.width / 2, -rectangle.height / 2, rectangle.width, rectangle.height);
        }

        Reset() {
            this.currentAnimationTime = 0;
        }

    }
}
