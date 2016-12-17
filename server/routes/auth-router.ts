import * as express from 'express';
import * as passport from 'passport';
import * as log from 'winston';
import {Server} from "../initializers/server";
import {User, userStorage} from "../models/user";

export const AuthRouter = (server: Server): express.Router => {
  const router = express.Router();

  router.post('/signup', (req, res) => {
    // FIXME Validate data first

    const newUser: User = {
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      name: req.body.name.trim()
    };

    userStorage.save(newUser)
        .then((user) => res.status(200).json({success: true, message: 'User signed up'}))
        .catch((err) => {
          log.info(err);
          return res.status(409).json({success: false, message: 'Could not process the request'})
        });
  });

  router.post('/login', (req, res, next) => {
      // FIXME Validate data first

      passport.authenticate('local-login', {session: false}, (err: Error, token: any, info: any) => {
        if (err) {
          if (err.name === "IncorrectCredentialsError") {
            return res.status(400).json({success: false, message: err.message});
          }
          return res.status(409).json({success: false, message: 'Could not process the request'});
        }
        return res.status(200).json({success: true, message: 'User logged in', data: {token}});
      })(req, res, next);
  });

  return router;
};