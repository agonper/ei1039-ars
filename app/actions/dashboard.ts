import {Action} from "redux";
import {GenericAction} from "./common";
import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../reducers/index";
import {fetchCourse} from "./courses";
import {fetchQuestionSet} from "./question-set";

export const TOGGLE_ADD_COURSE_MODAL = 'TOGGLE_ADD_COURSE_MODAL';
export const TOGGLE_ADD_QUESTION_SET_MODAL = 'TOGGLE_ADD_QUESTION_SET_MODAL';
export const SELECT_COURSE = 'SELECT_COURSE';
export const SELECT_QUESTION_SET = 'SELECT_QUESTION_SET';

export function toggleAddCourseModal(): Action {
    return {
        type: TOGGLE_ADD_COURSE_MODAL
    }
}

export function toggleAddQuestionSetModal(): Action {
    return {
        type: TOGGLE_ADD_QUESTION_SET_MODAL
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

function questionSetSelection(questionSetId: string): GenericAction {
    return {
        type: SELECT_QUESTION_SET,
        payload: {questionSetId}
    }
}

export const selectQuestionSet = (questionSetId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: any) => {
        dispatch(fetchQuestionSet(questionSetId));
        dispatch(questionSetSelection(questionSetId))
    }
};