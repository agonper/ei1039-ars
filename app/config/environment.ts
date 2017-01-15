export interface AppConfig {
    rootUrl: string,
    wsUrl: string,
    urlShortenerBaseURL: string,
    gglAPIkey: string,
    qrGeneratorBaseURL: string
}

const developmentConfig: AppConfig = {
    rootUrl: process.env.SERVER_HOSTNAME ? `http://${process.env.SERVER_HOSTNAME}` : 'http://localhost:8080',
    wsUrl: process.env.SERVER_HOSTNAME ? `ws://${process.env.SERVER_HOSTNAME}` : 'ws://localhost:3000',
    urlShortenerBaseURL: 'https://www.googleapis.com/urlshortener/v1/url',
    gglAPIkey: 'AIzaSyColYHxcP365GqWMi14Dx5Jhied0GK5uq0',
    qrGeneratorBaseURL: 'https://api.qrserver.com/v1/create-qr-code'
};

const testConfig: AppConfig = {
    rootUrl: process.env.SERVER_HOSTNAME ? `http://${process.env.SERVER_HOSTNAME}` : 'http://localhost:8080',
    wsUrl: process.env.SERVER_HOSTNAME ? `ws://${process.env.SERVER_HOSTNAME}` : 'ws://localhost:3000',
    urlShortenerBaseURL: 'https://www.googleapis.com/urlshortener/v1/url',
    gglAPIkey: 'AIzaSyColYHxcP365GqWMi14Dx5Jhied0GK5uq0',
    qrGeneratorBaseURL: 'https://api.qrserver.com/v1/create-qr-code'
};

const productionConfig: AppConfig = {
    rootUrl: process.env.SERVER_HOSTNAME ? `https://${process.env.SERVER_HOSTNAME}` : 'http://localhost:8080',
    wsUrl: process.env.SERVER_HOSTNAME ? `wss://${process.env.SERVER_HOSTNAME}` : 'ws://localhost:8080',
    urlShortenerBaseURL: 'https://www.googleapis.com/urlshortener/v1/url',
    gglAPIkey: 'AIzaSyColYHxcP365GqWMi14Dx5Jhied0GK5uq0',
    qrGeneratorBaseURL: 'https://api.qrserver.com/v1/create-qr-code'
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

export const appConfig = appConfigLoader();
