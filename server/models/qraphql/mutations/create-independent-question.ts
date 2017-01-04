import {GraphQLString, GraphQLNonNull} from 'graphql'
import {courseRepository} from "../../course";
import QuestionSetType from "../types/question-set";
import InputQuestionType from "../types/input-question";
import {questionSetRepository} from "../../question-set";
import {questionRepository} from "../../question";

const MutationCreateIndependentQuestion = {
    type: QuestionSetType,
    description: "Creates a question, linked to a today's no named question set",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        },
        question: {
            name: 'question',
            type: new GraphQLNonNull(InputQuestionType)
        }
    },
    resolve: (root: any, args: any, context: any) => {

        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {

                return questionSetRepository.findNoNamedOfToday(args.courseId)
                    .then((questionSet) => {
                        if (!questionSet) {
                            return questionSetRepository.createQuestionSet(course, "")
                                .then((questionSet) => {
                                    return questionRepository.createQuestion(questionSet, args.question)
                                        .then((question: any) => questionSet);
                                });
                        }

                        return questionRepository.createQuestion(questionSet, args.question)
                            .then((question: any) => questionSet);
                    });
            });
    }
};

export default MutationCreateIndependentQuestion;
