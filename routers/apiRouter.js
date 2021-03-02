import express from "express";
import { postAddMemo, postDeleteMemo, postViewMemo } from "../controllers/memoController";
import { postCreatePattern, postRecordPattern } from "../controllers/patternController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addMemo, postAddMemo);
apiRouter.post(routes.viewMemo, postViewMemo);
apiRouter.post(routes.deleteMemo, postDeleteMemo);
apiRouter.post(routes.addPattern, postCreatePattern);
apiRouter.post(routes.recordPattern, postRecordPattern);

export default apiRouter;