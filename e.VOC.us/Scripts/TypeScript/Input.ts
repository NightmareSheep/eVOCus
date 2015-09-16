module eVOCus {
    export interface InputGameState {
        players:InputPlayer[];
    }

    export interface InputPlayer {
        ship:InputShip
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
} 