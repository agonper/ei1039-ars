import {LimitedQuestionSet} from "./user-courses";
import {GenericAction} from "../actions/common";
import {
    CREATE_QUESTION_SET_PENDING, CREATE_QUESTION_SET_SUCCESS,
    CREATE_QUESTION_SET_ERROR
} from "../actions/question-set";

export interface CreateQuestionSetState {
    creating: boolean,
    questionSet: LimitedQuestionSet
    error: any
}

const INITIAL_STATE: CreateQuestionSetState = {
    creating: false,
    questionSet: undefined,
    error: undefined
};

export const CreateQuestionSetReducer = (state: CreateQuestionSetState = INITIAL_STATE, action: GenericAction): CreateQuestionSetState => {
    switch (action.type) {
        case CREATE_QUESTION_SET_PENDING:
            return {...state, creating: true};
        case CREATE_QUESTION_SET_SUCCESS:
            const {id, name, createdAt} = action.payload.data.createQuestionSet;
            const questionSet: LimitedQuestionSet = {id, name, createdAt};
            return {creating: false, questionSet, error: undefined};
        case CREATE_QUESTION_SET_ERROR:
            return {creating: false, questionSet: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};
