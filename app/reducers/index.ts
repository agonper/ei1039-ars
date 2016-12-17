import {combineReducers} from 'redux';
import {AuthState, AuthReducer} from './reducer_auth';
import {reducer as formReducer} from 'redux-form';

export interface ApplicationState {
    auth: AuthState
}

const rootReducer = combineReducers({
    auth: AuthReducer,
    form: formReducer
});

export default rootReducer;