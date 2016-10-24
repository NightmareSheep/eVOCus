module eVOCus {
    export class Map {
        constructor(public width: number, public height: number) {
        }

        draw(canvas: Canvas) {
            canvas.ctx.lineWidth = 10;
            canvas.ctx.strokeRect(0, 0, this.width, this.height);
        }

    }
} 