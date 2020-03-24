"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE = {
    CLIENT_ID: "26125392638-ch7s2ov36ao762h4b5mqukn1n2rqhimp.apps.googleusercontent.com",
    CLIENT_SECRET: "7iLOgsCX_Ke1BF4FvxC_pxFi",
    CALLBACK_URL: "http://localhost:5000/api/auth/google/callback"
};
exports.DB_USER = "SOME USER";
exports.DB_PASSWORD = "SOME PASSWPORD";
exports.MONGODB = {
    MONGODB_URI: `mongodb://localhost:27017/plexideas-todo`,
    S_MONGODB_URI: `mongodb://${exports.DB_USER}:${exports.DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`
};
exports.SESSION = {
    COOKIE_KEY: "thisappisawesome"
};
