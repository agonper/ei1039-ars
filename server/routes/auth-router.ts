import * as express from 'express';
import {Server} from "../initializers/server";

export const AuthRouter = (server: Server): express.Router => {
  const router = express.Router();

  router.post('/login', (req: express.Request, res: express.Response) => {
      res.send('login');
  });

  router.post('/signup', (req: express.Request, res: express.Response) => {
    res.send('signup');
  });

  return router;
};