import express from "express";
import { postAddMemo, postDeleteMemo, postViewMemo } from "../controllers/memoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addMemo, postAddMemo);
apiRouter.post(routes.viewMemo, postViewMemo);
apiRouter.post(routes.deleteMemo, postDeleteMemo);

export default apiRouter;