import {ServerConfig} from "../server";
import * as os from 'os';

const developmentConfig: ServerConfig = {
    db :{
        host: 'localhost',
        port: 27017,
        dbName: 'ei1039-ars-dev'
    },
    http: {
        host: os.hostname(),
        port: 3000,
        secure: false
    }
};

const testConfig: ServerConfig = {
    db :{
        host: 'localhost',
        port: 27017,
        dbName: 'ei1039-ars-dev'
    },
    http: {
        host: os.hostname(),
        port: 3000,
        secure: false
    }
};

const productionConfig: ServerConfig = {
    db :{
        host: 'localhost',
        port: 27017,
        dbName: 'ei1039-ars-dev'
    },
    http: {
        host: os.hostname(),
        port: process.env.PORT || 8080,
        secure: false
    }
};

export const configLoader = (env: string) => {
    switch(env) {
        case 'development':
            return developmentConfig;
        case 'test':
            return testConfig;
        default:
            return productionConfig;
    }
};

export const serverConfig = configLoader(process.env.NODE_ENV);