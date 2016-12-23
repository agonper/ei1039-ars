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

        return courseRepository.findById(args.courseId)
            .then((course) => {
                if (!course) throw new Error('Course not found');

                return course.populate('teacher').execPopulate()
                    .then((course: any) => {
                        if (course.teacher._id.toString() !== context.user._id.toString()) {
                            throw new Error('Forbidden access');
                        }

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
            });
    }
};

export default MutationCreateIndependentQuestion;
