module eVOCus {
    var game: Game;
    var counter: number = 0;
     window.onload = () => {
         var gameHub = $.connection.gameHub;
         game = new Game(gameHub);
         gameHub.client.updateCounter = (i) => {
             counter++;
             $("#test").html(counter.toString());
         };

         gameHub.client.sync = game.sync.bind(game);

         $.connection.hub.start();
     }
 }