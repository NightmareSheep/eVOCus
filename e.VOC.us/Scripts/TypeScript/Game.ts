module eVOCus {
    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard: Keyboard;
        static game:Game;
        canvas:Canvas;
        ship: Ship;
        ships: Ship[] = [];
        
        constructor(public hub: GameHubProxy) {
            Game.game = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas();
            this.timeStep = Math.floor(1000 / this.fps);

            var image = new Image();
            image.src = "../Assets/PirateShip.png";
            this.ship = new Ship(0, 5, new RotatableRectangle(new Vector2D(0,0), 360, 120, 0), image);
            setInterval(() => { this.gameLoop(this); }, this.timeStep);
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.canvas);
        }

        update(gameTime: number) {
            this.ship.update(gameTime);
            Game.keyboard.update();
        }

        draw(canvas: Canvas) {
            //this.ship.draw(canvas);
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