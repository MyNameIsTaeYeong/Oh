import express from "express";
import { getHome } from "../controllers/userController";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.day, getHome);

export default userRouter;