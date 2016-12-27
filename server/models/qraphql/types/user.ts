import {GraphQLObjectType, GraphQLList} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import CourseType from "./course";
import {User} from "../../user";

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
                resolve: user => user.populate({path: 'courses', options: {sort: {createdAt: -1}}}).execPopulate()
                    .then((user: User) => user.courses)
            }
        }
    }
});

export default UserType;