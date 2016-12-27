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
        return courseRepository.findById(args.courseId).then((course) => {
            if (!course) throw new Error('Course not found');

            return course.populate('teacher').execPopulate().then((course: any) => {
                if (course.teacher._id.toString() !== context.user._id.toString()) {
                    throw new Error('Forbidden access');
                }
                return courseRepository.displayQuestion(course, args.questionId);
            });
        })
    }
};

export default MutationDisplayQuestion;
