import {GenericAction} from "../actions/common";
import {LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, STORE_COURSE_ID_FOR_LOGIN} from "../actions/auth";

export interface UserSession {
    name: string
    email: string
    type: string
}

export interface LoginState {
    loggingIn: boolean,
    loggedIn: boolean,
    token: any,
    user: UserSession,
    errors: {
        email: string,
        password: string
    },
    courseId?: string
}

const storageTokenKey = 'session-token';
const storageUserKey = 'session-data';
const initialToken = recoverToken();
const initialUser = recoverUser();

const INITIAL_SATE: LoginState = {
    loggingIn: false,
    loggedIn: !!initialToken,
    token: initialToken,
    user: initialUser,
    errors: undefined
};

export const LoginReducer = (state: LoginState = INITIAL_SATE, action: GenericAction ): LoginState =>{
    switch (action.type) {
        case LOGIN_PENDING:
            return {...state, loggingIn: true};
        case LOGIN_SUCCESS:
            const {token, user} = action.payload.data.data;
            storeToken(token);
            storeUser(user);
            return {loggingIn: false, loggedIn: true, token, user, errors: undefined};
        case LOGIN_ERROR:
            const errors = action.error.response.data.errors;
            return {loggingIn: false, loggedIn: false, token: undefined, user: undefined, errors: {email: errors.email, password: errors.password}};
        case LOGOUT:
            removeToken();
            removeUser();
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

function recoverUser(): UserSession {
    const storageItem = localStorage.getItem(storageUserKey);
    if (storageItem) {
        const recoveredString = atob(storageItem);
        return JSON.parse(recoveredString);
    }
}

function storeUser(user: UserSession) {
    const userString = JSON.stringify(user);
    const encodedString = btoa(userString);
    localStorage.setItem(storageUserKey, encodedString);
}

function removeUser() {
    localStorage.removeItem(storageUserKey);
}