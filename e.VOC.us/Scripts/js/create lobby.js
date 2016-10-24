function CreateLobbyViewModel() {
    var self = this;
    self.maps = ko.observableArray(JSON.parse($("#maps").attr("maps")));
    self.selectedMap = ko.observable(self.maps()[0]);
    self.slots = ko.observableArray([]);
    self.mapId = ko.observable("");
    self.setSlotsAndMapId = ko.computed(function () {
        var slots = [];
        for (var i = 0; i < self.selectedMap().StartLocations.length; i++) {
            slots.push({"team":ko.observable(i + 1)});
        }
        self.slots(slots);
        self.mapId(self.selectedMap().Id);
    });
    self.slotsString = ko.computed(function () {
        var teams = [];
        self.slots().forEach(function(element) {
            teams.push(parseInt(element.team()));
        });
        return JSON.stringify(teams);
    });
}

var viewmodel = new CreateLobbyViewModel();
ko.applyBindings(viewmodel);
