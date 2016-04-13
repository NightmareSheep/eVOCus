module eVOCus {
    var game: Game;
     window.onload = () => {
         var gameHub = $.connection.gameHub;
         game = new Game(gameHub);
         gameHub.client.Start = (id, gameTime) => {game.start(id, gameTime);};
         gameHub.client.sync = game.sync.bind(game);
         $.connection.hub.start().done(() => { game.inputName(); });
     }
 }