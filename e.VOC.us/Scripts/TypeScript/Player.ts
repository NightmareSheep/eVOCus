///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Player {

        public score:number;

        constructor(public id:string, public ship: Ship, public PlayerName: string) {
        }

        update(gameTime: number) {
            if (this.ship != null)
                this.ship.update(gameTime);
        }

        draw(canvas: Canvas) {
            if (this.ship != null) {
                this.ship.draw(canvas);
                canvas.drawRotatableText(this.PlayerName, this.ship.rectangle);
            }
        }
    }
}
