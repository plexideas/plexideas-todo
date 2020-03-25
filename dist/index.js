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
const apollo_server_express_1 = require("apollo-server-express");
const http = __importStar(require("http"));
const auth_router_1 = __importDefault(require("./routes/auth-router"));
const kyes = __importStar(require("./config/keys"));
const graphql_1 = require("./graphql");
require("./config/passport");
const app = express_1.default();
const port = process.env.PORT || 5000;
const apolloServer = new apollo_server_express_1.ApolloServer({
    schema: graphql_1.schema,
    resolvers: graphql_1.resolvers,
    tracing: true
});
const httpServer = http.createServer(app);
apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);
const MongoStore = connect_mongo_1.default(express_session_1.default);
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
    credentials: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/api', (req, res) => console.log('API'));
app.use('/api/auth', auth_router_1.default);
httpServer.listen(port, () => console.log(`\n🚀 Server has started on port: ${port} \n`));
