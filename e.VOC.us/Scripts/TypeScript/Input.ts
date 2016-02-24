﻿module eVOCus {
    export interface InputGameState {
        players: InputPlayer[];
        canonballs: InputCanonball[];
        explosions: InputPosition[];
        map: InputMap;
        gameObjects: InputGameObject[];
    }

    export interface InputGameObject {
        id: string;
        typeId: string;
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
        cannons: InputCannon[];
    }

    export interface InputCannon {
        rectangle: InputRotatableRectangle;
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