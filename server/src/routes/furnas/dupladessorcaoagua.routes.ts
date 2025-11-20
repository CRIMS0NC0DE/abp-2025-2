import { Router } from "express";
import { getDuplaDessorcaoAgua } from "../../controllers/furnas/dupladessorcaoagua.controller";

const router = Router();

router.get("/all", getDuplaDessorcaoAgua);

export default router;
