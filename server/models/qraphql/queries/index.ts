import QueryCurrentUser from "./current-user";
import {GraphQLObjectType} from "graphql";
import QueryUserCourses from "./user-courses";

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Contains all system fetch operations',
    fields: {
        currentUser: QueryCurrentUser,
        userCourses: QueryUserCourses
    }
});

export default QueryType;