import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as express from 'express';
import {Strategy, ExtractJwt} from "passport-jwt";
import {userStorage} from "../../models/user";

export const jwtLogin = (config: ServerConfig): passport.Strategy => {
    return new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.jwtSecret,
        passReqToCallback: true
    }, (req: express.Request, {sub}:any , done: any) => {
        const error = new Error('Invalid token');
        error.name = 'IncorrectCredentialsError';

        userStorage.findByEmail(sub)
            .then((user) => {
                req.user = user;
                return done(null, user);
            }).catch((err) => {
            log.info(err);
            return done(error, false)
        });
    })
};
