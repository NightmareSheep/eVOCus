﻿///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        private _maxSpeed: number;
        private _animation: Animations;

        constructor(public id: number, speed: number, maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this.setMaxSpeed(maxSpeed);
            this.setSpeed(speed);
            //this._animation = new Animations(image, 330, 180, 3, 3, false);
            this._animation = new Animations(image, rectangle.width, rectangle.height*5, 5, 2000, false);
        }

        update(canvas: Canvas, gameTime: number) {
            // speed en angle aanpassen
            if (this.id == 4001) {   
                if (Game.keyboard.isKeyDown(37) )
                    this.rectangle.angle--;
                if (Game.keyboard.isKeyDown(38) )
                    this.setSpeed(this.getSpeed() + 1);
                if (Game.keyboard.isKeyDown(39) )
                    this.rectangle.angle++;
                if (Game.keyboard.isKeyDown(40) )
                    this.setSpeed(this.getSpeed() - 1);
                if (Game.keyboard.isKeyPressed(13)) {
                    var image = new Image();
                    var canonball: CanonBall;
                    image.src = "../Assets/canonball2.jpg";
                    canonball = new CanonBall((this.id + gameTime), 10, new RotatableRectangle(this.rectangle.calcCorner(this.rectangle.width / 2, 0), 50, 50, this.rectangle.angle), image);
                    Game.game.gamestate.addCanonball(canonball);                    
                }
            }

            if (this.id == 8007) {
                if (Game.keyboard.isKeyDown(65))
                    this.rectangle.angle--;
                if (Game.keyboard.isKeyDown(87))
                    this.setSpeed(this.getSpeed() + 1);
                if (Game.keyboard.isKeyDown(68))
                    this.rectangle.angle++;
                if (Game.keyboard.isKeyDown(83))
                    this.setSpeed(this.getSpeed() - 1);
                if (Game.keyboard.isKeyPressed(70)) {
                    var image = new Image();
                    var canonball: CanonBall;
                    image.src = "../Assets/canonball2.jpg";
                    canonball = new CanonBall((this.id + gameTime), 10, new RotatableRectangle(this.rectangle.calcCorner(this.rectangle.width / 2, 0), 50, 50, this.rectangle.angle), image);
                    Game.game.gamestate.addCanonball(canonball);
                }
            }

            // angle tussen 0 en 360 graden houden
            if (this.rectangle.angle < 0)
                this.rectangle.angle += 360;
            if (this.rectangle.angle > 359)
                this.rectangle.angle -= 360;

            // Binnen canvas blijven
            if (this.rectangle.hitsBorder(canvas))
                this.setSpeed(0);

            // Ander schip raken
            if (this.rectangle.hitsShip(this.id, canvas) != 0) 
                this.setSpeed(0);

            //update animatie
            this._animation.Update(gameTime);
            // positie aanpassen
            this.rectangle.position.add(Helper.angleToUnitVector(this.rectangle.angle).multiply(this.getSpeed()));
        }

        draw(canvas:Canvas) {
            //super.draw(canvas, 0);
            canvas.drawRotatableAnimatedImage(this._animation, this.rectangle, 0);
        }

        getSpeed(): number {
            return this._speed;
        }

        setSpeed(value: number) {
            if (value > 0)
                this._speed = Math.min(this.getMaxSpeed(), value);
            else
                this._speed = 0;
        }

        getMaxSpeed(): number {
            return this._maxSpeed;
        }

        setMaxSpeed(value: number) {
            this._maxSpeed = value;
            this.setSpeed(this._speed);
        }

        /*
        keyHandler(event: KeyboardEvent) {
            switch (event.keyCode) {
                case 37:
                    //console.log('Arrow left');
                    this.rotatableObj.rectangle.angle -= 3;

                    if (this.boat.getPosition().x > 0) {
                        this.boat.position.x -= 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.x += 10;
                            this.redraw();
                        }
                    }
                    break;
                case 38:
                    //console.log('Arrow up');
                    if (this.boat.getPosition().y > 0) {
                        this.boat.position.y -= 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.y += 10;
                            this.redraw();
                        }
                    }
                    break;
                case 39:
                    //console.log('Arrow right');
                    this.rotatableObj.rectangle.angle += 3;
                    if (this.boat.getPosition().x < (this.canvasWidth - this.boat.image.width)) {
                        this.boat.position.x += 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.x -= 10;
                            this.redraw();
                        }
                    }
                    break;
                case 40:
                    //console.log('Arrow down');
                    if (this.boat.getPosition().y < (this.canvasHeight - this.boat.image.height)) {
                        this.boat.position.y += 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.y -= 10;
                            this.redraw();
                        }
                    }
                    break;
            }
            this.drawBoat();
        }
    */
    }
}
