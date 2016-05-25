///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Player {

        public score:number;

        constructor(public id:string, public playerName: string) {
        }

        update(gameTime: number) {
        }

        draw(canvas: Canvas) {
            /*
            if (this.ship != null) {
                this.ship.draw(canvas);
                canvas.drawRotatableText(this.PlayerName, this.ship.rectangle);
            }
            */
        }
    }
}
