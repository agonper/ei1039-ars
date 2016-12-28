import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as morgan from 'morgan';
import * as log from 'winston';
import {createAuthRouter} from '../routes/auth-router';
import {ServerConfig} from '../config/environment';
import {createApiRouter} from '../routes/api-router';
import {PassportInitializer} from './passport';
import * as passport from 'passport';
import {Server} from "http";

export class AppServer {
    private _app: express.Application;
    private _config: ServerConfig;
    private _server: Server;

    constructor(config: ServerConfig, server: Server) {
        this._app = express();
        this._config = config;
        this._server = server;
    }

    public get app() {
        return this._app;
    }

    public get config() {
        return this._config;
    }

    public start() {
        this.configure();
        this.addRoutes();

        this._server.on('request', this._app);
        log.info("ExpressApp: Initialized");
    }

    private configure() {
        const app = this._app;

        // Route logger
        app.use(morgan('combined'));

        // Serve public files from /
        app.use(express.static(path.resolve('dist', 'public')));

        // Enable JSON body parser for post requests
        app.use(bodyparser.json());

        const passportInitializer = new PassportInitializer(this.config);
        passportInitializer.start(app);

        // Protect /api with token access
        app.use('/api', passport.authenticate(['basic-login', 'jwt-login'], { session: false }));

        log.info("ExpressApp: Configured");
    }

    private addRoutes() {
        const app = this._app;

        app.use('/auth', createAuthRouter());

        app.use('/api', createApiRouter());

        app.use('*', (req: express.Request, res: express.Response) =>
            res.sendFile(path.resolve('dist', 'public', 'index.html'))
        );

        log.info("ExpressApp: Routes added");
    }

}
