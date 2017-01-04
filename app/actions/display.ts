import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../reducers/index";
import {Dispatch} from "redux";
import {webSocketClient} from "../adapters/websocket";
import {COURSES_TOPIC} from "../../common/messages/ws-messages";
import {displayCourse} from "./course";

export const subscribeDisplayToCourseChanges = (courseId: string): ThunkAction<void, ApplicationState, void> => {
    return (dispatch: Dispatch<ApplicationState>) => {
        webSocketClient.start().then(() => {
            webSocketClient.subscribe(`${COURSES_TOPIC}.${courseId}`, (data) => {
                dispatch(<any>displayCourse(courseId, true /* Fetch again */))
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