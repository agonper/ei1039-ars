import * as log from "winston";
import {MongooseDocument, Types} from "mongoose";
import {ResponseModel} from "./mongodb/response";
import {User} from "./user";
import {Question} from "./question";
import {QUESTION_ASKED} from "../../common/states/question-states";
import {USER_STUDENT} from "../../common/types/user-types";
import {includes} from "lodash";
import {courseRepository} from "./course";
import {COURSES_TOPIC, STUDENT_ANSWERED} from "../../common/messages/ws-messages";
import * as PubSub from 'pubsub-js';

export interface Response {
    _id: Types.ObjectId
    option: string,
    answeredAt: Date | number,
    student: User,
    question: Question
}

class ResponseRepository {

    public createResponse(question: MongooseDocument & any, user: MongooseDocument & any, option: string): Promise<MongooseDocument & Response> {
        if (question.state !== QUESTION_ASKED) throw new Error('Closed question');
        if (user.type !== USER_STUDENT) throw new Error('Only students are allowed to answer questions');

        const responseProperties = {
            option,
            answeredAt: Date.now(),
            student: user._id,
            question: question._id
        };

        const response = new ResponseModel(responseProperties);
        return response.save().then((response: any) => {
            question.responses.push(response);
            return question.save().then(() => {
                return question.populate('questionSet').execPopulate().then((question: any) => {
                    const questionSetCourse = question.questionSet.course;
                    PubSub.publish(`${COURSES_TOPIC}.${questionSetCourse}`, {msg: STUDENT_ANSWERED});

                    const studentInCourse =
                        includes(user.courses.map((c: any) => c.toString()), questionSetCourse.toString());

                    if (!studentInCourse) {
                        return courseRepository.findById(questionSetCourse).then((course: any) => {
                            console.log("Course id: ", course._id);
                            return courseRepository.addStudent(course, user).then(() => response);
                        });
                    }
                    return response;
                });
            });
        });
    }

    public findById(id: string): Promise<MongooseDocument & Question> {
        return <any>ResponseModel.findOne({_id: id}).exec().catch((err) => {
            log.error(`Error fetching response by id: ${id}`, err);
            return Promise.reject(new Error("response-not-found"));
        });
    }
}

export const responseRepository = new ResponseRepository();