import express from "express";
import passport from "passport";
import { getHome, googleLogin, home, login, postGoogleLogin } from "../controllers/userController";
import routes from "../routes";


const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.login, login);
globalRouter.get(routes.google, googleLogin); 
globalRouter.get(routes.googleCallback, 
    passport.authenticate('google', {failureRedirect: routes.login}),
    postGoogleLogin
    );

export default globalRouter;