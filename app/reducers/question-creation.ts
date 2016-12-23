import {GenericAction} from "../actions/common";
import {
    CREATE_QUESTION_PENDING, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_ERROR
} from "../actions/question";

export interface QuestionCreationState {
    creatingQuestion : boolean,
    questionCreated : boolean,
    error : string
}

const INITIAL_STATE : QuestionCreationState = {
    creatingQuestion: false,
    questionCreated : false,
    error : undefined
};

export const QuestionCreationReducer = (state: QuestionCreationState = INITIAL_STATE, action : GenericAction): QuestionCreationState => {
    switch (action.type) {
        case CREATE_QUESTION_PENDING:
            return {creatingQuestion : true, questionCreated : false, error : undefined};
        case CREATE_QUESTION_SUCCESS:
            return {creatingQuestion : false, questionCreated : true, error : undefined};
        case CREATE_QUESTION_ERROR:
            return {creatingQuestion : true, questionCreated : false, error : 'empty-field'};
        default:
            return state;
    }
};