module eVOCus {
    export class Spawner implements  ServerObject {
        position: Vector2D;
        angle: number;
        playerId : string;
        shipType: string;
        id: string;

        constructor(serverObj: any) {
            this.id = serverObj.id;
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