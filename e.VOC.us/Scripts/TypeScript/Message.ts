module eVOCus {
    export class Message implements IServerObject {
        text: string;
        id: string;

        constructor(serverObj: any) {
            this.id = serverObj.id;
            this.text = serverObj.text;
        }

        update(gametime: number) {
        }

        synchronize(serverObj: any) {
            this.text = serverObj.text;
        }

        draw(canvas: Canvas) {
            canvas.drawRotatableText(this.text, new RotatableRectangle(new Vector2D(100, 100), 400, 100, 0));
        }
    }
} 