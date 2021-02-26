import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import * as path from 'path';
import * as passport from 'passport';
import routes from './routes';
import './middlewares/passport-strategies';

const app = express();
const server = new http.Server(app);
export const io = new socketIO.Server(server);

io.on('connection', (socket: socketIO.Socket) => {
    console.log('A user is connected: ' + socket.id);
});

app.use(express.static('public'));
app.use(passport.initialize());
app.use(express.json());
app.use(routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port: ${port}`));