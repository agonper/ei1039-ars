import {GenericAction} from "../actions/common";
import {FETCH_COURSE_PENDING, FETCH_COURSE_SUCCESS, FETCH_COURSE_ERROR} from "../actions/course";

export interface BasicStudent {
    name: string,
    email: string
}

export interface SelectedCourse {
    id: string
    name: string
    showStats: boolean
    students: BasicStudent[]
}

export interface SelectedCourseState {
    fetching: boolean,
    course: SelectedCourse,
    error: any
}

const INITIAL_STATE: SelectedCourseState = {
    fetching: false,
    course: undefined,
    error: undefined
};

export const SelectedCourseReducer = (state: SelectedCourseState = INITIAL_STATE, action: GenericAction): SelectedCourseState => {
    switch (action.type) {
        case FETCH_COURSE_PENDING:
            return {...state, fetching: true};
        case FETCH_COURSE_SUCCESS:
            const course = action.payload.data.course;
            return {fetching: false, course, error: undefined};
        case FETCH_COURSE_ERROR:
            return {fetching: false, course: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};
