///<reference path='GameObject.ts' />

module eVOCus {
    export class SpriteObject extends GameObject {

        constructor(name: string, position: Vector2D, id: string, public image: HTMLImageElement) {
            super(name, position, id);
        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
            context.drawImage(this.image, this.position.x, this.position.y);
        }

        overlaps(object: SpriteObject) {
            
            return (this.position.y + this.image.height > object.position.y && this.position.y < object.position.y + object.image.height &&
                this.position.x + this.image.width > object.position.x && this.position.x < object.position.x + object.image.width);
            
        }

    }


} 