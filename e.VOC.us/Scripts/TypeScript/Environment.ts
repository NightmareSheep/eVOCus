module eVOCus {
    export class Environment {
        player: Player;

        constructor() {
            this.player = Game.game.getCurrentPlayer();
        }

        update() {

            //Background water
            //$('.water-background').css("background-position-x", (-this.player.ship.rectangle.position.x + Game.game.canvas.width / 2) / 4);
            //$('.water-background').css("background-position-y", (-this.player.ship.rectangle.position.y + Game.game.canvas.height / 2) / 4);

            $('.water-middle').css("background-position-x", (-this.player.ship.rectangle.position.x + Game.game.canvas.width / 2) / 2);
            $('.water-middle').css("background-position-y", (-this.player.ship.rectangle.position.y + Game.game.canvas.height / 2) / 2);

            $('.water-foreground').css("background-position-x", (-this.player.ship.rectangle.position.x + Game.game.canvas.width / 2));
            $('.water-foreground').css("background-position-y", (-this.player.ship.rectangle.position.y + Game.game.canvas.height / 2));
        }
    }
} 