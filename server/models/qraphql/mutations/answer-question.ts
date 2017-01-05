import {GraphQLString, GraphQLNonNull} from 'graphql'
import {questionRepository} from "../../question";
import ResponseType from "../types/response";
import {responseRepository} from "../../response";

const MutationAnswerQuestion = {
    type: ResponseType,
    description: "Answers a question from a course",
    args: {
        questionId: {
            name: 'questionId',
            type: new GraphQLNonNull(GraphQLString)
        },
        answer: {
            name: 'answer',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return questionRepository.findById(args.questionId)
            .then((question) => {
                if (!question) throw new Error('Question not found');

                return responseRepository.createResponse(question, context.user, args.answer);
            });
    }
};

export default MutationAnswerQuestion;