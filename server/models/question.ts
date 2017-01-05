import * as log from "winston";
import {MongooseDocument, Types} from "mongoose";
import {QuestionModel} from "./mongodb/question";
import {QuestionSet} from "./question-set";
import {QUESTION_UNASKED, QUESTION_ASKED, QUESTION_ANSWERED} from "../../common/states/question-states";
import {Course} from "./course";
import * as PubSub from 'pubsub-js';
import {
    COURSES_TOPIC, QUESTION_ASKING_STARTED,
    QUESTION_ASKING_STOPPED, QUESTION_ASKING_ENDED
} from "../../common/messages/ws-messages";
import {Response} from "./response";
import {ResponseModel} from "./mongodb/response";

export interface QuestionAnswer {
    option: string,
    text?: string,
    isCorrect: boolean
}

export interface InputQuestion {
    title: string,
    time: number,
    answers: QuestionAnswer[]
}

export interface Question extends InputQuestion {
    _id: Types.ObjectId,
    createdAt: Date,
    state: string,
    askedAt: Date | number,
    questionSet: QuestionSet
    responses: Response[]
}

class QuestionRepository {

    private _scheduledJobs: {[questionId: string]: any} = {}; //FIXME this won't scale

    public createQuestion(questionSet: any & MongooseDocument, inputQuestion: InputQuestion): Promise<MongooseDocument & Question> {
        if (inputQuestion.answers.length !== 4) throw new Error('4 answers are needed');

        const answerOptions = ['A', 'B', 'C', 'D'];
        const answers = inputQuestion.answers.map((answer, i) => {
            return {option: answerOptions[i], text: (answer.text) ? answer.text : '', isCorrect: answer.isCorrect}
        });

        const questionProperties = {
            title: (inputQuestion.title) ? inputQuestion.title : '',
            createdAt: Date.now(),
            time: inputQuestion.time,
            state: QUESTION_UNASKED,
            questionSet: questionSet._id,
            answers
        };
        const question = new QuestionModel(questionProperties);
        return question.save().then((question) => {
            questionSet.questions.push(question);
            return questionSet.save().then(() => question);
        });
    }

    public findById(id: string): Promise<MongooseDocument & Question> {
        return <any>QuestionModel.findOne({_id: id}).exec().catch((err) => {
            log.error(`Error fetching question by id: ${id}`, err);
            return Promise.reject(new Error("question-not-found"));
        });
    }

    public findByIdIfFromCourse(questionId: string, course: MongooseDocument & Course): Promise<MongooseDocument & Question> {
        return this.findById(questionId).then((question) => {
            if (!question) throw new Error('Question not found');

            return question.populate('questionSet').execPopulate().then((question: any) => {
               if (question.questionSet.course.toString() !== course._id.toString()) {
                   throw new Error('Forbidden access')
               }
               return question;
            });
        });
    }

    public askQuestion(questionId: string, course: MongooseDocument & Course): Promise<MongooseDocument & Question> {
        return this.findByIdIfFromCourse(questionId, course).then((question: any) => {
            if (question.state === QUESTION_UNASKED) {
                question.state = QUESTION_ASKED;
                question.askedAt = Date.now();
                return question.save().then((question: any) => {

                    this._scheduledJobs[question.id] =
                        setTimeout(() => this.markQuestionAsAnswered(questionId, course), question.time * 1000);

                    PubSub.publish(`${COURSES_TOPIC}.${course._id}`, {msg: QUESTION_ASKING_STARTED});
                    return question;
                });
            }
            return question;
        });
    }

    public stopAskingQuestion(questionId: string, course: MongooseDocument & Course): Promise<MongooseDocument & Question> {
        return this.findByIdIfFromCourse(questionId, course).then((question: any) => {
            // if (question.state === QUESTION_ASKED) {
                question.state = QUESTION_UNASKED;
                question.askedAt = null;
                question.responses = [];
                return question.save().then((question: any) => {

                    clearTimeout(this._scheduledJobs[question.id]);
                    ResponseModel.remove({question: question._id});

                    PubSub.publish(`${COURSES_TOPIC}.${course._id}`, {msg: QUESTION_ASKING_STOPPED});
                    return question;
                });
            // }
            // return question;
        });
    }

    public markQuestionAsAnswered(questionId: string, course: MongooseDocument & Course): Promise<MongooseDocument & Question> {
        return this.findByIdIfFromCourse(questionId, course).then((question: any) => {
            if (question.state === QUESTION_ASKED) {
                question.state = QUESTION_ANSWERED;
                return question.save().then((question: any) => {
                    PubSub.publish(`${COURSES_TOPIC}.${course._id}`, {msg: QUESTION_ASKING_ENDED});
                    return question;
                });
            }
            return question;
        })
    }
}

export const questionRepository = new QuestionRepository();