import * as passport from 'passport';
import * as express from 'express';
import {ServerConfig} from "../config/environment";
import {localLogin} from "./passport/local-login";

export class PassportInitializer {
    private _config: ServerConfig;

    constructor(config: ServerConfig) {
        this._config = config;
    }

    public start(app: express.Application) {
        app.use(passport.initialize());

        const localLoginStrategy = localLogin(this._config);

        passport.use('local-login', localLoginStrategy);
    }
}
