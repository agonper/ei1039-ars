import {GraphQLNonNull, GraphQLString} from 'graphql';
import QuestionSetType from "../types/question-set";
import {questionSetRepository} from "../../question-set";

const QueryQuestionSet = {
    type: QuestionSetType,
    description: 'Fetch a question set by its id',
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return questionSetRepository.findById(args.id)
            .then((questionSet) => {
                if (!questionSet) throw new Error('Course not found');
                return questionSet;
            });
    }
};

export default QueryQuestionSet;

