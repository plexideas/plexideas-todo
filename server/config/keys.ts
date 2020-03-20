export const GOOGLE = {
  CLIENT_ID: "26125392638-ch7s2ov36ao762h4b5mqukn1n2rqhimp.apps.googleusercontent.com",
  CLIENT_SECRET: "7iLOgsCX_Ke1BF4FvxC_pxFi",
  CALLBACK_URL: "http://localhost:5000/api/auth/google/callback"
};

export const DB_USER = "SOME USER";
export const DB_PASSWORD = "SOME PASSWPORD";

export const MONGODB = {
  MONGODB_URI: `mongodb://localhost:27017/plexideas-todo`,
  S_MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`
};

export const SESSION = {
  COOKIE_KEY: "thisappisawesome"
};
