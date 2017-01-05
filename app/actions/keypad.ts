import gql from "graphql-tag/index";
import {performGraphQLMutation} from "./common";

export const ANSWER_QUESTION_PENDING = 'ANSWER_QUESTION_PENDING';
export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';


const AnswerQuestionMutation = gql`
mutation answerQuestion($questionId: String!, $answer: String!){
  answerQuestion(questionId: $questionId, answer: $answer) {
    id
    option
    answeredAt
    question {
      answers {
        option
        isCorrect
      }
    }
  }
}`;

export function answerQuestion(questionId: string, answer: string) {
    const actionTypes = {
        pending: ANSWER_QUESTION_PENDING,
        success: ANSWER_QUESTION_SUCCESS,
        failure: ANSWER_QUESTION_ERROR
    };

    return performGraphQLMutation({mutation: AnswerQuestionMutation, variables: {questionId, answer}}, actionTypes);
}