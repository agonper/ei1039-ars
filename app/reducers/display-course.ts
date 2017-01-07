import {GenericAction} from "../actions/common";
import {QuestionAnswer} from "../../server/models/question";
import {DISPLAY_COURSE_PENDING, DISPLAY_COURSE_SUCCESS, DISPLAY_COURSE_ERROR} from "../actions/course";
import {SHORT_COURSE_URL_SUCCESS} from "../actions/shorten-course-url";

export interface DisplayedQuestion {
    id: string,
    title: string,
    createdAt: string,
    time: number,
    state: string,
    askedAt: string,
    answers: QuestionAnswer[],
    responses: {option: string}[]
}

export interface LimitedStudent {
    id: string,
    name: string
}

export interface LimitedQuestion {
    answers: {option: string, isCorrect: boolean}[],
    responses: {option: string, student: {id: string}}[]
}

export interface LimitedQuestionSet {
    questions: LimitedQuestion[]
}

export interface BasicQuestionSet extends LimitedQuestionSet {
    name: string,
    createdAt: string
}

export interface DisplayedCourse {
    id: string,
    name: string,
    showStats: boolean,
    questionSets: LimitedQuestionSet[],
    students: LimitedStudent[],
    displayedQuestion: DisplayedQuestion,
    displayedQuestionSet: BasicQuestionSet
}

export interface DisplayedCourseState {
    fetching: boolean,
    course: DisplayedCourse,
    shortenedUrl: string,
    error: any
}

const INITIAL_STATE: DisplayedCourseState = {
    fetching: false,
    course: undefined,
    shortenedUrl: undefined,
    error: undefined
};

export const DisplayedCourseReducer = (state: DisplayedCourseState = INITIAL_STATE, action: GenericAction): DisplayedCourseState => {
    switch (action.type) {
        case DISPLAY_COURSE_PENDING:
            return {...state, shortenedUrl: undefined, fetching: true};
        case DISPLAY_COURSE_SUCCESS:
            const course = action.payload.data.course;
            return {...state, fetching: false, course, error: undefined};
        case DISPLAY_COURSE_ERROR:
            return {...state, fetching: false, course: undefined, error: action.error.data.errors};
        case SHORT_COURSE_URL_SUCCESS:
            return {...state, shortenedUrl: action.payload.data.id};
        default:
            return state;
    }
};

