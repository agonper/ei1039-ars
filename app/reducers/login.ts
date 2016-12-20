import {GenericAction} from "../actions/common";
import {LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from "../actions/auth";

export interface LoginState {
    loggingIn: boolean,
    loggedIn: boolean,
    token: any,
    errors: any
}

const initialToken = recoverToken();

const INITIAL_SATE: LoginState = {
    loggingIn: false,
    loggedIn: !!initialToken,
    token: initialToken,
    errors: undefined
};

export const LoginReducer = (state: LoginState = INITIAL_SATE, action: GenericAction ): LoginState =>{
    switch (action.type) {
        case LOGIN_PENDING:
            return {...state, loggingIn: true};
        case LOGIN_SUCCESS:
            const token = action.payload.data.data.token;
            storeToken(token);
            return {loggingIn: false, loggedIn: true, token: token, errors: undefined};
        case LOGIN_ERROR:
            return {loggingIn: false, loggedIn: false, token: undefined, errors: {email: 'wrong-email', password: 'wrong-password'}};
        case LOGOUT:
            removeToken();
            return {...state, loggedIn: false, token: undefined};
        default:
            return state;
    }
};

const storageTokenKey = 'session-token';

function recoverToken(): string {
    return localStorage.getItem(storageTokenKey);
}

function storeToken(token: string) {
    localStorage.setItem(storageTokenKey, token);
}

function removeToken() {
    localStorage.removeItem(storageTokenKey);
}