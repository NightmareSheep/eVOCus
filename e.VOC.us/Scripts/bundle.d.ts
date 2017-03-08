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
    class FakeShip implements IServerObject {
        rectangle: RotatableRectangle;
        id: string;
        player: Player;
        animation: Animation;
        constructor(serverObj: any);
        update(gametime: number): void;
        synchronize(serverObj: any): void;
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    class Map {
        width: number;
        height: number;
        constructor(width: number, height: number);
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    class Message implements IServerObject {
        text: string;
        id: string;
        constructor(serverObj: any);
        update(gametime: number): void;
        synchronize(serverObj: any): void;
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    class Minimap {
        ctx: CanvasRenderingContext2D;
        width: number;
        height: number;
        minimapElement: HTMLElement;
        constructor();
        update(): void;
        draw(): void;
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
        playerName: string;
        score: number;
        constructor(id: string, playerName: string);
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    class Keyboard {
        gameId: string;
        playerId: string;
        keysDown: number[];
        keysPressed: number[];
        constructor(gameId: string, playerId: string);
        update(): void;
        private keyDown(event);
        private keyUp(event);
        isKeyDown(key: number): boolean;
        isKeyPressed(key: number): boolean;
    }
}
declare module eVOCus {
    class Canvas {
        ctx: CanvasRenderingContext2D;
        width: number;
        height: number;
        constructor();
        drawRotatableImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle): void;
        drawRotatableClippedImage(image: HTMLImageElement, rotatableRectangle: RotatableRectangle, clipX: number, clipY: number, clipWidth: number, clipHeight: number): void;
        drawRotatableText(name: string, rotatableRectangle: RotatableRectangle): void;
    }
}
declare module eVOCus {
    class Helper {
        static angleToUnitVector(angle: number): Vector2D;
        static linearInterpolatePosition(position1: Vector2D, time1: number, position2: Vector2D, time2: number, currentTime: number): Vector2D;
        static linearInterpolateAngle(angle1: number, time1: number, angle2: number, time2: number, currentTime: number): number;
    }
}
declare module eVOCus {
    class CannonBall extends RotatableSpriteObject implements IServerObject {
        id: string;
        rectangle: RotatableRectangle;
        constructor(id: string, rectangle: RotatableRectangle, image: HTMLImageElement);
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
        synchronize(serverObj: any, serverTime: number, lastSyncTime: number): void;
    }
}
declare module eVOCus {
    class Spawner implements IServerObject {
        rectangle: RotatableRectangle;
        playerId: string;
        shipType: string;
        id: string;
        animation: Animation;
        constructor(serverObj: any);
        update(gametime: number): void;
        synchronize(serverObj: any): void;
        draw(canvas: Canvas): void;
    }
}
declare module eVOCus {
    interface IServerObject {
        id: string;
        update(gametime: number): void;
        draw(canvas: Canvas): void;
        synchronize(serverObj: any, serverTime: number, lastSyncTime: number): void;
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
    class Ship extends RotatableSpriteObject implements IServerObject {
        playerId: string;
        speed: number;
        maxSpeed: number;
        rectangle: RotatableRectangle;
        private _speed;
        private _maxSpeed;
        private _animation;
        private _animation_death;
        _boatState: string;
        _cannons: RotatableSpriteObject[];
        private _waveTime;
        private _currentWaveTime;
        id: string;
        private currentTime;
        private previousTime;
        constructor(id: string, playerId: string, speed: number, maxSpeed: number, rectangle: RotatableRectangle, image: HTMLImageElement);
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
        private lastSync;
        synchronize(serverObj: any, serverTime: number, lastSyncTime: number): void;
    }
}
declare module eVOCus {
    interface InputGameState {
        players: InputPlayer[];
        canonballs: InputCanonball[];
        explosions: InputPosition[];
        map: InputMap;
        gameObjects: InputGameObject[];
        gameTime: number;
    }
    interface InputGameObject {
        id: string;
        typeId: string;
    }
    interface InputPlayer {
        ship: InputShip;
        id: string;
        name: string;
        score: number;
    }
    interface InputShip {
        rectangle: InputRotatableRectangle;
        speed: number;
        boatState: string;
        cannons: InputCannon[];
    }
    interface InputCannon {
        rectangle: InputRotatableRectangle;
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
    class Scoreboard {
        scoreboardElement: HTMLElement;
        constructor();
        update(): void;
    }
    interface IPlayerWithScore {
        name: string;
        score: number;
    }
}
declare module eVOCus {
    class Environment {
        player: Player;
        private waterEntities;
        private waterMiddle;
        private waterForeground;
        private cloudsBackground;
        private cloudsMiddle;
        private cloudsForeground;
        private environmentAI;
        private testAI;
        constructor();
        update(): void;
        createClouds(): void;
        createAI(): void;
        updateAI(): void;
        animateWater(): void;
        animateClouds(): void;
    }
}
declare module eVOCus {
    class Initializer {
        static initialize(serverObj: any): IServerObject;
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
    class Synchronization {
        private game;
        inputGameStates: InputGameState[];
        lastSyncTime: number;
        constructor(game: Game);
        addInputGameState(inputGameState: InputGameState): void;
        filterGamestates(gameTime: number): void;
        synchronize(gameTime: number): void;
    }
}
declare module eVOCus {
    class Wave {
        position: Vector2D;
        angle: number;
        _rectangle: RotatableSpriteObject;
        private reduce;
        constructor(position: Vector2D, angle: number);
        update(gameTime: number): void;
        draw(canvas: Canvas, gameTime: number): void;
    }
}
declare module eVOCus {
    class Game {
        hub: GameHubProxy;
        id: string;
        gameId: string;
        gameTime: number;
        static keyboard: Keyboard;
        static instance: Game;
        canvas: Canvas;
        waves: Wave[];
        players: Player[];
        oneTimeAnimations: AnimationWithRectangle[];
        scoreboard: Scoreboard;
        minimap: Minimap;
        environment: Environment;
        focus: Vector2D;
        gameObjects: IServerObject[];
        synchronization: Synchronization;
        map: Map;
        latency: number;
        constructor(hub: GameHubProxy, id: string, gameId: string);
        initialize(gameState: InputGameState): void;
        start(gameTime: number, gameState: InputGameState): void;
        lastFrameTimeMs: number;
        maxFps: number;
        gameLoop(gameObject: Game, timestamp: number): void;
        update(gameTime: number): void;
        draw(canvas: Canvas): void;
        getCurrentPlayer(): Player;
    }
}
declare var playerId: string;
declare module eVOCus {
}
