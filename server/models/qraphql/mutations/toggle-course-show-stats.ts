import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";

const MutationToggleCourseShowStats = {
    type: CourseType,
    description: "Toggles showing statistics from a course",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return courseRepository.toggleShowStats(course);
            });
    }
};

export default MutationToggleCourseShowStats;

