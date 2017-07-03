///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Circle implements IServerObject {
        position: Vector2D = new Vector2D(0,0);

        constructor(public id: string) {
        }



        update(gameTime: number) {
        }

        draw(canvas: Canvas) {
            canvas.ctx.beginPath();
            canvas.ctx.beginPath();
            canvas.ctx.arc(this.position.x, this.position.y, 90, 0, 2 * Math.PI, false);
            canvas.ctx.fillStyle = 'green';
            canvas.ctx.fill();
            canvas.ctx.lineWidth = 5;
            canvas.ctx.strokeStyle = '#003300';
            canvas.ctx.stroke();

        }

        synchronize(serverObj: any, serverTime: number, lastSyncTime: number) {

            var newPostion = Helper
                .linearInterpolatePosition(this.position,
                    lastSyncTime,
                    serverObj.position,
                    serverTime,
                    Game.instance.gameTime);

            this.position = newPostion;
        }

        dispose() {}
    }
}