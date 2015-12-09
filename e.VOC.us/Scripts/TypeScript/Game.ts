module eVOCus {

    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard: Keyboard;
        static instance:Game;
        canvas:Canvas;
        canonballs: SpriteObject[] = [];
        id: string;
        players: Player[] = [];
        oneTimeAnimations: AnimationWithRectangle[] = [];
        scoreboard: Scoreboard;
        environment: Environment;

        
        constructor(public hub: GameHubProxy) {
            Game.instance = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas();
            this.timeStep = Math.floor(1000 / this.fps);
            this.scoreboard = new Scoreboard();
            this.environment = new Environment();
            setInterval(() => { this.gameLoop(this); }, this.timeStep);
            
        }

        inputName() {
            Game.instance.hub.server.nameInput(prompt("What is your name"));
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
            for (var i = this.oneTimeAnimations.length - 1; i >= 0; i--) {
                if (this.oneTimeAnimations[i].ended)
                    this.oneTimeAnimations.splice(i, 1);
                else
                    this.oneTimeAnimations[i].Update(gameTime);
            }
            Game.keyboard.update();
            this.scoreboard.update();
            this.environment.update();
        }

        draw(canvas: Canvas) {

            var player: Player = this.getCurrentPlayer();
            if (player)
                player.focus(canvas);

            this.canvas.ctx.fillStyle = "#FF0000";
            this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.canvas.ctx.lineWidth = 10;
            this.canvas.ctx.strokeRect(0,0,5000,5000);

            for (var i = 0; i < this.oneTimeAnimations.length; i++) {
                this.oneTimeAnimations[i].Draw(canvas, this.gameTime);
            }


            for (var i = 0; i < this.players.length; i++) {
                this.players[i].draw(this.canvas);
            }

            

            for (var i = 0; i < this.canonballs.length; i++) {
                this.canonballs[i].draw(canvas.ctx, this.gameTime);
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
                    this.players.push(new Player(state.players[i].id, new Ship(4747, 0, 5, new RotatableRectangle(new Vector2D(0, 0), 180, 110, 0), image), state.players[i].name));
                }
            }
            
            for (var i = 0; i < state.explosions.length; i++) {
                var explosionImage = new Image();
                explosionImage.src = "../Assets/explosion.png";
                this.oneTimeAnimations.push(new AnimationWithRectangle(new RotatableRectangle(new Vector2D(state.explosions[i].x, state.explosions[i].y), 80, 80, 0), explosionImage, 80, 80 * 3, 3, 300, false));
            }
            

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].ship.rectangle.position.x = state.players[i].ship.rectangle.position.x;
                this.players[i].ship.rectangle.position.y = state.players[i].ship.rectangle.position.y;
                this.players[i].ship.rectangle.angle = state.players[i].ship.rectangle.angle;
                this.players[i].PlayerName = state.players[i].name;
                this.players[i].score = state.players[i].score;
                this.players[i].ship._boatState = state.players[i].ship.boatState;
                this.players[i].ship._cannons[0].rectangle.position = new Vector2D(state.players[i].ship.cannons[0].rectangle.position.x, state.players[i].ship.cannons[0].rectangle.position.y);
            }

            var image = new Image();
            image.src = "../Assets/canonball2.png";
            this.canonballs = [];
            for (var j = 0; j < state.canonballs.length; j++)
                this.canonballs.push(new SpriteObject(new Vector2D(state.canonballs[j].position.x, state.canonballs[j].position.y), image));
        }
    }
} 