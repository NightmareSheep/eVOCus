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
    }
}
