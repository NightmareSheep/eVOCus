/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="GameState.ts" />

interface SignalR {
    gameHub: GameHubProxy;
}
interface GameHubProxy {
    client: GameClient;
    server: GameServer;
}
interface GameClient {
    updateCounter: (number) => void;
    sync: (state:eVOCus.GameState) => void;
}
interface GameServer {
    send(name: string, message: string): JQueryPromise<void>;
}
