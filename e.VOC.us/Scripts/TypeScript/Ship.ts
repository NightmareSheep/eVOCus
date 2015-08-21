///<reference path='RotatableSpriteObject.ts' />

module eVOCus {
    export class Ship extends RotatableSpriteObject {
        private _speed: number;
        get speed(): number { return this._speed; }
        set speed(value: number) { this._speed = Math.min(this.maxSpeed, value); }

        private _maxSpeed: number;
        get maxSpeed(): number { return this._maxSpeed; }
        set maxSpeed(value: number) { this._maxSpeed = value; this.speed = this._speed; }

        constructor(speed: number, maxSpeed: number, public rectangle: RotatableRectangle, image: HTMLImageElement) {
            super(rectangle, image);
            this.maxSpeed = maxSpeed;
            this.speed = speed;
        }

        update(gameTime: number) {
            if (Game.keyboard.isKeyDown(37))
                this.rectangle.angle--;
            if (Game.keyboard.isKeyDown(38))
                this.speed++;
            if (Game.keyboard.isKeyDown(39))
                this.rectangle.angle++;
            if (Game.keyboard.isKeyDown(40))
                this.speed--;

            this.rectangle.position.add(Helper.angleToUnitVector(this.rectangle.angle).multiply(this.speed));
        }

        draw(canvas:Canvas) {
            super.draw(canvas, 0);
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
