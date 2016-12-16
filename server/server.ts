import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as log from 'winston';


export interface DBConfig {
    host: string,
    port: number,
    dbName: string
}

export interface HttpConfig {
    host: string,
    port: number,
    secure: boolean
}

export interface ServerConfig {
    db: DBConfig,
    http: HttpConfig
}

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
    }

    private addRoutes() {
        const app = this._app;

        app.get('/api/:resource', (req: express.Request, res: express.Response) => {
            const { resource } = req.params;
            if (resource === 'hostname') {
                return `${this._config.http.host}`;
            }
            res.send(`Hello ${resource}!`)
        });

        app.use('*', (req: express.Request, res: express.Response) =>
            res.sendFile(path.resolve('dist', 'public', 'index.html'))
        );
    }

}
