import {Schema, model} from 'mongoose';

export const CourseSchema = new Schema({
    name: {type: String, required: true},
    createdAt: {type: Date, required: true},
    teacher: {type: Schema.Types.ObjectId, ref: 'User'},
    students: [{type: Schema.Types.ObjectId, ref: 'User'}],
    questionSets: [{type: Schema.Types.ObjectId, ref: 'QuestionSet'}],
    showStats: {type: Boolean, required: true},
    displayedQuestion: {type: Schema.Types.ObjectId, ref: 'Question'},
    displayedQuestionSet: {type: Schema.Types.ObjectId, ref: 'QuestionSet'}
});

export const CourseModel = model('Course', CourseSchema);
