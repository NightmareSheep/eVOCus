module eVOCus {
    export class Spawner extends ServerObject {
        position: Vector2D;
        angle: number;
        playerId : string;
        shipType : string;

        constructor(serverObj: any) {
            super(serverObj);
            this.position = serverObj.position;
            this.angle = serverObj.position;
            this.playerId = serverObj.playerId;
            this.shipType = serverObj.shipType;
        }

        update(gametime: number) {
            
        }

        synchronize(serverObj: any) {
            this.position = serverObj.position;
            this.angle = serverObj.position;
            this.playerId = serverObj.playerId;
            this.shipType = serverObj.shipType;
        }

        draw(canvas: Canvas) {
            
        }
    }
} 