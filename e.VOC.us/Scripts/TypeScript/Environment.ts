module eVOCus {
    export class Environment {
        player: Player;
        private waterMiddle;
        private waterForeground;
        private cloudsMiddle;


        constructor() {
            this.waterForeground = $('.water-foreground');
            this.waterMiddle = $('.water-middle');
            this.cloudsMiddle = $('.clouds-middle');

            this.createClouds();
        }

        update() {
            this.player = Game.game.getCurrentPlayer();

            if (this.player != null) {
                this.animateWater();
                this.animateClouds();
                
            }
        }

        createClouds() {
            //Where can map size data be found?
            var mapWidth = 15000;
            var mapHeight = 15000;

            //Simplify/grid map data
            var cloudWidth = (Math.ceil(mapWidth / 1000));
            var cloudHeight = (Math.ceil(mapHeight / 1000));

            //Chance of spawning a cloud on map grid square
            var cloudSpawnPercentage = 25;
            
            var cloudTypes = ['cloud1', 'cloud2', 'cloud3'];
            
            for (var x = 0; x < cloudWidth; x++) {
                for (var y = 0; y < cloudHeight; y++) {
                    var cloudDicePercentage = ~~(Math.random() * 100);
                    if (cloudDicePercentage < cloudSpawnPercentage) {
                        //Let's paint some happy little clouds
                        var cloud = $("<div>")

                        //Random cloud class
                        var randomCloud = Math.round(Math.random() * (cloudTypes.length - 1));
                        console.log(randomCloud);
                        cloud.addClass(cloudTypes[randomCloud]);
                        
                        //Randomise cloud settings
                        var cloudXOffset = ~~(Math.random() * 500) + (x * 1000);
                        var cloudYOffset = ~~(Math.random() * 500) + (y * 1000);

                        cloud.css('left', cloudXOffset);
                        cloud.css('top', cloudYOffset);
                        
                        //Append to cloud layer
                        this.cloudsMiddle.append(cloud);

                    }
                }
            }
        }



        animateWater() {
            this.waterMiddle.css("background-position-x", (-this.player.ship.rectangle.position.x + Game.game.canvas.width / 2) / 2);
            this.waterMiddle.css("background-position-y", (-this.player.ship.rectangle.position.y + Game.game.canvas.height / 2) / 2);
            this.waterForeground.css("background-position-x", (-this.player.ship.rectangle.position.x + Game.game.canvas.width / 2));
            this.waterForeground.css("background-position-y", (-this.player.ship.rectangle.position.y + Game.game.canvas.height / 2));
        }

        animateClouds() {
            this.cloudsMiddle.css("left", (-this.player.ship.rectangle.position.x * 2));
            this.cloudsMiddle.css("top", (-this.player.ship.rectangle.position.y * 2));
        }
    }
} 