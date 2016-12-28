import * as ws from 'ws';
import * as log from 'winston';
import {Server} from "http";
import * as jwt from 'jsonwebtoken';
import {serverConfig} from "../config/environment";
import {userRepository} from "../models/user";

export class WebSocketServer {
    private _server: Server;
    private _wss: ws.Server;

    constructor(server: Server, path: string) {
        this._server = server;
        this._wss = new ws.Server({server, path, verifyClient});
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

const verifyClient = (options: any, cb: any) => {
    const authHeader = options.req.headers['Authorization'];
    if (!authHeader) return cb(false);

    const headerParts = authHeader.split(' ');
    if (headerParts[0] !== 'JWT') return cb(false, 400, "Bad request");

    const token = headerParts[1];
    jwt.verify(token, serverConfig.jwtSecret, (err: any, decoded: any) => {

        if (err) {
            log.error(`WebSocketServer: Error verifying token: ${token}`, err);
            return cb(false);
        }

        const email = decoded.sub;
        userRepository.findByEmail(email).then((user) => {

            if (!user) {
                return cb(false);
            }

            return cb(true);
        }).catch((err) => {
            log.error(`WebSocketServer: Error fetching user by email: ${email}`, err);
            return cb(false);
        })
    })
};