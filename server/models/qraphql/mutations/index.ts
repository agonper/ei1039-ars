import {GraphQLObjectType} from "graphql";
import MutationCreateCourse from "./create-course";
import MutationCreateQuestionSet from "./create-question-set";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All the different mutations (inserts / updates / deletes) available within application scope',
    fields: {
        createCourse: MutationCreateCourse,
        createQuestionSet: MutationCreateQuestionSet
    }
});