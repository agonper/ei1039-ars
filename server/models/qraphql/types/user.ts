import {GraphQLObjectType} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";

const UserType = new GraphQLObjectType({
    name: 'user',
    description: 'The representation of a user on the system',
    fields: {
        id: {
            type: GraphQLID,
            resolve: user => user._id
        },
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    }
});

export default UserType;