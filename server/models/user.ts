import * as bcrypt from 'bcrypt';
import * as log from 'winston';
import reject = Promise.reject;

export interface LoginData {
    email: string,
    password: string
}

export interface User extends LoginData{
    name: string
}

class UserStorage {
    private _storage: {[key: string]: User};

    constructor() {
        this._storage = {};
    }

    public save(user: User): Promise<User> {
        const storage = this._storage;
        if (storage[user.email]) {
            log.info(`User already exist with email: ${user.email}`);
            return Promise.reject(new Error('User already exists'));
        }
        return new Promise((resolve, reject) => {
            bcrypt.genSalt((err, salt) => {
                if (err) return reject(err);
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) return reject(err);
                    user.password = hash;
                    storage[user.email] = user;
                    log.info(`New user created with email: ${user.email}`);
                    return resolve(user);
                });
            });
        });
    }

    public findByEmail(id: string): Promise<User> {
        const user = this._storage[id];
        return user ? Promise.resolve(user) : Promise.reject(new Error('User not found'));
    }

    public comparePassword(password: string, hash: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, same) => {
                if (err) return reject(err);
                return same ? resolve() : reject();
            })
        });
    }
}

export const userStorage = new UserStorage();