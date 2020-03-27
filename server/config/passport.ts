import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';

import User from '../models/user-model';
import * as kyes from '../config/keys'


passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((id, done: any) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(new OAuth2Strategy({
    clientID: kyes.GOOGLE.CLIENT_ID,
    clientSecret: kyes.GOOGLE.CLIENT_SECRET,
    callbackURL: kyes.GOOGLE.CALLBACK_URL
  }, 
  async (token, tokenSecret, profile: any, done) => {
    const currentUser = await User.findOne({
      email: profile.emails[0].value
    });

    if (!currentUser) {
      const newUser = await new User({
        
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
 })
);
