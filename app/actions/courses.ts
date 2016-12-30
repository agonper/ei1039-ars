import {performGraphQLQuery, performGraphQLMutation} from "./common";
import gql from "graphql-tag/index";
import {NewCourseData} from "../components/dashboard/add-course-modal";

export const LIST_COURSES_PENDING = 'LIST_COURSES_PENDING';
export const LIST_COURSES_SUCCESS = 'LIST_COURSES_SUCCESS';
export const LIST_COURSES_ERROR = 'LIST_COURSES_ERROR';

export const DISPLAY_COURSE_PENDING = 'DISPLAY_COURSE_PENDING';
export const DISPLAY_COURSE_SUCCESS = 'DISPLAY_COURSE_SUCCESS';
export const DISPLAY_COURSE_ERROR = 'DISPLAY_COURSE_ERROR';

export const FETCH_COURSE_PENDING = 'FETCH_COURSE_PENDING';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_ERROR = 'FETCH_COURSE_ERROR';

export const CREATE_COURSE_PENDING = 'CREATE_COURSE_PENDING';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR';

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
      answers {
        option
        text
        isCorrect
      }
    }
   }
 }`;

export function displayCourse(id: string) {
    const actionTypes = {
        pending: DISPLAY_COURSE_PENDING,
        success: DISPLAY_COURSE_SUCCESS,
        failure: DISPLAY_COURSE_ERROR
    };

    return performGraphQLQuery({query: DisplayCourseQuery, variables: {id}}, actionTypes);
}