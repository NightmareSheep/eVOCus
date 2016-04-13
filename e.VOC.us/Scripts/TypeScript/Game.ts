module eVOCus {
    export class Game {
        gameTime: number = 0;
        //timeStep: number;
        static keyboard: Keyboard;
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
        synchronization: Synchronization;

        
        constructor(public hub: GameHubProxy) {
            Game.instance = this;
            Game.keyboard = new Keyboard();
            this.canvas = new Canvas();
            this.scoreboard = new Scoreboard();
            this.minimap = new Minimap();
            this.environment = new Environment();
            this.synchronization = new Synchronization(this);
        }

        start(id: string, gameTime: number) {
            this.id = id;
            this.gameTime = gameTime;
            requestAnimationFrame((timestamp) => {
                this.lastFrameTimeMs = timestamp; this.gameLoop(this, timestamp); });
        }

        lastFrameTimeMs : number = 0; // The last time the loop was run
        maxFps : number = 60; // The maximum FPS we want to allow

        gameLoop(gameObject: Game, timestamp: number) {
            
            if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFps)) {
                requestAnimationFrame((time) => { this.gameLoop(this, time); });
                return;
            }
            const elapsedTime = timestamp - this.lastFrameTimeMs;
            this.gameTime += elapsedTime;
            this.lastFrameTimeMs = timestamp;
            this.update(this.gameTime);
            this.draw(this.canvas);
            requestAnimationFrame((time) => { this.gameLoop(this, time); });
        }

        update(gameTime: number) {
            this.synchronization.synchronize(gameTime);
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
       
    }
} 