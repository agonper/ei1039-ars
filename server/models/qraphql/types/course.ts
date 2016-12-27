import {GraphQLObjectType, GraphQLList} from "graphql";
import {GraphQLID} from "graphql";
import {GraphQLString} from "graphql";
import UserType from "./user";
import QuestionSetType from "./question-set";
import QuestionType from "./question";
import {Course} from "../../course";

const CourseType: any = new GraphQLObjectType({
    name: 'Course',
    description: 'The representation of a course on the system',
    fields: () => { // FIXME Access control
        return {
            id: {
                type: GraphQLID,
                resolve: course => course._id
            },
            name: {
                type: GraphQLString
            },
            createdAt: {
                type: GraphQLString,
                resolve: course => course.createdAt.toISOString()
            },
            teacher: {
                type: UserType,
                resolve: course => course.populate('teacher').execPopulate()
                    .then((course: Course) => course.teacher)
            },
            students: {
                type: new GraphQLList(UserType),
                resolve: course => course.populate('students').execPopulate()
                    .then((course: Course) => course.students)
            },
            questionSets: {
                type: new GraphQLList(QuestionSetType),
                resolve: course => course.populate({path: 'questionSets', options: {sort: {createdAt: -1}}}).execPopulate()
                    .then((course: Course) => course.questionSets)
            },
            displayedQuestion: {
                type: QuestionType,
                resolve: course => course.populate('displayedQuestion').execPopulate()
                    .then((course: Course) => course.displayedQuestion)
            }
        }
    }
});

export default CourseType;
