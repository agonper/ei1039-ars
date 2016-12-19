import * as bcrypt from 'bcrypt';
import * as log from 'winston';
import reject = Promise.reject;
import {UserModel} from "./mongodb/user";
import {MongooseDocument} from "mongoose";


export interface LoginData {
    email: string,
    password: string
}

export interface User extends LoginData {
    name: string,
    type: string
}

export interface UserWithMethods extends User {
    comparePassword(password: string): Promise<any>
}

class UserRepository {
    private _storage: {[key: string]: User};

    constructor() {
        this._storage = {};
    }

    public save(user: User): Promise<MongooseDocument & UserWithMethods> {
        return this.findByEmail(user.email).then((existingUser) => {
            if (existingUser) {
                log.info(`User already exist with email: ${user.email}`);
                return Promise.reject(new Error('User already exists'));
            }
            return generateHash(user.password).then((hash) => {
                user.password = hash;

                const userModel = new UserModel(user);
                return userModel.save();
            })
        }).catch((err) => {
            log.error('Error fetching user by mail: ', user.email);
            return Promise.reject(err);
        });
    }

    public findByEmail(email: string): Promise<MongooseDocument & UserWithMethods> {
        return <any>UserModel.findOne({email: email}).exec();
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