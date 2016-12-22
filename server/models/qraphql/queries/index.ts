import QueryCurrentUser from "./current-user";
import {GraphQLObjectType} from "graphql";
import QueryUserCourses from "./user-courses";
import QueryCourse from "./course";
import QueryQuestionSet from "./question-set";

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Contains all system fetch operations',
    fields: {
        currentUser: QueryCurrentUser,
        userCourses: QueryUserCourses,
        course: QueryCourse,
        questionSet: QueryQuestionSet
    }
});

export default QueryType;