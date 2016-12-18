import {SignupFormFields} from "../components/signup/signup-form";
import {RestAdapter} from "../adapters/rest";
import {Action, Dispatch} from "redux";
import {ActionSuccess, ActionFailure} from "./common";
import {ApplicationState} from "../reducers/index";
import ThunkAction = Redux.ThunkAction;


export const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';
export const USER_SIGNUP_CLEAR = 'USER_SIGNUP_CLEAR';

function signupPending(): Action{
    return {
        type: USER_SIGNUP_PENDING
    }
}


function signupSuccess(data: any): ActionSuccess {
    return {
        type: USER_SIGNUP_SUCCESS,
        payload: data
    }
}

function signupFailed(err: Error): ActionFailure {
    return {
        type: USER_SIGNUP_ERROR,
        error: err
    }
}

export function createUser(userData: SignupFormFields): ThunkAction<void, ApplicationState, void> {
    const request = RestAdapter.post('/auth/signup', userData);
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(signupPending());
        request
            .then((data) => dispatch(signupSuccess(data)))
            .catch((err) => dispatch(signupFailed(err)));
    }
}

export function clearSignup(): Action {
    return {
        type: USER_SIGNUP_CLEAR
    }
}