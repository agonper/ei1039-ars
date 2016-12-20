import {applicationStore} from '../store';
import {LoginState} from "../reducers/login";
import {Router} from 'react-router';

export const checkIfNotLoggedIn: Router.EnterHook = (nextState, replace) => {
    const loginState: LoginState = applicationStore.getState().login;
    if (!loginState.loggedIn) {
        replace('/login');
    }
};

export const checkIfLoggedIn: Router.EnterHook = (nextState, replace) => {
    const loginState: LoginState = applicationStore.getState().login;
    if (loginState.loggedIn) {
        replace('/dashboard');
    }
};