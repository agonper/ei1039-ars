import {Action, Dispatch} from "redux";
import {GenericAction, performGraphQLQuery, performGraphQLMutation} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {apolloClient} from "../adapters/graphql";
import gql from "graphql-tag/index";
import {NewQuestionSetData} from "../components/dashboard/add-question-set-modal";

export const CREATE_QUESTION_SET_PENDING = 'CREATE_QUESTION_SET_PENDING';
export const CREATE_QUESTION_SET_SUCCESS = 'CREATE_QUESTION_SET_SUCCESS';
export const CREATE_QUESTION_SET_ERROR = 'CREATE_QUESTION_SET_ERROR';

export const FETCH_QUESTION_SET_PENDING = 'FETCH_QUESTION_SET_PENDING';
export const FETCH_QUESTION_SET_SUCCESS = 'FETCH_QUESTION_SET_SUCCESS';
export const FETCH_QUESTION_SET_ERROR = 'FETCH_QUESTION_SET_ERROR';

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

export function createQuestionSet(courseId: string, questionSet: NewQuestionSetData) {
    const actionTypes = {
        pending: CREATE_QUESTION_SET_PENDING,
        success: CREATE_QUESTION_SET_SUCCESS,
        failure: CREATE_QUESTION_SET_ERROR
    };

    return performGraphQLMutation({mutation: CreateQuestionSetMutation, variables: {courseId, name: questionSet.name}}, actionTypes);
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

export function fetchQuestionSet(id: string) {
    const actionTypes = {
        pending: FETCH_QUESTION_SET_PENDING,
        success: FETCH_QUESTION_SET_SUCCESS,
        failure: FETCH_QUESTION_SET_ERROR
    };

    return performGraphQLQuery({query: FetchQuestionSetQuery, variables: {id}}, actionTypes);
}