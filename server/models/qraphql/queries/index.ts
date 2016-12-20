import QueryCurrentUser from "./current-user";
import {GraphQLObjectType} from "graphql";

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Contains all system fetch operations',
    fields: {
        currentUser: QueryCurrentUser
    }
});

export default QueryType;