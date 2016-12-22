import QueryCurrentUser from "./current-user";
import {GraphQLObjectType} from "graphql";
import QueryUserCourses from "./user-courses";
import QueryCourse from "./course";

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Contains all system fetch operations',
    fields: {
        currentUser: QueryCurrentUser,
        userCourses: QueryUserCourses,
        course: QueryCourse
    }
});

export default QueryType;