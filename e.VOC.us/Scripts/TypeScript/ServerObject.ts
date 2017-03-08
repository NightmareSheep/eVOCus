﻿module eVOCus {
    export interface IServerObject {
        id: string;
        update(gametime : number) : void;
        draw(canvas: Canvas) : void;
        synchronize(serverObj: any, serverTime: number, lastSyncTime: number) : void;
}
} 