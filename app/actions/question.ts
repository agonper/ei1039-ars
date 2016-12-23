import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import gql from "graphql-tag/index";
import {apolloClient} from "../adapters/graphql";

export const CREATE_QUESTION_PENDING = 'CREATE_QUESTION_PENDING';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';


function questionCreationPending() : Action {
    return {type: CREATE_QUESTION_PENDING};
}

function questionCreationSuccess(data : any) : GenericAction {
    return {
        type: CREATE_QUESTION_SUCCESS,
        payload: data
    };
}

function questionCreationFailed(err : any) : GenericAction {
    return {
      type : CREATE_QUESTION_ERROR,
      error : err
    };
}

export interface InputAnswer {
    option: string,
    text: string,
    isCorrect: boolean
}

export interface InputQuestion {
    title: string,
    answers: InputAnswer[]
}

const MutationCreateLinkedQuestion = gql`
 mutation createLinkedQuestion($courseId: String!, $questionSetId: String!, $question: InputQuestion!) {
   createLinkedQuestion(courseId: $courseId, questionSetId: $questionSetId, question: $question) {
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

export function createLinkedQuestion(courseId: string, questionSetId:string, question : InputQuestion) : ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.mutate({mutation: MutationCreateLinkedQuestion, variables: {
        courseId,
        questionSetId,
        question
    }});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(questionCreationPending());
        request
            .then((data) => dispatch(questionCreationSuccess(data)))
            .catch((err) => dispatch(questionCreationFailed(err)));
        return request;
    };
}

const MutationCreateIndependentQuestion = gql`
 mutation createIndependentQuestion($courseId: String!, $question: InputQuestion!) {
   createIndependentQuestion(courseId: $courseId, question: $question) {
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

export function createIndependentQuestion(courseId: string, question : InputQuestion) : ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.mutate({mutation: MutationCreateIndependentQuestion, variables: {
        courseId,
        question
    }});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(questionCreationPending());
        request
            .then((data) => dispatch(questionCreationSuccess(data)))
            .catch((err) => dispatch(questionCreationFailed(err)));
        return request;
    };
}

export const FETCH_QUESTION_PENDING = 'FETCH_QUESTION_PENDING';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

function fetchQuestionPending(): Action {
    return {
        type: FETCH_QUESTION_PENDING
    }
}

function fetchQuestionSuccess(data: any): GenericAction {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: data
    }
}

function fetchQuestionFailed(err: any): GenericAction {
    return {
        type: FETCH_QUESTION_ERROR,
        payload: err
    }
}

const FetchQuestionQuery = gql`
 query question($id: String!) {
   question(id: $id) {
     id
     title
     createdAt
     questionSet {
        id
        questions {
            id
        }
     }
     answers {
        option
        text
        isCorrect
     }
   }
 }`;

export function fetchQuestion(id: string): ThunkAction<void, ApplicationState, void> {
    const request = apolloClient.query({query: FetchQuestionQuery, variables: {id}});
    return (dispatch: Dispatch<ApplicationState>) => {
        dispatch(fetchQuestionPending());
        request
            .then((data) => dispatch(fetchQuestionSuccess(data)))
            .catch((err) => dispatch(fetchQuestionFailed(err)));
        return request;
    }
}