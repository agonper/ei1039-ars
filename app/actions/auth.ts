import {RestAdapter} from "../adapters/rest";
import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {LoginData} from "../components/login/login-form";

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

function loginPending(): Action{
    return {
        type: LOGIN_PENDING
    }
}


function loginSuccess(data: any): GenericAction {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

function loginFailed(err: any): GenericAction {
    return {
        type: LOGIN_ERROR,
        error: err
    }
}

export function loginUser(loginData: LoginData): ThunkAction<void, ApplicationState, void> {
    const request = RestAdapter.post('/auth/login', loginData);
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(loginPending());
        request
            .then((data) => {
                dispatch(loginSuccess(data));
            }).catch((err) => {
                dispatch(loginFailed(err))
            });
        return request;
    }
}

export function logout(): Action {
    return {
        type: LOGOUT
    }
}