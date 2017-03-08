///<reference path='GameObject.ts' />

module eVOCus {
    export class Helper {
        static angleToUnitVector(angle: number) : Vector2D {
            return new Vector2D(Math.cos(angle / (180 / Math.PI)), Math.sin(angle / (180 / Math.PI)));
        }

        static linearInterpolatePosition(position1: Vector2D, time1: number, position2: Vector2D, time2: number, currentTime: number): Vector2D {
            var relativeTime = (currentTime - time1) / (time2 - time1);
            var distanceX = (position2.x - position1.x) * relativeTime;
            var distanceY = (position2.y - position1.y) * relativeTime;
            return new Vector2D(position1.x + distanceX, position1.y + distanceY);
        }
    }
}
