///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class CannonBall extends RotatableSpriteObject implements IServerObject {


        constructor(public id: string, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
        }



        update(gameTime: number) {
        }

        draw(canvas: Canvas) {
            super.draw(canvas, 0);
        }

        synchronize(serverObj: any, serverTime: number, lastSyncTime: number) {

            var newPostion = Helper
                .linearInterpolatePosition(this.rectangle.position,
                    lastSyncTime,
                    serverObj.position,
                    serverTime,
                    Game.instance.gameTime);

            this.rectangle.position = newPostion;
            this.rectangle.angle = 0;
        }
    }
}