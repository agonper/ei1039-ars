import {Schema, model} from 'mongoose';

export const QuestionSetSchema = new Schema({
    name: {type: String},
    createdAt: {type: Date, required: true},
    course: {type: Schema.Types.ObjectId, ref: 'Course'}
    // TODO Add question
});

export const QuestionSetModel = model('QuestionSet', QuestionSetSchema);
