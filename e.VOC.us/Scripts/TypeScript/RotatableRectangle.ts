///<reference path='Rectangle.ts' />

module eVOCus {

    // Rectangle that can rotate with the x and y in the center.
    export class RotatableRectangle {
        constructor(public position:Vector2D, public width: number, public height: number, public angle : number) {
        }
    }
} 