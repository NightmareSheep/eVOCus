module eVOCus {
    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard:Keyboard;
        canvas:Canvas;
        ship:Ship;
        
        constructor() {
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas();
            this.timeStep = Math.floor(1000 / this.fps);

            var image = new Image();
            image.src = "../Assets/PirateShip.png";
            this.ship = new Ship(0, 5, new RotatableRectangle(new Vector2D(0, 0), 360, 120, 0), image);
            // current speed, max speed, vector position, img width/height, angle
            setInterval(() => { this.gameLoop(this); }, this.timeStep);

        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.canvas);
        }

        update(gameTime: number) {
            this.canvas.ctx.clearRect(0, 0, 1000, 1000);
            this.ship.update(gameTime);
            Game.keyboard.update();
        }

        draw(canvas: Canvas) {
            this.ship.draw(canvas);
        }
    }
} 