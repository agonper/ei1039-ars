import {GenericAction} from "../actions/common";
import {QUESTION_RESPONSE_PENDING, QUESTION_RESPONSE_CORRECT, QUESTION_RESPONSE_INCORRECT} from "../actions/responseQuestion";
export interface QuestionResponseState {
    responding : boolean,
    selectedAnswer : boolean,
    selectedCorrectAnswer : boolean
}

const INITIAL_STATE: QuestionResponseState = {
    responding : true,
    selectedAnswer : undefined,
    selectedCorrectAnswer : undefined
};

export const QuestionResponseReducer =
    (state : QuestionResponseState = INITIAL_STATE, action : GenericAction): QuestionResponseState => {
    switch (action.type) {
        case QUESTION_RESPONSE_PENDING:
            return {responding : true, selectedAnswer : false, selectedCorrectAnswer : undefined};

        case QUESTION_RESPONSE_CORRECT:
            return {responding : false, selectedAnswer : true, selectedCorrectAnswer : true};

        case QUESTION_RESPONSE_INCORRECT:
            return {responding : false, selectedAnswer : true, selectedCorrectAnswer : false}
    }
};
