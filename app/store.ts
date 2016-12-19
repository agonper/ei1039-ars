import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

import {esTranslationStrings} from "./locales/es";


const intlInitialState = {
    defaultLocale: 'es',
    locale: 'es',
    messages: esTranslationStrings
};

const createStoreWithMiddleware = applyMiddleware(
    ReduxThunk
)(createStore);

export const applicationStore = createStoreWithMiddleware(reducers, {
    intl: intlInitialState
});