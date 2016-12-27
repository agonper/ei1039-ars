import {RestAdapter} from "../adapters/rest";
import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {appConfig} from "../config/environment"

export const SHORT_COURSE_URL_PENDING = 'SHORT_COURSE_URL_PENDING';
export const SHORT_COURSE_URL_SUCCESS = 'SHORT_COURSE_URL_SUCCESS';
export const SHORT_COURSE_URL_ERROR = 'SHORT_COURSE_URL_ERROR';

const BASE_URL_TO_SHORTEN = `${appConfig.rootUrl}/course`;
const URL_SHORTENER_URL = `${appConfig.urlShortenerBaseURL}?key=${appConfig.gglAPIkey}`;

function shortCourseUrlPending(): Action{
    return {
        type: SHORT_COURSE_URL_PENDING
    }
}


function shortCourseUrlSuccess(data: any): GenericAction {
    return {
        type: SHORT_COURSE_URL_SUCCESS,
        payload: data
    }
}

function shortCourseUrlFailed(err: any): GenericAction {
    return {
        type: SHORT_COURSE_URL_ERROR,
        error: err
    }
}

export function shortenCourseUrl(courseId: string): ThunkAction<void, ApplicationState, void> {
    const request = RestAdapter.post(URL_SHORTENER_URL, {
        longUrl: `${BASE_URL_TO_SHORTEN}/${courseId}`
    });
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(shortCourseUrlPending());
        request
            .then((data) => dispatch(shortCourseUrlSuccess(data)))
            .catch((err) => dispatch(shortCourseUrlFailed(err)));
        return request;
    }
}