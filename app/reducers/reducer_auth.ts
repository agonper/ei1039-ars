import {GenericAction} from "../actions/common";

export interface AuthState {
    loggedIn: boolean
    user: any
}

const INITIAL_SATE: AuthState = {
    loggedIn: false,
    user: undefined
};

export const AuthReducer = (state: AuthState = INITIAL_SATE, action: GenericAction ): AuthState =>{
    return state;
};