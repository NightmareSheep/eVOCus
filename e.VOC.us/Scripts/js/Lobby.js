function LobbyViewModel() {
    var self = this;
    self.gameId = $("#gameId").attr("gameId");
    self.slots = ko.observableArray([]);
    self.ready = false;
    self.name = getCookie("nickname") || "No nickname set";

    self.lobbyHub = $.connection.lobbyHub;

    self.lobbyHub.client.updateLobby = function(slots) {
         self.slots(slots);
    }

    self.lobbyHub.client.joinCallback = function(joinSuccesfull, slots) {
        self.slots(slots);
    }

    self.lobbyHub.client.startGame = function() {
        document.getElementById('gameLink').click();
    }

    self.lobbyHub.client.getMessage = function(message) {
        $("#chat").append("<p>" + message + "</p>");
        $("#chat").scrollTop($("#chat").height());
    }

    self.sendMessage = function(message) {
        self.lobbyHub.server.sendMessage(self.gameId, message);
    }

    self.switchToSlot = function (data, event) {
        self.lobbyHub.server.switch(self.gameId, ko.contextFor(event.target).$index());
    }

    self.ready = function() {
        self.lobbyHub.server.ready(self.gameId, true);
    }

    $.connection.hub.start().done(function () { self.lobbyHub.server.join(self.gameId, playerId, self.name) });

    $("#sendMessage").keyup(function (event) {
        if (event.keyCode === 13) {
            var element = $("#sendMessage");
            var value = element.val();
            value = self.name + ": " + value;
            if (value !== "") {
                self.sendMessage(value);
                element.val("");
            }
        }
    });
}

ko.applyBindings(new LobbyViewModel());