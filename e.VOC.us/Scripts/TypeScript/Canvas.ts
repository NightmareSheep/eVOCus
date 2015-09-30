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

        drawRotatableClippedImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle, clipX:number, clipY:number, clipWidth:number, clipHeight:number, name: string): void {
            this.ctx.translate(rotatableRectangle.position.x, rotatableRectangle.position.y);
            this.ctx.rotate(rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.drawImage(image, clipX, clipY, clipWidth, clipHeight, -rotatableRectangle.width/2, -rotatableRectangle.height /2, rotatableRectangle.width, rotatableRectangle.height);
            this.ctx.rotate(-rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.font = "20px Georgia";
            this.ctx.fillText(name, clipX, clipHeight);
            this.ctx.translate(-rotatableRectangle.position.x, -rotatableRectangle.position.y);
        }
    }
}
