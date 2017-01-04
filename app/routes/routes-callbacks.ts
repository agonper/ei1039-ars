import {applicationStore} from '../store';
import {Router} from 'react-router';
import {displayCourse} from "../actions/course";
import {storeCourseIdForLogin} from "../actions/auth";

export const checkIfLoggedIn: Router.EnterHook = (nextState, replace) => {

    if (isLoggedIn()) {
        return replace('/dashboard');
    }
};

export const checkIfNotLoggedIn: Router.EnterHook = (nextState, replace) => {
    if (!isLoggedIn()) {
        return replace('/login');
    }
};

export const checkIfNotLoggedInForDisplay: Router.EnterHook = (nextState: any, replace) => {
    checkIfNotLoggedIn(nextState, replace);
    applicationStore.dispatch(<any>displayCourse(nextState.params.courseId));
};

export const checkIfNotLoggedInForKeypad: Router.EnterHook = (nextState: any, replace) => {
    if (!isLoggedIn()) {
        applicationStore.dispatch(<any>storeCourseIdForLogin(nextState.params.courseId));
    }
    checkIfNotLoggedIn(nextState, replace);
};

const isLoggedIn = () => applicationStore.getState().login.loggedIn;

