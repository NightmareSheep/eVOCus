module eVOCus {
    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard: Keyboard;
        static game:Game;
        canvas:Canvas;
        canonballs: SpriteObject[] = [];
        id: string;
        players:Player[] = [];
        
        constructor(public hub: GameHubProxy) {
            Game.game = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas(1000, 1000);
            this.timeStep = Math.floor(1000 / this.fps);
            setInterval(() => { this.gameLoop(this); }, this.timeStep);
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.canvas);
        }

        update(gameTime: number) {
            this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < this.players.length; i++) {
                this.players[i].update(gameTime);
            }
            Game.keyboard.update();
        }

        draw(canvas: Canvas) {
            var player: Player = this.getCurrentPlayer();
            if (player)
                player.focus(canvas);

            this.canvas.ctx.fillStyle = "#FF0000";
            this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.canvas.ctx.lineWidth = 10;
            this.canvas.ctx.rect(0, 0, 800, 800);
            this.canvas.ctx.strokeRect(0,0,1000,1000);

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].draw(this.canvas);
            }
            for (var j = 0; j < this.canonballs.length; j++) {
                this.canonballs[j].draw(this.canvas.ctx,0);
            }

            // Reset all transformations
            canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        getCurrentPlayer() {
            if (this.id != "" && this.id != null) {
                for (var i = 0; i < this.players.length; i++) {
                    if (this.id == this.players[i].id)
                        return this.players[i];
                }
            }
            return null;
        }

        // TODO: Refactor sync method
        sync(state: InputGameState) {
            if (this.players.length != state.players.length) {
                var image = new Image();
                image.src = "../Assets/Boot-3.png";

                this.players = [];
                for (var i = 0; i < state.players.length; i++) {
                    this.players.push(new Player(state.players[i].id, new Ship(4747, 0, 5, new RotatableRectangle(new Vector2D(0, 0), 180, 110, 0), image)));
                }
            }

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].ship.rectangle.position.x = state.players[i].ship.rectangle.position.x;
                this.players[i].ship.rectangle.position.y = state.players[i].ship.rectangle.position.y;
                this.players[i].ship.rectangle.angle = state.players[i].ship.rectangle.angle;
                this.players[i].ship._boatState = state.players[i].ship.boatState;
            }


            var image = new Image();
            image.src = "../Assets/canonball2.png";
            this.canonballs = [];
            for (var j = 0; j < state.canonballs.length; j++)
                this.canonballs.push(new SpriteObject(new Vector2D(state.canonballs[j].position.x, state.canonballs[j].position.y), image));
        }
    }
} 