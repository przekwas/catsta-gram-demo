import * as express from 'express';
import * as passport from 'passport';
import routes from './routes';
import './middlewares/passport-strategies';

const app = express();

app.use(express.static('public'));
app.use(passport.initialize());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
