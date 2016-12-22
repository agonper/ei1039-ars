import CourseType from "../types/course";
import {courseRepository} from "../../course";
import {GraphQLNonNull, GraphQLString} from 'graphql';

const QueryCourse = {
    type: CourseType,
    description: 'Fetch a course by its id',
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findById(args.id)
            .then((course) => {
                if (!course) throw new Error('Course not found');
                return course;
            });
    }
};

export default QueryCourse;

