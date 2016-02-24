module eVOCus {

    export class Game {
        fps: number = 60;
        gameTime: number = 0;
        timeStep: number;
        static keyboard: Keyboard
        static instance:Game;
        canvas:Canvas;
        canonballs: SpriteObject[] = [];
        waves: Wave[] = [];
        id: string;
        players: Player[] = [];
        oneTimeAnimations: AnimationWithRectangle[] = [];
        scoreboard: Scoreboard;
        minimap: Minimap;
        environment: Environment;
        focus: Vector2D = new Vector2D(0,0);
        gameObjects: IServerObject[] = [];

        
        constructor(public hub: GameHubProxy) {
            Game.instance = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas();
            this.timeStep = Math.floor(1000 / this.fps);
            this.scoreboard = new Scoreboard();
            this.minimap = new Minimap();
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

            for (var i = this.waves.length - 1; i >= 0; i--) {
                if (this.waves[i]._rectangle.rectangle.width > 15) {
                    this.waves[i].update(gameTime);
                }
                else
                    this.waves.splice(i, 1);
            }

            for (var i = this.gameObjects.length - 1; i >= 0; i--) {
                this.gameObjects[i].update(gameTime);
            }

            Game.keyboard.update();
            this.scoreboard.update();
            this.minimap.update();
            this.environment.update();
        }

        draw(canvas: Canvas) {

            // set focus.
            canvas.ctx.translate((-this.focus.x + canvas.width / 2), (-this.focus.y + canvas.height / 2));

            this.canvas.ctx.fillStyle = "#FF0000";
            this.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.canvas.ctx.lineWidth = 10;
            this.canvas.ctx.strokeRect(0,0,5000,5000);

            for (var i = 0; i < this.oneTimeAnimations.length; i++) {
                this.oneTimeAnimations[i].Draw(canvas, this.gameTime);
            }

            for (var i = 0; i < this.waves.length; i++) {
                this.waves[i].draw(this.canvas, this.gameTime);
            }

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].draw(this.canvas);
            }

            for (var i = this.gameObjects.length - 1; i >= 0; i--) {
                this.gameObjects[i].draw(canvas);
            }

            for (var i = 0; i < this.canonballs.length; i++) {
                this.canonballs[i].draw(canvas.ctx, this.gameTime);
            }
                        
            this.minimap.draw();

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
            for (var i = 0; i < state.gameObjects.length; i++) {
                var serverObject = state.gameObjects[i];
                var clientObjExists = false;
                for (var j = 0; j < this.gameObjects.length; j++) {
                    var clientObject = this.gameObjects[j];
                    if (clientObject.id === serverObject.id) {
                        clientObject.synchronize(serverObject);
                        clientObjExists = true;
                    }
                }
                if (!clientObjExists)
                    Game.instance.gameObjects.push(Initializer.initialize(serverObject));
            }

            for (var i = this.gameObjects.length - 1; i >= 0; i--) {
                var clientObject = this.gameObjects[i];
                var serverObjectExists = false;
                for (var j = 0; j < state.gameObjects.length; j++) {
                    var serverObject = state.gameObjects[j];
                    if (clientObject.id === serverObject.id) {
                        serverObjectExists = true;
                        break;
                    }
                }
                if (!serverObjectExists)
                    Game.instance.gameObjects.splice(i, 1); 
            }

            if (this.players.length != state.players.length) {
                var image = new Image();
                image.src = "../Assets/Boot-3.png";

                this.players = [];
                for (var i = 0; i < state.players.length; i++) {
                    this.players.push(new Player(state.players[i].id, state.players[i].name));
                }
            }
            
            for (var i = 0; i < state.explosions.length; i++) {
                var explosionImage = new Image();
                explosionImage.src = "../Assets/explosion.png";
                this.oneTimeAnimations.push(new AnimationWithRectangle(new RotatableRectangle(new Vector2D(state.explosions[i].x, state.explosions[i].y), 80, 80, 0), explosionImage, 80, 80 * 3, 3, 300, false));
            }
            

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].PlayerName = state.players[i].name;
                this.players[i].score = state.players[i].score;
            }

            var image = new Image();
            image.src = "../Assets/canonball2.png";
            this.canonballs = [];
            for (var j = 0; j < state.canonballs.length; j++)
                this.canonballs.push(new SpriteObject(new Vector2D(state.canonballs[j].position.x, state.canonballs[j].position.y), image));
        }
    }
} 