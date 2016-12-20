import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as express from 'express';
import {userRepository} from "../../models/user";
import {BasicStrategy} from "passport-http";

export const basicLogin = (config: ServerConfig): passport.Strategy => {
    return new BasicStrategy({
        passReqToCallback: true
    }, (req: express.Request, email: string, password: string , done:any) => {

        userRepository.findByEmail(email).then((user) => {
            user.comparePassword(password)
                .then(() => {
                    if (!user) throw new Error('User not found');
                    req.user = user;
                    log.info(`User ${user.name}, logged in`);
                    return done(null, user);
                }).catch((err) => {
                log.info(err);
                return done({message: 'Wrong password', errors: {password: 'wrong-password'}}, false);
            });
        }).catch((err) => {
            log.info(err);
            return done({message: 'Wrong email', errors: {email: 'wrong-email'}}, false);
        });
    })
};

