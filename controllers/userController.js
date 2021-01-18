import routes from "../routes";
import passport from "passport";

export const home = (req, res) => {
    res.render("home");
}

export const login = (req, res) => {
    res.render("login");
}

export const googleLogin = passport.authenticate('google', { scope: ['profile'] });


export const googleLoginCallback = (accessToken, refreshToken, profile, cb) =>{
    console.log(profile);
}