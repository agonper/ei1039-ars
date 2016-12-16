import * as os from 'os';

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
    http: HttpConfig,
    jwtSecret: string
}

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
    },
    jwtSecret: 'agdc-ei1039-ars'
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
    },
    jwtSecret: 'agdc-ei1039-ars'
};

const productionConfig: ServerConfig = {
    db :{
        host: 'localhost',
        port: 27017,
        dbName: 'ei1039-ars-dev'
    },
    http: {
        host: process.env.SERVER_HOSTNAME || os.hostname(),
        port: process.env.PORT || 8080,
        secure: false
    },
    jwtSecret: 'agdc-ei1039-ars'
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