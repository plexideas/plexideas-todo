import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import * as http from "http";

import authRouter from './routes/auth-router';
import * as kyes from './config/keys';

import { resolvers, schema } from './graphql';

import './config/passport';

const app = express();
const port = process.env.PORT || 5000;

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  tracing: true,
  // context: ({ req }) => ({
  //   user: (req as any).user,
  // }),
});

const httpServer = http.createServer(app);

apolloServer.applyMiddleware({ app })
apolloServer.installSubscriptionHandlers(httpServer);

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

app.get('/api', (req, res) => console.log('API'));
app.use('/api/auth', authRouter);


httpServer.listen(port, () => console.log(`\n🚀 Server has started on port: ${port} \n`));
