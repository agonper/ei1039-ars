import {performGraphQLQuery, performGraphQLMutation} from "./common";
import gql from "graphql-tag/index";
import {NewCourseData} from "../components/dashboard/add-course-modal";

export const LIST_COURSES_PENDING = 'LIST_COURSES_PENDING';
export const LIST_COURSES_SUCCESS = 'LIST_COURSES_SUCCESS';
export const LIST_COURSES_ERROR = 'LIST_COURSES_ERROR';

export const CREATE_COURSE_PENDING = 'CREATE_COURSE_PENDING';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR';

export const FETCH_COURSE_PENDING = 'FETCH_COURSE_PENDING';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_ERROR = 'FETCH_COURSE_ERROR';

export const DISPLAY_COURSE_PENDING = 'DISPLAY_COURSE_PENDING';
export const DISPLAY_COURSE_SUCCESS = 'DISPLAY_COURSE_SUCCESS';
export const DISPLAY_COURSE_ERROR = 'DISPLAY_COURSE_ERROR';

export const DISPLAY_QUESTION_PENDING = 'DISPLAY_QUESTION_PENDING';
export const DISPLAY_QUESTION_SUCCESS = 'DISPLAY_QUESTION_SUCCESS';
export const DISPLAY_QUESTION_ERROR = 'DISPLAY_QUESTION_ERROR';

export const CLEAR_DISPLAYED_QUESTION_PENDING = 'CLEAR_DISPLAYED_QUESTION_PENDING';
export const CLEAR_DISPLAYED_QUESTION_SUCCESS = 'CLEAR_DISPLAYED_QUESTION_SUCCESS';
export const CLEAR_DISPLAYED_QUESTION_ERROR = 'CLEAR_DISPLAYED_QUESTION_ERROR';

export const FETCH_COURSE_FOR_KEYPAD_PENDING = 'FETCH_COURSE_FOR_KEYPAD_PENDING';
export const FETCH_COURSE_FOR_KEYPAD_SUCCESS = 'FETCH_COURSE_FOR_KEYPAD_SUCCESS';
export const FETCH_COURSE_FOR_KEYPAD_ERROR = 'FETCH_COURSE_FOR_KEYPAD_ERROR';

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

export function fetchUserCourses() {
    const actionTypes = {
        pending: LIST_COURSES_PENDING,
        success: LIST_COURSES_SUCCESS,
        failure: LIST_COURSES_ERROR
    };

    return performGraphQLQuery({query: UserCoursesQuery}, actionTypes);
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

export function createCourse(course: NewCourseData) {
    const actionTypes = {
        pending: CREATE_COURSE_PENDING,
        success: CREATE_COURSE_SUCCESS,
        failure: CREATE_COURSE_ERROR
    };

    return performGraphQLMutation({mutation: CreateCourseMutation, variables: {name: course.name}}, actionTypes);
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

export function fetchCourse(id: string) {
    const actionTypes = {
        pending: FETCH_COURSE_PENDING,
        success: FETCH_COURSE_SUCCESS,
        failure: FETCH_COURSE_ERROR
    };

    return performGraphQLQuery({query: FetchCourseQuery, variables: {id}}, actionTypes);
}

const DisplayCourseQuery = gql`
 query course($id: String!) {
   course(id: $id) {
     id
     name
     displayedQuestion {
      id
      title
      createdAt
      time
      state
      askedAt
      answers {
        option
        text
        isCorrect
      }
    }
   }
 }`;

export function displayCourse(id: string, force?: boolean) {
    const actionTypes = {
        pending: DISPLAY_COURSE_PENDING,
        success: DISPLAY_COURSE_SUCCESS,
        failure: DISPLAY_COURSE_ERROR
    };

    return performGraphQLQuery({query: DisplayCourseQuery, variables: {id}, forceFetch: force}, actionTypes);
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

const FetchCourseForKeypadQuery = gql`
 query course($id: String!) {
   course(id: $id) {
     id
     name
     displayedQuestion {
      id
      title
      createdAt
      time
      state
      askedAt
      answers {
        option
        text
      }
    }
   }
 }`;

export function fetchCourseForKeypad(id: string, force?: boolean) {
    const actionTypes = {
        pending: FETCH_COURSE_FOR_KEYPAD_PENDING,
        success: FETCH_COURSE_FOR_KEYPAD_SUCCESS,
        failure: FETCH_COURSE_FOR_KEYPAD_ERROR
    };

    return performGraphQLQuery({query: FetchCourseForKeypadQuery, variables: {id}, forceFetch: force}, actionTypes);
}