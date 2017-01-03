import {performGraphQLQuery, performGraphQLMutation} from "./common";
import gql from "graphql-tag/index";

export const CREATE_QUESTION_PENDING = 'CREATE_QUESTION_PENDING';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';

export const FETCH_QUESTION_PENDING = 'FETCH_QUESTION_PENDING';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

export const DISPLAY_QUESTION_PENDING = 'DISPLAY_QUESTION_PENDING';
export const DISPLAY_QUESTION_SUCCESS = 'DISPLAY_QUESTION_SUCCESS';
export const DISPLAY_QUESTION_ERROR = 'DISPLAY_QUESTION_ERROR';

export const CLEAR_DISPLAYED_QUESTION_PENDING = 'CLEAR_DISPLAYED_QUESTION_PENDING';
export const CLEAR_DISPLAYED_QUESTION_SUCCESS = 'CLEAR_DISPLAYED_QUESTION_SUCCESS';
export const CLEAR_DISPLAYED_QUESTION_ERROR = 'CLEAR_DISPLAYED_QUESTION_ERROR';

export interface InputAnswer {
    option: string,
    text: string,
    isCorrect: boolean
}

export interface InputQuestion {
    title: string,
    time: number,
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

export function createLinkedQuestion(courseId: string, questionSetId:string, question : InputQuestion) {
    const actionTypes = {
        pending: CREATE_QUESTION_PENDING,
        success: CREATE_QUESTION_SUCCESS,
        failure: CREATE_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: MutationCreateLinkedQuestion, variables: {courseId, questionSetId, question}}, actionTypes);
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

export function createIndependentQuestion(courseId: string, question : InputQuestion) {
    const actionTypes = {
        pending: CREATE_QUESTION_PENDING,
        success: CREATE_QUESTION_SUCCESS,
        failure: CREATE_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: MutationCreateIndependentQuestion, variables: {courseId, question}}, actionTypes);
}

const FetchQuestionQuery = gql`
 query question($id: String!) {
   question(id: $id) {
     id
     title
     createdAt
     time
     state
     questionSet {
        id
        course {
            id
            displayedQuestion {
                id
            }
        }
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

export function fetchQuestion(id: string) {
    const actionTypes = {
        pending: FETCH_QUESTION_PENDING,
        success: FETCH_QUESTION_SUCCESS,
        failure: FETCH_QUESTION_ERROR
    };
    return performGraphQLQuery({query: FetchQuestionQuery, variables: {id}, forceFetch: true}, actionTypes);
}

const DisplayQuestionMutation = gql`
 mutation displayQuestion($courseId: String!, $questionId: String!) {
   displayQuestion(courseId: $courseId, questionId: $questionId) {
     id
     displayedQuestion {
       id
     }
   }
 }`;

export function displayQuestion(courseId: string, questionId: string) {
    const actionTypes = {
        pending: DISPLAY_QUESTION_PENDING,
        success: DISPLAY_QUESTION_SUCCESS,
        failure: DISPLAY_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: DisplayQuestionMutation, variables: {courseId, questionId}}, actionTypes);
}

const ClearDisplayedQuestionMutation = gql`
 mutation clearDisplayedQuestion($courseId: String!) {
   clearDisplayedQuestion(courseId: $courseId) {
     id
     displayedQuestion {
       id
     }
   }
 }`;

export function clearDisplayedQuestion(courseId: string) {
    const actionTypes = {
        pending: CLEAR_DISPLAYED_QUESTION_PENDING,
        success: CLEAR_DISPLAYED_QUESTION_SUCCESS,
        failure: CLEAR_DISPLAYED_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: ClearDisplayedQuestionMutation, variables: {courseId}}, actionTypes);
}