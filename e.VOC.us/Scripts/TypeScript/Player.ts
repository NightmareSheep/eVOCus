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

        focus(canvas: Canvas) {
            if (this.ship)
                canvas.ctx.translate((-this.ship.rectangle.position.x + canvas.width / 2), (-this.ship.rectangle.position.y + canvas.height / 2));

                //Background water
                $('.water-background').css("background-position-x", (-this.ship.rectangle.position.x + canvas.width / 2)/4);
                $('.water-background').css("background-position-y", (-this.ship.rectangle.position.y + canvas.height / 2) / 4);

                $('.water-middle').css("background-position-x", (-this.ship.rectangle.position.x + canvas.width / 2) / 2);
                $('.water-middle').css("background-position-y", (-this.ship.rectangle.position.y + canvas.height / 2) / 2);

                $('.water-foreground').css("background-position-x", (-this.ship.rectangle.position.x + canvas.width / 2));
                $('.water-foreground').css("background-position-y", (-this.ship.rectangle.position.y + canvas.height / 2));
                
        }
    }
}
