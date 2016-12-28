import * as express from 'express';
import {graphqlExpress, graphiqlExpress} from "graphql-server-express";
import appGraphQLSchema from "../models/qraphql/index";

export const createApiRouter = (): express.Router => {
    const router = express.Router();

    router.use('/graphql', graphqlExpress(request => ({
        schema: appGraphQLSchema,
        context: { user: request.user }
    })));

    router.use('/graphiql', graphiqlExpress({
        endpointURL: '/api/graphql'
    }));

    return router;
};
