import express from "express";
import passport from "passport";
import { googleLogin, home, login, postGoogleLogin } from "../controllers/userController";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.home, home);
userRouter.get(routes.login, login);
userRouter.get(routes.google, googleLogin); 
userRouter.get(routes.googleCallback, 
    passport.authenticate('google', {failureRedirect: routes.login}),
    postGoogleLogin
    );

export default userRouter;