///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Player {
        constructor(public id:string, public ship: Ship) {
        }

        update(gameTime: number) {
            if (this.ship != null)
                this.ship.update(gameTime);
        }

        draw(canvas: Canvas) {
            if (this.ship != null)
                this.ship.draw(canvas);
        }

        focus(canvas: Canvas) {
            if (this.ship)
                canvas.ctx.translate((-this.ship.rectangle.position.x + canvas.width / 2), (-this.ship.rectangle.position.y + canvas.height / 2));
        }
    }
}
