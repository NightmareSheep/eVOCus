///<reference path='GameObject.ts' />

module eVOCus {
    export class SpriteObject {

        constructor(public position: Vector2D, public image: HTMLImageElement) {
        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
            context.drawImage(this.image, this.position.x - this.image.width/2, this.position.y - this.image.height/2);
        }
    }


} 