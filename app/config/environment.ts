export interface AppConfig {
    rootUrl: string
}

const developmentConfig: AppConfig = {
    rootUrl: ''
};

const testConfig: AppConfig = {
    rootUrl: ''
};

const productionConfig: AppConfig = {
    rootUrl: ''
};

export const appConfigLoader = (): AppConfig => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return developmentConfig;
        case 'test':
            return testConfig;
        default:
            return productionConfig;
    }
};
