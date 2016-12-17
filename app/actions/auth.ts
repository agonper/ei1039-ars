import {SignupFormFields} from "../components/signup/signup-form";
import {RestAdapter} from "../adapters/rest";
import {IDispatch} from "~redux-thunk~redux";
import {IAction} from "~redux-thunk~redux";
import {IActionGeneric} from "~redux-thunk~redux";

const USER_SIGNUP_PENDING = 'USER_SIGNUP_PENDING';
const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR';

function signupPending(): IAction{
    return {
        type: USER_SIGNUP_PENDING
    }
}

function signupSuccess(data: any): IActionGeneric<any> {
    return {
        type: USER_SIGNUP_SUCCESS,
        payload: data
    }
}

function signupFailed(err: Error): IActionGeneric<any> {
    return {
        type: USER_SIGNUP_ERROR,
        error: err
    }
}

export function createUser(userData: SignupFormFields) {
    const request = RestAdapter.post('/auth/signup', userData);
    return (dispatch: IDispatch) => {
        dispatch(signupPending());
        request
            .then((data) => dispatch(signupSuccess(data)))
            .catch((err) => dispatch(signupFailed(err)));
        return request;
    }
}