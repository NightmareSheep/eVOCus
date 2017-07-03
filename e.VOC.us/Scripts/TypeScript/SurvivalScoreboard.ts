module eVOCus {
    export class SurvivalScoreboard implements IServerObject {
        id: string;
        messages: string[];
        previousMessages: string[];
        scoreboardElement: JQuery;

        constructor(serverObj: any) {
            this.id = serverObj.id;
            this.scoreboardElement = $("#scoreboard");
        }

        update(gametime: number) {
        }

        synchronize(serverObj: any) {
            this.messages = serverObj.messages;
        }

        draw(canvas: Canvas) {
            
            if (this.messages !== this.previousMessages) {
                this.scoreboardElement.html("");
                for (let i = 0; i < this.messages.length; i++) {
                    this.scoreboardElement.append("<div>" + this.messages[i] + "</div>");
                }
            }
            this.previousMessages = this.messages;
        }

        dispose() {}
    }
} 