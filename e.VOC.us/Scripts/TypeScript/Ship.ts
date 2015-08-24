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
    }
}
