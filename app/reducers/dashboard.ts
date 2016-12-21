import {GenericAction} from "../actions/common";
import {TOGGLE_ADD_COURSE_MODAL} from "../actions/dashboard";

export interface DashboardState {
    showAddCourseModal: boolean
}

const INITIAL_STATE: DashboardState = {
    showAddCourseModal: false
};

export const DashboardReducer = (state: DashboardState = INITIAL_STATE, action: GenericAction): DashboardState => {
    switch (action.type) {
        case TOGGLE_ADD_COURSE_MODAL:
            return {...state, showAddCourseModal: !state.showAddCourseModal};
        default:
            return state;
    }
};
