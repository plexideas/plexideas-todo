import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth-router';
import * as kyes from './config/keys';

import './config/passport';

const app = express();
const port = process.env.PORT || 5000;

const MongoStore = connectMongo(session);

mongoose.set('useCreateIndex', true);
mongoose.connect(kyes.MONGODB.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('\n🚀 Database connected \n');
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  })
}));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api', (req, res) => res.send('Hello Api!'));
app.use('/api/auth', authRouter);


app.listen(port, () => console.log(`\n🚀 Server has started on port: ${port} \n`));
