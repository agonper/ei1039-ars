import * as mongoose from 'mongoose';
import * as log from 'winston';
import {ServerConfig} from "../config/environment";

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
        }).catch((err) => {
            log.error("Couldn't open database connection");
            return Promise.reject(err);
        });
    }
}