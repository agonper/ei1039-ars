import {applicationStore} from '../store';
import {Router} from 'react-router';

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
    console.log(nextState.params.courseId)
};

const isLoggedIn = () => applicationStore.getState().login.loggedIn;
