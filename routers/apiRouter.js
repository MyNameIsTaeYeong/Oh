import express from "express";
import { postAddMemo } from "../controllers/memoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addMemo, postAddMemo);

export default apiRouter;