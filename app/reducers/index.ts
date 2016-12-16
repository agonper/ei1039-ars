import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    state: (state: string = "") => state
});

export default rootReducer;