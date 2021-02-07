import express from "express";
import { postAddMemo, postDeleteMemo, postViewMemo } from "../controllers/memoController";
import { postCreatePattern } from "../controllers/patternController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addMemo, postAddMemo);
apiRouter.post(routes.viewMemo, postViewMemo);
apiRouter.post(routes.deleteMemo, postDeleteMemo);
apiRouter.post(routes.addPattern, postCreatePattern);

export default apiRouter;