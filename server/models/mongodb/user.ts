import * as bcrypt from 'bcrypt';
import {Schema, model} from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

UserSchema.methods.comparePassword = function(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, same) => {
            if (err) return reject(err);
            return same ? resolve() : reject();
        })
    });
};

export const UserModel = model('User', UserSchema);