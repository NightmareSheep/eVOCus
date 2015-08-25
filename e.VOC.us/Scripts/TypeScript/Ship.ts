///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        //get speed(): number { return this._speed; }
        //set speed(value: number) { this._speed = Math.min(this.maxSpeed, value); }

        private _maxSpeed: number;
        //get maxSpeed(): number { return this._maxSpeed; }
        //set maxSpeed(value: number) { this._maxSpeed = value; this.speed = this._speed; }

        constructor(speed: number, maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            //this.maxSpeed = maxSpeed;
            //this.speed = speed;
            this.setMaxSpeed(maxSpeed);
            this.setSpeed(speed);
        }

        update(gameTime: number) {
            // speed en angle aanpassen
            if (Game.keyboard.isKeyDown(37))
                this.rectangle.angle--;
            if (Game.keyboard.isKeyDown(38)) 
                this.setSpeed(this.getSpeed() + 1);
            if (Game.keyboard.isKeyDown(39))
                this.rectangle.angle++;
            if (Game.keyboard.isKeyDown(40)) 
                this.setSpeed(this.getSpeed() - 1);

            // angle tussen 0 en 360 graden houden
            if (this.rectangle.angle < 0)
                this.rectangle.angle += 360;
            if (this.rectangle.angle > 359)
                this.rectangle.angle -= 360;

            // Binnen canvas blijven
            if (this.rectangle.hitsBorder())
                this.setSpeed(0);

            // positie aanpassen
            this.rectangle.position.add(Helper.angleToUnitVector(this.rectangle.angle).multiply(this.getSpeed()));
        }

        draw(canvas:Canvas) {
            super.draw(canvas, 0);
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
