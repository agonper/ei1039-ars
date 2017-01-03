import * as log from 'winston';
import {MongooseDocument, Types} from "mongoose";
import {QuestionModel} from './mongodb/question';
import {QuestionSet} from "./question-set";
import {QUESTION_UNASKED} from "../../common/states/question-states";

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
    askedAt: Date,
    questionSet: QuestionSet
}

class QuestionRepository {

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
}

export const questionRepository = new QuestionRepository();