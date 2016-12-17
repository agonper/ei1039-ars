import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as morgan from 'morgan';
import * as log from 'winston';
import {AuthRouter} from '../routes/auth-router';
import {ServerConfig} from '../config/environment';
import {authChecker} from '../middlewares/auth-check';
import {ApiRouter} from '../routes/api-router';
import {PassportInitializer} from './passport';
import * as passport from 'passport';

export class Server {
    private _app: express.Application;
    private _config: ServerConfig;

    constructor(config: ServerConfig) {
        this._app = express();
        this._config = config;
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

        const http = this._config.http;

        this._app.listen(http.port);

        const protocol = this._config.http.secure ? 'https' : 'http';
        log.info(`(UJI | ARS) Server running at ${protocol}://${http.host}:${http.port}`);
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
        const authCheckMiddleware = authChecker(this._config);
        app.use('/api', passport.authenticate(['basic-login', 'jwt-login'], { session: false }));
    }

    private addRoutes() {
        const app = this._app;

        app.use('/auth', AuthRouter(this));

        app.use('/api', ApiRouter(this));

        app.use('*', (req: express.Request, res: express.Response) =>
            res.sendFile(path.resolve('dist', 'public', 'index.html'))
        );
    }

}
