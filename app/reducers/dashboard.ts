import {GenericAction} from "../actions/common";
import {TOGGLE_ADD_COURSE_MODAL, SELECT_COURSE} from "../actions/dashboard";

export interface DashboardState {
    showAddCourseModal: boolean,
    isItemSelected: boolean,
    selectedItemType: string,
    selectedItemId: string
}

const INITIAL_STATE: DashboardState = {
    showAddCourseModal: false,
    isItemSelected: false,
    selectedItemType: undefined,
    selectedItemId: undefined
};

export const DashboardReducer = (state: DashboardState = INITIAL_STATE, action: GenericAction): DashboardState => {
    switch (action.type) {
        case TOGGLE_ADD_COURSE_MODAL:
            return {...state, showAddCourseModal: !state.showAddCourseModal};
        case  SELECT_COURSE:
            const {courseId} = action.payload;
            return {...state, isItemSelected: true, selectedItemType: 'course', selectedItemId: courseId};
        default:
            return state;
    }
};
