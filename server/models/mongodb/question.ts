import {Schema, model} from 'mongoose';

const QuestionAnswerSchema = new Schema({
    option: {type: String, required: true},
    text: {type: String},
    isCorrect: {type: Boolean, required: true}
});

export const QuestionSchema = new Schema({
    title: {type: String},
    createdAt: {type: Date, required: true},
    time: {type: Number, required: true},
    state: {type: "string", required: true},
    askedAt: {type: Date},
    questionSet: {type: Schema.Types.ObjectId, ref: 'QuestionSet'},
    answers: [QuestionAnswerSchema],
    responses: [{type: Schema.Types.ObjectId, ref: 'Response'}]
});

export const QuestionModel = model('Question', QuestionSchema);
