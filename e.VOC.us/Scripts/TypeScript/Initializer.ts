module eVOCus {
    export class Initializer {
        static initialize(serverObj: any) : IServerObject {
            switch (serverObj.typeId) {
                case "ship":
                    var image = new Image();
                    image.src = "/Assets/Boot-3.png";
                    return new Ship(serverObj.id, serverObj.playerId, 0, 5, new RotatableRectangle(new Vector2D(0, 0), 180, 110, 0), image);
                case "spawner":
                    return new Spawner(serverObj);
                case "message":
                    return new Message(serverObj);
                case "fakeShip":
                    return new FakeShip(serverObj);
                case "cannonball":
                    var image = new Image();
                    image.src = "/Assets/canonball2.png";
                    return new CannonBall(serverObj.id, new RotatableRectangle(new Vector2D(serverObj.position.x, serverObj.position.y), 10, 10, 0), image);
                case "circle":
                    return new Circle(serverObj.id);
                case "survival scoreboard":
                    return new SurvivalScoreboard(serverObj);
                default:
                    return null;
            }
        }
    }
} 