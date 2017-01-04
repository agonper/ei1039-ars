import * as log from 'winston';
import {MongooseDocument, Types} from "mongoose";
import {User} from "./user";
import {CourseModel} from './mongodb/course';
import {QuestionSet} from "./question-set";
import {Question, questionRepository} from "./question";
import * as PubSub from 'pubsub-js';
import {COURSES_TOPIC, DISPLAYED_QUESTION_CHANGED, DISPLAYED_QUESTION_CLEARED} from "../../common/messages/ws-messages";

export interface Course {
    _id: Types.ObjectId,
    name: string,
    createdAt: Date,
    teacher: User,
    students: User[],
    questionSets: QuestionSet[],
    displayedQuestion: Question
}

class CourseRepository {

    public createCourse(user: any & MongooseDocument, name: string): Promise<MongooseDocument & Course> {
        if (user.type !== 'teacher') throw new Error('user-not-a-teacher');
        const course = new CourseModel({name: name, teacher: user._id, createdAt: Date.now()});
        return course.save().then((course) => {
            user.courses.push(course);
            return user.save().then(() => course);
        });
    }

    public addStudent(course: any & MongooseDocument, user: User & MongooseDocument): Promise<MongooseDocument & Course> {
        if (user.type !== 'student') throw new Error('user-not-a-student');
        course.students.push(user);
        return course.save();
    }

    public displayQuestion(course: any & MongooseDocument, questionId: string): Promise<MongooseDocument & Course> {
        return questionRepository.findByIdIfFromCourse(questionId, course).then((question) => {
            course.displayedQuestion = questionId;
            return course.save().then((course: any) => {
                PubSub.publish(`${COURSES_TOPIC}.${course._id}`, {msg: DISPLAYED_QUESTION_CHANGED});
                return course;
            });
        });
    }

    public clearDisplayedQuestion(course: any & MongooseDocument): Promise<MongooseDocument & Course> {
        course.displayedQuestion = null;
        return course.save().then((course: any) => {
            PubSub.publish(`${COURSES_TOPIC}.${course._id}`, {msg: DISPLAYED_QUESTION_CLEARED});
            return course;
        });
    }

    public findById(id: string): Promise<MongooseDocument & Course> {
        return <any>CourseModel.findOne({_id: id}).exec().catch((err) => {
            log.error(`Error fetching course by id: ${id}`, err);
            return Promise.reject(new Error("course-not-found"));
        });
    }

    public findByIdIfOwner(courseId: string, user: any & MongooseDocument): Promise<MongooseDocument & Course> {
        return courseRepository.findById(courseId).then((course) => {
            if (!course) throw new Error('Course not found');
            if (course.teacher.toString() !== user._id.toString()) throw new Error('Forbidden access');

            return course;
        });
    }
}

export const courseRepository = new CourseRepository();