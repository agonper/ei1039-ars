import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {SignupState, SignupReducer} from "./signup";
import {LoginState, LoginReducer} from "./login";
import {QuestionCreationState, QuestionCreationReducer} from "./question-creation";
import {QuestionResponseReducer} from "./question-response";
import {UserCoursesReducer, UserCoursesState} from "./user-courses";
import {DashboardState, DashboardReducer} from "./dashboard";
import {CreateCourseReducer, CreateCourseState} from "./create-course";

export interface ApplicationState {
    login: LoginState,
    signup: SignupState,
    userCourses: UserCoursesState,
    createCourse: CreateCourseState,
    dashboard: DashboardState,
    questionCreation : QuestionCreationState
}

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    userCourses: UserCoursesReducer,
    dashboard: DashboardReducer,
    createCourse: CreateCourseReducer,
    questionCreation : QuestionCreationReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;