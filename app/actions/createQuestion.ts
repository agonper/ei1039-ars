import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {QuestionFormFields} from "../components/questions/creation/questionCreationForm";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {RestAdapter} from "../adapters/rest";

export const QUESTION_CREATION_PENDING = 'QUESTION_CREATION_PENDING';
export const QUESTION_CREATION_SUCCESS = 'QUESTION_CREATION_SUCCESS';
export const QUESTION_CREATION_ERROR = 'QUESTION_CREATION_ERROR';
export const QUESTION_CREATION_CLEAR = 'QUESTION_CREATION_CLEAR';


function questionCreation_pending() : Action {
    return {type: QUESTION_CREATION_PENDING};
}

function questionCreation_success(data : any) : GenericAction {
    return {
        type: QUESTION_CREATION_SUCCESS,
        payload: data
    };
}

function questionCreation_failed(err : Error) : GenericAction {
    return {
      type : QUESTION_CREATION_ERROR,
      error : err
    };
}

export function questionCreation_clear() : Action {
    return {
        type : QUESTION_CREATION_CLEAR
    }
}

export function questionCreation_createQuestion(questionData : QuestionFormFields) : ThunkAction<void, ApplicationState, void> {
    // TODO: INSERT FINAL DIRECTION AND USER VALIDATION
    const request = RestAdapter.post('/WOLOLO', questionData);

    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(questionCreation_pending());
        request
            .then((data) => dispatch(questionCreation_success(questionData)))
            .catch((err) => dispatch(questionCreation_failed(err)));
    };
}