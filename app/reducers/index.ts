import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {AuthState, AuthReducer} from './reducer_auth';
import {SignupState, SignupReducer} from "./reducer_signup";

export interface ApplicationState {
    auth: AuthState,
    signup: SignupState
}

const rootReducer = combineReducers({
    auth: AuthReducer,
    signup: SignupReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;