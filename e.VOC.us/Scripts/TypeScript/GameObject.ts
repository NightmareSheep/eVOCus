module eVOCus {
    export class GameObject {
        constructor(public name: string, public position: Point, public id: string) {
            this.setPosition(position);
        }

        getPosition(): Point {
            return this.position;
        }

        setPosition(p: Point) {
            this.position.x = p.x;
            this.position.y = p.y;
        }

        update(gameTime: number) {

        }

        draw(context: CanvasRenderingContext2D, gameTime: number) {
        }

    }
} 