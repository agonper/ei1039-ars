import {GraphQLObjectType} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import CourseType from "./course";

const QuestionSetType: any = new GraphQLObjectType({
    name: 'QuestionSet',
    description: 'The representation of a question set on the system',
    fields: () => { // FIXME Access control
        return {
            id: {
                type: GraphQLID,
                resolve: questionSet => questionSet._id
            },
            name: {
                type: GraphQLString
            },
            createdAt: {
                type: GraphQLString,
                resolve: questionSet => questionSet.createdAt.toISOString()
            },
            course: {
                type: CourseType,
                resolve: questionSet => questionSet.populate('course').execPopulate()
                    .then((questionSet: any) => questionSet.course)
            }
        }
    }
});

export default QuestionSetType;
