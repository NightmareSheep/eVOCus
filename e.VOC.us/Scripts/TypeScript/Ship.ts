///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject implements IServerObject {
        private _speed: number;
        private _maxSpeed: number;
        private _animation: Animation;
        private _animation_death: Animation
        public _boatState: string;
        public _cannons: RotatableSpriteObject[];
        private _waveTime: number = 1000;
        private _currentWaveTime: number = 1000;
        public id: string;
        private currentTime: number = 0;
        private previousTime: number = 0;

        constructor(id: string, public playerId : string, public speed: number, public maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this.id = id;
            this._animation = new Animation(image, rectangle.width, rectangle.height * 5, 5, 2000, false);
            var image2 = new Image();
            image2.src = "/Assets/boot-3-dead.png";
            this._animation_death = new Animation(image2, rectangle.width, rectangle.height * 5, 5, 2000, false);

            var image = new Image();
            image.src = "/Assets/cannon.png";
            this._cannons = [new RotatableSpriteObject(new RotatableRectangle(new Vector2D(0, 0), 38, 20, 0), image)];
        }



        update(gameTime: number) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.previousTime === 0 ? 0 : this.currentTime - this.previousTime;
            this._currentWaveTime -= elapsedTime * (this.speed + 0.1);
            if (this._currentWaveTime < 0) {
                this._currentWaveTime = this._waveTime;
                Game.instance.waves.push(new Wave(new Vector2D(this.rectangle.position.x, this.rectangle.position.y), this.rectangle.angle));
            }
            this._animation.Update(gameTime);
            this._animation_death.Update(gameTime);
            if (this.playerId === Game.instance.id)
                Game.instance.focus = this.rectangle.position;

            //this.rectangle.position.x += 5;
        }

        draw(canvas: Canvas) {
            if (this._boatState === "dying" || this._boatState === "spawning")
                this._animation_death.Draw(canvas, 0, this.rectangle);
            else
                this._animation.Draw(canvas, 0, this.rectangle);

            for (var i = 0; i < this._cannons.length; i++) {
                this._cannons[i].draw(canvas, 0);
            }

            var owner;
            var players = Game.instance.players;
            players.forEach(player => {
                if (player.id === this.playerId) { owner = player; }
            });
            canvas.drawRotatableText(owner.playerName, this.rectangle);
        }

        private lastSync:number = 0;
        synchronize(serverObj: any, serverTime: number, lastSyncTime: number) {

            var newPostion = Helper
                .linearInterpolatePosition(this.rectangle.position,
                    lastSyncTime,
                    serverObj.rectangle.position,
                    serverTime,
                    Game.instance.gameTime);

            var newCannonPosition = Helper
                .linearInterpolatePosition(this._cannons[0].rectangle.position,
                lastSyncTime,
                serverObj.cannons[0].rectangle.position,
                serverTime,
                Game.instance.gameTime);

            this.rectangle.position = newPostion;
            this.rectangle.angle = serverObj.rectangle.angle;
            this._boatState = serverObj.boatState;
            this.speed = serverObj.speed;
            this._cannons[0].rectangle.position = newCannonPosition;
            this._cannons[0].rectangle.angle = serverObj.cannons[0].rectangle.angle;
            this.lastSync = Game.instance.gameTime;
        }
    }
}