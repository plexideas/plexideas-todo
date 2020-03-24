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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth_1 = require("passport-google-oauth");
const user_model_1 = __importDefault(require("../models/user-model"));
const kyes = __importStar(require("../config/keys"));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => {
    user_model_1.default.findById(id)
        .then(user => {
        done(null, user);
    })
        .catch(e => {
        done(new Error("Failed to deserialize an user"));
    });
});
passport_1.default.use(new passport_google_oauth_1.OAuth2Strategy({
    clientID: kyes.GOOGLE.CLIENT_ID,
    clientSecret: kyes.GOOGLE.CLIENT_SECRET,
    callbackURL: kyes.GOOGLE.CALLBACK_URL
}, async (token, tokenSecret, profile, done) => {
    const currentUser = await user_model_1.default.findOne({
        email: profile.emails[0].value
    });
    if (!currentUser) {
        const newUser = await new user_model_1.default({
            email: profile.emails[0].value,
            name: profile.displayName,
            givenName: profile.name.givenName,
            familynName: profile.name.familyName,
            picture: profile.photos[0].value,
            token: token,
        }).save();
        if (newUser) {
            done(null, newUser);
        }
    }
    done(null, currentUser);
}));
