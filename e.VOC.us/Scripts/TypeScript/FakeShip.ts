module eVOCus {
    export class FakeShip implements IServerObject {
        rectangle: RotatableRectangle;
        id: string;
        player: Player;
        animation: Animation;

        constructor(serverObj: any) {
            this.id = serverObj.id;
            this.rectangle = serverObj.rectangle;
            this.player = serverObj.player;
            var image = new Image();
            image.src = "/Assets/Boot-3.png";
            this.animation = new Animation(image, this.rectangle.width, this.rectangle.height * 5, 5, 2000, false);
        }

        update(gametime: number) {
            Game.instance.focus = this.rectangle.position;
        }

        synchronize(serverObj: any) {
        }

        draw(canvas: Canvas) {
            this.animation.Draw(canvas, 0, this.rectangle);
        }
    }
} 