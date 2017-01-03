import * as WebSocket from "ws";
import {User} from "../models/user";
import * as log from "winston";

export const wsClientHandler = (ws: WebSocket, user: User) => {
    ws.on('message', (msg) => {
        log.info("WebSocketServer | Message received: ", msg);
        ws.send("Pong!");
    });

    ws.on('close', () => {
        log.info("WebSocketServer | Client disconnected: ", user.email);
    });
};
