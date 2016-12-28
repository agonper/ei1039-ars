import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as express from 'express';
import {Strategy, ExtractJwt} from "passport-jwt";
import {userRepository} from "../../models/user";

export const jwtLogin = (config: ServerConfig): passport.Strategy => {
    return new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.jwtSecret,
        passReqToCallback: true
    }, (req: express.Request, {sub}:any , done: any) => {

        userRepository.findByEmail(sub)
            .then((user) => {
                if (!user) throw new Error('User not found');
                req.user = user;
                return done(null, user);
            }).catch((err) => {
            log.info(err);
            return done({message: 'Invalid token', errors: {token: 'invalid-token'}}, false)
        });
    })
};
