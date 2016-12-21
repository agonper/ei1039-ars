import {GraphQLObjectType, GraphQLList} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import CourseType from "./courses";

const UserType: any = new GraphQLObjectType({
    name: 'User',
    description: 'The representation of a user on the system',
    fields: () => { // FIXME Access control
        return {
            id: {
                type: GraphQLID,
                resolve: user => user._id
            },
            email: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            courses: {
                type: new GraphQLList(CourseType),
                resolve: user => user.populate('courses').execPopulate()
                    .then((user: any) => user.courses)
            }
        }
    }
});

export default UserType;