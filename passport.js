import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { googleLoginCallback } from "./controllers/userController";
import routes from "./routes";
import User from "./models/User";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:4000${routes.googleCallback}`
},
googleLoginCallback
));

passport.serializeUser(function (user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});