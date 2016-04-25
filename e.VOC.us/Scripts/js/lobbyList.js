function LobbyListViewModel() {
    var self = this;
    self.lobbies = ko.observableArray([]);

    self.GetLobbies = function () {
        self.lobbies = ko.observableArray([{ "Name": "game 1", "Id": "1" }, { "Name": "game 2", "Id": "2" }]);
        /*
        $.ajax({
            url: "/api/webapi/lobbies",
            success: function(data) {
                 self.lobbies = ko.observableArray(data);
            }
        });
        */
    };

    self.GetLobbies();
}

ko.applyBindings(new LobbyListViewModel());