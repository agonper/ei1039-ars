import {LimitedCourse} from "./user-courses";
import {GenericAction} from "../actions/common";
import {CREATE_COURSE_PENDING, CREATE_COURSE_SUCCESS, CREATE_COURSE_ERROR} from "../actions/course";

export interface CreateCourseState {
    creating: boolean,
    course: LimitedCourse
    error: any
}

const INITIAL_STATE: CreateCourseState = {
    creating: false,
    course: undefined,
    error: undefined
};

export const CreateCourseReducer = (state: CreateCourseState = INITIAL_STATE, action: GenericAction): CreateCourseState => {
    switch (action.type) {
        case CREATE_COURSE_PENDING:
            return {...state, creating: true};
        case CREATE_COURSE_SUCCESS:
            const course = action.payload.data.createCourse;
            return {creating: false, course, error: undefined};
        case CREATE_COURSE_ERROR:
            return {creating: false, course: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};
