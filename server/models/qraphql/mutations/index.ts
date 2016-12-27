import {GraphQLObjectType} from "graphql";
import MutationCreateCourse from "./create-course";
import MutationCreateQuestionSet from "./create-question-set";
import MutationCreateLinkedQuestion from "./create-linked-question";
import MutationCreateIndependentQuestion from "./create-independent-question";
import MutationDisplayQuestion from "./display-question";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All the different mutations (inserts / updates / deletes) available within application scope',
    fields: {
        createCourse: MutationCreateCourse,
        createQuestionSet: MutationCreateQuestionSet,
        createLinkedQuestion: MutationCreateLinkedQuestion,
        createIndependentQuestion: MutationCreateIndependentQuestion,
        displayQuestion: MutationDisplayQuestion
    }
});