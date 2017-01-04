import {Action} from "redux";
import {performRESTPost, GenericAction} from "./common";
import {LoginData} from "../components/login/login-form";

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const STORE_COURSE_ID_FOR_LOGIN = 'STORE_COURSE_ID_FOR_LOGIN';

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

export function storeCourseIdForLogin(courseId: string): GenericAction {
    return {
        type: STORE_COURSE_ID_FOR_LOGIN,
        payload: courseId
    }
}