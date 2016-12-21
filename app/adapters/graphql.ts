import {ApolloClient, createNetworkInterface} from 'apollo-client';
import {applicationStore} from '../store';

const networkInterface = createNetworkInterface({uri: '/api/graphql'});

networkInterface.use([{
    applyMiddleware(req, next) {

        const state = applicationStore.getState();
        const token = state.login.token;

        req.options.headers = token ? {'Authorization': `JWT ${token}`} : {};
        next();
    }
}]);

export const apolloClient = new ApolloClient({
    networkInterface
});