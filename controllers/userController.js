import routes from "../routes";
import passport from "passport";
import User from "../models/User";
import Memo from "../models/Memo";

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

        const welcomeMemo = await Memo.create({
            content: "Welcome!",
            createdBy: "imtaebari"
        });

        const welcomeArray = [];
        welcomeArray.push(welcomeMemo);

        const newUser = await User.create({
            name,
            email,
            avartarUrl : picture,
            googleId : sub,
            memos: {
                "oh": welcomeArray
            }
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }  
};

export const postGoogleLogin = (req, res) => {
    console.log(req.user);
    res.redirect(`/${req.user._id}`);
}

export const getHome = async (req, res) => {
    const { params: { id } } = req;
    
    try {
        //const user = await User.findById(id).populate("memos");
        
        res.render("home");
    } catch (error) {
        console.log(error);
    }
}