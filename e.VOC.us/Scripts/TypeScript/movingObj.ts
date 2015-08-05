///<reference path='SpriteObject.ts' />



module eVOCus {
    export class movingObj extends SpriteObject {

        constructor(name: string, position: Point, id: string, public image: HTMLImageElement, public speed: number, public direction: number) {
            super(name, position, id, image);
            this.setSpeed(speed);
            this.setDirection(direction);
        }

        getSpeed(): Number {
            return this.speed;
        }

        setSpeed(s: number) {
            this.speed = s;
        }

        getDirection(): Number {
            return this.direction;
        }

        setDirection(d: number) {
            this.direction = d;
        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
            context.drawImage(this.image, this.position.x, this.position.y);
        }

    }


} 