import {performRESTPost} from "./common";
import {appConfig} from "../config/environment"

export const SHORT_COURSE_URL_PENDING = 'SHORT_COURSE_URL_PENDING';
export const SHORT_COURSE_URL_SUCCESS = 'SHORT_COURSE_URL_SUCCESS';
export const SHORT_COURSE_URL_ERROR = 'SHORT_COURSE_URL_ERROR';

const BASE_URL_TO_SHORTEN = `${appConfig.rootUrl}/course`;
const URL_SHORTENER_URL = `${appConfig.urlShortenerBaseURL}?key=${appConfig.gglAPIkey}`;

export function shortenCourseUrl(courseId: string) {
    const actionTypes = {
        pending: SHORT_COURSE_URL_PENDING,
        success: SHORT_COURSE_URL_SUCCESS,
        failure: SHORT_COURSE_URL_ERROR
    };

    return performRESTPost({path: URL_SHORTENER_URL, params: {longUrl: `${BASE_URL_TO_SHORTEN}/${courseId}`}}, actionTypes);
}