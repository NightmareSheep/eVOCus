module eVOCus {
    export class Game {
        fps: number = 1;
        gameTime: number = 0;
        timeStep: number;
        //gameObjects: GameObject[] = [];

        //Spriteobject 
        mario: SpriteObject;
        marioPoint: Point;
        water: SpriteObject;
        waterPoint: Point;

        //Moving Object
        boat: movingObj;
        boatPoint: Point;
        boatSpeed: number;
        boatDirection: number;

        //Canvas 
        canvasWidth: number = (window.innerWidth * 8/10);
        canvasHeight: number = (window.innerHeight * 6/10);
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        
        constructor() {
            this.timeStep = Math.floor(1000 / this.fps);
            setInterval(() => { this.gameLoop(this); }, this.timeStep);

            // Canvas tekenen
            this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.context.canvas.width = this.canvasWidth;
            this.context.canvas.height = this.canvasHeight;
     
            //Object Water tekenen
            this.drawWater();

            // Object Mario tekenen
            this.marioPoint = new Point(100, 100);
            var myImage = new Image();
            myImage.src = "../Assets/Mario.png";
            this.mario = new SpriteObject("Mario", this.marioPoint, "Mario", myImage);
            this.drawMario();

            // Object Boat tekenen
            this.boatPoint = new Point(400, 100);
            this.boatSpeed = 1;
            this.boatDirection = 90;
            var myImage = new Image();
            myImage.src = "../Assets/Boot.png";
            this.boat = new movingObj("Boat", this.boatPoint, "Boat", myImage, this.boatSpeed, this.boatDirection);
            this.drawBoat();


            // Listen to keyDown events
            document.addEventListener('keydown', this.keyHandler.bind(this) , false);

        }

        redraw() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawWater();
            this.drawMario();
            this.drawBoat();

            //console.log(this.boat.overlaps(this.mario));

            if (!this.boat.overlaps(this.mario)) {
                console.log('Vrij');
            }
            else {
                console.log('Overlap');
            }
        }

        drawWater() {
            this.context.beginPath();
            this.context.rect(0, 0, this.canvasWidth, this.canvasHeight);
            this.context.fillStyle = '#4169e1';
            this.context.fill();
            this.context.stroke();
            /*
            this.waterPoint = new Point(0, 0);
            var myImage1 = new Image();
            myImage1.src = "../Assets/Water.jpg";
            this.water = new SpriteObject("Watertegel", this.waterPoint, "waterTegel", myImage1);
            var tellerX: number = Math.floor(this.canvasWidth / myImage1.width);
            var tellerY: number = Math.floor(this.canvasHeight / myImage1.height);

            while (tellerY > 0) {
                while (tellerX > 0) {
                    this.water.draw(this.context, this.gameTime);
                    this.waterPoint.x = this.waterPoint.x + myImage1.width;
                    tellerX--;
                }
                this.waterPoint.y = this.waterPoint.y + myImage1.height;
                tellerY--;
                tellerX = Math.floor(this.canvasWidth / myImage1.width);
                this.waterPoint.x = 0;
            }*/
        }

        drawMario() {
            this.mario.draw(this.context, this.gameTime);
        }

        drawBoat() {
            this.boat.draw(this.context, this.gameTime);
        }

        keyHandler(event: KeyboardEvent) {
            switch (event.keyCode) {
                case 37:
                    //console.log('Arrow left');
                    
                    if (this.boat.getPosition().x > 0) {
                        this.boat.position.x -= 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.x += 10;
                            this.redraw();
                        }
                    }
                    break;
                case 38:
                    //console.log('Arrow up');
                    if (this.boat.getPosition().y > 0) {
                        this.boat.position.y -= 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.y += 10;
                            this.redraw();
                        }
                    }
                    break;
                case 39:
                    //console.log('Arrow right');
                    
                    if (this.boat.getPosition().x < (this.canvasWidth - this.boat.image.width)) {
                        this.boat.position.x += 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.x -= 10;
                            this.redraw();
                        }
                    }
                    break;
                case 40:
                    //console.log('Arrow down');
                    if (this.boat.getPosition().y < (this.canvasHeight - this.boat.image.height)) {
                        this.boat.position.y += 10;
                        if (!this.boat.overlaps(this.mario)) {
                            this.redraw();
                        }
                        else {
                            this.boat.position.y -= 10;
                            this.redraw();
                        }
                    }
                    break;
            }
            this.drawBoat();
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        }

        update(gameTime: number) {
            //console.log("update!!:");
        }

        draw(gameTime: number) {

        }
    }
} 