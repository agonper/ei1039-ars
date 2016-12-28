import * as ws from 'ws';
import * as log from 'winston';
import {Server} from "http";

export class WebSocketServer {
    private _server: Server;
    private _wss: ws.Server;

    constructor(server: Server, path: string) {
        this._server = server;
        this._wss = new ws.Server({server, path});
    }

    public start() {
        this.configure();
        log.info("WebSocketServer: Initialized");
    }

    private configure() {
        const wss = this._wss;
        wss.on('connection', (ws) => {
            ws.on('message', (msg) => {
                log.info("WebSocketServer | Message received:", msg);
                ws.send("Pong!");
            });
        });
        log.info("WebSocketServer: Configured");
    }
}