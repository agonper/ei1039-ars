import {GenericAction} from "../actions/common";
import {
    LIST_COURSES_PENDING, LIST_COURSES_SUCCESS, LIST_COURSES_ERROR,
    CREATE_COURSE_SUCCESS
} from "../actions/courses";
import {CREATE_QUESTION_SET_SUCCESS} from "../actions/question-set";
import {dropWhile, takeWhile, drop, find} from 'lodash';

export interface LimitedQuestionSet {
    id: string,
    name: string,
    createdAt: string
}

export interface LimitedCourse {
    id: string,
    name: string,
    questionSets: LimitedQuestionSet[]
}

export interface UserCoursesState {
    fetching: boolean
    courses: LimitedCourse[],
    error: any
}

const INITIAL_SATE: UserCoursesState = {
    fetching: false,
    courses: [],
    error: undefined
};

export const UserCoursesReducer = (state: UserCoursesState = INITIAL_SATE, action: GenericAction ): UserCoursesState =>{
    switch (action.type) {
        case LIST_COURSES_PENDING:
            return {...state, fetching: true};
        case LIST_COURSES_SUCCESS:
            const courses = action.payload.data.userCourses;
            return {fetching: false, courses, error: undefined};
        case LIST_COURSES_ERROR:
            return {fetching: false, courses: [], error: action.error.errors};
        case CREATE_COURSE_SUCCESS:
            const course = action.payload.data.createCourse;
            return {...state, courses: [course, ...state.courses]};
        case CREATE_QUESTION_SET_SUCCESS:
            const createQuestionSet = action.payload.data.createQuestionSet;
            const {id, name, createdAt} = createQuestionSet;
            const questionSet: LimitedQuestionSet = {id, name, createdAt};

            const courseId = createQuestionSet.course.id.toString();
            const updatedCourse = find(state.courses, (course) => course.id === courseId);
            const notEqualsCourse = (course: LimitedCourse) => course.id !== updatedCourse.id;
            const rightCourses = takeWhile(state.courses, notEqualsCourse);
            const leftCourses = drop(dropWhile(state.courses, notEqualsCourse));

            return {
                ...state,
                courses: [
                    ...rightCourses,
                    {...updatedCourse, questionSets: [questionSet, ...updatedCourse.questionSets]},
                    ...leftCourses]};
        default:
            return state;
    }
};