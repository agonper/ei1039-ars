import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../reducers/index";
import {Dispatch} from "redux";
import {webSocketClient} from "../adapters/websocket";
import {
    COURSES_TOPIC, QUESTION_ASKING_ENDED, QUESTION_ASKING_STARTED,
    QUESTION_ASKING_STOPPED
} from "../../common/messages/ws-messages";
import {displayCourse, fetchCourseForKeypad} from "./course";
import {fetchQuestion} from "./question";

export const subscribeDisplayToCourseChanges = (courseId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: Dispatch<ApplicationState>) => {
        webSocketClient.start().then(() => {
            webSocketClient.subscribe(`${COURSES_TOPIC}.${courseId}`, (data) => {
                dispatch(<any>displayCourse(courseId, true /* Fetch again */))
            });
        });
    }
};

export const subscribeQuestionContainerToCourseChanges = (courseId: string, questionId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: Dispatch<ApplicationState>) => {
        webSocketClient.start().then(() => {
            webSocketClient.subscribe(`${COURSES_TOPIC}.${courseId}`, (data) => {
                switch (data.msg) {
                    case QUESTION_ASKING_STARTED:
                    case QUESTION_ASKING_STOPPED:
                    case QUESTION_ASKING_ENDED:
                        dispatch(<any>fetchQuestion(questionId))
                }
            });
        });
    }
};

export const subscribeKeypadToCourseChanges = (courseId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: Dispatch<ApplicationState>) => {
        webSocketClient.start().then(() => {
            webSocketClient.subscribe(`${COURSES_TOPIC}.${courseId}`, (data) => {
                dispatch(<any>fetchCourseForKeypad(courseId, true /* Fetch again */))
            });
        });
    }
};

export const unsubscribeToCourseChanges = (courseId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: Dispatch<ApplicationState>) => {
        webSocketClient.start().then(() => {
            webSocketClient.unsubscribe(`${COURSES_TOPIC}.${courseId}`);
        });
    }
};