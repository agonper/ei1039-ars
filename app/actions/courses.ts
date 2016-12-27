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
    questionSets {
      id
      name
      createdAt
      questions {
        id
        title
      }
    }
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
       questionSets {
          id
          name
       }
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

export const FETCH_COURSE_PENDING = 'FETCH_COURSE_PENDING';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_ERROR = 'FETCH_COURSE_ERROR';

function fetchCoursePending(): Action {
    return {
        type: FETCH_COURSE_PENDING
    }
}

function fetchCourseSuccess(data: any): GenericAction {
    return {
        type: FETCH_COURSE_SUCCESS,
        payload: data
    }
}

function fetchCourseFailed(err: any): GenericAction {
    return {
        type: FETCH_COURSE_ERROR,
        payload: err
    }
}

const FetchCourseQuery = gql`
 query course($id: String!) {
   course(id: $id) {
     id
     name
     students {
       name
       email
     }
   }
 }`;

export function fetchCourse(id: string): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query({query: FetchCourseQuery, variables: {id}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(fetchCoursePending());
        request
            .then((data) => dispatch(fetchCourseSuccess(data)))
            .catch((err) => dispatch(fetchCourseFailed(err)));
        return request;
    }
}

export const DISPLAY_COURSE_PENDING = 'DISPLAY_COURSE_PENDING';
export const DISPLAY_COURSE_SUCCESS = 'DISPLAY_COURSE_SUCCESS';
export const DISPLAY_COURSE_ERROR = 'DISPLAY_COURSE_ERROR';

function displayCoursePending(): Action {
    return {
        type: DISPLAY_COURSE_PENDING
    }
}

function displayCourseSuccess(data: any): GenericAction {
    return {
        type: DISPLAY_COURSE_SUCCESS,
        payload: data
    }
}

function displayCourseFailed(err: any): GenericAction {
    return {
        type: DISPLAY_COURSE_ERROR,
        payload: err
    }
}

const DisplayCourseQuery = gql`
 query course($id: String!) {
   course(id: $id) {
     id
     name
     displayedQuestion {
      title
      createdAt
      answers {
        option
        text
        isCorrect
      }
    }
   }
 }`;

export function displayCourse(id: string): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query({query: DisplayCourseQuery, variables: {id}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(displayCoursePending());
        request
            .then((data) => dispatch(displayCourseSuccess(data)))
            .catch((err) => dispatch(displayCourseFailed(err)));
        return request;
    }
}