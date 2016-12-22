import * as log from 'winston';
import {MongooseDocument, Types} from "mongoose";
import {QuestionSetModel} from './mongodb/question-set';
import {Course} from "./course";


export interface QuestionSet {
    _id: Types.ObjectId,
    name: string,
    createdAt: Date,
    course: Course
}

class QuestionSetRepository {

    public createQuestionSet(course: any & MongooseDocument, name: string): Promise<MongooseDocument & QuestionSet> {
        const questionSetProperties = {
            course: course._id,
            name: (name) ? name : '',
            createdAt: Date.now()
        };
        const questionSet = new QuestionSetModel(questionSetProperties);
        return questionSet.save().then((questionSet) => {
            course.questionSets.push(questionSet);
            return course.save().then(() => questionSet);
        });
    }

    public findById(id: string): Promise<MongooseDocument & QuestionSet> {
        return <any>QuestionSetModel.findOne({_id: id}).exec().catch((err) => {
            log.error(`Error fetching question set by id: ${id}`, err);
            return Promise.reject(new Error("question-set-not-found"));
        });
    }
}

export const questionSetRepository = new QuestionSetRepository();