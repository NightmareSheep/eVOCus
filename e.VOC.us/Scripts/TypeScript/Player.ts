///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Player {

        //private _playerName: string = 'Hielke';

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

        focus(canvas: Canvas) {
            if (this.ship)
                canvas.ctx.translate((-this.ship.rectangle.position.x + canvas.width / 2), (-this.ship.rectangle.position.y + canvas.height / 2));
        }
    }
}
