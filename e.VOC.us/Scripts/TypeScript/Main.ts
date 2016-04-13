module eVOCus {
    var game: Game;
    window.onload = () => {
         var name = prompt("What is your name");
         var gameHub = $.connection.gameHub;
         game = new Game(gameHub);
         gameHub.client.Start = (id, gameTime) => {game.start(id, gameTime);};
         gameHub.client.sync = game.synchronization.addInputGameState.bind(game.synchronization);
         $.connection.hub.start().done(() => { gameHub.server.nameInput(name); });
     }
}

