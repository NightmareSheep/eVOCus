module eVOCus {
    export class Environment {
        player: Player;
        private waterEntities;
        private waterMiddle;
        private waterForeground;
        private cloudsBackground;
        private cloudsMiddle;
        private cloudsForeground;
        private environmentAI;
        private testAI;


        constructor() {
            this.waterEntities = $('.water-entities');
            this.waterForeground = $('.water-foreground');
            this.waterMiddle = $('.water-middle');
            this.cloudsBackground = $('.clouds-background');
            this.cloudsMiddle = $('.clouds-middle');
            this.cloudsForeground = $('.clouds-foreground');

            this.createClouds();
            this.createAI();
        }

        update() {
            this.player = Game.instance.getCurrentPlayer();

            if (this.player != null) {
                this.animateWater();
                this.animateClouds();
                this.updateAI();
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
                        var cloud = $("<div>");

                        //Random cloud class
                        var randomCloud = Math.round(Math.random() * (cloudTypes.length - 1));
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

        createAI() {
            this.environmentAI = [];
            for (var i = 0; i < 5; i++) {
                var graphicAI = $("<div>").addClass("testAI");
                var AI = {
                    graphic: graphicAI,
                    top: ~~(Math.random()*5000),
                    left: ~~(Math.random() * 5000),
                    speed: (Math.random() * 3) + 1,
                    rotation: 0,
                    rotatemodifier: 0,
                    rotateaction: 0,
                    actioncount: 1
                }
                this.environmentAI.push(AI);
                this.waterEntities.append(graphicAI);
            }
        }

        updateAI() {
            for (var i = 0; i < this.environmentAI.length; i++) {
                this.environmentAI[i].top += Math.sin(this.environmentAI[i].rotation * Math.PI / 180) * this.environmentAI[i].speed;
                this.environmentAI[i].left += Math.cos(this.environmentAI[i].rotation * Math.PI / 180) * this.environmentAI[i].speed;
                this.environmentAI[i].rotation += this.environmentAI[i].rotateaction;

                if (this.environmentAI[i].rotatemodifier > this.environmentAI[i].rotateaction) {
                    this.environmentAI[i].rotateaction += 0.01;
                } else if (this.environmentAI[i].rotatemodifier < this.environmentAI[i].rotateaction) {
                    this.environmentAI[i].rotateaction -= 0.01;
                } else {
                    this.environmentAI[i].rotateaction = this.environmentAI[i].rotatemodifier;
                }

                this.environmentAI[i].actioncount--;
                if (!this.environmentAI[i].actioncount) {
                    this.environmentAI[i].rotatemodifier = ((Math.random() * 50) - 25) / 100;
                    this.environmentAI[i].actioncount = ~~(Math.random() * 250) + 50;
                }

                this.environmentAI[i].graphic.css("transform", "rotate(" + (this.environmentAI[i].rotation - 270) + "deg)");
                this.environmentAI[i].graphic.css("left", this.environmentAI[i].left);
                this.environmentAI[i].graphic.css("top", this.environmentAI[i].top);
            }
        }

        animateWater() {
            this.waterEntities.css("left", (-this.player.ship.rectangle.position.x * 1));
            this.waterEntities.css("top", (-this.player.ship.rectangle.position.y * 1));

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