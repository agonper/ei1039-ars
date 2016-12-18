import {Action} from "redux";
import {ActionSuccess, ActionFailure} from "../actions/common";
import {USER_SIGNUP_PENDING, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_CLEAR} from "../actions/signup";

export interface SignupState {
    signingUp: boolean
    signedUp: boolean
    error: {[field: string]: string}
}

const INITIAL_STATE: SignupState = {
    signingUp: false,
    signedUp: false,
    error: undefined
};

export const SignupReducer = (state: SignupState = INITIAL_STATE, action: Action | ActionSuccess | ActionFailure): SignupState => {
    switch (action.type) {
        case USER_SIGNUP_PENDING:
            return {signingUp: true, signedUp: false, error: undefined};
        case USER_SIGNUP_SUCCESS:
            return {signingUp: false, signedUp: true, error: undefined};
        case USER_SIGNUP_ERROR:
            return {signingUp: false, signedUp: false, error: {email: 'email-exists'}};
        case USER_SIGNUP_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};