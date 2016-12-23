import {GraphQLInputObjectType} from "graphql"
import {GraphQLList} from "graphql";
import {GraphQLNonNull} from "graphql";
import {GraphQLString} from "graphql";
import {GraphQLBoolean} from "graphql";

const InputAnswerType: any = new GraphQLInputObjectType({
    name: 'InputAnswer',
    description: 'The representation of an input answer part of an input question sent to the system',
    fields: {
        option: {
            type: new GraphQLNonNull(GraphQLString)
        },
        text: {
            type: GraphQLString
        },
        isCorrect: {
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    }
});

const InputQuestionType: any = new GraphQLInputObjectType({
    name: 'InputQuestion',
    description: 'The representation of an input question that enters to the system',
    fields: () => {
        return {
            title: {
                type: GraphQLString
            },
            answers: {
                type: new GraphQLList(InputAnswerType)
            }
        }
    }
});

export default InputQuestionType;

