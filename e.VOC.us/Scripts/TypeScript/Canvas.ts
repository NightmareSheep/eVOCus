///<reference path='GameObject.ts' />

module eVOCus {
    export class Canvas {
        ctx:CanvasRenderingContext2D;



        constructor(public width: number, public height: number) {
            var canvas = <HTMLCanvasElement> document.getElementById("canvas");
            canvas.width = width;
            canvas.height = height;
            this.width = width;
            this.height = height;
            this.ctx = canvas.getContext("2d");
        }

        drawRotatableImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle): void {
            this.ctx.translate(rotatableRectangle.position.x, rotatableRectangle.position.y);
            this.ctx.rotate(rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.drawImage(image, -rotatableRectangle.width / 2, -rotatableRectangle.height / 2);
            this.ctx.rotate(-rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.translate(-rotatableRectangle.position.x, -rotatableRectangle.position.y);
        }

        drawRotatableAnimatedImage(animation: Animations, rotatableRectangle: RotatableRectangle, gametime: number): void {
            this.ctx.translate(rotatableRectangle.position.x, rotatableRectangle.position.y);
            this.ctx.rotate(rotatableRectangle.angle * (Math.PI / 180));

            //this.ctx.drawImage(image, -rotatableRectangle.width / 2, -rotatableRectangle.height / 2);
            //ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
            animation.Draw(this.ctx, gametime, rotatableRectangle);

            this.ctx.rotate(-rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.translate(-rotatableRectangle.position.x, -rotatableRectangle.position.y);
        }


    }
}
