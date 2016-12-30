import {applicationStore} from '../store';
import {Router} from 'react-router';
import {displayCourse} from "../actions/course";

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

const isLoggedIn = () => applicationStore.getState().login.loggedIn;
