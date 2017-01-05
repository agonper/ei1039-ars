import {Schema, model} from 'mongoose';

export const ResponseSchema = new Schema({
    option: {type: String, required: true},
    answeredAt: {type: Date, required: true},
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    question: {type: Schema.Types.ObjectId, ref: 'Question'}
});

export const ResponseModel = model('Response', ResponseSchema);