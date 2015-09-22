module eVOCus {
    export interface InputGameState {
        players: InputPlayer[];
        canonballs: InputCanonball[];
    }

    export interface InputPlayer {
        ship: InputShip;
        id: string;
    }

    export interface InputShip {
        rectangle: InputRotatableRectangle;
        speed: number;
    }

    export interface InputRotatableRectangle {
        angle: number;
        position: InputPosition;
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