///<reference path='GameObject.ts' />

module eVOCus {
    export class Helper {
        static angleToUnitVector(angle: number) : Vector2D {
            return new Vector2D(Math.cos(angle / (180 / Math.PI)), Math.sin(angle / (180 / Math.PI)));
        }
    }
}
