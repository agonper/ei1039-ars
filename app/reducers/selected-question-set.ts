import {GenericAction} from "../actions/common";
import {
    FETCH_QUESTION_SET_ERROR, FETCH_QUESTION_SET_SUCCESS,
    FETCH_QUESTION_SET_PENDING
} from "../actions/question-set";

export interface BasicCourse {
    id: string
    displayedQuestionSet: {
        id: string
    }
}

export interface SelectedQuestionSet {
    id: string
    name: string
    createdAt: string
    course: BasicCourse
}

export interface SelectedQuestionSetState {
    fetching: boolean,
    questionSet: SelectedQuestionSet,
    error: any
}

const INITIAL_STATE: SelectedQuestionSetState = {
    fetching: false,
    questionSet: undefined,
    error: undefined
};

export const SelectedQuestionSetReducer = (state: SelectedQuestionSetState = INITIAL_STATE, action: GenericAction): SelectedQuestionSetState => {
    switch (action.type) {
        case FETCH_QUESTION_SET_PENDING:
            return {...state, fetching: true};
        case FETCH_QUESTION_SET_SUCCESS:
            const questionSet = action.payload.data.questionSet;
            return {fetching: false, questionSet, error: undefined};
        case FETCH_QUESTION_SET_ERROR:
            return {fetching: false, questionSet: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};
