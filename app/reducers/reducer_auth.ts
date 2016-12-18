import {Action} from "redux";
import {ActionSuccess, ActionFailure} from "../actions/common";

export interface AuthState {
    loggedIn: boolean
    user: any
}

const INITIAL_SATE: AuthState = {
    loggedIn: false,
    user: undefined
};

export const AuthReducer = (state: AuthState = INITIAL_SATE, action: Action | ActionSuccess | ActionFailure ): AuthState =>{
    return state;
};