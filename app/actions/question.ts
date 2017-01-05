import {performGraphQLQuery, performGraphQLMutation} from "./common";
import gql from "graphql-tag/index";

export const CREATE_QUESTION_PENDING = 'CREATE_QUESTION_PENDING';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';

export const FETCH_QUESTION_PENDING = 'FETCH_QUESTION_PENDING';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';

export const ASK_QUESTION_PENDING = 'ASK_QUESTION_PENDING';
export const ASK_QUESTION_SUCCESS = 'ASK_QUESTION_SUCCESS';
export const ASK_QUESTION_ERROR = 'ASK_QUESTION_ERROR';

export const STOP_ASKING_QUESTION_PENDING = 'STOP_ASKING_QUESTION_PENDING';
export const STOP_ASKING_QUESTION_SUCCESS = 'STOP_ASKING_QUESTION_SUCCESS';
export const STOP_ASKING_QUESTION_ERROR = 'STOP_ASKING_QUESTION_ERROR';

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
     askedAt
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
     responses {
        option
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

const AskQuestionMutation = gql`
 mutation askQuestion($questionId: String!, $courseId: String!) {
  askQuestion(questionId: $questionId, courseId: $courseId) {
    id
  }
 }`;

export function askQuestion(questionId: string, courseId: string) {
    const actionTypes = {
        pending: ASK_QUESTION_PENDING,
        success: ASK_QUESTION_SUCCESS,
        failure: ASK_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: AskQuestionMutation, variables: {questionId, courseId}}, actionTypes);
}

const StopAskingQuestionMutation = gql`
 mutation stopAskingQuestion($questionId: String!, $courseId: String!) {
  stopAskingQuestion(questionId: $questionId, courseId: $courseId) {
    id
  }
 }`;

export function stopAskingQuestion(questionId: string, courseId: string) {
    const actionTypes = {
        pending: STOP_ASKING_QUESTION_PENDING,
        success: STOP_ASKING_QUESTION_SUCCESS,
        failure: STOP_ASKING_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: StopAskingQuestionMutation, variables: {questionId, courseId}}, actionTypes);
}