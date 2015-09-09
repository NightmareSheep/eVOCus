module eVOCus {
    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard: Keyboard;
        static game:Game;
        canvas:Canvas;
        ship: Ship;
        ship2: Ship;
        gamestate: GameState;
        static game: Game;
        ships: Ship[] = [];
        
        constructor(public hub: GameHubProxy) {
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
            image.src = "../Assets/Boot-3.png";
            this.ship = new Ship(0, 5, new RotatableRectangle(new Vector2D(0,0), 170, 110, 0), image);
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
            this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < this.ships.length; i++) {
                this.ships[i].draw(this.canvas);
            }
        }

        sync(state: any) {
            if (this.ships.length != state.players.length) {
                var image = new Image();
                image.src = "../Assets/PirateShip.png";

                this.ships = [];
                for (var i = 0; i < state.players.length; i++) {
                    this.ships.push(new Ship(0, 5, new RotatableRectangle(new Vector2D(0, 0), 360, 120, 0), image));
                }
            }


            for (var i = 0; i < this.ships.length; i++) {
                this.ships[i].rectangle.position.x = state.players[i].ship.rectangle.position.x;
                this.ships[i].rectangle.position.y = state.players[i].ship.rectangle.position.y;
                this.ships[i].rectangle.angle = state.players[i].ship.rectangle.angle;
            }
        }
    }
} 