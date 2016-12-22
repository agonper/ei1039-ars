import {GenericAction} from "../actions/common";
import {
    LIST_COURSES_PENDING, LIST_COURSES_SUCCESS, LIST_COURSES_ERROR,
    CREATE_COURSE_SUCCESS
} from "../actions/courses";

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
        default:
            return state;
    }
};