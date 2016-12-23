import {GraphQLNonNull, GraphQLString} from 'graphql';
import QuestionSetType from "../types/question-set";
import {questionSetRepository} from "../../question-set";
import QuestionType from "../types/question";
import {questionRepository} from "../../question";

const QueryQuestion = {
    type: QuestionType,
    description: 'Fetch a question by its id',
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return questionRepository.findById(args.id)
            .then((question) => {
                if (!question) throw new Error('Question not found');
                return question;
            });
    }
};

export default QueryQuestion;

