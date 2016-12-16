import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/', express.static(path.resolve("dist", "public")));

app.get('/api/:resource', (req: express.Request, res: express.Response) => {
   res.send(`Hi ${req.params.resource}!`)
});

app.listen(3000);
console.log('Server running at http://localhost:3000');