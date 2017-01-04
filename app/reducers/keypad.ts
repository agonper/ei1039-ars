import {GenericAction} from "../actions/common";
import {
    FETCH_COURSE_FOR_KEYPAD_PENDING, FETCH_COURSE_FOR_KEYPAD_SUCCESS, FETCH_COURSE_FOR_KEYPAD_ERROR
} from "../actions/course";

export interface LimitedQuestionAnswer {
    option: string,
    text: string
}

export interface KeypadQuestion {
    id: string,
    title: string,
    createdAt: string,
    time: number,
    state: string,
    askedAt: string,
    answers: LimitedQuestionAnswer[]
}

export interface KeypadCourse {
    id: string,
    name: string,
    displayedQuestion: KeypadQuestion
}

export interface KeypadState {
    fetching: boolean,
    course: KeypadCourse,
    error: any
}

const INITIAL_STATE: KeypadState = {
    fetching: false,
    course: undefined,
    error: undefined
};

export const KeypadReducer = (state: KeypadState = INITIAL_STATE, action: GenericAction): KeypadState => {
    switch (action.type) {
        case FETCH_COURSE_FOR_KEYPAD_PENDING:
            return {...state, fetching: true};
        case FETCH_COURSE_FOR_KEYPAD_SUCCESS:
            const course = action.payload.data.course;
            return {...state, fetching: false, course, error: undefined};
        case FETCH_COURSE_FOR_KEYPAD_ERROR:
            return {...state, fetching: false, course: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};

