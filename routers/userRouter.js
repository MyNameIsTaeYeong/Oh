import express from "express";
import { home } from "../controllers/userController";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.home, home)

export default userRouter;