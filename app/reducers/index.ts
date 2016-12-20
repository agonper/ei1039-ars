import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {SignupState, SignupReducer} from "./signup";
import {LoginState, LoginReducer} from "./login";
import {QuestionCreationState, QuestionCreationReducer} from "./reducer_questionCreation";

export interface ApplicationState {
    login: LoginState,
    signup: SignupState,
    questionCreation : QuestionCreationState
}

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    questionCreation : QuestionCreationReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;