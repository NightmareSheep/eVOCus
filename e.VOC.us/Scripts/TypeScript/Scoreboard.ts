module eVOCus {
    export class Scoreboard {
        scoreboardElement: HTMLElement;

        constructor() {
            this.scoreboardElement = document.getElementById("scoreboard");
        }

        update() {


            var playersWithScores: IPlayerWithScore[] = [];

            for (var i = 0; i < Game.instance.players.length; i++) {
                var player = Game.instance.players[i];
                playersWithScores.push({ 'name': player.PlayerName, 'score': player.score });
            }

            playersWithScores.sort((p1, p2) => { return p2.score - p1.score });
            var innerHtml = "";
            for (i = 0; i < playersWithScores.length; i++) {
                var playerWithScore = playersWithScores[i];
                innerHtml += "<div>" + playerWithScore.name + ": " + playerWithScore.score + "</div>";
            }
            this.scoreboardElement.innerHTML = innerHtml;
        }
    }

    export interface IPlayerWithScore {
        name: string;
        score:number;
    }
} 