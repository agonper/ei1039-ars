import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as log from 'winston';
import {AuthRouter} from "../routes/auth-router";
import {ServerConfig} from "../config/environment";

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

        app.use(morgan('combined'));

        app.use(express.static(path.resolve('dist', 'public')));

        app.use(bodyparser.urlencoded({ extended: false }));

        app.use(passport.initialize());
    }

    private addRoutes() {
        const app = this._app;

        app.use('/auth', AuthRouter(this));

        app.get('/api/:resource', (req: express.Request, res: express.Response) => {
            const { resource } = req.params;
            if (resource === 'hostname') {
                return res.send(`${this._config.http.host}`);
            }
            res.send(`Hello ${resource}!`)
        });

        app.use('*', (req: express.Request, res: express.Response) =>
            res.sendFile(path.resolve('dist', 'public', 'index.html'))
        );
    }

}
