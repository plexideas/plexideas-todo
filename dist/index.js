"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_router_1 = __importDefault(require("./routes/auth-router"));
const kyes = __importStar(require("./config/keys"));
require("./config/passport");
const app = express_1.default();
const port = process.env.PORT || 5000;
const MongoStore = connect_mongo_1.default(express_session_1.default);
let user = {};
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connect(kyes.MONGODB.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('\n🚀 Database connected \n');
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose_1.default.connection,
    })
}));
app.use(cors_1.default({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// passport.serializeUser((user: any, done: any) => {
//   done(null, user);
// });
// passport.deserializeUser((user: any, done: any) => {
//   done(null, user);
// });
// passport.use(new OAuth2Strategy({
//     clientID: kyes.GOOGLE.CLIENT_ID,
//     clientSecret: kyes.GOOGLE.CLIENT_SECRET,
//     callbackURL: kyes.GOOGLE.CALLBACK_URL
//   }, 
//   (accessToken, refreshToken, profile:any, done) => {
//     user = {
//       email: profile.emails[0].value,
//       name: profile.displayName,
//       givenName: profile.name.givenName,
//       familynName: profile.name.familyName,
//       picture: profile.photos[0],
//       token: accessToken
//     };
//     console.log(user);
//   done(null, user);
//  })
// );
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api', (req, res) => res.send('Hello Api!'));
app.use('/api/auth', auth_router_1.default);
app.listen(port, () => console.log(`\n🚀 Server has started on port: ${port} \n`));
