module eVOCus {
    export class Initializer {
        static initialize(serverObj: any) {
            switch (serverObj.typeId) {
                case "ship":
                    var image = new Image();
                    image.src = "../Assets/Boot-3.png";
                    return new Ship(serverObj.id, serverObj.playerId, 0, 5, new RotatableRectangle(new Vector2D(0, 0), 180, 110, 0), image);
                default:
                    return null;
            }
        }
    }
} 