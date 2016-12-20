import {ServerConfig} from "../../config/environment";
import * as passport from "passport";
import * as log from 'winston';
import * as jwt from 'jsonwebtoken';
import {Strategy} from "passport-local";
import {userRepository} from "../../models/user";

export const localLogin = (config: ServerConfig): passport.Strategy => {
    return new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {


        userRepository.findByEmail(email).then((user) => {
            user.comparePassword(password)
                .then(() => {
                    if (!user) throw new Error('User not found');

                    const payload = {
                        sub: user.email
                    };

                    const token = jwt.sign(payload, config.jwtSecret);

                    return done(null, token);
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