import {GraphQLObjectType, GraphQLList} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import UserType from "./user";

const CourseType: any = new GraphQLObjectType({
    name: 'Course',
    description: 'The representation of a course on the system',
    fields: () => { // FIXME Access control
        return {
            id: {
                type: GraphQLID,
                resolve: course => course._id
            },
            name: {
                type: GraphQLString
            },
            teacher: {
                type: UserType,
                resolve: course => course.populate('teacher').execPopulate()
                    .then((course: any) => course.teacher)
            },
            students: {
                type: new GraphQLList(UserType),
                resolve: course => course.populate('students').execPopulate()
                    .then((course: any) => course.students)
            }
        }
    }
});

export default CourseType;
