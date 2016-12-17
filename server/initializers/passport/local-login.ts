import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as jwt from 'jsonwebtoken';
import {Strategy} from "passport-local";
import {userStorage} from "../../models/user";

export const localLogin = (config: ServerConfig): passport.Strategy => {
    return new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {

        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        userStorage.findByEmail(email).then((user) => {
            userStorage.comparePassword(password, user.password)
                .then(() => {
                    const payload = {
                        sub: user.email
                    };

                    const token = jwt.sign(payload, config.jwtSecret);

                    return done(null, token);
                }).catch(() => {
                    return done(error);
                });
        }).catch(() => {
            return done(error);
        });
    })
};