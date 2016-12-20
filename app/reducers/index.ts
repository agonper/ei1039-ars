import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {SignupState, SignupReducer} from "./signup";
import {LoginState, LoginReducer} from "./login";

export interface ApplicationState {
    login: LoginState,
    signup: SignupState
}

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;