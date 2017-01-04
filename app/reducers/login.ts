import {GenericAction} from "../actions/common";
import {LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, STORE_COURSE_ID_FOR_LOGIN} from "../actions/auth";

export interface LoginState {
    loggingIn: boolean,
    loggedIn: boolean,
    token: any,
    errors: {
        email: string,
        password: string
    },
    courseId?: string
}

const storageTokenKey = 'session-token';
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
            const errors = action.error.response.data.errors;
            return {loggingIn: false, loggedIn: false, token: undefined, errors: {email: errors.email, password: errors.password}};
        case LOGOUT:
            removeToken();
            return {...state, loggedIn: false, token: undefined};
        case STORE_COURSE_ID_FOR_LOGIN:
            return {...state, courseId: action.payload};
        default:
            return state;
    }
};

function recoverToken(): string {
    return localStorage.getItem(storageTokenKey);
}

function storeToken(token: string) {
    localStorage.setItem(storageTokenKey, token);
}

function removeToken() {
    localStorage.removeItem(storageTokenKey);
}