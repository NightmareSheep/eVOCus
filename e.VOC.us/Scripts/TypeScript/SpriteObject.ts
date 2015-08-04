///<reference path='GameObject.ts' />

module eVOCus {
    export class SpriteObject extends GameObject {

        constructor(name: string, position: Point, id: string, public image: HTMLImageElement) {
            super(name, position, id);
        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
            context.drawImage(this.image, this.position.x, this.position.y);
        }

    }


} 