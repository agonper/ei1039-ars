import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {apolloClient} from "../adapters/graphql";
import gql from "graphql-tag/index";

export const LIST_COURSES_PENDING = 'USER_SIGNUP_PENDING';
export const LIST_COURSES_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const LIST_COURSES_ERROR = 'USER_SIGNUP_ERROR';

function listCoursesPending(): Action{
    return {
        type: LIST_COURSES_PENDING
    }
}


function listCoursesSuccess(data: any): GenericAction {
    return {
        type: LIST_COURSES_SUCCESS,
        payload: data
    }
}

function listCoursesFailed(err: any): GenericAction {
    return {
        type: LIST_COURSES_ERROR,
        error: err
    }
}

const UserCoursesQuery = gql`
 query {
    userCourses {
        id
        name
    }
 }`;

export function fetchUserCourses(): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query({query: UserCoursesQuery});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(listCoursesPending());
        request
            .then((data) => {
                dispatch(listCoursesSuccess(data));
            }).catch((err) => dispatch(listCoursesFailed(err)));
        return request;
    }
}
