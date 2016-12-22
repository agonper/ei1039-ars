import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {SignupState, SignupReducer} from "./signup";
import {LoginState, LoginReducer} from "./login";
import {QuestionCreationState, QuestionCreationReducer} from "./questionCreation";
import {QuestionResponseReducer} from "./questionResponse";
import {UserCoursesReducer, UserCoursesState} from "./user-courses";
import {DashboardState, DashboardReducer} from "./dashboard";
import {CreateCourseReducer, CreateCourseState} from "./create-course";
import {SelectedCourseState, SelectedCourseReducer} from "./selected-course";

export interface ApplicationState {
    login: LoginState,
    signup: SignupState,
    userCourses: UserCoursesState,
    createCourse: CreateCourseState,
    dashboard: DashboardState,
    selectedCourse: SelectedCourseState,
    questionCreation : QuestionCreationState
}

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    userCourses: UserCoursesReducer,
    createCourse: CreateCourseReducer,
    dashboard: DashboardReducer,
    selectedCourse: SelectedCourseReducer,
    questionCreation : QuestionCreationReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;