import {Action} from "redux";
import {GenericAction} from "./common";
import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../reducers/index";
import {fetchCourse} from "./courses";

export const TOGGLE_ADD_COURSE_MODAL = 'TOGGLE_ADD_COURSE_MODAL';
export const SELECT_COURSE = 'SELECT_COURSE';

export function toggleAddCourseModal(): Action {
    return {
        type: TOGGLE_ADD_COURSE_MODAL
    }
}

function courseSelection(courseId: string): GenericAction {
    return {
        type: SELECT_COURSE,
        payload: {courseId}
    }
}

export const selectCourse = (courseId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: any) => {
        dispatch(fetchCourse(courseId));
        dispatch(courseSelection(courseId))
    }
};