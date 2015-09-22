module eVOCus {
    export class GameState {
        
        constructor(public ships: Array<Ship>, public canonBalls: Array<CanonBall> ) {
 
        }

        update(canvas: Canvas, gameTime: number) {
            //console.log('In gamestate update');
            for (var i = 0; i < this.ships.length; i++) {
                //console.log('in for loop, i = ' + i);
                //this.ships[i].update(canvas, gameTime);
            }

            for (var i = 0; i < this.canonBalls.length; i++) {
                //console.log('in for loop, i = ' + i);
                this.canonBalls[i].update(canvas, gameTime);
            }

        }

        draw(canvas: Canvas) {
            for (var i = 0; i < this.ships.length; i++) {
                this.ships[i].draw(canvas);
            }
            for (var i = 0; i < this.canonBalls.length; i++) {
                this.canonBalls[i].draw(canvas);
            }
        }

        addShip(ship: Ship) {
            this.ships[this.ships.length] = ship;
        }

        addCanonball(ball: CanonBall) {
            this.canonBalls[this.canonBalls.length] = ball;
        }

        removeCanonball(ballID: number) {
            for (var i = 0; i < this.canonBalls.length; i++) {
                if (this.canonBalls[i].id == ballID) {
                    this.canonBalls.splice(i, 1);
                }
            }
        }

        removeShip(shipID: number) {
            for (var i = 0; i < this.ships.length; i++) {
                if (this.ships[i].id == shipID) {
                    this.ships.splice(i, 1);
                }
            }
        }
    }
} 