import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";

const MutationCreateCourse = {
    type: CourseType,
    description: "Creates a course, linked to the currently logged user if the user is a teacher",
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.createCourse(context.user, args.name);
    }
};

export default MutationCreateCourse;
