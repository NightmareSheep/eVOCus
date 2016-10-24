declare var playerId: string;

module eVOCus {
    var game: Game;
    window.onload = () => {
         var gameId = $("#canvas").attr("gameId");
         var gameHub = $.connection.gameHub;
        $.connection.hub.qs = { 'playerId' : playerId, 'gameId' : gameId }
        game = new Game(gameHub, playerId, gameId);
         gameHub.client.Start = (gameTime, gameState) => {game.start(gameTime, gameState);};
         gameHub.client.sync = game.synchronization.addInputGameState.bind(game.synchronization);
         $.connection.hub.start().done();
     }
}

