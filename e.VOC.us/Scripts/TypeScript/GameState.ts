module eVOCus {
    export class GameState {
        
        constructor(public ships: Array<Ship>, public canonBalls: Array<CanonBall> ) {
 
        }

        update(canvas: Canvas, gameTime: number) {
            //console.log('In gamestate update');
            for (var i = 0; i < this.ships.length; i++) {
                //console.log('in for loop, i = ' + i);
                this.ships[i].update(canvas, gameTime);
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
    }
} 