import routes from "../routes";
import passport from "passport";
import User from "../models/User";
import Memo from "../models/Memo";
import mongoose from "mongoose";

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
            content: ["Welcome!"],
            createdBy: "imtaebari"
        });

        
        const newUser = await User.create({
            name,
            email,
            avartarUrl : picture,
            googleId : sub,
            memosMap: {
                "oh": welcomeMemo
            }
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }  
};

export const postGoogleLogin = (req, res) => {
    res.redirect(`/user/${req.user._id}`);
}


// toDo : 클릭한 날짜를 키값으로 가지는 메모들 불러오기
export const getHome = async (req, res) => {
    const { params:{ id } } = req;

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth()+1) : dateObj.getMonth()+1;
    const date = dateObj.getDate() < 9 ? '0' + dateObj.getDate() : dateObj.getDate();
    
    routes.day = `${year}${month}${date}`;

    try {
        const user = await User.findById(id);
        const memoOfTheDay = user.memosMap.get(routes.day)
        
        if(memoOfTheDay !== undefined){
            const memos = await Memo.findById(memoOfTheDay._id);
            const contents = memos.content;
            res.render("home", {contents});
        } else {
            res.render("home", {contents:[]});
        }
        
        
    } catch (error) {
        console.log(error);
    }
}