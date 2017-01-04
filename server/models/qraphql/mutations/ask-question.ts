import {GraphQLString, GraphQLNonNull} from 'graphql'
import QuestionType from "../types/question";
import {courseRepository} from "../../course";
import {questionRepository} from "../../question";

const MutationAskQuestion = {
    type: QuestionType,
    description: "Asks a question from a course",
    args: {
        questionId: {
            name: 'questionId',
            type: new GraphQLNonNull(GraphQLString)
        },
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return questionRepository.askQuestion(args.questionId, course);
            });
    }
};

export default MutationAskQuestion;
