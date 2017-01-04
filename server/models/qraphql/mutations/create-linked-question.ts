import {GraphQLString, GraphQLNonNull} from 'graphql'
import {courseRepository} from "../../course";
import QuestionSetType from "../types/question-set";
import InputQuestionType from "../types/input-question";
import {questionSetRepository} from "../../question-set";
import {questionRepository} from "../../question";

const MutationCreateLinkedQuestion = {
    type: QuestionSetType,
    description: "Creates a question, linked to a given course and question set",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        },
        questionSetId: {
            name: 'questionSetId',
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
                return questionSetRepository.findByIdIfFromCourse(args.questionSetId, course)
                    .then((questionSet) => {
                        if (!questionSet) throw new Error('Question set not found');

                        return questionRepository.createQuestion(questionSet, args.question)
                            .then((question) => questionSet);
                    });
            });
    }
};

export default MutationCreateLinkedQuestion;
