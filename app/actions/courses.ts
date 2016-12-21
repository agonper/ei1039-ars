import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {apolloClient} from "../adapters/graphql";
import gql from "graphql-tag/index";
import {NewCourseData} from "../components/dashboard/add-course-modal";

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
    const request = apolloClient.query({query: UserCoursesQuery}); // TODO Check if forceFetch option is needed to invalidate cache
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(listCoursesPending());
        request
            .then((data) => {
                dispatch(listCoursesSuccess(data));
            }).catch((err) => dispatch(listCoursesFailed(err)));
        return request;
    }
}

export const CREATE_COURSE_PENDING = 'CREATE_COURSE_PENDING';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR';

function createCoursePending(): Action {
    return {
        type: CREATE_COURSE_PENDING
    }
}

function createCourseSuccess(data: any): GenericAction {
    return {
        type: CREATE_COURSE_SUCCESS,
        payload: data
    }
}

function createCourseFailed(error: any): GenericAction {
    return {
        type: CREATE_COURSE_ERROR,
        error
    }
}

const CreateCourseMutation = gql`
 mutation createCourse($name: String!) {
    createCourse(name: $name) {
        id
        name
    }
 }`;

export function createCourse(course: NewCourseData): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.mutate({mutation: CreateCourseMutation, variables: {name: course.name}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(createCoursePending());
        request
            .then((data) => dispatch(createCourseSuccess(data)))
            .catch((err) => dispatch(createCourseFailed(err)));
        return request;
    }
}
