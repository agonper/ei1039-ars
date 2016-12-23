import * as bcrypt from 'bcrypt';
import * as log from 'winston';
import {UserModel} from "./mongodb/user";
import {MongooseDocument, Types} from "mongoose";
import {Course} from "./course";


export interface LoginData {
    email: string,
    password: string
}

export interface UserSignupData extends LoginData{
    name: string,
    type: string
}

export interface User extends UserSignupData {
    _id: Types.ObjectId,
    courses: Course[]
}

export interface UserWithMethods extends User {
    comparePassword(password: string): Promise<any>
}

class UserRepository {

    public save(user: UserSignupData): Promise<MongooseDocument & UserWithMethods> {
        return this.findByEmail(user.email).catch((err) => {
            log.error('Error fetching user by mail: ', user.email);
            return Promise.reject({message: 'Error creating user account', errors: {general: err}});
        }).then((existingUser) => {
            if (existingUser) {
                log.info(`User already exist with email: ${user.email}`);
                return Promise.reject({message: 'Email already exists', errors: {email: 'email-exists'}});
            }
            return generateHash(user.password).then((hash) => {
                user.password = hash;

                const userModel = new UserModel(user);
                return userModel.save();
            })
        });
    }

    public findByEmail(email: string): Promise<MongooseDocument & UserWithMethods> {
        return <any>UserModel.findOne({email: email}).exec().catch((err) => {
            log.error('Error fetching user by mail');
            return Promise.reject({message: 'Error fetching user', errors: {general: err}})
        });
    }
}

function generateHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    });
}

export const userRepository = new UserRepository();