import {Action} from "redux";
import {performRESTPost} from "./common";
import {LoginData} from "../components/login/login-form";

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export function loginUser(loginData: LoginData) {
    const postOptions = {
        path: '/auth/login',
        params: loginData
    };

    const actionTypes = {
        pending: LOGIN_PENDING,
        success: LOGIN_SUCCESS,
        failure: LOGIN_ERROR
    };

    return performRESTPost(postOptions, actionTypes);
}

export function logout(): Action {
    return {
        type: LOGOUT
    }
}