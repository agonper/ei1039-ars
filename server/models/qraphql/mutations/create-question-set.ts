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
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root: any, args: any, context: any) => {

        return courseRepository.findByIdIfOwner(args.courseId, context.user)
            .then((course) => {
                return questionSetRepository.createQuestionSet(course, args.name);
            });
    }
};

export default MutationCreateQuestionSet;
