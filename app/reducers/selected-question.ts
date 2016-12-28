import {GenericAction} from "../actions/common";
import {QuestionAnswer} from "../../server/models/question";
import {FETCH_QUESTION_ERROR, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_PENDING} from "../actions/question";

export interface BasicQuestion {
    id: string
}

export interface BasicQuestionSet {
    id: string
    questions: BasicQuestion[]
}

export interface SelectedQuestion {
    id: string
    title: string
    createdAt: string
    questionSet: BasicQuestionSet
    answers: QuestionAnswer[]
}

export interface SelectedQuestionState {
    fetching: boolean,
    question: SelectedQuestion,
    error: any
}

const INITIAL_STATE: SelectedQuestionState = {
    fetching: false,
    question: undefined,
    error: undefined
};

export const SelectedQuestionReducer = (state: SelectedQuestionState = INITIAL_STATE, action: GenericAction): SelectedQuestionState => {
    switch (action.type) {
        case FETCH_QUESTION_PENDING:
            return {...state, fetching: true};
        case FETCH_QUESTION_SUCCESS:
            const question = action.payload.data.question;
            return {fetching: false, question, error: undefined};
        case FETCH_QUESTION_ERROR:
            return {fetching: false, question: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};
