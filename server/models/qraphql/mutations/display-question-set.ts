import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";

const MutationDisplayQuestionSet = {
    type: CourseType,
    description: "Displays a question set in a course to show a summary mainly",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        },
        questionSetId: {
            name: 'questionSetId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return courseRepository.displayQuestionSet(course, args.questionSetId);
            });
    }
};

export default MutationDisplayQuestionSet;
