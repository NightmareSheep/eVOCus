module eVOCus {
    export class Synchronization {
        inputGameStates: InputGameState[] = [];
        latency = 128;

        constructor(private game: Game) {
        }

        addInputGameState(inputGameState : InputGameState) {
            this.inputGameStates.push(inputGameState);
        }

        filterGamestates(gameTime : number) {
            for (var i = this.inputGameStates.length - 1; i >= 0; i--) {
                var gamestate = this.inputGameStates[i];
                if (gamestate.gameTime < gameTime - this.latency) {
                    this.inputGameStates.splice(0, i + 1);
                    return;
                }
            }
        }

        synchronize(gameTime: number) {
            //console.log(this.inputGameStates.length);
            this.filterGamestates(gameTime);

            var state = this.inputGameStates[0];
            if (!state)
                return;

            if (this.game.players.length !== state.players.length) {
                this.game.players = [];
                for (var i = 0; i < state.players.length; i++) {
                    this.game.players.push(new Player(state.players[i].id, state.players[i].name));
                }
            }

            for (var i = 0; i < this.game.players.length; i++) {
                this.game.players[i].playerName = state.players[i].name;
                this.game.players[i].score = state.players[i].score;
            }

            for (var i = 0; i < state.gameObjects.length; i++) {
                var serverObject = state.gameObjects[i];
                var clientObjExists = false;
                for (var j = 0; j < this.game.gameObjects.length; j++) {
                    var clientObject = this.game.gameObjects[j];
                    if (clientObject.id === serverObject.id) {
                        clientObject.synchronize(serverObject);
                        clientObjExists = true;
                    }
                }
                if (!clientObjExists)
                    Game.instance.gameObjects.push(Initializer.initialize(serverObject));
            }

            for (var i = this.game.gameObjects.length - 1; i >= 0; i--) {
                var clientObject = this.game.gameObjects[i];
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



            for (var i = 0; i < state.explosions.length; i++) {
                var explosionImage = new Image();
                explosionImage.src = "/Assets/explosion.png";
                this.game.oneTimeAnimations.push(new AnimationWithRectangle(new RotatableRectangle(new Vector2D(state.explosions[i].x, state.explosions[i].y), 80, 80, 0), explosionImage, 80, 80 * 3, 3, 300, false));
            }




            var image = new Image();
            image.src = "/Assets/canonball2.png";
            this.game.canonballs = [];
            for (var j = 0; j < state.canonballs.length; j++)
                this.game.canonballs.push(new SpriteObject(new Vector2D(state.canonballs[j].position.x, state.canonballs[j].position.y), image));
        }

    }
}