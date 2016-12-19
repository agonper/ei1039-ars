import * as mongoose from 'mongoose';
import * as log from 'winston';
import {ServerConfig} from "../config/environment";
import {initializeModels} from "../models/index";

export class DbInitializer {
    private _config: ServerConfig;
    private _db: mongoose.Connection;

    constructor(config: ServerConfig) {
        (<any>mongoose).Promise = global.Promise;
        this._config = config;
    }

    public start(): Promise<any> {
        return mongoose.connect(this._config.db.dbUri).then(() => {
            this._db = mongoose.connection;
            return initializeModels();
        }).catch((err) => {
            log.error("Couldn't open database connection");
            return Promise.reject(err);
        });
    }
}