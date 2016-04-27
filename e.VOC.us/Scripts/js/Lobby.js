function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function LobbyViewModel() {
    var self = this;
    self.gameId = $("#gameId").attr("gameId");
    self.slots = ko.observableArray([{ "Team": "red", "LobbyPlayer": { "Name": "Frank" } }]);

    self.lobbyHub = $.connection.lobbyHub;
    self.lobbyHub.client.updateLobby = function(slots) {
         self.slots(slots);
    }
    self.lobbyHub.client.joinCallback = function(joinSuccesfull, slots) {
        self.slots(slots);
    }
    $.connection.hub.start().done(function() { self.lobbyHub.server.join(self.gameId, guid(), "playerName") });
}

ko.applyBindings(new LobbyViewModel());