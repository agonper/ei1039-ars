import {GenericAction} from "../actions/common";
import {
    FETCH_COURSE_FOR_KEYPAD_PENDING, FETCH_COURSE_FOR_KEYPAD_SUCCESS, FETCH_COURSE_FOR_KEYPAD_ERROR
} from "../actions/course";
import {ANSWER_QUESTION_PENDING, ANSWER_QUESTION_SUCCESS, ANSWER_QUESTION_ERROR} from "../actions/keypad";

export interface LimitedQuestionAnswer {
    option: string,
    text: string
}

export interface WithResponseAnswer {
    option: string,
    isCorrect: boolean
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

export interface KeypadAnswer {
    option: string,
    answeredAt: string,
    question: {
        answers: WithResponseAnswer[]
    }
}

export interface KeypadState {
    fetching: boolean,
    course: KeypadCourse,
    answering: boolean,
    answer: KeypadAnswer,
    hasAnswered: boolean,
    error: any
}

const INITIAL_STATE: KeypadState = {
    fetching: false,
    course: undefined,
    answering: false,
    answer: undefined,
    hasAnswered: false,
    error: undefined
};

export const KeypadReducer = (state: KeypadState = INITIAL_STATE, action: GenericAction): KeypadState => {
    switch (action.type) {
        case FETCH_COURSE_FOR_KEYPAD_PENDING:
            return {...state, fetching: true};
        case FETCH_COURSE_FOR_KEYPAD_SUCCESS:
            const course = action.payload.data.course;

            let hasAnswered = state.hasAnswered;
            if (state.course) {
                const previousQuestion = state.course.displayedQuestion;
                const newQuestion = course.displayedQuestion;
                if (previousQuestion && newQuestion && previousQuestion.state !== newQuestion.state) {
                    hasAnswered = false;
                }
            }

            return {...state, fetching: false, course, error: undefined, hasAnswered};
        case FETCH_COURSE_FOR_KEYPAD_ERROR:
            return {...state, fetching: false, course: undefined, error: action.error.data.errors};
        case ANSWER_QUESTION_PENDING:
            return {...state, answering: true};
        case ANSWER_QUESTION_SUCCESS:
            const answer = action.payload.data.answerQuestion;
            return {...state, answering: false, answer, hasAnswered: true, error: undefined};
        case ANSWER_QUESTION_ERROR:
            return {...state, answering: false, answer: undefined, error: action.error.data.errors};
        default:
            return state;
    }
};

