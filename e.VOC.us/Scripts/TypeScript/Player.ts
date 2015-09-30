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
            if (this.ship != null)
                this.ship.draw(canvas, this.PlayerName);
        }
    }
}
