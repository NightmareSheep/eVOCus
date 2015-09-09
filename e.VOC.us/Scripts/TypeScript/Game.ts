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
        static game: Game;

        constructor() {
            Game.game = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas(2000, 1600);
            this.timeStep = Math.floor(1000 / this.fps);

            var image = new Image();
            var aImage = new Image();
            image.src = "../Assets/Boot-3.png";
            aImage.src = "../Assets/Boot-1.png";
            this.ship = new Ship(4001, 0, 5, new RotatableRectangle(new Vector2D(180, 60), 170, 110, 0), image);
            this.ship2 = new Ship(8007, 0, 5, new RotatableRectangle(new Vector2D(180, 600), 170, 110, 0), aImage);
            // current speed, max speed, (vector position, img width/height, angle), image

            this.getGameState();

            setInterval(() => { this.gameLoop(this); }, this.timeStep);
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            //this.getGameState();
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
            //this.gamestate = new GameState([this.ship, this.ship2], []);
            this.gamestate = new GameState([], []);
            this.gamestate.addShip(this.ship);
            this.gamestate.addShip(this.ship2);

        }

        draw(canvas: Canvas) {
            //this.ship.draw(canvas);
            this.gamestate.draw(canvas);
        }
    }
} 