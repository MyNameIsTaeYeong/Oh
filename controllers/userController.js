import routes from "../routes";
import passport from "passport";
import User from "../models/User";

export const home = (req, res) => {
    res.render("home");
}

export const login = (req, res) => {
    res.render("login");
}

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });


export const googleLoginCallback = async (accessToken, refreshToken, profile, cb) =>{
    const { _json:{sub, name, picture, email} } = profile;
    try {
        const user = await User.findOne({email});
        if(user){
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            avartarUrl : picture,
            googleId : sub
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }  
};

export const postGoogleLogin = (req, res) => {
    res.redirect(routes.home);
}