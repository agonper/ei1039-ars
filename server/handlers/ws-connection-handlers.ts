
import {userRepository} from "../models/user";
import * as log from "winston";
import {IncomingMessage} from "http";
import {serverConfig} from "../config/environment";
import * as url from "url";
import * as jwt from "jsonwebtoken";
import * as ws from 'ws';
import {wsClientHandler} from "./ws-client-handler";

export const configureWSConnection = (wss: ws.Server) => {
    wss.on('connection', (ws) => {

        const token = getTokenFromRequest(ws.upgradeReq);

        getEmailFromToken(token).then((email) => {
            userRepository.findByEmail(email).then((user) => {
                log.info("WebSocketServer | User connected: ", user.email);

                wsClientHandler(ws, user);
            });
        });

    });
    log.info("WebSocketServer: Configured");
};

export const clientVerifier = (options: any, cb: any) => {
    const token = getTokenFromRequest(options.req);
    if (!token) return cb(false, 400, "Bad request");

    getEmailFromToken(token).then((email) => {

        userRepository.findByEmail(email).then((user) => {

            if (!user) {
                return cb(false);
            }

            return cb(true);
        }).catch((err) => {
            log.error(`WebSocketServer: Error fetching user by email: ${email}`, err);
            return cb(false);
        })
    }).catch(() => cb(false));
};

function getTokenFromRequest(req: IncomingMessage) {
    const origUrl = url.parse(req.url, true /* Parse query as object */);
    return origUrl.query.token;
}

function getEmailFromToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, serverConfig.jwtSecret, (err: any, decoded: any) => {

            if (err) {
                log.error(`JWT Decoder | Error verifying token: ${token}`, err);
                return reject();
            }
            resolve(decoded.sub);
        })
    });
}