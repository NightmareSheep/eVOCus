module eVOCus {
    export interface InputGameState {
        players: InputPlayer[];
        canonballs: InputCanonball[];
        explosions: InputPosition[];
        map: InputMap;
    }

    export interface InputPlayer {
        ship: InputShip;
        id: string;
        name: string;
        score: number;
    }

    export interface InputShip {
        rectangle: InputRotatableRectangle;
        speed: number;
        boatState: string;
    }

    export interface InputRotatableRectangle {
        angle: number;
        position: InputPosition;
        width: number;
        height: number;

    }

    export interface InputMap {
        width: number;
        height: number;
    }

    export interface InputPosition {
        x: number;
        y: number;
    }

    export interface InputCanonball {
        position: InputPosition;
    }
} 