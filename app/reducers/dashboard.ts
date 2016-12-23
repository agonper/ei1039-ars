import {GenericAction} from "../actions/common";
import {
    TOGGLE_ADD_COURSE_MODAL, SELECT_COURSE, TOGGLE_ADD_QUESTION_SET_MODAL,
    SELECT_QUESTION_SET, TOGGLE_ADD_QUESTION_MODAL
} from "../actions/dashboard";

export interface DashboardState {
    showAddCourseModal: boolean,
    showAddQuestionSetModal: boolean,
    showAddQuestionModal: boolean,
    isItemSelected: boolean,
    selectedItemType: string,
    selectedItemId: string
}

const INITIAL_STATE: DashboardState = {
    showAddCourseModal: false,
    showAddQuestionSetModal: false,
    showAddQuestionModal: false,
    isItemSelected: false,
    selectedItemType: undefined,
    selectedItemId: undefined
};

export const DashboardReducer = (state: DashboardState = INITIAL_STATE, action: GenericAction): DashboardState => {
    switch (action.type) {
        case TOGGLE_ADD_COURSE_MODAL:
            return {...state, showAddCourseModal: !state.showAddCourseModal};
        case TOGGLE_ADD_QUESTION_SET_MODAL:
            return {...state, showAddQuestionSetModal: !state.showAddQuestionSetModal};
        case TOGGLE_ADD_QUESTION_MODAL:
            return {...state, showAddQuestionModal: !state.showAddQuestionModal};
        case  SELECT_COURSE:
            const {courseId} = action.payload;
            return {...state, isItemSelected: true, selectedItemType: 'course', selectedItemId: courseId};
        case SELECT_QUESTION_SET:
            const {questionSetId} = action.payload;
            return {...state, isItemSelected: true, selectedItemType: 'question-set', selectedItemId: questionSetId};
        default:
            return state;
    }
};
