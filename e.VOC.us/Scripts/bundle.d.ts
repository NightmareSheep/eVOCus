declare module eVOCus {
    class Animation {
        image: HTMLImageElement;
        width: number;
        height: number;
        frames: number;
        duration: number;
        loop: boolean;
        private currentTime;
        private previousTime;
        private currentAnimationTime;
        private currentFrame;
        private frameWidth;
        private frameHeight;
        ended: boolean;
        constructor(image: HTMLImageElement, width: number, height: number, frames: number, duration: number, loop?: boolean);
        Update(gameTime: number): void;
        Draw(canvas: Canvas, gameTime: number, rectangle: RotatableRectangle): void;
        Reset(): void;
    }
}
declare module eVOCus {
    class AnimationWithRectangle extends Animation {
        private rectangle;
        image: HTMLImageElement;
        width: number;
        height: number;
        frames: number;
        duration: number;
        loop: boolean;
        constructor(rectangle: RotatableRectangle, image: HTMLImageElement, width: number, height: number, frames: number, duration: number, loop?: boolean);
        Draw(canvas: Canvas, gameTime: number): void;
    }
}
declare module eVOCus {
    class GameObject {
        name: string;
        position: Vector2D;
        id: string;
        constructor(name: string, position: Vector2D, id: string);
        getPosition(): Vector2D;
        setPosition(p: Vector2D): void;
        update(gameTime: number): void;
        draw(context: CanvasRenderingContext2D, gameTime: number): void;
    }
}
declare module eVOCus {
    class RotatableSpriteObject {
        rectangle: RotatableRectangle;
        image: HTMLImageElement;
        constructor(rectangle: RotatableRectangle, image: HTMLImageElement);
        draw(canvas: Canvas, gameTime: number): void;
    }
}
declare module eVOCus {
    class Player {
        id: string;
        ship: Ship;
        PlayerName: string;
        constructor(id: string, ship: Ship, PlayerName: string);
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
        focus(canvas: Canvas): void;
    }
}
declare module eVOCus {
    class Keyboard {
        keysDown: number[];
        keysPressed: number[];
        constructor();
        update(): void;
        private keyDown(event);
        private keyUp(event);
        isKeyDown(key: number): boolean;
        isKeyPressed(key: number): boolean;
    }
}
declare module eVOCus {
    class Canvas {
        width: number;
        height: number;
        ctx: CanvasRenderingContext2D;
        constructor(width: number, height: number);
        drawRotatableImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle): void;
        drawRotatableClippedImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle, clipX: number, clipY: number, clipWidth: number, clipHeight: number): void;
        drawRotatableText(name: string, rotatableRectangle: RotatableRectangle): void;
    }
}
declare module eVOCus {
    class Helper {
        static angleToUnitVector(angle: number): Vector2D;
    }
}
declare module eVOCus {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x: number, y: number, width: number, height: number);
        contains(v: Vector2D): boolean;
    }
}
declare module eVOCus {
    class RotatableRectangle {
        position: Vector2D;
        width: number;
        height: number;
        angle: number;
        constructor(position: Vector2D, width: number, height: number, angle: number);
    }
}
declare module eVOCus {
    class Ship extends RotatableSpriteObject {
        id: number;
        speed: number;
        maxSpeed: number;
        rectangle: RotatableRectangle;
        private _speed;
        private _maxSpeed;
        private _animation;
        private _animation_death;
        _boatState: string;
        constructor(id: number, speed: number, maxSpeed: number, rectangle: RotatableRectangle, image: HTMLImageElement);
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    interface InputGameState {
        players: InputPlayer[];
        canonballs: InputCanonball[];
        explosions: InputPosition[];
        map: InputMap;
    }
    interface InputPlayer {
        ship: InputShip;
        id: string;
        name: string;
    }
    interface InputShip {
        rectangle: InputRotatableRectangle;
        speed: number;
        boatState: string;
    }
    interface InputRotatableRectangle {
        angle: number;
        position: InputPosition;
        width: number;
        height: number;
    }
    interface InputMap {
        width: number;
        height: number;
    }
    interface InputPosition {
        x: number;
        y: number;
    }
    interface InputCanonball {
        position: InputPosition;
    }
}
declare module eVOCus {
    class Vector2D {
        x: number;
        y: number;
        constructor(x: number, y: number);
        add(vector: Vector2D): Vector2D;
        multiply(i: number): Vector2D;
    }
}
declare module eVOCus {
    class SpriteObject {
        position: Vector2D;
        image: HTMLImageElement;
        constructor(position: Vector2D, image: HTMLImageElement);
        draw(context: CanvasRenderingContext2D, gameTime: number): void;
    }
}
declare module eVOCus {
    class Game {
        hub: GameHubProxy;
        fps: number;
        gameTime: number;
        timeStep: number;
        static keyboard: Keyboard;
        static game: Game;
        canvas: Canvas;
        canonballs: SpriteObject[];
        id: string;
        players: Player[];
        oneTimeAnimations: AnimationWithRectangle[];
        constructor(hub: GameHubProxy);
        inputName(): void;
        gameLoop(gameObject: Game): void;
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
        getCurrentPlayer(): Player;
        sync(state: InputGameState): void;
    }
}
declare module eVOCus {
}
