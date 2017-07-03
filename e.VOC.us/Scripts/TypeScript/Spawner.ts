module eVOCus {
    export class Spawner implements  IServerObject {
        rectangle: RotatableRectangle;
        playerId : string;
        shipType: string;
        id: string;
        animation: Animation;

        constructor(serverObj: any) {
            this.id = serverObj.id;
            this.rectangle = serverObj.rectangle;
            this.playerId = serverObj.playerId;
            this.shipType = serverObj.shipType;
            var image = new Image();
            image.src = "/Assets/Boot-3.png";
            this.animation = new Animation(image, this.rectangle.width, this.rectangle.height * 5, 5, 2000, false);
        }

        update(gametime: number) {
            this.animation.Update(gametime);
            Game.instance.focus = this.rectangle.position;
        }

        synchronize(serverObj: any) {
            this.rectangle = serverObj.rectangle;
            this.playerId = serverObj.playerId;
            this.shipType = serverObj.shipType;
        }

        draw(canvas: Canvas) {
            this.animation.Draw(canvas, 0, this.rectangle);
        }

        dispose() {}
    }
} 