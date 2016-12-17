import * as jwt from 'jsonwebtoken';
import * as log from 'winston';
import {ServerConfig} from "../config/environment";
import {RequestHandler} from 'express';
import {userStorage} from "../models/user";

export const authChecker = (config: ServerConfig): RequestHandler => {
    return (req, res, next) => {
        if (!req.headers['authorization']) {
            return res.status(401).end();
        }

        // Split 'bearer token-variable' to get token-variable
        const token = req.headers['authorization'].split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.status(401).end();

            const email = decoded.sub;

            userStorage.findByEmail(email)
                .then((user) => {
                    req.user = user;
                    return next();
                }).catch((err) => {
                    log.info(err);
                    return res.status(401).end();
                });
        });
    }
};


