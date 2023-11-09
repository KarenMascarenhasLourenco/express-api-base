import { Router } from "express";

import * as ApiController from "../controllers/apiController";

const router = Router();

router.get("/", ApiController.mainInfo);

export default router;
