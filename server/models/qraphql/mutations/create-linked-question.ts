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

        return courseRepository.findById(args.courseId)
            .then((course) => {
                if (!course) throw new Error('Course not found');

                return course.populate('teacher').execPopulate()
                    .then((course: any) => {
                        if (course.teacher._id.toString() !== context.user._id.toString()) {
                            throw new Error('Forbidden access');
                        }

                        return questionSetRepository.findById(args.questionSetId)
                            .then((questionSet) => {
                                if (!questionSet) throw new Error('Question set not found');

                                return questionRepository.createQuestion(questionSet, args.question)
                                    .then((question) => questionSet);
                            });
                    });
            });
    }
};

export default MutationCreateLinkedQuestion;
