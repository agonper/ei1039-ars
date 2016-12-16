import {combineReducers} from 'redux';
import {AuthState, AuthReducer} from "./reducer_auth";

export interface ApplicationState {
    auth: AuthState
}

const rootReducer = combineReducers({
    auth: AuthReducer
});

export default rootReducer;