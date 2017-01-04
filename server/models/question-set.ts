import * as log from 'winston';
import {MongooseDocument, Types} from "mongoose";
import {QuestionSetModel} from './mongodb/question-set';
import {Course} from "./course";
import {Question} from "./question";
import * as moment from 'moment';


export interface QuestionSet {
    _id: Types.ObjectId,
    name: string,
    createdAt: Date,
    course: Course,
    questions: Question[]
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

    public findNoNamedOfToday(courseId: string): Promise<MongooseDocument & QuestionSet> {
        const today = moment().startOf('day');
        const tomorrow = moment(today).add(1, 'day');

        return <any>QuestionSetModel.findOne({name: '', course: courseId, createdAt: {
            $gte: today.toDate(),
            $lt: tomorrow.toDate()
        }}).exec().catch((err) => {
                return Promise.reject(new Error("question-set-not-found"));
        });
    }

    public findByIdIfFromCourse(questionSetId: string, course: MongooseDocument & Course)
            : Promise<MongooseDocument & QuestionSet> {

        return this.findById(questionSetId).then((questionSet) => {
            if (!questionSet) throw new Error('Question set not found');

            return questionSet.populate('course').execPopulate().then((questionSet: any) => {
                if (questionSet.course._id.toString() !== course._id.toString()) {
                    throw new Error('Forbidden access')
                }
                return questionSet;
            })
        })
    }
}

export const questionSetRepository = new QuestionSetRepository();