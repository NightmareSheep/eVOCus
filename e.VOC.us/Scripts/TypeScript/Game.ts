module eVOCus {
    export class Game {
        fps: number = 1;
        gameTime: number = 0;
        timeStep: number;

        constructor() {
            this.timeStep = Math.floor(1000 / this.fps);
            setInterval(() => { this.gameLoop(this); }, this.timeStep);
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        }

        update(gameTime: number) {
            console.log("update!!");
        }

        draw(gameTime: number) {
        }
    }
} 