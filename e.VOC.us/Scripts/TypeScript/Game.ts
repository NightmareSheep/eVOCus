module eVOCus {
    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard:Keyboard;
        canvas:Canvas;
        ship: Ship;
        ship2: Ship;
        gamestate: GameState;
        
        constructor() {
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas(3000, 1800);
            this.timeStep = Math.floor(1000 / this.fps);

            var image = new Image();
            image.src = "../Assets/PirateShip.png";
            this.ship = new Ship(1001, 0, 5, new RotatableRectangle(new Vector2D(180, 60), 360, 120, 0), image);
            this.ship2 = new Ship(1002, 0, 5, new RotatableRectangle(new Vector2D(180, 600), 360, 120, 0), image);
            // current speed, max speed, vector position, img width/height, angle
            setInterval(() => { this.gameLoop(this); }, this.timeStep);

        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.getGameState();
            this.update(this.gameTime);
            this.draw(this.canvas);
        }

        update(gameTime: number) {
            this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gamestate.update(this.canvas, gameTime);
            Game.keyboard.update();
        }

        getGameState() {
            // Gamestate van server ophalen / ontvangen
            this.gamestate = new GameState([this.ship, this.ship2], []);
        }

        draw(canvas: Canvas) {
            //this.ship.draw(canvas);
            this.gamestate.draw(canvas);
        }
    }
} 