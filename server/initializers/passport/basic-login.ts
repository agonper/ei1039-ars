import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as express from 'express';
import {userStorage} from "../../models/user";
import {BasicStrategy} from "passport-http";

export const basicLogin = (config: ServerConfig): passport.Strategy => {
    return new BasicStrategy({
        passReqToCallback: true
    }, (req: express.Request, email: string, password: string , done:any) => {

        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        userStorage.findByEmail(email).then((user) => {
            userStorage.comparePassword(password, user.password)
                .then(() => {
                    req.user = user;
                    log.info(`User ${user.name}, logged in`);
                    return done(null, user);
                }).catch((err) => {
                log.info(err);
                return done(error);
            });
        }).catch((err) => {
            log.info(err);
            return done(error);
        });
    })
};

