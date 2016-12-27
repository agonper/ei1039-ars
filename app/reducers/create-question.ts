import {GenericAction} from "../actions/common";
import {
    CREATE_QUESTION_PENDING, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_ERROR
} from "../actions/question";
import {LimitedQuestionSet} from "./user-courses";

export interface CreateQuestionState {
    creating : boolean,
    questionSet: LimitedQuestionSet,
    error : string
}

const INITIAL_STATE : CreateQuestionState = {
    creating: false,
    questionSet: undefined,
    error : undefined
};

export const CreateQuestionReducer = (state: CreateQuestionState = INITIAL_STATE, action : GenericAction): CreateQuestionState => {
    switch (action.type) {
        case CREATE_QUESTION_PENDING:
            return {...state, creating: true};
        case CREATE_QUESTION_SUCCESS:
            const data = action.payload.data;
            const {id, name, createdAt, questions} = (data.createIndependentQuestion) ? data.createIndependentQuestion : data.createLinkedQuestion;
            const questionSet: LimitedQuestionSet = {id, name, createdAt, questions};
            return {creating: false, questionSet , error: undefined};
        case CREATE_QUESTION_ERROR:
            return {creating: false, questionSet: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};