import {GraphQLObjectType} from "graphql";
import MutationCreateCourse from "./create-course";
import MutationCreateQuestionSet from "./create-question-set";
import MutationCreateLinkedQuestion from "./create-linked-question";
import MutationCreateIndependentQuestion from "./create-independent-question";
import MutationDisplayQuestion from "./display-question";
import MutationClearDisplayedQuestion from "./clear-displayed-question";
import MutationAskQuestion from "./ask-question";
import MutationStopAskingQuestion from "./stop-asking-question";
import MutationAnswerQuestion from "./answer-question";
import MutationToggleCourseShowStats from "./toggle-course-show-stats";
import MutationDisplayQuestionSet from "./display-question-set";
import MutationClearDisplayedQuestionSet from "./clear-displayed-question-set";

export const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'All the different mutations (inserts / updates / deletes) available within application scope',
    fields: {
        createCourse: MutationCreateCourse,
        createQuestionSet: MutationCreateQuestionSet,
        createLinkedQuestion: MutationCreateLinkedQuestion,
        createIndependentQuestion: MutationCreateIndependentQuestion,
        toggleCourseShowStats: MutationToggleCourseShowStats,
        displayQuestion: MutationDisplayQuestion,
        clearDisplayedQuestion: MutationClearDisplayedQuestion,
        displayQuestionSet: MutationDisplayQuestionSet,
        clearDisplayedQuestionSet: MutationClearDisplayedQuestionSet,
        askQuestion: MutationAskQuestion,
        stopAskingQuestion: MutationStopAskingQuestion,
        answerQuestion: MutationAnswerQuestion
    }
});