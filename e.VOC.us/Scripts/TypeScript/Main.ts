module eVOCus {
    var game: Game;
     window.onload = () => {
         var gameHub = $.connection.gameHub;
         game = new Game(gameHub);
         gameHub.client.RegisterId = (id) => {game.id = id};
         gameHub.client.sync = game.sync.bind(game);
         $.connection.hub.start().done(() => { game.inputName(); });
     }
 }