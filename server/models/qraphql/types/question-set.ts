import {GraphQLObjectType} from "graphql";
import {GraphQLList} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import CourseType from "./course";
import QuestionType from "./question";

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
            },
            questions: {
                type: new GraphQLList(QuestionType),
                resolve: questionSet => questionSet.populate({path: 'questions', options: {sort: {createdAt: 1}}}).execPopulate()
                    .then((questionSet: any) => questionSet.questions)
            }
        }
    }
});

export default QuestionSetType;
