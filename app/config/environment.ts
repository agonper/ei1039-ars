export interface AppConfig {
    rootUrl: string,
    urlShortenerBaseURL: string,
    gglAPIkey: string,
    qrGeneratorBaseURL: string
}

const developmentConfig: AppConfig = {
    rootUrl: 'http://localhost:8080',
    urlShortenerBaseURL: 'https://www.googleapis.com/urlshortener/v1/url',
    gglAPIkey: 'AIzaSyColYHxcP365GqWMi14Dx5Jhied0GK5uq0',
    qrGeneratorBaseURL: 'https://api.qrserver.com/v1/create-qr-code'
};

const testConfig: AppConfig = {
    rootUrl: 'http://localhost:8080',
    urlShortenerBaseURL: 'https://www.googleapis.com/urlshortener/v1/url',
    gglAPIkey: 'AIzaSyColYHxcP365GqWMi14Dx5Jhied0GK5uq0',
    qrGeneratorBaseURL: 'https://api.qrserver.com/v1/create-qr-code'
};

const productionConfig: AppConfig = {
    rootUrl: process.env.SERVER_URL || 'http://localhost:8080',
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
