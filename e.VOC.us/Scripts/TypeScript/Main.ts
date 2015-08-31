module eVOCus {
    var game: Game;
    var counter: number = 0;
    var test: any;
     window.onload = () => {
         game = new Game();


         var gameHub = $.connection.gameHub;
         gameHub.client.updateCounter = (i) => {
             counter++;
             $("#test").html(counter.toString());
         };

         gameHub.client.sync = (i) => {
         };

         $.connection.hub.start();
     }
 }