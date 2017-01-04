import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";

const MutationDisplayQuestion = {
    type: CourseType,
    description: "Displays a question in a course",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        },
        questionId: {
            name: 'questionId',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return courseRepository.displayQuestion(course, args.questionId);
            });
    }
};

export default MutationDisplayQuestion;
