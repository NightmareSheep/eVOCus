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
    RegisterId: (string) => void;
    sync: (state:eVOCus.InputGameState) => void;
}
interface GameServer {
    send(name: string, message: string): JQueryPromise<void>;
    keyboardInput(key: number, state: string) : JQueryPromise<void>;
}
