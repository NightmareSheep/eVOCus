/// <reference path="../typings/jquery/jquery.d.ts" />

interface SignalR {
    gameHub: GameHubProxy;
}
interface GameHubProxy {
    client: GameClient;
    server: GameServer;
}
interface GameClient {
    updateCounter: (number) => void;
    sync: (any) => void;
}
interface GameServer {
    send(name: string, message: string): JQueryPromise<void>;
}
