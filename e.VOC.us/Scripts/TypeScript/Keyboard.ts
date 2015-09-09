///<reference path='GameObject.ts' />

module eVOCus {
    export class Keyboard {
        keysDown: number[] = [];
        keysPressed: number[] = [];
        constructor() {
            document.addEventListener('keydown', this.keyDown.bind(this), false);
            document.addEventListener('keyup', this.keyUp.bind(this), false);
        }

        update() {
            this.keysPressed = [];
        }

        private keyDown(event: KeyboardEvent) {
            if (this.keysDown.indexOf(event.keyCode) == -1) {
                this.keysDown.push(event.keyCode);
                Game.game.hub.server.keyboardInput(event.keyCode, "down");
            }
        }

        private keyUp(event: KeyboardEvent) {
            Game.game.hub.server.keyboardInput(event.keyCode, "up");
            this.keysPressed.push(event.keyCode);
            var index = this.keysDown.indexOf(event.keyCode, 0);
            if (index != undefined) {
                this.keysDown.splice(index, 1);
            }
        }

        isKeyDown(key: number): boolean {
            return this.keysDown.indexOf(key) != -1;
        }

        isKeyPressed(key: number): boolean {
            return this.keysPressed.indexOf(key) != -1;
        }
    }
}
