import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intlReducer} from 'react-intl-redux';
import {SignupState, SignupReducer} from "./signup";
import {LoginState, LoginReducer} from "./login";
import {
    CreateQuestionState, CreateQuestionReducer
} from "./create-question";
import {QuestionResponseReducer} from "./question-response";
import {UserCoursesReducer, UserCoursesState} from "./user-courses";
import {DashboardState, DashboardReducer} from "./dashboard";
import {CreateCourseReducer, CreateCourseState} from "./create-course";
import {SelectedCourseState, SelectedCourseReducer} from "./selected-course";
import {CreateQuestionSetState, CreateQuestionSetReducer} from "./create-question-set";
import {SelectedQuestionSetState, SelectedQuestionSetReducer} from "./selected-question-set";
import {SelectedQuestionState, SelectedQuestionReducer} from "./selected-question";
import {DisplayedCourseState, DisplayedCourseReducer} from "./display-course";

export interface ApplicationState {
    login: LoginState,
    signup: SignupState,
    userCourses: UserCoursesState,
    createCourse: CreateCourseState,
    createQuestionSet: CreateQuestionSetState,
    createQuestion : CreateQuestionState,
    dashboard: DashboardState,
    selectedCourse: SelectedCourseState,
    selectedQuestionSet: SelectedQuestionSetState,
    selectedQuestion: SelectedQuestionState,
    displayedCourse: DisplayedCourseState
}

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    userCourses: UserCoursesReducer,
    createCourse: CreateCourseReducer,
    createQuestionSet: CreateQuestionSetReducer,
    createQuestion: CreateQuestionReducer,
    dashboard: DashboardReducer,
    selectedCourse: SelectedCourseReducer,
    selectedQuestionSet: SelectedQuestionSetReducer,
    selectedQuestion: SelectedQuestionReducer,
    displayedCourse: DisplayedCourseReducer,
    form: formReducer,
    intl: intlReducer
});

export default rootReducer;