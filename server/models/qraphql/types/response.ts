import {GraphQLObjectType} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import QuestionType from "./question";
import {Response} from "../../response";
import UserType from "./user";

const ResponseType: any = new GraphQLObjectType({
    name: 'Response',
    description: 'The representation of a response from a user to a question',
    fields: () => { // FIXME Access control
        return {
            id: {
                type: GraphQLID,
                resolve: response => response._id
            },
            option: {
                type: GraphQLString
            },
            answeredAt: {
                type: GraphQLString,
                resolve: response => response.answeredAt.toISOString()
            },
            student: {
                type: UserType,
                resolve: response => response.populate('student').execPopulate()
                    .then((response: Response) => response.student)
            },
            question: {
                type: QuestionType,
                resolve: response => response.populate('question').execPopulate()
                    .then((response: Response) => response.question)
            }
        }
    }
});

export default ResponseType;
