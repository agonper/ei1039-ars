import {Action} from "redux";
import {GenericAction} from "./common";
import {Question} from "../model/Question";

export const QUESTION_RESPONSE_PENDING = 'QUESTION_RESPONSE_PENDING';
export const QUESTION_RESPONSE_CORRECT = 'QUESTION_RESPONSE_CORRECT';
export const QUESTION_RESPONSE_INCORRECT = 'QUESTION_RESPONSE_INCORRECT';

function questionResponse_Pending() : Action {
    return {
        type : QUESTION_RESPONSE_PENDING
    }
}

export function questionResponse_Success(selectedAnswer : any, question: Question) : GenericAction {
    if (question.correctAnswer == selectedAnswer)
        return {
        type: QUESTION_RESPONSE_CORRECT,
        payload: true
        }
    else
        return {
            type: QUESTION_RESPONSE_INCORRECT,
            payload: false
        }
}