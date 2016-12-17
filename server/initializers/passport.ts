import * as passport from 'passport';
import * as express from 'express';
import {ServerConfig} from "../config/environment";
import {localLogin} from "./passport/local-login";
import {jwtLogin} from "./passport/jwt-login";
import {basicLogin} from "./passport/basic-login";

export class PassportInitializer {
    private _config: ServerConfig;

    constructor(config: ServerConfig) {
        this._config = config;
    }

    public start(app: express.Application) {
        app.use(passport.initialize());

        const localLoginStrategy = localLogin(this._config);
        const jwtLoginStrategy = jwtLogin(this._config);
        const basicLoginStrategy = basicLogin(this._config);

        passport.use('local-login', localLoginStrategy);
        passport.use('jwt-login', jwtLoginStrategy);
        passport.use('basic-login', basicLoginStrategy);
    }
}
