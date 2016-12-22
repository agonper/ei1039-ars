import {GraphQLString, GraphQLNonNull} from 'graphql'
import CourseType from "../types/course";
import {courseRepository} from "../../course";
import {questionSetRepository} from "../../question-set";
import QuestionSetType from "../types/question-set";

const MutationCreateQuestionSet = {
    type: QuestionSetType,
    description: "Creates a question set, linked to a given course",
    args: {
        courseId: {
            name: 'courseId',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: GraphQLString
        }
    },
    resolve: (root: any, args: any, context: any) => {
        return courseRepository.findById(args.courseId)
            .then((course) => {
                if (!course) throw new Error('Course not found');
                return course.populate('teacher').execPopulate()
                    .then((course: any) => {
                        if (course.teacher._id.toString() !== context.user._id.toString()) {
                            throw new Error('Forbidden access');
                        }
                        return questionSetRepository.createQuestionSet(course, args.name);
                    });
            });
    }
};

export default MutationCreateQuestionSet;
