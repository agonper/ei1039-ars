import {GraphQLSchema} from 'graphql';
import {MutationType} from "./mutations/index";
import QueryType from "./queries/index";

const appGraphQLSchema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

export default appGraphQLSchema;
