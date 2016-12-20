import {GenericAction} from "../actions/common";
import {USER_SIGNUP_PENDING, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_CLEAR} from "../actions/signup";

export interface SignupState {
    signingUp: boolean
    signedUp: boolean
    errors: {
        email: string,
        name: string,
        password: string
    }
}

const INITIAL_STATE: SignupState = {
    signingUp: false,
    signedUp: false,
    errors: undefined
};

export const SignupReducer = (state: SignupState = INITIAL_STATE, action: GenericAction): SignupState => {
    switch (action.type) {
        case USER_SIGNUP_PENDING:
            return {signingUp: true, signedUp: false, errors: undefined};
        case USER_SIGNUP_SUCCESS:
            return {signingUp: false, signedUp: true, errors: undefined};
        case USER_SIGNUP_ERROR:
            const errors = action.error.response.data.errors;
            return {signingUp: false, signedUp: false, errors: {email: errors.email, name: errors.name, password: errors.password}};
        case USER_SIGNUP_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};