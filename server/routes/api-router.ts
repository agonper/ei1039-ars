import * as express from 'express';
import {Server} from "../initializers/server";

export const ApiRouter = (server: Server): express.Router => {
    const router = express.Router();

    router.get('/:resource', (req, res) => {
        const { resource } = req.params;
        if (resource === 'hostname') {
            return res.send(`${this._config.http.host}`);
        }
        res.send(`Hello ${resource}!`);
    });

    return router;
};
