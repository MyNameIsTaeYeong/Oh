import express from "express";
import { home, login } from "../controllers/userController";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.home, home);
userRouter.get(routes.login, login);


export default userRouter;