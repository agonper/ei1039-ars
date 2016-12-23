import {Action, Dispatch} from "redux";
import {GenericAction} from "./common";
import {ApplicationState} from "../reducers/index";
import {ThunkAction} from "redux-thunk";
import {RestAdapter} from "../adapters/rest";
import gql from "graphql-tag/index";
import {apolloClient} from "../adapters/graphql";

export const QUESTION_CREATION_PENDING = 'QUESTION_CREATION_PENDING';
export const QUESTION_CREATION_SUCCESS = 'QUESTION_CREATION_SUCCESS';
export const QUESTION_CREATION_ERROR = 'QUESTION_CREATION_ERROR';


function questionCreationPending() : Action {
    return {type: QUESTION_CREATION_PENDING};
}

function questionCreationSuccess(data : any) : GenericAction {
    return {
        type: QUESTION_CREATION_SUCCESS,
        payload: data
    };
}

function questionCreationFailed(err : any) : GenericAction {
    return {
      type : QUESTION_CREATION_ERROR,
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