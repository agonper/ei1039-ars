import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";

const MutationClearDisplayedQuestionSet = {
    type: CourseType,
    description: "Clears a displayed question set from a course",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return courseRepository.clearDisplayedQuestionSet(course);
            });
    }
};

export default MutationClearDisplayedQuestionSet;
