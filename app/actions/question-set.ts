import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {apolloClient} from "../adapters/graphql";
import gql from "graphql-tag/index";
import {NewQuestionSetData} from "../components/dashboard/add-question-set-modal";

export const CREATE_QUESTION_SET_PENDING = 'CREATE_QUESTION_SET_PENDING';
export const CREATE_QUESTION_SET_SUCCESS = 'CREATE_QUESTION_SET_SUCCESS';
export const CREATE_QUESTION_SET_ERROR = 'CREATE_QUESTION_SET_ERROR';

function createQuestionSetPending(): Action {
    return {
        type: CREATE_QUESTION_SET_PENDING
    }
}

function createQuestionSetSuccess(data: any): GenericAction {
    return {
        type: CREATE_QUESTION_SET_SUCCESS,
        payload: data
    }
}

function createQuestionSetFailed(error: any): GenericAction {
    return {
        type: CREATE_QUESTION_SET_ERROR,
        error
    }
}

const CreateQuestionSetMutation = gql`
 mutation createQuestionSet($courseId: String!, $name: String!) {
    createQuestionSet(courseId: $courseId, name: $name) {
       id
       name
       createdAt
       course {
        id
       }
       questions {
        id
        title
       }
    }
 }`;

export function createQuestionSet(courseId: string, questionSet: NewQuestionSetData): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.mutate({mutation: CreateQuestionSetMutation, variables: {courseId, name: questionSet.name}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(createQuestionSetPending());
        request
            .then((data) => dispatch(createQuestionSetSuccess(data)))
            .catch((err) => dispatch(createQuestionSetFailed(err)));
        return request;
    }
}

export const FETCH_QUESTION_SET_PENDING = 'FETCH_QUESTION_SET_PENDING';
export const FETCH_QUESTION_SET_SUCCESS = 'FETCH_QUESTION_SET_SUCCESS';
export const FETCH_QUESTION_SET_ERROR = 'FETCH_QUESTION_SET_ERROR';

function fetchQuestionSetPending(): Action {
    return {
        type: FETCH_QUESTION_SET_PENDING
    }
}

function fetchQuestionSetSuccess(data: any): GenericAction {
    return {
        type: FETCH_QUESTION_SET_SUCCESS,
        payload: data
    }
}

function fetchQuestionSetFailed(err: any): GenericAction {
    return {
        type: FETCH_QUESTION_SET_ERROR,
        payload: err
    }
}

const FetchQuestionSetQuery = gql`
 query questionSet($id: String!) {
   questionSet(id: $id) {
     id
     name
     createdAt
     course {
        id
     }
   }
 }`;

export function fetchQuestionSet(id: string): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query({query: FetchQuestionSetQuery, variables: {id}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(fetchQuestionSetPending());
        request
            .then((data) => dispatch(fetchQuestionSetSuccess(data)))
            .catch((err) => dispatch(fetchQuestionSetFailed(err)));
        return request;
    }
}