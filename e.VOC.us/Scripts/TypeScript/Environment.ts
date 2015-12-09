module eVOCus {
    export class Environment {
        player: Player;
        private waterMiddle;
        private waterForeground;
        private cloudsBackground;
        private cloudsMiddle;
        private cloudsForeground;
        


        constructor() {
            this.waterForeground = $('.water-foreground');
            this.waterMiddle = $('.water-middle');
            this.cloudsBackground = $('.clouds-background');
            this.cloudsMiddle = $('.clouds-middle');
            this.cloudsForeground = $('.clouds-foreground');

            this.createClouds();
        }

        update() {
            this.player = Game.instance.getCurrentPlayer();

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
            var cloudSpawnPercentage = 50;
            
            var cloudTypes = ['cloud1', 'cloud2', 'cloud3'];
            var cloudLayers = [this.cloudsMiddle, this.cloudsForeground, this.cloudsBackground ];
            
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
                        
                        //Append to random cloud layer
                        var randomLayer = Math.round(Math.random() * (cloudLayers.length - 1));
                        cloudLayers[randomLayer].append(cloud);

                    }
                }
            }
        }



        animateWater() {
            this.waterMiddle.css("background-position-x", (-this.player.ship.rectangle.position.x + Game.instance.canvas.width / 2) / 2);
            this.waterMiddle.css("background-position-y", (-this.player.ship.rectangle.position.y + Game.instance.canvas.height / 2) / 2);
            this.waterForeground.css("background-position-x", (-this.player.ship.rectangle.position.x + Game.instance.canvas.width / 2));
            this.waterForeground.css("background-position-y", (-this.player.ship.rectangle.position.y + Game.instance.canvas.height / 2));
        }

        animateClouds() {
            this.cloudsBackground.css("left", (-this.player.ship.rectangle.position.x * 2));
            this.cloudsBackground.css("top", (-this.player.ship.rectangle.position.y * 2));

            this.cloudsMiddle.css("left", (-this.player.ship.rectangle.position.x * 3));
            this.cloudsMiddle.css("top", (-this.player.ship.rectangle.position.y * 3));

            this.cloudsForeground.css("left", (-this.player.ship.rectangle.position.x * 4));
            this.cloudsForeground.css("top", (-this.player.ship.rectangle.position.y * 4));
        }
    }
} 