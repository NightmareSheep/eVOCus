///<reference path='GameObject.ts' />

module eVOCus {
    export class Canvas {
        ctx:CanvasRenderingContext2D;
        width: number;
        height:number;


        constructor() {
            var canvas = <HTMLCanvasElement> document.getElementById("canvas");
            canvas.width = 1000;
            canvas.height = 1000;
            this.width = 1000;
            this.height = 1000;
            this.ctx = canvas.getContext("2d");
        }

        drawRotatableImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle): void {
            this.ctx.translate(rotatableRectangle.position.x + rotatableRectangle.width, rotatableRectangle.position.y + rotatableRectangle.height);
            this.ctx.rotate(rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.drawImage(image, -rotatableRectangle.width / 2, -rotatableRectangle.height / 2);
            this.ctx.rotate(-rotatableRectangle.angle * (Math.PI / 180));
            this.ctx.translate(-rotatableRectangle.position.x + -rotatableRectangle.width, -rotatableRectangle.position.y + -rotatableRectangle.height);
        }
    }
}
