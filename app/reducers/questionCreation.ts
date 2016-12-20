import {GenericAction} from "../actions/common";
import {
    QUESTION_CREATION_PENDING, QUESTION_CREATION_SUCCESS, QUESTION_CREATION_ERROR,
    QUESTION_CREATION_CLEAR
} from "../actions/createQuestion";

export interface QuestionCreationState {
    creatingQuestion : boolean,
    questionCreated : boolean,
    error : {[field : string] : string}
}

const INITIAL_STATE : QuestionCreationState = {
    creatingQuestion: false,
    questionCreated : false,
    error : undefined
};

export const QuestionCreationReducer = (state: QuestionCreationState = INITIAL_STATE, action : GenericAction) => {
    switch (action.type) {
        case QUESTION_CREATION_PENDING:
            return {creatingQuestion : true, questionCreated : false, error : undefined};

        case QUESTION_CREATION_SUCCESS:
            return {creatingQuestion : false, questionCreated : true, error : undefined};

        case QUESTION_CREATION_ERROR:
            return {creatingQuesion : true, questionCreated : false, error : {question : 'empty-question', answerA : 'empty-answerA', answerB : 'empty-answerB', answerC : 'empty-answerC', answerD : 'empty-answerD', correctAnswer : 'not-selected'}};

        case QUESTION_CREATION_CLEAR:
            return INITIAL_STATE;

        default:
            return state;
    }
};