import {Schema, model} from 'mongoose';

const QuestionAnswerSchema = new Schema({
    option: {type: String, required: true},
    text: {type: String},
    isCorrect: {type: Boolean, required: true}
});

export const QuestionSchema = new Schema({
    title: {type: String},
    createdAt: {type: Date, required: true},
    questionSet: {type: Schema.Types.ObjectId, ref: 'QuestionSet'},
    answers: [QuestionAnswerSchema]
});

export const QuestionModel = model('Question', QuestionSchema);
