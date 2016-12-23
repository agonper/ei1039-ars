import {GenericAction} from "../actions/common";
import {
    LIST_COURSES_PENDING, LIST_COURSES_SUCCESS, LIST_COURSES_ERROR,
    CREATE_COURSE_SUCCESS
} from "../actions/courses";
import {CREATE_QUESTION_SET_SUCCESS} from "../actions/question-set";
import {dropWhile, takeWhile, drop, find} from 'lodash';
import {CREATE_QUESTION_SUCCESS, createLinkedQuestion} from "../actions/question";

export interface LimitedQuestion {
    id: string
    title: string
}

export interface LimitedQuestionSet {
    id: string,
    name: string,
    createdAt: string
    questions: LimitedQuestion[]
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
            const {id, name, createdAt, questions} = createQuestionSet;
            const questionSet: LimitedQuestionSet = {id, name, createdAt, questions};
            const courseId = createQuestionSet.course.id.toString();
            return createStateFrom(state, questionSet, courseId);
        case CREATE_QUESTION_SUCCESS:
            const data = action.payload.data;
            const rawQuestionSet = (data.createIndependentQuestion) ? data.createIndependentQuestion : data.createLinkedQuestion;
            const modifiedQuestionSet: LimitedQuestionSet = {
                id: rawQuestionSet.id,
                name: rawQuestionSet.name,
                createdAt: rawQuestionSet.createdAt,
                questions: rawQuestionSet.questions
            };
            const modifiedCourseId = rawQuestionSet.course.id.toString();
            return createStateFrom(state, modifiedQuestionSet, modifiedCourseId);
        default:
            return state;
    }
};

function createStateFrom(state: UserCoursesState, questionSet: LimitedQuestionSet, courseId: string) {
    const updatedCourse = find(state.courses, (course) => course.id === courseId);
    const notEqualsCourse = (course: LimitedCourse) => course.id !== updatedCourse.id;
    const rightCourses = takeWhile(state.courses, notEqualsCourse);
    const leftCourses = drop(dropWhile(state.courses, notEqualsCourse));

    // TODO review
    const notEqualsQuestionSet = (prevQuestionSet: LimitedQuestionSet) => prevQuestionSet.id !== questionSet.id;
    const rightQuestionSets = takeWhile(updatedCourse.questionSets, notEqualsQuestionSet);
    const leftQuestionSets = drop(dropWhile(updatedCourse.questionSets, notEqualsQuestionSet));

    return {
        ...state,
        courses: [
            ...rightCourses,
            {...updatedCourse, questionSets: [...leftQuestionSets, questionSet, ...rightQuestionSets]},
            ...leftCourses]};
}