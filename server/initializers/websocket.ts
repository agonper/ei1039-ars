import * as ws from 'ws';
import * as log from 'winston';
import {Server} from "http";
import {clientVerifier, configureWSConnection} from "../handlers/ws-connection-handlers";

export class WebSocketServer {
    private _server: Server;
    private _wss: ws.Server;

    constructor(server: Server, path: string) {
        this._server = server;
        this._wss = new ws.Server({server, path, verifyClient: clientVerifier});
    }

    public start() {
        this.configure();
        log.info("WebSocketServer: Initialized");
    }

    private configure() {
        configureWSConnection(this._wss);
    }
}