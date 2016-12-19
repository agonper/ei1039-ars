import * as bcrypt from 'bcrypt';
import * as log from 'winston';
import {Schema, model} from 'mongoose';

export const UserSchema = new Schema({
    email: {type: 'string', unique: true, required: true},
    name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    type: {type: 'string', required: true}
    // TODO Add classes
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