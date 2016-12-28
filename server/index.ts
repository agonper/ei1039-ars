import {AppServer} from "./initializers/express";
import {serverConfig} from "./config/environment";
import {DbInitializer} from "./initializers/database";
import * as log from 'winston';
import * as http from 'http';
import {WebSocketServer} from "./initializers/websocket";

const server = http.createServer();

const dbInitializer = new DbInitializer(serverConfig);

dbInitializer.start().then(() => {
    const webSocketServer = new WebSocketServer(server, '/api/ws');
    webSocketServer.start();

    const appServer = new AppServer(serverConfig, server);
    appServer.start();

    const {port, secure, host} = serverConfig.http;

    server.listen(port, () => {
        log.info(`UJI | ARS: Server running at ${secure ? 'https' : 'http'}://${host}:${port}`);
    });
});
