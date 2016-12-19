import * as os from 'os';

export interface DBConfig {
    dbUri: string
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
        dbUri: 'mongodb://localhost:27017/ei1039-ars-dev'
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
        dbUri: 'mongodb://localhost:27017/ei1039-ars-test'
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
        dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ei1039-ars-prod'
    },
    http: {
        host: process.env.SERVER_HOSTNAME || os.hostname(),
        port: process.env.PORT || 8080,
        secure: true
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