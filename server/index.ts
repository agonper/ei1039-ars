import * as express from 'express';
import * as path from 'path';

const app = express();

app.get('/api/:resource', (req: express.Request, res: express.Response) => {
   res.send(`Hi ${req.params.resource}!`)
});

app.use(express.static(path.resolve('dist', 'public')));

app.use('*', (req: express.Request, res: express.Response) =>
   res.sendFile(path.resolve('dist', 'public', 'index.html'))
);

app.listen(3000);
console.log('Server running at http://localhost:3000');