import {Schema, model} from 'mongoose';

export const CourseSchema = new Schema({
    name: {type: String, required: 'true'},
    teacher: {type: Schema.Types.ObjectId, ref: 'User'},
    students: [{type: Schema.Types.ObjectId, ref: 'User'}]
    // TODO Add question sets
});

export const CourseModel = model('Course', CourseSchema);