module eVOCus {
    export class GameObject {
        constructor(public name: string, public position: Vector2D, public id: string) {
            this.setPosition(position);
        }

        getPosition(): Vector2D {
            return this.position;
        }

        setPosition(p: Vector2D) {
            this.position.x = p.x;
            this.position.y = p.y;
        }

        update(gameTime: number) {

        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
        }

    }
} 