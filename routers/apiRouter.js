import express from "express";
import { postAddMemo, postViewMemo } from "../controllers/memoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addMemo, postAddMemo);
apiRouter.post(routes.viewMemo, postViewMemo);

export default apiRouter;