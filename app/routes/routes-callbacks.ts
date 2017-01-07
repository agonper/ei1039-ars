import {applicationStore} from '../store';
import {Router} from 'react-router';
import {displayCourse, fetchCourseForKeypad} from "../actions/course";
import {storeCourseIdForLogin} from "../actions/auth";
import {ApplicationState} from "../reducers/index";
import {USER_STUDENT} from "../../common/types/user-types";

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

export const checkIfNotLoggedInForDashboard: Router.EnterHook = (nextState, replace) => {
    checkIfNotLoggedIn(nextState, replace);
    const applicationState: ApplicationState = applicationStore.getState();
    const {type} = applicationState.login.user;
    if (type === USER_STUDENT) {
        return replace('/unavailable')
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
    applicationStore.dispatch(<any>fetchCourseForKeypad(nextState.params.courseId));
};

const isLoggedIn = () => applicationStore.getState().login.loggedIn;

