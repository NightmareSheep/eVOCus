function LobbyListViewModel() {
    var self = this;
    self.lobbies = ko.observableArray([]);

    self.GetLobbies = function () {
        $.ajax({
            url: "/api/webapi/lobbies",
            success: function(data) {
                 self.lobbies(data);
            }
        });
    };

    self.GetLobbies();
}

ko.applyBindings(new LobbyListViewModel());