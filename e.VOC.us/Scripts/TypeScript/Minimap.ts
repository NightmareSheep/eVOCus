module eVOCus {
    export class Minimap {
        ctx: CanvasRenderingContext2D;
        public width: number;
        public height: number;
        minimapElement: HTMLElement;

        constructor() {
            var minicanvas = <HTMLCanvasElement>document.getElementById("map");
            this.ctx = minicanvas.getContext("2d");
            
            minicanvas.width = minicanvas.clientWidth;
            minicanvas.height = minicanvas.clientHeight;

            this.width = minicanvas.width;
            this.height = minicanvas.height;
        }

        update() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        draw() {
            this.ctx.strokeStyle = "#ededed";
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.lineWidth = 0;
            this.ctx.strokeRect(0, 0, this.width, this.height);

            for (var i = 0; i < Game.instance.players.length; i++) {
                var player = Game.instance.players[i];
                var centerX = player.ship.rectangle.position.x / 5000 * this.width;
                var centerY = player.ship.rectangle.position.y / 5000 * this.height;
                var angle = player.ship.rectangle.angle;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();

                if (Game.instance.getCurrentPlayer().id == player.id) {
                    this.ctx.translate(centerX, centerY);
                    this.ctx.rotate(angle * (Math.PI / 180));
                    
                    this.ctx.moveTo(-2, 0);
                    this.ctx.lineTo(-4, -3);
                    this.ctx.lineTo(4, 0);
                    this.ctx.lineTo(-4, 3);
                    this.ctx.lineTo(-2, 0);
                    this.ctx.closePath();
                    /*this.ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
                    this.ctx.arc(centerX, centerY, 1, 0, 2 * Math.PI);*/
                    this.ctx.strokeStyle = "#c95264";
                    this.ctx.fillStyle = "#c95264";
                    this.ctx.fill();
                    this.ctx.stroke();
                    this.ctx.rotate(-angle * (Math.PI / 180));
                    this.ctx.translate(-centerX, -centerY);
                }
                else {           
                    this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
                    this.ctx.strokeStyle = "#a8a8a8";
                    this.ctx.fillStyle = "#a8a8a8";
                    this.ctx.fill();
                    this.ctx.stroke();
                }
                
                
                
                //this.ctx.strokeRect(player.ship.rectangle.position.x / 5000 * this.width, player.ship.rectangle.position.y / 5000 * this.height, 2, 2);
            }

        }

    }
} 