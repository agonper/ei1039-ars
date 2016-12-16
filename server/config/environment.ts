import {ServerConfig} from "../server";

enum Environment {

}

const developmentConfig: ServerConfig = {
    db :{
        host: 'localhost',
        port: 27017,
        dbName: 'ei1039-ars-dev'
    },
    http: {
        port: 3000,
        secure: false
    }
};

const testConfig: ServerConfig = developmentConfig;
const productionConfig: ServerConfig = developmentConfig;

export const configLoader = () => {
    const environment = process.env.NODE_ENV;
    switch(environment) {
        case 'development':
            return developmentConfig;
        case 'test':
            return testConfig;
        case 'production':
            return productionConfig;
    }
};
