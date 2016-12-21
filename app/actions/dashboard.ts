import {Action} from "redux";

export const TOGGLE_ADD_COURSE_MODAL = 'TOGGLE_ADD_COURSE_MODAL';

export function toggleAddCourseModal(): Action {
    return {
        type: TOGGLE_ADD_COURSE_MODAL
    }
}